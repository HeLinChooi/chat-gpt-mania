try {

  require('dotenv').config()

  // Telegraf
  const { Telegraf } = require('telegraf');
  var http = require('http');
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

  // method that returns reply from ChatGPT
  async function sendResponse(ctx) {
    const response = "";
    bot.telegram.sendMessage(ctx.chat.id, response);
  }

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

    bot.on('text', (ctx) => ctx.reply('Hello World'));
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