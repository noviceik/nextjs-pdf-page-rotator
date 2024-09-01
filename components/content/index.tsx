'use client'

import Upload from '../upload'
import Result from '../result'
import { useState } from 'react'

export default function Conetnt() {
  const [isUploaded, setIsUploaded] = useState<Boolean>(false)
  const [result, setResult] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const onFileUpload = (fileUrl: string, fileName: string) => {
    setIsUploaded(true)
    setResult(fileUrl)
    setFileName(fileName)
  }

  const removeUpload = () => {
    setIsUploaded(false)
    setResult(null)
    setFileName(null)
  }

  return (
    <main className="bg-[#f7f5ee] w-full py-20">
      <div className="bg-[#f7f5ee] text-black">
        <div className="container mx-auto py-20 space-y-5">
          <div className="flex flex-col text-center !mb-10 space-y-5">
            <h1 className="text-5xl font-serif">Rotate PDF Pages</h1>
            <p className="mt-2 text-gray-600 max-w-lg mx-auto">
              Simply click on a page to rotate it. You can then download your
              modified PDF.
            </p>
          </div>
          {!isUploaded ? (
            <Upload onFileUpload={onFileUpload} />
          ) : (
            <Result
              fileName={fileName}
              fileUrl={result}
              removePDF={removeUpload}
            />
          )}
          <div className="flex flex-wrap justify-center"></div>
        </div>
      </div>
    </main>
  )
}
