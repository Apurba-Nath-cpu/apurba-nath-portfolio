import { useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import FloatingCard from './three/FloatingCard';
import FloatingSphere from './three/FloatingSphere';

const projects = [
  {
    title: "Batua",
    description: "A Flutter and Dart based application that allows users to effortlessly create or import wallets across networks and transition between wallet and webviews for seamless navigation.",
    tags: ["Dart", "Flutter", "Node.js", "MongoDB", "Alchemy"],
    github: "https://github.com/apurba-nath-cpu/batua",
    demo: null
  },
  {
    title: "navigatiox",
    description: "A Dart package that provides a collection of custom page transition animations to enhance the navigation experience in your Flutter applications with 7+ animations with intense customization.",
    tags: ["Flutter", "Dart", "Animation"],
    github: "https://github.com/apurba-nath-cpu/navigatiox",
    demo: "https://pub.dev"
  },
  {
    title: "Readme",
    description: "An application to share poems, stories, articles, essays, etc. under 5 different categories, a social media app for literature with Firebase for authentication, storage, connect, post in the platform.",
    tags: ["Dart", "Flutter", "Firebase"],
    github: "https://github.com/apurba-nath-cpu/Readme",
    demo: null
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-secondary/50 dark:bg-gray-900 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0">
        <FloatingCard position={[-7, 2, 0]} rotation={[0.3, -0.2, 0]} color="#8B5CF6" />
        <FloatingSphere position={[7, -2, 0]} color="#D946EF" size={1} />
      </div>
      
      <div className="section-container reveal fade-bottom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Notable Projects</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A collection of my recent work and side projects that showcase my technical skills and problem-solving abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="card-hover h-full flex flex-col animate-scale-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2 gradient-text">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                {project.github && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <a 
              href="https://github.com/apurba-nath-cpu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github className="h-5 w-5 mr-2" />
              View More Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
