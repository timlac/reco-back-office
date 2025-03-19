# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# TODO

## Pilot Testing 

Need to limit the number of items we sample from in the pilot study in order to be able to measure reliability on items. 
Maybe use the same items for everyone... 

## Survey settings

Settings like n.o. emotion alternatives, subset of items, should be set upon **survey type** creation, not **survey** creation.

Possibly I need somewhere to store the survey types. Perhaps another table. 

Each survey type should be linked to 
- a folder in the S3 bucket. 
I could potentially create an api endpoint later on to add files to a bucket.
  - The easiest setup would be to load all the filenames in the S3 bucket and sample from these. 
  Metadata could then be added in the GET request in lambda. 
- some information about the response format, e.g. the scales or the emotion alternatives. 

### TESTING 

Encountering some weird error with the App.test.js, so I will for now remove this file. 


### Mixed emotions 

For mixed emotions it would be sufficient to:

- Get rid of all kind of sampling (we simply take all files available) - DONE
- Add some kind of switch for sampling strategies (e.g. number of samples and number of emotions, if this is turned off just take all files in folder) - DONE

But I would need:

- To present the different emotion combinations, this might as well be implemented dynamically to begin with. 

Need to implement some kind of functionality for intro_files, maybe put in a different dir? Or in subdir? -DONE USING SUBDIR

### Reply format:

### TODO

// TODO: visualize slider replies should not be available if not reply dimensions 
TODO: emotion alternatives should not be visualized on create survey. 

The replyTemplates format should encode both the instructions and the replyTemplates format


## Available Scripts

use node version 16

`export AWS_PROFILE=rackspaceAcc`

In the project directory, you can run:

Deploy to stage: 
`npm run build:stage && npm run s3-deploy:stage`

Deploy to prod:
`npm run build:prod && npm run s3-deploy:prod`



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

