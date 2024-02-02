## About Typescript config

Descriptions: For Frontend, I set up React template using Vite, which has included Webpack and Babel.

Vite help you set up all the configurations you need for a Typescript react porject.

But you may still meet some issues when you import a picture(.png/.jpg) or import a package.

Solution:

```
1. Add 'declarations.d.ts' file in the directory.
2. In the file, declare all the things that have the 'type issue'
3. Add the file to 'tsconfig.json' like this:
  "include": [
    "src",
    "declarations.d.ts"
  ],
4. Now the error disappear.
```

## About Test config

Installed packages:

```
@types/jest
jest
jest-fetch-mock
enzyme
ts-jest
@cfaester/enzyme-adapter-react-18
```

Config files:

```
jest.config.cjs
cssTransform.cjs
setupTests.ts
```

Attention:

1. Typescript used in the project is my personal try, so it's kind of messy and not so professional, improve it if you want.
2. The clarify API needs account name and password infos, but I put it on the frontend, which is a safety hazard，try to put it in the backend.

