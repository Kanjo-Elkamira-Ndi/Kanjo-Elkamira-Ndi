const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Kanjo Elkamira Ndi. All rights reserved.</p>
        <p>
          Built with <span className="gradient-text font-semibold">passion</span> & clean code.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
