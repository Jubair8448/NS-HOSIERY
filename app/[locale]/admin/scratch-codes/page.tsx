/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import Papa from 'papaparse';

import { useRouter } from 'next/navigation'

type ScratchCode = {
  code: string
  isUsed: boolean
  createdAt: string
  usedAt?: string | null
  verificationCount: number // ✅ added
}

export default function ScratchCodeUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [codes, setCodes] = useState<ScratchCode[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return alert('Please select a CSV file.')
    setLoading(true)

    Papa.parse<{ code: string }>(file, {
      header: true,
      complete: async (results: { data: any[] }) => {
        const parsedCodes = results.data
          .map((row) => row.code?.trim())
          .filter(Boolean)

        const res = await fetch('/api/scratch/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codes: parsedCodes }),
        })

        setLoading(false)

        if (res.ok) {
          alert('✅ Scratch codes uploaded successfully!')
          fetchScratchCodes()
          router.refresh()
        } else {
          alert('❌ Upload failed.')
        }
      },
    })
  }

  const fetchScratchCodes = async () => {
    const res = await fetch('/api/scratch/list')
    const data = await res.json()
    setCodes(data)
  }

  const handleDelete = async (code: string) => {
    const confirm = window.confirm(`Delete code "${code}"?`)
    if (!confirm) return

    const res = await fetch(`/api/scratch/delete?code=${code}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      alert('Code deleted')
      fetchScratchCodes()
    } else {
      alert('Failed to delete code')
    }
  }

  const handleDeleteAll = async () => {
    const confirm = window.confirm('⚠️ Are you sure you want to delete ALL scratch codes?')
    if (!confirm) return

    const res = await fetch(`/api/scratch/delete-all`, {
      method: 'DELETE',
    })

    if (res.ok) {
      alert('All codes deleted')
      fetchScratchCodes()
    } else {
      alert('Failed to delete all')
    }
  }

  useEffect(() => {
    fetchScratchCodes()
  }, [])

  const paginatedCodes = codes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(codes.length / itemsPerPage)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10">
      {/* Upload Form */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <label htmlFor="file" className="block mb-2 font-medium">
          Upload CSV File
        </label>
        <input
          id="file"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 block w-full border rounded px-3 py-2"
        />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      {/* Table with Pagination */}
      <div className="overflow-x-auto bg-white p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Uploaded Scratch Codes</h2>

        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Code</th>
              <th className="border px-4 py-2 text-left">Used</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Verify Count</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCodes.map((code, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{code.code}</td>
                <td className="border px-4 py-2">{code.isUsed ? '✅ Yes' : '❌ No'}</td>
                <td className="border px-4 py-2">
                  {code.isUsed && code.usedAt
                    ? new Date(code.usedAt).toLocaleString()
                    : code.createdAt
                    ? new Date(code.createdAt).toLocaleString()
                    : 'Invalid Date'}
                </td>
                <td className="border px-4 py-2">{code.verificationCount || 0}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(code.code)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete All Button */}
        <div className="mt-6">
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑️ Delete All Codes
          </button>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
