import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Layout from '../layout/layout';
import axios from 'axios'; // To make HTTP requests
import { API } from "../constants/api"
import { useDispatch, useSelector } from "react-redux";

const NotificationItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[ 
        styles.notificationContainer, 
        { borderLeftColor: item.color, backgroundColor: item.read ? '#ffffff' : '#e0f7fa' }
      ]}
    >
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // For loading indicator
  const user = useSelector((state) => state.authReducer.user);
  // Function to fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      let obj = {
        endTs: new Date().toISOString() // Lấy thời gian hiện tại dưới dạng UTC ISO 8601
      };
      
      // Tạo startTs là endTs trừ đi 1 phút
      let endDate = new Date(); // Thời gian hiện tại
      let startDate = new Date(endDate.getTime() - 1 * 6000 * 1000); // Trừ đi 1 phút (60 giây * 1000 ms)
      
      obj.startTs = startDate.toISOString(); // Thêm startTs vào obj

      const response = await axios.post(`${API.uri}/devices/notify/${user?.deviceName}`,obj); // Replace with your actual API endpoint
      setNotifications(response.data); // Assuming the API response is an array of notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false); // Stop loading when data is fetched
    }
  };

  // Fetch notifications when the component is mounted
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle marking a notification as read
  const handlePress = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <Layout>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00796b" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem item={item} onPress={() => handlePress(item.id)} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
          contentContainerStyle={styles.listContent} // Add style for list content
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 10,
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  time: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  listContent: {
    paddingBottom: 20, // Add padding at the bottom of the list
  },
});

export default NotificationScreen;
