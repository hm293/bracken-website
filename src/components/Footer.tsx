import Image from 'next/image'

interface FooterProps {
  footerText: string
}

export function Footer({ footerText }: FooterProps) {
  return (
    <footer className="bg-deep-earth py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <Image
          src="/brand_assets/cropped/white logo with sun.svg"
          alt=""
          width={64}
          height={64}
          className="h-16 mx-auto mb-5 opacity-40"
          aria-hidden="true"
        />
        <p className="font-sans text-xs text-stone/50 tracking-wider">{footerText}</p>
      </div>
    </footer>
  )
}
