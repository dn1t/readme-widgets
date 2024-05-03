import type { SatoriOptions } from "satori/wasm";

export function loadWeights(
	weights: (400 | 500 | 600 | 700)[],
): Promise<SatoriOptions["fonts"]> {
	if (!weights.includes(700)) weights.push(700);

	return Promise.all(
		weights.map((weight) =>
			Deno.readFile(
				new URL(
					`../../assets/Pretendard-${
						weight === 500
							? "Medium"
							: weight === 600
								? "SemiBold"
								: weight === 700
									? "Bold"
									: "Regular"
					}.subset.woff`,
					import.meta.url,
				),
			)
				.then((res) => res.buffer)
				.then((data) => ({ name: "Pretendard", weight, data })),
		),
	);
}
