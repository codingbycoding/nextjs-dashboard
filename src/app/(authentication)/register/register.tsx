'use client'

import {
  Alert, Button, Form, FormControl, InputGroup,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import axios from 'axios'
import InputGroupText from 'react-bootstrap/InputGroupText'

import type { User } from '@/models/models'

export default function Register() {
  const redirectURL = '/calculation'

  const router = useRouter()
  const [user, setUser] = useState({} as User)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [passwordRepeat, setPasswordRepeated] = useState('')

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      console.debug('redirect.toString():', redirect.toString())
      return redirect.toString()
    }

    return redirectURL
  }

  const register = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    console.log('user.password:', user.password, 'passwordRepeat:', passwordRepeat)
    if (user.password !== passwordRepeat) {
      setError('密码不匹配')
      console.log('return')
      return
    }

    setSubmitting(true)

    try {
      const res = await axios.post('api/mock/register', user)
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
        {/*
        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faUser} fixedWidth /></InputGroupText>
          <FormControl
            name="username"
            required
            disabled={submitting}
            placeholder="用户名"
            aria-label="Username"
            onChange={(e) => setUser({
              ...user,
              name: e.target.value,
            })}
          />
        </InputGroup>
        */}

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faPhone} fixedWidth />
          </InputGroupText>
          <FormControl
            type="mobile"
            name="mobile"
            required
            disabled={submitting}
            placeholder="手机号"
            aria-label="Mobile"
            onChange={(e) => setUser({
              ...user,
              mobile: parseInt(e.target.value, 10),
            })}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={submitting}
            placeholder="密码"
            aria-label="Password"
            onChange={(e) => setUser({
              ...user,
              password: e.target.value,
            })}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroupText>
          <FormControl
            type="password"
            name="password_repeat"
            required
            disabled={submitting}
            placeholder="确认 密码"
            aria-label="Repeat password"
            onChange={(e) => setPasswordRepeated(e.target.value)}
          />
        </InputGroup>

        <Button type="submit" className="d-block w-100" disabled={submitting} variant="success">
          创建账户
        </Button>
      </Form>
    </>
  )
}
