"use client"

import type React from "react"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { IssueDetailModal } from "./issue-detail-modal"

interface IssueData {
  title: string
  description: string
  count: number
  change: number
  impact: "high" | "medium" | "low"
  category: string
  subcategory: string
}

interface IssueCardProps extends IssueData {
  index: number
  onClick: () => void
}

function IssueCard({ title, description, count, change, impact, index, onClick }: IssueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-3">
        <h4 className="font-medium text-gray-900 text-sm leading-tight mb-2">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-900">{count.toLocaleString()} calls</span>
            <span
              className={`text-sm font-medium ${change > 0 ? "text-red-600" : change < 0 ? "text-green-600" : "text-gray-600"}`}
            >
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          </div>
          <span
            className={`px-2 py-1 text-xs rounded-md ${
              impact === "high"
                ? "bg-red-100 text-red-800"
                : impact === "medium"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
          </span>
        </div>
      </div>
    </motion.div>
  )
}

interface IssueSectionProps {
  title: string
  totalCount: number
  icon: React.ReactNode
  issues: IssueData[]
  sectionIndex: number
  onIssueClick: (issue: IssueData) => void
}

function IssueSection({ title, totalCount, icon, issues, sectionIndex, onIssueClick }: IssueSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">{totalCount} Total Issues</span>
          <Link href="/insights" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            See All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {issues.map((issue, index) => (
          <IssueCard key={index} {...issue} index={index} onClick={() => onIssueClick(issue)} />
        ))}
      </div>
    </motion.div>
  )
}

export function EmergingIssues() {
  const [selectedIssue, setSelectedIssue] = useState<IssueData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const criticalIssues: IssueData[] = [
    {
      title: "Systemic Operational Inefficiencies",
      description:
        "Packaging and fulfillment errors causing widespread customer dissatisfaction across multiple operational areas.",
      count: 1667,
      change: 23.5,
      impact: "high",
      category: "Operational Inefficiencies",
      subcategory: "Packaging Issues",
    },
    {
      title: "Payment Processing Delays",
      description:
        "Transaction failures and duplicate charges increasing rapidly, affecting customer trust and revenue streams.",
      count: 389,
      change: 45.2,
      impact: "high",
      category: "Payment Processing",
      subcategory: "Transaction Failures",
    },
    {
      title: "Order Fulfillment System Errors",
      description:
        "Inventory discrepancies and system limitations causing order processing failures and delivery delays.",
      count: 234,
      change: 18.7,
      impact: "high",
      category: "System Performance",
      subcategory: "Inventory Management",
    },
    {
      title: "Customer Data Security Issues",
      description:
        "Data handling inconsistencies and security protocol gaps requiring immediate attention and resolution.",
      count: 156,
      change: 32.1,
      impact: "high",
      category: "Security",
      subcategory: "Data Protection",
    },
  ]

  const stableIssues: IssueData[] = [
    {
      title: "Gift Card System Improvements",
      description:
        "Gift card resolution processes showing steady improvement with consistent resolution rates and customer satisfaction.",
      count: 245,
      change: -5.2,
      impact: "low",
      category: "System Performance",
      subcategory: "Gift Card Processing",
    },
    {
      title: "Communication Process Enhancement",
      description:
        "Information delivery systems showing stable performance with minor optimization opportunities identified.",
      count: 154,
      change: -12.1,
      impact: "low",
      category: "Communication Issues",
      subcategory: "Information Delivery",
    },
    {
      title: "Return Policy Standardization",
      description:
        "Return processes now standardized across channels with consistent customer satisfaction levels maintained.",
      count: 132,
      change: -8.5,
      impact: "low",
      category: "Policy Management",
      subcategory: "Return Processing",
    },
    {
      title: "Shipping Notification System",
      description:
        "Automated shipping updates functioning reliably with high customer satisfaction scores and minimal complaints.",
      count: 98,
      change: -15.3,
      impact: "low",
      category: "Communication Issues",
      subcategory: "Notification Systems",
    },
  ]

  const handleIssueClick = (issue: IssueData) => {
    setSelectedIssue(issue)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedIssue(null)
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <p className="text-base text-gray-600">
          <span className="font-bold">Top Picks for you</span> - Personalized insights based on your role and recent
          activity patterns
        </p>
      </div>

      <IssueSection
        title="Critical Issues"
        totalCount={2446}
        icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
        issues={criticalIssues}
        sectionIndex={0}
        onIssueClick={handleIssueClick}
      />

      <IssueSection
        title="Stable Issues"
        totalCount={629}
        icon={<CheckCircle className="w-5 h-5 text-green-600" />}
        issues={stableIssues}
        sectionIndex={1}
        onIssueClick={handleIssueClick}
      />

      <IssueDetailModal isOpen={isModalOpen} onClose={handleCloseModal} issue={selectedIssue} />
    </div>
  )
}
