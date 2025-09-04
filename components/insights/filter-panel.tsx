"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface FilterPanelProps {
  onFiltersChange?: (filters: any) => void
}

export function FilterPanel({ onFiltersChange }: FilterPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [sortBy, setSortBy] = useState("category")

  const categories = [
    "Operational Inefficiencies",
    "Customer Experience",
    "Payment Processing",
    "Account Management",
    "System Performance",
    "Communication Issues",
  ]

  const subcategories = {
    "Operational Inefficiencies": ["Packaging Issues", "Fulfillment Errors", "Inventory Management"],
    "Customer Experience": ["Support Quality", "Response Time", "Resolution Rate"],
    "Payment Processing": ["Transaction Failures", "Billing Issues", "Refund Processing"],
    "Account Management": ["Login Issues", "Profile Updates", "Security"],
    "System Performance": ["App Performance", "Website Issues", "API Errors"],
    "Communication Issues": ["Notification Delays", "Information Accuracy", "Channel Consistency"],
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setSelectedSubcategory("")
    setSortBy("category")
    onFiltersChange?.({
      search: "",
      category: "",
      subcategory: "",
      sort: "category",
    })
  }

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = {
      search: searchTerm,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      sort: sortBy,
      [type]: value,
    }

    if (type === "category") {
      setSelectedCategory(value)
      setSelectedSubcategory("") // Reset subcategory when category changes
      newFilters.subcategory = ""
    } else if (type === "subcategory") {
      setSelectedSubcategory(value)
    } else if (type === "search") {
      setSearchTerm(value)
    } else if (type === "sort") {
      setSortBy(value)
    }

    onFiltersChange?.(newFilters)
  }

  return (
    <div className="w-80 bg-white border-r p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={handleClearFilters} className="text-sm text-blue-600 hover:text-blue-800">
          Clear Filters
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for keywords"
            value={searchTerm}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => handleFilterChange("search", "")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
        <select
          value={selectedSubcategory}
          onChange={(e) => handleFilterChange("subcategory", e.target.value)}
          disabled={!selectedCategory}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Select a subcategory</option>
          {selectedCategory &&
            subcategories[selectedCategory as keyof typeof subcategories]?.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort</label>
        <select
          value={sortBy}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="category">Category</option>
          <option value="impact">Impact Level</option>
          <option value="frequency">Frequency</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>
    </div>
  )
}
