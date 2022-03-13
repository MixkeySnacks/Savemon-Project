import {
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../database/firebaseDB";
import { useNavigation } from "@react-navigation/core";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        const unsubsribe = auth.onAuthStateChanged(user =>{
            if(user){
                navigation.replace("bottomTap")
            }
        })
        return unsubsribe
    },[])
  const handerSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Register with :',user.email);
      }).catch(error => alert(error.message))
  }
  const handerSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with :',user.email);
      }).catch(error => alert(error.message))
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
      <Image
        style={styles.tinyLogo}
        source={require('../images/logo.png')}
      />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handerSignIn} style={styles.button}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handerSignUp}
          style={[styles.button, styles.buttionOutline]}
        >
          <Text style={styles.buttionOutlineText}> Register </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#C1F4C5"
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
  buttionOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttionOutlineText: {},
});
