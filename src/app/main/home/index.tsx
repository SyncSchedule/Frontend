//
//메인화면 - 홈화면
//
import React, { useRef, useMemo, useState } from "react";

import { Button, StyleSheet, View, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { Feather, Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';

import { RootView } from "~/components/container";

import { dWidth, rf, rh, rw } from "~/styles/globalSizes";
import { fonts } from "~/styles/globalFonts";
import { colors } from "~/styles/globalColors";

const testSchedule = 'testSchedule'


const HomeScreen = () => {
    const refRBSheet = useRef<RBSheet>(null);

    const [pickerDate, setPickerDate] = useState<string | undefined>();
    const [selectMonth, setSelectMonth] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string | undefined>()


    //날짜 포맷
    let formatDate: string = useMemo(() => moment(selectMonth).format('YYYY.MM'), [selectMonth]);

    const YearMonthFunc = (): string[] => {
        const currentYear: number = new Date().getFullYear();
        const yearMonthArr: string[] = [];

        for (let year: number = 2010; year <= currentYear; year++) {
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



    return (
        <RootView>
            <View style={styles.dateView}>
                <Feather name="menu" size={rh(30)} color="black" />
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
                    [selectDate]: { selected: true, selectedColor: colors.black }

                }}
            />
            <View style={{ height: rh(1), width: rw(370), marginVertical: rh(20), backgroundColor: colors.devideLineGrey, alignSelf: 'center' }} />

            <Button title="일정 정보" onPress={() => router.push(`/main/home/${testSchedule}`)} />
            <Button title="일정 추가" onPress={() => router.push('/add/schedule')} />
            <Button title="드로어" onPress={() => router.push('/drawer')} />

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
})