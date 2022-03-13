import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import TotalScreen from './TotalScreen'
import HomeScreen from './HomeScreen'
import WalletScreen from './WalletScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

function BottomTap() {
  return (
    <Tab.Navigator
       screenOptions={{
         tabBarStyle:{
           height: 60,
           position:'absolute',
           bottom: 16,
           left: 16,
           right: 16,
           borderRadius: 16,
         }
       }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name={focused ? "home" : "home"} size={30} color={focused ? "#B8FFF9" : "black"} />
          ),
        }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen} 
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) => (
            <Icon name={focused ? "user" : "user"} size={25} color={focused ? "#FFBED8" : "black"} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTap

const styles = StyleSheet.create({})