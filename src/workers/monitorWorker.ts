import prisma from "../prisma";
import { emailQueue, monitorQueue } from "../index";

(async () => {
  await monitorQueue.process(async ({ data: { url, email, threshold, userId, websiteId }}) => {
    let ok = false;
    try {
      const request = await fetch(url, { method: "GET" })
      ok = request.ok;
    } catch (err) {
      let failure = 0;
      for (let i = 0; i < threshold; i++) {
        ok = await fetch(url, { method: "GET" })
          .then(data => data.ok)
          .catch(err => false);
        if (ok)
          break;
        failure++;
      }
      if (failure === threshold && email) {
        await emailQueue.add({
          email,
          url,
        });
      }
    } finally {
      await prisma.requests.create({
        data: {
          userId,
          websiteId,
          ok
        }
      });
    }
  });
})();