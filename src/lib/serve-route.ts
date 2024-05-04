import type { ReactNode } from "react";
import { generateSvg } from "./generate-svg.ts";

export async function serveRoute(
  el: (params: URLSearchParams) => Promise<ReactNode> | ReactNode,
  dimensions: { width: number; height: number },
  weights: (400 | 500 | 600 | 700)[],
  params: URLSearchParams,
) {
  const result = await generateSvg(el, dimensions, weights, params);
  const style =
    "<style>:root{--color:0,0,0}@media(prefers-color-scheme: dark){:root{--color:255,255,255}}</style>";

  return new Response(result.replace("><defs>", `>${style}<defs>`), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-cache" },
  });
}
