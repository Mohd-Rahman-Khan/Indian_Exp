import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logo: {
      alignItems:"center"
  },
  logodesign: {
    marginTop: 121,
    //left: 65,
    width: 279,
  },
  continue:{
    alignItems:"center"
  },
  continuetext: {
    marginTop: '2%',
    //left: '8%',
    width: 329,
    // height: 30,
    lineHeight: 28,
    fontSize: 18,
    color: '#343a40',
    textAlign:"center"

  },
  loginid: {
    left: 26,
    marginTop: 100,
    // width: 57,
    color: '#373435',
    fontSize: 14,
    fontWeight: 'bold',
  },
  password: {
    left: 26,
    marginTop: 10,
    // width: 65,
    color: '#373435',
    fontSize: 14,
    fontWeight: 'bold',
  },
  TextInput: {
    marginTop: 10,
    height: 53,
    marginHorizontal: 26,
    // width: 363,
    borderRadius: 1,
    backgroundColor: '#ffffff',
    borderColor: '#707070',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 5,
  },
  passwordstyle: {
    flexDirection: 'row',
  },
  loginBtn: {
    backgroundColor: '#da0b0b',
    borderRadius: 24,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 24,
    marginTop: 33,
    // width: '89%',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
  },
  forgotpassword: {
    fontSize: 14,
    color: '#373435',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  group: {
    right: 50,
    top: 8,
  },
});
