# ChatGPT Mania

## Tools needed
- Git (https://git-scm.com/downloads)
- NodeJS (https://nodejs.org/en/)
- Any IDE/Editor e.g. VSCode
- Telegram App

## Setup Guide
1. Run below command to setup the server.

```
git clone https://github.com/HeLinChooi/chat-gpt-mania.git
cd chat-gpt-mania
npm install
```

2. Create a bot by messaging @BotFather and get the `bot token`.

https://core.telegram.org/bots#how-do-i-create-a-bot

3. Get `OpenAI API key` from https://platform.openai.com/docs/quickstart/add-your-api-key.

4. Copy content `sample.env` and create a `.env` file and paste the content.

5. Paste the `bot token` and `OpenAI API key`.

6. Start the local server by running
```
npm start
```
7. Chat to the telegram bot to get the response :)