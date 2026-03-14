import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  ExternalLink, ArrowUpRight, X, ChevronLeft, ChevronRight,
  BookOpen, Globe, Smartphone, Zap, Brain, Layers, LayoutGrid,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",           label: "All",           icon: LayoutGrid },
  { id: "web",           label: "Web",           icon: Globe },
  { id: "mobile",        label: "Mobile",        icon: Smartphone },
  { id: "api",           label: "API",           icon: Zap },
  { id: "ai",            label: "AI",            icon: Brain },
  { id: "architecture",  label: "Architecture",  icon: Layers },
];

const CATEGORY_COLORS = {
  web:          "from-sky-500 to-blue-400",
  mobile:       "from-violet-500 to-purple-400",
  api:          "from-amber-500 to-yellow-400",
  ai:           "from-emerald-500 to-teal-400",
  architecture: "from-rose-500 to-pink-400",
};

// Placeholder gradient thumbnails per category (replace src strings with real image paths)
const makePlaceholders = (category, count) =>
  Array.from({ length: count }, (_, i) => ({
    src: null,
    alt: `Screenshot ${i + 1}`,
    category,
  }));

const projects = [
  {
    title: "DigiMark Internship Management System (DIMS)",
    category: "web",
    description:
      "A system designed to automate internship management, intern tracking, and workflow coordination across the DigiMark Consulting team.",
    tech: ["Laravel", "MySQL"],
    status: "Completed",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("web", 3),
  },
  {
    title: "DigiMark Consulting Website",
    category: "web",
    description:
      "Official corporate website for DigiMark Consulting, showcasing IT services, training programs, and technology solutions with dynamic content management.",
    tech: ["Laravel", "MySQL", "Blade", "Bootstrap"],
    status: "Completed",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("web", 4),
  },
  {
    title: "MenTor School Management System",
    category: "web",
    description:
      "A school management web app for browsing programs, viewing profiles, courses, CA marks, and transcripts with a clean UI and normalized database.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    status: "Completed",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("web", 3),
  },
  {
    title: "Shayo – Food Delivery & Social Discovery",
    category: "mobile",
    description:
      "A modern food delivery and social food discovery platform connecting people with restaurants while enabling food experience sharing and community interaction.",
    tech: ["Flutter", "Firebase", "REST API"],
    status: "In Development",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("mobile", 4),
  },
  {
    title: "Revive – AI Social Companion Platform",
    category: "ai",
    description:
      "An AI-powered social platform providing an intelligent digital companion with bidirectional communication through proactive messages and calls.",
    tech: ["AI", "Conversational Systems", "Web Technologies"],
    status: "In Development",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("ai", 3),
  },
  {
    title: "AI Traffic Flow Prediction System",
    category: "ai",
    description:
      "A machine learning model developed to predict traffic congestion using historical and environmental data to improve urban mobility.",
    tech: ["Python", "Neural Networks", "Data Analysis"],
    status: "Completed",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("ai", 3),
  },
  {
    title: "Wikimedia Pronunciation Linking System",
    category: "api",
    description:
      "A system designed to match Wikidata items with pronunciation audio from Wikimedia Commons via API integration.",
    tech: ["React", "API Integration"],
    status: "Completed",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("api", 2),
  },
  {
    title: "Facial Recognition System",
    category: "ai",
    description:
      "Implemented clustering techniques using HDBSCAN to build an advanced facial recognition model capable of identifying subjects across image sets.",
    tech: ["Python", "Computer Vision", "Machine Learning"],
    status: "Completed",
    visitUrl: "#",
    detailsUrl: "#",
    images: makePlaceholders("ai", 3),
  },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const GRAD_MAP = {
  web:          "from-sky-900 to-blue-800",
  mobile:       "from-violet-900 to-purple-800",
  api:          "from-amber-900 to-yellow-800",
  ai:           "from-emerald-900 to-teal-800",
  architecture: "from-rose-900 to-pink-800",
};

const PlaceholderThumb = ({ category, index, className = "" }) => (
  <div
    className={`w-full h-full bg-gradient-to-br ${GRAD_MAP[category] ?? "from-zinc-800 to-zinc-700"} flex flex-col items-center justify-center gap-2 ${className}`}
  >
    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
      <Layers size={20} className="text-white/50" />
    </div>
    <span className="text-xs text-white/30 font-mono">screenshot {index + 1}</span>
  </div>
);

const Lightbox = ({ images, startIndex, category, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0"
          >
            {images[current].src ? (
              <img src={images[current].src} alt={images[current].alt} className="w-full h-full object-cover" />
            ) : (
              <PlaceholderThumb category={category} index={current} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 rounded-full px-3 py-1 text-xs font-mono text-white/70">
          {current + 1} / {images.length}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center transition-colors"
        >
          <X size={15} className="text-white" />
        </button>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </>
        )}

        {/* Dot strip */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Gallery Strip ─────────────────────────────────────────────────────────────

const GalleryStrip = ({ images, category, onOpen }) => {
  const [hovered, setHovered] = useState(null);
  const primary = images[0];
  const thumbs = images.slice(1, 4);

  return (
    <div className="flex gap-1.5 h-36 rounded-xl overflow-hidden cursor-pointer" onClick={() => onOpen(0)}>
      {/* Main image */}
      <div
        className="relative flex-[2] overflow-hidden"
        onMouseEnter={() => setHovered("main")}
        onMouseLeave={() => setHovered(null)}
      >
        {primary.src ? (
          <img src={primary.src} alt={primary.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <PlaceholderThumb category={category} index={0} />
        )}
        <motion.div
          animate={{ opacity: hovered === "main" ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
        >
          <ArrowUpRight size={20} className="text-white" />
        </motion.div>
      </div>

      {/* Thumbnails */}
      {thumbs.length > 0 && (
        <div className="flex flex-col gap-1.5 flex-1">
          {thumbs.map((img, i) => (
            <div
              key={i}
              className="relative flex-1 overflow-hidden"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => { e.stopPropagation(); onOpen(i + 1); }}
            >
              {img.src ? (
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              ) : (
                <PlaceholderThumb category={category} index={i + 1} />
              )}
              {/* +N overlay on last thumb */}
              {i === thumbs.length - 1 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">+{images.length - 4}</span>
                </div>
              )}
              <motion.div
                animate={{ opacity: hovered === i ? 1 : 0 }}
                className="absolute inset-0 bg-black/30 flex items-center justify-center"
              >
                <ArrowUpRight size={14} className="text-white" />
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Category badge ───────────────────────────────────────────────────────────

const CategoryBadge = ({ category }) => {
  const colors = {
    web:          "bg-sky-500/10 text-sky-400 border-sky-500/20",
    mobile:       "bg-violet-500/10 text-violet-400 border-violet-500/20",
    api:          "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ai:           "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    architecture: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wide ${colors[category] ?? "bg-accent text-accent-foreground border-border"}`}>
      {category}
    </span>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index, inView }) => {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
      >
        {/* Top accent line */}
        <div className={`h-0.5 w-full bg-gradient-to-r ${CATEGORY_COLORS[project.category] ?? "from-primary to-secondary"}`} />

        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Gallery */}
          <GalleryStrip
            images={project.images}
            category={project.category}
            onOpen={(i) => setLightbox(i)}
          />

          {/* Meta row */}
          <div className="flex items-center justify-between gap-2">
            <CategoryBadge category={project.category} />
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                project.status === "In Development"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-accent text-accent-foreground border border-border"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs font-mono rounded-md bg-muted text-muted-foreground border border-border/50">
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <a
              href={project.visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-95 transition-all duration-150"
            >
              <ExternalLink size={13} />
              Visit
            </a>
            <a
              href={project.detailsUrl}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border bg-accent text-accent-foreground text-sm font-medium hover:border-primary/40 hover:text-primary active:scale-95 transition-all duration-150"
            >
              <BookOpen size={13} />
              Read More
            </a>
          </div>
        </div>
      </motion.div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={project.images}
            startIndex={lightbox}
            category={project.category}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Portfolio</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            A collection of systems, platforms, and experiments built across web, mobile, AI, and beyond.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === id
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} inView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;