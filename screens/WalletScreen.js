import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { auth } from "../database/firebaseDB";
import React from "react";
import { useNavigation } from "@react-navigation/core";
const WalletScreen = () => {
  const navigation = useNavigation();
  const handerSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize:16}}>Email : {auth.currentUser?.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handerSignOut} style={styles.button}>
          <Text style={styles.buttonText}> Sign Out </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBED8",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
