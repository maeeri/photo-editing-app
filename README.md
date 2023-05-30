# Image editing and generating (and drawing) app

    A work in progress

    Generate images utilising the OpenAI API
    Documentation: https://beta.openai.com/docs/introduction

    Upload images to MongoDb
    Edit and download images

    Draw on canvas
    Erase from canvas

## Getting started

    Requirements:
    Node.js (https://nodejs.org/en)
    Open AI account and API key (https://platform.openai.com/overview)
    MongoDb account (https://www.mongodb.com/)
    A code editor (e.g. Visual Studio Code)

    1. Create a .env file in the server folder. Define the following environmental variables in the .env
       file:
       PORT=<the app port>
       TEST_MONGODB_URI=<connection string to the test db>
       DEV_MONGODB_URI=<connection string to the development db>
       MONGODB_URI=<connection string to the db>
       OPENAI_API_KEY=<your Open AI API key>
       SECRET=<string>
    2. Install the dependencies:
       Run 'npm install' in both the server and client folders
    3. Start the server:
       Run either 'npm start' or 'npm run dev' in the server folder terminal
    4. Start the client:
       Run 'npm start' in the client folder terminal
    5. Get developing

### Resources

    https://github.com/R4M5E5/Video-Tutorial-Code-React-Drawing-App
    https://www.youtube.com/watch?v=wCwKkT1P7vY&ab_channel=BananaCoding
    https://www.youtube.com/watch?v=VHIEhgLS7uE&ab_channel=WebDevNinja
