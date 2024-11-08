import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import haversine from 'haversine-distance';
import * as Location from 'expo-location'; // Import Location from expo-location
import child from '../../assets/child.png';
import parent from '../../assets/parent.png';
import Layout from '../layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { getSensor } from '../thunks/sencorThunk';
import axios from 'axios';
import { API } from "../constants/api"

const MapScreen = () => {
  const dispatch = useDispatch();
  const [parentLocation, setParentLocation] = useState(null); // State to store parent's location
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store clicked marker coordinates
  const [address, setAddress] = useState(null); // State to store address information
  const [latestData,setLatestData ]=useState({});
  const user = useSelector((state) => state.authReducer.user);


  // Fetch notifications when the component is mounted
  useEffect(() => {
    fetchLocation();
  }, []);
  const fetchLocation = async () => {
    try {
      const response = await axios.get(`${API.uri}/devices/location/${user?.deviceName}`); // Replace with your actual API endpoint
      setLatestData(response.data); // Assuming the API response is an array of notifications
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
    }
  };
  const childLocation = {
    latitude: latestData?.Latitude,
    longitude: latestData?.Longtitude,
  };

  // Fetch current location of the parent
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Quyền truy cập vị trí bị từ chối');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setParentLocation({ latitude, longitude });
    })();
  }, []);

  // Reverse geocoding to get address from coordinates
  const fetchAddress = async (location) => {
    try {
      let [result] = await Location.reverseGeocodeAsync(location);
      if (result) {
        const { street, subregion, region, country } = result;
        
        // Create an array with non-null components
        const addressComponents = [
          street || '',
          subregion || '',
          region || '',
          country || ''
        ].filter(component => component); // Remove empty strings
        
        // Join the components with ', ' and set the address
        setAddress(addressComponents.join(', '));
      }
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  // Function to handle marker press and fetch address
  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
    fetchAddress(location);
  };

  // Calculate the distance if parentLocation is available
  const distance = parentLocation
    ? (haversine(childLocation, parentLocation) / 1000).toFixed(2)
    : null;

  return (
    <Layout>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: childLocation.latitude,
            longitude: childLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Vị trí của bé */}
          <Marker
            coordinate={childLocation}
            onPress={() => handleMarkerPress(childLocation)} // Handle child marker press
          >
            <View style={styles.childMarker}>
              <Image source={child} style={styles.icon} />
            </View>
          </Marker>
          <Circle
            center={childLocation}
            radius={500}
            fillColor="rgba(255, 99, 71, 0.5)"
            strokeColor="rgba(255, 99, 71, 0.8)"
          />

          {/* Vị trí của ba mẹ nếu đã lấy được tọa độ */}
          {parentLocation && (
            <>
              <Marker
                coordinate={parentLocation}
                onPress={() => handleMarkerPress(parentLocation)} // Handle parent marker press
              >
                <View style={styles.parentMarker}>
                  <Image source={parent} style={styles.icon} />
                </View>
              </Marker>
              <Circle
                center={parentLocation}
                radius={500}
                fillColor="rgba(0, 123, 255, 0.5)"
                strokeColor="rgba(0, 123, 255, 0.8)"
              />
            </>
          )}
        </MapView>

        {/* Hiển thị khoảng cách giữa bé và ba mẹ */}
        {distance && (
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>
              Khoảng cách giữa bé và ba mẹ: {distance} km
            </Text>
          </View>
        )}
        {errorMsg && (
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>{errorMsg}</Text>
          </View>
        )}

        {/* Display the selected location's coordinates and address */}
        {selectedLocation && (
          <View style={styles.selectedLocationContainer}>
          
            {address ? (
              <Text style={styles.addressText}>Địa chỉ: {address}</Text>
            ) : (
              <Text style={styles.addressText}>Đang tải địa chỉ...</Text>
            )}
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  childMarker: {
    padding: 10,
    borderRadius: 20,
  },
  parentMarker: {
    padding: 10,
    borderRadius: 20,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 10,
    left: '5%',
    right: '5%',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  distanceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  selectedLocationContainer: {
    position: 'absolute',
    top: 10,
    left: '5%',
    right: '5%',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedLocationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MapScreen;
