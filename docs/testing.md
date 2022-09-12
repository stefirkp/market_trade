# Testing

Adopting TS should reduce the need for extremely high coverage. Guidelines:

Business logic:

- QA shouldn’t find more than 2 logical bugs after writing business logic unit test cases
- Edge case bugs can come but the should be kept to minimum
- Test business logic more extensively than UI

UI:

- Use https://testing-library.com/docs/
- Use Storybook when developing components (it’s more fun to look at visuals than code anyway)
- Abstract to hooks/helper functions and test those more extensively (business logic)
- Avoid snapshot testing
  - Use it when the markup structure is business critical, and
  - It’s too difficult/impossible to use React Testing Library queries, and
  - Any changes to it should be reviewed, not just `--updateSnapshot` blindly

## Testing React components

Refs:

- Intro: https://testing-library.com/docs/react-testing-library/example-intro
- Common mistakes: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

```tsx
// Welcome.tsx (example component)
import type { FC } from 'react';

type Props = {
  name?: string;
};

export const Welcome: FC<Props> = ({ name = 'You' }) => {
  return <h1>Hello {name}! Welcome to Pintu’s FE starter.</h1>;
};

// Welcome.spec.tsx (example test)
import { render, screen } from '@lib/test-utils';
import { Welcome } from './Welcome';

describe('Welcome', () => {
  it('should render with fallback name if not provided', () => {
    render(<Welcome />);

    expect(screen.getByText(/Hello You! Welcome to Pintu's FE starter/i)).toBeVisible();
  });

  it('should render with given name', () => {
    render(<Welcome name="world" />);

    expect(screen.getByText(/Hello world! Welcome to Pintu’s FE starter/i)).toBeVisible();
  });
});
```

## Testing React hooks

Ref: https://react-hooks-testing-library.com/usage/basic-hooks

## Testing Next.js pages

Testing Next.js pages w/ route + data fetching (getServerSideProps, etc.)

TODO: wait for `next-page-tester` compatibility with Next.js v12
https://github.com/toomuchdesign/next-page-tester/issues/281

## Mocking API calls

To mock successful call, add a handler in `lib/mocks/msw-handlers.ts`.

```ts
rest.get('https://pintu.com/gateway/products/:slug', (req, res, ctx) => {
  const { slug } = req.params;

  return res(
    ctx.json<SuccessResponse<Product>>({
      code: 'SUCCESS',
      message: 'SUCCESS',
      data: createProduct(slug),
      serverTime: '2021-11-11T14:04:17.975+0000',
    })
  );
}),
```

To mock errors, there are 2 ways to do so:

1. Add condition for error inside the same handler (for example: passing a bad slug)

   ```ts
   rest.get('https://pintu.com/gateway/products/:slug', (req, res, ctx) => {
    const { slug } = req.params;

    if (slug === 'bad-slug') {
      return res(
        ctx.json<ErrorResponse>({
          code: 'ERROR',
          message: 'BAD_REQUEST',
          data: null,
          serverTime: '2021-11-11T14:04:17.975+0000',
        })
      );
    }

    // return successful response here
   }),
   ```

2. Overriding the handler inside the test, here’s how:

   ```ts
   import { mswServer, rest, render } from '@lib/test-utils';

   it('should handle error', () => {
     // for this test only, make MSW return error for this endpoint (no matter what its slug is)
     mswServer.use(
       rest.get('https://pintu.com/gateway/products/:slug', (req, res, ctx) => {
         return res.json({
           code: 'ERROR',
           message: 'BAD_REQUEST',
           data: null,
           serverTime: '2021-11-11T14:04:17.975+0000',
         });
       }),
     );

     render(<ProductDetailPage />);

     // your expectations here
   });
   ```
