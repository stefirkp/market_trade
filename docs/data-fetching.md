# Data fetching

## Server-side data fetching

https://nextjs.org/docs/basic-features/data-fetching

### Service layer

>

Create the appropriate server-side service. Example below uses the abstract “resource”,
replace “resource” with “product”, etc.

Convention:

`get*Resource*` function that accepts `ctx, opts` and whatever else is required (e.g. `id`)

```ts
// lib/services/resource.ts
import { serverSideGatewayEndpoint } from '@lib/config';
import { constructFetchInit } from './construct-fetch-init';
import type { ServerFetchInitArg } from './construct-fetch-init';
import type { APIResponse } from '@lib/types/apiResponse';
import type { Resource } from '@lib/types/entities/resource';

const endpoint = serverSideGatewayEndpoint + '/resource';

/* GET all */

export function getAllResources(initArg: ServerFetchInitArg): Promise<APIResponse<Resource[]>> {
  return fetch(`${endpoint}/${id}`, constructFetchInit(initArg)).then((res) => res.json());
}

/* GET by id */

export function getResourceById(
  id: number,
  initArg: ServerFetchInitArg,
): Promise<APIResponse<Resource>> {
  return fetch(`${endpoint}/${id}`, constructFetchInit(initArg)).then((res) => res.json());
}
```

### getServerSideProps

After you have the service layer in place, you’re ready to make server-side fetch.

Example for GET all:

```tsx
// pages/resource/index.page.tsx
import type { GetServerSideProps, NextPage } from 'next';
import { getAllResources } from '@lib/services/resource';
import type { Resource } from '@lib/types/entities/resource';

type Props = {
  resources: Resource[];
};

const ResourcesPage: NextPage<Props> = ({ resources }) => {
  return <pre>{JSON.stringify(resources, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const response = await getAllResources({
    ctx,
    opts: {
      // ... optional, if needed
    },
  });

  if (response.code !== 'SUCCESS') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      resources: response.data,
    },
  };
};
```

Example for GET by id:

```tsx
// pages/resource/[id].page.tsx
import type { GetServerSideProps, NextPage } from 'next';
import { getResourceById } from '@lib/services/resource';
import type { Resource } from '@lib/types/entities/resource';

type Props = {
  resource: Resource;
};

const ResourceDetailPage: NextPage<Props> = ({ resource }) => {
  return <pre>{JSON.stringify(resource, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = ctx.params.id;
  const response = await getResourceById(id, {
    ctx,
    opts: {
      // ... optional, if needed
    },
  });

  if (response.code !== 'SUCCESS') {
    return {
      redirect: {
        destination: '/resource',
        permanent: false,
      },
    };
  }

  return {
    props: {
      resource: response.data,
    },
  };
};
```

## Client-side data fetching

### Service layer

Create the appropriate client-side service. Example below uses the abstract “resource”,
replace “resource” with “product”, etc.

Convention:

`get*Resource*` function that accepts `locale, opts` and whatever else is required (e.g. `id`)
`useGet*Resource*` hook that taps into locale and returns a memoized function for use in component.

```ts
// lib/services/resource.ts
import { clientSideGatewayEndpoint } from '@lib/config';
import { constructFetchInit } from './construct-fetch-init';
import type { ClientFetchInitArg } from './construct-fetch-init';
import type { APIResponse } from '@lib/types/apiResponse';
import type { Resource } from '@lib/types/entities/resource';

const endpoint = clientSideGatewayEndpoint + '/resource';

/* GET all */

export function getAllResources(initArg: ClientFetchInitArg): Promise<APIResponse<Resource[]>> {
  return fetch(`${endpoint}/${id}`, constructFetchInit(initArg)).then((res) => res.json());
}

export function useGetAllResources() {
  const { locale } = useRouter();

  return useCallback(() => getAllResources({ locale }), [locale]);
}

/* GET by id */

export function getResourceById(
  id: number,
  initArg: ClientFetchInitArg,
): Promise<APIResponse<Resource>> {
  return fetch(`${endpoint}/${id}`, constructFetchInit(initArg)).then((res) => res.json());
}

export function useGetResourceById() {
  const { locale } = useRouter();

  return useCallback((id: number) => getResourceById(id, { locale }), [locale]);
}

/* GET by multiple params */

type Params = {
  keyword: string;
  size: number;
};

export function getResourceByParams(
  params: Params,
  initArg: ClientFetchInitArg,
): Promise<APIResponse<Resource[]>> {
  return fetch(endpoint, constructFetchInit(initArg)).then((res) => res.json());
}

export function useGetResourceByParams() {
  const { locale } = useRouter();

  return useCallback((params: Params) => getResourceByParams(params, { locale }), [locale]);
}

/* POST */

export function postResource(
  resource: Resource,
  initArg: ClientFetchInitArg,
): Promise<APIResponse<Resource>> {
  return fetch(
    endpoint,
    constructFetchInit({ ...initArg, opts: { ...initArg.opts, method: 'POST' } }),
  ).then((res) => res.json());
}

export function usePostResource() {
  const { locale } = useRouter();

  return useCallback((resource: Resource) => postResource(resource, { locale }), [locale]);
}
```

### Usage in component with react-query

> `react-query` is recommended for managing server-state, but isn’t installed in the starter
> because your project might need Redux. If you need Redux, RTK w/ RTK Query might be better for you.
>
> If you don’t need Redux, use `react-query` for server-state + `useState`/`useReducer` for local states.
> Then if you need client-side global state, bring in `jotai`/`zustand`/`valtio`.

```tsx
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import type { NextPage } from 'next';
import { useGetResourceById } from '@lib/services/resource';
import type { Resource } from '@lib/types/entities/resource';

const ResourceDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const getResourceById = useGetResourceById();

  const resourceQuery = useQuery(['resource', id], () => getResourceById(id));

  if (resourceQuery.status === 'loading') return 'Loading…';
  if (resourceQuery.status === 'error') return 'Error!';

  return <pre>{JSON.stringify(resourceQuery.data, null, 2)}</pre>;
};
```

### Usage in component with useEffect

> This is a lot of boilerplate and is prone to errors. If you perform a lot of client-side fetches,
> consider `react-query` or `RTK Query`

```tsx
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useGetResourceById } from '@lib/services/resource';
import type { Resource } from '@lib/types/entities/resource';

const ResourceDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [resource, setResource] = useState<Resource>();

  const getResourceById = useGetResourceById();

  let isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      if (id) {
        const res = await getResourceById(id);

        if (!isMounted.current) return;

        if (res.code === 'SUCCESS') {
          setResource(res.data);
        }
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [getResourceById, id]);

  return <pre>{JSON.stringify(resource, null, 2)}</pre>;
};
```
