import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/text.js") {
    const js = await Deno.readTextFile("text.js");
    return new Response(js, {
      headers: { "Content-Type": "application/javascript" },
    });
  }

  return new Response("Not found", { status: 404 });
});
