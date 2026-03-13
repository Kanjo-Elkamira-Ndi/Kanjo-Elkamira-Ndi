import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const socials = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kanjo-elkamira-ndi-a767b7229" },
    { icon: Github, label: "GitHub", href: "https://github.com/Kanjo-Elkamira-Ndi/Kanjo-Elkamira-Ndi" },
    { icon: Mail, label: "Email", href: "mailto:kanjoelkamira@gmail.com" },
  ];

  return (
    <section id="contact" className="section-padding gradient-subtle-bg" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Contact</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Interested in working together or have a question? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                placeholder="Your message..."
              />
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full">
              Send Message <Send size={18} />
            </Button>
          </motion.form>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of something great. Connect with me through any of these platforms.
            </p>

            <div className="space-y-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border card-shadow hover:card-shadow-hover transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <s.icon size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground text-sm">{s.label}</span>
                    <p className="text-xs text-muted-foreground">Connect on {s.label}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
