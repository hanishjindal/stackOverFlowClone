import React, { useState } from 'react'
import Head from 'next/head'

import { Logo } from '../icons'
import LoginForm from './login-form'
import SignUpForm from './signup-form'

import styles from './auth-forms.module.css'
import ForgotPasswordForm from './forgot-password'

const AuthForms = ({ screen = 'signup' }) => {
  const [form, setForm] = useState(screen)

  return (
    <div className={styles.authModal}>
      <Head>
        <title>{form == 'login' ? 'Log In' : (form == 'signup' ? 'Sign Up' : 'Forgot Password')} - Clone of Stackoverflow</title>
      </Head>

      <Logo className={styles.logo} />

      {form === 'login' ? <LoginForm /> : (form == 'signup' ? <SignUpForm /> : <ForgotPasswordForm/>)}

      {form === 'login' ? (
        <p>
        <p className={styles.authSwichMessage}>
        <center><a onClick={() => setForm('forgotPassword')}>Forgot Password?</a></center>
        </p>
        <p className={styles.authSwichMessage}>
          Don’t have an account?{' '}
          <a onClick={() => setForm('signup')}>Sign up</a>
        </p>
        </p>
      ) : (form === 'signup' ? (
        <p className={styles.authSwichMessage}>
          Already have an account?{' '}
          <a onClick={() => setForm('login')}>Log in</a>
        </p>
      ): <br/>)}
    </div>
  )
}

export default AuthForms
