import React from 'react'
import Layout from './components/layout/Layout'
import Header from './components/layout/Header'
import Hero from './components/hero/Hero'
import WhyJoin from './components/whyJoin/WhyJoin'
import Calendar from './components/calendar/CalendarClient'
import ExperiencesSimple from './components/experiences/Experiences'
import Join from './components/join/Join'
import Contact from './components/contact/Contact'
import Team from './components/team/Team'

function App() {
  return (
    <Layout>
      <Header/>
      <Hero />
      <Calendar />
      <WhyJoin />
      <ExperiencesSimple />
      <Team />
      <Join/>
      <Contact/>
    </Layout>
  )
}

export default App