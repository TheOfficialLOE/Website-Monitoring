import { bot } from "../index";

bot.command("start", async (ctx) => {
  await ctx.prisma.users.upsert({
    where: {
      id: ctx.from.id
    },
    create: {
      id: ctx.from.id
    },
    update: { }
  })
  await ctx.reply("welcome 🥳");
});