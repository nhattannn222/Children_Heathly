import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import Login from '../views/login'
import HomeScreen from '../views/home'
import UserScreen from '../views/user'
import MapScreen from '../views/map'
import NotificationScreen from '../views/notification'
import Chatbot from '../views/chatbot'
import Register from '../views/register'
import DashboardChart from '../views/DashboardChart'

const Stack = createNativeStackNavigator()

export const GeneralRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Đăng Nhập"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Đăng Ký"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const LoggedRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trang chủ" component={HomeScreen} />
      <Stack.Screen name="Trang cá nhân" component={UserScreen} options={{
          headerTitle: 'Trang cá nhân', 
          headerLeft: () => false, 
        }}/>
      <Stack.Screen name="location" component={MapScreen} options={{
          headerTitle: 'location', 
          headerLeft: () => false, 
        }} />
      <Stack.Screen
        name="Thông báo"
        component={NotificationScreen}
        options={{
          headerTitle: 'Thông báo', 
          headerLeft: () => false, 
        }}
      />
      <Stack.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          headerTitle: 'Chatbot', 
          // headerLeft: () => false, 
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardChart}
        options={{
          headerTitle: 'Chart', 
          // headerLeft: () => false, 
        }}
      />
    </Stack.Navigator>
  )
}

const Router = () => {
  const { logged, code } = useSelector((state) => state.authReducer)
  useEffect(() => {}, [])

  return (
    <NavigationContainer>
      {logged ? <LoggedRoute /> : <GeneralRoute />}

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  )
}

export default Router
