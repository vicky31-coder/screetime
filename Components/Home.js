import { Text, StyleSheet, SafeAreaView, View, StatusBar, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font';
import * as Battery from 'expo-battery';
import { responsiveScreenFontSize } from "react-native-responsive-dimensions";

const Home = () => {

    const [ currentHours, setCurrentHours ] = useState("");
    const [ currentMinutes, setCurrentMinutes ] = useState("");
    const [ currentSeconds, setCurrentSeconds ] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [currentDay, setCurrentDay] = useState("");
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [batteryState, setBatteryState] = useState(null);

    useEffect(() => {
      async function loadBatteryInfo() {
        const batteryInfo = await Battery.getPowerStateAsync();
        setBatteryLevel((batteryInfo.batteryLevel * 100).toFixed(0));
      }
      loadBatteryInfo();
      const intervalId = setInterval(loadBatteryInfo, 30000);
      return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        async function loadBatteryState() {
          const batteryStateInfo = await Battery.getPowerStateAsync();
          setBatteryState(batteryStateInfo.batteryState);
        }
        loadBatteryState();
        const intervalId1 = setInterval(loadBatteryState, 1000);
        return () => clearInterval(intervalId1);
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
                    {batteryState === 1 ? null : batteryState === 2 && <Text style={styles.chargecondition}>Charging -</Text>}
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
        fontSize: responsiveScreenFontSize(16)
    },
    minutestext: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: responsiveScreenFontSize(16)
    },
    secondstext: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: responsiveScreenFontSize(16)
    },
    flexwrappper: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal:'16%',
        marginTop: '3%',
        justifyContent:'center'
    },
    colon: {
        color: 'white',
        fontSize: responsiveScreenFontSize(16),
        fontFamily: 'sfprobold',
        marginTop: '-1.5%',
        marginHorizontal:'1%'
    },
    batteryindicator: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: responsiveScreenFontSize(3),
        paddingLeft: 2
    },
    batterywrapper: {
        flexDirection: 'row',
        Height:'10%',
        Width: '10%',
        marginTop: '2%',
        marginLeft: 'auto',
        marginRight: '4%'
    },
    batteryicon: {
        width: '3%',
        height: '70%',
        marginTop: '0.8%'
    },
    chargecondition: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: responsiveScreenFontSize(3)
    },
    datedaywrapper: {
        flex:1,
        flexDirection: 'column',
        marginTop: '1%'
    },
    date: {
        color: 'white',
        fontFamily: 'sfprobold',
        textAlign: 'center',
        fontSize: responsiveScreenFontSize(3.8)
    },
    day: {
        color: 'white',
        fontFamily: 'sfprobold',
        textAlign: 'center',
        fontSize: responsiveScreenFontSize(3.8)
    }
})
