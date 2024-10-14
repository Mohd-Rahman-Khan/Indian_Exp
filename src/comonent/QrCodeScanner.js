import {
  Image,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import React, {memo, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import images from '../Image';
import COLORS from '../GlobalConstants/COLORS';
import {QRScannerView} from 'react-native-qrcode-scanner-view';

export default function QrCodeScanner(props) {
  const [flashlight, setFlashlight] = useState(false);
  const _handleQrScan = res => {
    props.qrScanningData(res.data);
    // let qrData = JSON.parse(res?.data);
    // //props.qrScanningData(qrData);
    // alert(JSON.stringify(res));
  };

  const renderTitleBar = () => (
    <>
      <View style={[styles.topContent, {justifyContent: 'center'}]}>
        {/* <TouchableOpacity onPress={props.onClose}></TouchableOpacity> */}
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Scan Coupon
          </Text>
        </View>
        {/* <TouchableOpacity
          onPress={props.onClose}
          style={{
            height: 30,
            width: 30,
            borderWidth: 1,
            borderColor: COLORS.lightGreyBorder,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={images.closeIcon}
            style={{
              width: 15,
              height: 15,
            }}
          />
        </TouchableOpacity> */}
      </View>
    </>
  );

  const renderMenu = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
      }}>
      <TouchableOpacity style={{width: '70%'}} onPress={props.onClose}>
        <View
          style={{
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
          }}>
          <Text
            style={{
              color: '#DA0B0B',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Close
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const barcodeReceived = event => {
    //console.log('Type: ' + event.type + '\nData: ' + event.data);
    props.qrScanningData(event.data);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={props.onClose}
        style={styles.mainContainer}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalInsideContainer}>
            <View style={{width: '100%', height: '100%'}}>
              <QRScannerView
                style={{borderRadius: 50}}
                onScanResult={barcodeReceived}
                renderHeaderView={renderTitleBar}
                renderFooterView={renderMenu}
                scanBarAnimateReverse={true}
                hintText={null}
              />
            </View>
            {/* <QRCodeScanner
              reactivateTimeout={5000}
              reactivate={true}
              onRead={res => _handleQrScan(res)}
              flashMode={flashlight ? RNCamera.Constants.FlashMode.torch : null}
              topContent={
                <>
                  <View style={[styles.topContent, {paddingHorizontal: 20}]}>
                    <TouchableOpacity
                      onPress={props.onClose}></TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        Scan Coupen
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={props.onClose}
                      style={{
                        height: 30,
                        width: 30,
                        borderWidth: 1,
                        borderColor: COLORS.lightGreyBorder,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={images.closeIcon}
                        style={{
                          width: 15,
                          height: 15,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              }
              fadeIn={true}
              showMarker={true}
              markerStyle={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 8,
              }}
              containerStyle={{
                backgroundColor: 'transparent',
                flex: 1,
                borderRadius: 50,
              }}
              cameraStyle={{
                flex: 1,
                width: '90%',
                marginTop: 40,
              }}
            /> */}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000AA',
    //paddingHorizontal: 10,
  },
  modalInsideContainer: {
    //width: '100%',
    backgroundColor: 'white',
    //borderWidth: 3,
    //borderColor: 'red',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    //paddingVertical: 20,
    //paddingHorizontal: 20,
    //flex: 1,
    // height: Platform.OS == 'android' ? '70%' : '60%',
    height: '100%',
    //maxHeight: '90%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //paddingLeft: '10%',
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
    width: 22,
    height: 22,
  },
  torchIconStyle: {
    width: 18,
    height: 18,
  },
  buttonText: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 5,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
