import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/icons/logo.svg'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'EXPERIENCES', href: '#experiences' }
  ]

  const bottomNavItems = [
    { name: 'CALENDAR', href: '#events' }, // Fixed: Changed from #calendar to #events
    { name: 'WHY JOIN', href: '#why-join' },
    { name: 'JOIN NOW', href: '#join' },
    { name: 'CONTACT', href: '#contact' }
  ]

  const handleStartNow = () => {
    window.location.href = '#join'
    setIsMenuOpen(false)
  }

  const handleLearnMore = () => {
    window.location.href = '#why-join'
  }

  return (
    <>
      {/* Glassomorphic Navbar - Greyish Translucent */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/40 backdrop-blur-md border-b border-white/10' 
          : 'bg-gray-900/30 backdrop-blur-sm border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Left: Logo and tagline */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="/" className="flex items-center">
                <img src={logo} alt="RoadThrill" className="h-6 sm:h-7 w-auto" />
              </a>
              <div className="hidden md:block text-[6px] sm:text-[7px] tracking-[0.3em] text-gray-300/80 uppercase whitespace-nowrap">
                MEET • TRAVEL • DISCOVER
              </div>
            </div>

            {/* Center: Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-gray-200/90 hover:text-white text-[10px] lg:text-[11px] uppercase tracking-wide font-medium transition-colors relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right: CTA Button and Menu */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleStartNow}
                className="hidden md:block px-2.5 sm:px-3 py-1 border border-red-600/90 rounded-full text-gray-100 text-[10px] lg:text-[11px] uppercase tracking-wide font-medium hover:bg-red-600 hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                START NOW
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200/90 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Matching greyish tone */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/90 backdrop-blur-lg border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
              <div className="flex flex-col space-y-2">
                {[...navItems, ...bottomNavItems].map((item) => (
                  <a 
                    key={item.name}
                    href={item.href}
                    className="text-gray-200/90 hover:text-white text-sm uppercase tracking-wide py-1.5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <button 
                  onClick={handleStartNow}
                  className="w-full mt-1 px-3 py-1.5 border border-red-600/90 rounded-full text-gray-100 text-xs uppercase tracking-wide font-medium hover:bg-red-600 hover:text-white transition-all"
                >
                  START NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Strip - Matching greyish tone */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/40 backdrop-blur-sm border-t border-white/10 py-1.5 sm:py-2 hidden md:block z-50">
        <div className="flex justify-center items-center gap-4 sm:gap-6 max-w-7xl mx-auto">
          {bottomNavItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-gray-300/80 hover:text-red-600 text-[8px] sm:text-[9px] uppercase tracking-widest transition-colors whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default Header