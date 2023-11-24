import { bot, monitorQueue } from "../index";

bot.command("monitor", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1);
  if (args.length !== 3) {
    ctx.reply("You need to enter 3 arguments. url - interval - threshold");
    return;
  }
  const url = args[0];
  const interval = +args[1];
  const threshold = +args[2];

  if (![10, 20, 30].includes(interval)) {
    ctx.reply("interval should be 10, 20, or 30 minutes");
    return;
  }

  if (threshold < 0 || threshold > 10) {
    ctx.reply("threshold should be between 1 and 10");
    return;
  }

  const website = await ctx.prisma.websites.findFirst({
    where: {
      userId: ctx.from.id,
      url
    }
  });

  if (website) {
    ctx.reply("you have already registered this website");
    return;
  }

  const newWebsite = await ctx.prisma.websites.create({
    data: {
      userId: ctx.from.id,
      url,
      interval,
      threshold
    },
    include: {
      user: true
    }
  });

  await monitorQueue.add({
    url,
    email: newWebsite.user.email,
    userId: ctx.from.id,
    websiteId: newWebsite.id,
    threshold,
  }, {
    // repeat: {
    //   every: interval * 60 * 1000
    // }
  });
});
