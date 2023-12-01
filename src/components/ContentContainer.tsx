import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

import { getKorTimeText } from '~/utils/date';

import { colors } from "~/styles/globalColors";
import { rw, rh, rf } from "~/styles/globalSizes";

interface EventContainerHomeProps {
  project_name: string;
  event_name: string;
  start: Date; //시작 시간 0-24
  end: Date; // 종료 시간 0-24
}

export function EventContainerHome({
  project_name, 
  event_name, 
  start, 
  end}: EventContainerHomeProps) {

  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.subTitle]}>{project_name}</Text>
        <Text style={[styles.title]}>{event_name}</Text>
        <Text style={[styles.detail]}>{`${getKorTimeText(start)} - ${getKorTimeText(end)}`}</Text>
      </View>
    </View>
  )
}

type eventStatus = "not" | "done" | "ready" | "finish";

interface EventStatusContainerProps {
  project_name: string;
  event_name: string;
  state: eventStatus;
}

export function EventStatusContainer({
  project_name,
  event_name,
  state
}: EventStatusContainerProps) {

  const state_kor = {
    "not": "미참여",
    "done" : "참여 완료",
    "ready": "확정 가능",
    "finish": "확정 완료"
  }

  return (
    <View style={[styles.container, {backgroundColor: `${state==="finish" ? "#E7E7E7" : colors.white}`}]}>
      <View>
        <Text style={[styles.subTitle]}>{project_name}</Text>
        <Text style={[styles.title, {color: `${state==="finish" ? "#7A7C81" : colors.black}`}]}>{event_name}</Text>
      </View>
      <View style={[styles.right]}>  
        <Text style={[{color: `${state==="not" ? colors.blue : state==="ready" ? "#FF0000" : "#7A7C81"}`}]}>{state_kor[state]}</Text>
      </View>
    </View>
  )
}

interface EventContainerProjectProps {
  event_name: string;
  isScheduled?: boolean;
  date?: Date;
  start?: Date; //시작 시간
  end?: Date; // 종료 시간
}

export function EventContainerProject({event_name, isScheduled, date, start, end}: EventContainerProjectProps) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.title]}>{event_name}</Text>
        <Text style={[styles.detail, {color: `${isScheduled ? "#7A7C81" : colors.blue}`}]}>
          {isScheduled 
            ? `${date!.getMonth()+1}월 ${date!.getDate()}일 · ${getKorTimeText(start!)} - ${getKorTimeText(end!)}` 
            : "조율 중"
          }
        </Text>
      </View>
    </View>
  )
}

interface ProjectContainerProps {
  project_name: string;
  members: string[];
  isOngoing: boolean;
}

export function ProjectContainer({project_name, members, isOngoing}: ProjectContainerProps) {
  
  return (
    <View style={[styles.container, { backgroundColor: isOngoing ? colors.white : "#E7E7E7" }]}>
      <View>
        <Text style={[styles.title, { color: isOngoing ? colors.black : "#7A7C81" }]}>{project_name}</Text>
        <Text style={[styles.detail]}>{members.join(", ")}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 13,
    flexDirection: 'row',
    paddingHorizontal: rw(10),
    paddingVertical: rh(17),
    position: 'relative',
    alignItems: 'center' 
  },
  title: {
    fontWeight: 'bold',
    fontSize: rf(15)
  },
  subTitle: {
    fontWeight: 'bold',
    color: "#7A7C81",
    marginBottom: rh(5),
  },
  detail: {
    color: "#7A7C81",
    fontSize: rf(15),
    marginTop: rh(5)
  },
  bold: {
    fontWeight: 'bold'
  },
  grayColor: {
    color: "#7A7C81",
  },
  right: {
    position: 'absolute',
    right: rw(10),
  },
  mg_bt_5: {
    marginBottom: rh(5),
  },
  mg_tp_5: {
    marginTop: rh(5)
  }
});