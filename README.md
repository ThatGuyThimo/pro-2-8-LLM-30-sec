# LLM Integrated 30 seconds
This project is a take on the game "30 seconds" with LLM integartion.

![image](/Readme/gameImage.jpg)

> [!NOTE]
> This is a project created ***only*** for school, I have no inted on making money from this nor am I under any obligation to maintain this project.


---

## Documentation

## How to run the server
1. first make sure you have Node installed, if not you can download it from [here](https://nodejs.org/en) and create an API key at [OpenAI](https://platform.openai.com/api-keys).

2. Install the required packages by running the following command inside of the folder ```/Server```.
    ```cli
    npm install
    ```
3. Create and populate the .env in the Server folder (an example has been provided).
   
   ![image](/Readme/envexample.jpg)
4. To be able to start the API you will need to provide SSL certificate and private key in API/index.js. 
   
    ![image](/Readme/Cert-example.JPG)
    
    If you cannot provide the certificate or you dont want to use SSL you can comment the following lines in   ```Server/server.js```.
   
    ![image](/Readme/Https-Example.JPG)

> [!CAUTION]
> You have to comment or delete the https lines from both images above for the API to work without an SSL certificate.

5. Run the server with.
   ```cli
   npm run dev
   ```

## How to run the Client
1. Install the required packages by running the following command inside of the folder ```/Client/LLM-30sec-client```.
    ```cli
    npm install
    ```
2. Run the client with.
   ```cli
   npm run dev
   ```

---

## Features
Described here  are the features of the game.
- Set the time of the round ```Default: 30```.
- Set the category of the words ```default everyday items```.

---

## API
Described here are the available endpoints for the API
- /joke | Type: GET (Tells a joke)
- /chat | Type: POST ```{ "message": "request" }``` (Gives response to the given message)
- /card | Type: POST ```{ "message": "request" }``` (Gives 5 words to be used for the game)

---

## Contributer
- [ThatGuyThimo](https://github.com/ThatGuyThimo)

---

## License
All rights reserved.