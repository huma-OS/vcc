# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

also in new terminal to run the json server `npx json-server --watch data/db.json --port 8000`

use this instead if get errors and have to fix `npx json-server --watch data/db.json --port 8000 --no-cors`
`npm install react-router-dom@5`

add images: `npx ts-node src/updateIds.ts`
delete images: `npx ts-node src/deleteIds.ts`

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## add critical css inline stle to the index.html file i one dot com and rea arrange the order of the js and css file after hiting npm build

   <style>
      /* Critical CSS here */
      body {
        font-family: 'Teko', sans-serif;
      }
    </style>
     <link href="/static/css/main.c2ec3e11.css" rel="stylesheet">
  <script defer="defer" src="/static/js/main.0e28294b.js"></script>

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npx ts-node updateIds.tsx` 

once you have populated the file run the above in the terminal
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


