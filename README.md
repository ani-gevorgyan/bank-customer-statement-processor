# Bank Customer Statement Processdor

This is a simple file processor. It takes .xml & .csv files and generates a pdf report based on the validations of uniqueness of the transaction reference and the end balance.

The application consists of record api which accepts the file and a record service which handles all the file processing and validation. Middlewares are used to handle errors as well as file type validations. Error classes are introduced for an effective and structured way to handle the errors in the app. Test driven development is a crucial aspect of the app development process that is why unit tests for record service methods are introduced. Code formatting is present for code readability and uniformity.
For deployment heroku is chosen as a cloud platform for its simplicity and circleci is used to handle automatic deployments to heroku from github which is very effective and time efficient.

This application uses express.js which provides flexibility and speed for node.js server applications. In addition, typescript is chosen for type correspondence to provide more security within the application.

File upload is being done by multer - one of the most popular packages for this purpose, and file parsing is being handled by fast-xml-parser and csv-parse. These two packages were chosen based on their popularity and ease of use.
The above reasoning is also true for the pdfkit package selection.

Testing is being done via Jest and and faker.js is being used to generate fake data for test cases.
Eslint is present to handle the code formatting.

## Available Scripts

In the project directory, you can run:

### `npm install`

## Start app

### `npm run start-dev`

Runs the app in the development mode on port 4000.<br />

The server will reload if you make edits.<br />

## Postman link

#### https://www.postman.com/gold-space-386125/workspace/ama/collection/11457046-7679e8bc-1609-4049-ac48-15459f05860e?action=share&creator=11457046

Postcards collection is provided with data to test the backend locally.

## Running Tests

####  Run Tests `npm run test`

## Format Code

#### Run `npm run format` (uses eslint for formatting)




