"use client";

import "./Projects.css";
import { useState, useCallback, useEffect, useRef, memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, ChevronRight, ArrowDown, ArrowUp } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ImageViewerDialog } from "./ui/image-viewer";
import { LightButton } from "./ui/light-button";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  github: string[];
  website?: string;
  isTeam?: boolean;
}

interface FinalCard {
  title: string;
  description: string;
  buttonText: string;
}

interface ProjectsTranslation {
  title: string;
  isTeamText: string;
  viewMore: string;
  viewLess: string;
  viewGithub: string;
  viewWebsite: string;
  data: Project[];
  finalCard: FinalCard;
}

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const BUTTON_VARIANTS = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const ProjectImage = memo(
  ({
    image,
    projectTitle,
    index,
  }: {
    image: string;
    projectTitle: string;
    index: number;
  }) => (
    <div className="flex justify-center items-center w-full h-[180px] sm:h-[200px] md:h-[210px]">
      <Image
        src={image}
        width={200}
        height={200}
        alt={`Project ${projectTitle} image ${index}`}
        className="rounded-lg w-auto h-full object-cover"
        sizes="200px"
        priority={index === 0}
      />
    </div>
  )
);

ProjectImage.displayName = "ProjectImage";

const Projects = ({ t }: { t: ProjectsTranslation }) => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [showArrows, setShowArrows] = useState<
    { left: boolean; right: boolean }[]
  >(t.data.map(() => ({ left: false, right: false })));

  const loadMoreProjects = useCallback(() => {
    setVisibleProjects((prev) => Math.min(prev + 3, t.data.length));
  }, [t.data.length]);

  const showLessProjects = useCallback(() => {
    setVisibleProjects(3);
  }, []);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const checkScrollPosition = useCallback((projectIndex: number) => {
    const techScroll = document.getElementById(`technologies${projectIndex}`);
    if (techScroll) {
      const showLeft = techScroll.scrollLeft > 0;
      const showRight =
        techScroll.scrollLeft < techScroll.scrollWidth - techScroll.clientWidth;

      setShowArrows((prev) => {
        const newArrows = [...prev];
        newArrows[projectIndex] = { left: showLeft, right: showRight };
        return newArrows;
      });
    }
  }, []);

  const scrollTechnologies = useCallback(
    (direction: "left" | "right", projectIndex: number) => {
      const techScroll = document.getElementById(`technologies${projectIndex}`);
      if (techScroll) {
        techScroll.scrollBy({
          left: direction === "right" ? 150 : -150,
          behavior: "smooth",
        });

        setTimeout(() => checkScrollPosition(projectIndex), 300);
      }
    },
    [checkScrollPosition]
  );

  useEffect(() => {
    const checkAllScrollPositions = () => {
      t.data.forEach((_project, index) => {
        checkScrollPosition(index);
      });
    };

    checkAllScrollPositions();
    window.addEventListener("resize", checkAllScrollPositions);

    return () => {
      window.removeEventListener("resize", checkAllScrollPositions);
    };
  }, [t.data, checkScrollPosition]);

  return (
    <>
      <section
        id="projects"
        className="bg-muted py-20 relative"
        ref={sectionRef}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {t.title}
            <span className="section-accent" />
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {t.data.slice(0, visibleProjects).map((project, index) => (
              <motion.div key={`${project.title}-${index}`} variants={ITEM_VARIANTS} animate={isInView ? "visible" : "hidden"}>
                <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:border-foreground/20 hover:-translate-y-1 relative">
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-md ${
                          project.isTeam
                            ? "bg-blue-500/90 text-white"
                            : "bg-purple-500/90 text-white"
                        }`}
                      >
                        {project.isTeam ? t.isTeamText : "Personal"}
                      </motion.div>
                    </div>
                  <CardHeader className="px-4 sm:px-6 pt-4 pb-3">
                    <CardTitle className="text-base sm:text-lg pr-16 sm:pr-20">{project.title}</CardTitle>
                    <div
                      onClick={() => openModal(project)}
                      className="cursor-pointer"
                    >
                      <CardDescription className="line-clamp-2 sm:line-clamp-1 text-xs sm:text-sm">
                        {project.description}
                      </CardDescription>
                      <span className="text-sm text-foreground hover:text-foreground hover:underline mt-1 inline-block font-medium transition-colors duration-200">
                        {t.viewMore}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="mb-4">
                    <div className="relative flex items-center mb-4 min-h-[32px]">
                      {showArrows[index]?.left && (
                        <motion.span
                          onClick={() => scrollTechnologies("left", index)}
                          className="cursor-pointer rounded-full bg-primary/10 p-1.5 sm:p-1 text-xs text-primary mx-1 sm:mx-2 absolute left-0 z-10 shadow-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-4 sm:w-4" />
                        </motion.span>
                      )}
                      <div
                        className="flex overflow-x-hidden space-x-2 px-1 sm:px-2 w-[80%] sm:w-[85%] absolute left-1/2 transform -translate-x-1/2 z-0"
                        id={`technologies${index}`}
                      >
                        {project.technologies.map((tech, i) => (
                          <motion.span
                            key={`${tech}-${i}`}
                            className="rounded-full bg-primary/10 px-2 py-1 text-[10px] sm:text-xs text-primary whitespace-nowrap"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      {showArrows[index]?.right && (
                        <motion.span
                          onClick={() => scrollTechnologies("right", index)}
                          className="cursor-pointer rounded-full bg-primary/10 p-1.5 sm:p-1 text-xs text-primary mx-1 sm:mx-2 absolute right-0 z-10 shadow-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
                        </motion.span>
                      )}
                    </div>
                    {project.images.length > 1 ? (
                      <Slider
                        {...SLIDER_SETTINGS}
                        dots={false}
                        className="w-full h-full"
                      >
                        {project.images.map((image, i) => (
                          <ProjectImage
                            key={`project-${index}-${i}`}
                            image={image}
                            projectTitle={project.title}
                            index={i}
                          />
                        ))}
                      </Slider>
                    ) : (
                      <ProjectImage
                        image={project.images[0]}
                        projectTitle={project.title}
                        index={0}
                      />
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2 mt-auto px-3 sm:px-6 pb-4">
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      {project.github.length > 1 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <motion.div
                              whileHover="hover"
                              whileTap="tap"
                              variants={BUTTON_VARIANTS}
                              className="w-full sm:flex-1"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full min-h-[44px] text-xs sm:text-sm"
                              >
                                <Github className="mr-1 sm:mr-2 h-4 w-4" />{" "}
                                {t.viewGithub}
                              </Button>
                            </motion.div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {project.github.map((link, i) => (
                              <DropdownMenuItem key={`${link}-${i}`}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full"
                                >
                                  {link.includes("priv")
                                    ? "Repositorio Privado"
                                    : `Repositorio ${i + 1}`}
                                </a>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <motion.div
                          whileHover="hover"
                          whileTap="tap"
                          variants={BUTTON_VARIANTS}
                          className="w-full sm:flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="w-full min-h-[44px] text-xs sm:text-sm"
                          >
                            {project.github[0].includes("priv") ? (
                              <span className="cursor-not-allowed">
                                <Github className="mr-1 sm:mr-2 h-4 w-4" /> (Privado)
                              </span>
                            ) : (
                              <a
                                href={project.github[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-1 sm:mr-2 h-4 w-4" />{" "}
                                {t.viewGithub}
                              </a>
                            )}
                          </Button>
                        </motion.div>
                      )}
                      {project.website && (
                        <motion.div
                          whileHover="hover"
                          whileTap="tap"
                          variants={BUTTON_VARIANTS}
                          className="w-full sm:flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="w-full min-h-[44px] text-xs sm:text-sm"
                          >
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />{" "}
                              {t.viewWebsite}
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
            {visibleProjects >= t.data.length && (
              <motion.div key="final-card" variants={ITEM_VARIANTS} animate={isInView ? "visible" : "hidden"}>
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{t.finalCard.title}</CardTitle>
                    <CardDescription>{t.finalCard.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center w-full min-h-[300px]">
                      <LightButton
                        href="https://github.com/keiner5212"
                        label={t.finalCard.buttonText}
                        icon={
                          <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                          </svg>
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
          <div className="text-center mt-8 w-full flex justify-center min-h-[40px]">
            <AnimatePresence mode="wait">
              {visibleProjects < t.data.length ? (
                <motion.div
                  key="load-more"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button onClick={loadMoreProjects} className="inline-flex items-center gap-2 hover:translate-y-1 transition-transform duration-300">
                    {t.viewMore} <ArrowDown className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : visibleProjects > 3 ? (
                <motion.div
                  key="show-less"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button onClick={showLessProjects} className="inline-flex items-center gap-2 hover:translate-y-1 transition-transform duration-300">
                    {t.viewLess} <ArrowUp className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-[85vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader className="pr-6 sm:pr-0">
              <DialogTitle className="text-lg sm:text-xl md:text-2xl pr-2">
                {selectedProject?.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm md:text-base">
                {selectedProject?.description}
              </DialogDescription>
            </DialogHeader>

            {selectedProject?.images && (
              <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {selectedProject.images.map((image, i) => (
                  <div
                    key={`modal-image-${i}`}
                    className="relative w-full aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      fill
                      alt={`Project ${selectedProject.title} image ${i}`}
                      className="rounded-lg object-cover"
                      sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 220px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
              {selectedProject?.github && (
                <Button variant="outline" asChild className="w-full sm:w-auto h-10 sm:h-9">
                  <a
                    href={selectedProject.github[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-sm"
                  >
                    <Github className="mr-2 h-4 w-4" /> {t.viewGithub}
                  </a>
                </Button>
              )}
              {selectedProject?.website && (
                <Button variant="outline" asChild className="w-full sm:w-auto h-10 sm:h-9">
                  <a
                    href={selectedProject.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-sm"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> {t.viewWebsite}
                  </a>
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </section>
      <ImageViewerDialog
        src={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default Projects;
