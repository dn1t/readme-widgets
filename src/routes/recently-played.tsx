import { ErrorWidget } from "../lib/error.tsx";
import type { Result } from "../lib/result.d.ts";

interface Track {
	name: string;
	artist: string;
	artwork: string;
	bgColor: string;
	textColor: string;
	width: number;
	height: number;
}

async function getRecentlyPlayed(
	size: number,
	lang: string,
): Promise<Result<Track>> {
	const res = await fetch(
		`https://api.music.apple.com/v1/me/recent/played/tracks?l=${lang}`,
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

	const aspectRatio = attributes.artwork.width / attributes.artwork.height;

	let width: number;
	let height: number;

	if (aspectRatio < 1) {
		height = Math.round(size);
		width = Math.round(height * aspectRatio);
	} else {
		width = Math.round(size);
		height = Math.round(width / aspectRatio);
	}

	return {
		success: true,
		data: {
			name: attributes.name,
			artist: attributes.artistName,
			artwork: attributes.artwork.url
				.replace("{w}", width)
				.replace("{h}", height),
			bgColor: `#${attributes.artwork.bgColor}`,
			textColor: `#${attributes.artwork.textColor1}`,
			width,
			height,
		},
	};
}

export async function RecentlyPlayed(params: URLSearchParams) {
	const size = Number.parseInt(params.get("artwork_size") ?? "708");
	if (size < 1 || Number.isNaN(size))
		return <ErrorWidget message="INVALID_PARAMS" />;

	const lang = params.get("language") ?? "en-US";

	const res = await getRecentlyPlayed(size, lang);
	if (!res.success) return <ErrorWidget message={res.message} />;

	const track = res.data;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "flex-end",
				padding: 29,
				gap: 32,
				position: "relative",
				width: 640,
				height: 300,
				backgroundColor: track.bgColor,
				borderWidth: 3,
				borderStyle: "solid",
				borderColor: "rgba(255, 255, 255, 0.15)",
				borderRadius: 40,
			}}
		>
			<img
				src={track.artwork}
				width={track.width}
				height={track.height}
				style={{
					width: 236,
					height: 236,
					boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.25)",
					borderRadius: 12,
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: 0,
					gap: 10,
					width: 308,
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-start",
						justifyContent: "flex-end",
						padding: 0,
						gap: 10,
						width: 308,
						height: 107,
					}}
				>
					<svg
						width="32"
						height="40"
						viewBox="0 0 32 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M31.835 31.4516C31.9918 30.7069 31.9984 30.0307 31.9984 29.286H32V1.55221C32 0.546149 31.4692 -0.074476 30.5253 0.00718514C30.3832 0.0202509 29.1208 0.244002 28.9689 0.275034L11.4943 3.80116L11.4878 3.8028C11.0321 3.89916 10.6761 4.06084 10.3984 4.29276C10.0653 4.57204 9.88074 4.96728 9.81052 5.42785C9.79582 5.52585 9.77132 5.7251 9.77132 6.01908V27.8912C9.77132 28.4008 9.73049 28.8989 9.38427 29.3219C9.03804 29.7449 8.60853 29.8723 8.10879 29.9736L6.96722 30.2038C5.52352 30.4946 4.58447 30.6922 3.7336 31.0221C2.9203 31.3389 2.31114 31.7407 1.8261 32.2486C0.864176 33.2563 0.473855 34.6234 0.607774 35.9038C0.723728 36.9948 1.21367 38.0401 2.058 38.8142C2.62797 39.3352 3.34002 39.7337 4.17945 39.9019C5.05155 40.0767 5.97754 40.0146 7.33305 39.7419C8.05489 39.5965 8.72938 39.3695 9.37447 38.989C10.0114 38.6133 10.5569 38.1119 10.9831 37.5011C11.4094 36.8886 11.687 36.2076 11.8389 35.4841C11.994 34.7393 12.0332 34.0632 12.0332 33.3184V14.3485C12.0332 13.331 12.3207 13.0632 13.1405 12.8656C13.1405 12.8656 27.6673 9.93555 28.3434 9.80326C29.2906 9.62197 29.7348 9.89145 29.7348 10.8828V23.8326C29.7348 24.3455 29.7283 24.8632 29.3804 25.2895C29.0342 25.7125 28.6047 25.8399 28.105 25.9411L26.9634 26.1714C25.5197 26.4621 24.5806 26.6598 23.7298 26.9897C22.9165 27.3065 22.3073 27.7083 21.8223 28.2162C20.862 29.2239 20.4357 30.5909 20.5696 31.8714C20.684 32.9624 21.2098 34.0076 22.0542 34.7818C22.6241 35.3044 23.3362 35.6915 24.1756 35.8597C25.0477 36.0345 25.9737 35.9724 27.3292 35.6996C28.0511 35.5543 28.7255 35.3371 29.3706 34.9565C30.0076 34.5809 30.553 34.0795 30.9793 33.4687C31.4055 32.8562 31.6832 32.1751 31.835 31.4516Z"
							fill={track.textColor}
						/>
					</svg>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "flex-end",
						padding: 0,
						gap: 6,
						width: 308,
					}}
				>
					<span
						style={{
							fontFamily: "Pretendard",
							fontWeight: 600,
							fontSize: 22,
							lineHeight: "26px",
							color: `${track.textColor}cc`,
							width: 308,
						}}
					>
						RECENTLY PLAYED
					</span>
					<span
						style={{
							fontFamily: "Pretendard",
							fontWeight: 700,
							fontSize: 36,
							lineHeight: "43px",
							color: track.textColor,
							width: 308,
						}}
					>
						{track.name}
					</span>
					<span
						style={{
							fontFamily: "Pretendard",
							fontWeight: 500,
							fontSize: 32,
							lineHeight: "38px",
							color: `${track.textColor}cc`,
						}}
					>
						{track.artist}
					</span>
				</div>
			</div>
		</div>
	);
}
