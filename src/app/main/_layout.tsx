//
//홈화면 layout
//
import { Tabs } from "expo-router";


export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="project" />
            <Tabs.Screen name="status" />
        </Tabs>
    )
}