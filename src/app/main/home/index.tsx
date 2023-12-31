//
//메인화면 - 홈화면
//
import React, { useRef, useMemo, useState, useEffect } from "react";

import { StyleSheet, View, Pressable, Text, FlatList, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import { useRecoilState } from 'recoil';

import { projectListState } from "~/atoms/projectAtom";

import { RootView } from "~/components/container";
import { EventContainerHome } from "~/components/ContentContainer";
import { Drawer } from "~/app/main/home/drawer";

import { getDayText } from "~/utils/date";

import { Event } from "~/types/globalTypes";

import { dWidth, rf, rh, rw } from "~/styles/globalSizes";
import { fonts } from "~/styles/globalFonts";
import { colors } from "~/styles/globalColors";



type EventDateType = {
    event: Event;
    projectName: string;
}


const HomeScreen = () => {
    const refRBSheet = useRef<RBSheet>(null);

    const [projectList, setProjectList] = useRecoilState(projectListState);
    //console.log('HomeScreen projectList', projectList)

    const [drawerVisible, setDrawerVisible] = useState(false)

    const [pickerDate, setPickerDate] = useState<string | undefined>();
    const [selectMonth, setSelectMonth] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string>(moment(new Date).format('YYYY-MM-DD'))
    //console.log('selectDate', selectDate)
    const [eventDate, setEventDate] = useState<EventDateType[]>([])
    //console.log('eventDate', eventDate)

    const [markedDay, setMarkedDay] = useState<Object>({})
    //console.log('markedDay', markedDay)

    useEffect(() => {
        if (!projectList.length)
            return;

        var md: object = {}
        var ed: EventDateType[] = []

        projectList.forEach(project => {
            var projectName = project.name
            project.events.forEach(event => {
                if (event.isScheduled && event.date) {
                    var d = event.date.format("YYYY-MM-DD")
                    md[`${d}`] = {
                        marked: true,
                        markedColor: "orange",
                    }

                    ed.push({ event, projectName });
                }
            })
        })

        setEventDate([...ed])
        setMarkedDay({ ...md })
    }, [projectList])


    //날짜 포맷
    let formatDate: string = useMemo(() => moment(selectMonth).format('YYYY.MM'), [selectMonth]);

    const YearMonthFunc = (): string[] => {
        const currentYear: number = new Date().getFullYear();
        const yearMonthArr: string[] = [];

        for (let year: number = 2010; year <= currentYear + 1; year++) {
            for (let month: number = 1; month <= 12; month++) {
                yearMonthArr.push(`${year}년 ${month}월`);
            }
        }

        return yearMonthArr;
    };
    const yearMonthArray = YearMonthFunc();


    const handlePicker = (value: string | undefined) => {
        if (value) {
            const year: string = value.slice(0, 4);
            const month: string = value.slice(6, -1);
            setSelectMonth(new Date(`${year}-${month}`));
        }

        if (refRBSheet.current) {
            refRBSheet.current.close();
        }
    }

    const renderItem = ({ item }: any) => {
        //console.log('item', item)
        if (moment(item.event.date).format("YYYY-MM-DD") == selectDate) {
            return (
                <Pressable onPress={() => router.push({
                    pathname: `/scheduleDetail/${item.event.name}`,
                    params: {
                        eventName: item.event.name,
                        projectName: item.projectName
                    }
                })} style={{ marginVertical: rh(3) }}>
                    <EventContainerHome
                        project_name={item.projectName}
                        event_name={item.event.name}
                        start={item.event.start}
                        end={item.event.end}
                    />
                </Pressable>
            )
        } else {
            return <View />
        }
    }

    return (
        <RootView>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.dateView}>
                <Pressable onPress={() => setDrawerVisible(true)}>
                    <Feather name="menu" size={rh(30)} color="black" />
                </Pressable>
                <Pressable onPress={() => refRBSheet.current?.open()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: rw(8) }}>
                    <Text style={styles.dateText}>{formatDate}</Text>
                    <Ionicons name="md-caret-down-outline" size={rw(16)} color="black" style={{ marginLeft: rw(5) }} />
                </Pressable>
            </View>
            <Calendar
                initialDate={moment(selectMonth).format('YYYY-MM-01')}
                hideArrows
                customHeaderTitle={<Text></Text>}
                onDayPress={day => {
                    setSelectDate(day.dateString);
                }}
                markedDates={{
                    [selectDate]: { selected: true, selectedColor: colors.black },
                    ...markedDay
                }}
            />
            <View style={{ height: rh(1), width: rw(370), marginVertical: rh(20), backgroundColor: colors.devideLineGrey, alignSelf: 'center' }} />

            <View style={styles.eventView}>
                <Text style={styles.dateText}>{new Date(selectDate).getDate()}.  {getDayText(new Date(selectDate).getDay())}</Text>

                <FlatList
                    data={eventDate}
                    renderItem={renderItem}
                />
            </View>

            {/* 드로어 */}
            <Drawer isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} />

            {/* 날짜 선택 bottomSheet */}
            <RBSheet
                ref={refRBSheet}
                height={rh(320)}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        borderRadius: 10,
                    },
                    draggableIcon: {
                        backgroundColor: colors.textGrey
                    }
                }}
            >
                <Pressable onPress={() => handlePicker(pickerDate)} style={styles.selectView} >
                    <Text style={styles.text}>선택</Text>
                </Pressable>
                <WheelPickerExpo
                    height={rh(260)}
                    width={dWidth}
                    initialSelectedIndex={yearMonthArray.indexOf(moment(selectMonth).format('YYYY년 M월'))}
                    items={yearMonthArray.map(name => ({ label: name, value: name }))}
                    onChange={({ item }) => setPickerDate(item.value)}
                />
            </RBSheet>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => router.push(
                    `/add/schedule`,

                )}>
                <AntDesign name="pluscircle" size={rw(55)} color="black" />
            </TouchableOpacity>
        </RootView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    dateView: {
        width: dWidth,
        height: rh(60),
        paddingHorizontal: rw(20),
        flexDirection: 'row',
        alignItems: 'center'
    },

    dateText: {
        fontFamily: fonts.bold,
        fontSize: rf(23),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    text: {
        fontFamily: fonts.medium,
        fontSize: rf(18),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    selectView: {
        paddingHorizontal: rw(20),
        alignItems: 'flex-end'
    },

    eventView: {
        paddingHorizontal: rw(20)
    },

    floatingButton: {
        position: 'absolute',
        right: rw(10),
        bottom: rh(10),
        alignSelf: 'flex-end'
    },
})