import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Input from '../../components/Input';
import {validEmail, validPassword} from '../../helper/Validation';
import {setUser} from '../../redux/slice/userSlice';
import {useDispatch} from 'react-redux';
import {resetNavigaiton} from '../../helper/utils';
import {ThemeContext} from '../../theme/ThemeContext';
import Button from '../../components/Button';
const LoginScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setuserNameError] = useState(false);
  const [isValid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    if (fullName.length === 0 && email.length === 0 && password.length === 0) {
      setuserNameError(true);
      setEmailError(true);
      setValid(true);
    } else if (!userNameError && !emailError && !isValid) {
        onLoginExistUser(email, password);
    }
  };

  const onLoginExistUser = async() =>{
    try {
        setLoading(true);
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const token = await auth().currentUser.getIdToken();
        dispatch(
            setUser({fullName: fullName, email: email, authToken: token}),
          );
          setLoading(false);
          Alert.alert('Success ✅', 'Login successfully', [
            {
              text: 'Okay',
              onPress: () => onOkayPress(),
            },
          ]);
        
    } catch (error) {
        setLoading(false);
        onCreateUser();
        console.log('erroor was....',error)
    }
  
  }

  const onOkayPress = () => {
    resetNavigaiton(navigation, 'HomeScreen');
  };

  const onCreateUser = async () => {
    try {
      setLoading(true);
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
   
      if (response && response.user) {
        response.user
          .updateProfile({displayName: fullName})
          .then(auth().currentUser.reload())
          .then(async s => {
            const token = await auth().currentUser.getIdToken();
            dispatch(
              setUser({fullName: fullName, email: email, authToken: token}),
            );
            setLoading(false);
            Alert.alert('Success ✅', 'Account created successfully', [
              {
                text: 'Okay',
                onPress: () => onOkayPress(),
              },
            ]);
          });
      }
      setLoading(false);
     
    } catch (e) {
      setLoading(false);
      if (e.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      }

      if (e.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      }
    }
  };

  const handleChangeEmail = text => {
    setEmailError(!validEmail(text));
    setEmail(text);
  };

  const handlePWDChange = text => {
    if (!validPassword(text)) {
      setValid(true);
    } else {
      setValid(false);
    }
    setPassword(text);
  };

  const handleFullName = text => {
    if (text.length < 5) {
      setuserNameError(true);
    } else {
      setuserNameError(false);
    }
    setFullName(text);
  };

  return (
    <SafeAreaView
      style={[styles.containerStyle, {backgroundColor: theme.backgroundColor}]}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            opacity: 0.5,
          }}>
          <ActivityIndicator animating color={theme.textColor} size={'large'} />
        </View>
      ) : (
        <>
          <Text style={[styles.headerTitleStyle, {color: theme.textColor}]}>
            {' '}
            Login{' '}
          </Text>

          <View style={styles.subView}>
            <Input
              returnKeyType={'next'}
              placeholder={'Full Name'}
              error={userNameError && 'Full Name should be a minimum 5 char'}
              value={fullName}
              onChange={text => {
                handleFullName(text);
              }}
              
              keyboardType={'default'}
              secureText={false}
              inputStyle={{color: theme.textColor}}
            />

            <Input
              returnKeyType={'next'}
              placeholder={'Email-address'}
              error={emailError && 'Invalid Email'}
              value={email}
              onChange={text => {
                handleChangeEmail(text);
              }}
              keyboardType={'email-address'}
              secureText={false}
              inputStyle={{color: theme.textColor}}
            />

            <Input
              returnKeyType={'done'}
              secureText={true}
              placeholder={'password'}
              keyboardType={'default'}
              error={
                isValid &&
                ' At least one uppercase letter\nAt least one lowercase letter\nAt least one digit\nAt least one special symbol\n password length should be  minimum 8 char'
              }
              value={password}
              onChange={text => {
                handlePWDChange(text);
              }}
              inputStyle={{color: theme.textColor}}
            />
          </View>

          <Button
            style={{backgroundColor: theme.cardColor, marginTop: 20}}
            textStyle={{color: theme.textColor}}
            onPress={onLogin}
            title={'Login'}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitleStyle: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
  },
  subView: {
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
});
