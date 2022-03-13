import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TotalScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TotalScreen</Text>
    </View>
  )
}

export default TotalScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#9ADCFF"
  },
})