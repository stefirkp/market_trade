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
import axios, { AxiosResponse } from 'axios';
import type { APIResponse } from '@lib/types/apiResponse';
import type { Resource } from '@lib/types/entities/resource';

const endpoint = serverSideGatewayEndpoint + '/resource';

/* GET all */

export function getAllResources(initArg: ServerFetchInitArg): AxiosResponse<APIResponse<Resource>> {
  const res = await axios(url);
  return res;
}

/* GET by id */

export function getResourceById(
  id: number,
  initArg: ServerFetchInitArg,
): AxiosResponse<APIResponse<Resource>> {
  return await axios(url);
}
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
import { serverSideGatewayEndpoint } from '@lib/config';
import axios, { AxiosResponse } from 'axios';
import type { APIResponse } from '@lib/types/apiResponse';
import type { Resource } from '@lib/types/entities/resource';

const endpoint = serverSideGatewayEndpoint + '/resource';

/* GET all */

export function getAllResources(initArg: ServerFetchInitArg): AxiosResponse<APIResponse<Resource>> {
  const res = await axios(url);
  return res;
}

export function useGetAllResources() {
  const { locale } = useRouter();

  return useCallback(() => getAllResources({ locale }), [locale]);
}

/* GET by id */
export function getResourceById(
  id: number,
  initArg: ServerFetchInitArg,
): AxiosResponse<APIResponse<Resource>> {
  return await axios(url);
}

export function useGetResourceById() {
  const { locale } = useRouter();

  return useCallback((id: number) => getResourceById(id, { locale }), [locale]);
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
