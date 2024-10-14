import {
  Image,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {memo} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import imagePath from '../Image/index';
import COLORS from '../GlobalConstants/COLORS';

function CalenderComp(props) {
  return (
    <Modal animationType="fade" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={props.closeModal}
        style={styles.mainConntainer}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalInsideContainer}>
            <Calendar
              markedDates={props.markedDates}
              initialDate={props.minDate}
              minDate={props.minDate}
              maxDate={props.maxDate}
              onDayPress={day => {
                console.log('props?.fromDate', props?.fromDate);
                props.setselectedDate(day.dateString);
                // if (props?.dateType == 'TD') {
                //   if (day.dateString < props?.fromDate) {
                //     Alert.alert(
                //       'Oops',
                //       'To date should be greater than from date.',
                //       [{text: 'OK', onPress: async () => {}}],
                //       {cancelable: false},
                //     );
                //   } else {
                //     props.setselectedDate(day.dateString);
                //   }
                // } else {
                //   props.setselectedDate(day.dateString);
                // }

                /// ==============
                // if (props.selectFromDate) {
                //   props.setselectedDate(day.dateString);
                // } else {
                //   if (day.dateString < props?.fromDate) {
                //     Alert.alert(
                //       'Oops',
                //       'To date should be greater than from date.',
                //       [{text: 'OK', onPress: async () => {}}],
                //       {cancelable: false},
                //     );
                //   } else {
                //     props.setselectedDate(day.dateString);
                //   }
                // }
              }}
              onDayLongPress={day => {}}
              monthFormat={'yyyy MM'}
              onMonthChange={month => {}}
              hideArrows={false}
              renderArrow={direction => {
                if (direction === 'left') {
                  return (
                    <View>
                      <Image
                        source={imagePath.rightArrow}
                        style={[
                          styles.arrowIconStyle,
                          {transform: [{rotate: '180deg'}]},
                        ]}
                      />
                    </View>
                  );
                } else if (direction === 'right') {
                  return (
                    <View>
                      <Image
                        source={imagePath.rightArrow}
                        style={styles.arrowIconStyle}
                      />
                    </View>
                  );
                }
              }}
              hideExtraDays={true}
              disableMonthChange={false}
              firstDay={1}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableArrowLeft={false}
              disableArrowRight={false}
              disableAllTouchEventsForDisabledDays={false}
              renderHeader={date => {
                let dateObj = new Date(date);
                let momentObj = moment(dateObj);
                let momentString = momentObj.format('MMMM-YYYY');

                return (
                  <View>
                    <Text style={styles.headerText}>{momentString}</Text>
                  </View>
                );
              }}
              enableSwipeMonths={false}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.modalColor,
    paddingHorizontal: 10,
  },
  modalInsideContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderWidth: 3,
    //borderColor: colors.blueBorderColor,
    borderRadius: 20,
    paddingVertical: 20,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateTimeContainer: {
    width: '35%',
  },
  timeContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingHorizontal: 5,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: COLORS.lightBorderColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 8,
  },
  userIconStyle: {
    height: 20,
    width: 20,
  },
  timeText: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  dateContainer: {
    backgroundColor: '#0b698c',
    width: '100%',
    height: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {color: COLORS.white, fontSize: 12},
  fromToContainer: {width: '60%'},
  fromAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toAddressIndicator: {
    height: 6,
    width: 6,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  addressText: {fontSize: 10, marginLeft: 5, color: COLORS.black},
  dotIndicator: {
    height: 5,
    width: 5,
    backgroundColor: COLORS.lightGray,

    borderRadius: 10,
    marginVertical: 1,
  },
  toAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromAddressIndicator: {
    height: 6,
    width: 6,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  adhocButtonContainer: {marginHorizontal: 10, marginTop: 5, width: 70},
  adhocButtonStyle: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 2,
  },
  regularButtonStyle: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b698c',
    paddingVertical: 2,
  },

  newRow: {marginVertical: 10},
  mainIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f4f4f4',
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  TripModalbuttonContainer: {width: '40%'},
  laterButtonStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  laterButtonText: {
    color: COLORS.white,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  acceptButtonStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
  },
  acceptButtonText: {
    color: COLORS.white,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '400',
  },
  arrowIconStyle: {height: 20, width: 20},
  mainConntainer: {
    flex: 1,
  },
  headerText: {color: COLORS.black},
});

export default CalenderComp;
