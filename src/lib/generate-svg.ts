import type { ReactNode } from "react";
import satori, { init as initSatori } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import { loadWeights } from "./load-weights.ts";

const initialized = Deno.readFile(
  new URL("../../assets/yoga.wasm", import.meta.url),
)
  .then((res) => initYoga(res))
  .then((yoga) => initSatori(yoga));

export async function generateSvg(
  el: (params: URLSearchParams) => Promise<ReactNode> | ReactNode,
  { width, height }: { width: number; height: number },
  weights: (400 | 500 | 600 | 700)[],
  params: URLSearchParams,
) {
  const [fonts, node] = await Promise.all([
    loadWeights(weights),
    el(params),
    initialized,
  ]);

  return satori(node, { width, height, fonts });
}
