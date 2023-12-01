//
//메인화면 - 프로젝트 - 프로젝트 상세
//
import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { router, useGlobalSearchParams, Stack } from 'expo-router'
import uuid from 'react-native-uuid';
import * as Clipboard from 'expo-clipboard';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from "~/styles/globalColors";
import { RootView } from '~/components/container'
import { BasicHeader } from '~/components/header'
import { rf, rh, rw } from '~/styles/globalSizes';
import { EventContainerProject } from '~/components/ContentContainer';
import { Event, Project } from '~/types/globalTypes';
import moment, { Moment } from 'moment';
import { useRecoilValue } from 'recoil';
import { projectListState } from '~/atoms/projectAtom';
import { Chip } from '~/components/Chip';

const ProjectDetailScreen = () => {
  const params = useGlobalSearchParams();

  const [project, setProject] = useState<Project>();
  const [pastEvents, setPastEvents] = useState<Event[]>();
  const [futureEvents, setFutureEvents] = useState<Event[]>();
  const [invitationCode, setInvitationCode] = useState<string>();
  const [isMemberOpen, setIsMemberOpen] = useState(false);

  const projectList = useRecoilValue(projectListState);

  useEffect(() => {
    if (params.Project) {
      const project_name = params.Project.toString();
      const project = projectList.find(val => val.name === project_name);
      setProject(project);
    }
  }, [params]);

  useEffect(() => {
    if (project) {
      var futureEventsList: Event[] = [];
      var pastEventList: Event[] = [];
      project.events.forEach((val) => {
        if (!val.isScheduled || (val.isScheduled && val.date!.isAfter(moment()))) {
          futureEventsList.push(val);
        } else {
          pastEventList.push(val);
        }
      })
      setFutureEvents(futureEventsList);
      setPastEvents(pastEventList)
    }
  }, [project]);


  async function copyInvitationCode() { //초대코드 복사
    var code = invitationCode;

    if (!code) {
      code = uuid.v4().toString();
      setInvitationCode(code);
    }

    try {
      await Clipboard.setStringAsync(code);
      alert("초대코드가 복사되었습니다. 팀원에게 알려주세요!");
    } catch (e) {
      alert(e);
    }
  }

  return project && (
    <RootView>
      <Stack.Screen options={{
        header: () => <BasicHeader
          title={project?.name}
          left='back'
          leftPress={() => router.back()}
          right="setting"
          rightPress={() => router.push(`/setting/${project.name}`)}
        />
      }} />

      <View style={styles.container}>
        <View style={styles.introContainer}>
          <AntDesign name="sound" size={rh(15)} color="#535456" />
          <Text style={styles.introText}>{project?.introduction}</Text>
        </View>

        <View>
          <View style={styles.memberHeader}>
            <Text style={styles.headerText}>멤버</Text>
            <Text style={styles.headerText}>{`${project.members.length}명`}</Text>
            <TouchableOpacity onPress={() => setIsMemberOpen(!isMemberOpen)}>
              {isMemberOpen ? (
                <MaterialCommunityIcons name="arrow-up-drop-circle" size={24} color="black" />
              ) : (
                <MaterialCommunityIcons name="arrow-down-drop-circle-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
          {isMemberOpen &&
            <View style={styles.memberContainer}>
              {project.members.map((val, idx) => (
                <View style={styles.chipContainer} key={`member_chip_${idx}`}>
                  <Chip
                    text={val.name}
                    color={val.isLeader ? colors.blue : colors.gray}
                  />
                </View>
              ))}
              <TouchableOpacity onPress={copyInvitationCode}>
                <Chip text='초대하기+' color={colors.dark} textColor={colors.white} textSize={rf(12)} />
              </TouchableOpacity>
            </View>}
        </View>

        <View style={{ marginTop: rh(30) }}>
          {futureEvents &&
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
            </View>}
          {pastEvents &&
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
            </View>}
        </View>

        {project.isOngoing &&
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => router.push({
              pathname: `/add/schedule`,
              params: {
                project_name: project.name
              }
            })}>
            <AntDesign name="pluscircle" size={rw(55)} color="black" />
          </TouchableOpacity>}
      </View>

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
  memberContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  chipContainer: {
    marginBottom: rh(20),
    marginRight: rw(9)
  },
  // memberChip: {
  //   fontSize: rf(14),
  //   paddingVertical: rh(6),
  //   paddingHorizontal: rw(20),
  //   borderRadius: 15,
  //   marginRight: rw(5),
  //   alignSelf: "flex-start"
  // },
  space: {
    height: rh(17)
  },
  floatingButton: {
    position: 'absolute',
    right: rw(10),
    bottom: rh(10),
    alignSelf: 'flex-end'
  }
})

export default ProjectDetailScreen