"use client";

import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

const Experience = ({ t }: { t: any }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: t.TheorimAI.title,
      company: t.TheorimAI.company,
      period: t.TheorimAI.period,
      description: t.TheorimAI.description,
      link: t.TheorimAI.link,
    },
    {
      title: t.helloApp.title,
      company: t.helloApp.company,
      period: t.helloApp.period,
      description: t.helloApp.description,
      link: t.helloApp.link,
    },
    {
      title: t.notiexpress.title,
      company: t.notiexpress.company,
      period: t.notiexpress.period,
      description: t.notiexpress.description,
      link: t.notiexpress.link,
    },
    {
      title: t.freelance.title,
      company: t.freelance.company,
      period: t.freelance.period,
      description: t.freelance.description,
      link: t.freelance.link,
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.section
      id="experience"
      className="bg-background py-20 overflow-hidden"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="mb-16 text-center text-3xl md:text-4xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.title}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{
                  delay: index * 0.2,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className={`relative flex items-center ${
                  index % 2 === 0
                    ? "md:flex-row flex-row"
                    : "md:flex-row-reverse flex-row"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.3 }}
                  whileHover={{ scale: 1.5 }}
                  style={{ transform: "translateX(-50%)" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </motion.div>

                {/* Content card */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 bg-card/50 backdrop-blur-sm">
                      {/* Gradient accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{exp.title}</span>
                          </CardTitle>
                        </div>
                        <CardDescription className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            {exp.link ? (
                              <motion.a
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold hover:text-primary transition-colors flex items-center gap-1 group"
                                whileHover={{ x: 2 }}
                              >
                                {exp.company}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </motion.a>
                            ) : (
                              <span className="font-semibold">{exp.company}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.p
                          className="text-muted-foreground leading-relaxed"
                          style={{ whiteSpace: "pre-line" }}
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.7 + index * 0.2 }}
                        >
                          {exp.description}
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
