import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Junior Software Engineer / IT Trainer",
    company: "DigiMark Consulting",
    description: "Building web systems, developing internal platforms, conducting technical training, and delivering software development projects.",
  },
  {
    role: "QA Engineer & Utilities Developer",
    company: "Revive",
    description: "Implemented QA strategies, developed supporting tools and utilities, ensured software reliability and seamless AI interactions.",
  },
  {
    role: "Lead Developer",
    company: "HealthHelp Hospital Management — Tech Groove Initiative",
    description: "Led the development of a hospital management system; coordinated a small team; delivered scalable modules for patient, doctor, and administrative workflows.",
  },
  {
    role: "Team Lead",
    company: "WikiMentor Africa Hackathon, Yaoundé",
    description: "Supervised and coordinated the hackathon team; ensured project completion, mentoring team members on system design and coding best practices.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding gradient-subtle-bg" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Experience</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-1 w-5 h-5 rounded-full gradient-bg flex items-center justify-center">
                    <Briefcase size={10} className="text-primary-foreground" />
                  </div>

                  <div className="p-5 rounded-xl bg-background border border-border card-shadow">
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-sm text-primary font-medium mt-0.5">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
