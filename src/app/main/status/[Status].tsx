//
//메인화면 - 현황 - 현황 상세
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

import { RootView } from '~/components/container'

const StatusDetailScreen = () => {

  return (
    <RootView>
      <Button title="시간선택" onPress={() => router.push(`/main/status/SelectTime`)} />
    </RootView>
  )
}

export default StatusDetailScreen