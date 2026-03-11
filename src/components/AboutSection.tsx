import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Shield, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Code2, label: "4+ Years Development", desc: "Full-stack web & mobile" },
  { icon: Brain, label: "AI & Data Solutions", desc: "ML, neural networks, predictions" },
  { icon: Shield, label: "Quality Assurance", desc: "Testing & software reliability" },
  { icon: Lightbulb, label: "DevSecOps Journey", desc: "Security-first engineering" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">About Me</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Engineering Mindset, <span className="gradient-text">Real Impact</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm a software engineer passionate about building systems that solve real-world
              problems through thoughtful engineering, clean architecture, and scalable design.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With over 4 years of experience spanning full-stack development, AI systems, and
              quality assurance, I bring a holistic approach to every project. I believe great
              software is born at the intersection of solid engineering principles and genuine
              curiosity about how things work.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently deepening my expertise in DevSecOps practices, I'm committed to
              building software that is not only functional and elegant but also secure and
              resilient from the ground up.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border card-shadow hover:card-shadow-hover transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mb-3">
                  <item.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
