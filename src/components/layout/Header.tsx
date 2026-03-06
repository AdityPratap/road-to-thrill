import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/icons/Logo.png'
import StartNowModal from '../StartNowModal'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    { name: 'CALENDAR', href: '#events' },
    { name: 'JOIN NOW', href: '#join' },
    { name: 'CONTACT', href: '#contact' }
  ]

  const handleStartNow = () => {
    setIsModalOpen(true)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Top Navbar - Matching bottom navbar size */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/40 backdrop-blur-md border-b border-white/10' 
          : 'bg-gray-900/30 backdrop-blur-sm border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 lg:h-16"> {/* Reduced from h-16 lg:h-20 to h-14 lg:h-16 */}
            {/* Left: Logo and tagline */}
            <div className="flex items-center gap-3 lg:gap-4">
              <a href="/" className="flex items-center">
                <img src={logo} alt="RoadThrill" className="h-7 lg:h-10 w-auto" /> {/* Reduced from h-8 lg:h-10 to h-7 lg:h-8 */}
              </a>
              <div className="hidden md:block text-[7px] lg:text-[8px] tracking-[0.3em] text-gray-300/80 uppercase whitespace-nowrap font-medium">
                MEET • TRAVEL • DISCOVER
              </div>
            </div>

            {/* Center: Navigation */}
            <div className="hidden md:flex items-center gap-5 lg:gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-gray-200/90 hover:text-white text-xs lg:text-sm uppercase tracking-wide font-medium transition-colors relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right: CTA Button and Menu */}
            <div className="flex items-center gap-2 lg:gap-3">
              <button 
                onClick={handleStartNow}
                className="hidden md:block px-3 lg:px-4 py-1.5 lg:py-2 border border-red-600/90 rounded-full text-gray-100 text-xs lg:text-sm uppercase tracking-wide font-medium hover:bg-red-600 hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                START NOW
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200/90 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X size={20} className="lg:w-5 lg:h-5" /> : <Menu size={20} className="lg:w-5 lg:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/90 backdrop-blur-lg border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-3">
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
                  className="w-full mt-1 px-3 py-2 border border-red-600/90 rounded-full text-gray-100 text-xs uppercase tracking-wide font-medium hover:bg-red-600 hover:text-white transition-all"
                >
                  START NOW
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Strip - Keep as is */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/40 backdrop-blur-sm border-t border-white/10 py-2 lg:py-2.5 hidden md:block z-50">
        <div className="flex justify-center items-center gap-5 lg:gap-6 max-w-7xl mx-auto">
          {bottomNavItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-gray-300/80 hover:text-red-600 text-[10px] lg:text-xs uppercase tracking-widest transition-colors whitespace-nowrap font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      <StartNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Header