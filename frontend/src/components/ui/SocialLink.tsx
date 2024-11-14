import Link from 'next/link'
import React from 'react'

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <Link 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors duration-200 ease-in-out"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {icon}
    </Link>
  )
}

export default SocialLink