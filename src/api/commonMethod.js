import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './auth';
import { useNavigation } from '@react-navigation/native';
import NavigationService from '../Navigation/RootNavigator/NavigationService';

export const commonApiResponseHandler = async (response) => {
    let validResponseFlag = false;
    const navigation = useNavigation();
    if(response?.status != 200){
        Alert.alert(
          'oops!',
          'something went wrong, please try later!', // <- this part is optional, you can pass an empty string
          [
            {text: 'OK', onPress: async () => {
              await AsyncStorage.removeItem('InExToken');
              await AsyncStorage.removeItem('InExUserId');
              await AsyncStorage.removeItem('InExUserDetails');
              NavigationService.reset(
                navigation,
                'Login'
              )
            }},
          ],
          {cancelable: false},
        );
      } else {
        validResponseFlag = true
        console.log("commonApiResponseHandler res", response.data?.data)
        // setPublicationArr(response.data?.data)
      }

    return validResponseFlag;
    // const token = await AsyncStorage.getItem('InExToken');
    // await auth.${name()}

}