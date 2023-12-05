//
//추가 - 프로젝트 추가 - 역할 선택
//
import React, { useState } from 'react'

import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { router, Stack } from 'expo-router'

import { RootView } from '~/components/container'
import { BasicHeader } from "~/components/header";
import { Button } from "~/components/Button";

import { rh, rw, rf } from "~/styles/globalSizes";
import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";


type roleType = "leader" | "member";

const leader = require('~/assets/role_leader.png')
const leader_focus = require('~/assets/role_leader_focus.png')
const member = require('~/assets/role_member.png')
const member_focus = require('~/assets/role_member_focus.png')

const SelectRoleScreen = () => {
  const [role, setRole] = useState<roleType>()

  const onPressNext = () => {
    if (role === 'leader') {
      router.push('/add/project/AddProject')
    } else if (role === 'member') {
      router.push('/add/project/EnterProject')
    }
  }

  return (
    <RootView viewStyle={styles.container}>
      <Stack.Screen options={{ header: () => <BasicHeader left="back" leftPress={() => router.back()} title="프로젝트 추가" /> }} />


      <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
        <Text style={styles.text}>당신의 역할은?</Text>
        <View style={styles.flexRow}>
          <View style={{ alignItems: 'center'}}>
            <Pressable style={[styles.circle, { backgroundColor: role === 'leader' ? colors.blue : colors.gray }]} onPress={() => setRole('leader')}>
              <Image source={role === 'leader' ? leader_focus : leader} style={styles.icon} />
            </Pressable>
            <Text style={[styles.colorText,{color:role === 'leader' ? colors.blue : colors.textGrey}]}>팀장</Text>
          </View>
          <View style={{width:rw(70)}} />
          <View style={{ alignItems: 'center' }}>
            <Pressable style={[styles.circle, { backgroundColor: role === 'member' ? colors.blue : colors.gray }]} onPress={() => setRole('member')}>
              <Image source={role === 'member' ? member_focus : member} style={styles.icon} />
            </Pressable>
            <Text style={[styles.colorText,{color:role === 'member' ? colors.blue : colors.textGrey}]}>팀원</Text>
          </View>
        </View>
      </View>
      <Button title='다음' color={role ? 'blue' : "gray"} onPress={onPressNext} width={rw(320)} />
    </RootView>
  )
}

export default SelectRoleScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  text: {
    fontFamily: fonts.bold,
    fontSize: rf(20),
    color: colors.black,

    includeFontPadding: false,
    textAlignVertical: 'center'
  },

  colorText: {
    fontFamily: fonts.bold,
    fontSize: rf(18),

    includeFontPadding: false,
    textAlignVertical: 'center'
  },

  flexRow: {
    marginTop: rh(50),
    paddingHorizontal: rw(47),
    flexDirection: 'row',
    justifyContent:'space-around',
  },

  circle: {
    width: rh(110),
    height: rh(110),
    borderRadius: rh(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:rh(15)
  },

  icon: {
    width: rh(55),
    height: rh(55),
  }
})