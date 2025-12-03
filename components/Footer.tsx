import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <a href="https://keiner-alvarado-quintero.top" target="_blank" rel="noopener noreferrer">keiner-alvarado-quintero.top</a>
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;