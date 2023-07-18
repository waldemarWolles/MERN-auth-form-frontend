import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import styles from './AuthForm.module.scss'
import { useDispatch } from 'react-redux'
import { login, registration } from '../../redux/slices/auth'

export const AuthForm = ({ formType, handleModalClose }) => {
  const dispatch = useDispatch()
  const isRegisterForm = formType === 'register'

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: isRegisterForm
      ? {
          fullName: '',
          email: '',
          password: '',
        }
      : { email: '', password: '' },
    mode: 'onChange',
  })

  const onSubmit = async (values) => {
    const data = await dispatch(isRegisterForm ? registration(values) : login(values))

    if (!data.payload) {
      return alert(`${isRegisterForm ? 'Registration' : 'Login'} failed!`)
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }

    handleModalClose()
  }

  return (
    <>
      <h2 className={styles.title}>{isRegisterForm ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isRegisterForm && (
          <TextField
            label="Full Name"
            {...register('fullName', { required: 'Input your Full Name' })}
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName ? 'Full Name is required' : ''}
          />
        )}

        <TextField
          label="Email"
          type="email"
          {...register('email', { required: 'Input your Email' })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email ? 'Email is required' : ''}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', { minLength: 5, required: true })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password ? 'Password is required' : ''}
        />

        <Button disabled={!isValid} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  )
}
