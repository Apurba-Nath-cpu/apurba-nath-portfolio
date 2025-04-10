
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

    // Add this near your other useEffect:
  useEffect(() => {
    // Apply dark mode on component mount
    document.documentElement.classList.toggle('dark', darkMode);
  }, []); // Empty dependency array means this runs once on mount


  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className="text-xl font-heading font-bold gradient-text">
              Apurba Nath
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-accent"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://github.com/apurba-nath-cpu" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 hover:text-accent transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/apurba-nath-613936200/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-accent transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:apurba64880@gmail.com" 
              aria-label="Email"
              className="text-gray-500 hover:text-accent transition-colors"
            >
              <Mail size={20} />
            </a>
            <div 
              onClick={toggleDarkMode}
              className="text-gray-500 hover:text-accent"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="text-gray-500 hover:text-accent mr-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col h-full">
                  <div className="flex flex-col space-y-4 py-6">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-accent"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-auto py-6 flex space-x-6">
                    <a 
                      href="https://github.com/apurba-nath-cpu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-gray-500 hover:text-accent transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/apurba-nath-613936200/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-gray-500 hover:text-accent transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href="mailto:apurba64880@gmail.com" 
                      aria-label="Email"
                      className="text-gray-500 hover:text-accent transition-colors"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
