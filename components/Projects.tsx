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
          {visibleProjects >= t.data.length && (
            <Card key="final-card" className="flex flex-col">
              <CardHeader>
                <CardTitle>{t.finalCard.title}</CardTitle>
                <CardDescription>{t.finalCard.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center w-full">
                <div className="light-button">
                  <a className="bt" href="https://github.com/keiner5212" >
                    <div className="light-holder">
                      <div className="dot"></div>
                      <div className="light"></div>
                    </div>
                    <div className="button-holder">
                      <svg
                        viewBox="0 0 496 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                        ></path>
                      </svg>
                      <p className="text-center">{t.finalCard.buttonText}</p>
                    </div>
                  </a>
                </div>
                </div>
              </CardContent>
            </Card>
          )}
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