import { View, Text, ActivityIndicator, StyleSheet, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import ForecastItem from '../src/components/ForecastItem';
import { Stack } from 'expo-router';


const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

const bgImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg';


console.log(OPEN_WEATHER_KEY)


type MainWeather = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;

}


export type Weather = {
    name: String;
    main: MainWeather;
};


export type WeatherForecast = {
    main: MainWeather;
    dt: number;
}

const WeatherScreen = () => {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [weather, setWeather] = useState<Weather>();
    const [forecast, setForecast] = useState<WeatherForecast[]>()

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location, "Location")
            setLocation(location);
        })();
    }, []);


    const fetchWeather = async () => {

        if (!location) {
            return
        }
        try {
            const result = await fetch(`${BASE_URL}/weather?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`);
            const data = await result.json();
            setWeather(data);
        } catch (error) {
            console.log(error)
        }


    }

    const fetchForeCast = async () => {

        if (!location) {
            return
        }

        try {
            const result = await fetch(`${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`);
            const data = await result.json();
            setForecast(data.list)

        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        if (location) {
            fetchWeather();
            fetchForeCast();
        }
    }, [location])

    if (!weather) {
        return <ActivityIndicator></ActivityIndicator >
    }


    return (
        <ImageBackground source={{ uri: bgImage }} style={styles.container}>

            <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
            <View
                style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' }}
            />


            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.location}>{weather?.name}</Text>
                <Text style={styles.temp}>{Math.round(weather?.main.temp)}°</Text>
            </View>

            <FlatList
                data={forecast}
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0, height: 200, margin: 15 }}
                contentContainerStyle={{ gap: 10 }}
                horizontal
                renderItem={({ item }) => <ForecastItem item={item} ></ForecastItem>}
            />
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    location: {
        fontSize: 30,
        color: 'lightgray',
    },
    temp: {
        fontSize: 150,
        color: '#FEFEFE',
        textAlign: 'center',
    }
})

export default WeatherScreen