import _getGithubUrl from '@src/lib/github/getGithubUrl';

const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO;

export default function getGithubUrl(previewPath: string) {
  // Append .tsx extension if not exist
  if (!previewPath.endsWith('.tsx')) {
    previewPath += '.tsx';
  }

  // Resolve absolute import
  if (previewPath.startsWith('@src')) {
    previewPath = previewPath.replace('@src', 'src');
  }

  // Resolve relative path
  if (previewPath.startsWith('./')) {
    previewPath = previewPath.replace('./', 'src/components/_preview/');
  }

  const repoParts = githubRepo.split('/');
  const repoName = repoParts.pop();
  const owner = repoParts.pop();

  return _getGithubUrl({
    owner,
    repo: repoName,
    branch: 'main',
    file: previewPath,
  });
}
