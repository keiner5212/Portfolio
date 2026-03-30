"use client";

import { motion } from "framer-motion";
import "../Projects.css";

interface LightButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  target?: string;
  rel?: string;
}

export function LightButton({
  href,
  label,
  icon,
  target = "_blank",
  rel = "noopener noreferrer",
}: LightButtonProps) {
  return (
    <motion.div
      className="light-button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <a className="bt" href={href} target={target} rel={rel}>
        <div className="light-holder">
          <motion.div
            className="dot"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="light" />
        </div>
        <div className="button-holder">
          {icon}
          <p className="text-center">{label}</p>
        </div>
      </a>
    </motion.div>
  );
}
