export const ABOUT = {
  vission : "To pursue an infinite journey of innovation, creating meaningful software in partnership with forward-thinking teams, and leaving a lasting mark on the future of technology.",
  mission : "To continuously grow by embracing emerging technologies, collaborating with great companies and teams, and delivering scalable, impactful solutions that connect ideas with real-world needs.",
  about : "I’m a Full Stack Software Engineer with 3+ years of experience shipping production-grade systems — a 12-microservice multi-tenant SaaS platform on AWS ECS with 99.9% uptime, and a Claude API-powered conversational assistant. I own the full delivery cycle: system design, React.js and Node.js/FastAPI development, CI/CD, and cloud infrastructure.",
  strengths : {
    problemSolving : "I enjoy breaking down complex challenges into elegant, efficient solutions.",
    adaptability : "Quickly adapts to new tools, frameworks, and technologies.",
    selfLearning: "Most of my progress has come through curiosity and consistency.",
    teamCollaboration: "I value clarity, contribution, and communication within teams.",
    attentionToDetail: "I focus on clean code, performance, and maintainability.",

  },
  personalSide : [
    "Exploring new developer tools and open-source projects.",
    "Reading or writing about tech concepts",
    "Spending quiet time learning something new every day",

  ],
  whatsNext : [
    "I’m continuing to deepen my expertise in cloud-native systems, distributed architecture, AI/LLM integration, and platform performance.",
    "My goal is to keep turning complex requirements into secure, high-performance software that delivers measurable value."
  ],
}

export const EXPERIENCE = {
  // Latest first
  timeline: [
    {
      company: "Swaragh Technologies",
      role: "Software Engineer",
      description: "Architected and delivered a production-grade multi-tenant SaaS platform across 12 containerized microservices on AWS ECS, maintaining 99.9% uptime with tenant isolation, dynamic database routing, and autoscaling.",
      highlights: [
        "Built and owned CI/CD pipelines (GitHub Actions) with path-based change detection — cut deployment time by ~50% and enabled multiple daily zero-downtime releases.",
        "Built FileStream end-to-end with FastAPI, React.js, Gitea, PostgreSQL, S3, Lambda, and SQS — serverless org/project-scoped file & code management; leading a 500GB+ legacy data migration.",
        "Built a PMS with hierarchical approval workflows and an AI-powered assistant (Claude API, tool-calling, FastAPI) — conversational project data queries under 3 seconds; reduced manual lookups by ~90%.",
        "Built a dynamic API builder on an e-commerce platform — zero-code REST API configuration, cutting new-endpoint delivery time by ~70% for non-backend developers.",
        "Improved platform scalability via Redis caching and PostgreSQL indexing — cut page load time by ~40% and key query times by ~60%; raised test coverage to ~80% with Jest.",
      ],
      technologies: ["React", "Node.js", "FastAPI", "Claude API", "PostgreSQL", "Redis", "Docker", "AWS ECS", "GitHub Actions"],
      time : ["September 2024", "Present"],
    },
    {
      company: "Besant Technologies",
      role: "Full Stack Python Trainee",
      description: "Contributed to a Salesforce-style CRM application built with Django and MySQL, implementing data mining and lead detection logic to support lead scoring and qualification workflows.",
      technologies: ["Python", "Django", "MySQL", "Data Mining"],
      time : ["March 2024", "September 2024"],
    },
    {
      company: "Tata Electronics",
      role: "Developer",
      description: "Built Python-based monitoring and diagnostic tools for manufacturing hardware — implemented failure pattern recognition and root-cause analysis via automated log analysis, reducing manual debugging time by ~85%. Collaborated with operations and hardware teams to stabilize production systems.",
      technologies: ["Python", "Automation", "Log Analysis", "Hardware Diagnostics"],
      time : ["July 2023", "February 2024"],
    },
  ],
  achievements: [
    "Maintained 99.9% uptime across a 12-microservice multi-tenant SaaS platform on AWS ECS.",
    "Scored 98% in Programming Logic & Problem Solving in the TCS iON National Qualifier Test (NQT) 2024.",
    "Reduced manual debugging time by ~85% through automated failure detection and root-cause analysis at Tata Electronics.",
    "Shipped an AI-powered assistant (Claude API, tool-calling) that cut manual project data lookups by ~90%.",
  ],
  certifications: [
    {
      title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
      issuer: "Amazon Web Services",
      note: "Cloud architecture, high availability, cost optimization, and security on AWS.",
    },
    {
      title: "TCS iON National Qualifier Test (NQT) 2024",
      issuer: "Tata Consultancy Services",
      note: "Scored 98% in Programming Logic & Problem Solving.",
    },
    {
      title: "Top Performer Recognition",
      issuer: "Swaragh Technologies",
      note: "Recognized for platform architecture contribution.",
    },
  ],
  education: {
    degree: "B.E. in Electronics and Communication Engineering",
    institution: "Visvesvaraya Technological University (VTU)",
    time: ["2019", "2023"],
    gpa: "7.5 / 10",
    note: "Industry exposure through internship at Hindustan Aeronautics Limited (HAL).",
  },
  resumeLink: "/resume_gururaj.pdf",
};

export const PROJECTS = {
  "multi-tenant-architecture": {
    slug: "multi-tenant-architecture",
    name : "Multi-tenant SaaS platform",
    tagline: "A production-grade multi-tenant SaaS platform — 12 containerized microservices on AWS ECS with 99.9% uptime.",
    description: {
      short:
        "Architected and delivered a production-grade multi-tenant SaaS platform across 12 containerized microservices — dynamic tenant isolation, database routing, autoscaling, and AWS ECS-based infrastructure with 99.9% uptime.",
      detailed: `This platform delivers a robust multi-tenant SaaS environment where each client can access a customized set of applications based on their requirements.
      It spans 12 containerized microservices with shared and dedicated database routing for dynamic tenant isolation, while AWS ECS-based infrastructure enables autoscaling and 99.9% uptime.
      The modular architecture supports seamless onboarding of new tenants and applications while maintaining security, performance, and operational efficiency.`,
    },
    role: [
      "Developed an API Gateway to efficiently route requests across multiple modules, leveraging intelligence from the Super Administrator module to optimize request handling, enforce security, and improve performance.",
      "Built the Super Administrator module to manage tenants, subscriptions, modules, applications, and resource usage across the platform.",
      "Designed shared and dedicated database routing for dynamic tenant isolation across the platform.",
      "Built and owned CI/CD pipelines (GitHub Actions) with path-based change detection — cut deployment time by ~50% with zero-downtime rollouts.",
      "Managed 12 containerized microservices and AWS ECS-based infrastructure to support autoscaling and reliable deployments.",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS ECS", "GitHub Actions", "Nginx", "JWT"],
    features: [
      "Multi-tenant architecture with tenant isolation",
      "12 containerized microservices",
      "Zero-downtime CI/CD releases",
      "Scalable REST APIs",
    ],
    challenges: [
      "Ensuring secure multi-tenant data separation while allowing flexible access to multiple applications per client.",
      "Designing the API Gateway to efficiently handle routing, caching, load balancing, rate limiting, and security across all modules, while using intelligence from the Super Administrator module.",
      "Maintaining scalability and reliability through containerized microservices and AWS ECS-based infrastructure.",
    ],
    outcomes: [
      "Maintained 99.9% uptime across the platform in production.",
      "Cut deployment time by ~50% and enabled multiple daily releases with zero-downtime rollouts.",
      "Improved performance with Redis caching and PostgreSQL indexing — ~40% faster page loads and ~60% faster key queries.",
      "Achieved cost efficiency, reducing operational expenses by 30%–70% per client depending on registration and resource/utilization patterns.",
    ],
    images: [
      // project1,
      // project1,
    ],
    links: {
      caseStudy: "/projects/saas-pms",
      demo: null, // or a URL if available
      repo: null, // keep null if private
    },
  },
  "ai-project-assistant": {
    slug: "ai-project-assistant",
    name : "AI-Powered Project Assistant",
    tagline: "A Claude API-powered conversational assistant for project data — answers in under 3 seconds, ~90% fewer manual lookups.",
    description: {
      short:
        "Built an AI-powered assistant with Claude API tool-calling and FastAPI — conversational project data queries with multi-tenant access control, response time under 3 seconds, reducing manual lookups by ~90%.",
      detailed: `This conversational assistant lets teams query live project data — tasks, statuses, approvals, and reports — in natural language instead of navigating dashboards.
      It uses the Claude API with tool-calling to translate questions into secure, scoped data operations through a FastAPI backend, enforcing multi-tenant access control on every request.
      Careful prompt engineering and tool design keep responses accurate and under 3 seconds, cutting manual project data lookups by ~90%.`,
    },
    role: [
      "Designed and built the assistant end-to-end with Claude API tool-calling and FastAPI.",
      "Defined tool schemas that map natural-language questions to secure, tenant-scoped project data queries.",
      "Enforced multi-tenant access control so every answer respects the caller's permissions.",
      "Optimized prompt and tool design to keep response times under 3 seconds.",
    ],
    techStack: ["Claude API", "Tool-Calling", "FastAPI", "Python", "PostgreSQL", "React"],
    features: [
      "Conversational queries over live project data",
      "LLM tool-calling with secure, scoped data access",
      "Multi-tenant access control on every request",
      "Sub-3-second response times",
    ],
    challenges: [
      "Designing tool schemas that let the LLM query data safely without over-fetching or leaking cross-tenant data.",
      "Keeping responses fast and accurate while chaining tool calls.",
      "Handling ambiguous natural-language questions gracefully.",
    ],
    outcomes: [
      "Reduced manual project data lookups by ~90%.",
      "Delivered consistent response times under 3 seconds.",
      "Made project insights accessible to non-technical team members through plain conversation.",
    ],
    images: [],
    links: {
      caseStudy: null,
      demo: null,
      repo: null,
    },
  },
  "filestream-service": {
    slug: "filestream-service",
    name : "FileStream Service",
    tagline: "A serverless, organization-scoped service for secure file and code management — architected for infinite scale.",
    description: {
      short:
        "Architected and delivered an end-to-end FileStream service with secure uploads, event-driven serverless processing, Gitea-backed code management, and organization/project-scoped access — leading a 500GB+ legacy data migration.",
      detailed: `FileStream is a scalable file and code management service designed around organization and project boundaries.
      It integrates FastAPI, React, Gitea, PostgreSQL, Amazon S3, AWS Lambda, and SQS to securely process uploads and handle files of any type at any volume, architected for infinite scalability via S3 lifecycle policies.
      Its event-driven architecture supports fault-tolerant processing while preserving clear access and ownership boundaries. Currently leading a 500GB+ legacy data migration onto the platform.`,
    },
    role: [
      "Architected and delivered the FileStream service end-to-end.",
      "Built secure APIs and user workflows for organization/project-scoped file and code management with Gitea integration.",
      "Integrated S3, Lambda, and SQS for scalable, fault-tolerant, serverless upload processing.",
      "Leading a 500GB+ legacy data migration onto the platform.",
    ],
    techStack: ["FastAPI", "React", "Gitea", "PostgreSQL", "Amazon S3", "AWS Lambda", "Amazon SQS"],
    features: [
      "Organization and project-scoped file & code management",
      "Secure uploads for files of any type",
      "Event-driven, serverless, fault-tolerant processing",
      "Infinite scalability via S3 lifecycle policies",
    ],
    challenges: [
      "Maintaining secure ownership boundaries across organizations and projects.",
      "Reliably processing large volumes of diverse file uploads.",
      "Coordinating asynchronous cloud services while preserving fault tolerance.",
      "Migrating 500GB+ of legacy data without disrupting active users.",
    ],
    outcomes: [
      "Delivered a scalable service capable of handling files of any type at any upload volume.",
      "Enabled secure and reliable file processing with event-driven cloud infrastructure.",
    ],
    images: [],
    links: {
      caseStudy: null,
      demo: null,
      repo: null,
    },
  },
  "project-management-system": {
    slug: "project-management-system",
    name : "Project Management System",
    tagline: "A comprehensive platform to manage projects, tasks, and team workflows — with hierarchical approvals and an AI assistant.",
    description: {
      short:
        "Developed a full-featured project management system with hierarchical approval workflows that enables teams to plan, track, and manage projects, tasks, checklists, and issues, with integrated notifications and an AI-powered assistant for conversational data queries.",
      detailed: `This Project Management System (PMS) provides teams with a centralized platform to manage projects from inception to completion.
       It supports project planning, task assignments, issue tracking, feature checklists, hierarchical approval workflows, stand-ups, wrap-ups, and notifications to ensure timely communication.
      An integrated AI-powered assistant (Claude API with tool-calling) answers conversational project data queries in under 3 seconds. Built with a focus on efficiency, collaboration, and real-time updates, the system helps teams streamline workflows, monitor progress, and stay aligned with project goals.`,
    },
    role: [
      "Developed backend APIs for managing projects, features, tasks, checklists, and issues, enabling teams to perform CRUD operations efficiently.",
      "Implemented hierarchical approval workflows plus stand-up, wrap-up, and notification APIs to support seamless team coordination.",
      "Integrated the AI-powered assistant (Claude API, tool-calling, FastAPI) for conversational project data queries with multi-tenant access control.",
      "Designed and optimized database queries and backend logic to ensure real-time updates, data consistency, and scalable performance.",
    ],
    techStack: ["React", "Node.js", "FastAPI", "Claude API", "PostgreSQL", "Docker", "MUI (Material-UI)"],
    features: [
      "Project, feature, and task management",
      "Hierarchical approval workflows",
      "AI assistant for conversational project queries",
      "Checklists and issue tracking",
      "Real-time notifications and updates"
    ],
    challenges: [
      "Ensuring real-time updates across multiple users and modules without performance degradation.",
      "Designing flexible approval workflows for different project types and team structures.",
      "Handling concurrent modifications and maintaining data consistency across tasks, checklists, and issues.",
    ],
    outcomes: [
      "Enabled teams to manage projects, tasks, and issues efficiently from a single platform.",
      "Reduced manual project data lookups by ~90% with the AI assistant.",
      "Improved collaboration and communication with real-time notifications and workflow tools.",
    ],
    images: [
      // project1,
      // project1,
    ],
    links: {
      caseStudy: "/projects/saas-pms",
      demo: null, // or a URL if available
      repo: null, // keep null if private
    },
  },
  "appointment-management-system": {
    slug: "appointment-management-system",
    name : "Appointment Management System",
    tagline: "A robust system to manage appointments efficiently with automated scheduling and notifications.",
    description: {
      short:
        "Developed the backend for a feature-rich Appointment Management System, handling multiple user roles, clinic and doctor management, patient appointments, scheduling, and real-time updates.",
      detailed: `This Appointment Management System (AMS) is a centralized backend platform built with Laravel that supports multiple roles — admin, staff, doctors, and patients (booking without login). The system allows staff to manage clinics, doctors, specializations, and appointments, while patients can search clinics and book appointments through the frontend site. Doctors are associated with clinics along with their specializations, and they can only access their own appointments. Appointments are managed using FullCalendar, supporting check-in, check-out, cancellation, rescheduling, and conflict handling based on doctor availability, clinic timings, and leaves. The system also integrates with the Google Calendar API to sync doctor schedules and uses WebSockets for real-time updates across all users. Role-based access control (RBAC) ensures secure, permission-driven access for admins, staff, and doctors. Optimized backend logic, database design, and API structure ensure the platform is scalable, efficient, and reliable, providing a robust foundation for both the admin panel and user-facing site.`,
    },
    role: [
      "Developed the appointment management system using FullCalendar for creation, check-in, check-out, cancellations, and rescheduling.",
      "Implemented authentication and staff access control for managing appointments within staff permissions.",
      "Implemented doctor access control so each doctor can access only their own appointments.",
      "Built full backend APIs for the frontend site to search clinics, view doctors, and book appointments.",
      "Integrated Google Calendar API to register appointments in doctors’ calendars automatically.",
      "Designed backend logic for clinic and doctor appointment timing management, handling availability, schedules, and conflicts."
    ],
    techStack: ["Laravel", "PHP", "MySQL", "FullCalendar", "Google Calendar API"],
    features: [
      "Complete appointment management system using FullCalendar (check-in, check-out, cancellation, rescheduling).",
      "Google Calendar API integration to automatically register doctor appointments.",
      "Clinic and doctor timing management, handling availability, schedules, and conflicts.",
      "Scalable and secure backend architecture supporting both admin panel and frontend site."
    ],
    challenges: [
      "Handling appointment scheduling conflicts considering doctor availability and clinic timings.",
      "Implementing secure access control for staff and doctors with proper permissions.",
      "Building robust backend APIs for frontend booking while integrating with Google Calendar.",
    ],
    outcomes: [
      "Enabled efficient and secure appointment management for staff, doctors, and patients.",
      "Provided seamless frontend booking experience with real-time availability checks.",
      "Automated doctor appointment registration via Google Calendar, reducing manual effort.",
      "Delivered a scalable, secure, and reliable backend supporting admin panel and frontend functionalities."
    ],
    images: [
      // project1,
      // project1,
    ],
    links: {
      caseStudy: "/projects/saas-pms",
      demo: "https://snhrc.swaragh.org.in/", // or a URL if available
      repo: null, // keep null if private
    },
  },
  "dynamic-ecommerce-platform": {
    slug: "dynamic-ecommerce-platform",
    name : "Dynamic E-commerce Platform",
    tagline: "A customizable e-commerce platform with a zero-code API builder — ~70% faster endpoint delivery for non-backend developers.",
    description: {
      short:
        "Built a dynamic API builder on an e-commerce platform using React.js, Node.js, and Express.js — zero-code REST API configuration, cutting new-endpoint delivery time by ~70% for non-backend developers.",
      detailed: `This dynamic e-commerce platform combines a custom zero-code API builder with complete order management.
      Non-technical teams can independently configure, generate, and consume REST APIs, reducing dependency on engineering for routine integrations and storefront changes — cutting new-endpoint delivery time by ~70%.
      The platform also supports end-to-end order workflows in a flexible, API-driven architecture.`,
    },
    role: [
      "Built a zero-code API builder for non-technical teams to generate and consume REST APIs independently.",
      "Developed complete order management workflows.",
      "Designed the platform around reusable, API-driven capabilities.",
    ],
    techStack: ["React", "Node.js", "Express.js", "REST APIs", "PostgreSQL"],
    features: [
      "Zero-code REST API configuration",
      "Self-service API generation and consumption",
      "Complete order management",
    ],
    challenges: [
      "Making API generation accessible to non-technical users.",
      "Supporting flexible integrations while maintaining a reliable order workflow.",
    ],
    outcomes: [
      "Cut new-endpoint delivery time by ~70% for non-backend developers.",
      "Reduced engineering dependency for routine API and order-management workflows.",
    ],
    images: [],
    links: {
      caseStudy: null,
      demo: null,
      repo: null,
    },
  },
};

export const SKILLS = {
  development: {
    frontend: ['React.js', 'TypeScript', 'HTML5', 'CSS3', 'TailwindCSS', 'MUI', 'Context API'],
    backend: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'REST APIs', 'JWT / Auth'],
    programming: ['JavaScript (ES6+)', 'TypeScript', 'Python'],
    databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Schema Design', 'Query Optimization'],
  },
  ai: ['Claude API', 'Tool-Calling', 'Prompt Engineering', 'Conversational AI Assistants', 'LLM Integration'],
  devops: ['AWS ECS', 'AWS S3', 'AWS SQS', 'AWS Lambda', 'Docker', 'CI/CD (GitHub Actions)', 'Linux', 'Nginx'],
  architectures: ['Multi-tenant SaaS', 'Microservices', 'Event-Driven Architecture', 'Serverless', 'API Design'],
  tools: ['Git', 'GitHub', 'GSAP', 'Core Web Vitals (PageSpeed)'],
}

export const HOME = {
  banner: {
    greeting: "Hello, World 👋",
    intro: "I’m",
    name: "Gururaj HR",
    tagline: "A Full Stack Software Engineer with 3+ years building production-grade multi-tenant SaaS platforms and AI-powered systems on AWS.",
    roles: ["Full Stack Software Engineer", "SaaS Platform Engineer", "AI / LLM Integration Engineer", "Cloud & Backend Engineer"],
    skills: ["React", "Node.js", "FastAPI", "PostgreSQL", "AWS", "Claude API"],
    primaryAction: {
      label: "View Projects",
      link: "/projects",
    },
    codeCard: {
      filename: "about-me.ts",
      declaration: "const",
      variableName: "developer",
      fields: {
        name: "name",
        role: "role",
        skills: "skills",
        passion: "passion",
      },
      name: "Gururaj HR",
      role: "Full Stack Software Engineer",
      passion: "Building scalable software",
      status: "Open to opportunities 🚀",
    },
    scrollLabel: "scroll",
    badges: [
      { label: "React",      color: "blue"   },
      { label: "Node.js",    color: "green"  },
      { label: "AWS",        color: "orange" },
      { label: "Claude API", color: "purple" },
    ],
  },
  about: {
    sectionHeading: "About Me",
    heading: "Building Things That",
    emphasizedHeading: "Matter",
    description: "I specialize in multi-tenant SaaS architecture, AI/LLM integration, and scalable web systems — turning requirements into secure, high-performance software with modern frontend, backend, database, DevOps, and cloud technologies.",
    action: {
      label: "View Full About",
      link: "/about",
    },
    stats: [
      { value: "3+",    label: "Years Experience"      },
      { value: "12",    label: "Microservices in Prod" },
      { value: "99.9%", label: "Platform Uptime"       },
      { value: "6+",    label: "Platforms Shipped"     },
    ],
  },
  highlights: {
    heading: "Quick Glance",
    arrow: "→",
    items: [
      { icon: "⚡", name: "Experience",     value: "3+ years as a Software Engineer",                        link: "/experience" },
      { icon: "🛠", name: "Skills",         value: "React, Node.js, FastAPI, PostgreSQL, Docker, AWS",       link: "/projects" },
      { icon: "🤖", name: "AI / LLM",       value: "Claude API, tool-calling, conversational assistants",    link: "/projects" },
      { icon: "🎯", name: "Current Focus",  value: "Cloud-native SaaS & distributed systems",                link: "/projects" },
    ],
  },
  projects: {
    heading: "What I’ve Built",
    detailLabel: "View Detail",
    detailArrow: "→",
    action: {
      label: "View All Projects",
      link: "/projects",
    },
  },
  scrollScene: {
    architecture: {
      label: "Multi-tenant SaaS Architecture",
      tenants: ["Tenant A", "Tenant B", "Tenant C"],
      gateway: "API Gateway",
      services: ["Auth", "Projects", "Files"],
      data: ["PostgreSQL", "Redis", "AWS ECS"],
    },
    fileFlow: {
      label: "Event-driven FileStream",
      steps: ["Upload", "Amazon S3", "Amazon SQS", "AWS Lambda"],
    },
    deployment: {
      label: "Cloud-native Delivery",
      steps: ["Git", "CI/CD", "Docker", "AWS ECS"],
    },
  },
  cta: {
    heading: "Let’s Build Something Great Together",
    sub: "Actively seeking full-time opportunities to build impactful products with great teams.",
    contactAction: {
      label: "Let’s Connect",
      link: "/contact",
    },
  },
  footer: {
    brand: "Gururaj HR",
    tagline: "Building modern web experiences.",
    copyrightName: "Gururaj H R",
    builtWith: "Crafted with React & GSAP",
  },
  social: [
    { href: "https://github.com/gururaj0305",    label: "GitHub"   },
    { href: "https://linkedin.com/in/gururajhr", label: "LinkedIn" },
    { href: "https://gururajhr.in/",             label: "Website"  },
    { href: "mailto:gururajhr0305l@gmail.com",   label: "Email"    },
  ],
};
