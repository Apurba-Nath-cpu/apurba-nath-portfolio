
import { useEffect, useRef } from 'react';
import { 
  Code2, Database, Globe, Layout, Palette, Terminal, 
  Figma, BookOpen, Wrench, Layers, GitBranch
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
    icon: <Wrench className="h-6 w-6" />,
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
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

    // Add card hover effect
    cardsRef.current.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        card.style.transition = 'transform 0.1s';
      });
      
      card.addEventListener('mouseleave', () => {
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s';
      });
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      cardsRef.current.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
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
              className="bg-card shadow-sm rounded-lg p-6 border animate-fade-in skill-card"
              style={{ 
                animationDelay: `${idx * 0.1}s`,
                transformStyle: 'preserve-3d'
              }}
              ref={el => {
                if (el && !cardsRef.current.includes(el)) {
                  cardsRef.current[idx] = el;
                }
              }}
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
