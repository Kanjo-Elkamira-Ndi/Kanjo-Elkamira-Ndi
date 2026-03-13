import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, FlaskConical } from "lucide-react";

const education = [
  {
    degree: "Higher National Diploma",
    field: "Software Engineering",
    school: "Yaounde International Business School",
    period: "2022 – 2024",
    status: "Completed",
    icon: BookOpen,
    description:
      "Foundational study in software development principles, data structures, algorithms, and applied programming across modern languages and frameworks.",
    tags: ["Programming", "Data Structures", "Web Dev", "Databases"],
    color: "from-sky-500 to-cyan-400",
    glow: "shadow-sky-500/20",
  },
  {
    degree: "Bachelor of Technology (BTech)",
    field: "Software Engineering",
    school: "Yaounde International Business School",
    period: "2024 – 2025",
    status: "Completed",
    icon: GraduationCap,
    description:
      "Advanced software engineering concepts covering system design, DevOps fundamentals, API architecture, agile methodologies, and secure software practices.",
    tags: ["System Design", "APIs", "DevOps", "Agile"],
    color: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/20",
  },
  {
    degree: "Master of Technology (MTech)",
    field: "Software Engineering",
    school: "Yaounde International Business School",
    period: "2025 – 2027",
    status: "Ongoing",
    icon: FlaskConical,
    description:
      "Research-driven postgraduate program focused on advanced systems engineering, DevSecOps, AI-driven development, and enterprise-grade software architecture.",
    tags: ["DevSecOps", "AI/ML", "Research", "Architecture"],
    color: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/20",
  },
];

const TimelineCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-start gap-6 group"
    >
      {/* Icon node on the timeline */}
      <div className="relative z-10 flex-shrink-0 mt-1">
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${item.glow} shadow-xl`}
        >
          <Icon size={20} className="text-white" />
        </motion.div>
        {/* Pulse ring for ongoing */}
        {item.status === "Ongoing" && (
          <>
            <span className="absolute -inset-1.5 rounded-2xl bg-emerald-400/20 animate-ping" />
            <span className="absolute -inset-1 rounded-2xl ring-2 ring-emerald-400/40" />
          </>
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex-1 mb-10 bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
      >
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} opacity-60`} />

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground leading-snug">
              {item.degree}
            </h3>
            <p className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.field}
            </p>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              item.status === "Ongoing"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-accent text-accent-foreground border-border"
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* School & Period */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            {item.school}
          </span>
          <span className="text-border">·</span>
          <span className="font-mono text-xs tracking-wide">{item.period}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg bg-accent text-accent-foreground font-medium border border-border/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const EducationSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-secondary/4 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <GraduationCap size={14} />
            Academic Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Education &{" "}
            <span className="gradient-text">Qualifications</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            A continuous path of learning at Yaounde International Business School — from foundations to research.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-10 w-px bg-gradient-to-b from-sky-500/40 via-violet-500/40 to-emerald-500/40" />

          {/* Cards */}
          <div className="pl-0">
            {education.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Terminal dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="absolute left-[18px] bottom-8 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 ring-4 ring-emerald-500/20"
          />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;