import { Context, Telegraf } from "telegraf";
import { PrismaClient } from '@prisma/client';
import prisma from "./prisma";
import Bull, { Queue } from "bull";
import { ServerKeys } from "./ServerKeys";

export interface MyContext extends Context {
  prisma: PrismaClient;
}

interface MonitorJobPayload {
  url: string;
  email: string | null;
  userId: number;
  websiteId: string;
  threshold: number;
}

interface EmailJobPayload {
  email: string;
  url: string;
}

export const monitorQueue: Queue<MonitorJobPayload> = new Bull("website-monitor", ServerKeys.REDIS_URL);
export const emailQueue: Queue<EmailJobPayload> = new Bull("email", ServerKeys.REDIS_URL);

export const bot = new Telegraf<MyContext>(ServerKeys.TELEGRAM_SECRET);

(async () => {
  console.log("launching the bot...");
  bot.use((ctx, next) => {
    ctx.prisma = prisma;
    next();
  });
  await bot.launch();
})();

import("./workers/monitorWorker");
import("./workers/emailWorker");

import("./commands/start");
import("./commands/help");
import("./commands/monitor");
import("./commands/email");
import("./commands/stats");
