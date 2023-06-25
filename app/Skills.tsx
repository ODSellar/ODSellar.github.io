export default function Skills({}: {}): JSX.Element {
  const skills = [
    'C#',
    '.NET Framework and Core',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'SQL Server',
    'PostgreSQL',
    'HTML',
    'CSS',
    'Tailwind',
    'Unit Testing',
    'REST',
    'AWS',
    'CI/CD',
    'Git',
    'Jira',
    'Agile',
    'Scrum',
  ];

  return (
    <div className="my-4">
      <h2>Skills</h2>
      <div className="flex flex-wrap my-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-stone-200 rounded-full px-3 py-1 text-sm font-semibold text-stone-700 mr-2 mb-2 dark:bg-stone-700 dark:text-stone-200"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
