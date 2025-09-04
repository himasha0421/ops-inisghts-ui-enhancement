"use client"

import { AnimatedInsightCard } from "./animated-insight-card"

interface InsightData {
  id: string
  title: string
  description: string
  metric?: string
  footer?: string
}

interface InsightCardGridProps {
  insights: InsightData[]
  className?: string
}

export function InsightCardGrid({ insights, className }: InsightCardGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {insights.map((insight, index) => (
        <AnimatedInsightCard
          key={insight.id}
          title={insight.title}
          description={insight.description}
          metric={insight.metric}
          footer={insight.footer}
          index={index}
        />
      ))}
    </div>
  )
}
