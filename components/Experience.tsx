"use client";

import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

const calculateMonths = (start: string, end: Date | string) => {
  const [sm, sy] = start.split("/").map(Number);
  const startDate = new Date(sy, sm - 1);
  const endDate = end instanceof Date ? end : (() => {
    const [em, ey] = end.split("/").map(Number);
    return new Date(ey, em - 1);
  })();
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
};

const formatPeriod = (period: string, presentText: string, lang: string) => {
  if (period === "No period" || period === "Sin período definido") return period;
  if (period.includes("-xxxx")) {
    const start = period.replace("-xxxx", "");
    const months = calculateMonths(start, new Date());
    return `${start} - ${presentText} (${months} ${lang === 'es' ? 'meses' : 'months'})`;
  } else if (period.includes("-")) {
    const [start, end] = period.split("-");
    const months = calculateMonths(start, end);
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    let duration = "";
    if (years > 0) {
      duration += `${years} ${lang === 'es' ? 'año' : 'year'}${years > 1 ? (lang === 'es' ? 's' : 's') : ''}`;
    }
    if (remMonths > 0) {
      if (duration) duration += ` ${lang === 'es' ? 'y' : 'and'} `;
      duration += `${remMonths} ${lang === 'es' ? 'mes' : 'month'}${remMonths > 1 ? (lang === 'es' ? 'es' : 's') : ''}`;
    }
    return `${period} (${duration})`;
  }
  return period;
};

const Experience = ({ t }: { t: any }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const lang = t.present === "Present" ? 'en' : 'es';

  const experiences = [
    {
      title: t.OrgaAI.title,
      company: t.OrgaAI.company,
      period: t.OrgaAI.period,
      description: t.OrgaAI.description,
      link: t.OrgaAI.link,
      logo: t.OrgaAI.logo,
    },
    {
      title: t.TheorimAI.title,
      company: t.TheorimAI.company,
      period: t.TheorimAI.period,
      description: t.TheorimAI.description,
      link: t.TheorimAI.link,
      logo: t.TheorimAI.logo,
    },
    {
      title: t.helloApp.title,
      company: t.helloApp.company,
      period: t.helloApp.period,
      description: t.helloApp.description,
      link: t.helloApp.link,
      logo: t.helloApp.logo,
    },
    {
      title: t.notiexpress.title,
      company: t.notiexpress.company,
      period: t.notiexpress.period,
      description: t.notiexpress.description,
      link: t.notiexpress.link,
    }
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
      <div className="container mx-auto px-4 max-w-[80dvw]">
        <motion.h2
          className="mb-16 text-center text-3xl md:text-4xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.title}
          <span className="section-accent" />
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const formattedPeriod = formatPeriod(exp.period, t.present, lang);
              return (
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
                      ? "lg:flex-row flex-row"
                      : "lg:flex-row-reverse flex-row"
                  }`}
                >
                {/* Timeline dot */}
                <motion.div
                  className={"absolute left-4 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"+ (index % 2 === 0 ? " lg:left-[calc(50%-1rem)]" : " lg:left-1/2")}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.3 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                </motion.div>

                {/* Content card */}
                <div
                  className={`w-full lg:w-[calc(50%-2rem)] ml-12 lg:ml-0 ${
                    index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
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
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-foreground via-foreground/50 to-transparent" />

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{exp.title}</span>
                          </CardTitle>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 flex-wrap">
                            {exp.logo && <img src={exp.logo} alt={exp.company} className="w-6 h-6 rounded-full object-cover" />}
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
                            <span>{formattedPeriod}</span>
                          </div>
                        </div>
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
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
