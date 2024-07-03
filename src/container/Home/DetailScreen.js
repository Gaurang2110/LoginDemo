import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Button from '../../components/Button';
import {ThemeContext} from '../../theme/ThemeContext';

const DetailScreen = ({navigation, route}) => {
  const {theme} = useContext(ThemeContext);
  const {item} = route?.params;
  const openUrl = link => {
    Linking.openURL(link);
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={{marginVertical: 20, alignItems: 'center'}}>
        <Image
          source={{
            uri:
              item?.links?.flickr_images?.length > 0
                ? item?.links?.flickr_images[0]
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
          }}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />

        <Text style={[styles.heading, {color: theme.textColor}]}>
          {item?.mission_name}
        </Text>
        {item?.details && (
          <Text style={[styles.subText, {color: theme.textColor}]}>
            {item?.details}
          </Text>
        )}
        <Text
          style={[
            styles.highLighted,
            {color: item?.launch_success ? 'green' : 'red'},
          ]}>
          {'Launch Success'}
        </Text>
        <View style={styles.btnView}>
          <Button
            style={{
              width: '40%',
              marginRight: 10,
              backgroundColor: theme.cardColor,
            }}
            onPress={() => openUrl(item?.links?.article_link)}
            title={'Article'}
            textStyle={{color: theme.textColor}}
          />
          <Button
            style={{
              width: '40%',
              marginLeft: 10,
              backgroundColor: theme.cardColor,
            }}
            onPress={() => openUrl(item?.links?.video_link)}
            title={'Watch'}
            textStyle={{color: theme.textColor}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  heading: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
  },
  subText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
    paddingVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  highLighted: {
    fontWeight: '600',
    fontSize: 14,
    paddingVertical: 10,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 20,
  },
});

export default DetailScreen;
