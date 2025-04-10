
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold font-heading gradient-text mb-2">Apurba Nath</h2>
            <p className="text-gray-400 max-w-md">
              Building exceptional digital experiences with modern mobile and web technologies.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <a 
                href="https://github.com/apurba-nath-cpu" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <a 
                href="https://www.linkedin.com/in/apurba-nath-613936200/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <a 
                href="mailto:apurba64880@gmail.com"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Apurba Nath. All rights reserved.
          </p>
          
          <ul className="flex gap-6 mt-4 md:mt-0">
            <li>
              <a href="#about" className="text-sm text-gray-400 hover:text-white">About</a>
            </li>
            <li>
              <a href="#experience" className="text-sm text-gray-400 hover:text-white">Experience</a>
            </li>
            <li>
              <a href="#projects" className="text-sm text-gray-400 hover:text-white">Projects</a>
            </li>
            <li>
              <a href="#contact" className="text-sm text-gray-400 hover:text-white">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
