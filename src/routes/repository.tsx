import { ErrorWidget } from "../lib/error.tsx";
import type { Result } from "../lib/result.d.ts";

interface Repository {
  fullName: string;
  ownerAvatar: string;
  description: string;
}

async function getRepository(
  owner: string,
  repo: string,
): Promise<Result<Repository>> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get("GH_TOKEN")}`,
    },
  });
  if (!res.ok) return { success: false, message: `HTTP_${res.status}` };

  const data = await res.json();

  return {
    success: true,
    data: {
      fullName: data.full_name,
      ownerAvatar: data.owner.avatar_url,
      description: data.description,
    },
  };
}

export async function Repository(params: URLSearchParams) {
  const owner = params.get("owner");
  const repoName = params.get("repo");
  const name = params.get("name") ?? repoName;
  if (!owner || !repoName) return <ErrorWidget message="INVALID_PARAMS" />;

  const res = await getRepository(owner, repoName);
  if (!res.success) return <ErrorWidget message={res.message} />;

  const repo = res.data;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingTop: 33,
        paddingBottom: 33,
        paddingLeft: 37,
        paddingRight: 37,
        width: 840,
        height: 300,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "rgba(var(--color), 0.1)",
        borderRadius: 40,
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
          width: "100%",
          position: "absolute",
          top: 33,
          right: 37,
        }}
      >
        <img
          src={repo.ownerAvatar}
          width="64"
          height="64"
          style={{ borderRadius: 32 }}
        />
      </div>
      <span
        style={{
          fontFamily: "Pretendard",
          fontWeight: 600,
          fontSize: 26,
          lineHeight: "31px",
          color: "rgba(var(--color), 0.8)",
        }}
      >
        {repo.fullName}
      </span>
      <span
        style={{
          fontFamily: "Pretendard",
          fontWeight: 700,
          fontSize: 40,
          lineHeight: "48px",
          color: "rgb(var(--color))",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "Pretendard",
          fontWeight: 500,
          fontSize: 26,
          lineHeight: "31px",
          color: "rgba(var(--color), 0.6)",
        }}
      >
        {repo.description}
      </span>
    </div>
  );
}
