"use client"

import { useEffect } from "react"
import { toast } from "react-hot-toast"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    toast.error(error.message || "An unexpected error occurred.")
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-6">{error.message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
