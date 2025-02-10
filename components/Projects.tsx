"use client";

import "./Projects.css";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const Projects = ({ t }: { t: any }) => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showArrows, setShowArrows] = useState<{ left: boolean; right: boolean }[]>(t.data.slice(0, visibleProjects).map(() => ({ left: false, right: false })));

  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 3);
  };

  const showLessProjects = () => {
    setVisibleProjects(3);
  };

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const scrollTechnologies = (direction: 'left' | 'right', projectIndex: number) => {
    const techScroll = document.getElementById(`technologies${projectIndex}`);
    if (techScroll) {
      techScroll.scrollBy({
        left: direction === 'right' ? 150 : -150,
        behavior: 'smooth',
      });

      setTimeout(() => checkScrollPosition(projectIndex), 300);
    }
  };

  const checkScrollPosition = (projectIndex: number) => {
    const techScroll = document.getElementById(`technologies${projectIndex}`);
    if (techScroll) {
      const showLeft = techScroll.scrollLeft > 0;
      const showRight = techScroll.scrollLeft < techScroll.scrollWidth - techScroll.clientWidth;

      setShowArrows(prev => {
        const newArrows = [...prev];
        newArrows[projectIndex] = { left: showLeft, right: showRight };
        return newArrows;
      });
    }
  };

  useEffect(() => {
    t.data.forEach((_project: any, index: number) => {
      checkScrollPosition(index)
    })

    // onWindowResize
    window.addEventListener('resize', () => {
      t.data.forEach((_project: any, index: number) => {
        checkScrollPosition(index)
      })
    })
  }, [visibleProjects, t.data]);

  

  return (
    <section id="projects" className="bg-muted py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">{t.title}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.data.slice(0, visibleProjects).map((project: any, index: number) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-1 cursor-pointer" title={t.viewMore}
                  onClick={() => openModal(project)}>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mb-4">
                <div className="relative flex items-center mb-4">
                  {showArrows[index]?.left && (
                    <span
                      onClick={() => scrollTechnologies('left', index)}
                      className="cursor-pointer rounded-full bg-primary/10 p-1 text-xs text-primary mx-2 absolute left-0 z-10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </span>
                  )}
                  <div
                    className="flex overflow-x-hidden space-x-2 px-2 w-[85%] absolute left-1/2 transform -translate-x-1/2 z-10"
                    id={`technologies${index}`}
                  >
                    {project.technologies.map((tech: string, i: number) => (
                      <span key={i} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary whitespace-nowrap">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {showArrows[index]?.right && (
                    <span
                      onClick={() => scrollTechnologies('right', index)}
                      className="cursor-pointer rounded-full bg-primary/10 p-1 text-xs text-primary mx-2 absolute right-0 z-10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
                {project.images.length > 1 ? (
                  <Slider {...sliderSettings} dots={false} className="w-full h-full">
                    {project.images.map((image: string, i: number) => (
                      <div key={"project" + i} className="flex justify-center items-center w-full h-[210px]">
                        <div key={"project" + i} className="flex justify-center items-center w-full h-[210px]">
                        <Image
                          src={image}
                          width={200}
                          height={200}
                          alt={`Project ${project.title} image ${i}`}
                          className="rounded-lg w-auto h-full object-cover"
                        />
                      </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src={project.images[0]}
                      width={200}
                      height={200}
                      alt={`Project ${project.title} image`}
                      className="rounded-lg w-full h-[210px] object-cover"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="flex gap-2">
                  {project.github.length > 1 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Github className="mr-2 h-4 w-4" /> {t.viewGithub}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {project.github.map((link: string, i: number) => (
                          <DropdownMenuItem key={i}>
                            <a href={link} target="_blank" rel="noopener noreferrer" className="w-full">
                              {link.includes("priv") ? "Repositorio Privado" : `Repositorio ${i + 1}`}
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      {project.github[0].includes("priv") ? (
                        <span className="cursor-not-allowed">
                          <Github className="mr-2 h-4 w-4" /> (Privado)
                        </span>
                      ) : (
                        <a href={project.github[0]} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> {t.viewGithub}
                        </a>
                      )}
                    </Button>
                  )}
                  {project.website && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={project.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> {t.viewWebsite}
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8 w-full flex justify-center">
          {visibleProjects < t.data.length ? (
            <button
              onClick={loadMoreProjects}
              className="view-more-button"
            >
              <span>{t.viewMore}</span>
            </button>
          ) : (
            <button
              onClick={showLessProjects}
              className="view-more-button"
            >
              <span>{t.viewLess}</span>
            </button>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;