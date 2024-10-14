import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    paddingVertical: 10,
  },
});
