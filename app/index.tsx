import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const HomeScreen = () => {
    return (
        <View>
           <Link href={'/weather'}>WeatherScreen</Link>
        </View>
    )
}

export default HomeScreen