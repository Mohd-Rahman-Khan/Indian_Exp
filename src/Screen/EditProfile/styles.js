import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  profilepicview: {
    flexDirection: 'row',
    height: hp('20%'),
  },
  profilepic: {
    top: '5%',
    left: '9%',
  },
  changeprofiletext: {
    color: '#5B9AF8',
    fontSize: 14,
    left: '19%',
    top: '15%',
  },
  empno: {
    // fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flexDirection: 'row',
    left: '6%',
    top: '14%',
  },
  profilecontent: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#8A8782',
    width: wp('100%'),
    height: hp('9%'),
  },
  empcode: {
    left: '230%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '30%',
    flexDirection: 'row',
  },
  empcode1: {
    flexDirection: 'row',
    left: '20%',
  },
  lockimage: {
    left: '1650%',
    top: '33%',
  },
  firstname: {
    // fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flexDirection: 'row',
    left: '5.5%',
    top: '14%',
  },
  name: {
    left: '130%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '2%',
    flexDirection: 'row',
  },
  lastname: {
    left: '250%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '25%',
    flexDirection: 'row',
  },
  emplast:{
      left:"30%",
  },
  phone:{
    left: '200%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '20%',
    bottom:"1%"
  },
  email:{
    left: '55%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '15%',
    bottom:"1%"
  },
  logoutBtn:{
    backgroundColor: '#da0b0b',
    borderRadius: 24,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    //marginRight: 48,
    marginBottom: 24,
    marginTop: "59%",
    width: wp("45%"),
  },
  canclebtn:{
    opacity:4,
    borderRadius: 24,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    //marginRight: 48,
    marginBottom: 24,
    marginTop: "60%",
    width: wp("45%"),
    borderColor:"#DA0B0B",
    borderWidth:2
  },
  btnText:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight:'bold'
  },
  canclebtntext:{
    color: '#DA0B0B',
    fontSize: 16,
    fontWeight:'bold'
  },
  logout:{
      top:"25%",
      
  },
  buttongroup:{
      flexDirection:'row'
  }
});
