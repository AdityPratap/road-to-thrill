import React from 'react'
import { MapPin, Award, Shield, Users, Star, Linkedin, Instagram } from 'lucide-react'

import lohith from '../../assets/images/team/Lohith.jpg'
import abhishekImg from '../../assets/images/team/Abhishek.jpg'
import rider from '../../assets/images/team/rider.jpeg'
import arpan from '../../assets/images/team/arpan.jpg'
import kamal from '../../assets/images/team/kamal.jpg'
import Prateek from '../../assets/images/team/Prateek.jpg'
import Praveen from '../../assets/images/team/Praveen.jpg'

// Import team section background image
import teamBg from '../../assets/images/experiences/team-bg.jpg' // Add your team background image here

interface TeamMember {
  name: string
  role: string
  location?: string
  image?: string
  social?: {
    linkedin?: string
    instagram?: string
  }
}

const Team: React.FC = () => {
  const founders: TeamMember[] = [
    { 
      name: "Jacinth Paul", 
      role: "Founder", 
      image: rider,
    },
    { 
      name: "Tudu", 
      role: "Founder", 
      image: rider,
    },
    { 
      name: "Arpan Laha", 
      role: "Founder", 
      image: arpan,
    },
  ]

  const advisory: TeamMember[] = [
    { 
      name: "Arun Hilson", 
      role: "RT Advisory", 
      image: rider,
    },
    { 
      name: "Lohith Bittira", 
      role: "RT Advisory", 
      image: lohith,
    },
    { 
      name: "Kamal Chodri", 
      role: "RT Advisory", 
      image: kamal,
    },
  ]

  const admins: TeamMember[] = [
    { name: "Sandeep", role: "RT Bengaluru Admin", location: "Bengaluru", image: rider },
    { name: "Abhishek", role: "RT Bengaluru Admin", location: "Bengaluru", image: abhishekImg },
    { name: "Naveen Nembhwani", role: "RT Vizag Admin", location: "Vizag", image: rider },
    { name: "Praveen Patkar", role: "RT Hyderabad Admin", location: "Hyderabad", image: Praveen },
    { name: "Prateek Swarnkar", role: "RT Cruise Admin", location: "Cruise", image: Prateek },
    { name: "Manju PC", role: "RT Mysuru Admin", location: "Mysuru", image: rider },
    { name: "Darshan Kalmane", role: "RT Shivmoga Admin", location: "Shivmoga", image: rider },
    { name: "Karthick", role: "RT Coimbatore Admin", location: "Coimbatore", image: rider },
    { name: "Arun Hilson", role: "RT Chennai Admin", location: "Chennai", image: rider },
    { name: "Narayan", role: "RT Delhi Admin", location: "Delhi", image: rider },
    { name: "Thejalinga", role: "RT Gulbarga Admin", location: "Gulbarga", image: rider },
    { name: "Umesh Nariyani", role: "RT Pune Admin", location: "Pune", image: rider },
    { name: "Ashutosh Sharma", role: "RT Ghaziabad Admin", location: "Ghaziabad", image: rider },
  ]

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <section id="team" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={teamBg}
          alt="Team background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">THE TEAM</span>
          <h2 className="heading-secondary text-white mt-2 mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Riders</span>
          </h2>
          <p className="text-lg text-gray-300">
            The passionate individuals who make Road to Thrill an incredible community of bikers.
          </p>
        </div>

        {/* Founders Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-red-500 fill-red-500" />
            Founders
            <Star className="w-6 h-6 text-red-500 fill-red-500" />
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((person, index) => (
              <div
                key={index}
                className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 text-center"
              >
                {/* Circular Photo Frame */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 animate-pulse opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-1 rounded-full bg-black overflow-hidden ring-2 ring-red-600/50 group-hover:ring-4 group-hover:ring-red-600 transition-all">
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const initialsDiv = document.createElement('div')
                            initialsDiv.className = 'w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800'
                            initialsDiv.textContent = getInitials(person.name)
                            parent.appendChild(initialsDiv)
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-1">{person.name}</h4>
                <p className="text-red-500 font-semibold mb-3">{person.role}</p>
                
                {/* Social Links
                {person.social && (
                  <div className="flex justify-center gap-3">
                    {person.social.linkedin && (
                      <a href={person.social.linkedin} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {person.social.instagram && (
                      <a href={person.social.instagram} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Instagram size={18} />
                      </a>
                    )}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            RT Advisory
            <Shield className="w-6 h-6 text-red-500" />
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {advisory.map((person, index) => (
              <div
                key={index}
                className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 text-center"
              >
                {/* Circular Photo Frame */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-1 rounded-full bg-black overflow-hidden ring-2 ring-red-600/50 group-hover:ring-4 group-hover:ring-red-600 transition-all">
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const initialsDiv = document.createElement('div')
                            initialsDiv.className = 'w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800'
                            initialsDiv.textContent = getInitials(person.name)
                            parent.appendChild(initialsDiv)
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-red-600 to-red-800">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-1">{person.name}</h4>
                <p className="text-red-500 font-semibold">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RT Admins Section */}
        <div>
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            RT Admin Team
            <Users className="w-6 h-6 text-red-500" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {admins.map((person, index) => (
              <div
                key={index}
                className="group bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 flex items-center gap-3"
              >
                {/* Circular Photo Frame - smaller for admins */}
                <div className="relative w-12 h-12 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-75" />
                  <div className="absolute inset-0.5 rounded-full bg-black overflow-hidden ring-1 ring-red-600/50 group-hover:ring-2 group-hover:ring-red-600 transition-all">
                    {person.image ? (
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const initialsDiv = document.createElement('div')
                            initialsDiv.className = 'w-full h-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-red-600 to-red-800'
                            initialsDiv.textContent = getInitials(person.name)
                            parent.appendChild(initialsDiv)
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-red-600 to-red-800">
                        {getInitials(person.name)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold truncate">{person.name}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={10} className="text-red-500 flex-shrink-0" />
                    <span className="truncate">{person.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-4">Want to lead rides in your city?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-300"
          >
            Become an RT Admin
          </a>
        </div>
      </div>
    </section>
  )
}

export default Team