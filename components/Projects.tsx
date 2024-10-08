import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const projects = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/keiner5212/project1"
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
    github: "https://github.com/keiner5212/project2"
  },
  {
    title: "Project 3",
    description: "Description of Project 3",
    technologies: ["React Native", "Firebase"],
    github: "https://github.com/keiner5212/project3"
  }
];

const Projects = ({ t }: { t: any }) => {
  return (
    <section id="projects" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{t.title}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> {t.viewGithub}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;