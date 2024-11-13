import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import heart from "../../assets/heart.png";
import connect from "../../assets/connect.png";
import spo2 from "../../assets/spo2.png";
import happy from "../../assets/happy.png";
import sad from "../../assets/sad.png";
import bt from "../../assets/bt.png";
import thermometer from "../../assets/thermometer.png";
import Layout from "../layout/layout";
import { getSensor } from "../thunks/sencorThunk";
import { connectDevice } from "../thunks/deviceThunk";
import axios from "axios";
import { API } from "../constants/api"
import { setAllSensor } from "../slices/iotSlice";

const HomeScreen = () => {
  const allSensor = useSelector((state) => state.IoTReducer.allSensor);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const latestData = useSelector((state) => state.IoTReducer.sensorData);
  const [theodoi, setTheoDoi] = useState("");
  
  useEffect(() => {
    dispatch(getSensor(user?.deviceName));

    const interval = setInterval(() => {
      dispatch(getSensor(user?.deviceName));
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, user?.deviceName]);

  
  const fetchTheoDoi = async() => {
    try {
      const response = await axios.post(`${API.uri}/devices/infoData/${user?.deviceName}`,latestData)
      
      if(response){
        setTheoDoi(response.data)
      }
    } catch (error) {
      
    }
  }
  
  // Check conditions for status
  const ketQuaNhietDo = latestData?.ketQuaNhietDo?.includes("Sốt");
  const ketQuaSpO2 = latestData?.ketQuaSpO2?.includes("Nguy hiểm");
  const ketQuaNhipTim = latestData?.ketQuaNhipTim?.includes("Nguy hiểm");

  if(ketQuaNhietDo || ketQuaSpO2 || ketQuaNhipTim){
    fetchTheoDoi();
  }


  // useEffect(() => {
  //   dispatch(connectDevice(user?.deviceName));

  //   const interval = setInterval(() => {
  //     dispatch(connectDevice(user?.deviceName));
  //     console.log(allSensor[0]);
      
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, [dispatch, user?.deviceName]);

  const handleSensorToggle = () => {
    dispatch(connectDevice(user?.deviceName));
    
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.deviceCard} key={allSensor[0]?.deviceId}>
          <Image source={connect} style={styles.deviceIcon} />
          <Text style={styles.deviceStatusText}>
            {allSensor[0]?.status ? "Đã kết nối thiết bị" : "Thiết bị chưa kết nối"}
          </Text>
          <TouchableOpacity onPress={() => handleSensorToggle(allSensor[0])}>
            <Text style={styles.reconnectText}>
              {allSensor[0]?.status ? "Ngắt kết nối" : "Kết nối lại"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Cards */}
        <View style={styles.infoContainer}>
         {/* Age */}
         <View style={[styles.infoCard]}>
            <Text style={styles.valueText}>
              Độ tuổi: {latestData ? `${latestData?.age} tuổi` : "---"}
            </Text>
            <Text style={styles.valueText}>
            Giới tính: {latestData ? `${latestData?.gender=="male"?"Nam":"Nữ"} ` : "---"}
            </Text>
            <Text style={styles.valueText}>
            Chiều cao: {latestData ? `${latestData?.height} cm ` : "---"}
            </Text>
            <Text style={styles.valueText}>
           Cân nặng: {latestData ? `${latestData?.weight} kg` : "---"}
            </Text>
          </View>
          {/* Temperature */}
          <View style={[styles.infoCard, { backgroundColor: ketQuaNhietDo ? "#f74d58" : 'white' }]}>
            <Image source={thermometer} style={styles.icon} />
            <Text style={styles.labelText}>Nhiệt độ</Text>
            <Text style={styles.valueText}>
              {latestData ? `${latestData?.Temperature}°C` : "---"}
            </Text>
          </View>

          {/* Heart Rate */}
          <View style={[styles.infoCard, { backgroundColor: ketQuaNhipTim ? "#f74d58" : 'white' }]}>
            <Image source={heart} style={styles.icon} />
            <Text style={styles.labelText}>Nhịp tim</Text>
            <Text style={styles.valueText}>
              {latestData
                ? `${Math.round(latestData?.HeartRate)} lần / phút`
                : "---"}
            </Text>
          </View>

          {/* SPO2 */}
          <View style={[styles.infoCard, { backgroundColor: ketQuaSpO2 ? "#f74d58" : 'white' }]}>
            <Image source={spo2} style={styles.icon} />
            <Text style={styles.labelText}>SPO2</Text>
            <Text style={styles.valueText}>
              {latestData ? `${Math.round(latestData?.SpO2)}%` : "---"}
            </Text>
          </View>

          <View style={[
            styles.infoCard, 
            { 
              backgroundColor: latestData?.prediction === "danger" 
                ? "#f74d58" 
                : latestData?.prediction === "warning" 
                ? "#FFC107" 
                : "white",
              width: '100%',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
        >
          <Text style={styles.labelText}>Dự đoán tình trạng của bé</Text>
          <Text style={styles.valueText}>
            {latestData 
              ? latestData.prediction === "danger" 
                ? "Nguy hiểm" 
                : latestData.prediction === "warning" 
                ? "Cảnh báo" 
                : "Bình thường" 
              : "---"}
          </Text>

          <Text style={styles.valueText}>
            {
              ketQuaNhietDo && latestData.ketQuaNhietDo
            }
            {
              ketQuaSpO2 && latestData.ketQuaSpO2
            }
            {
              ketQuaNhipTim && latestData.ketQuaNhipTim
            }
          </Text>
          <Text style={styles.valueText}>
          {theodoi.split("|").map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {"\n"}
            </React.Fragment>
          ))}
        </Text>
        </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  deviceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  deviceStatusText: {
    fontSize: 18,
    marginBottom: 10,
  },
  reconnectText: {
    fontSize: 16,
    color: "#FF7F00",
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;