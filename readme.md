### RestAPI tests with Playwright

Goal is to explore usage of Playwright to test restAPI endpoints on the exapmple of free fake API server https://jsonplaceholder.typicode.com 

## Tests flows covered: 
1. Search for the user with username "Antonette" - one positive and one negative test.
2. Use the details fetched to make a search for the posts written by the user.
3. For each post, fetch the comments and validate if the emails in the comment section are in the proper format.

## Technology
- Playwright as a test framework 
- Allure as test reporter 

## How to run
Make sure you have node.js, npm installed and all the required packages. 
To install npm packages:

```npm ci```

To run tests locally:

```npx playwright test --reporter=line,allure-playwright ```

To serve beautiful Allure report in HTML locally:

```npx allure serve allure-results```

To run tests on Github:

Project contains `.github/workflows/playwright.yml` config for running tests in GitHub actions for push and for pull requests on branches [ main, master ]. Test results will be stored in allure-results folder for 30 days. 

### Not included in this solution/can be improved
This is a quick solution for demo purposes and it's far from scalable prod version. 
- Proper instructions for running and installation for all OS; 
- bash script to install all dependencies; 
- Docker file to run tests; 
- Environment configurations to pass to command line/read from config;
- For requests to /posts, /comments, /users helper functions can be created; 
- Test data reading from config file or passing by command line instead of hardcoded constants; 
- Scripts in package.json to run tests in one word command and so on;
