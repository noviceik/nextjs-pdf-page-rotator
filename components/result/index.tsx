'use client'
import './index.css'
import React, { useState, useEffect } from 'react'
import { Document, Page, useDocumentContext, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

type OperateProps = {
  scale: number
  setScale: React.Dispatch<React.SetStateAction<number>>
  pages: number[]
  setPages: React.Dispatch<React.SetStateAction<number[]>>
  removePDF: () => void
}

const Operate: React.FC<OperateProps> = (props) => {
  const { scale, setScale, pages, setPages, removePDF } = props

  const rotateAll = () => {
    const newPages = pages.map((page) => (page += 90))
    setPages(newPages)
  }

  return (
    <div className="flex justify-center items-center space-x-3 selecto-ignore mt-5">
      <button className="sc-7ff41d46-0 aEnZv !w-auto" onClick={rotateAll}>
        Rotate all
      </button>
      <button
        className="sc-7ff41d46-0 aEnZv !w-auto !bg-gray-800"
        aria-label="Remove this PDF and select a new one"
        data-microtip-position="top"
        role="tooltip"
        onClick={() => {
          setScale(0.6)
          setPages([])
          removePDF()
        }}
      >
        Remove PDF
      </button>
      <button
        className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white"
        aria-label="Zoom in"
        data-microtip-position="top"
        role="tooltip"
        disabled={scale >= 1}
        onClick={() => setScale(scale + 0.1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
          ></path>
        </svg>
      </button>
      <button
        className="bg-[#ff612f] shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 !bg-white"
        aria-label="Zoom out"
        data-microtip-position="top"
        role="tooltip"
        disabled={scale <= 0.5}
        onClick={() => setScale(scale - 0.1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
          ></path>
        </svg>
      </button>
    </div>
  )
}

interface Page {
  rotate: number
}

type ExhibitionProps = {
  fileUrl: string | null
  fileName: string | null
  scale: number
  pages: number[]
  setPages: React.Dispatch<React.SetStateAction<number[]>>
}
const Exhibition: React.FC<ExhibitionProps> = (props) => {
  const { fileUrl, fileName, scale, pages, setPages } = props
  const baseWidth = 428
  const baseHeight = 605
  const [width, setWidth] = useState<number>(baseWidth * scale)
  const [height, setHeight] = useState<number>(baseHeight * scale)

  const downloadPDF = () => {
    console.log()

    const link: any = document.createElement('a')
    link.setAttribute('download', fileName)
    link.href = fileUrl
    link.click()
  }

  const onDocumentLoadSuccess = (res: any) => {
    setPages(new Array(res.numPages).fill(0))
  }

  const rotateItem = (index: number) => {
    let item = pages[index]
    item += 90
    const newPages = [...pages]
    newPages[index] = item
    setPages(newPages)
  }

  useEffect(() => {
    setWidth(baseWidth * scale)
    setHeight(baseHeight * scale)
  }, [scale])

  return (
    <>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error} //加载失败时调用
        renderMode="canvas"
      >
        <div className="flex flex-wrap justify-center mt-5">
          {pages.map((item, index) => {
            return (
              <div className="m-3" key={index}>
                <div
                  className="relative cursor-pointer pdf-page"
                  data-page-num="0"
                >
                  <div
                    className="absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white"
                    onClick={() => {
                      rotateItem(index)
                    }}
                  >
                    <svg
                      className="w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"></path>
                    </svg>
                  </div>
                  <div className="overflow-hidden transition-transform">
                    <div className="relative h-full w-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50">
                      <div
                        className="pointer-events-none shrink overflow-hidden"
                        // style={{ width: width + 'px', height: height + 'px' }}
                      >
                        <Page
                          pageNumber={index + 1}
                          scale={scale}
                          rotate={item}
                          width={width}
                          height={height}
                        />
                      </div>
                      <div className="w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Document>
      <div className="flex flex-col justify-center items-center space-y-3 selecto-ignore mt-5">
        <button
          className="sc-7ff41d46-0 aEnZv !w-auto shadow"
          aria-label="Split and download PDF"
          data-microtip-position="top"
          role="tooltip"
          onClick={downloadPDF}
        >
          Download
        </button>
      </div>
    </>
  )
}

type ResultProps = {
  fileUrl: string | null
  fileName: string | null
  removePDF: () => void
}

export default function Result(props: ResultProps) {
  const { removePDF } = props
  const [scale, setScale] = useState<number>(0.6)
  const [pages, setPages] = useState<number[]>([])

  return (
    <div>
      <Operate
        scale={scale}
        setScale={setScale}
        pages={pages}
        setPages={setPages}
        removePDF={removePDF}
      />
      <Exhibition {...props} scale={scale} pages={pages} setPages={setPages} />
    </div>
  )
}
