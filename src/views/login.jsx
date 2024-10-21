import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather"; // Import icons
// import ButtonComponent from "../components/ButtonComponent"; // Ensure ButtonComponent is compatible with React Native
import { loadTokenFromStorage } from "../services/AuthService";
import { login } from "../thunks/authThunk";

function Login() {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ idUser: "", password: "" });
  const { isFetching } = useSelector((state) => state.authReducer);
  const authToken = loadTokenFromStorage();

  const handleLogin = () => {
    dispatch(login(user));
  };

  const handleInputChange = (name, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.nativeEvent.key === "Enter") {
      handleLogin();
    }
  };

  useLayoutEffect(() => {
    // Handle this equivalent action in React Native if necessary
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng nhập</Text>

        {/* idUser Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={user?.idUser}
            onChangeText={(text) => handleInputChange("idUser", text)}
            keyboardType="idUser-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onKeyPress={handleKeyDown}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              value={user.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              onKeyPress={handleKeyDown}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconContainer}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <View style={{ display: "flex", flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleLogin} style={{width: "48%", marginRight: '2%'}}>
            <Text style={styles.loginButton}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: "48%", marginLeft: '2%'}} onPress={() => navigation.navigate("Đăng Ký")}>
            <Text style={styles.registerButton}>Đăng kí</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password and Account Verification */}
        <View style={styles.linkContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 10,
  },
  loginButton: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "bold",
  },
  registerButton: {
    color: "white",
    textAlign: "center",
    backgroundColor: "#f2333f",
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  linkText: {
    color: "#4A90E2",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default Login;
