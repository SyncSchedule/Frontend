//
//홈화면 layout
//
import { Image , StyleSheet} from "react-native";
import { Tabs } from "expo-router";

import { rh } from "~/styles/globalSizes";

const project = require("~/assets/project.png")
const project_focus = require("~/assets/project_focus.png")
const home = require("~/assets/home.png")
const home_focus = require('~/assets/home_focus.png')
const status = require("~/assets/status.png")
const status_focus = require("~/assets/status_focus.png")

export default () => {
    return (
        <Tabs initialRouteName="home" screenOptions={{ tabBarShowLabel: false, headerShown:false }}>
            <Tabs.Screen name="project" options={{
                tabBarIcon: ({ focused }) => <Image source={focused ? project_focus : project} style={styles.icon}/>
            }} />
            <Tabs.Screen name="home" options={{
                tabBarIcon: ({ focused }) => <Image source={focused ? home_focus : home} style={styles.icon}/>
            }} />
            <Tabs.Screen name="status" options={{
                tabBarIcon: ({ focused }) => <Image source={focused ? status_focus : status} style={styles.icon}/>
            }} />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    icon:{
        width:rh(30),
        height:rh(30),
        marginTop:rh(15)
    }
})