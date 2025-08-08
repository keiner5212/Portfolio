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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.section
      id="experience"
      className="bg-background py-20"
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
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Card className="transition-all duration-300 hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <CardDescription>
                    {exp.link ? (
                      <motion.a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {exp.company}
                      </motion.a>
                    ) : (
                      exp.company
                    )}{" "}
                    | {exp.period}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.p
                    style={{ whiteSpace: "pre-line" }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {exp.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;
