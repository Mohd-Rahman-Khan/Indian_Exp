import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../Image';

const Dashboard = ({navigation, routes, props}) => {
  console.log('navigation Dashboard', props);
  // const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedDepotTeam, setSelectedDpotTeam] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [todate, setToDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [mode1, setMode1] = useState('date1');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate1 = selectedDate;
    setShow(false);
    setToDate(currentDate1);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode1 = currentMode => {
    setShow(true);
    setMode1(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const showDatepicker1 = () => {
    showMode1('date1');
  };
  function onMultiChange() {
    return item => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  function onMultiChanges() {
    return item => setSelectedTeam(xorBy(selectedTeam, [item], 'id'));
  }

  function onMultiDepotChange() {
    return item => setSelectedDpotTeam(xorBy(selectedDepotTeam, [item], 'id'));
  }

  const K_OPTIONS = [
    {
      item: 'Financial Express',
      id: '1',
    },
    {
      item: 'Financial Express(UPC)',
      id: '2',
    },
    {
      item: 'Financial Express(UPC)',
      id: '3',
    },
    {
      item: 'Financial Express(IPC)',
      id: '3',
    },
  ];
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.publicationview}>
          <Text style={styles.publication}>Select Publication</Text>
          <SelectBox
            // containerStyle={}
            containerStyle={styles.selecteditem}
            labelStyle={styles.label}
            inputFilterContainerStyle={styles.inputs}
            inputFilterStyle={styles.filters}
            selectedItemStyle={styles.selected}
            optionsLabelStyle={styles.option}
            listEmptyLabelStyle={styles.list}
            multiOptionContainerStyle={styles.multiple}
            multiOptionsLabelStyle={styles.labels}
            multiListEmptyLabelStyle={styles.multi}
            optionContainerStyle={styles.friday}
            label=""
            options={K_OPTIONS}
            selectedValues={selectedTeams}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
          />
        </View>
        <View style={styles.publicationview}>
          <Text style={styles.publication}>Select Edition</Text>
          <SelectBox
            // containerStyle={}
            containerStyle={styles.selecteditem}
            labelStyle={styles.label}
            inputFilterContainerStyle={styles.inputs}
            inputFilterStyle={styles.filters}
            selectedItemStyle={styles.selected}
            optionsLabelStyle={styles.option}
            listEmptyLabelStyle={styles.list}
            multiOptionContainerStyle={styles.multiple}
            multiOptionsLabelStyle={styles.labels}
            multiListEmptyLabelStyle={styles.multi}
            optionContainerStyle={styles.friday}
            label=""
            options={K_OPTIONS}
            selectedValues={selectedTeam}
            onMultiSelect={onMultiChanges()}
            onTapClose={onMultiChanges()}
            isMulti
          />
        </View>
        <View style={styles.publicationview}>
          <Text style={styles.publication}>Select Depot/s</Text>
          <SelectBox
            // containerStyle={}
            containerStyle={styles.selecteditem}
            labelStyle={styles.label}
            inputFilterContainerStyle={styles.inputs}
            inputFilterStyle={styles.filters}
            selectedItemStyle={styles.selected}
            optionsLabelStyle={styles.option}
            listEmptyLabelStyle={styles.list}
            multiOptionContainerStyle={styles.multiple}
            multiOptionsLabelStyle={styles.labels}
            multiListEmptyLabelStyle={styles.multi}
            optionContainerStyle={styles.friday}
            label=""
            options={K_OPTIONS}
            selectedValues={selectedDepotTeam}
            onMultiSelect={onMultiDepotChange()}
            onTapClose={onMultiDepotChange()}
            isMulti
          />
        </View>

        <View style={styles.mainview}>
          <View style={styles.frominput}>
            <Text style={styles.fromtext}>From</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Choose Date"
              editable={false}
              value={todate.toDateString()}
            />
            <View style={styles.fromcalanderimage}>
              <TouchableOpacity onPress={showDatepicker}>
                <Image source={images.calander} style={styles.fromcalander} />
              </TouchableOpacity>
            </View>
            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
          </View>

          <View style={styles.frominput}>
            <Text style={styles.fromtext}>To</Text>
            <TextInput
              style={styles.totextInput}
              placeholder="Choose Date"
              editable={false}
              value={date.toDateString()}
            />
            <View style={styles.calanderimage}>
              <TouchableOpacity onPress={showDatepicker1}>
                <Image source={images.calander} style={styles.calander} />
              </TouchableOpacity>
            </View>
            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={todate}
              mode={mode1}
              is24Hour={true}
              onChange={onChangeTo}
            />
          )}
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('COLLECTION')}>
            <View style={styles.logoutBtn}>
              <Text style={styles.btnText}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
