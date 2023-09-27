//
//추가 - 일정 추가 - 날짜 선택
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

import { RootView } from '~/components/container'

const SelectDateScreen = () => {
  return (
    <RootView>
      <Button title="시간 선택" onPress={()=>router.push('/main/status/SelectTime')} />
    </RootView>
  )
}

export default SelectDateScreen