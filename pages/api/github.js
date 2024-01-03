const isRelevantEventType = (type) => ['PushEvent', 'PullRequestEvent', 'WatchEvent'].includes(type);

const getMessage = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload.commits?.[0]?.message || 'No commit message';
    case 'PullRequestEvent':
      return payload.pull_request.title;
    case 'WatchEvent':
      return `starred ${repo.name}`;
    default:
      return null;
  }
}

const getURL = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return `https://github.com/hackclub/dns/commit/${payload.head}`;
    case 'PullRequestEvent':
      return payload.pull_request.html_url;
    case 'WatchEvent':
      return `https://github.com/${repo.name}`;
    default:
      return null;
  }
}

export async function fetchGitHub() {
  const initialGitHubData = await fetch('https://api.github.com/orgs/hackclub/events').then(r => r.json());

  const gitHubData = initialGitHubData
    .filter(({ type }) => isRelevantEventType(type))
    .map(({ type, actor, payload, repo, created_at }) => ({
      type,
      user: actor.login,
      userImage: actor.avatar_url,
      message: getMessage(type, payload, repo),
      time: created_at,
      url: getURL(type, payload, repo)
    }));

  return gitHubData;
}

export default async function github(req, res) {
  const git = await fetchGitHub(req, res);
  res.json(git);
}
