import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../theme/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../container/Home/HomeScreen';
import DetailScreen from '../container/Home/DetailScreen';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/slice/userSlice';
import LoginScreen from '../container/authentication/LoginScreen';
const Stack = createStackNavigator();
const RootNavigation = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [isLogin, setisLogin] = useState(undefined);
  const {user} = useSelector(state => state.user);
  const {toggleTheme} = useContext(ThemeContext);
  const onAuthStateChanged = async user => {
    const token = await auth().currentUser?.getIdToken();
    if (token) {
      dispatch(
        setUser({
          email: user.email,
          fullName: user.displayName,
          authToken: token,
        }),
      );
      setisLogin(true);
    } else {
      setisLogin(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    toggleTheme(colorScheme);
  }, [colorScheme]);

  return (
    <NavigationContainer>
      {isLogin !== undefined && (
        <Stack.Navigator
          initialRouteName={isLogin ? 'HomeScreen' : 'LoginScreen'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
