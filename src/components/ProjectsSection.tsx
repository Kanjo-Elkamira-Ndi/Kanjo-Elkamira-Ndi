import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "DigiMark Internship Management System (DIMS)",
    description: "A system designed to automate internship management, intern tracking, and workflow coordination.",
    tech: ["Laravel", "MySQL"],
    status: "Completed",
  },
  {
    title: "DigiMark Consulting Website",
    description: "Official corporate website for DigiMark Consulting, showcasing IT services, training programs, and technology solutions with dynamic content management.",
    tech: ["Laravel", "MySQL", "Blade", "Bootstrap"],
    status: "Completed",
  },
  {
    title: "MenTor School Management System",
    description: "A school management web app for browsing programs, viewing profiles, courses, CA marks, and transcripts with a clean UI and normalized database.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    status: "Completed",
  },
  {
    title: "Shayo – Food Delivery & Social Discovery",
    description: "A modern food delivery and social food discovery platform connecting people with restaurants while enabling food experience sharing and community interaction.",
    tech: ["Modern Web & Mobile Technologies"],
    status: "In Development",
  },
  {
    title: "Revive – AI Social Companion Platform",
    description: "An AI-powered social platform providing an intelligent digital companion with bidirectional communication through proactive messages and calls.",
    tech: ["AI", "Conversational Systems", "Web Technologies"],
    status: "In Development",
  },
  {
    title: "AI Traffic Flow Prediction System",
    description: "A machine learning model developed to predict traffic congestion using historical and environmental data.",
    tech: ["Python", "Neural Networks", "Data Analysis"],
    status: "Completed",
  },
  {
    title: "Wikimedia Pronunciation Linking System",
    description: "A system designed to match Wikidata items with pronunciation audio from Wikimedia Commons.",
    tech: ["React", "API Integration"],
    status: "Completed",
  },
  {
    title: "Facial Recognition System",
    description: "Implemented clustering techniques using HDBSCAN to build an advanced facial recognition model.",
    tech: ["Python", "Computer Vision", "Machine Learning"],
    status: "Completed",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Portfolio</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 rounded-xl bg-card border border-border card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      project.status === "In Development"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs font-mono font-medium rounded-md bg-muted text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
