import { Container } from 'react-bootstrap'
import React from 'react'

import Footer from '@/app/ui/dashboard/Footer/Footer'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex flex-row align-items-center bg-light dark:bg-transparent">
        <Container>
          {children}
        </Container>
      </div>
      <Footer />
    </div>
  )
}
