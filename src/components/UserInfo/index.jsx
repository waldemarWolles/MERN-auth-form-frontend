import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from './UserInfo.module.scss'

export const UserInfo = () => {
  const userInfo = useSelector((state) => state.auth.data)
  return (
    <div className={styles.container}>
      <Typography variant="h3" gutterBottom>
        User Name: {userInfo.fullName}
      </Typography>
      <Typography variant="h3" gutterBottom>
        User Email: {userInfo.email}
      </Typography>
    </div>
  )
}
