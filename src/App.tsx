import React from 'react'
import Layout from './components/layout/Layout'
import Header from './components/layout/Header'
import Hero from './components/hero/Hero'
import WhyJoin from './components/whyJoin/WhyJoin'
import Calendar from './components/calendar/Calendar'
import ExperiencesSimple from './components/experiences/Experiences'
import Join from './components/join/Join'
import Contact from './components/contact/Contact'

function App() {
  return (
    <Layout>
      <Header/>
      <Hero />
      <Calendar />
      <WhyJoin />
      <ExperiencesSimple />
      <Join/>
      <Contact/>
    </Layout>
  )
}

export default App