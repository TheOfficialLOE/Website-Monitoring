import { bot } from "../index";

bot.help((ctx) => {
  ctx.reply("list of commands: \n" +
    "/monitor [url, interval, threshold]: register your website to be monitored. \n" +
    "/email [email]: register your email to be notified whenever your website is found down. \n" +
    "/stats [url]: see the history of your status over the defined interval.")
})