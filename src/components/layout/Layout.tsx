import React from 'react'
// Remove any Header import from here if it exists

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* REMOVE ANY HEADER COMPONENT FROM HERE */}
      <main className="flex-grow">
        {children}
      </main>
      {/* REMOVE ANY FOOTER FROM HERE IF IT CONTAINS THE WHITE HEADER */}
    </div>
  )
}

export default Layout