import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather"; // Import icons
import { register } from "../thunks/authThunk"; // Ensure you have a register thunk
import moment from "moment"; // Import Moment.js

function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    deviceName: "",
    userName: "", // Added username field
    password: "",
    parentName: "",
    childName: "",
    phoneNumber: "",
    email: "",
    childHeight: "",
    childWeight: "",
    childBirthday: "",
  });

  const { isFetching } = useSelector((state) => state.authReducer);

  const inputRefs = {
    deviceName: useRef(null),
    userName: useRef(null), // Added username field reference
    password: useRef(null),
    parentName: useRef(null),
    childName: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
    childHeight: useRef(null),
    childWeight: useRef(null),
    childBirthday: useRef(null),
  };

  const handleRegister = async () => {
    console.log("Registering user:", user);
    try {
        const resultAction = await dispatch(register(user,navigation));
        
        if (register.fulfilled.match(resultAction)) {
            console.log("Registration successful:", resultAction.payload);
            navigation.navigate("Đăng nhập");
        } else {
            // Display error feedback to the user
            const errorMessage = resultAction.payload?.message || "Registration failed.";
            console.error("Registration error:", errorMessage);
            dispatch(setErrorsRegister({ message: errorMessage })); // Store errors in state if needed
        }
    } catch (error) {
        console.error("Error dispatching register:", error);
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
        dispatch(setErrorsRegister({ message: errorMessage }));
    }
};


  const handleInputChange = (name, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleKeyDown = (event, nextInputRef) => {
    if (event.nativeEvent.key === "Enter") {
      nextInputRef?.current?.focus();
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const age = moment().diff(moment(birthDate, "YYYY-MM-DD"), "years");
    return age;
  };

  useEffect(() => {
    inputRefs.parentName.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Đăng ký</Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tên đăng nhập</Text>
            <TextInput
              ref={inputRefs.userName}
              style={styles.input}
              placeholder="Nhập tên đăng nhập"
              value={user.userName}
              onChangeText={(text) => handleInputChange("userName", text)}
              returnKeyType="next"
              onKeyPress={(event) => handleKeyDown(event, inputRefs.parentName)}
            />
          </View>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ và tên phụ huynh</Text>
            <TextInput
              ref={inputRefs.parentName}
              style={styles.input}
              placeholder="Nhập họ và tên"
              value={user.parentName} // Use user.parentName to bind the state
              onChangeText={(text) => handleInputChange("parentName", text)} // Correct property here
              returnKeyType="next"
              onKeyPress={(event) => handleKeyDown(event, inputRefs.childName)}
            />
          </View>

          {/* Child's Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ và tên bé</Text>
            <TextInput
              ref={inputRefs.childName}
              style={styles.input}
              placeholder="Nhập họ và tên bé"
              value={user.childName}
              onChangeText={(text) => handleInputChange("childName", text)}
              returnKeyType="next"
              onKeyPress={(event) =>
                handleKeyDown(event, inputRefs.phoneNumber)
              }
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              ref={inputRefs.phoneNumber}
              style={styles.input}
              placeholder="Nhập số điện thoại"
              value={user.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              keyboardType="phone-pad"
              returnKeyType="next"
              onKeyPress={(event) => handleKeyDown(event, inputRefs.email)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              ref={inputRefs.email}
              style={styles.input}
              placeholder="Nhập địa chỉ email"
              value={user.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onKeyPress={(event) =>
                handleKeyDown(event, inputRefs.childHeight)
              }
            />
          </View>

          {/* Height Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Chiều cao (cm)</Text>
            <TextInput
              ref={inputRefs.childHeight}
              style={styles.input}
              placeholder="Nhập chiều cao"
              value={user.childHeight}
              onChangeText={(text) => handleInputChange("childHeight", text)}
              keyboardType="numeric"
              returnKeyType="next"
              onKeyPress={(event) =>
                handleKeyDown(event, inputRefs.childWeight)
              }
            />
          </View>

          {/* Weight Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cân nặng (kg)</Text>
            <TextInput
              ref={inputRefs.childWeight}
              style={styles.input}
              placeholder="Nhập cân nặng"
              value={user.childWeight}
              onChangeText={(text) => handleInputChange("childWeight", text)}
              keyboardType="numeric"
              returnKeyType="next"
              onKeyPress={(event) => handleKeyDown(event, inputRefs.deviceName)}
            />
          </View>

          {/* Device Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tên thiết bị kết nối</Text>
            <TextInput
              ref={inputRefs.deviceName}
              style={styles.input}
              placeholder="Nhập tên thiết bị"
              value={user.deviceName}
              onChangeText={(text) => handleInputChange("deviceName", text)}
              returnKeyType="next"
              onKeyPress={(event) =>
                handleKeyDown(event, inputRefs.childBirthday)
              }
            />
          </View>

          {/* Birth Date Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ngày sinh của bé</Text>
            <TextInput
              ref={inputRefs.childBirthday}
              style={styles.input}
              placeholder="Nhập ngày sinh (YYYY-MM-DD)"
              value={user.childBirthday}
              onChangeText={(text) => handleInputChange("childBirthday", text)}
              returnKeyType="done"
              onKeyPress={(event) => handleKeyDown(event)}
            />
          </View>

          {/* Display Age */}
          {user.childBirthday && (
            <Text style={styles.ageText}>
              Độ tuổi của bé: {calculateAge(user.childBirthday)} tuổi
            </Text>
          )}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                ref={inputRefs.password}
                style={styles.passwordInput}
                placeholder="Nhập mật khẩu"
                value={user.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onKeyPress={(event) => handleKeyDown(event)}
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

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>

          {/* Navigate to Login */}
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Đăng Nhập")}>
              <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#007BFF",
  },
  ageText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default Register;
