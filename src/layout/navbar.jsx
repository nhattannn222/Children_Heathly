import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import home from '../../assets/home.png'
import user from '../../assets/user.png'
import bell from '../../assets/bell.png'
import address from '../../assets/address.png'
import chatbot from '../../assets/chatbot.png'
import dashboard from '../../assets/dashboard.webp'
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Trang chủ")}>
        <Image
          source={home} // Path to your home icon
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}  onPress={() => navigation.navigate("location")}>
        <Image
          source={address} // Path to your location icon
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}  onPress={() => navigation.navigate("Chatbot")}>
        <Image
          source={chatbot} // Path to your location icon
          style={styles.icon}
        />
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Dashboard")}>
        <Image
          source={dashboard} // Path to your user/profile icon
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Thông báo")}>
        <Image
          source={bell} // Path to your notification bell icon
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Trang cá nhân")}>
        <Image
          source={user} // Path to your user/profile icon
          style={styles.icon}
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Footer;
