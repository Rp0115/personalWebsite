import { Fragment, useMemo, useState } from 'react'
import SkillLogos from './SkillLogos.jsx'

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/riju-pant', icon: 'in' },
  { label: 'GitHub', href: 'https://github.com/Rp0115', icon: 'gh' },
  { label: 'Email', href: 'mailto:riju0115@gmail.com', icon: 'mail' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/riju0115/', icon: 'lc' },
]

const CAREER_ENTRIES = [
  // {
  //   type: 'education',
  //   headline: 'M.S. Computer Science',
  //   organization: 'University of Pennsylvania',
  //   period: 'Aug 2026 – May 2028',
  //   body: 'Graduate student in Computer Science at the University of Pennsylvania for the Masters of Science in Computer Science.',
  //   tags: ['Algorithms', 'Systems'],
  // },
  {
    type: 'education',
    headline: 'B.S. Computer Science',
    organization: 'Temple University',
    period: 'Aug 2023 – May 2026',
    body: 'GPA 3.9/4.0. Coursework includes software design, OS and systems programming, data structures and algorithms, ML, database systems, and probability.',
    tags: ['Algorithms', 'Systems', 'Machine learning'],
    current: true,
  },
  {
    type: 'work',
    headline: 'Computer Vision Research Assistant',
    organization: 'Temple University',
    period: 'Feb 2026 – Present',
    body: 'Building a multimodal VLM pipeline (MiniGPT4-Video, Mistral-7B) for binary stress classification, with token balancing, Toeplitz signal transforms for ViT, and LoRA training.',
    current: true,
    employment: 'Research',
    tags: ['PyTorch', 'HuggingFace', 'LoRA'],
  },
  {
    type: 'work',
    headline: 'Software Engineering Intern',
    organization: 'Qbit Robotics',
    period: 'Jan 2025 – Apr 2025',
    body: 'Computer vision for Toyota: YOLO-based crack detection on industrial furnaces, Python video-to-frame pipeline, Label Studio dataset (1,000+ annotations), and glare-robust preprocessing.',
    employment: 'Internship',
    tags: ['Python', 'YOLO', 'OpenCV'],
  },
  // {
  //   type: 'work',
  //   headline: 'Full-stack Engineer',
  //   organization: 'City Traffic Simulator',
  //   period: 'Oct 2025 – Dec 2025',
  //   body: 'Traffic simulation in React and Firebase: async vehicle movement, collision detection, synchronized lights, BFS flood-fill flow, and Auth/Firestore for saved city layouts.',
  //   employment: 'Project',
  //   tags: ['React', 'Firebase', 'Algorithms'],
  // },
  // {
  //   type: 'work',
  //   headline: 'Machine Learning Researcher',
  //   organization: 'Breast Cancer Classification',
  //   period: 'Jun 2025 – Jul 2025',
  //   body: 'End-to-end pipeline on a clinical dataset; compared SVM, logistic regression, and random forest with 5-fold CV and tuning—SVM (linear) reached 96.3% accuracy and 0.95 F1.',
  //   employment: 'Research',
  //   tags: ['Python', 'Scikit-learn', 'ML'],
  // },
  {
    type: 'work',
    headline: 'AI Therapist Developer',
    organization: 'Temple University',
    period: 'Apr 2025 – Sep 2025',
    body: 'Fine-tuned an open-source LLM on therapy-style dialogue. Full-stack app with Laravel and a FastAPI backend for Python services.',
    employment: 'Developer',
    tags: ['Laravel', 'FastAPI', 'LLM'],
  },
  {
    type: 'work',
    headline: 'IT Engineer',
    organization: 'ITCS Group',
    period: 'Jul 2021 – Aug 2021',
    body: 'Tokyo 2020 Olympics: PTP sync for TSR, sub-microsecond timing, failover for broadband partners, and media-hub reliability.',
    employment: 'Internship',
    tags: ['Networking', 'Infrastructure'],
  },
]

/** Shown in the grep -iE command for Education mode */
const GREP_EDUCATION_PATTERN = 'Education|Degree|School|University|BSc'

/** Shown in the grep -iE command for Career mode */
const GREP_CAREER_PATTERN =
  'Internship|Intern|Engineer|Company|Software'

const ABOUT_FACTS = {
  location: 'Philadelphia, PA',
  degree: 'B.S. Computer Science · Temple University',
  focus: 'Applied software engineering, computer vision, ML, and full-stack systems',
}

const FEATURED_PROJECTS = [
  {
    project_name: 'City Traffic Simulator',
    tech_stack: ['React', 'Firebase'],
    description:
      '2D grid traffic engine with collision detection, synchronized lights, lane and intersection logic, and saved layouts via Firebase Auth and Firestore.',
    href: 'https://github.com/Rp0115/final-project-02-citytraffic',
  },
  {
    project_name: 'Breast Cancer Classification Research',
    tech_stack: ['Python', 'Sci-kit Learn'],
    description:
      'End-to-end pipeline on a clinical dataset; compared SVM, logistic regression, and random forest with 5-fold CV and tuning—SVM (linear) reached 96.3% accuracy and 0.95 F1',
    href: 'https://github.com/iggyw1g/Breast-Cancer-Classification-Project',
  },
  {
    project_name: 'EcoSteps',
    tech_stack: ['Python', 'Scikit-learn'],
    description:
      'End-to-end ML pipeline comparing SVM, logistic regression, and random forest with cross-validation and hyperparameter tuning.',
    href: 'https://github.com/PRivas1/EcoSteps',
  },
]

function ShowcaseProjectsSqlGimmick() {
  return (
    <pre className="sql-gimmick__pre projects-query__pre">
      <code>
        <span className="sql-kw">SELECT</span>
        {'\n    '}
        <span className="sql-col">sp.project_name</span>
        <span className="sql-term">, </span>
        {'\n    '}
        <span className="sql-col">sp.description</span>
        <span className="sql-term">, </span>
        {'\n    '}
        <span className="sql-col">sp.tech_stack</span>
        {'\n'}
        <span className="sql-kw">FROM</span> <span className="sql-tbl">ShowcaseProjects</span> <span className="sql-alias">sp</span>
        {'\n'}
        <span className="sql-kw">WHERE</span> <span className="sql-col">sp.is_featured</span> <span className="sql-op">=</span>{' '}
        <span className="sql-literal">TRUE</span>
        {'\n'}
        <span className="sql-kw">ORDER BY</span> <span className="sql-col">sp.personal_favorite</span> <span className="sql-kw">DESC</span>
        {'\n'}
        <span className="sql-kw">LIMIT</span> <span className="sql-literal">3</span>
        <span className="sql-term">;</span>
      </code>
    </pre>
  )
}

function ProjectGithubIcon() {
  return (
    <svg className="career-node__icon-svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.097 24 17.596 24 12c0-6.627-5.373-12-12-12z"
      />
    </svg>
  )
}

const DSA_TABLE_ROWS = [
  { key: '"LinkedList"', value: 'Project Evolution' },
  { key: '"PriorityQueue"', value: 'Task triage' },
  { key: '"Stack"', value: 'Interview Prep' },
]

const DSA_MAP_GET = [
  { label: 'LinkedList', snippet: 'map.get("LinkedList")' },
  { label: 'PriorityQueue', snippet: 'map.get("PriorityQueue")' },
  { label: 'Stack', snippet: 'map.get("Stack")' },
]

function SocialIcon({ type }) {
  if (type === 'in') {
    return (
      <svg className="intro__social-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
  if (type === 'gh') {
    return (
      <svg className="intro__social-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  }
  if (type === 'mail') {
    return (
      <svg className="intro__social-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
      </svg>
    )
  }
  if (type === 'lc') {
    return (
      <svg className="intro__social-icon intro__social-icon--lc" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <text
          x="12"
          y="12"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="11"
          fontWeight="700"
          fill="currentColor"
        >
          LC
        </text>
      </svg>
    )
  }
  return null
}

function CareerNodeIcon({ type }) {
  const cls = 'career-node__icon-svg'
  if (type === 'education') {
    return (
      <svg
        className={cls}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      </svg>
    )
  }
  return (
    <svg
      className={cls}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}

const PRIORITY_CHAOS_STEPS = [
  {
    op: 'offer',
    priority: 4,
    label: 'CSS padding',
    story:
      "I'm currently tweaking the padding on my landing page to make it perfect.",
    codeLine: 'chaos.offer(4); // CSS padding — lowest urgency',
  },
  {
    op: 'offer',
    priority: 3,
    label: '404 error',
    story:
      'But then I notice my API is returning a 404, which is a much bigger problem.',
    codeLine: 'chaos.offer(3); // 404',
  },
  {
    op: 'offer',
    priority: 2,
    label: 'Server crash',
    story: 'Suddenly, the entire server crashes, and needs to be fixed immediately.',
    codeLine: 'chaos.offer(2); // server crash',
  },
  {
    op: 'offer',
    priority: 1,
    label: 'Recruiter call',
    story:
      'Just as I start debugging, a recruiter emails me for an immediate chat, which instantly becomes the most important task in my world.',
    codeLine: 'chaos.offer(1); // recruiter — highest urgency',
  },
]

const PRIORITY_CHAOS_CODE_DECL = 'PriorityQueue<Integer> chaos = map.get("PriorityQueue");'

function pqHeapSiftUp(heap, i) {
  while (i > 0) {
    const p = Math.floor((i - 1) / 2)
    if (heap[p].priority <= heap[i].priority) break
    ;[heap[p], heap[i]] = [heap[i], heap[p]]
    i = p
  }
}

/** Replay offer steps with a real binary min-heap (array = level order). */
function priorityChaosHeapAtStep(stepIndex) {
  const heap = []
  if (stepIndex < 0) return heap
  for (let i = 0; i <= stepIndex; i++) {
    const st = PRIORITY_CHAOS_STEPS[i]
    heap.push({ priority: st.priority, label: st.label })
    pqHeapSiftUp(heap, heap.length - 1)
  }
  return heap
}

function pqHeapTreeLevels(heap) {
  if (heap.length === 0) return []
  const depth = Math.floor(Math.log2(heap.length)) + 1
  const levels = []
  for (let d = 0; d < depth; d++) {
    const start = (1 << d) - 1
    const width = 1 << d
    const row = []
    for (let pos = 0; pos < width; pos++) {
      const idx = start + pos
      row.push(idx < heap.length ? heap[idx] : null)
    }
    levels.push(row)
  }
  return levels
}

function PriorityQueueChaosDemo() {
  const [stepIndex, setStepIndex] = useState(-1)
  const lastIdx = PRIORITY_CHAOS_STEPS.length - 1
  const heap = priorityChaosHeapAtStep(stepIndex)
  const treeLevels = pqHeapTreeLevels(heap)
  const current = stepIndex >= 0 ? PRIORITY_CHAOS_STEPS[stepIndex] : null
  const stepDisplay = stepIndex >= 0 ? stepIndex + 1 : null
  const stepTotal = PRIORITY_CHAOS_STEPS.length

  return (
    <div className="stack-demo">
      <div className="stack-demo__header">
        <p className="stack-demo__eyebrow">Task triage</p>
        {stepDisplay !== null ? (
          <span className="stack-demo__step-badge" aria-hidden="true">
            {stepDisplay} / {stepTotal}
          </span>
        ) : null}
      </div>
      <pre className="stack-demo__code" role="region" aria-label="Code">
        <code className="stack-demo__code-lines">
          <span className="stack-demo__line stack-demo__line--decl">{PRIORITY_CHAOS_CODE_DECL}</span>
          {stepIndex >= 0
            ? PRIORITY_CHAOS_STEPS.slice(0, stepIndex + 1).map((s, i) => (
                <span
                  key={`${s.codeLine}-${i}`}
                  className="stack-demo__line stack-demo__line--push"
                >
                  {s.codeLine}
                </span>
              ))
            : null}
        </code>
      </pre>

      {stepIndex < 0 ? (
        <button type="button" className="btn btn--primary stack-demo__run" onClick={() => setStepIndex(0)}>
          Run simulation
        </button>
      ) : null}

      <div className="stack-demo__main">
        <div className="stack-demo__diagram-col stack-demo__diagram-col--pq-heap">
          <div
            className={`pq-heap-tree-panel ${heap.length > 0 ? 'pq-heap-tree-panel--has-data' : ''}`}
            aria-label={
              heap.length ? `Heap level-order: ${heap.map((n) => `${n.priority}:${n.label}`).join(', ')}` : 'Empty heap'
            }
          >
            {heap.length === 0 ? (
              <span className="stack-demo__empty-hint">empty</span>
            ) : (
              treeLevels.map((row, ri) => (
                <div
                  key={ri}
                  className="pq-heap-tree__level"
                  style={{ '--pq-level-gap': ri }}
                >
                  {row.map((node, ci) => (
                    <div key={`${ri}-${ci}`} className="pq-heap-tree__slot">
                      {node ? (
                        <div
                          className={`pq-heap-tree__node ${node === heap[0] ? 'pq-heap-tree__node--root' : ''}`}
                        >
                          <span className="pq-heap-tree__p">{node.priority}</span>
                          <span className="pq-heap-tree__label">{node.label}</span>
                        </div>
                      ) : (
                        <div className="pq-heap-tree__spacer" aria-hidden="true" />
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {stepIndex >= 0 ? (
        <div className="stack-demo__rail">
          {current ? (
            <div className="stack-demo__step-story" role="status" aria-live="polite">
              <span className="stack-demo__step-story-mark" aria-hidden="true" />
              <p className="stack-demo__step-story-text">{current.story}</p>
            </div>
          ) : null}
          <div className="stack-demo__controls">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setStepIndex((i) => (i <= 0 ? -1 : i - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setStepIndex((i) => Math.min(lastIdx, i + 1))}
              disabled={stepIndex >= lastIdx}
            >
              Next
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setStepIndex(-1)}>
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const PROJECT_EVOLUTION_STEPS = [
  {
    op: 'add',
    label: 'Idea',
    story: 'I start with an Idea.',
    codeLine: 'evolution.add("Idea");',
  },
  {
    op: 'add',
    label: 'Rough Sketch',
    story: 'That idea points me toward a Rough Sketch.',
    codeLine: 'evolution.add("Rough Sketch");',
  },
  {
    op: 'add',
    label: 'Buggy Prototype',
    story: 'The sketch leads me to a Prototype with bugs that somehow runs.',
    codeLine: 'evolution.add("Buggy Prototype");',
  },
  {
    op: 'add',
    label: 'Debug',
    story: 'The prototype points to a long Debug Session.',
    codeLine: 'evolution.add("Debug");',
  },
  {
    op: 'add',
    label: 'Success',
    story: 'The time spent debugging leads to a successful release.',
    codeLine: 'evolution.add("Success");',
  },
]

const PROJECT_EVOLUTION_CODE_DECL = 'LinkedList<String> evolution = map.get("LinkedList");'

function projectEvolutionListAtStep(stepIndex) {
  const list = []
  if (stepIndex < 0) return list
  for (let i = 0; i <= stepIndex; i++) {
    list.push(PROJECT_EVOLUTION_STEPS[i].label)
  }
  return list
}

function ProjectEvolutionLinkedListDemo() {
  const [stepIndex, setStepIndex] = useState(-1)
  const lastIdx = PROJECT_EVOLUTION_STEPS.length - 1
  const nodes = projectEvolutionListAtStep(stepIndex)
  const current = stepIndex >= 0 ? PROJECT_EVOLUTION_STEPS[stepIndex] : null
  const stepDisplay = stepIndex >= 0 ? stepIndex + 1 : null
  const stepTotal = PROJECT_EVOLUTION_STEPS.length

  return (
    <div className="stack-demo">
      <div className="stack-demo__header">
        <p className="stack-demo__eyebrow">Project Evolution</p>
        {stepDisplay !== null ? (
          <span className="stack-demo__step-badge" aria-hidden="true">
            {stepDisplay} / {stepTotal}
          </span>
        ) : null}
      </div>
      <pre className="stack-demo__code" role="region" aria-label="Code">
        <code className="stack-demo__code-lines">
          <span className="stack-demo__line stack-demo__line--decl">{PROJECT_EVOLUTION_CODE_DECL}</span>
          {stepIndex >= 0
            ? PROJECT_EVOLUTION_STEPS.slice(0, stepIndex + 1).map((s, i) => (
                <span key={`${s.codeLine}-${i}`} className="stack-demo__line stack-demo__line--push">
                  {s.codeLine}
                </span>
              ))
            : null}
        </code>
      </pre>

      {stepIndex < 0 ? (
        <button type="button" className="btn btn--primary stack-demo__run" onClick={() => setStepIndex(0)}>
          Run simulation
        </button>
      ) : null}

      <div className="stack-demo__main">
        <div className="stack-demo__diagram-col stack-demo__diagram-col--ll">
          <div className="stack-demo__diagram-head stack-demo__diagram-head--ll">
            <span className="stack-demo__diagram-label">Head → tail</span>
          </div>
          <div
            className="ll-demo__chain"
            aria-label={nodes.length ? `Chain: ${nodes.join(' → ')}` : 'Empty list'}
          >
            {nodes.length === 0 ? (
              <span className="stack-demo__empty-hint">empty</span>
            ) : (
              nodes.map((label, i) => (
                <Fragment key={`${label}-${i}`}>
                  {i > 0 ? (
                    <span className="ll-demo__arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <span
                    className={`ll-demo__node ${i === nodes.length - 1 ? 'll-demo__node--tail' : ''}`}
                  >
                    {label}
                  </span>
                </Fragment>
              ))
            )}
          </div>
        </div>
      </div>

      {stepIndex >= 0 ? (
        <div className="stack-demo__rail">
          {current ? (
            <div className="stack-demo__step-story" role="status" aria-live="polite">
              <span className="stack-demo__step-story-mark" aria-hidden="true" />
              <p className="stack-demo__step-story-text">{current.story}</p>
            </div>
          ) : null}
          <div className="stack-demo__controls">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setStepIndex((i) => (i <= 0 ? -1 : i - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setStepIndex((i) => Math.min(lastIdx, i + 1))}
              disabled={stepIndex >= lastIdx}
            >
              Next
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setStepIndex(-1)}>
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const INTERVIEW_PREP_IDLE_STORY = [
  'I want to land my dream job by acing this interview.',
  'Before I do that, I need to set up my laptop and check my dev environment.',
  "But before that, I need to find a room where I won't be interrupted.",
  'And before any of that can happen, I need to drink coffee to wake my brain up.',
]

const INTERVIEW_PREP_IDLE_ACTION = [
  'I start by finishing my coffee and feeling energized.',
  'Next, I head into the room and lock the door to secure my workspace.',
  'Then, I open my laptop and make sure it is screen-share ready.',
  'Finally, I join the meeting and start the conversation that leads to the offer.',
]

/** Push nested goals onto the stack, then unwind with pops — one UI step each. */
const INTERVIEW_PREP_STEPS = [
  {
    op: 'push',
    label: 'Get Hired',
    story: INTERVIEW_PREP_IDLE_STORY[0],
    codeLine: 'interviewPrep.push("Get Hired");',
  },
  {
    op: 'push',
    label: 'Laptop setup',
    story: INTERVIEW_PREP_IDLE_STORY[1],
    codeLine: 'interviewPrep.push("Laptop setup");',
  },
  {
    op: 'push',
    label: 'Quiet room',
    story: INTERVIEW_PREP_IDLE_STORY[2],
    codeLine: 'interviewPrep.push("Quiet room");',
  },
  {
    op: 'push',
    label: 'Espresso',
    story: INTERVIEW_PREP_IDLE_STORY[3],
    codeLine: 'interviewPrep.push("Espresso");',
  },
  {
    op: 'pop',
    label: 'Espresso',
    story: INTERVIEW_PREP_IDLE_ACTION[0],
    codeLine: 'interviewPrep.pop(); // "Espresso"',
  },
  {
    op: 'pop',
    label: 'Quiet room',
    story: INTERVIEW_PREP_IDLE_ACTION[1],
    codeLine: 'interviewPrep.pop(); // "Quiet room"',
  },
  {
    op: 'pop',
    label: 'Laptop setup',
    story: INTERVIEW_PREP_IDLE_ACTION[2],
    codeLine: 'interviewPrep.pop(); // "Laptop setup"',
  },
  {
    op: 'pop',
    label: 'Get Hired',
    story: INTERVIEW_PREP_IDLE_ACTION[3],
    codeLine: 'interviewPrep.pop(); // "Get Hired"',
  },
]

const INTERVIEW_PREP_CODE_DECL = 'Stack<String> interviewPrep = map.get("Stack");'

function interviewPrepStackAtStep(stepIndex) {
  const stack = []
  if (stepIndex < 0) return stack
  for (let i = 0; i <= stepIndex; i++) {
    const st = INTERVIEW_PREP_STEPS[i]
    if (st.op === 'push') stack.push(st.label)
    else if (st.op === 'pop') stack.pop()
  }
  return stack
}

function InterviewPrepStackDemo() {
  const [stepIndex, setStepIndex] = useState(-1)
  const lastIdx = INTERVIEW_PREP_STEPS.length - 1
  const stack = interviewPrepStackAtStep(stepIndex)
  const current = stepIndex >= 0 ? INTERVIEW_PREP_STEPS[stepIndex] : null
  const poppedLabel = current?.op === 'pop' ? current.label : null

  const stepDisplay = stepIndex >= 0 ? stepIndex + 1 : null
  const stepTotal = INTERVIEW_PREP_STEPS.length

  return (
    <div className="stack-demo">
      <div className="stack-demo__header">
        <p className="stack-demo__eyebrow">Interview Prep</p>
        {stepDisplay !== null ? (
          <span className="stack-demo__step-badge" aria-hidden="true">
            {stepDisplay} / {stepTotal}
          </span>
        ) : null}
      </div>
      <pre className="stack-demo__code" role="region" aria-label="Code">
        <code className="stack-demo__code-lines">
          <span className="stack-demo__line stack-demo__line--decl">{INTERVIEW_PREP_CODE_DECL}</span>
          {stepIndex >= 0
            ? INTERVIEW_PREP_STEPS.slice(0, stepIndex + 1).map((s, i) => (
                <span
                  key={`${s.codeLine}-${i}`}
                  className={`stack-demo__line ${s.op === 'push' ? 'stack-demo__line--push' : 'stack-demo__line--pop'}`}
                >
                  {s.codeLine}
                </span>
              ))
            : null}
        </code>
      </pre>

      {stepIndex < 0 ? (
        <button type="button" className="btn btn--primary stack-demo__run" onClick={() => setStepIndex(0)}>
          Run simulation
        </button>
      ) : null}

      <div className="stack-demo__main">
        <div className="stack-demo__diagram-col">
          <div className="stack-demo__diagram-head">
            <span className="stack-demo__diagram-label">Stack</span>
            <span className="stack-demo__diagram-label">Last pop</span>
          </div>
          <div className="dsa-stack-sim__diagram stack-demo__diagram">
            <div
              className={`dsa-stack-sim__column stack-demo__stack-column ${stack.length > 0 ? 'dsa-stack-sim__column--visible' : ''}`}
            >
              {stack.length === 0 ? (
                <span className="stack-demo__empty-hint">empty</span>
              ) : (
                stack.map((label, i) => {
                  const isHead = i === stack.length - 1
                  return (
                    <div
                      key={`${label}-${i}`}
                      className={`dsa-stack-sim__cell ${isHead ? 'dsa-stack-sim__cell--head' : ''}`}
                    >
                      {label}
                    </div>
                  )
                })
              )}
            </div>
            <div
              className={`dsa-stack-sim__column dsa-stack-sim__column--popped stack-demo__pop-column ${poppedLabel ? 'dsa-stack-sim__column--has-value' : ''}`}
            >
              {poppedLabel ? (
                <div className="dsa-stack-sim__cell dsa-stack-sim__cell--popped">{poppedLabel}</div>
              ) : (
                <span className="stack-demo__empty-hint">—</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {stepIndex >= 0 ? (
        <div className="stack-demo__rail">
          {current ? (
            <div className="stack-demo__step-story" role="status" aria-live="polite">
              <span className="stack-demo__step-story-mark" aria-hidden="true" />
              <p className="stack-demo__step-story-text">{current.story}</p>
            </div>
          ) : null}
          <div className="stack-demo__controls">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setStepIndex((i) => (i <= 0 ? -1 : i - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setStepIndex((i) => Math.min(lastIdx, i + 1))}
              disabled={stepIndex >= lastIdx}
            >
              Next
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setStepIndex(-1)}>
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function Portfolio() {
  const [careerMode, setCareerMode] = useState(null)
  const [activeDsaKey, setActiveDsaKey] = useState(null)
  const [projectsQueryRun, setProjectsQueryRun] = useState(false)

  const grepPattern = careerMode === 'career' ? GREP_CAREER_PATTERN : GREP_EDUCATION_PATTERN

  const filteredCareer = useMemo(() => {
    if (careerMode === null) return CAREER_ENTRIES
    if (careerMode === 'education') {
      return CAREER_ENTRIES.filter((e) => e.type === 'education')
    }
    return CAREER_ENTRIES.filter((e) => e.type === 'work')
  }, [careerMode])

  return (
    <main id="portfolio-main" className="portfolio-main">
      <div className="section__inner section__inner--narrow">
        <section className="section section--about" id="about" aria-labelledby="about-heading">
          <p className="eyebrow">About</p>
          <h1 id="about-heading" className="intro__title">
            <span className="text-accent">Riju Pant</span>
          </h1>
          <p className="intro__lede">
            Applied software development engineer focused on computer vision, machine learning, and full-stack products. This page is a single scroll through
            who I am, what I use, and what I've shipped.
          </p>
          <p>
            I care about clear pipelines, reproducible experiments, and systems that stay understandable when requirements change.
          </p>
          <dl className="about-facts" aria-label="Quick facts">
            <div className="about-facts__item">
              <dt className="about-facts__label">Location</dt>
              <dd className="about-facts__value">{ABOUT_FACTS.location}</dd>
            </div>
            <div className="about-facts__item">
              <dt className="about-facts__label">Degree</dt>
              <dd className="about-facts__value">{ABOUT_FACTS.degree}</dd>
            </div>
            <div className="about-facts__item">
              <dt className="about-facts__label">Focus</dt>
              <dd className="about-facts__value">{ABOUT_FACTS.focus}</dd>
            </div>
          </dl>
          <ul className="intro__social intro__social--after-facts" aria-label="Social and contact">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  className="intro__social-link"
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  <SocialIcon type={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Skills</h2>
          <p className="section__lede">Tools and languages I reach for most often.</p>
          <SkillLogos />
        </section>

        <section className="section section--career" id="career" aria-labelledby="career-heading">
          <h2 id="career-heading">Career</h2>
          <p className="section__lede">Education and work, grep-style.</p>
          <div className="career-gimmick">
            <pre className="career-gimmick__code">
              <code>
                <span className="career-gimmick__prompt">$</span>{' '}
                {careerMode === null ? (
                  <>
                    <span className="bash-cmd">cat</span> <span className="bash-arg">career.log</span>
                  </>
                ) : (
                  <>
                    <span className="bash-cmd">grep</span> <span className="bash-flag">-iE</span>{' '}
                    <span className="bash-quote">'</span>
                    <span className="bash-pattern">{grepPattern}</span>
                    <span className="bash-quote">'</span> <span className="bash-arg">career.log</span>
                  </>
                )}
              </code>
            </pre>
            <div className="career-gimmick__mode" role="group" aria-label="Filter career entries">
              <button
                type="button"
                className={`career-gimmick__mode-btn ${careerMode === 'education' ? 'career-gimmick__mode-btn--active' : ''}`}
                aria-pressed={careerMode === 'education'}
                onClick={() => setCareerMode((m) => (m === 'education' ? null : 'education'))}
              >
                Education
              </button>
              <button
                type="button"
                className={`career-gimmick__mode-btn ${careerMode === 'career' ? 'career-gimmick__mode-btn--active' : ''}`}
                aria-pressed={careerMode === 'career'}
                onClick={() => setCareerMode((m) => (m === 'career' ? null : 'career'))}
              >
                Career
              </button>
            </div>
            <ul className="career-timeline">
              {filteredCareer.map((entry) => (
                <li
                  key={`${entry.organization}-${entry.headline}`}
                  className={`career-node career-node--${entry.type}`}
                >
                  <div className="career-node__card">
                    <div className="career-node__header">
                      <div className="career-node__marker" aria-hidden="true">
                        <CareerNodeIcon type={entry.type} />
                      </div>
                      <div className="career-node__body">
                        <div className="career-node__meta">
                          <span className="career-node__period">{entry.period}</span>
                          {entry.current ? (
                            <span className="career-badge career-badge--current">
                              <span className="career-badge__dot" aria-hidden="true" />
                              Current
                            </span>
                          ) : null}
                          {entry.employment ? (
                            <span className="career-badge career-badge--blue">{entry.employment}</span>
                          ) : null}
                          {entry.type === 'education' && !entry.employment ? (
                            <span className="career-badge career-badge--muted">Education</span>
                          ) : null}
                        </div>
                        <h3 className="career-node__title">{entry.headline}</h3>
                        <p className="career-node__org">{entry.organization}</p>
                        {entry.body ? <p className="career-node__desc">{entry.body}</p> : null}
                        {entry.tags?.length ? (
                          <div className="career-node__tags">
                            {entry.tags.map((tag) => (
                              <span key={tag} className="career-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--projects" id="projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>
          <p className="section__lede">Run the query to load featured rows from the showcase.</p>
          <div className="projects-query">
            <ShowcaseProjectsSqlGimmick />
            <button
              type="button"
              className="btn btn--primary projects-query__run"
              onClick={() => setProjectsQueryRun(true)}
              disabled={projectsQueryRun}
              aria-expanded={projectsQueryRun}
              aria-controls="projects-query-results"
            >
              {projectsQueryRun ? 'Query executed' : 'Run query'}
            </button>
            {projectsQueryRun ? (
              <div
                id="projects-query-results"
                className="projects-query__results"
                role="region"
                aria-live="polite"
                aria-label="Query result set"
              >
                <ul className="career-timeline projects-query__timeline">
                  {FEATURED_PROJECTS.map((p) => (
                    <li key={p.href} className="career-node project-node">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="career-node__card career-node__card--link"
                        aria-label={`${p.project_name} on GitHub`}
                      >
                        <div className="career-node__header">
                          <div className="career-node__marker" aria-hidden="true">
                            <ProjectGithubIcon />
                          </div>
                          <div className="career-node__body">
                            <div className="career-node__meta">
                              <span className="career-badge career-badge--blue">GitHub</span>
                            </div>
                            <h3 className="career-node__title">{p.project_name}</h3>
                            <p className="career-node__desc">{p.description}</p>
                            {p.tech_stack?.length ? (
                              <div className="career-node__tags">
                                {p.tech_stack.map((t) => (
                                  <span key={t} className="career-tag">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <section className="section section--dsa" aria-labelledby="dsa-heading">
          <h2 id="dsa-heading">DSA Playground</h2>
          <div className="dsa-playground">
            <pre className="dsa-playground__decl">
              <code>
                <span className="java-kw">HashMap</span>
                <span className="java-gen">&lt;String, Object&gt;</span> map = <span className="java-kw">new</span>{' '}
                <span className="java-kw">HashMap</span>
                <span className="java-gen">&lt;String, Object&gt;</span>();
              </code>
            </pre>
            <div className="dsa-playground__table-wrap">
              <table className="dsa-table">
                <thead>
                  <tr>
                    <th scope="col">Key</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {DSA_TABLE_ROWS.map((row) => (
                    <tr key={row.key}>
                      <td>
                        <code>{row.key}</code>
                      </td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="career-gimmick__mode dsa-playground__mode" role="group" aria-label="Map keys to preview">
              {DSA_MAP_GET.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`career-gimmick__mode-btn ${activeDsaKey === item.label ? 'career-gimmick__mode-btn--active' : ''}`}
                  aria-pressed={activeDsaKey === item.label ? true : false}
                  title={item.snippet}
                  onClick={() => setActiveDsaKey((prev) => (prev === item.label ? null : item.label))}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="dsa-playground__panel">
              {activeDsaKey === null ? (
                <p className="dsa-playground__placeholder">Pick LinkedList, PriorityQueue, or Stack to load a demo.</p>
              ) : activeDsaKey === 'Stack' ? (
                <InterviewPrepStackDemo />
              ) : activeDsaKey === 'LinkedList' ? (
                <ProjectEvolutionLinkedListDemo />
              ) : activeDsaKey === 'PriorityQueue' ? (
                <PriorityQueueChaosDemo />
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
