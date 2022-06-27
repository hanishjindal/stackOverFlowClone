import React, { useState, useContext } from 'react'
import { Formik, validateYupSchema } from 'formik'
import * as Yup from 'yup'

import { publicFetch } from '../../../util/fetcher'
import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'

import FormInput from '../../form-input'
import Button from '../../button'

import styles from './forgot-password.module.css'

const ForgotPasswordForm = () => {
  const { setAuthState } = useContext(AuthContext)
  const { setIsComponentVisible } = useContext(ModalContext)
  const [ isSent, setSent ] = useState(false)
  const [loading, setLoading] = useState(false);
  const changeClass = (val) => {
     val.match(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/) ?
     setSent(true) : setSent(false)
  };
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await publicFetch.post('authenticate', values)
          const { token, expiresAt, userInfo } = data
          setAuthState({ token, expiresAt, userInfo })
          resetForm({})
          setIsComponentVisible(false)
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Required')
          .matches(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Please Enter A Valid Email'),
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <br />
          <center><p>Forgot your account’s password?</p></center>
          <br />
          <p>Enter your email address and we’ll send you a recovery link.</p>
          <br />
          <FormInput
            label="Email"
            type="text"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.email && errors.email}
            errorMessage={errors.email && errors.email}
          />
          <p className={styles.status}>{status}</p>
          <Button
            primary
            full
            className={styles.submitButton}
            type="changePassword"
            isLoading={loading}
            disabled={isSubmitting}
            onClick={()=>{changeClass(values.email)}}
          >
            Send recovery email
          </Button>
          <p className={styles.forgotContent}></p>
          <br/>
          <center><p className={isSent ? styles.forgotContentShow : styles.forgotContent }>Password Recovery Mail Sent</p></center>
        </form>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm
