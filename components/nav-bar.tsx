"use client"

import Link from "next/link"

export function NavBar() {
  return (
    <div className="w-full bg-white border-b">
      <div className="container mx-auto">
        <div className="flex items-center h-14">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100">
              Dashboard
            </Link>
            <Link href="/insights" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100">
              Detailed Insights
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100">
              JumpCloud
            </Link>
            <Link href="#" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100">
              Sidd Studio
            </Link>
            <Link href="#" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100">
              Jira
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
