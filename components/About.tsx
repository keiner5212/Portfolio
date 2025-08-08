"use client";

import { motion, useInView, stagger, animate } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Database, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRef } from "react";

const technologies = {
  frontend: [
    {
      name: "React",
      url: "https://reactjs.org/",
      tooltip: "A JavaScript library for building user interfaces",
    },
    {
      name: "React Native",
      url: "https://reactnative.dev/",
      tooltip: "Create native apps for Android and iOS using React",
    },
    {
      name: "Tauri",
      url: "https://tauri.app/",
      tooltip:
        "Build smaller, faster, and more secure desktop applications with a web frontend",
    },
    {
      name: "Laravel",
      url: "https://laravel.com/",
      tooltip:
        "A PHP web application framework with expressive, elegant syntax",
    },
    {
      name: "Tailwind",
      url: "https://tailwindcss.com/",
      tooltip:
        "A utility-first CSS framework for rapidly building custom designs",
    },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      tooltip:
        "A lightweight, interpreted, or just-in-time compiled programming language",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      tooltip:
        "A typed superset of JavaScript that compiles to plain JavaScript",
    },
    {
      name: "CSS",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      tooltip:
        "A stylesheet language used to describe the presentation of a document written in HTML or XML",
    },
    {
      name: "SCSS",
      url: "https://sass-lang.com/",
      tooltip:
        "A preprocessor scripting language that is interpreted or compiled into CSS",
    },
    {
      name: "HTML",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      tooltip:
        "The standard markup language for documents designed to be displayed in a web browser",
    },
    {
      name: "PHP",
      url: "https://www.php.net/",
      tooltip:
        "A popular general-purpose scripting language that is especially suited to web development",
    },
  ],
  backend: [
    {
      name: "Express",
      url: "https://expressjs.com/",
      tooltip: "Fast, unopinionated, minimalist web framework for Node.js",
    },
    {
      name: "Laravel",
      url: "https://laravel.com/",
      tooltip:
        "A PHP web application framework with expressive, elegant syntax",
    },
    {
      name: "Spring Boot",
      url: "https://spring.io/projects/spring-boot",
      tooltip:
        "An extension of the Spring framework to simplify the development of new Spring applications",
    },
    {
      name: "Gin",
      url: "https://gin-gonic.com/",
      tooltip: "A web framework written in Go (Golang)",
    },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      tooltip:
        "A lightweight, interpreted, or just-in-time compiled programming language",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      tooltip:
        "A typed superset of JavaScript that compiles to plain JavaScript",
    },
    {
      name: "Java",
      url: "https://www.java.com/",
      tooltip:
        "A high-level, class-based, object-oriented programming language",
    },
    {
      name: "Go",
      url: "https://golang.org/",
      tooltip:
        "An open source programming language that makes it easy to build simple, reliable, and efficient software",
    },
    {
      name: "MongoDB",
      url: "https://www.mongodb.com/",
      tooltip:
        "A source-available cross-platform document-oriented database program",
    },
    {
      name: "Redis",
      url: "https://redis.io/",
      tooltip:
        "An open source, in-memory data structure store, used as a database, cache, and message broker",
    },
    {
      name: "PostgreSQL",
      url: "https://www.postgresql.org/",
      tooltip: "A powerful, open source object-relational database system",
    },
    {
      name: "MySQL",
      url: "https://www.mysql.com/",
      tooltip: "An open-source relational database management system",
    },
    {
      name: "Firestore",
      url: "https://firebase.google.com/docs/firestore",
      tooltip:
        "A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud",
    },
  ],
  others: [
    {
      name: "AWS",
      url: "https://aws.amazon.com/",
      tooltip:
        "A comprehensive, evolving cloud computing platform provided by Amazon",
    },
    {
      name: "Docker",
      url: "https://www.docker.com/",
      tooltip:
        "A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers",
    },
    {
      name: "Github Actions",
      url: "https://github.com/features/actions",
      tooltip:
        "Automate, customize, and execute your software development workflows right in your repository",
    },
    {
      name: "CircleCI",
      url: "https://circleci.com/",
      tooltip:
        "A modern continuous integration and continuous delivery (CI/CD) platform",
    },
    {
      name: "Bash",
      url: "https://www.gnu.org/software/bash/",
      tooltip: "A Unix shell and command language",
    },
    {
      name: "Python",
      url: "https://www.python.org/",
      tooltip:
        "An interpreted, high-level and general-purpose programming language",
    },
  ],
};

const TechLink = ({ tech }: { tech: any }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={tech.url}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tech.name}
          </Link>
        </motion.span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tech.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const About = ({ t }: { t: any }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      id="about"
      className="bg-muted py-20"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.title}
        </motion.h2>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-center text-lg">{t.content}</p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ y: -5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-6 w-6" /> Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {technologies.frontend.map((tech, index) => (
                      <span key={tech.name}>
                        <TechLink tech={tech} />
                        {index < technologies.frontend.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-6 w-6" /> Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {technologies.backend.map((tech, index) => (
                      <span key={tech.name}>
                        <TechLink tech={tech} />
                        {index < technologies.backend.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-6 w-6" /> Cloud, DevOps & Others
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {technologies.others.map((tech, index) => (
                      <span key={tech.name}>
                        <TechLink tech={tech} />
                        {index < technologies.others.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
