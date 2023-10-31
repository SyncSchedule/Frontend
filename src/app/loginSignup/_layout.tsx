//
//로그인/회원가입 layout
//
import { Stack } from "expo-router";

export default ()=>{
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" />
            <Stack.Screen name="Signup" />
        </Stack>
    )
}