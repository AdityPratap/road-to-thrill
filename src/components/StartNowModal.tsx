import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, MapPin, Briefcase, Calendar, Heart, Send, Bike, CheckCircle, X } from 'lucide-react'

// Form validation schema (same as Join section)
const joinFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in DD/MM/YYYY format'),
  location: z.string().min(2, 'Location is required'),
  profession: z.string().min(2, 'Profession is required'),
  country: z.string().min(2, 'Country is required'),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
  reason: z.string().min(20, 'Please tell us why you want to join (minimum 20 characters)'),
})

type JoinFormData = z.infer<typeof joinFormSchema>

interface StartNowModalProps {
  isOpen: boolean
  onClose: () => void
}
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAIAycmuV-TtCrgXuGFGOYycA7z_WC7TTJr5QBZHnKqAHl9bjvwKN3AZ3U0X2eRSIjyQ/exec'
const StartNowModal: React.FC<StartNowModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      gender: 'prefer-not-to-say'
    }
  })

  const onSubmit: SubmitHandler<JoinFormData> = async (data) => {
  setIsSubmitting(true)
  setSubmitError('')
  
  try {
    console.log('1. Starting submission with data:', data)
    
    // Create FormData
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('dob', data.dob)
    formData.append('location', data.location)
    formData.append('profession', data.profession)
    formData.append('country', data.country)
    formData.append('gender', data.gender)
    formData.append('reason', data.reason)
    formData.append('source', 'navbar_popup')
    
    console.log('2. FormData created')
    
    // Log each form entry
    for (let pair of formData.entries()) {
      console.log('3. Form entry:', pair[0], pair[1])
    }
    
    // Send to Google Script
    console.log('4. Sending to URL:', GOOGLE_SCRIPT_URL)
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData
    })
    
    console.log('5. Response received:', response)
    
    // Try to get response text
    const responseText = await response.text()
    console.log('6. Response text:', responseText)
    
    // If we get here, assume success
    setSubmitSuccess(true)
    reset()
    
    console.log('7. Submission successful')
    
    setTimeout(() => {
      setSubmitSuccess(false)
      onClose()
    }, 2000)
    
  } catch (error) {
    console.error('❌ Submission error:', error)
    setSubmitError('Something went wrong. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black border border-red-600/30 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Bike className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Join the Thrill</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 text-green-500">
                  <CheckCircle size={20} />
                  <span>Thank you for joining! We'll be in touch soon.</span>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-500">
                  <span>{submitError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      <User className="inline w-3 h-3 mr-1 text-red-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      <Calendar className="inline w-3 h-3 mr-1 text-red-500" />
                      DOB (DD/MM/YYYY) *
                    </label>
                    <input
                      type="text"
                      {...register('dob')}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="15/03/1990"
                    />
                    {errors.dob && (
                      <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>
                    )}
                  </div>

                  {/* Location Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      <MapPin className="inline w-3 h-3 mr-1 text-red-500" />
                      Current Location *
                    </label>
                    <input
                      type="text"
                      {...register('location')}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="City, State"
                    />
                    {errors.location && (
                      <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
                    )}
                  </div>

                  {/* Profession Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      <Briefcase className="inline w-3 h-3 mr-1 text-red-500" />
                      Profession *
                    </label>
                    <input
                      type="text"
                      {...register('profession')}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="Software Engineer"
                    />
                    {errors.profession && (
                      <p className="mt-1 text-xs text-red-500">{errors.profession.message}</p>
                    )}
                  </div>

                  {/* Country Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      <MapPin className="inline w-3 h-3 mr-1 text-red-500" />
                      Country *
                    </label>
                    <input
                      type="text"
                      {...register('country')}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                      placeholder="India"
                    />
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
                    )}
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      <User className="inline w-3 h-3 mr-1 text-red-500" />
                      Gender *
                    </label>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-2">
                      <div className="grid grid-cols-2 gap-1">
                        {[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                          { value: 'prefer-not-to-say', label: 'Prefer not' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-1 cursor-pointer group">
                            <input
                              type="radio"
                              value={option.value}
                              {...register('gender')}
                              className="w-3 h-3 accent-red-600"
                            />
                            <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>
                    )}
                  </div>
                </div>

                {/* Reason Field - Full width */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    <Heart className="inline w-3 h-3 mr-1 text-red-500" />
                    Why do you want to join? *
                  </label>
                  <textarea
                    {...register('reason')}
                    rows={3}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                    placeholder="Tell us about your passion for biking..."
                  />
                  {errors.reason && (
                    <p className="mt-1 text-xs text-red-500">{errors.reason.message}</p>
                  )}
                </div>

                {/* Hidden field to identify source */}
                <input type="hidden" name="source" value="navbar_popup" />

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 group"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Bike size={18} className="group-hover:rotate-12 transition-transform" />
                        Join the Community
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 text-center">
              <p className="text-xs text-gray-500">
                By joining, you agree to our{' '}
                <a href="#" className="text-red-500 hover:text-red-400 transition-colors">Terms</a>
                {' '}and{' '}
                <a href="#" className="text-red-500 hover:text-red-400 transition-colors">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220,38,38,0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220,38,38,0.8);
        }
      `}</style>
    </>
  )
}

export default StartNowModal