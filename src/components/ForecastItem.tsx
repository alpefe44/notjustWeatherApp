import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { WeatherForecast } from '../../app/weather'
import dayjs from 'dayjs'

type Props = {
    item: WeatherForecast
}


const ForecastItem = ({ item }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.temp}>{Math.round(item.main.temp)}°</Text>
            <Text style={styles.date}>{dayjs(item.dt * 1000).format('ddd h a')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        aspectRatio: 3 / 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'gainsboro',
        borderWidth: StyleSheet.hairlineWidth,
    },
    temp: {
        fontSize: 32,
        color: 'gray',
        fontWeight: 'bold'
    },
    date: {
        color: 'ghostwhite',
        fontSize: 16,
    }


})

export default ForecastItem