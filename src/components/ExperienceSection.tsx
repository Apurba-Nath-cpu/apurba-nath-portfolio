
import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Hexagon,
} from 'lucide-react';
import FloatingCard from './three/FloatingCard';

const experiences = [
  {
    title: "Software Developer Engineer (Frontend)",
    company: "Superbolt Technologies Pvt. Ltd.",
    location: "Indiranagar, Bengaluru, Karnataka",
    period: "28 Dec 2023 - Present",
    skills: ["React", "Flutter", "Firebase", "Figma", "Unity"],
    achievements: [
      "Elevated App Rating from 3.0 to 4.3, Revamped user experience and resolved key pain points, skyrocketing app ratings from 3.0 to 4.3 on Google Play Store, ahead of year's median.",
      "Boosted website's performance by 45%, Leveraged CDN implementation and optimized code modularity through OOP, resulting in a 45% decrease in render.",
      "Developed intuitive onboarding experience, Optimized performance and enhanced first-time user experience, contributing to a 50% growth in daily web active users.",
      "Streamlined deployment workflow, Strategically planned 40+ major code revisions and continuously monitored app's performance, seamlessly prompting app updates.",
      "Enhanced user journey, Redesigned and deployed a new onboarding flow that simplified user interactions, resulting in a notable 21% decrease in app crashes.",
      "Enabled user feedback, Integrated user feedback forms at app's important pain points to gather valuable insights and systematically improve the user experience leading to 43% increased feedback, complemented by new Analytics to track user's behavior."
    ]
  },
  {
    title: "Flutter Intern",
    company: "Ricoz",
    location: "Remote",
    period: "Sept 2023 - Nov 2023",
    skills: ["Flutter", "Firebase"],
    achievements: [
      "Implemented core features like live chat, authentication, UI development enhancing functionality and usability.",
      "Integrated Firebase cloud functions, Firestore storage with Flutter."
    ]
  },
  {
    title: "Development of Institute website",
    company: "IIIT Kalyani",
    location: "Nadia, WB",
    period: "Jun 2023 - Sept 2023",
    skills: ["React", "JavaScript", "CSS"],
    achievements: [
      "Worked as a frontend developer in the core team with 5+ members, created a beta of IIIT Kalyani's website.",
      "Created responsive UI pages for IIIT website with pages, emphasizing maintainability and code reusability using OOP. The system is now utilized as beta website for the college."
    ]
  }
];

const ExperienceSection = () => {
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
    <section id="experience" className="py-20 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 w-full h-full">
        <FloatingCard position={[-6, 3, 0]} rotation={[0.2, 0.5, 0]} color="#9b87f5" />
        <FloatingCard position={[6, -3, 0]} rotation={[-0.2, -0.5, 0]} color="#7E69AB" />
      </div>
      
      <div className="section-container reveal fade-bottom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Work Experience</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="space-y-8 relative">
          <div className="absolute left-8 top-0 bottom-0 border-l-2 border-dashed border-gray-300 dark:border-gray-700"></div>

          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row gap-6 relative ${
                index % 2 === 0 ? 'animate-fade-in-right' : 'animate-fade-in-left'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-none w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>

              <Card className="flex-grow card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-lg text-accent">{exp.company}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4 mr-1" /> {exp.period}
                    </div>
                  </div>

                  <div className="flex items-center mb-4 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 mr-1" /> {exp.location}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>

                  <ul className="space-y-2 text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <Hexagon fill='rgb(50,50,50,0.5)' className="w-4 h-4 mr-4 flex-shrink-0 mt-1" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
