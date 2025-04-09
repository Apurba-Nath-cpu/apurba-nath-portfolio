
import { useEffect, useRef } from 'react';
import { 
  Code2, Database, Globe, Layout, Palette, Terminal, 
  Figma, BookOpen, Tool, Layers, GitBranch
} from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layout className="h-6 w-6" />,
    skills: ["React", "CSS", "Tailwind CSS", "Jetpack Compose", "Flutter"]
  },
  {
    title: "Backend Development",
    icon: <Database className="h-6 w-6" />,
    skills: ["SQL", "NoSQL databases", "Node.js", "Express.js", "FastAPI", "GraphQL", "Firebase", "MongoDB", "MySQL", "PostgreSQL"]
  },
  {
    title: "Programming Languages",
    icon: <Code2 className="h-6 w-6" />,
    skills: ["JavaScript", "TypeScript", "Dart", "Python", "Java"]
  },
  {
    title: "Developer Tools",
    icon: <Tool className="h-6 w-6" />,
    skills: ["Android Studio", "Git", "GitHub", "Flutter DevTools", "Vercel", "Jupyter Notebook", "Figma"]
  },
  {
    title: "APIs & Libraries",
    icon: <Layers className="h-6 w-6" />,
    skills: ["React Redux", "Provider", "Riverpod", "NumPy", "Pandas"]
  },
  {
    title: "Design & UI/UX",
    icon: <Palette className="h-6 w-6" />,
    skills: ["Responsive Design", "UI/UX Principles", "Figma", "Material Design"]
  }
];

const SkillsSection = () => {
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
    <section id="skills" className="py-20" ref={sectionRef}>
      <div className="section-container reveal fade-bottom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Technical Skills</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I specialize in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-card shadow-sm rounded-lg p-6 border animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-md text-primary mr-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
