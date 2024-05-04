import type { ReactNode } from "react";
import { generateSvg } from "./generate-svg.ts";

export async function serveRoute(
  el: (params: URLSearchParams) => Promise<ReactNode> | ReactNode,
  dimensions: {
    width: number;
    height: number;
    resize?: { width: number; height: number };
  },
  weights: (400 | 500 | 600 | 700)[],
  params: URLSearchParams,
) {
  let result = await generateSvg(el, dimensions, weights, params);
  const style =
    "<style>:root{--color:0,0,0}@media(prefers-color-scheme: dark){:root{--color:255,255,255}}</style>";
  result = result.replace("><defs>", `>${style}<defs>`);

  if (dimensions.resize) {
    result = result.replace(
      `width="${dimensions.width}" height="${dimensions.height}"`,
      `width="${dimensions.resize.width}" height="${dimensions.resize.height}"`,
    );
  }

  return new Response(result.replace("><defs>", `>${style}<defs>`), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-cache" },
  });
}
