import type { Result } from "../lib/result.d.ts";

async function getRecentlyPlayed(): Promise<Result<string>> {
	const res = await fetch(
		"https://api.music.apple.com/v1/me/recent/played/tracks?l=en-US",
		{
			headers: {
				Authorization: `Bearer ${Deno.env.get("AM_DEV_TOKEN")}`,
				"Music-User-Token": Deno.env.get("AM_USER_TOKEN") ?? "",
			},
		},
	);
	if (!res.ok) return { success: false, message: `HTTP_${res.status}` };

	const data = await res.json();
	const attributes = data.data?.[0]?.attributes;
	if (!attributes) return { success: false, message: "EMPTY_DATA" };

	return {
		success: true,
		data: attributes.url,
	};
}

export async function redirect(params: URLSearchParams): Promise<Response> {
	const to = params.get("to");
	if (!to)
		return Response.json(
			{ success: false, message: "INVALID_PARAMS" },
			{ status: 400 },
		);

	if (to === "recently-played") {
		const res = await getRecentlyPlayed();
		if (!res.success)
			return Response.json(
				{ success: false, message: res.message },
				{ status: 500 },
			);

		return new Response(res.data, {
			status: 302,
			headers: {
				Location: res.data,
			},
		});
	}

	return Response.json(
		{ success: false, message: "INVALID_PARAMS" },
		{ status: 404 },
	);
}
