import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../layout/layout';

const initialNotifications = [
    {
        id: '1',
        type: 'Nguy hiểm',
        message: 'Bé có trạng thái nguy hiểm vì trạng thái xấu và nhiệt độ bên ngoài quá cao',
        time: '13:11 20/09/2024',
        color: 'red',
        read: false, // Unread notification
      },
      {
        id: '2',
        type: 'Nguy hiểm',
        message: 'Nồng độ oxi trong máu của bé quá cao có thể gặp nguy hiểm',
        time: '13:11 18/09/2024',
        color: 'red',
        read: true, // Read notification
      },
      {
        id: '3',
        type: 'Nguy hiểm',
        message: 'Nhiệt độ bên ngoài của bé thay đổi đột xuất',
        time: '13:11 17/09/2024',
        color: 'red',
        read: false, // Unread notification
      },
      {
        id: '4',
        type: 'Nguy hiểm',
        message: 'Nhịp tim của bé có dấu hiệu thay đổi bất thường',
        time: '13:11 01/09/2024',
        color: 'red',
        read: true, // Read notification
      },
      {
        id: '5',
        type: 'Cảnh báo',
        message: 'Vị trí của bé đã thay đổi và cách bạn 10km',
        time: '13:11 20/08/2024',
        color: 'yellow',
        read: false, // Unread notification
      },
      {
        id: '6',
        type: 'Cảnh báo',
        message: 'Vị trí của bé đã thay đổi và cách bạn 10km',
        time: '13:11 20/08/2024',
        color: 'yellow',
        read: false, // Unread notification
      },
      {
        id: '7',
        type: 'Cảnh báo',
        message: 'Vị trí của bé đã thay đổi và cách bạn 10km',
        time: '13:11 20/08/2024',
        color: 'yellow',
        read: false, // Unread notification
      },
];

const NotificationItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.notificationContainer,
        { borderLeftColor: item.color, backgroundColor: item.read ? '#ffffff' : '#e0f7fa' },
      ]}
    >
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handlePress = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Layout>
      <View style={styles.container}>
        
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem item={item} onPress={() => handlePress(item.id)} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false} // Tắt chỉ báo cuộn dọc
          contentContainerStyle={styles.listContent} // Thêm style cho nội dung danh sách
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
    paddingBottom: 20, // Thêm khoảng cách dưới cùng cho danh sách
  },
});

export default NotificationScreen;
