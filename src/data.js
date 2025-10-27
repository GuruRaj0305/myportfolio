import project1 from "./assets/projects/project1.png"

export const ABOUT = {
  vission : "To pursue an infinite journey of innovation, creating meaningful software in partnership with forward-thinking teams, and leaving a lasting mark on the future of technology.",
  mission : "To continuously grow by embracing emerging technologies, collaborating with great companies and teams, and delivering scalable, impactful solutions that connect ideas with real-world needs.",
  about : "I’m a technology enthusiast driven by curiosity and a passion for building meaningful, high-impact solutions. I enjoy turning ideas into reality through code, continuously learning, and growing to excel in the ever-evolving world of software and innovation.",
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
    "I’m currently deepening my understanding of DevOps practices (CI/CD, Docker, and Linux systems), while preparing for a Master’s in AI.",
    "My goal is to blend development, automation, and intelligence into one powerful career path that contributes meaningfully to the tech ecosystem."
  ],
}


export const EXPERIENCE = {
  timeline: [
    {
      company: "TATA ELECTRONICS SYSTEMS SOLUTIONS PRIVATE LIMITED",
      role: "Testing Engineer → Development",
      description: "Developed a hardware-level tracking application using Python (Tkinter). Transitioned from testing to development, gaining hands-on experience in full software lifecycle and automation.",
      technologies: ["Python", "Tkinter", "Django"],
      time : ["24/07/2023", "07/02/2024"],
    },
    {
      company: "Swaragh Technologies",
      role: "Web Developer",
      description: "Built an appointment management system with role-based access and Google Calendar integration. Worked on backend logic, frontend integration, and workflow automation.",
      technologies: ["Laravel", "PHP", "Google Calendar API", "Full-Stack Development"],
      time : ["09/09/2024", "present"],
    },
  ],
  achievements: [
    "Scored 98/100 in the TCS iON Coding Test",
    "Self-learned advanced frameworks and tools, including React, Django REST, Node.js, DevOps basics, and Linux",
    "Built automation scripts and productivity tools that improved efficiency in prior projects",
  ],
  resumeLink: "#", // replace with actual resume link
};


export const PROJECTS = {
  multiTenent: {
    name : "multi-tenant SaaS platform",
    tagline: "A scalable SaaS platform enabling multiple clients to access a suite of applications tailored to their needs.",
    description: {
      short:
        "Designed and developed a multi-tenant SaaS solution that allows businesses to securely manage and access multiple applications within a single platform, with flexible configurations for each client.",
      detailed: `This platform delivers a robust multi-tenant SaaS environment where each client can access a customized set of applications based on their requirements. 
      It ensures secure data separation and implements both role-based (RBAC) and relationship-based (ReBAC) access control, providing fine-grained, permission-driven access across multiple clients and applications. 
      The modular architecture supports seamless onboarding of new tenants and integration of additional applications, while keeping the system cost-efficient and easy to maintain. 
      Built with a focus on scalability and performance, the platform can handle complex combinations of clients and applications without compromising security, user experience, or operational efficiency.`,
    },
    role: [
      "Built the Super Administrator module to manage tenants, subscriptions, modules, applications, and resource usage across the platform.",
      "Developed an API Gateway to efficiently route requests across multiple modules, leveraging intelligence from the Super Administrator module to optimize request handling, enforce security, and improve performance.",
      "Managed containerized deployments using Docker and orchestrated them with Kubernetes, ensuring scalability, reliability, and streamlined maintenance.",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "JWT", "Key Cloak", "NGINX", "lua", "Kubernetes", "Docker"],
    features: [
      "Multi-tenant architecture",
      "Real-time updates",
      "Scalable REST APIs",
    ],
    challenges: [
      "Ensuring secure multi-tenant data separation while allowing flexible access to multiple applications per client.",
      "Designing the API Gateway to efficiently handle routing, caching, load balancing, rate limiting, and security across all modules, while using intelligence from the Super Administrator module.",
      "Maintaining scalability and reliability of the platform through containerized deployments with Docker and orchestration using Kubernetes, while keeping operational costs and maintenance overhead low.",
    ],
    outcomes: [
      "Enabled multiple clients to securely access and manage a customizable suite of applications within a single platform.",
      "Achieved cost efficiency, reducing operational expenses by 30%–70% per client depending on registration and resource/utilization patterns.",
      "Reduced onboarding time for new tenants and simplified integration of additional applications, supporting rapid platform growth.",
    ],
    images: [
      project1,
     project1,
    ],
    links: {
      caseStudy: "/projects/saas-pms",
      demo: null, // or a URL if available
      repo: null, // keep null if private
    },
  },
  pms: {
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
       project1,,
      project1,
    ],
    links: {
      caseStudy: "/projects/saas-pms",
      demo: null, // or a URL if available
      repo: null, // keep null if private
    },
  },
  ams: {
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
       project1,,
      project1,
    ],
    links: {
      caseStudy: "/projects/saas-pms",
      demo: null, // or a URL if available
      repo: null, // keep null if private
    },
  },
};

export const SKILLS = {
  development: {
    frontend: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'TailwindCSS'],
    backend: ['Django', 'Django REST Framework', 'Express', 'Laravel'],
    programming: ['Python', 'JavaScript (Node.js)', 'PHP', 'Lua', 'TypeScript (Learning Soon)'],
    databases: ['MySQL', 'PostgreSQL'],
  },
  devops: ['Linux', 'Docker', 'Kubernetes', 'Nginx'],
  architectures: ['Multi-tenant Architecture', 'Monolithic Architecture', 'Microservices'],
  tools: ['GSAP', 'Core Web Vitals (PageSpeed)', 'Git', 'Keycloak'],
}


export const HOME = {
  banner : {
    tagline : " A passionate Web Developer building modern, scalable applications."
  }
};





