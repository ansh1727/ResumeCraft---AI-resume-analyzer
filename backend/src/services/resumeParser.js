import fs from 'fs';
import pdf from 'pdf-parse';

export const parseResumePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(dataBuffer);
  const text = pdfData.text;

  const extractedData = {
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
    education: extractSection(text, ['education', 'academic', 'qualification']),
    projects: extractSection(text, ['projects', 'project']),
    experience: extractSection(text, ['experience', 'work experience', 'employment']),
    certifications: extractSection(text, ['certifications', 'certificates', 'certification']),
    rawText: text,
  };

  return extractedData;
};

const extractEmail = (text) => {
  const match = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  return match ? match[0] : '';
};

const extractPhone = (text) => {
  const patterns = [
    /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
    /(\+91[\s-]?)?[6-9]\d{9}/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0].trim();
  }
  return '';
};

const extractName = (text) => {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 5)) {
    if (
      line.length > 2 &&
      line.length < 50 &&
      !line.includes('@') &&
      !/^\d/.test(line) &&
      !/^(resume|curriculum vitae|cv)$/i.test(line)
    ) {
      return line;
    }
  }
  return '';
};

const COMMON_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP',
  'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Next.js', 'Django', 'Flask', 'Spring',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'Git', 'CI/CD', 'REST API', 'GraphQL', 'HTML', 'CSS', 'Tailwind', 'Bootstrap',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Data Analysis',
  'Agile', 'Scrum', 'Jira', 'Figma', 'Linux', 'SQL', 'NoSQL', 'Microservices',
  'FastAPI', 'NestJS', 'Svelte', 'Webpack', 'Vite', 'Jest', 'Cypress',
];

const extractSkills = (text) => {
  const lowerText = text.toLowerCase();
  const found = COMMON_SKILLS.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );
  return [...new Set(found)];
};

const extractSection = (text, keywords) => {
  const lines = text.split('\n');
  const results = [];
  let capturing = false;
  let sectionLines = [];

  const sectionHeaders = [
    'experience', 'education', 'skills', 'projects', 'certifications',
    'summary', 'objective', 'contact', 'references', 'achievements',
  ];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const lowerLine = trimmed.toLowerCase();
    const isTargetHeader = keywords.some((kw) => lowerLine.includes(kw) && trimmed.length < 60);
    const isOtherHeader = sectionHeaders.some(
      (h) => lowerLine.includes(h) && trimmed.length < 60 && !keywords.some((kw) => lowerLine.includes(kw))
    );

    if (isTargetHeader) {
      if (sectionLines.length > 0) results.push(sectionLines.join(' ').trim());
      capturing = true;
      sectionLines = [];
      continue;
    }

    if (capturing && isOtherHeader) {
      if (sectionLines.length > 0) results.push(sectionLines.join(' ').trim());
      capturing = false;
      sectionLines = [];
      continue;
    }

    if (capturing) {
      sectionLines.push(trimmed);
    }
  }

  if (sectionLines.length > 0) results.push(sectionLines.join(' ').trim());

  if (results.length === 0) {
    for (const kw of keywords) {
      const regex = new RegExp(`${kw}[:\\s]+(.{20,200})`, 'i');
      const match = text.match(regex);
      if (match) results.push(match[1].trim());
    }
  }

  return results.filter((r) => r.length > 5).slice(0, 10);
};
