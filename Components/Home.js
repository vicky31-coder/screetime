import React from "react";
import { Text, StyleSheet, SafeAreaView, View, StatusBar, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font';
import * as Battery from 'expo-battery';

const Home = () => {
    const [ currentHours, setCurrentHours ] = useState("");
    const [ currentMinutes, setCurrentMinutes ] = useState("");
    const [ currentSeconds, setCurrentSeconds ] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [currentDay, setCurrentDay] = useState("");
    const [batteryLevel, setBatteryLevel] = useState(null);

    useEffect(() => {
      async function loadBatteryInfo() {
        const batteryInfo = await Battery.getPowerStateAsync();
        setBatteryLevel((batteryInfo.batteryLevel * 100).toFixed(0));
      }
      loadBatteryInfo();
      const intervalId = setInterval(loadBatteryInfo, 30000);
      return () => clearInterval(intervalId);
    }, []);

    useFonts({
        'sfprobold': require('../assets/fonts/sfprodisplaybold.ttf')
    });

    useEffect(() => {
        const interval = setInterval(() => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2,'0');
        const seconds = String(date.getSeconds()).padStart(2,'0');
        setCurrentHours(hours);
        setCurrentMinutes(minutes);
        setCurrentSeconds(seconds);
    }, 1000);

    return() => clearInterval(interval);
    }, []);

    useEffect(() => {
        const date = new Date();
        const dayOptions = { weekday: 'long' };
        const monthOptions = { month: 'long' };
        const formattedDay = new Intl.DateTimeFormat('en-US', dayOptions).format(date);
        setCurrentDay(formattedDay);
        const formattedDate = `${date.getDate()} ${new Intl.DateTimeFormat('en-US', monthOptions).format(date)} ${date.getFullYear()}`;
        setCurrentDate(formattedDate);
      }, []);

    return(
        <SafeAreaView>
            <View style = {styles.maincon}>
                <StatusBar hidden={true} />
                <View style = {styles.batterywrapper}>
                    <Image style = {styles.batteryicon} source={require('../assets/Images/l-icon.png')} />
                    <Text style = {styles.batteryindicator}>{batteryLevel}</Text>
                </View>
                <View style = {styles.flexwrappper}>
                    <Text style = {styles.hourstext}>{currentHours}</Text>
                    <Text style = {styles.colon}>:</Text>
                    <Text style = {styles.minutestext}>{currentMinutes}</Text>
                    <Text style = {styles.colon}>:</Text>
                    <Text style = {styles.secondstext}>{currentSeconds}</Text>
                </View>
                <View style = {styles.datedaywrapper}> 
                    <Text style = {styles.date}>{currentDate}</Text>
                    <Text style = {styles.day}>{currentDay}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    maincon: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    hourstext: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: 130
    },
    minutestext: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: 125
    },
    secondstext: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: 125
    },
    flexwrappper: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal:'16%',
        marginTop: '-15%',
        justifyContent:'center'
    },
    colon: {
        color: 'white',
        fontSize: 125
    },
    batteryindicator: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: 22.5,
        paddingLeft: 2
    },
    batterywrapper: {
        flex: 1,
        flexDirection: 'row',
        Height:'10%',
        Width: '10%',
        marginLeft: '88%',
        marginTop: '2.5%'
    },
    batteryicon: {
        width:'20%',
        height:'13%',
        marginTop: '5%',
    },
    datedaywrapper: {
        flex:1,
        flexDirection: 'column',
        marginTop: '-2.5%'
    },
    date: {
        color: 'white',
        fontFamily: 'sfprobold',
        textAlign: 'center',
        fontSize: 25
    },
    day: {
        color: 'white',
        fontFamily: 'sfprobold',
        textAlign: 'center',
        fontSize: 25
    }
})
