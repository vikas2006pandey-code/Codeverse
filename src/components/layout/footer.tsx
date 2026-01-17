import Link from 'next/link';
import { Github, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="font-bold font-headline">Codeverse</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Battle AI Opponents. Master Your Subjects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/learning" className="text-sm text-muted-foreground hover:text-primary transition-colors">Missions</Link></li>
              <li><Link href="/challenges" className="text-sm text-muted-foreground hover:text-primary transition-colors">Challenges</Link></li>
              <li><Link href="/compete" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compete</Link></li>
              <li><Link href="/games" className="text-sm text-muted-foreground hover:text-primary transition-colors">Games</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-headline font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-headline font-semibold mb-4">Follow Us</h4>
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="/" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="/" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>Copyright &copy; {currentYear} arnoldian super 5. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
