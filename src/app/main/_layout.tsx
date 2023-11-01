//
//홈화면 layout
//
import { Tabs } from "expo-router";


export default () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="project" />
            <Tabs.Screen name="status" />
        </Tabs>
    )
}