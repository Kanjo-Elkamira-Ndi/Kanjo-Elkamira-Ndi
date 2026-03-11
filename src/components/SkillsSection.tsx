import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Globe, BrainCircuit, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: ["JavaScript", "PHP", "Python", "Flutter (Dart)"],
  },
  {
    icon: Globe,
    title: "Web Development",
    skills: ["Laravel", "React", "MERN Stack", "WordPress"],
  },
  {
    icon: BrainCircuit,
    title: "AI & Data Science",
    skills: ["Machine Learning", "Neural Networks", "Predictive Modeling", "Data Analysis"],
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    skills: ["Git", "Linux", "REST APIs", "Docker (learning)", "CI/CD (exploring)"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding gradient-subtle-bg" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Skills</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-background border border-border card-shadow hover:card-shadow-hover transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <cat.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent text-accent-foreground"
                  >
                    {skill}
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

export default SkillsSection;
