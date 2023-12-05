//
//드로어 - 설정 - 사용자관리
//
import React, { useState, useEffect } from 'react'

import { View, Text, StyleSheet, Alert } from 'react-native'
import { router, Stack } from 'expo-router';
import { useRecoilState } from 'recoil';

import { UserState } from "~/atoms/UserAtom";

import { RootView } from '~/components/container'
import { BasicHeader } from "~/components/header";
import { Button } from '~/components/Button';
import { LabelTextInput } from '~/components/textInput';

import { rh, rw, rf } from "~/styles/globalSizes";
import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";

const SettingUserScreen = () => {
  const [user, setUser] = useRecoilState(UserState)

  const [input, setInput] = useState<string>('')

  useEffect(() => {
    if (user) {
      setInput(user.name)
    }
  }, [user])

  const onPressComplete = () => {
    if(!input){
      Alert.alert('이름을 입력해주세요.')
      return;
    }

    const newUser = {...user, name : input}
    setUser({...newUser})

    Alert.alert('사용자 이름이 변경되었습니다.')
    router.replace('/main/home')
  }

  return (
    <RootView viewStyle={styles.container}>
      <Stack.Screen options={{ header: () => <BasicHeader left='back' leftPress={() => router.back()} title="사용자 관리" /> }} />

      <View style={{ flex: 1, marginTop: rh(35) }}>
        <LabelTextInput value={input} onChangeText={setInput} label="이름" width={rw(298)} />
      </View>

      <Button title="완료" color='dark' onPress={onPressComplete} width={rw(320)} />
    </RootView>
  )
}

export default SettingUserScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
})