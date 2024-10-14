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
    paddingHorizontal: 20,
  },
  buttongroup: {
    flexDirection: 'row',
  },
  canclebtn: {
    opacity: 4,
    borderRadius: 24,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    //marginRight: 48,
    marginBottom: 24,
    marginTop: '20%',
    width: wp('45%'),
    borderColor: '#DA0B0B',
    borderWidth: 2,
  },
  canclebtntext: {
    color: '#DA0B0B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Supply: {
    marginTop: '2%',
    width: '100%',
    //left: '6%',
  },
  fromtext: {
    fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    color: '#373435',
    marginBottom: '2%',
  },
  Supplybox: {
    //width: wp('100%'),
    // height: hp('6.6%'),
    height: 46,
    backgroundColor: '#ffffff',
    //marginRight:"4%",
    paddingLeft: '3%',
  },

  /// scanner
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'red',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  topContent: {
    position: 'absolute',
    top: 10,
    left: 24,
    right: 24,
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 99,
    // backgroundColor:'white',
    flexDirection: 'row',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  torchIconStyle: {
    width: 18,
    height: 18,
  },
  tableListText: {
    fontWeight: '800',
    color: 'black',
    //marginTop: 10,
  },
  tableListDetailText: {
    //marginTop: 10,
  },
});
