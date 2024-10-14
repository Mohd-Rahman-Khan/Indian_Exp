import {
  Image,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {memo, useState} from 'react';
import images from '../../Image';
import COLORS from '../../GlobalConstants/COLORS';
import {ButtonView} from '../../Helper/buttonView';

export default function RemarkPopup(props) {
  return (
    <Modal animationType="fade" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={props.onClose}
        style={styles.mainContainer}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalInsideContainer}>
            <View style={styles.remarkContainer}>
              <Text style={styles.remarkText}>Please Enter Remark</Text>
              <TextInput
                editable
                multiline
                // numberOfLines={4}
                // maxLength={40}
                onChangeText={text => props.onChangeText(text)}
                value={props.value}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: COLORS.lightGreyBorder,
                  width: '100%',
                  marginTop: 20,
                  height: 100,
                  borderRadius: 5,
                }}
              />
            </View>
            <View
              style={{
                //width: '70%',
                //justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={props.onPress}
                style={{
                  backgroundColor: COLORS.redPrimary,
                  paddingHorizontal: 70,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.white,
                    fontWeight: 'bold',
                  }}>
                  Submit
                </Text>
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
  },
  modalInsideContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '35%',
    width: '100%',
    //justifyContent: 'flex-end',
    //alignItems: 'center',
    paddingHorizontal: 20,
  },
  remarkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  remarkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
