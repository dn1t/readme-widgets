import type { ReactNode } from "react";
import satori, { init as initSatori } from "satori/wasm";
import { loadWeights } from "./load-weights.ts";
import initYoga from "yoga-wasm-web";

const initialized = Deno.readFile(
	new URL("../../assets/yoga.wasm", import.meta.url),
)
	.then((res) => initYoga(res))
	.then((yoga) => initSatori(yoga));

export async function generateSvg(
	el: () => ReactNode,
	{ width, height }: { width: number; height: number },
) {
	await initialized;
	const fonts = await loadWeights([400]);

	return satori(el(), { width, height, fonts });
}
