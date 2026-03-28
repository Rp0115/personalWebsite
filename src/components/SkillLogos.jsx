/**
 * Skill icons from Devicon (MIT) — https://devicon.dev/
 * Served via jsDelivr from github.com/devicons/devicon
 */
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

function devicon(slug, filename) {
  return `${DEVICON_BASE}/${slug}/${filename}`
}

/** Hugging Face is not in Devicon; official mark from their site */
const HUGGINGFACE_LOGO =
  'https://huggingface.co/front/assets/huggingface_logo-noborder.svg'

const SKILLS = [
  { name: 'Java', src: devicon('java', 'java-original.svg') },
  { name: 'Python', src: devicon('python', 'python-original.svg') },
  { name: 'C', src: devicon('c', 'c-original.svg') },
  { name: 'Kotlin', src: devicon('kotlin', 'kotlin-original.svg') },
  { name: 'SQL', src: devicon('mysql', 'mysql-original.svg') },
  { name: 'Postgres', src: devicon('postgresql', 'postgresql-original.svg') },
  { name: 'JavaScript', src: devicon('javascript', 'javascript-original.svg') },
  { name: 'HTML', src: devicon('html5', 'html5-original.svg') },
  { name: 'CSS', src: devicon('css3', 'css3-original.svg') },
  { name: 'AWS', src: devicon('amazonwebservices', 'amazonwebservices-original-wordmark.svg') },
  { name: 'Kubernetes', src: devicon('kubernetes', 'kubernetes-plain.svg') },
  { name: 'Docker', src: devicon('docker', 'docker-original.svg') },
  { name: 'OracleDB', src: devicon('oracle', 'oracle-original.svg') },
  { name: 'Unix/Linux', src: devicon('linux', 'linux-original.svg') },
  { name: 'Firebase', src: devicon('firebase', 'firebase-plain.svg') },
  { name: 'Git', src: devicon('git', 'git-original.svg') },
  { name: 'React', src: devicon('react', 'react-original.svg') },
  { name: 'Laravel', src: devicon('laravel', 'laravel-original.svg') },
  { name: 'FastAPI', src: devicon('fastapi', 'fastapi-original.svg') },
  { name: 'Django', src: devicon('django', 'django-plain.svg') },
  { name: 'PyTorch', src: devicon('pytorch', 'pytorch-original.svg') },
  { name: 'TensorFlow', src: devicon('tensorflow', 'tensorflow-original.svg') },
  { name: 'Scikit-learn', src: devicon('scikitlearn', 'scikitlearn-original.svg') },
  { name: 'HuggingFace', src: HUGGINGFACE_LOGO },
]

export default function SkillLogos() {
  return (
    <ul className="skills-logos" aria-label="Technologies">
      {SKILLS.map((s) => (
        <li key={s.name} className="skills-logos__item">
          <img
            className="skills-logos__logo"
            src={s.src}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <span className="skills-logos__name">{s.name}</span>
        </li>
      ))}
    </ul>
  )
}
