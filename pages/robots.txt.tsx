const getRobots = () => `# Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml

User-agent: *
Allow: /*

Disallow: /api/*
Disallow: /_preview/*
`;

export default function RobotsTxtPage() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(getRobots());
  res.end();

  return { props: {} };
}
