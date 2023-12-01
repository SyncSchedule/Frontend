//
//추가 - 일정 추가
//
import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { SelectList } from 'react-native-dropdown-select-list'
import { RootView } from '~/components/container'
import { BasicHeader } from '~/components/header'
import { fonts } from '~/styles/globalFonts'
import { rf, rh, rw } from '~/styles/globalSizes'
import { colors } from '~/styles/globalColors'
import { LabelTextInput } from '~/components/textInput'
import { Button } from '~/components/Button'
import { useRecoilValue } from 'recoil'
import { projectListState } from '~/atoms/projectAtom'

const AddScheduleScreen = () => {
  const [project, setProject] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const projectList = useRecoilValue(projectListState);

  function setEventName(text: string) {
    setEvent(text);
  }

  const onPressButton = () => {
    if (isButtonEnabled) {
      if (project && event) {
        router.push({
          pathname: '/add/schedule/SelectDate',
          params: {
            project_name: project,
            event_name: event
          }
        });
      }
    }
  }
  useEffect(() => {
    if (project && event) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [project, event]);

  return (
    <RootView>
      <BasicHeader 
        title='일정'
        left='quit'
        leftPress={() => router.back()}
      />
      <View style={[styles.container]}>
        <View>
          <Text style={[styles.labelText]}>프로젝트 선택</Text>
          <View style={{ marginBottom: rh(54) }}>
            <SelectList 
              setSelected={(val: string) => setProject(val)}
              data={projectList.map(val => val.name)}
              save='value'
              search={false}
              placeholder='프로젝트명'
              boxStyles={styles.selectBox}
            />
          </View>
        </View>

        <View>
          <LabelTextInput 
            label='일정명'
            value={event}
            onChangeText={setEventName}
            placeholder='일정명'
          />
        </View>

      </View>
      <View style={styles.button}>
        <Button 
          title='다음'
          color={isButtonEnabled ? "dark" : "gray"}
          onPress={onPressButton}
          width={rw(320)}
        />
      </View>
    </RootView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(46),
    paddingTop: rh(34)
  },
  selectBox: {
    height: rf(50),
    padding: rw(12),
    borderRadius: 10,
    borderColor: colors.textGrey
  },
  labelText: {
    fontFamily: fonts.bold,
    fontSize: rf(20),
    color: colors.black,
    marginVertical: rh(6)
  },
  button: {
    position: "absolute",
    bottom: rh(40),
    left: rw(35)
  }
})

  export default AddScheduleScreen