import type { SatoriOptions } from "satori/wasm";

export function loadWeights(
	weights: (400 | 500 | 600)[],
): Promise<SatoriOptions["fonts"]> {
	return Promise.all(
		weights.map((weight) =>
			Deno.readFile(
				new URL(
					`../../assets/Pretendard-${
						weight === 500 ? "Medium" : weight === 600 ? "SemiBold" : "Regular"
					}.subset.woff`,
					import.meta.url,
				),
			)
				.then((res) => res.buffer)
				.then((data) => ({ name: "Pretendard", data })),
		),
	);
}
