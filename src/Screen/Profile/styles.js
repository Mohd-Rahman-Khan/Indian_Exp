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
    height: 190,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   // backgroundColor: 'black',
  },
  profilepic: {
    //width:"30%",
    //height: '85%',
    width: 150,
    height: 190,
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
    left: '190%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '30%',
    flexDirection: 'row',
  },
  lastname: {
    left: '290%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '50%',
    flexDirection: 'row',
  },
  emplast:{
      left:"30%",
  },
  phone:{
    left: '230%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '30%',
    bottom:"1%"
  },
  email:{
    left: '100%',
    // right: '2%',
    fontSize: 16,
    color: '#4E4C4A',
    top: '30%',
    bottom:"1%"
  },
  logoutBtnView: {
    marginBottom: 20,
    marginTop: 55, 
    marginHorizontal: wp('5%')
  },
  logoutBtn:{
    backgroundColor: '#da0b0b',
    borderRadius: 24,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginHorizontal: 10,
    // marginLeft: 23,
    // marginRight: 48,
    width: wp("90%"),
  },
  btnText:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight:'bold'
  },
  logout:{
      top:"25%",
      
  },


  itemRowView: {
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: '#8A8782',
      height: hp('9%'),
      alignItems: 'center',
      paddingHorizontal: wp('6%'),
  },
  itemLbl: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    flex:1.5,
  },
  itemValue: {
    flex:1.5,
    alignItems:'flex-start',
    fontSize: 16,
    color: '#4E4C4A',
    textAlign: 'left',
  }

});
