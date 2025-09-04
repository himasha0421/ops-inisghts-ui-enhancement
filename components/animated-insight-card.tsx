"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InsightCardProps {
  title: string
  description: string
  metric?: string
  footer?: string
  className?: string
  index?: number
}

export function AnimatedInsightCard({ title, description, metric, footer, className, index = 0 }: InsightCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Calculate staggered delay based on card index
  const delay = 0.1 + index * 0.1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Card className={cn("h-full flex flex-col", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {metric && (
          <CardContent className="flex-grow">
            <p className="text-3xl font-bold">{metric}</p>
          </CardContent>
        )}
        {footer && <CardFooter className="text-sm text-muted-foreground">{footer}</CardFooter>}
      </Card>
    </motion.div>
  )
}
