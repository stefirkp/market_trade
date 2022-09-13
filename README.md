# Pintu Market Trade

Pintu market trade web app project. Check Usage.md for details on this specific repo.
This project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents

1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
3. [Development](docs/development.md)
4. [Market Trade Page](pages/market/README.md)

## Requirements

- node `8.1.0`
- npm `16.13.0`

We recommend [installing Volta](https://docs.volta.sh/guide/getting-started)
to auto switch Node.js versions between projects seamlessly.
Other alternative use can [modify your bash](https://stackoverflow.com/questions/23556330/run-nvm-use-automatically-every-time-theres-a-nvmrc-file-on-the-directory)

## Configuration

- Copy Environment configuration file from .env.example to .env

```bash
$ cp .env.local.example .env.local
```

- Modify it based on your configuration preference

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements),
you can start the site by running these commands:

```bash
$ npm install                   # Install project dependencies
$ npm run dev                     # Compile and launch
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

| `npm run <script>` | Description                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `dev`              | Serves your app at `localhost:3000`.                                                                                    |
| `build`            | Compiles the application to disk (`~/build` by default).                                                                |
| `test`             | Runs all tests in sequence                                                                                              |
| `lint:js`          | Run javascript linter.                                                                                                  |
| `storybook`        | Run storybook to view the UI components.                                                                                |
| `check-all`        | Check all the minimum requirement before commit. This script will autofix eslint format & test all feature in this repo |

**_Important note:_**

Before you commit, make sure to always run:

```bash
$ npm check-all
```

and have all the tests pass.

## File and Folder naming convention

- React JS or JSX or Javascript Class shoud be named Pascal case, for example - OrderDetailPanel.jsx
- Js files should be named in camel case, for example - verifyPhone.js
- folder names should be all in small letters, if it's more than a word, then they should be seperated by -, for example -> core-library,
  But if the folder is behave as React component index container then it should use Pascal case.

## Structure Folder

- .storybook
- assets
- components
- context
- lib
  - config
  - mocks
    - data
    - services
  - services
  - types
  - utils
    - currency-format
- pages
  - index.page.tsx
  - [id].page.tsx
  - index.module.css
  - index.stories.tsx
  - functions (optional)
