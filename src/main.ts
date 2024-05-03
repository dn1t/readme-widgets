import { serveRoute } from "./lib/serve-route.ts";
import { Hello } from "./routes/hello.tsx";

export type Handler = (req: Request, url: URL) => Promise<Response> | Response;

Deno.serve((req) => {
	const url = new URL(req.url);

	switch (url.pathname) {
		case "/hello":
			return serveRoute(Hello, { width: 400, height: 300 });
		default:
			return new Response(null, { status: 404 });
	}
});
