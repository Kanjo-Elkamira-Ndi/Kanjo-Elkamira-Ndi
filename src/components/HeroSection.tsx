import { motion } from "framer-motion";
import { ArrowDown, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="section-container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
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

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground text-balance"
            >
              Software Engineer &{" "}
              <span className="gradient-text">Fullstack Developer</span>
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

          {/* Right: avatar / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl gradient-bg opacity-10 absolute -inset-4 blur-2xl" />
              <div className="relative w-80 h-80 rounded-3xl bg-card border border-border overflow-hidden card-shadow flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">KN</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Kanjo Elkamira Ndi</h3>
                  <p className="text-sm text-muted-foreground mt-1">Software Engineer</p>
                  <div className="flex gap-2 mt-4 justify-center flex-wrap">
                    {["React", "Laravel", "Python", "Flutter"].map((t) => (
                      <span key={t} className="px-2 py-1 text-xs rounded-md bg-accent text-accent-foreground font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
