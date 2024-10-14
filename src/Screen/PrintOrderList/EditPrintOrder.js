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
  TextInput,
} from 'react-native';
import React, {memo, useState} from 'react';
import images from '../../Image';
import COLORS from '../../GlobalConstants/COLORS';

export default function EditPrintOrder(props) {
  console.log('EditData', props?.editData);
  const [newSupply, setnewSupply] = useState(props?.editData);

  return (
    <Modal animationType="fade" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={props.onClose}
        style={styles.mainContainer}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalInsideContainer}>
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
              Edit Supply
            </Text>
            <View style={styles.bottonGroupCotainer}>
              <View style={styles.plusMinusBottonBox}>
                <TouchableOpacity
                  onPress={() => {
                    if (newSupply > 0) {
                      setnewSupply(newSupply - 1);
                    }
                  }}
                  style={styles.iconButtonContainer}>
                  <Image style={styles.iconStyle} source={images.minusIcon} />
                </TouchableOpacity>
              </View>
              <View style={{width: '70%'}}>
                <TextInput
                  style={styles.textInputStyle}
                  value={newSupply.toString()}
                  keyboardType={'numeric' || 'number-pad'}
                  onChangeText={text => {
                    if (text == '') {
                      setnewSupply(text);
                    } else {
                      setnewSupply(parseInt(text));
                    }
                  }}
                />
              </View>
              <View style={styles.plusMinusBottonBox}>
                <TouchableOpacity
                  onPress={() => {
                    if (newSupply >= 0) {
                      setnewSupply(newSupply + 1);
                    }
                  }}
                  style={styles.iconButtonContainer}>
                  <Image style={styles.iconStyle} source={images.plusIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionButtonGrpoup}>
              <TouchableOpacity
                onPress={props.onClose}
                style={styles.actionButtonContainer}>
                <Text style={[styles.canclebtntext]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.sumitAction(newSupply);
                }}
                style={styles.actionButtonContainer}>
                <Text style={[styles.canclebtntext]}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
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
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '25%',
    maxHeight: '80%',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  iconButtonContainer: {
    height: 40,
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
    marginTop: 20,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 40,
    width: '100%',
    color: 'black',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  plusMinusBottonBox: {width: '10%'},
  newSupplyContainer: {
    width: '60%',
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
  },
  iconStyle: {height: 15, width: 15},
  supplyContainer: {
    flexDirection: 'row',
    marginVertical: 14,
    height: 26,
    marginHorizontal: 10,
  },
  actionButtonGrpoup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DA0B0B',
    borderWidth: 2,
    borderRadius: 24,
    paddingVertical: 10,
  },
  canclebtntext: {
    color: '#DA0B0B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
