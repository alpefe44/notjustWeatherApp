import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import WeatherScreen from './weather'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar animated backgroundColor='white'></StatusBar>
            <Stack.Screen options={{ headerShown: false }} />
            <WeatherScreen></WeatherScreen>
        </View>
    )
}

export default HomeScreen