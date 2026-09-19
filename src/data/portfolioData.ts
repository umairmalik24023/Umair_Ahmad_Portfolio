import { Project, SkillCategory, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: "Umair Ahmad",
  shortName: "Umair",
  role: "Software Engineer",
  yearsExperience: "2+ Years",
  email: "umairmalik24023@gmail.com",
  phone: "+92 3324559521",
  location: "Remote / Pakistan",
  openTo: "Full-time, Contract",
  github: "https://github.com/umairmalik24023",
  githubUsername: "umairmalik24023",
  linkedin: "https://linkedin.com/in/umair-ahmad-2b7803228",
  bio: "As a dedicated software engineer, I specialize in developing scalable and performance-driven web applications. With a strong focus on optimizing systems for efficiency, I bring technical expertise in full-stack development, including Python, Django, and JavaScript. I’m passionate about building solutions that not only meet but exceed client expectations.",
  stats: [
    { label: "Experience", value: "2+ Years", helper: "Delivering Production Systems" },
    { label: "Core Stacks", value: "Python & Django", helper: "High Throughput & Scalable" },
    { label: "Availability", value: "Available Now", helper: "Full-time & Contract" },
    { label: "Timezone", value: "PKT (UTC+5)", helper: "Flexible Global Overlap" }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend Engineering",
    description: "Robust, high-throughput server architecture & API design",
    skills: [
      { name: "Python", level: "Advanced", description: "Clean, idiomatic algorithms, async workflows & data structures", highlight: true },
      { name: "Django Framework", level: "Advanced", description: "ORM optimization, middleware, authentication & custom admins", highlight: true },
      { name: "Django REST Framework", level: "Advanced", description: "RESTful API design, serialization & JWT tokens" },
      { name: "System Architecture", level: "Proficient", description: "Scalable modular codebases, micro-services & caching" }
    ]
  },
  {
    title: "Databases & Storage",
    description: "ACID compliance, schema modeling and query optimization",
    skills: [
      { name: "PostgreSQL", level: "Advanced", description: "Indexing, relational modeling, complex joins & performance tuning", highlight: true },
      { name: "SQL", level: "Advanced", description: "Query optimization, transactions & data integrity" },
      { name: "ORM Query Optimization", level: "Proficient", description: "select_related, prefetch_related, reducing N+1 queries" }
    ]
  },
  {
    title: "Frontend & UI",
    description: "Responsive, dynamic and accessible client interfaces",
    skills: [
      { name: "JavaScript (ES6+)", level: "Proficient", description: "Asynchronous I/O, DOM manipulation & client-side logic", highlight: true },
      { name: "React Basics", level: "Intermediate", description: "Functional components, state hooks, responsive SPAs" },
      { name: "HTML5 & CSS3", level: "Advanced", description: "Semantic markup, modern flexbox & grid layouts" },
      { name: "Bootstrap", level: "Advanced", description: "Mobile-first responsive grids and reusable UI components" },
      { name: "CSS-in-JS & Tailwind", level: "Proficient", description: "Utility-first design systems and dynamic styling" }
    ]
  },
  {
    title: "Cloud, DevOps & Tooling",
    description: "Continuous integration, automated deployments & cloud runtime",
    skills: [
      { name: "Render", level: "Proficient", description: "Web services, background workers & managed database deployment", highlight: true },
      { name: "GitHub Actions", level: "Proficient", description: "Automated linting, test suites & CI/CD workflows" },
      { name: "Git & Version Control", level: "Advanced", description: "Feature branching, rebasing, code reviews & PR flows" },
      { name: "Performance Profiling", level: "Proficient", description: "Throughput benchmarks, response time optimization & latency reduction" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "mobile-inventory-shop",
    title: "Mobile Inventory Shop",
    tagline: "Mobile-optimized inventory & stock control system with live audit trails",
    description: "A full-stack inventory management system for mobile devices with complete CRUD operations, real-time stock tracking, and a user-friendly admin panel.",
    longDescription: "Engineered a production-ready inventory management platform designed specifically for fast mobile stock inspections, POS reconciliations, and instant quantity adjustments. Employs Django backend with PostgreSQL transactions to prevent race conditions during bulk stock movements.",
    technologies: ["Django", "PostgreSQL", "JavaScript", "Bootstrap", "Python", "Render"],
    metrics: [
      "Sub-100ms inventory lookup query response",
      "Full CRUD with live stock delta tracking",
      "100% mobile-responsive layout for warehouse floor devices"
    ],
    features: [
      "Real-time stock level monitoring with threshold alerts",
      "Streamlined mobile barcode & SKU search interface",
      "Complete CRUD catalog management for products & suppliers",
      "Custom Django admin panel with granular role permissions",
      "Exportable CSV/PDF inventory audit reports"
    ],
    githubUrl: "https://github.com/umairmalik24023",
    liveUrl: "https://github.com/umairmalik24023",
    badge: "Full-Stack System",
    color: "from-cyan-500 to-blue-600",
    accentHex: 0x06b6d4
  },
  {
    id: "clothing-ecommerce-store",
    title: "Clothing E‑commerce Store",
    tagline: "High-speed digital storefront with checkout, cart & payment workflows",
    description: "A fully-functional online store with product catalog, cart, and payment integration. Optimized for speed, SEO, and user experience.",
    longDescription: "Architected a scalable e-commerce storefront with multi-category product filtering, dynamic cart management, and seamless Stripe checkout. Built with server-side Django rendering and React client components for high-converting user flows.",
    technologies: ["Django", "Stripe", "PostgreSQL", "React", "Bootstrap", "Render"],
    metrics: [
      "Optimized Core Web Vitals for SEO & speed",
      "End-to-end checkout with automated order receipts",
      "Zero-downtime deployment on Render"
    ],
    features: [
      "Dynamic product catalog with faceted filtering by size & color",
      "Persistent session-backed shopping cart with instant totals",
      "Stripe payment gateway integration with webhooks verification",
      "Customer account dashboard with past order histories",
      "Automated stock deduction on successful payment verification"
    ],
    githubUrl: "https://github.com/umairmalik24023",
    liveUrl: "https://github.com/umairmalik24023",
    badge: "E-Commerce & Payments",
    color: "from-emerald-400 to-teal-600",
    accentHex: 0x10b981
  },
  {
    id: "django-throughput-pipeline",
    title: "High-Throughput Analytics & API Engine",
    tagline: "Performance-tuned backend delivering measured latency reduction",
    description: "Custom backend architecture built to process concurrent requests with minimal database load and maximized request throughput.",
    longDescription: "Demonstrates core expertise in optimizing system efficiency. Utilizes advanced PostgreSQL indexes, cached querysets, and asynchronous worker tasks to deliver best-in-class response times for data-heavy operations.",
    technologies: ["Django", "Python", "PostgreSQL", "SQL Optimization", "GitHub Actions"],
    metrics: [
      "5x database query latency reduction via eager loading",
      "Automated CI testing with GitHub Actions",
      "High reliability under simulated concurrency"
    ],
    features: [
      "Elimination of N+1 queries with select_related / prefetch_related",
      "Optimized database connection pooling and query caching",
      "Automated GitHub Actions linting and unit test execution",
      "Clean RESTful endpoints with structured validation errors"
    ],
    githubUrl: "https://github.com/umairmalik24023",
    liveUrl: "https://github.com/umairmalik24023",
    badge: "Performance & Systems",
    color: "from-amber-400 to-orange-600",
    accentHex: 0xf59e0b
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    title: "Associate Software Engineer - Django Developer",
    role: "Associate Software Engineer",
    company: "Django Development Team",
    period: "2024 — Present",
    type: "Full-Time",
    description: "Individually built the product stack delivering best throughput improvements. Driving core backend features, database performance tuning, and scalable architecture.",
    achievements: [
      "Individually built and architected the full product stack delivering top throughput improvements",
      "Refactored relational database queries and introduced compound indexing to optimize slow transactions",
      "Implemented secure authentication and RESTful API endpoints for client integrations",
      "Established continuous integration workflows with automated testing on GitHub Actions"
    ],
    techStack: ["Django", "Python", "PostgreSQL", "REST APIs", "Render", "Git"]
  },
  {
    id: "exp-2",
    title: "Software Engineer — OpenSource & Freelance",
    role: "Software Engineer",
    company: "OpenSource & Freelance",
    period: "2024 — Present",
    type: "Contract / Project-based",
    description: "Individually built the product stack delivering best throughput improvements for global clients in e-commerce, custom web apps, and data systems.",
    achievements: [
      "Delivered customized full-stack solutions for multiple clients with 100% on-time milestone completion",
      "Integrated third-party payment gateways (Stripe), email dispatchers, and automated report generators",
      "Consulted on system performance, eliminating database bottlenecks and reducing server response latency",
      "Created mobile-first user interfaces using Bootstrap, JavaScript, and React"
    ],
    techStack: ["Python", "Django", "JavaScript", "Bootstrap", "React", "PostgreSQL", "Stripe"]
  }
];
