//
//global layout style
//
import { RecoilRoot } from 'recoil'
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';

import { rh } from '~/styles/globalSizes';

export default () => {
    return (
        <RecoilRoot>
            <SafeAreaView style={styles.container}>
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
        </RecoilRoot>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS == "android" ? rh(45) : 0,
      paddingBottom: Platform.OS == "android" ? rh(15) : 0
    }
  })