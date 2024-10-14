import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  boxdesign: {
    //paddingTop: wp('5%'),
    alignItems: 'center',
    width: '48%',
    //height: hp('18%'),
    borderRadius: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 40,
  },
  unsold: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    //top: '59%',
    letterSpacing: 1,
    marginTop: 5,
  },
});
