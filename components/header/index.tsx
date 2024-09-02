import logo from '@/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white w-full">
      <h2 id="header-heading" className="sr-only">
        Header
      </h2>
      <div className="flex justify-between items-center p-2.5">
        <div className="flex justify-center items-center p-2.5">
          <Image className="w-8" src={logo} alt="logo" />
          <h3 className="font-serif text-xl font-semibold">PDF.ai</h3>
        </div>
        <nav className="flex justify-center items-center">
          <Link
            className="flex justify-center items-center p-2.5 font-lg hover:underline"
            href={'https://pdf.ai/pricing'}
            rel="nofollow"
          >
            Pricing
          </Link>
          <Link
            className="flex justify-center items-center p-2.5 font-lg hover:underline"
            href={'https://pdf.ai/chrome-extension'}
            rel="nofollow"
          >
            Chrome extension
          </Link>
          <Link
            className="flex justify-center items-center p-2.5 font-lg hover:underline"
            href={'https://pdf.ai/use-cases'}
            rel="nofollow"
          >
            Use cases
          </Link>
          <Link
            className="flex justify-center items-center p-2.5 font-lg hover:underline"
            href={'https://pdf.ai/auth/sign-in'}
            rel="nofollow"
          >
            Get started →
          </Link>
        </nav>
      </div>
    </header>
  )
}
