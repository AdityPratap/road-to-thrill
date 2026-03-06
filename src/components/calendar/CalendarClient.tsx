import React, { useState, useRef, useEffect } from 'react'
import { useEvents } from '../../hooks/useEvents'
import type { CalendarEvent } from '../../hooks/useEvents'
import { format, parseISO } from 'date-fns'
import { MapPin, Clock, Calendar as CalendarIcon, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

// Import PNG background image
import calendarBg from '../../assets/images/calendar/calendar-bg.png'

// Import event images
import ride1Img from '../../assets/images/events/republicride.jpeg'
import ride2Img from '../../assets/images/events/independenceride.jpeg'
import ride3Img from '../../assets/images/events/Santaride.jpeg'
// Import more as needed

// Import Swiper core and components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Create a mapping of event titles to images
const eventImageMap: Record<string, string> = {
  'Republic Day Ride': ride1Img,
  'Independance Day Ride': ride2Img,
  'Santa Ride': ride3Img,
  // Add more mappings as you add events
}

const CalendarClient: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)
  
  const { events, loading } = useEvents()

  // Handle Know More click
  const handleKnowMore = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowDetails(true)
    
    // Stop autoplay when details are shown
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop()
    }
  }

  // Handle close details
  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedEvent(null)
    
    // Resume autoplay when details are closed
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start()
    }
  }

  // Handle slide change - update selected event to match current slide
  const handleSlideChange = (swiper: SwiperType) => {
    const currentEvent = events[swiper.realIndex]
    
    // Only update if we're not in details mode, or if we are, keep the selected event
    if (!showDetails) {
      setSelectedEvent(currentEvent)
    }
  }

  // Handle manual navigation when details are open
  const handleManualNavigation = (direction: 'prev' | 'next') => {
    if (!swiperRef.current) return
    
    if (direction === 'prev') {
      swiperRef.current.slidePrev()
    } else {
      swiperRef.current.slideNext()
    }
    
    // Update selected event to match the new slide
    setTimeout(() => {
      if (swiperRef.current) {
        const currentEvent = events[swiperRef.current.realIndex]
        setSelectedEvent(currentEvent)
      }
    }, 50)
  }

  // Get image for event
  const getEventImage = (event: CalendarEvent) => {
    // Try to get from map first
    if (eventImageMap[event.title]) {
      return eventImageMap[event.title]
    }
    // Fallback to placeholder
    return `https://via.placeholder.com/600x400/1a1a1a/DC2626?text=${encodeURIComponent(event.title)}`
  }

  if (loading) {
    return (
      <section id="events" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={calendarBg} 
            alt="Calendar background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 container-custom">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent" />
            <p className="mt-4 text-gray-300">Loading events...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background PNG Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={calendarBg}
          alt="Thrill Calendar background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with blur for better readability */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">FEATURED RIDES</span>
          <h2 className="heading-secondary text-white mt-2 mb-4">
            Thrill <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Calendar</span>
          </h2>
          <p className="text-lg text-gray-300">
            Discover our upcoming adventures. Click on any event to see full details.
          </p>
        </div>

        {/* Main Grid - Dynamic layout based on showDetails */}
        <div className={`grid transition-all duration-500 ease-in-out ${
          showDetails ? 'grid-cols-1 lg:grid-cols-2 gap-8' : 'grid-cols-1 justify-items-center'
        }`}>
          {/* Left Side - Card Carousel */}
          <div className={`w-full transition-all duration-500 ease-in-out ${
            showDetails ? 'lg:max-w-full' : 'lg:max-w-2xl mx-auto'
          }`}>
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {showDetails ? 'Browse Events' : 'Featured Events'}
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleManualNavigation('prev')}
                    className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => handleManualNavigation('next')}
                    className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Swiper Carousel - Single Card */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => {
                  setSelectedEvent(events[swiper.realIndex])
                }}
                className="event-carousel pb-10"
              >
                {events.map((event) => (
                  <SwiperSlide key={event.id}>
                    <div className="group">
                      {/* Event Card with Image */}
                      <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                          <img 
                            src={getEventImage(event)}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.onerror = null
                              target.src = `https://via.placeholder.com/600x400/1a1a1a/DC2626?text=${encodeURIComponent(event.title)}`
                            }}
                          />
                        </div>
                        
                        {/* Event Date Badge */}
                        <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                          {format(parseISO(event.date), 'MMM d')}
                          {event.endDate && (
                            <> - {format(parseISO(event.endDate), 'MMM d')}</>
                          )}
                        </div>

                        {/* Event Title Overlay */}
                        <h3 className="absolute bottom-4 left-4 right-4 z-20 text-2xl font-bold text-white">
                          {event.title}
                        </h3>
                      </div>

                      {/* Card Footer with Location and Know More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} className="text-red-500" />
                          <span className="text-sm truncate">{event.location.split(',')[0]}</span>
                        </div>
                        <button
                          onClick={() => handleKnowMore(event)}
                          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 group/btn"
                        >
                          Know More
                          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Side - Event Details Panel */}
          {showDetails && selectedEvent && (
            <div className="w-full animate-slide-in">
              <div className="bg-black/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 shadow-2xl relative">
                <button
                  onClick={handleCloseDetails}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all z-10"
                >
                  <X size={16} />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/30 overflow-hidden">
                      <img 
                        src={getEventImage(selectedEvent)}
                        alt={selectedEvent.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.src = `https://via.placeholder.com/100/1a1a1a/DC2626?text=${encodeURIComponent(selectedEvent.title.charAt(0))}`
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                      <p className="text-sm text-gray-400">
                        {selectedEvent.featured ? '⭐ Featured Event' : '🏍️ Upcoming Ride'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Date Range */}
                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                        <p className="text-white font-semibold">
                          {format(parseISO(selectedEvent.date), 'MMMM d, yyyy')}
                          {selectedEvent.endDate && (
                            <>
                              {' '} - {' '}
                              {format(parseISO(selectedEvent.endDate), 'MMMM d, yyyy')}
                              <span className="ml-2 text-xs text-red-400 bg-red-600/20 px-2 py-0.5 rounded-full">
                                Multi-day
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                      <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                        <p className="text-white font-semibold">{selectedEvent.location}</p>
                      </div>
                    </div>
                    
                    {/* Time */}
                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                      <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Timings</p>
                        <p className="text-white font-semibold">{selectedEvent.time}</p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="pt-2">
                      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Description</p>
                      <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-lg">
                        {selectedEvent.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Highlights</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedEvent.highlights.map((highlight, index) => (
                            <span 
                              key={index} 
                              className="bg-gradient-to-r from-red-600/20 to-red-800/20 text-red-400 text-sm px-3 py-1.5 rounded-full border border-red-600/30 font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rules */}
                    {selectedEvent.rules && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Rules & Requirements</p>
                        <p className="text-gray-400 text-sm bg-white/5 p-3 rounded-lg">
                          {selectedEvent.rules}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <a
            href="#join"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 group"
          >
            Join an Adventure
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        .event-carousel {
          padding: 0 0 30px 0 !important;
        }
        .event-carousel .swiper-pagination {
          bottom: 0 !important;
        }
        .event-carousel .swiper-pagination-bullet {
          background: rgba(255,255,255,0.3);
          opacity: 1;
        }
        .event-carousel .swiper-pagination-bullet-active {
          background: #DC2626;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}

export default CalendarClient