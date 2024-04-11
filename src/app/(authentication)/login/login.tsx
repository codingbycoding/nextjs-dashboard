'use client'

import {
  Alert, Button, Col, Form, FormControl, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUser, faLock, faPhone} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState, useRef } from 'react'

import { deleteCookie, getCookie } from 'cookies-next'
import axios from 'axios'
import Link from 'next/link'
import InputGroupText from 'react-bootstrap/InputGroupText'

export default function Login() {
  const redirectURL = '/calculation'

  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [user, setUser] = useState({})

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return redirectURL
  }

  const login = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setSubmitting(true)

    try {
      const res = await axios.post('api/mock/login', user)
      /*
      const res = await axios.post('api/mock/login', {
        username: usernameRef?.current,
        password: passwordRef?.current,
      })
      */

      if (res.status === 200) {
        const getRedirectVal = getRedirect()
        console.log('getRedirectVal:', getRedirectVal)
        router.push(getRedirectVal)
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
      <Alert
        variant="danger"
        show={error !== ''}
        onClose={() => setError('')}
        dismissible
      >
        {error}
      </Alert>
      <Form onSubmit={login}>
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faPhone}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            name="mobile"
            required
            disabled={submitting}
            placeholder="手机号"
            aria-label="mobile"
            defaultValue=""
            onChange={(e) => setUser({
              ...user,
              mobile: e.target.value,
            })}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faLock}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={submitting}
            placeholder="密码"
            aria-label="Password"
            defaultValue=""
            onChange={(e) => setUser({
              ...user,
              password: e.target.value,
            })}
          />
        </InputGroup>

        <Row className="align-items-center">
          <Col xs={6}>
            <Button
              className="px-4"
              variant="primary"
              type="submit"
              disabled={submitting}
            >
              登陆
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Link className="px-0" href="#">
              忘记密码?
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  )
}
