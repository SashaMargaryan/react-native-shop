import { React, useState } from "react";
import {
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image
} from "react-native";

const Login = ({navigation}) => {
     
  const [email, setEmail] = useState(() => '');
  const [password, setPassword] = useState(() => "");
  const [logged, setLogged] = useState (() =>1);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const sendOpen = () => {
    const e = "A";
    const p = 1;
    
    if(email == e && password == p) {
      navigation.push("home")
      setEmailMessage('')
      setPasswordMessage("")
      
    } else if (email != e || password != p) {
      setLogged( () => 1)
      setEmailMessage("email no string")
      setPasswordMessage("password no number")
    }
   
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')}  style={styles.container}>
          <Text style={styles.inputTitle}>Enter your E-mail</Text>  
          <TextInput
            style={styles.input}
            placeholder = "Email" 
            // placeholderTextColor = "white"
            onChangeText={value => setEmail(value)}
          />
          <Text style={styles.inputText}>{emailMessage}</Text>
          <Text style={styles.inputTitle}>Enter your Password</Text>
          <TextInput 
            style={styles.input}
            placeholder = "Password"
            underlineColorAndroid = "transparent"
            autoCapitalize = "none"
            // placeholderTextColor = "white"
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}  
          />
          <Text style={styles.inputText}>{passwordMessage}</Text>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={sendOpen}
          >
            <Text style={styles.submitButtonText}>Login</Text>
          </TouchableOpacity>
    </ImageBackground >
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      position: "relative",
      width: "100%",
      height: "100%"
    },
    submitButton: {
      backgroundColor: '#000000',
      padding: 10,
      margin: 15,
      height: 40,
      alignItems: "center",
   },
   submitButtonText:{
    color: 'white',
  },
    input: {
      margin: 12,
      marginBottom: 0,  
      height: 40,
      borderColor: '#FF8000',
      borderWidth: 1,
      color: '#000000',
      borderBottomColor: "#000000",
      borderBottomWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomEndRadius: 0,
      borderTopColor: 0
   },
   inputText: {
    color: "red",
    justifyContent: "center",
    alignItems: "center",
    left: 15,
    margin: 0
   },
   inputTitle: {
    left: 13,
    fontSize: 20,
    fontWeight: "500",
    color: "#000000"
   },
   imageBeg: {
    justifyContent: "center",
    flex: 1,
    resizeMode: "cover"
   }
  });

export default Login;