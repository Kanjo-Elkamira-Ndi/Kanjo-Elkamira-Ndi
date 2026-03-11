import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Layers, TestTube, Cog, BookOpen } from "lucide-react";

const principles = [
  { icon: Sparkles, title: "Clean Code", desc: "Writing readable, maintainable code that communicates intent clearly." },
  { icon: Layers, title: "Scalable Architecture", desc: "Designing systems that grow gracefully with evolving requirements." },
  { icon: TestTube, title: "Testing & Reliability", desc: "Ensuring software quality through comprehensive testing strategies." },
  { icon: Cog, title: "Automation", desc: "Automating repetitive tasks to focus on what truly matters." },
  { icon: BookOpen, title: "Continuous Learning", desc: "Staying curious and evolving with the ever-changing tech landscape." },
];

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Philosophy</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Engineering <span className="gradient-text">Principles</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            My approach to software engineering is guided by principles that prioritize
            long-term value over short-term convenience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-5 rounded-xl bg-card border border-border card-shadow hover:card-shadow-hover transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <p.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
