"use client"

import { useState, useMemo } from "react"
import { InsightThemeCard } from "./insight-theme-card"
import { RefreshCw } from "lucide-react"

interface InsightData {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  impact: "high" | "medium" | "low"
  frequency: number
  trend: "up" | "down" | "stable"
}

interface InsightsGridProps {
  filters: any
  onCardClick?: (insight: InsightData) => void
}

export function InsightsGrid({ filters, onCardClick }: InsightsGridProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Updated mock data - in real app this would come from API
  const allInsights: InsightData[] = [
    {
      id: "1",
      title: "Packaging Quality Control Issues",
      description:
        "Damaged items due to inadequate packaging materials and poor handling procedures causing widespread customer dissatisfaction.",
      category: "Operational Inefficiencies",
      subcategory: "Packaging Issues",
      impact: "high",
      frequency: 1667,
      trend: "up",
    },
    {
      id: "2",
      title: "Promotional Code System Failures",
      description:
        "Coupon validation errors and promotional gift processing issues leading to customer frustration and abandoned purchases.",
      category: "Customer Experience",
      subcategory: "Support Quality",
      impact: "high",
      frequency: 546,
      trend: "up",
    },
    {
      id: "3",
      title: "Account Password Reset Delays",
      description:
        "Extended verification processes and system delays preventing customers from accessing their accounts efficiently.",
      category: "Account Management",
      subcategory: "Login Issues",
      impact: "medium",
      frequency: 423,
      trend: "stable",
    },
    {
      id: "4",
      title: "Payment Processing Transaction Failures",
      description:
        "Credit card processing errors and duplicate charge incidents affecting customer trust and revenue streams.",
      category: "Payment Processing",
      subcategory: "Transaction Failures",
      impact: "high",
      frequency: 389,
      trend: "up",
    },
    {
      id: "5",
      title: "Gift Card Balance Verification Issues",
      description:
        "System discrepancies in gift card balance reporting and redemption process causing customer confusion.",
      category: "System Performance",
      subcategory: "API Errors",
      impact: "medium",
      frequency: 245,
      trend: "down",
    },
    {
      id: "6",
      title: "Rewards Program Point Calculation Errors",
      description:
        "Incorrect point allocation and redemption value calculations leading to customer complaints and loyalty issues.",
      category: "Customer Experience",
      subcategory: "Resolution Rate",
      impact: "medium",
      frequency: 198,
      trend: "stable",
    },
    {
      id: "7",
      title: "Return Policy Communication Gaps",
      description:
        "Inconsistent return policy information across channels causing confusion and customer service escalations.",
      category: "Communication Issues",
      subcategory: "Information Accuracy",
      impact: "medium",
      frequency: 176,
      trend: "down",
    },
    {
      id: "8",
      title: "Order Status Notification Delays",
      description:
        "Delayed or missing shipping and delivery notifications leaving customers uninformed about order progress.",
      category: "Communication Issues",
      subcategory: "Notification Delays",
      impact: "low",
      frequency: 154,
      trend: "down",
    },
    {
      id: "9",
      title: "Third-Party Integration Failures",
      description:
        "External service dependencies causing system outages and preventing customers from completing transactions.",
      category: "System Performance",
      subcategory: "API Errors",
      impact: "high",
      frequency: 132,
      trend: "up",
    },
  ]

  // Filter and sort insights based on current filters
  const filteredInsights = useMemo(() => {
    let filtered = allInsights

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(
        (insight) =>
          insight.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          insight.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          insight.category.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((insight) => insight.category === filters.category)
    }

    // Apply subcategory filter
    if (filters.subcategory) {
      filtered = filtered.filter((insight) => insight.subcategory === filters.subcategory)
    }

    // Apply sorting
    switch (filters.sort) {
      case "impact":
        filtered.sort((a, b) => {
          const impactOrder = { high: 3, medium: 2, low: 1 }
          return impactOrder[b.impact] - impactOrder[a.impact]
        })
        break
      case "frequency":
        filtered.sort((a, b) => b.frequency - a.frequency)
        break
      case "recent":
        // For demo purposes, just reverse the array
        filtered.reverse()
        break
      default: // category
        filtered.sort((a, b) => a.category.localeCompare(b.category))
    }

    return filtered
  }, [filters])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operational Insights (Total {filteredInsights.length})</h1>
          <p className="text-gray-600 mt-1">AI-powered analysis of customer service themes and operational patterns</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {filteredInsights.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No insights found</div>
          <div className="text-gray-500 text-sm">Try adjusting your filters or search terms</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight, index) => (
            <InsightThemeCard key={insight.id} {...insight} index={index} onClick={() => onCardClick?.(insight)} />
          ))}
        </div>
      )}
    </div>
  )
}
