import {Platform, PermissionsAndroid} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';

export function getFileExtension(url) {
  const extension = url.split('.').pop();
  return extension;
}

export const openCamera = data => {
  return new Promise(async (resolve, reject) => {
    ImageCropPicker.openCamera({
      // width: 400,
      // height: 400,
      cropping: false,
    })
      .then(res => {
        console.log("ImageCropPicker",res)
        resolve(res);
      })
      .catch(errr => {
        console.log("ImageCropPicker",errr)
        reject(errr);
      });
    
    // request(
    //   Platform.OS === 'ios'
    //     ? PERMISSIONS.IOS.CAMERA
    //     : PERMISSIONS.ANDROID.CAMERA,
    // ).then(result => {
    //   // ImageCropPicker.openCamera({
    //   //   width: 400,
    //   //   height: 400,
    //   //   cropping: true,
    //   // })
    //   ImageCropPicker.openCamera({
    //     // width: 400,
    //     // height: 400,
    //     cropping: false,
    //   })
    //     .then(res => {
    //       resolve(res);
    //     })
    //     .catch(errr => {
    //       reject(errr);
    //     });
    // });
  });
};

export const uploadDoc = data => {
  return new Promise((resolve, reject) => {
    DocumentPicker.pickSingle({})
      .then(res => {
        resolve(res);
      })
      .catch(errr => {
        reject(errr);
      });
  });
};
