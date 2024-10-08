import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = ({ t }: { t: any }) => {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Keiner José Alvarado. {t.rights}
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/keiner5212" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/keiner-alvarado-quintero-96245a232/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:keinerjosealvaradoquintero@gmail.com" className="text-muted-foreground hover:text-primary">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;