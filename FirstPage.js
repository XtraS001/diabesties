import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import React, { useState } from 'react';
import SignIn from "./SignIn";
import LanguageTab from './LanguageTab';


export default function FirstPage() {
    const [activeTab, setActiveTab] = useState("EN");
    
    return(
        <View style={styles.container}>
            <View
                style={{
                    flex: 0.2,
                    flexDirection: "row",
                }}
            >
               
                <Image source = {require("./assets/bloodDrop.png")}
                   style={{ width: 35.55, height: 40.55 }}
                />
                <Text style = {{fontSize:38, fontWeight:"bold",
                    color:"#66CCFF"}}
                    >
                    T-Manis
                </Text>             
            </View>
            <Image source = {require("./assets/robotHuman.png")}
                   style={{ width: 200, height: 250 }}
            />
            <Text style = {
                textStyles1.container
                } > Intelligent virtual health </Text>
            <Text style = {
                textStyles1.container
                } > coach for diabetes
                </Text>
            <Text style = { textStyles1.container
                } > management and intervention </Text>
        
            <LanguageTab activeTab={activeTab} setActiveTab={setActiveTab} />

            <Button 
               title='Sign In'
               color = '#6699CC'
               width = '283'
               height = '180'
               
              />
            <Button 
               title='Create Account'
            //fontColor = '#6699CC'
               backgroundColor = '#FFFFFF'
               borderColor = '#6699CC'
               width = '283'
               height = '180'
              />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    //   flexDirection:
    },
  });

const textStyles1 =StyleSheet.create({
    container: {
        fontSize:16, 
        color:"#999999",
        textAlign:"center",
    //   flexDirection:
    },
  });
