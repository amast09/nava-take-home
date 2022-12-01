# nava-take-home

Visit a deployed version of this application [here](https://nava-take-home.vercel.app/)

### Getting started

- Install [nvm](https://github.com/nvm-sh/nvm)
- Install the right version of node

```
cd nava-take-home
nvm install
nvm use
```

- Install node dependencies

```
npm install
```

### Run the application locally

```
npm start
```

### Run CI checks

```
CI=true npm test
npm run format-check
npm run type-check
```

### Build the Application for Release

```
npm run build
```

This application was built using [Create React App](https://create-react-app.dev/), read their documentation for additional documentation.

### Things I didn't get to,

- Adding component level tests
- More pixel perfect CSS
- Better CSS for loading and failure modes for async company data
- More well organized CSS/HTML for the benefits card
