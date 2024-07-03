import {CommonActions} from '@react-navigation/native';

export const resetNavigaiton = (navigation, route) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: route}],
    }),
  );
};
