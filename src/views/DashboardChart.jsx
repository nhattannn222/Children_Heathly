import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API } from "../constants/api"
import {useSelector } from "react-redux";
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

const DashboardChart = () => {
  const [data, setData] = useState([]); // Dữ liệu từ API
  const user = useSelector((state) => state.authReducer.user);
  const [selectedChart, setSelectedChart] = useState('temperature'); // Mặc định hiển thị nhiệt độ

  // Hàm gọi API để lấy dữ liệu
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API.uri}/devices/chart/${user?.deviceName}`); // Thay bằng URL API thật
      const newData = response.data;
      
      // Giả sử API trả về một object có mảng dữ liệu
      // Mỗi phần tử gồm { temperature, spO2, heartRate, time }
      setData(newData); // Giữ lại tối đa 50 dữ liệu
    } catch (error) {
      console.error(error);
    }
  };

  // Thiết lập gọi API mỗi 10 giây
  useEffect(() => {
    fetchData(); // Lấy dữ liệu lần đầu
    const intervalId = setInterval(fetchData, 10000); // Lặp lại mỗi 10 giây

    return () => clearInterval(intervalId); // Xóa interval khi component unmount
  }, []);

  // Tách dữ liệu dựa trên lựa chọn
  const chartData = data.map(item => {
    if (selectedChart === 'temperature') return item.Temperature;
    if (selectedChart === 'spO2') return item.SpO2;
    if (selectedChart === 'heartRate') return item.HeartRate;
  });

  
  
  const labels = data.map((item)=>{
    return moment(item.ts||new Date()).format("hh:mm:ss")
  }); // Hiển thị thời gian cho mỗi điểm

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chọn loại biểu đồ:</Text>
        <Picker
          selectedValue={selectedChart}
          onValueChange={(itemValue) => setSelectedChart(itemValue)}
          style={{ height: 50, width: screenWidth - 32 }}
        >
          <Picker.Item label="Nhiệt độ" value="temperature" />
          <Picker.Item label="SpO2" value="spO2" />
          <Picker.Item label="Nhịp tim" value="heartRate" />
        </Picker>
      </View>

      {/* Biểu đồ đường cho dữ liệu đã chọn */}
      {data.length > 0 && <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          {selectedChart === 'temperature' ? 'Nhiệt độ' : selectedChart === 'spO2' ? 'SpO2' : 'Nhịp tim'}
        </Text>
        <LineChart
        data={{
          // Chỉ hiển thị nhãn cách mỗi `step` đơn vị
          labels: labels.filter((_, index) => index % 2 === 0), // Hiển thị cách 2 đơn vị, bạn có thể tăng `2` thành `3`, `4` để tăng khoảng cách
          datasets: [
            {
              data: chartData,
              color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix={selectedChart === 'temperature' ? '°C' : selectedChart === 'spO2' ? '%' : 'bpm'}
        chartConfig={{
          
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#4c669f',
          backgroundGradientTo: '#3b5998',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        xAxisLabelRotation={45} // Xoay nhãn để dễ đọc hơn
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
      </View>}
    </ScrollView>
  );
};


export default DashboardChart;
