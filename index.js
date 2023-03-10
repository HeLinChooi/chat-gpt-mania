try {

  require('dotenv').config()
  const { Configuration, OpenAIApi } = require("openai");
  const { Telegraf } = require('telegraf');
  var http = require('http');

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const bot = new Telegraf(process.env.BOT_TOKEN);

  // Listen only for Heroku deployment
  const port = process.env.PORT || 3000;

  //create a server object:
  http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response
    res.end(); //end the response
  }).listen(port, function () {
    console.log(`server start at port ${port}`); //the server object listens on port 3000
  });

  function sendHelpMessage(ctx) {
    bot.telegram.sendMessage(ctx.chat.id,
      `
      Hello there! This is ChatGPT Mania.
      ╮ (. ❛ ᴗ ❛.) ╭
  I reply you as ChatGPT does but better!
  
  Commands available:
  help - Get the bot manual
      `)
  }

  async function main() {
    try {
      console.log('connected')
    } catch (e) {
      console.error(e);
    } finally {
    }

    bot.command('/start', ctx => {
      sendHelpMessage(ctx)
    })
    bot.command('/help', ctx => {
      sendHelpMessage(ctx)
    })

    bot.on('text', async (ctx) => {
      // Send text and Get response from ChatGPT
      const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: ctx.message.text,
        max_tokens: 80,
        temperature: 0.6,
      });
      console.log('completion', completion.data.choices);
      // Concatenate the text from all the choices in the completion data
      let response = '';
      for (const choice of completion.data.choices) {
        response += choice.text;
      }
      ctx.reply(response);
    });
    //method to start get the script to pulling updates for telegram 
    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
  }

  main().catch(err => console.log('App crashed: ' + err))


} catch (error) {
  console.log('error in big try-catch:')
  console.log(error)
}