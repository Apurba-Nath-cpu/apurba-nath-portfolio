
import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
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
    <section id="about" className="py-20 bg-secondary/50 dark:bg-gray-900" ref={sectionRef}>
      <div className="section-container reveal fade-bottom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">About Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-4">
                I'm a Software Developer Engineer specializing in frontend development with expertise in Flutter, 
                React, and other modern web technologies. Currently building exceptional digital experiences at Sayurbox.
              </p>
              <p className="text-muted-foreground">
                I'm passionate about creating intuitive user interfaces and optimizing performance. 
                My experience includes improving app ratings, reducing crash rates, and enhancing user experiences 
                through data-driven development.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="mb-4">
                <h4 className="font-medium">Bachelor of Technology, Computer Science and Engineering</h4>
                <p className="text-muted-foreground">Indian Institute of Information Technology, Kalyani</p>
                <p className="text-sm text-muted-foreground">Nov 2020 - May 2024</p>
                <p className="text-sm text-muted-foreground">CGPA - 8.74</p>
              </div>

              <div>
                <h4 className="font-medium">Achievements</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
                  <li>Solved 350+ Data Structures and Algorithms problems on various platforms</li>
                  <li>LeetCode, GFG, Coding Ninja</li>
                  <li>Published navigatex on pub.dev with 150/160 pub points</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
