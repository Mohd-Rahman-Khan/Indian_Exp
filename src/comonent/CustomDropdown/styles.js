import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {backgroundColor: 'white', marginTop: 16},
  dropdownHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#373435',
    paddingLeft: 4,
    paddingTop: 4,
    marginBottom: 6,
  },
});
