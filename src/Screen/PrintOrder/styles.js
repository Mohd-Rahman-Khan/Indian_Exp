import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../../GlobalConstants/COLORS';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 20,
  },
  publicationview: {
    top: '0%',
    left: '6%',
  },
  publicationviews: {
    top: '1%',
    left: '6%',
    marginBottom: '4%',
  },
  publication: {
    fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    color: '#373435',
    marginTop: 18,
    // paddingBottom: 10
  },
  selecteditem: {
    width: wp('90%'),
    height: hp('7%'),
    backgroundColor: '#ffffff',
    paddingLeft: '5%',
    // bottom: '2%',
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
    width: wp('90%'),
    height: hp('6.6%'),
    backgroundColor: '#ffffff',
    marginRight: '4%',
    paddingLeft: '5%',
    color: 'black',
    justifyContent: 'center',
  },
  Supplybox: {
    width: wp('90%'),
    height: hp('6.6%'),
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
    //marginHorizontal: '5%',
    marginTop: '5%',
    backgroundColor: '#ffffff',
  },
  // frominput: {
  //   marginTop: '5%',
  //   //flexDirection:'row'
  // },
  fromtext: {
    fontSize: 17,
    // fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
    color: '#373435',
    // marginBottom: '2%',
  },
  calander: {
    left: '5%',
    bottom: '0%',
    //right:"80%"
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
    alignItems: 'center',
  },
  unsoldsupply: {
    top: '2%',
    left: '7%',
  },
  supplytext: {
    flexDirection: 'row',
    marginBottom: '5%',
  },
  Text: {
    fontSize: 17,
    color: '#000000',
    fontWeight: 'bold',
  },
  count: {
    marginLeft: '70%',
    fontSize: 17,
    color: '#B0ACA6',
    marginTop: '1%',
  },
  count1: {
    marginLeft: '74%',
    fontSize: 17,
    color: '#B0ACA6',
    marginTop: '1%',
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
  iconButtonContainer: {
    height: 26,
    borderColor: COLORS.lightGreyBorder,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  bottonGroupCotainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 26,
    width: '100%',
    color: 'black',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  plusMinusBottonBox: {width: '12%'},
  newSupplyContainer: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disableTextStyle: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 26,
    paddingLeft: 3,
    paddingTop: 3,
    backgroundColor: 'lightgrey',
    width: '60%',
    color: 'black',
    textAlign: 'center',
  },
  iconStyle: {height: 15, width: 15},
  supplyContainer: {
    flexDirection: 'row',
    marginTop: 10,
    //height: 26,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.4,
    // backgroundColor: 'red',
    paddingBottom: 10,
  },
});
