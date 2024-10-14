import React, {memo} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const AppLoader = props => {
  const {visible = false, size = 'large', indicatorStyle = {}} = props;

  return visible ? (
    // <View style={{flex: 1, backgroundColor: 'transparent'}}>
    //   <View
    //     style={{
    //       width: 100,
    //       height: 100,
    //       alignSelf: 'center',
    //       backgroundColor: 'grey',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}>
    //     <ActivityIndicator size={size} style={indicatorStyle} />
    //   </View>
    // </View>
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback
        //onPress={props.onClose}
        style={styles.mainContainer}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalInsideContainer}>
            <ActivityIndicator size={size} style={indicatorStyle} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  ) : null;
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000AA',
    //paddingHorizontal: 10,
  },
  modalInsideContainer: {
    width: 80,
    backgroundColor: 'white',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default memo(AppLoader);
