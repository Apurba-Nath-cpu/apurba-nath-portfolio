
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8 animate-fade-in">
            <div className="space-y-2">
              <p className="text-accent font-medium">Hi, my name is</p>
              <h1 className="text-4xl md:text-6xl font-bold font-heading">
                Apurba Nath
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground">
                Software Developer Engineer <span className="gradient-text">(Frontend)</span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              I'm a software engineer specializing in building exceptional digital experiences.
              Currently, I'm focused on building accessible, human-centered products at <span className="font-medium text-foreground">Sayurbox</span>.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </Button>
            </div>
            
            <div className="flex items-center space-x-5 pt-2">
              <a 
                href="https://github.com/apurba-nath" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-accent transition-colors"
              >
                <Github size={22} />
              </a>
              <a 
                href="https://www.linkedin.com/in/apurba-nath-613936200/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-accent transition-colors"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="mailto:apurba44889@gmail.com" 
                aria-label="Email"
                className="text-gray-500 hover:text-accent transition-colors"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center max-w-md animate-fade-in-left">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/20">
              <img 
                src="/lovable-uploads/1eb4d20d-3fb7-4334-93cb-07c84f9b2433.png" 
                alt="Apurba Nath" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-accent transition-colors">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
