import React, { useEffect, useRef } from 'react'
import { LogBox } from 'react-native'
import { decode, encode } from "base-64"

import Navigation from './app/navigations/Navigation'
import { startNotifications } from './app/utils/actions'

LogBox.ignoreAllLogs()

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    startNotifications(notificationListener, responseListener)
  }, [])
  
  return (
    <Navigation/>
  )
}