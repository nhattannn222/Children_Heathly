import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

export const AppMiddleware = (props) => {
  const { logged, user, refresh, actionStatus, code } = useSelector(
    (state) => state.authReducer,
  )
  const navigation = useNavigation()

  useLayoutEffect(() => {
    if (user && refresh && refresh.uri) {
      navigation.navigate(refresh.uri)
    }

  }, [refresh])
  return <>{props.children}</>
}
