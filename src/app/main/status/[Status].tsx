//
//메인화면 - 현황 - 현황 상세
//
import React, { useEffect, useState } from 'react'

import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { RootView } from '~/components/container';
import { BasicHeader } from '~/components/header';
import { Button } from "~/components/Button";
import { rf, rh, rw } from '~/styles/globalSizes';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Chip } from '~/components/Chip';
import { statusListState } from '~/atoms/statusAtom';
import { Project, Status } from '~/types/globalTypes';
import { colors } from '~/styles/globalColors';
import { projectListState } from '~/atoms/projectAtom';
import { StatusTimeTable } from '~/components/StatusTimeTable';


const StatusDetailScreen = () => {
  const { project_name, event_name, state } = useLocalSearchParams<{
    project_name: string;
    event_name: string;
    state: "not" | "done"
  }>();

  const [project, setProject] = useState<Project>();
  const [status, setStatus] = useState<Status>();
  const projectList = useRecoilValue(projectListState);
  const statusList = useRecoilValue(statusListState);

  const isParticipated = (name: string) => {
    return status!.status_by_member.map(val => val.name).includes(name);
  };
  
  const onPressButton = () => {
    router.push({
      pathname: `/main/status/SelectTime`,
      params: {
        project_name: project_name,
        event_name: event_name,
        state: state
      }
    })
  }

  useEffect(() => {
    setProject(projectList.find((val) => val.name === project_name));
    setStatus(statusList.find((val) => val.project_name === project_name?.toString() && val.event_name === event_name?.toString()));
  }, []);

  return (
    <RootView>
      <BasicHeader 
        title={event_name!}
        left='back'
        leftPress={() => router.back()}
      />

      <ScrollView style={styles.container}>
        <View style={{ marginBottom: rh(25) }}>
          <Text style={styles.textSubcontainer}>참여한 인원은?</Text>
          <View style={styles.memberContainer}>
          {(project && status) && 
            project.members.map((val,idx) => (
              <View style={styles.chipContainer} key={`member_chip_${idx}`}>
                <Chip 
                  text={val.name} 
                  color={isParticipated(val.name) ? colors.blue : colors.gray}
                />
              </View> 
          ))}
          </View>
        </View>

        <View>
          <Text style={styles.textSubcontainer}>현재 등록 현황</Text>
          <View style={{ paddingLeft: rw(20) }}>
          {status && 
            <StatusTimeTable 
              dateRange={status.date_range}
              arr_status={status.status_by_member.map(val => val.selectedState)}
            />
          }
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button
          title={state === "not" ? "시간 선택" : "시간 수정"}
          onPress={onPressButton} 
          color='dark'
          width={rw(320)}
        />
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    
    // paddingLeft: rw(20),
    // paddingBottom: rh(89),
  },
  subcontainer: {
    
  },
  memberContainer: {
    paddingHorizontal: rw(20),
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  chipContainer: {
    marginBottom: rh(20), 
    marginRight: rw(9)
  },
  textSubcontainer: {
    textAlign: "center",
    fontSize: rf(19),
    fontWeight: 'bold',
    marginBottom: rh(20)
  },
  buttonContainer: {
    position: "absolute",
    bottom: rh(40),
    left: rw(35)
  }
})

export default StatusDetailScreen