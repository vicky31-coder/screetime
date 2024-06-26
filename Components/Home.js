import { Text, StyleSheet, SafeAreaView, View, StatusBar, Image } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font';
import * as Battery from 'expo-battery';
import { responsiveScreenFontSize } from "react-native-responsive-dimensions";
import NetInfo from "@react-native-community/netinfo";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Home = () => {
    const [ currentHours, setCurrentHours ] = useState("");
    const [ currentMinutes, setCurrentMinutes ] = useState("");
    const [ currentSeconds, setCurrentSeconds ] = useState("");
    const [ currentDate, setCurrentDate ] = useState("");
    const [ currentDay, setCurrentDay ] = useState("");
    const [ batteryLevel, setBatteryLevel ] = useState(null);
    const [ batteryState, setBatteryState ] = useState(null);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ meridian, setMeridian ] = useState('');
    const [ isWifiConnected, setIsWifiConnected ] = useState(false)
    const [ wifiCondition, setWifiCondition] = useState(false)
    const motivtext = [
        ' " In a world full of struggles have hope" ',
        ' " Dont give up on fighting for love " ',
        ' " Get it done " ',
        ' " want a future pav the way " ',
        ' " Go chase it buddy " ',
        ' " Dont have time make some " ',
        ' " There will not be always a second chance " ',
        ' " Smile a bit " ',
        ' " Oppurtunities doesnt lie on the floor so make some " ',
        ' " Consistency is the key " ',
        ' " Show progression not perfection " ',
        ' " If you help someone it will come by " ',
        ' " Show them what they didnt expect to see! " ',
        ' " Some mark sheets doesnt define ur life " ',
    ]

    useEffect(() => {
        const WifiConnectedCondition = NetInfo.addEventListener(state => {
          setIsWifiConnected(state.type === 'wifi' && state.isConnected);
        });
        return () => WifiConnectedCondition();
      }, []);

    useEffect(() => {
        const wifiCondition = NetInfo.addEventListener(state => {
            setWifiCondition(state.type === 'wifi');
        });
        return () => wifiCondition();
    }, []);

    useEffect(() => {
        const updateMessage = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % motivtext.length);
        };
        const intervalId = setInterval(updateMessage, 2*30*15000); // 1 hour cyclic text interval
        return () => clearInterval(intervalId);
      }, []);

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

    useFonts ({
        'sfprobold': require('../assets/fonts/sfprodisplaybold.ttf'),
        'sfprobolditalic': require('../assets/fonts/sfprodisplaybolditalic.ttf')
    })

    useEffect(() => {
        const interval = setInterval(() => {
        const date = new Date();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        setCurrentHours(String(hours).padStart(2,'0'));
        setCurrentMinutes(String(minutes).padStart(2,'0'));
        setCurrentSeconds(String(seconds).padStart(2,'0'));
        setMeridian(ampm);
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
                <View style = {styles.header}>
                    <View>
                    { isWifiConnected && wifiCondition && <Icon name="wifi-check" style={styles.wificonnected} />}
                    {!isWifiConnected && wifiCondition && <Icon name="wifi-remove" style={styles.wifinotconnected} />}
                    {!wifiCondition && <Icon name="wifi-off" style={styles.wifioff} />}
                    </View>
                    <View style = {styles.batterywrapper}>
                        {batteryState === 1 ? null : batteryState === 2 && <Text style={styles.chargecondition}>Charging -</Text>}
                        <Icon name="lightning-bolt" style = {styles.batteryicon} />
                        <Text style = {styles.batteryindicator}>{batteryLevel}</Text>
                    </View>
                </View>
                <View style = {styles.motivationtextcon}>
                    <Text style = {styles.motivationtext}>{motivtext[currentIndex]}</Text>
                </View>
                <View style = {styles.flexwrappper}>
                    <Text style = {styles.hourstext}>{currentHours}</Text>
                    <Text style = {styles.colon}>:</Text>
                    <Text style = {styles.minutestext}>{currentMinutes}</Text>
                    <Text style = {styles.colon}>:</Text>
                    <Text style = {styles.secondstext}>{currentSeconds}</Text>
                    <Text style = {styles.meridian}>{meridian}</Text>
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
    header: {
        flex:1 ,
        flexDirection:'row',
        marginTop: '2%'
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
    meridian: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: responsiveScreenFontSize(3),
        marginTop: '18%',
        marginLeft: '2%'
    },
    flexwrappper: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal:'16%',
        marginTop: '-16%',
        justifyContent:'center',
        marginRight: '10%'
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
        fontSize: responsiveScreenFontSize(2.5),
        paddingLeft: 1
    },
    batterywrapper: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: '4%'
    },
    batteryicon: {
        color: 'white',
        fontSize: responsiveScreenFontSize(2.5),
        marginTop: '0.6%'
    },
    chargecondition: {
        color: 'white',
        fontFamily: 'sfprobold',
        fontSize: responsiveScreenFontSize(2.5)
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
    },
    motivationtext: {
        color: 'white',
        fontFamily: 'sfprobolditalic',
        fontSize: responsiveScreenFontSize(3),
    },
    motivationtextcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '-10%',
        marginRight: '2%'
    },
    wifioff: {
        color:'white',
        fontSize: responsiveScreenFontSize(2.5),
        paddingLeft: '2%'
    },
    wificonnected: {
        color:'white',
        fontSize: responsiveScreenFontSize(2.5),
        paddingLeft: '2%'
    },
    wifinotconnected: {
        color:'white',
        fontSize: responsiveScreenFontSize(2.5),
        paddingLeft: '2%'
    }
})
