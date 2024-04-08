'use client'

import {
  Alert, Button, Form, FormControl, InputGroup,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUser, faLock, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import axios from 'axios'
import InputGroupText from 'react-bootstrap/InputGroupText'

export default function Register() {
  const redirectURL = '/calculation'

  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return redirectURL
  }

  const register = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setSubmitting(true)

    try {
      const res = await axios.post('api/mock/login')
      if (res.status === 200) {
        router.push(getRedirect())
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Alert variant="danger" show={error !== ''} onClose={() => setError('')} dismissible>{error}</Alert>
      <Form onSubmit={register}>
        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faUser} fixedWidth /></InputGroupText>
          <FormControl
            name="username"
            required
            disabled={submitting}
            placeholder="Username"
            aria-label="Username"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faPhone} fixedWidth />
          </InputGroupText>
          <FormControl
            type="mobile"
            name="mobile"
            required
            disabled={submitting}
            placeholder="Mobile"
            aria-label="Mobile"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={submitting}
            placeholder="Password"
            aria-label="Password"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroupText>
          <FormControl
            type="password"
            name="password_repeat"
            required
            disabled={submitting}
            placeholder="Repeat password"
            aria-label="Repeat password"
          />
        </InputGroup>

        <Button type="submit" className="d-block w-100" disabled={submitting} variant="success">
          创建账户
        </Button>
      </Form>
    </>
  )
}
