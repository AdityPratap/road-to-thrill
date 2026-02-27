import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Route, Camera } from 'lucide-react'
import experiencesData from '../../data/experiences.json'
import experiencesBg from '../../assets/images/calendar/calendar-bg.png'

interface Experience {
  id: number
  title: string
  location: string
  date: string
  image: string
  thumbnail: string
  description: string
  riders: number
  miles: number
}

const Experiences: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const experiences: Experience[] = experiencesData.experiences

  // Continuous autoplay - always running
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length)
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(timer)
  }, [experiences.length])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = experiences.length - 1
      if (nextIndex >= experiences.length) nextIndex = 0
      return nextIndex
    })
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Get visible cards for desktop grid view
  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % experiences.length
      cards.push(experiences[index])
    }
    return cards
  }

  return (
    <section id="experiences" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={experiencesBg}
          alt="Experiences background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with blur */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">PAST ADVENTURES</span>
          <h2 className="heading-secondary text-white mt-2 mb-4">
            Thrill <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Memories</span>
          </h2>
          <p className="text-lg text-gray-300">
            Relive the unforgettable moments from our previous rides. Each adventure tells a story of friendship, 
            adrenaline, and the open road.
          </p>
        </div>

        {/* Mobile Carousel (1 card) */}
        <div className="block lg:hidden">
          <div className="relative h-[500px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute w-full"
              >
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-700" />
                    </div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-red-600/30">
                      {experiences[currentIndex].date}
                    </div>

                    {/* Title Overlay */}
                    <h3 className="absolute bottom-4 left-4 right-4 z-20 text-xl font-bold text-white">
                      {experiences[currentIndex].title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-400 text-sm mb-4">
                      {experiences[currentIndex].description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-red-500 flex-shrink-0" />
                        <span className="text-gray-300 truncate">{experiences[currentIndex].location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-red-500 flex-shrink-0" />
                        <span className="text-gray-300">{experiences[currentIndex].date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={14} className="text-red-500 flex-shrink-0" />
                        <span className="text-gray-300">{experiences[currentIndex].riders} riders</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Route size={14} className="text-red-500 flex-shrink-0" />
                        <span className="text-gray-300">{experiences[currentIndex].miles} miles</span>
                      </div>
                    </div>

                    {/* View Gallery Button */}
                    <button className="w-full bg-transparent border border-red-600/50 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-300 group/btn">
                      <span className="flex items-center justify-center gap-2">
                        View Gallery
                        <Camera size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Buttons */}
            <button 
              onClick={() => paginate(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-2 text-white hover:bg-red-600 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={() => paginate(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-2 text-white hover:bg-red-600 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Grid View (3 cards) */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {getVisibleCards().map((experience, idx) => (
              <div 
                key={idx}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-xl hover:shadow-red-600/10 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-700" />
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-red-600/30">
                    {experience.date}
                  </div>

                  {/* Title Overlay */}
                  <h3 className="absolute bottom-4 left-4 right-4 z-20 text-xl font-bold text-white">
                    {experience.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {experience.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-red-500 flex-shrink-0" />
                      <span className="text-gray-300 truncate">{experience.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-red-500 flex-shrink-0" />
                      <span className="text-gray-300">{experience.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={14} className="text-red-500 flex-shrink-0" />
                      <span className="text-gray-300">{experience.riders} riders</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Route size={14} className="text-red-500 flex-shrink-0" />
                      <span className="text-gray-300">{experience.miles} miles</span>
                    </div>
                  </div>

                  {/* View Gallery Button */}
                  <button className="w-full bg-transparent border border-red-600/50 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-300 group/btn">
                    <span className="flex items-center justify-center gap-2">
                      View Gallery
                      <Camera size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={() => paginate(-1)}
              className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-3 text-white hover:bg-red-600 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Desktop Indicators */}
            <div className="flex gap-2 mx-4">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex 
                      ? 'w-8 h-2 bg-red-600 shadow-lg shadow-red-600/50' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={() => paginate(1)}
              className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-3 text-white hover:bg-red-600 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center gap-2 mt-6 lg:hidden">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-red-600 shadow-lg shadow-red-600/50' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6 text-lg">
            Want to be part of our next adventure? Join us for upcoming rides!
          </p>
          <a 
            href="#join" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/30 group"
          >
            Join the Community
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Experiences