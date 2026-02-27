import { useState, useEffect } from 'react'
import { parseISO, isSameDay, isWithinInterval } from 'date-fns'
import eventsData from '../data/events.json'

// Define the type for the imported JSON structure
interface EventsData {
  events: CalendarEvent[]
}

export interface CalendarEvent {
  id: number
  title: string
  date: string
  endDate?: string
  location: string
  time: string
  description: string
  knowMoreLink: string
  rules?: string
  highlights: string[]
  image?: string
  status?: 'upcoming' | 'past' | 'cancelled'
  featured?: boolean
}

export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API fetch with loading state
    const fetchEvents = () => {
      try {
        setLoading(true)
        // Type assertion to let TypeScript know the shape of the data
        const data = eventsData as EventsData
        
        // Sort events by date (oldest to newest)
        const sortedEvents = [...data.events].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        setEvents(sortedEvents)
        setError(null)
      } catch (err) {
        setError('Failed to load events')
        console.error('Error loading events:', err)
      } finally {
        setLoading(false)
      }
    }

    // Simulate network delay
    setTimeout(fetchEvents, 500)
  }, [])

  // Get events for a specific date (handles both single and multi-day events)
  const getEventsByDate = (date: Date) => {
    // Create a new date without time component for accurate comparison
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    
    return events.filter(event => {
      // Parse event dates and remove time component
      const eventStartDate = parseISO(event.date)
      eventStartDate.setHours(0, 0, 0, 0)
      
      // Single day event
      if (!event.endDate) {
        return isSameDay(eventStartDate, compareDate)
      }
      
      // Multi-day event
      const eventEndDate = parseISO(event.endDate)
      eventEndDate.setHours(0, 0, 0, 0)
      
      // Check if compareDate is within the range (inclusive of both start and end dates)
      return isWithinInterval(compareDate, {
        start: eventStartDate,
        end: eventEndDate
      })
    })
  }

  // Get all upcoming events (today and future)
  const getUpcomingEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return events.filter(event => {
      const eventDate = parseISO(event.date)
      eventDate.setHours(0, 0, 0, 0)
      
      // If event has end date, check if end date is today or future
      if (event.endDate) {
        const eventEndDate = parseISO(event.endDate)
        eventEndDate.setHours(0, 0, 0, 0)
        return eventEndDate >= today && event.status !== 'past'
      }
      
      // Single day event
      return eventDate >= today && event.status !== 'past'
    })
  }

  // Get all past events
  const getPastEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return events.filter(event => {
      const eventDate = parseISO(event.date)
      eventDate.setHours(0, 0, 0, 0)
      
      // If event has end date, check if end date is before today
      if (event.endDate) {
        const eventEndDate = parseISO(event.endDate)
        eventEndDate.setHours(0, 0, 0, 0)
        return eventEndDate < today || event.status === 'past'
      }
      
      // Single day event
      return eventDate < today || event.status === 'past'
    })
  }

  // Get featured events
  const getFeaturedEvents = () => {
    return events.filter(event => event.featured)
  }

  // Get event by ID
  const getEventById = (id: number) => {
    return events.find(event => event.id === id)
  }

  // Get events for a specific month
  const getEventsByMonth = (year: number, month: number) => {
    return events.filter(event => {
      const eventDate = parseISO(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month
    })
  }

  // Check if a date has any events
  const hasEventsOnDate = (date: Date) => {
    return getEventsByDate(date).length > 0
  }

  // Get all unique event locations
  const getEventLocations = () => {
    const locations = events.map(event => event.location)
    return [...new Set(locations)]
  }

  return { 
    events, 
    loading, 
    error,
    getEventsByDate,
    getUpcomingEvents,
    getPastEvents,
    getFeaturedEvents,
    getEventById,
    getEventsByMonth,
    hasEventsOnDate,
    getEventLocations
  }
}