"use client"

import { motion, useInView } from "framer-motion"
import { ReactNode, useRef } from "react"

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode
  className?: string
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}