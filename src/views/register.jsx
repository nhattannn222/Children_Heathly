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
    fullName: "",
    childName: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
    deviceName: "",
    password: "",
    birthDate: "",
    username: "", // Thêm trường username
  });
  const { isFetching } = useSelector((state) => state.authReducer);
  
  const inputRefs = {
    fullName: useRef(null),
    childName: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    height: useRef(null),
    weight: useRef(null),
    deviceName: useRef(null),
    password: useRef(null),
    birthDate: useRef(null),
    username: useRef(null), // Thêm ref cho username
  };

  const handleRegister = () => {
    dispatch(register(user)); // Call your register thunk with user data
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
    inputRefs.fullName.current?.focus();
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
              ref={inputRefs.username}
              style={styles.input}
              placeholder="Nhập tên đăng nhập"
              value={user.username}
              onChangeText={(text) => handleInputChange("username", text)}
              returnKeyType="next"
              onKeyPress={(event) => handleKeyDown(event, inputRefs.fullName)}
            />
          </View>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ và tên phụ huynh</Text>
            <TextInput
              ref={inputRefs.fullName}
              style={styles.input}
              placeholder="Nhập họ và tên"
              value={user.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
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
              onKeyPress={(event) => handleKeyDown(event, inputRefs.phone)}
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              ref={inputRefs.phone}
              style={styles.input}
              placeholder="Nhập số điện thoại"
              value={user.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
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
              onKeyPress={(event) => handleKeyDown(event, inputRefs.height)}
            />
          </View>

          {/* Height Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Chiều cao (cm)</Text>
            <TextInput
              ref={inputRefs.height}
              style={styles.input}
              placeholder="Nhập chiều cao"
              value={user.height}
              onChangeText={(text) => handleInputChange("height", text)}
              keyboardType="numeric"
              returnKeyType="next"
              onKeyPress={(event) => handleKeyDown(event, inputRefs.weight)}
            />
          </View>

          {/* Weight Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cân nặng (kg)</Text>
            <TextInput
              ref={inputRefs.weight}
              style={styles.input}
              placeholder="Nhập cân nặng"
              value={user.weight}
              onChangeText={(text) => handleInputChange("weight", text)}
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
              onKeyPress={(event) => handleKeyDown(event, inputRefs.birthDate)}
            />
          </View>

          {/* Birth Date Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ngày sinh của bé</Text>
            <TextInput
              ref={inputRefs.birthDate}
              style={styles.input}
              placeholder="Nhập ngày sinh (YYYY-MM-DD)"
              value={user.birthDate}
              onChangeText={(text) => handleInputChange("birthDate", text)}
              returnKeyType="done"
              onKeyPress={(event) => handleKeyDown(event)}
            />
          </View>

          {/* Display Age */}
          {user.birthDate && (
            <Text style={styles.ageText}>
              Độ tuổi của bé: {calculateAge(user.birthDate)} tuổi
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
          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  scrollContainer: {
    flexGrow: 1,
    width: Dimensions.get('window').width * 0.95,
  },
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007BFF",
    fontSize: 16,
  },
  ageText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Register;
