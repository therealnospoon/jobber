import { JobApplication } from '../types/applicationInfo';

const dummyApplications: JobApplication[] = [
  {
    company: 'TechCorp Inc.',
    position: 'Senior Web Developer',
    dateApplied: 'Feb 20, 2025',
    status: 'Interview',
    notes: 'Interviewing with tech lead and engineering manager next week. Prepare React optimization examples.'
  },
  {
    company: 'Global Solutions',
    position: 'UX Designer',
    dateApplied: 'Feb 18, 2025',
    status: 'Applied',
    notes: 'Submitted portfolio with recent e-commerce redesign project. Follow up if no response by March 4th.'
  },
  {
    company: 'InnovateTech',
    position: 'Product Manager',
    dateApplied: 'Feb 15, 2025',
    status: 'Rejected',
    notes: 'Position filled internally. Recruiter suggested to apply again in Q3 for new team expansion.'
  },
  {
    company: 'FutureWorks',
    position: 'Full Stack Developer',
    dateApplied: 'Feb 10, 2025',
    status: 'Offer',
    notes: '$110K base + 15K bonus + stock options. Need to respond by March 5th. Set up call with potential team members.'
  },
  {
    company: 'Quantum Systems',
    position: 'Full Stack Engineer',
    dateApplied: 'Feb 15, 2025',
    status: 'Applied',
    notes: 'Referred by David from networking event. Company working on quantum computing interfaces.'
  },
  {
    company: 'DataStream Networks',
    position: 'Frontend Developer',
    dateApplied: 'Feb 18, 2025',
    status: 'Phone Screen',
    notes: 'Scheduled for March 3rd with HR. Research their new data visualization product before call.'
  },
  {
    company: 'Nexus Solutions',
    position: 'Backend Engineer',
    dateApplied: 'Feb 10, 2025',
    status: 'Rejected',
    notes: 'Looking for more experience with microservices architecture. Connect with hiring manager on LinkedIn.'
  },
  {
    company: 'AlphaCloud Services',
    position: 'DevOps Specialist',
    dateApplied: 'Feb 24, 2025',
    status: 'Interview',
    notes: 'Technical assessment completed. Prepare for system design questions and CI/CD pipeline optimization.'
  },
  {
    company: 'Infinity Software',
    position: 'UI/UX Developer',
    dateApplied: 'Feb 12, 2025',
    status: 'Phone Screen',
    notes: 'Call with design director tomorrow. Bring up experience with design systems and component libraries.'
  },
  {
    company: 'Pinnacle Tech',
    position: 'Software Engineer',
    dateApplied: 'Feb 21, 2025',
    status: 'Final Round',
    notes: 'Panel interview on March 4th. Review distributed systems concepts and prepare questions about team structure.'
  },
  {
    company: 'Helix Innovations',
    position: 'Mobile App Developer',
    dateApplied: 'Feb 19, 2025',
    status: 'Offer',
    notes: 'Hybrid role with 2 days remote. $105K with good benefits package. Ask about professional development budget.'
  },
  {
    company: 'Sigma Computing',
    position: 'React Developer',
    dateApplied: 'Feb 17, 2025',
    status: 'Applied',
    notes: 'Fast-growing startup with recent Series C funding. Check Glassdoor for interview process details.'
  },
  {
    company: 'Vertex Systems',
    position: 'Node.js Engineer',
    dateApplied: 'Feb 22, 2025',
    status: 'Phone Screen',
    notes: 'Initial technical screen focused on async programming patterns and performance optimization.'
  },
  {
    company: 'Eclipse Digital',
    position: 'Cloud Engineer',
    dateApplied: 'Feb 14, 2025',
    status: 'Interview',
    notes: 'Second round interview scheduled. Brush up on AWS architecture and Terraform best practices.'
  },
  {
    company: 'Meridian Technologies',
    position: 'Senior Frontend Developer',
    dateApplied: 'Feb 26, 2025',
    status: 'Applied',
    notes: 'Application requires additional portfolio examples. Send link to GitHub repository with state management examples.'
  },
  {
    company: 'Pulse Analytics',
    position: 'Systems Architect',
    dateApplied: 'Feb 11, 2025',
    status: 'Phone Screen',
    notes: 'Hiring manager mentioned focus on real-time analytics systems. Prepare examples of scalable architecture designs.'
  },
  {
    company: 'Oracle Dynamics',
    position: 'Data Engineer',
    dateApplied: 'Feb 23, 2025',
    status: 'Rejected',
    notes: 'Position requires more expertise in Spark and Hadoop. Consider taking advanced data engineering course.'
  },
  {
    company: 'Fusion Enterprises',
    position: 'Python Developer',
    dateApplied: 'Feb 16, 2025',
    status: 'Interview',
    notes: 'Technical assessment completed with 90% score. Next round includes pair programming session.'
  },
  {
    company: 'Radiant Solutions',
    position: 'Security Engineer',
    dateApplied: 'Feb 25, 2025',
    status: 'Phone Screen',
    notes: 'Initial call scheduled with security team lead. Review recent work on authentication systems and OWASP top 10.'
  },
  {
    company: 'CyberMatrix',
    position: 'Java Developer',
    dateApplied: 'Feb 13, 2025',
    status: 'Final Round',
    notes: 'Final interview with CTO. Prepare questions about their microservices transition and tech roadmap.'
  },
  {
    company: 'Stellar Tech',
    position: 'QA Engineer',
    dateApplied: 'Feb 27, 2025',
    status: 'Applied',
    notes: 'Position focuses on automated testing frameworks. Highlight experience with Cypress and Jest in follow-up email.'
  },
  {
    company: 'Catalyst Labs',
    position: 'Infrastructure Engineer',
    dateApplied: 'Feb 19, 2025',
    status: 'Phone Screen',
    notes: 'Discussion about Kubernetes experience and container orchestration. Revisit personal projects using Docker Compose.'
  },
  {
    company: 'Nova Systems',
    position: 'Angular Developer',
    dateApplied: 'Feb 21, 2025',
    status: 'Offer',
    notes: 'Remote position with quarterly team meetings. $115K with excellent benefits. Decision needed by March 7th.'
  },
  {
    company: 'Horizon Software',
    position: 'Product Engineer',
    dateApplied: 'Feb 16, 2025',
    status: 'Interview',
    notes: 'Role bridges engineering and product teams. Prepare examples of feature prioritization and technical leadership.'
  },
  {
    company: 'Pioneer Tech',
    position: 'Machine Learning Engineer',
    dateApplied: 'Feb 22, 2025',
    status: 'Applied',
    notes: 'Competitive position requiring TensorFlow experience. Share link to recent NLP project in follow-up.'
  },
  {
    company: 'Vector Industries',
    position: 'Cloud Architect',
    dateApplied: 'Feb 18, 2025',
    status: 'Phone Screen',
    notes: 'Discussion focused on multi-cloud strategy. Review recent experience with GCP and Azure integration.'
  },
  {
    company: 'Summit Digital',
    position: 'JavaScript Developer',
    dateApplied: 'Feb 24, 2025',
    status: 'Phone Screen',
    notes: 'Initial screening with technical recruiter. Emphasis on TypeScript experience and modern JS frameworks.'
  },
  {
    company: 'Elevate Solutions',
    position: 'API Developer',
    dateApplied: 'Feb 14, 2025',
    status: 'Final Round',
    notes: 'Final interview includes case study presentation on RESTful API design. Prepare slides on authentication strategies.'
  },
  {
    company: 'Momentum Technologies',
    position: 'Site Reliability Engineer',
    dateApplied: 'Feb 20, 2025',
    status: 'Rejected',
    notes: 'Feedback indicated stronger Linux systems administration experience needed. Look into relevant certification options.'
  }
];

export default dummyApplications;