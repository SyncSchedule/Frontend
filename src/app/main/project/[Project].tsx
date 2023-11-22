//
//메인화면 - 프로젝트 - 프로젝트 상세
//
import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { router, useGlobalSearchParams } from 'expo-router'
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from "~/styles/globalColors";
import { RootView } from '~/components/container'
import { BasicHeader } from '~/components/header'
import { rf, rh, rw } from '~/styles/globalSizes';
import { EventContainerProject } from '~/components/ContentContainer';
import { Event, Project } from '~/types/globalTypes';

const ProjectDetailScreen = () => {
  const params = useGlobalSearchParams();
  
  const [projectName, setProjectName] = useState("");
  const [intro, setIntro] = useState("");
  const [members, setMembers] = useState<{ name: string, isLeader: boolean }[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [futureEvents, setFutureEvents] = useState<Event[]>([]);
  const [invitationCode, setInvitationCode] = useState<string>();
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  
  useEffect(() => {
    const dummy: Project = {
      name: "UX 디자인",
      introduction: "건국대 UX디자인(3202) 앱 제작 프로젝트 :)",
      members: [
        { name: "동동일", isLeader: true }, 
        { name: "동동이", isLeader: false },
        { name: "동동이", isLeader: false },
        { name: "동동이", isLeader: false },
        { name: "동동이", isLeader: false },
      ],
      isOngoing: true,
      events: [
        {
          name: "화면 설계 회의",
          isScheduled: false
        }, 
        {
          name: "중간 발표 준비",
          isScheduled: true,
          date: new Date(2023,11,15),
          start: new Date(2023,11,15,13),
          end: new Date(2023,11,15,15)
        },
        {
          name: "주제 발표 준비",
          isScheduled: true,
          date: new Date(2023,9,15),
          start: new Date(2023,11,15,13),
          end: new Date(2023,11,15,15)
        }
      ]
    }

    if (params.Project) {
      setProjectName(params.Project.toString());
      setIntro(dummy.introduction)
      setMembers(dummy.members);

      var futureEventsList: Event[] = [];
      var pastEventList: Event[] = [];
      dummy.events.forEach((val) => {
        if (!val.isScheduled || (val.isScheduled && isLaterThanToday(val.date!))) {
          futureEventsList.push(val);
        } else {
          pastEventList.push(val);
        }
      })
      setFutureEvents(futureEventsList);
      setPastEvents(pastEventList)
      
      if (dummy.code) 
        setInvitationCode(dummy.code);
      else {
        setInvitationCode(uuid.v4().toString())
      }
      //프로젝트 생성할 때 코드를 생성하면 바로 set하면 됨
      //이 페이지에서 uuid 사용할 필요 없음
    }
  }, [params]);

  function goBack() {
    router.back();
  }

  function isLaterThanToday(date: Date) {
    const today = new Date();

    if (date > today) 
      return true;
    else return false;
  }

  function copyInvitationCode() { //초대코드 복사
    try {
      if (invitationCode) {
        Clipboard.setString(invitationCode);
        alert("초대코드가 복사되었습니다. 팀원에게 알려주세요!")
      }
    } catch (e) {
      console.log(e)
      alert(e)
    }//Clipboard가 null이라고 뜸. 실제 어플이 아니라서 그런가?
  }

  return (
    <RootView>
      <BasicHeader 
        title={projectName}
        left='back'
        leftPress={goBack}
        right="setting"
        rightPress={() => router.push(`/main/project/${projectName}/Setting`)}
      />
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <AntDesign name="sound" size={rh(15)} color="#535456" />
          <Text style={styles.introText}>{intro}</Text>
        </View>

        <View>
          <View style={styles.memberHeader}>
            <Text style={styles.headerText}>멤버</Text>
            <Text style={styles.headerText}>{`${members.length}명`}</Text>
            <TouchableOpacity onPress={() => setIsMemberOpen(!isMemberOpen)}>
            {isMemberOpen ? (
              <MaterialCommunityIcons name="arrow-up-drop-circle" size={24} color="black" />
            ) : (
              <MaterialCommunityIcons name="arrow-down-drop-circle-outline" size={24} color="black" />
            )}
            </TouchableOpacity>
          </View>
          {isMemberOpen && (
            <View>
              <FlatList 
                horizontal={true}
                data={members}
                renderItem={({ item }) => (
                  <View 
                    style={[
                      styles.memberChip, 
                      { backgroundColor: item.isLeader ? colors.blue : colors.gray }
                    ]}>
                    <Text>{item.name}</Text>
                  </View>
                )}
              />
              <TouchableOpacity onPress={copyInvitationCode}>
                <View style={[styles.memberChip, { backgroundColor: colors.dark, marginTop: rh(9) }]}>
                  <Text style={{ color: colors.white }}>초대하기+</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ marginTop: rh(30) }}>
          <View>
            <Text style={styles.headerText}>예정 일정</Text>
            <FlatList 
              data={futureEvents}
              renderItem={({ item }) => (
                <View>
                  <EventContainerProject 
                    event_name={item.name}
                    isScheduled={item.isScheduled}
                    date={item.date}
                    start={item.start}
                    end={item.end}
                  />            
                  <View style={styles.space}></View>     
                </View>
              )}
            />
          </View>
          <View>
            <Text style={styles.headerText}>지난 일정</Text>
            <FlatList 
              data={pastEvents}
              renderItem={({ item }) => (
                <View>
                  <EventContainerProject 
                    event_name={item.name}
                    isScheduled={true}
                    date={item.date}
                    start={item.start}
                    end={item.end}
                  />
                  <View style={styles.space}></View>
                </View>
                
              )}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.floatingButton} onPress={() => router.push(`/add/schedule`)}>
          <AntDesign name="pluscircle" size={rw(55)} color="black" />
        </TouchableOpacity>
      </View>
      {/* <Button title="설정" onPress={() => router.push(`/main/project/Setting`)} /> */}
      {/* <Button title="일정 추가" onPress={() => router.push(`/add/schedule`)} /> */}
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: rw(15)
  },
  introContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: rw(20),
    padding: rh(10),
    marginBottom: rh(30)
  },
  introText: {
    marginLeft: rw(10),
    fontSize: rf(15)
  },
  memberHeader: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: rf(20),
    marginRight: rw(10),
    marginBottom: rh(17)
  },
  memberCount: {
    color: "#535456",
    marginLeft: rw(13),
    marginRight: rw(10)
  },
  memberChip: {
    fontSize: rf(14),
    paddingVertical: rh(6),
    paddingHorizontal: rw(20),
    borderRadius: 15,
    marginRight: rw(5),
    alignSelf: "flex-start"
  },
  space: {
    height: rh(17)
  },  
  floatingButton: {
    position:'absolute',
    right: rw(10), 
    bottom: rh(10),
    alignSelf:'flex-end'
  }  
})

export default ProjectDetailScreen