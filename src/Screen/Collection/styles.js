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
  },
  publicationview: {
    top: '2%',
    left: '6%',
  },
  publicationviews: {
    top: '4%',
    left: '6%',
    marginBottom: '4%',
  },
  publication: {
    fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    color: '#373435',
  },
  selecteditem: {
    width: wp('90%'),
    height: hp('7%'),
    backgroundColor: '#ffffff',
    paddingLeft: '5%',
    bottom: '2%',
  },
  label: {
    marginTop: '0%',
  },
  inputs: {
    width: wp('92%'),
  },
  options: {
    width: wp('0%'),
  },
  filters: {
    backgroundColor: '#ffffff',
    width: wp('91%'),
    height: hp('6%'),
    borderRadius: 70,
    paddingLeft: 20,
    paddingRight: 140,
    fontSize: 15,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: 'yellow',
  },
  option: {
    color: '#000000',
    left: '20%',
  },
  list: {
    backgroundColor: 'yellow',
  },
  multiple: {
    backgroundColor: 'hsla(0, 100%, 88%, 1)',
    width: wp('40%'),
    height: hp('4%'),
    top: '20%',
  },
  labels: {
    color: '#DA0B0B',
    // fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  multi: {
    //backgroundColor:"#8D8D8D",
    color: '#8D8D8D',
    top: '20%',
  },
  friday: {
    backgroundColor: '#ffffff',
    border: 0,
    width: '90%',
  },
  textInput: {
    width: wp('43%'),
    height: hp('6.6%'),
    backgroundColor: '#ffffff',
    marginRight: '4%',
    paddingLeft: '5%',
  },
  Supplybox: {
    width: wp('90%'),
    // height: hp('6.6%'),
    height: 46,
    backgroundColor: '#ffffff',
    //marginRight:"4%",
    paddingLeft: '3%',
  },
  totextInput: {
    width: wp('42%'),
    height: hp('6.6%'),
    backgroundColor: '#ffffff',
    //marginRight:"2%"
  },
  mainview: {
    flexDirection: 'row',
  },
  frominput: {
    marginTop: '8%',
    left: '20%',
    //flexDirection:'row'
  },
  fromtext: {
    fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    color: '#373435',
    marginBottom: '2%',
  },
  calander: {
    //   left:"80%",
    //   bottom:"145%",
    //   right:"2%"
  },
  fromcalander: {
    left: '75%',
    bottom: '35%',
  },
  calanderimage: {
    left: '80%',
    bottom: '37%',
    right: '2%',
  },
  fromcalanderimage: {
    //left:"1%",
    bottom: '32%',
    //right:"2%"
  },
  logoutBtn: {
    backgroundColor: '#da0b0b',
    borderRadius: 24,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 23,
    marginRight: 48,
    marginBottom: 24,
    marginTop: '5%',
    width: wp('90%'),
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Supply: {
    marginTop: '1%',
    left: '6%',
  },
  supply1: {
    marginTop: '1%',
  },
  nps: {
    fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    color: '#373435',
    marginBottom: '2%',
    marginTop: '2%',
  },
  paymentmode: {
    top: '1%',
    left: '6%',
  },
  logoutBtn1: {
    backgroundColor: '#da0b0b',
    borderRadius: 24,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    //marginRight: 48,
    marginBottom: 24,
    marginTop: '20%',
    width: wp('45%'),
  },
  canclebtn: {
    opacity: 4,
    borderRadius: 24,
    //height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    //marginLeft: 14,
    //marginRight: 48,
    //marginBottom: 24,
    //marginTop: '20%',
    borderColor: '#DA0B0B',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  canclebtntext: {
    color: '#DA0B0B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logout: {
    top: '25%',
  },
  buttongroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dropdownHeading: {
    fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    color: '#373435',
    paddingLeft: 4,
    paddingTop: 4,
    // paddingBottom: 10
  },
  tableListText: {
    fontWeight: '800',
    color: 'black',
    //marginTop: 10,
  },
  tableListDetailText: {
    //marginTop: 10,
  },
  validCouponText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomView: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    //paddingHorizontal: 10,
    //paddingBottom: 20,
  },
});
