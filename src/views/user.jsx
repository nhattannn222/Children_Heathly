import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const UserScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  return (
   <Layout>
     <ScrollView style={styles.container}>
      
      {/* User Info */}
      <View style={styles.userInfoCard}>
        <Image
          source={{ uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-58.jpg' }} // Replace with actual avatar URL or local image
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user?.name}</Text>
      </View>
      
      {/* Menu List */}
      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text style={styles.menuText}>Cài đặt thiết bị</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="black" />
          <Text style={styles.menuText}>Giúp đỡ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
          <Text style={styles.menuText}>Về chúng tôi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=> dispatch(logout())}>
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={styles.menuText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
   </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  userInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default UserScreen;
