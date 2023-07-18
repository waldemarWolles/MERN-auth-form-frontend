import React, { useEffect, useState } from 'react'
import { Button, Modal } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAuthMe, isAuthSelector, isUserInfoSelector, logout } from '../redux/slices/auth'
import { AuthForm, UserInfo } from '../components'
import styles from './Home.module.scss'

export const Home = () => {
  const isAuth = useSelector(isAuthSelector)
  const isUserInfo = useSelector(isUserInfoSelector)
  const userName = useSelector((state) => state.auth.userName)
  const dispatch = useDispatch()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const onClickLogout = () => {
    if (window.confirm('Are you sure that you want to logout?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }

  useEffect(() => {
    isAuth && !isUserInfo && dispatch(fetchAuthMe())
  }, [isAuth])

  return (
    <div className={styles.container}>
      {isAuth && (
        <>
          <Typography variant="h3" gutterBottom>
            {userName && userName + ' You are logged in!'}
          </Typography>
          {isUserInfo && <UserInfo />}
        </>
      )}
      <div className={styles.buttonsContainer}>
        {isAuth ? (
          <Button variant="contained" onClick={onClickLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
            <Button variant="contained" onClick={() => setShowRegisterModal(true)}>
              Register
            </Button>
          </>
        )}

        <Modal open={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
          <div className={styles.formContainer}>
            <AuthForm formType="register" handleModalClose={() => setShowRegisterModal(false)} />
          </div>
        </Modal>

        <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
          <div className={styles.formContainer}>
            <AuthForm formType="login" handleModalClose={() => setShowLoginModal(false)} />
          </div>
        </Modal>
      </div>
    </div>
  )
}
