//
//드로어 - 설정
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

import { RootView } from '~/components/container'

const SettingScreen = () => {
  return (
    <RootView>
      <Button title="사용자 관리" onPress={()=>router.push('/drawer/SettingUser')} />
    </RootView>
  )
}

export default SettingScreen