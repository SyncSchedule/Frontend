//
//메인화면 - 현황 화면
//
import React from "react";

import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { rw, rh, rf } from "~/styles/globalSizes";
import { RootView } from "~/components/container";
import { EventStatusContainer } from "~/components/ContentContainer";

type eventStatus = {
    projectName: string;
    eventName: string;
    state: "not" | "done" | "ready" | "finish";
}

const StatusScreen = () => {
    const dummy: eventStatus[] = [
        {
            projectName: "오픈소스SW프로젝트",
            eventName: "주제 선정",
            state: "not"
        }, 
        {
            projectName: "졸업프로젝트",
            eventName: "중간 발표 자료 준비",
            state: "done"
        },
        {
            projectName: "UX 디자인",
            eventName: "화면 설계",
            state: "ready"
        },
        {
            projectName: "UX 디자인",
            eventName: "주제 발표",
            state: "finish"
        },
    ];

    function moveToStatusDetail(es: eventStatus) {
        if (es.state !== "finish") {
            if (es.state === "ready") {
                router.push(`/main/status/FixStatus`);
            } else {
                router.push(`/main/status/${es.projectName}_${es.eventName}`);
            }
        }
    }

    return (
        <RootView>
            <View style={styles.container}>
                <View style={[styles.header]}>
                    <Text style={[styles.headerTitle]}>현황</Text>
                    <Text style={[styles.headerFilter]}>생성일 순 ∨</Text>
                </View>
                <View>
                    <FlatList 
                        data={dummy}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => moveToStatusDetail(item)}>
                                <EventStatusContainer
                                    project_name={item.projectName}
                                    event_name={item.eventName}
                                    state={item.state}
                                />
                                <View style={styles.space}></View>
                            </TouchableOpacity> 
                        }
                    />
                </View>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    container : {
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