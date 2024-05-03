import type { ReactNode } from "react";
import { generateSvg } from "./generate-svg.ts";

export async function serveRoute(
	el: () => ReactNode,
	dimensions: { width: number; height: number },
) {
	const result = await generateSvg(el, dimensions);

	return new Response(result, { headers: { "Content-Type": "image/svg+xml" } });
}
