export default function getGithubUrl({ owner, repo, branch, file }) {
  return `https://github.com/${owner}/${repo}/blob/${branch}/${file}`;
}
