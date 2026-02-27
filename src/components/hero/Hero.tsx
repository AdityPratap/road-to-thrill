import React, { useState, useEffect } from 'react'
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

// Import your 3 background images
import meetBg from '../../assets/images/hero/meet.jpg'
import travelBg from '../../assets/images/hero/travel.jpg'
import discoverBg from '../../assets/images/hero/discover.jpg'

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    { word: 'MEET', bg: meetBg },
    { word: 'TRAVEL', bg: travelBg },
    { word: 'DISCOVER', bg: discoverBg }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Calculate transform value based on slide index
  const getTransformValue = () => {
    return `translateY(-${currentSlide * 33.333}%)`
  }

  const handleStartNow = () => {
    window.location.href = '#join'
  }

  const handleLearnMore = () => {
    window.location.href = '#why-join'
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Images Carousel */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.bg}
            alt={`${slide.word} background`} 
            className="w-full h-full object-cover"
          />
          {/* Left to right gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative h-full flex items-center pt-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Main Title with Carousel - Using percentage-based heights */}
          <div className="mb-4 sm:mb-6">
            <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 overflow-hidden">
              <div 
                className="absolute w-full transition-transform duration-700 ease-in-out"
                style={{ transform: getTransformValue() }}
              >
                {slides.map((slide, index) => (
                  <div 
                    key={index} 
                    className="h-16 sm:h-20 md:h-24 lg:h-28 flex items-center"
                  >
                    <h1 
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-wider leading-none"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {slide.word}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subtext - Fixed with responsive spacing */}
          <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm md:text-base text-gray-300 tracking-widest">A PLACE TO MEET</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 tracking-widest">A REASON TO TRAVEL</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 tracking-widest">A JOURNEY TO DISCOVER</p>
          </div>

          {/* CTA Buttons - Fixed with responsive sizing */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
            <button 
              onClick={handleStartNow}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-red-600 text-white uppercase font-bold text-xs sm:text-sm tracking-wide hover:bg-red-700 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              START NOW
            </button>
            <button 
              onClick={handleLearnMore}
              className="px-4 sm:px-5 py-2 sm:py-2.5 border border-white text-white uppercase font-bold text-xs sm:text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              LEARN MORE
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 sm:gap-5">
            {[
              { Icon: Instagram, href: '#' },
              { Icon: Twitter, href: '#' },
              { Icon: Facebook, href: '#' },
              { Icon: Youtube, href: '#' }
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-red-600 hover:text-red-500 transition-all hover:scale-110"
              >
                <Icon size={20} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all ${
              index === currentSlide 
                ? 'w-4 sm:w-5 h-1.5 bg-red-600' 
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero