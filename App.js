import React from 'react'
import { LogBox } from 'react-native'
import Navigation from './app/navigations/Navigation'

LogBox.ignoreAllLogs()

export default function App() {
  
  return (
    <Navigation/>
  )
}
