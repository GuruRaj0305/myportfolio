export const ABOUT = {
  vission : "To pursue an infinite journey of innovation, creating meaningful software in partnership with forward-thinking teams, and leaving a lasting mark on the future of technology.",
  mission : "To continuously grow by embracing emerging technologies, collaborating with great companies and teams, and delivering scalable, impactful solutions that connect ideas with real-world needs.",
  about : "I’m a Full Stack Software Engineer specializing in multi-tenant SaaS architecture and scalable web systems. I enjoy shipping production-grade platforms with RESTful APIs, containerized microservices, CI/CD pipelines, and secure cloud infrastructure.",
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
    "I’m continuing to deepen my expertise in cloud-native systems, distributed architecture, DevOps, and platform performance.",
    "My goal is to keep turning complex requirements into secure, high-performance software that delivers measurable value."
  ],
}

export const EXPERIENCE = {
  timeline: [
    {
      company: "TATA ELECTRONICS SYSTEMS SOLUTIONS PRIVATE LIMITED",
      role: "Developer",
      description: "Built Python-based monitoring and diagnostic tools for manufacturing hardware systems, automated real-time failure detection and log analysis, and reduced manual debugging time by approximately 85%.",
      technologies: ["Python", "Automation", "Log Analysis", "Hardware Diagnostics"],
      time : ["July 2023", "February 2024"],
    },
    {
      company: "Swaragh Technologies",
      role: "Software Engineer",
      description: "Architected and delivered a production-grade multi-tenant SaaS platform, FileStream service, project management system, dynamic e-commerce platform, and appointment management system. Optimized performance with Redis caching, PostgreSQL indexing, schema improvements, and React lazy loading.",
      technologies: ["React", "Node.js", "FastAPI", "Laravel", "PostgreSQL", "Redis", "Docker", "AWS"],
      time : ["September 2024", "Present"],
    },
  ],
  achievements: [
    "Scored 98% in Programming Logic & Problem Solving in the TCS iON National Qualifier Test (NQT).",
    "Reduced manual debugging time by approximately 85% through automated failure detection and root-cause analysis.",
    "Delivered production-grade SaaS applications spanning multi-tenant architecture, file management, project management, e-commerce, and appointment scheduling.",
  ],
  resumeLink: "#", // replace with actual resume link
};

export const PROJECTS = {
  "multi-tenant-architecture": {
    slug: "multi-tenant-architecture",
    name : "Multi-tenant SaaS platform",
    tagline: "A production-grade multi-tenant SaaS platform with dynamic tenant isolation and scalable cloud infrastructure.",
    description: {
      short:
        "Architected and delivered a production-grade multi-tenant SaaS platform with dynamic tenant isolation, database routing, autoscaling, containerized microservices, and AWS ECS-based infrastructure.",
      detailed: `This platform delivers a robust multi-tenant SaaS environment where each client can access a customized set of applications based on their requirements. 
      It supports shared and dedicated database routing to provide dynamic tenant isolation, while containerized microservices and AWS ECS-based infrastructure enable reliable scaling.
      The modular architecture supports seamless onboarding of new tenants and applications while maintaining security, performance, and operational efficiency.`,
    },
    role: [
      "Developed an API Gateway to efficiently route requests across multiple modules, leveraging intelligence from the Super Administrator module to optimize request handling, enforce security, and improve performance.",
      "Built the Super Administrator module to manage tenants, subscriptions, modules, applications, and resource usage across the platform.",
      "Designed shared and dedicated database routing for dynamic tenant isolation across the platform.",
      "Managed containerized microservices and AWS ECS-based infrastructure to support autoscaling and reliable deployments.",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS ECS", "Nginx", "JWT"],
    features: [
      "Multi-tenant architecture",
      "Real-time updates",
      "Scalable REST APIs",
    ],
    challenges: [
      "Ensuring secure multi-tenant data separation while allowing flexible access to multiple applications per client.",
      "Designing the API Gateway to efficiently handle routing, caching, load balancing, rate limiting, and security across all modules, while using intelligence from the Super Administrator module.",
      "Maintaining scalability and reliability through containerized microservices and AWS ECS-based infrastructure.",
    ],
    outcomes: [
      "Enabled multiple clients to securely access and manage a customizable suite of applications within a single platform.",
      "Achieved cost efficiency, reducing operational expenses by 30%–70% per client depending on registration and resource/utilization patterns.",
      "Reduced onboarding time for new tenants and simplified integration of additional applications, supporting rapid platform growth.",
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
  "filestream-service": {
    slug: "filestream-service",
    name : "FileStream Service",
    tagline: "A scalable, organization-scoped service for secure file and code management.",
    description: {
      short:
        "Architected and delivered an end-to-end FileStream service with secure uploads, event-driven processing, and organization/project-scoped file management.",
      detailed: `FileStream is a scalable file and code management service designed around organization and project boundaries.
      It integrates FastAPI, React, PostgreSQL, Amazon S3, AWS Lambda, and SQS to securely process uploads and handle files of any type at any volume.
      Its event-driven architecture supports fault-tolerant processing while preserving clear access and ownership boundaries.`,
    },
    role: [
      "Architected and delivered the FileStream service end-to-end.",
      "Built secure APIs and user workflows for organization/project-scoped file and code management.",
      "Integrated S3, Lambda, and SQS for scalable, fault-tolerant upload processing.",
    ],
    techStack: ["FastAPI", "React", "PostgreSQL", "Amazon S3", "AWS Lambda", "Amazon SQS"],
    features: [
      "Organization and project-scoped file management",
      "Secure uploads for files of any type",
      "Event-driven and fault-tolerant processing",
    ],
    challenges: [
      "Maintaining secure ownership boundaries across organizations and projects.",
      "Reliably processing large volumes of diverse file uploads.",
      "Coordinating asynchronous cloud services while preserving fault tolerance.",
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
    tagline: "A comprehensive platform to manage projects, tasks, features, and team workflows efficiently.",
    description: {
      short:
        "Developed a full-featured project management system that enables teams to plan, track, and manage projects, tasks, checklists, and issues, with integrated notifications and workflow tools for smooth collaboration.",
      detailed: `This Project Management System (PMS) provides teams with a centralized platform to manage projects from inception to completion.
       It supports project planning, task assignments, issue tracking, feature checklists, stand-ups, wrap-ups, and notifications to ensure timely communication. 
      Built with a focus on efficiency, collaboration, and real-time updates, the system helps teams streamline workflows, monitor progress, and stay aligned with project goals.`,
    },
    role: [
      "Developed backend APIs for managing projects, features, tasks, checklists, and issues, enabling teams to perform CRUD operations efficiently.",
      "Implemented workflow APIs for stand-ups, wrap-ups, and notifications to support seamless team coordination and communication.",
      "Designed and optimized database queries and backend logic to ensure real-time updates, data consistency, and scalable performance.",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "MUI (Material-UI)"],
    features: [
      "Project, feature, and task management",
      "Checklists and issue tracking",
      "Stand-up and wrap-up workflows",
      "Real-time notifications and updates"
    ],
    challenges: [
      "Ensuring real-time updates across multiple users and modules without performance degradation.",
      "Designing flexible workflows for different project types and team structures.",
      "Handling concurrent modifications and maintaining data consistency across tasks, checklists, and issues.",
    ],
    outcomes: [
      "Enabled teams to manage projects, tasks, and issues efficiently from a single platform.",
      "Improved collaboration and communication with real-time notifications and workflow tools.",
      "Reduced project tracking overhead and improved overall team productivity.",
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
    tagline: "A customizable e-commerce platform with API-driven storefront generation and complete order management.",
    description: {
      short:
        "Built a dynamic e-commerce platform with a custom API builder that enables non-technical teams to generate and consume APIs independently.",
      detailed: `This dynamic e-commerce platform combines a custom API builder with complete order management.
      Non-technical teams can independently generate and consume APIs, reducing dependency on engineering for routine integrations and storefront changes.
      The platform also supports end-to-end order workflows in a flexible, API-driven architecture.`,
    },
    role: [
      "Built a custom API builder for non-technical teams to generate and consume APIs independently.",
      "Developed complete order management workflows.",
      "Designed the platform around reusable, API-driven capabilities.",
    ],
    techStack: ["React", "Node.js", "REST APIs", "PostgreSQL"],
    features: [
      "Custom API builder",
      "Self-service API generation and consumption",
      "Complete order management",
    ],
    challenges: [
      "Making API generation accessible to non-technical users.",
      "Supporting flexible integrations while maintaining a reliable order workflow.",
    ],
    outcomes: [
      "Enabled non-technical teams to work with APIs independently.",
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
    frontend: ['React.js', 'HTML5', 'CSS3', 'TailwindCSS', 'MUI'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT / Auth'],
    programming: ['Python', 'JavaScript (ES6+)', 'TypeScript'],
    databases: ['PostgreSQL', 'MySQL', 'Redis', 'Database Design', 'Query Optimization'],
  },
  devops: ['AWS S3', 'AWS SQS', 'AWS Lambda', 'AWS ECS', 'Docker', 'CI/CD Pipelines', 'Linux', 'Nginx'],
  architectures: ['Multi-tenant SaaS', 'Microservices', 'Event-Driven Architecture', 'Schema Design'],
  tools: ['Git', 'GitHub', 'GSAP', 'Core Web Vitals (PageSpeed)'],
}

export const HOME = {
  banner: {
    greeting: "Hello, World 👋",
    intro: "I’m",
    name: "Gururaj HR",
    tagline: "A Full Stack Software Engineer building production-grade SaaS platforms and scalable web systems.",
    roles: ["Full Stack Software Engineer", "SaaS Platform Engineer", "Cloud & Backend Engineer"],
    skills: ["React", "Node.js", "FastAPI", "PostgreSQL", "Docker", "AWS"],
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
      { label: "React",    color: "blue"   },
      { label: "Node.js", color: "green"  },
      { label: "Docker",  color: "orange" },
      { label: "Linux",   color: "purple" },
    ],
  },
  about: {
    sectionHeading: "About Me",
    heading: "Building Things That",
    emphasizedHeading: "Matter",
    description: "I specialize in multi-tenant SaaS architecture and scalable web systems, turning requirements into secure, high-performance software with modern frontend, backend, database, DevOps, and cloud technologies.",
    action: {
      label: "View Full About",
      link: "/about",
    },
    stats: [
      { value: "2+",   label: "Years Experience"   },
      { value: "5+",   label: "Platforms Shipped"  },
      { value: "5+",   label: "Tech Stacks"        },
      { value: "100%", label: "Passion for Code"   },
    ],
  },
  highlights: {
    heading: "Quick Glance",
    arrow: "→",
    items: [
      { icon: "⚡", name: "Experience",     value: "2+ years as Software Developer",                  link: "/experience" },
      { icon: "🛠", name: "Skills",         value: "React, Node.js, FastAPI, PostgreSQL, Docker, AWS", link: "/projects" },
      { icon: "🎯", name: "Current Focus",  value: "Cloud-native SaaS & distributed systems",          link: "/projects" },
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
  cta: {
    heading: "Let\u2019s Build Something Great Together",
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
    { href: "mailto:gururajhr0305l@gmail.com",   label: "Email"    },
  ],
};
