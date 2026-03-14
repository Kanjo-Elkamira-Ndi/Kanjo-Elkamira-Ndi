import { motion, useAnimationControls } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const TITLES = [
  "Hey There 👋",
  "I am.",
  "Kanjo Elkamira Ndi",
  "And I am a............",
  "Software Engineer",
  "Fullstack Developer",
  "QA Engineer",
  "Aspiring DevSecOps Engineer",
];

const TypewriterTitle = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 70);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

const FloatingImage = () => (
  <motion.div
    animate={{ y: [0, -14, 0] }}
    transition={{
      duration: 3.6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative flex justify-center"
  >
    {/* Glowing halo behind image */}
    <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110 opacity-70 pointer-events-none" />

    {/* Rotating ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute -inset-3 rounded-full border border-dashed border-primary/30 pointer-events-none"
    />

    {/* Second slower counter-rotating ring */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      className="absolute -inset-6 rounded-full border border-dotted border-secondary/20 pointer-events-none"
    />

    {/* Profile image */}
    <div className="relative w-72 h-72 lg:w-[440px] lg:h-[440px] rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
      <img
        src="/kanjo_elkamira_ndi_profile_pic.jpeg"
        alt="Kanjo Elkamira Ndi"
        className="w-full h-full object-cover object-center"
      />
      {/* Subtle overlay sheen */}
      <div className="absolute inset-0 rounded-full ring-4 ring-inset ring-white/10 pointer-events-none" />
    </div>

    {/* Name badge */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-4 py-1.5 shadow-lg flex items-center gap-2 whitespace-nowrap"
    >
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-xs font-medium text-foreground">Kanjo Elkamira Ndi</span>
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="section-container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── MOBILE: image first ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex lg:hidden justify-center mt-4"
          >
            <FloatingImage />
          </motion.div>

          {/* ── LEFT: text content ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full gradient-bg animate-pulse" />
              Available for opportunities
            </motion.div>

            {/* Typewriter heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground text-balance min-h-[4.5rem] lg:min-h-[7rem]"
            >
              <TypewriterTitle />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              I design and develop scalable web systems, mobile applications,
              AI-driven solutions, and high-quality software while continuously
              exploring DevSecOps and secure engineering practices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowDown className="ml-1" size={18} />
                </a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#contact">
                  Contact Me
                  <Send className="ml-1" size={18} />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex items-center gap-8 text-sm text-muted-foreground"
            >
              <div>
                <span className="block text-2xl font-bold text-foreground">4+</span>
                Years Experience
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="block text-2xl font-bold text-foreground">8+</span>
                Projects Built
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <span className="block text-2xl font-bold text-foreground">5+</span>
                Technologies
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: image (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <FloatingImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;