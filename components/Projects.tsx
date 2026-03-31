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
import { ExternalLink, ChevronLeft, ChevronRight, ArrowDown, ArrowUp } from "lucide-react";
import { GithubIcon } from "./ui/github-icon";
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
    window.addEventListener("resize", checkAllScrollPositions, { passive: true });

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
                      role="button"
                      tabIndex={0}
                      onClick={() => openModal(project)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal(project)}
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
                        <motion.button
                          aria-label="Scroll technologies left"
                          onClick={() => scrollTechnologies("left", index)}
                          className="cursor-pointer rounded-full bg-primary/10 p-1.5 sm:p-1 text-xs text-primary mx-1 sm:mx-2 absolute left-0 z-10 shadow-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-4 sm:w-4" />
                        </motion.button>
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
                        <motion.button
                          aria-label="Scroll technologies right"
                          onClick={() => scrollTechnologies("right", index)}
                          className="cursor-pointer rounded-full bg-primary/10 p-1.5 sm:p-1 text-xs text-primary mx-1 sm:mx-2 absolute right-0 z-10 shadow-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
                        </motion.button>
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
                                <GithubIcon className="mr-1 sm:mr-2 h-4 w-4" />{" "}
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
                                <GithubIcon className="mr-1 sm:mr-2 h-4 w-4" /> (Privado)
                              </span>
                            ) : (
                              <a
                                href={project.github[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <GithubIcon className="mr-1 sm:mr-2 h-4 w-4" />{" "}
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
                        icon={<GithubIcon className="h-6 w-6" />}
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
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${selectedProject.title} image ${i + 1} fullscreen`}
                    className="relative w-full aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(image)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedImage(image)}
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
                    <GithubIcon className="mr-2 h-4 w-4" /> {t.viewGithub}
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
        alt={selectedProject ? `${selectedProject.title} image` : undefined}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default Projects;
