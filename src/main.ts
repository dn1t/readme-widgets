import "std/dotenv/load";
import { serveRoute } from "./lib/serve-route.ts";
import { RecentlyPlayed } from "./routes/recently-played.tsx";

export type Handler = (req: Request, url: URL) => Promise<Response> | Response;

Deno.serve((req) => {
	const url = new URL(req.url);
	const params = url.searchParams;

	switch (url.pathname) {
		case "/recently-played":
			return serveRoute(
				RecentlyPlayed,
				{ width: 640, height: 300 },
				[500, 600, 700],
				params,
			);
		default:
			return new Response(null, { status: 404 });
	}
});
