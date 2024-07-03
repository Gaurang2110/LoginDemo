import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {constant} from '../../helper/constant';
import {ThemeContext} from '../../theme/ThemeContext';
import Button from '../../components/Button';
import {resetNavigaiton} from '../../helper/utils';

const HomeScreen = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const {user} = useSelector(state => state.user);
  const [listItem, setListItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchData(false, offset);
  }, []);

  const fetchData = async (more, page) => {
    try {
      !more && setLoading(true);
      const response = await axios.get(
        `${constant.launchUrl}?limit=10&offset=${page}`,
      );
      if (more) {
        setListItem([...listItem, ...response.data]);
      } else {
        setListItem([...response.data]);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      console.log('error was...', error);
    }
  };

  const handelLoadMore = () => {
    setRefreshing(true);
    setOffset(offset + 10);
    fetchData(true, offset + 10);
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('DetailScreen', {item});
        }}
        style={[styles.subView, {backgroundColor: theme.cardColor}]}>
        <Text style={[styles.boldText, {color: theme.textColor}]}>
          {item?.mission_name}
        </Text>
        <Text style={[styles.details, {color: theme.textColor}]}>
          {item?.details}
        </Text>
      </TouchableOpacity>
    );
  };

  const onSignOut = () => {
    auth()
      .signOut()
      .then(() =>
        Alert.alert('Success ✅', 'Logout SuccessFully', [
          {
            text: 'Okay',
            onPress: () => onOkayPress(),
          },
        ]),
      );
  };

  const onOkayPress = () => {
    resetNavigaiton(navigation, 'LoginScreen');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.backgroundColor}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating size={'large'} color={theme.textColor} />
        </View>
      ) : (
        <>
          <View style={[styles.header, {backgroundColor: theme.lightColor}]}>
            <Text style={[styles.headText, {color: theme.textColor}]}>
              {user?.fullName}
            </Text>
            <Button
              style={{backgroundColor: theme.cardColor}}
              textStyle={{color: theme.textColor}}
              onPress={() => onSignOut()}
              title={'Log Out'}
            />
          </View>

          <View style={{flex: 1}}>
            <FlatList
              contentContainerStyle={styles.containerView}
              data={listItem}
              renderItem={_renderItem}
              showsVerticalScrollIndicator={false}
              windowSize={10}
              onEndReached={handelLoadMore}
              refreshing={refreshing}
              ListFooterComponent={
                refreshing && (
                  <ActivityIndicator
                    animating
                    size={'large'}
                    color={theme.textColor}
                  />
                )
              }
              ListFooterComponentStyle={{marginBottom: 40}}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerView: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  headText: {fontSize: 20, color: '#000000', fontWeight: 'bold'},
  details: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 24,
  },
  boldText: {fontSize: 16, color: '#000000', fontWeight: '600'},
  subView: {
    marginBottom: 10,
    backgroundColor: '#c9c9c9',
    padding: 10,
    borderRadius: 10,
  },
});
