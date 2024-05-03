export function ErrorWidget({ message }: { message: string }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				backgroundColor: "#e5484d",
				width: "100%",
				height: "100%",
				padding: 28,
				borderRadius: 40,
			}}
		>
			<span
				style={{
					fontFamily: "Pretendard",
					fontWeight: 700,
					fontSize: 32,
					lineHeight: 1,
					color: "#fff",
				}}
			>
				ERROR: {message}
			</span>
			<span
				style={{
					fontFamily: "Pretendard",
					fontWeight: 700,
					fontSize: 32,
					lineHeight: 1,
					color: "#fff",
				}}
			>
				&gt; _
			</span>
		</div>
	);
}
