import React, { useState, useRef } from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init('YOUR_PUBLIC_KEY') // Replace with your actual public key from EmailJS
      
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current!,
        'YOUR_PUBLIC_KEY' // Replace with your actual public key
      )
      
      if (result.status === 200) {
        setSubmitSuccess(true)
        formRef.current?.reset()
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again or email us directly at thrill.india@gmail.com')
      console.error('Email error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-gradient-to-b from-black to-gray-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, red 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">GET IN TOUCH</span>
          <h2 className="heading-secondary text-white mt-2 mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Us</span>
          </h2>
          <p className="text-lg text-gray-400">
            Have questions? Want to know more about our rides? Reach out to us and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email Us</h4>
                    <a 
                      href="mailto:thrill.india@gmail.com" 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      thrill.india@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                    <Phone className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Call Us</h4>
                    <p className="text-gray-400">+91 98765 43210</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Ride Base</h4>
                    <p className="text-gray-400">Mumbai, Maharashtra</p>
                    <p className="text-sm text-gray-500 mt-1">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Follow the Thrill</h3>
              <p className="text-gray-400 text-sm mb-6">
                Stay connected with us on social media for the latest updates, ride announcements, and community highlights.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
                  { Icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
                  { Icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
                  { Icon: MessageSquare, href: '#', label: 'WhatsApp', color: 'hover:bg-green-600' }
                ].map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 group"
                    aria-label={label}
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response Guarantee */}
            <div className="bg-gradient-to-r from-red-600/10 to-red-800/10 border border-red-600/20 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="text-white font-semibold">24-Hour Response Guarantee</h4>
                  <p className="text-sm text-gray-400">We value your time and always respond within a day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 text-green-500">
                <CheckCircle size={20} />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-500">
                <AlertCircle size={20} />
                <span>{submitError}</span>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                  placeholder="Ride Inquiry, Partnership, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              <input type="hidden" name="to_email" value="thrill.india@gmail.com" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 group"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              We'll never share your information. By sending this message, you agree to our{' '}
              <a href="#" className="text-red-500 hover:text-red-400 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Prefer email? Write to us directly at{' '}
            <a href="mailto:thrill.india@gmail.com" className="text-red-500 hover:text-red-400 font-semibold">
              thrill.india@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact