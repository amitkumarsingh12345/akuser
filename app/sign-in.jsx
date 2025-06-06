import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [reg_mobile, setMobile] = useState("");
  const [reg_password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    reg_mobile: "",
    reg_password: "",
  });

  const validateForm = () => {
    const newErrors = {
      reg_mobile: "",
      reg_password: "",
    };

    if (!reg_mobile.trim()) {
      newErrors.reg_mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(reg_mobile)) {
      newErrors.reg_mobile = "Invalid mobile number";
    }

    if (!reg_password) {
      newErrors.reg_password = "Password is required";
    } else if (reg_password.length < 6) {
      newErrors.reg_password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    await login(reg_mobile, reg_password);
    setIsLoading(false);
  };

  const handleMobileChange = (text) => {
    setMobile(text);
    if (errors.reg_mobile) {
      setErrors({ ...errors, reg_mobile: "" });
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errors.reg_password) {
      setErrors({ ...errors, reg_password: "" });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {/* Logo or App Name */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/ak-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            placeholder="Enter your mobile number"
            placeholderTextColor="#999"
            value={reg_mobile}
            onChangeText={handleMobileChange}
            style={[styles.input, errors.reg_mobile ? styles.inputError : null]}
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={10}
          />
          {errors.reg_mobile ? (
            <Text style={styles.errorText}>{errors.reg_mobile}</Text>
          ) : null}

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={reg_password}
              onChangeText={handlePasswordChange}
              style={[
                styles.input,
                errors.reg_password ? styles.inputError : null,
              ]}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          {errors.reg_password ? (
            <Text style={styles.errorText}>{errors.reg_password}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/register")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginBottom: 15,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 13,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#0066cc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  signUpText: {
    color: "#0066cc",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default LoginScreen;
