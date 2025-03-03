import { JobApplication } from '../types/applicationInfo';

import { convertDatesToISO } from '../utils/utils';



const dummyApplications: JobApplication[] = [
  {
      company: "TechCorp Inc.",
      position: "Senior Web Developer",
      dateApplied: "2025-02-20T08:00:00.000Z",
      status: "Interview",
      notes: "Interviewing with tech lead and engineering manager next week. Prepare React optimization examples.",
      url: "https://careers.techcorp.com/jobs/24691"
  },
  {
      company: "Global Solutions",
      position: "UX Designer",
      dateApplied: "2025-02-18T08:00:00.000Z",
      status: "Applied",
      notes: "Submitted portfolio with recent e-commerce redesign project. Follow up if no response by March 4th.",
      url: "https://globalsolutions.hire.com/positions/ux38502"
  },
  {
      company: "InnovateTech",
      position: "Product Manager",
      dateApplied: "2025-02-15T08:00:00.000Z",
      status: "Rejected",
      notes: "Position filled internally. Recruiter suggested to apply again in Q3 for new team expansion.",
      url: "https://innovatetech.jobs/pm-role-29384"
  },
  {
      company: "FutureWorks",
      position: "Full Stack Developer",
      dateApplied: "2025-02-10T08:00:00.000Z",
      status: "Offer",
      notes: "$110K base + 15K bonus + stock options. Need to respond by March 5th. Set up call with potential team members.",
      url: "https://futureworks.careers/jobs/dev-85721"
  },
  {
      company: "Quantum Systems",
      position: "Full Stack Engineer",
      dateApplied: "2025-02-15T08:00:00.000Z",
      status: "Applied",
      notes: "Referred by David from networking event. Company working on quantum computing interfaces.",
      url: "https://quantumsystems.io/careers/fullstack-3927"
  },
  {
      company: "DataStream Networks",
      position: "Frontend Developer",
      dateApplied: "2025-02-18T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Scheduled for March 3rd with HR. Research their new data visualization product before call.",
      url: "https://datastream.net/jobs/frontend-dev-12845"
  },
  {
      company: "Nexus Solutions",
      position: "Backend Engineer",
      dateApplied: "2025-02-10T08:00:00.000Z",
      status: "Rejected",
      notes: "Looking for more experience with microservices architecture. Connect with hiring manager on LinkedIn.",
      url: "https://nexussolutions.com/careers/backend-72936"
  },
  {
      company: "AlphaCloud Services",
      position: "DevOps Specialist",
      dateApplied: "2025-02-24T08:00:00.000Z",
      status: "Interview",
      notes: "Technical assessment completed. Prepare for system design questions and CI/CD pipeline optimization.",
      url: "https://alphacloud.io/open-positions/devops-23981"
  },
  {
      company: "Infinity Software",
      position: "UI/UX Developer",
      dateApplied: "2025-02-12T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Call with design director tomorrow. Bring up experience with design systems and component libraries.",
      url: "https://infinitysw.com/careers/ux-dev-56291"
  },
  {
      company: "Pinnacle Tech",
      position: "Software Engineer",
      dateApplied: "2025-02-21T08:00:00.000Z",
      status: "Final Round",
      notes: "Panel interview on March 4th. Review distributed systems concepts and prepare questions about team structure.",
      url: "https://pinnacletech.jobs/software-engineer-49273"
  },
  {
      company: "Helix Innovations",
      position: "Mobile App Developer",
      dateApplied: "2025-02-19T08:00:00.000Z",
      status: "Offer",
      notes: "Hybrid role with 2 days remote. $105K with good benefits package. Ask about professional development budget.",
      url: "https://helixinnovations.dev/jobs/mobile-38572"
  },
  {
      company: "Sigma Computing",
      position: "React Developer",
      dateApplied: "2025-02-17T08:00:00.000Z",
      status: "Applied",
      notes: "Fast-growing startup with recent Series C funding. Check Glassdoor for interview process details.",
      url: "https://sigma-computing.breezy.hr/react-dev-10293"
  },
  {
      company: "Vertex Systems",
      position: "Node.js Engineer",
      dateApplied: "2025-02-22T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Initial technical screen focused on async programming patterns and performance optimization.",
      url: "https://vertexsys.com/careers/nodejs-74628"
  },
  {
      company: "Eclipse Digital",
      position: "Cloud Engineer",
      dateApplied: "2025-02-14T08:00:00.000Z",
      status: "Interview",
      notes: "Second round interview scheduled. Brush up on AWS architecture and Terraform best practices.",
      url: "https://eclipse.digital/open-roles/cloud-eng-58291"
  },
  {
      company: "Meridian Technologies",
      position: "Senior Frontend Developer",
      dateApplied: "2025-02-26T08:00:00.000Z",
      status: "Applied",
      notes: "Application requires additional portfolio examples. Send link to GitHub repository with state management examples.",
      url: "https://meridiantech.co/jobs/senior-frontend-29384"
  },
  {
      company: "Pulse Analytics",
      position: "Systems Architect",
      dateApplied: "2025-02-11T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Hiring manager mentioned focus on real-time analytics systems. Prepare examples of scalable architecture designs.",
      url: "https://pulseanalytics.ai/careers/systems-architect-48293"
  },
  {
      company: "Oracle Dynamics",
      position: "Data Engineer",
      dateApplied: "2025-02-23T08:00:00.000Z",
      status: "Rejected",
      notes: "Position requires more expertise in Spark and Hadoop. Consider taking advanced data engineering course.",
      url: "https://oracledynamics.com/jobs/data-engineer-93721"
  },
  {
      company: "Fusion Enterprises",
      position: "Python Developer",
      dateApplied: "2025-02-16T08:00:00.000Z",
      status: "Interview",
      notes: "Technical assessment completed with 90% score. Next round includes pair programming session.",
      url: "https://fusion-enterprises.com/careers/python-dev-47382"
  },
  {
      company: "Radiant Solutions",
      position: "Security Engineer",
      dateApplied: "2025-02-25T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Initial call scheduled with security team lead. Review recent work on authentication systems and OWASP top 10.",
      url: "https://radiantsolutions.net/jobs/security-28475"
  },
  {
      company: "CyberMatrix",
      position: "Java Developer",
      dateApplied: "2025-02-13T08:00:00.000Z",
      status: "Final Round",
      notes: "Final interview with CTO. Prepare questions about their microservices transition and tech roadmap.",
      url: "https://cybermatrix.io/careers/java-developer-38291"
  },
  {
      company: "Stellar Tech",
      position: "QA Engineer",
      dateApplied: "2025-02-27T08:00:00.000Z",
      status: "Applied",
      notes: "Position focuses on automated testing frameworks. Highlight experience with Cypress and Jest in follow-up email.",
      url: "https://stellartech.com/open-positions/qa-29384"
  },
  {
      company: "Catalyst Labs",
      position: "Infrastructure Engineer",
      dateApplied: "2025-02-19T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Discussion about Kubernetes experience and container orchestration. Revisit personal projects using Docker Compose.",
      url: "https://catalyst-labs.dev/careers/infra-38475"
  },
  {
      company: "Nova Systems",
      position: "Angular Developer",
      dateApplied: "2025-02-21T08:00:00.000Z",
      status: "Offer",
      notes: "Remote position with quarterly team meetings. $115K with excellent benefits. Decision needed by March 7th.",
      url: "https://novasystems.tech/jobs/angular-dev-48392"
  },
  {
      company: "Horizon Software",
      position: "Product Engineer",
      dateApplied: "2025-02-16T08:00:00.000Z",
      status: "Interview",
      notes: "Role bridges engineering and product teams. Prepare examples of feature prioritization and technical leadership.",
      url: "https://horizonsoftware.com/careers/product-eng-57392"
  },
  {
      company: "Pioneer Tech",
      position: "Machine Learning Engineer",
      dateApplied: "2025-02-22T08:00:00.000Z",
      status: "Applied",
      notes: "Competitive position requiring TensorFlow experience. Share link to recent NLP project in follow-up.",
      url: "https://pioneertech.ai/jobs/ml-engineer-29384"
  },
  {
      company: "Vector Industries",
      position: "Cloud Architect",
      dateApplied: "2025-02-18T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Discussion focused on multi-cloud strategy. Review recent experience with GCP and Azure integration.",
      url: "https://vector-industries.cloud/careers/architect-38291"
  },
  {
      company: "Summit Digital",
      position: "JavaScript Developer",
      dateApplied: "2025-02-24T08:00:00.000Z",
      status: "Phone Screen",
      notes: "Initial screening with technical recruiter. Emphasis on TypeScript experience and modern JS frameworks.",
      url: "https://summitdigital.dev/jobs/javascript-39281"
  },
  {
      company: "Elevate Solutions",
      position: "API Developer",
      dateApplied: "2025-02-14T08:00:00.000Z",
      status: "Final Round",
      notes: "Final interview includes case study presentation on RESTful API design. Prepare slides on authentication strategies.",
      url: "https://elevatesolutions.io/careers/api-dev-27495"
  },
  {
      company: "Momentum Technologies",
      position: "Site Reliability Engineer",
      dateApplied: "2025-02-20T08:00:00.000Z",
      status: "Rejected",
      notes: "Feedback indicated stronger Linux systems administration experience needed. Look into relevant certification options.",
      url: "https://momentum-tech.com/jobs/sre-48291"
  }
];

export default dummyApplications;

