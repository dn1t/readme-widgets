import "std/dotenv/load";
import { serveRoute } from "./lib/serve-route.ts";
import { RecentlyPlayed } from "./routes/recently-played.tsx";
import { redirect } from "./routes/redirect.tsx";
import { Repository } from "./routes/repository.tsx";

export type Handler = (req: Request, url: URL) => Promise<Response> | Response;

Deno.serve((req) => {
  const url = new URL(req.url);
  const params = url.searchParams;
  const _colorScheme = params.get("colorScheme");
  const colorScheme =
    _colorScheme === "light" || _colorScheme === "dark" ? _colorScheme : "auto";

  switch (url.pathname) {
    case "/redirect":
      return redirect(params);
    case "/recently-played":
      return serveRoute(
        RecentlyPlayed,
        { width: 640, height: 300 },
        [500, 600, 700],
        params,
      );
    case "/repository":
      return serveRoute(
        Repository,
        { width: 840, height: 300, resize: { width: 420, height: 150 } },
        [500, 600, 700],
        params,
        colorScheme,
      );
    default:
      return new Response(null, { status: 404 });
  }
});
