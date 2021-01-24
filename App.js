import React from 'react'
import { LogBox } from 'react-native'
import { decode, encode } from "base-64"

import Navigation from './app/navigations/Navigation'

LogBox.ignoreAllLogs()

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  
  return (
    <Navigation/>
  )
}
