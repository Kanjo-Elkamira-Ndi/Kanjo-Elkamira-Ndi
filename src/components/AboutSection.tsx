import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cpu, Users, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    label: "Fullstack development",
    desc: "React, Node.js, TypeScript, PostgreSQL — building production systems end to end, from database schema to deployed UI.",
    tag: "4+ years",
    colors: { bg: "bg-violet-50 dark:bg-violet-950/30", icon: "text-violet-600 dark:text-violet-400", tag: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300" },
  },
  {
    icon: Cpu,
    label: "AI & data engineering",
    desc: "ML pipelines, predictive models, and AI-augmented tools — applied to real datasets including mobile money fraud detection.",
    tag: "Applied ML",
    colors: { bg: "bg-emerald-50 dark:bg-emerald-950/30", icon: "text-emerald-600 dark:text-emerald-400", tag: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" },
  },
  {
    icon: Users,
    label: "Lecturing & facilitation",
    desc: "Lecture delivery at YIBS and DigiMark bootcamp facilitation — OOP, Query Optimisation, and AI-augmented engineering.",
    tag: "BTech · HND level",
    colors: { bg: "bg-amber-50 dark:bg-amber-950/30", icon: "text-amber-600 dark:text-amber-400", tag: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" },
  },
  {
    icon: ShieldCheck,
    label: "Quality & reliability",
    desc: "QA practices, secure architecture, and test-driven mindset — building software that holds up under real conditions.",
    tag: "QA · DevSecOps",
    colors: { bg: "bg-red-50 dark:bg-red-950/30", icon: "text-red-600 dark:text-red-400", tag: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300" },
  },
];

const stats = [
  { value: "4+", label: "Years experience" },
  { value: "8+", label: "Projects shipped" },
  { value: "15+", label: "Technologies used" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT: narrative ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-border" />
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                About me
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-snug mb-8">
              Engineering with{" "}
              <span className="gradient-text">purpose & precision</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a <span className="font-medium text-foreground">fullstack software engineer</span> based
                in Yaoundé, Cameroon, building web systems that bridge real gaps — connecting farmers to
                markets, equipping educators with smarter tools, and helping organisations ship reliable
                software faster.
              </p>
              <p>
                With 4+ years across the full stack, I've worked on everything from{" "}
                <span className="font-medium text-foreground">React/Node.js production apps</span> to{" "}
                <span className="font-medium text-foreground">AI-augmented pipelines</span> and
                PostgreSQL-backed platforms. I've also co-facilitated professional engineering bootcamps
                and delivered university-level courses in Object Oriented Programming in C++, Introduction to Software
                Engineering, Advanced Data Structures, Practicals in Software Engineering, Query Optimisation, and Legal Regulations in tech.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-primary pl-5 text-muted-foreground italic leading-relaxed">
              I don't just write code, I teach it, document it, and architect it to last.
              That dual lens of practitioner and educator shapes everything I build.
            </blockquote>

            {/* Stats */}
            <div className="mt-10 flex items-center divide-x divide-border border-y border-border py-5">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 text-center">
                  <span className="block text-2xl font-bold text-foreground">{s.value}</span>
                  <span className="block text-xs text-muted-foreground mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: highlight cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                className="flex flex-col gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.colors.bg}`}>
                  <item.icon size={16} className={item.colors.icon} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {item.label}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <span className={`self-start text-xs px-2.5 py-0.5 rounded-full font-medium ${item.colors.tag}`}>
                  {item.tag}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;