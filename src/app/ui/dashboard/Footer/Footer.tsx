import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container fluid className="text-center align-items-center flex-column flex-md-row d-flex justify-content-between">
        <div className="w-100">
          <span className="text-center d-block">© 2024 大金门窗软件</span>
        </div>
      </Container>
    </footer>
  )
}
