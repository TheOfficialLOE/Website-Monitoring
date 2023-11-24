import { bot } from "../index";

bot.command("stats", async (ctx) => {
  const url = ctx.message.text.split(" ").slice(1).join();
  if (!url) {
    ctx.reply("enter your url");
    return;
  }
  const records = await ctx.prisma.requests.findMany({
    where: {
      userId: ctx.from.id,
      website: {
        url
      }
    },
    orderBy: {
      timestamp: "desc"
    },
    take: 10
  });
  let response = "";
  records.forEach(record => {
    if (record.ok)
      response += `${record.timestamp} ✅ \n`;
    else
      response += `${record.timestamp} 🚫 \n`;
  });
  ctx.reply(response);
});