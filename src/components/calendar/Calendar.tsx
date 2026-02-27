import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { useEvents } from '../../hooks/useEvents'
import type { CalendarEvent } from '../../hooks/useEvents'
import { format, parseISO, isWithinInterval, isSameDay } from 'date-fns'
import { MapPin, Clock, Calendar as CalendarIcon, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import calendarBg from '../../assets/images/calendar/calendar-bg.png'

// Import base CSS then override with custom styles
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const { loading, getEventsByDate } = useEvents()

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value)
      const dayEvents = getEventsByDate(value)
      if (dayEvents.length > 0) {
        setSelectedEvent(dayEvents[0])
      } else {
        setSelectedEvent(null)
      }
    }
  }

  // Custom tile content to show event indicators for both single and multi-day events
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = getEventsByDate(date)
      if (dayEvents.length > 0) {
        return (
          <div className="flex justify-center gap-1 mt-1">
            {dayEvents.map((event, index) => {
              // Parse dates properly to avoid timezone issues
              const eventStartDate = parseISO(event.date)
              const eventEndDate = event.endDate ? parseISO(event.endDate) : null
              
              // Check if it's a multi-day event
              const isMultiDayEvent = eventEndDate !== null
              
              // Check if current date is within the range (inclusive)
              const isInRange = isMultiDayEvent && 
                isWithinInterval(date, { start: eventStartDate, end: eventEndDate })
              
              return (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    isMultiDayEvent ? 'bg-red-400' : 'bg-red-600'
                  } shadow-lg shadow-red-600/50`}
                  title={`${event.title}${isMultiDayEvent ? ' (Multi-day event)' : ''}`}
                />
              )
            })}
          </div>
        )
      }
    }
    return null
  }

  if (loading) {
    return (
      <section id="events" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={calendarBg} alt="Calendar background" className="w-full h-full object-cover" />
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
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={calendarBg}
          alt="Thrill Calendar background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with blur */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">PLAN YOUR ADVENTURE</span>
          <h2 className="heading-secondary text-white mt-2 mb-4">
            Thrill <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Calendar</span>
          </h2>
          <p className="text-lg text-gray-300">
            Check out our upcoming rides and adventures. Click on a date to see event details and join the thrill.
          </p>
        </div>

        {/* Calendar and Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calendar Card */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <CalendarIcon className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold text-white">Select Date</h3>
            </div>
            
            {/* Custom styled calendar */}
            <style>{`
              .react-calendar {
                background: transparent !important;
                border: none !important;
                font-family: inherit !important;
                width: 100% !important;
              }
              .react-calendar__navigation {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
              }
              .react-calendar__navigation button {
                color: white !important;
                background: rgba(255,255,255,0.1) !important;
                border-radius: 0.5rem !important;
                padding: 0.5rem 1rem !important;
                font-weight: 500 !important;
                transition: all 0.3s ease;
              }
              .react-calendar__navigation button:hover {
                background: rgba(220, 38, 38, 0.3) !important;
              }
              .react-calendar__navigation button:disabled {
                opacity: 0.3 !important;
              }
              .react-calendar__month-view__weekdays {
                color: #9ca3af !important;
                font-weight: 500 !important;
                font-size: 0.875rem !important;
                text-transform: uppercase !important;
                margin-bottom: 0.5rem;
              }
              .react-calendar__month-view__weekdays__weekday {
                padding: 0.5rem !important;
              }
              .react-calendar__month-view__weekdays abbr {
                text-decoration: none !important;
                cursor: default !important;
              }
              .react-calendar__tile {
                background: transparent !important;
                color: white !important;
                padding: 0.75rem 0.5rem !important;
                border-radius: 0.5rem !important;
                font-weight: 400 !important;
                transition: all 0.2s ease;
                position: relative;
              }
              .react-calendar__tile:hover {
                background: rgba(220, 38, 38, 0.2) !important;
              }
              .react-calendar__tile--active {
                background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
                font-weight: 600 !important;
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3) !important;
              }
              .react-calendar__tile--active:hover {
                background: linear-gradient(135deg, #b91c1c, #991b1b) !important;
              }
              .react-calendar__tile--now {
                background: rgba(255,255,255,0.1) !important;
                border: 1px solid rgba(220, 38, 38, 0.5) !important;
              }
              .react-calendar__tile--now:hover {
                background: rgba(220, 38, 38, 0.2) !important;
              }
              .react-calendar__month-view__days__day--weekend {
                color: rgba(255,255,255,0.8) !important;
              }
              .react-calendar__month-view__days__day--neighboringMonth {
                color: rgba(255,255,255,0.3) !important;
              }
              .react-calendar__tile:disabled {
                opacity: 0.2 !important;
                cursor: not-allowed !important;
              }
            `}</style>
            
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              prevLabel={<ChevronLeft size={18} />}
              nextLabel={<ChevronRight size={18} />}
              prev2Label={null}
              next2Label={null}
            />
          </div>

          {/* Event Details Card */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300">
            {selectedEvent ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/30">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                    <p className="text-sm text-gray-400">
                      {selectedEvent.featured ? 'Featured Event' : 'Upcoming Ride'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Date Range - Fixed to show correct range */}
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

                  {/* Rules - Optional */}
                  {selectedEvent.rules && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Rules & Requirements</p>
                      <p className="text-gray-400 text-sm bg-white/5 p-3 rounded-lg">
                        {selectedEvent.rules}
                      </p>
                    </div>
                  )}

                  {/* Know More Link */}
                  <div className="pt-4">
                    <a
                      href={selectedEvent.knowMoreLink}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 group shadow-lg shadow-red-600/30"
                    >
                      Know More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-300 text-lg mb-2 font-semibold">No Events Scheduled</p>
                <p className="text-sm text-gray-500">Select another date to view upcoming adventures.</p>
              </div>
            )}
          </div>
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
    </section>
  )
}

export default CalendarComponent