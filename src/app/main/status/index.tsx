//
//메인화면 - 현황 화면
//
import React, { useEffect } from "react";

import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { rw, rh, rf } from "~/styles/globalSizes";
import { RootView } from "~/components/container";
import { EventStatusContainer } from "~/components/ContentContainer";
import { useRecoilState, useRecoilValue } from "recoil";
import { statusListState } from "~/atoms/statusAtom";
import { Status } from "~/types/globalTypes";
import { projectListState } from "~/atoms/projectAtom";
import { UserState } from "~/atoms/UserAtom";

type eventStatus = {
    projectName: string;
    eventName: string;
    state: "not" | "done" | "ready" | "finish";
}

const StatusScreen = () => {
    const [statusList, setStatusList] = useRecoilState(statusListState);
    const projectList = useRecoilValue(projectListState);
    const User = useRecoilValue(UserState)

    function moveToStatusDetail(status: Status) {
        const { project_name, event_name } = status;

        const state = getState(status);

        if (state !== "finish") {
            if (state === "ready")
                router.push({
                    pathname: `/main/status/FixStatus`,
                    params: {
                        project_name: project_name,
                        event_name: event_name,
                    }
                });
            else //not, done
                router.push({
                    pathname: `/main/status/${project_name}_${event_name}`,
                    params: {
                        project_name: project_name,
                        event_name: event_name,
                        state: state
                    }
                });
        }
    }

    function getState(status: Status) {
        const { project_name, status_by_member, isFinished } = status;

        if (isFinished)
            return "finish";//확정 완료

        const project = projectList.find((val) => val.name === project_name);

        const members = project!.members;

        if (status_by_member.length === members.length)
            return "ready";//확정 가능

        if (status_by_member.some((val) => val.name === "김건국"))
            return "done";//참여 완료
        else
            return "not";//미참여

    }

    const renderItem = ({ item }: { item: Status }) => {
        const project = projectList.find(p => p.name === item.project_name);

        const isMember = project!.members.find(m => m.id === User.id)

        if (isMember) {
            return (
                <TouchableOpacity onPress={() => moveToStatusDetail(item)}>
                    <EventStatusContainer
                        project_name={item.project_name}
                        event_name={item.event_name}
                        state={getState(item)}
                    />
                    <View style={styles.space}></View>
                </TouchableOpacity>
            )
        } else {
            return;
        }
    }

    return (
        <RootView>
            <View style={styles.container}>
                <View style={[styles.header]}>
                    <Text style={[styles.headerTitle]}>현황</Text>
                    <Text style={[styles.headerFilter]}>생성일 순 ∨</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={statusList}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(18),
        paddingTop: rh(19),
        flex: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: rh(25),
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: rf(20),
        fontWeight: 'bold'
    },
    headerFilter: {
        fontSize: rf(15),
        position: 'absolute',
        right: 0
    },
    space: {
        height: rh(17)
    }
});

export default StatusScreen;