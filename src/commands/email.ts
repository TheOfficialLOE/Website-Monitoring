import { bot } from "../index";

bot.command("email", async (ctx) => {
  const email = ctx.message.text.split(" ").slice(1).join();
  if (!email) {
    ctx.reply("enter your email and make sure it is in a valid format");
    return;
  }
  await ctx.prisma.users.update({
    where: {
      id: ctx.from.id
    },
    data: {
      email
    }
  });
});