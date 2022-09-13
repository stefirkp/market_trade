# Development

This project use some tech stack.
Framework

- [next.js](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- Typescript

## Styling

For styling

- [tailwindcss](https://tailwindcss.com/docs/installation)
- [postcss](https://tailwindcss.com/docs/installation/using-postcss)

There 2 ways to styling with tailwind

1. Define classname inline
   example

```js
<main className="my-10 mx-0 md:mx-6 lg:mx-16">{children}</main>
```

2. Apply classname tailwind in css file

```css
.thead_col {
  @apply text-lg text-gray-900 p-5 text-left font-bold;
}
```

set the styling throught the classname. More tailwind styling & documentation in [here](https://tailwindcss.com/docs/scroll-margin)

## Data fetching

Read more [here](data-fetching.md)

## Unit test

Read more [here](testing.md)

## Commit

For commit rules using [Semantic Commit Message](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
