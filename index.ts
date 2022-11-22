import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

serve(async (req: Request) => {
  const body = await req.json();
  const chat_id = Deno.env.get("chat_id");
  const bot_token = Deno.env.get("bot_token");
  const url = `https://api.telegram.org/bot${bot_token}/sendMessage`;
  const message = `<b>CNEP Gitlab notification🔔🔔🔔</b>
<b>New ${body.event_name} Event </b>
Repo: <b>${body.project.name}</b>
Url: <a href="${body.project.web_url}">${body.project.web_url}</a>
Author: <b>${body.user_name}</b>
Branch: <b>${body.ref}</b>
Commit: <a href="${body.commits[0].url}">${body.checkout_sha}</a>
Commit Message: <b>${body.commits[0].message}</b>`;
  const sendMessage = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
      parse_mode: "HTML",
    }),
  });
  return new Response("sent", { status: 200 });
});
