import React from 'react'
import { Users, MapPin, Camera, Heart, Shield, Clock, Star, Bike } from 'lucide-react'
import whyJoinBg from '../../assets/images/why-join/why-join-bg.png' // Your red/black background image

const WhyJoin: React.FC = () => {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Vibrant Community",
      description: "Join 500+ passionate riders who share your love for adventure and the open road.",
      stats: "500+ Members"
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-600" />,
      title: "Exclusive Destinations",
      description: "Access to members-only rides at some of the most scenic locations across the country.",
      stats: "20+ Locations"
    },
    {
      icon: <Camera className="w-8 h-8 text-red-600" />,
      title: "Epic Memories",
      description: "Create lasting memories with professional photos and videos from every event.",
      stats: "1000+ Photos"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Passion First",
      description: "Whether you're a beginner or expert, your passion for riding is what matters most.",
      stats: "All Levels Welcome"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Safety First",
      description: "Ride with confidence with experienced guides and well-planned, safe routes.",
      stats: "100% Safe Rides"
    },
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: "Flexible Schedule",
      description: "Choose from day trips, weekend getaways, or multi-day adventures that fit your life.",
      stats: "50+ Events/Year"
    }
  ]

  return (
    <section id="why-join" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={whyJoinBg}
          alt="Why join background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">WHY RIDE WITH US</span>
          <h2 className="heading-secondary text-white mt-2 mb-4">
            More Than Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Riding</span>
          </h2>
          <p className="text-lg text-gray-300">
            We're not just a community; we're a family of adventure seekers who believe in the thrill 
            of the journey and the bonds we create along the way.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-black/60 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30"
            >
              {/* Icon with glow effect */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/20 blur-lg rounded-full" />
                  {benefit.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{benefit.description}</p>
              
              {/* Stats Badge */}
              <div className="flex items-center gap-2 text-sm font-semibold text-red-500">
                <Star size={16} className="fill-red-500" />
                <span>{benefit.stats}</span>
              </div>

              {/* Decorative line on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-red-600 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Featured CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl max-w-2xl mx-auto">
            <Bike className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Ready for Your Next Adventure?</h3>
            <p className="text-gray-300 mb-6">
              Join our community today and experience the thrill of the open road with fellow riders.
            </p>
            <a
              href="#join"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/25"
            >
              Become a Member
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyJoin