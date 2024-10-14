import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import images from '../../Image';
import React from 'react';
import styles from './styles';

const EditProfile = ({navigation}) => {
  const DATA = [
    {
      Emp_No: 'Emp001',
      FIRST_Name: 'Prashant',
      LAST_Name: 'Vats',
      PHONE: '9568549038',
      EMAIL: 'prashantvats53@gmail.com',
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <View>
            <View style={styles.profilepicview}>
              <Image source={images.profilepic} style={styles.profilepic} />
              <Text style={styles.changeprofiletext}>
                Change profile picture
              </Text>
            </View>
            <View style={styles.profilecontent}>
              <View style={styles.empno}>
                <Text style={styles.empno}>EMP NO:</Text>
              </View>

              <View style={styles.empcode1}>
                <Text style={styles.empcode}>{item.Emp_No}</Text>
              </View>
              <View>
                <Image source={images.lock} style={styles.lockimage} />
              </View>
            </View>
            <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>FIRST NAME:</Text>
              </View>

              <View style={styles.empcode1}>
                <TextInput placeholder={item.FIRST_Name} style={styles.name} />
              </View>
            </View>
            <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>LAST NAME:</Text>
              </View>

              <View style={styles.emplast}>
                <TextInput
                  placeholder={item.LAST_Name}
                  style={styles.lastname}
                />
              </View>
            </View>
            <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>PHONE:</Text>
              </View>

              <View style={styles.emplast}>
                <TextInput placeholder={item.PHONE} style={styles.phone} />
              </View>
            </View>

            <View style={styles.profilecontent}>
              <View style={styles.firstname}>
                <Text style={styles.firstname}>Email:</Text>
              </View>

              <View style={styles.emplast}>
                <TextInput placeholder={item.EMAIL} style={styles.email} />
              </View>
            </View>

            <View style={styles.buttongroup}>
              <View>
                <TouchableOpacity>
                  <View style={styles.canclebtn}>
                    <Text style={styles.canclebtntext}>CANCLE</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                  <View style={styles.logoutBtn}>
                    <Text style={styles.btnText}>SAVE</Text>
                  </View>
                </TouchableOpacity>

            </View>
          </View>
        )}
      />
    </View>
  );
};

export default EditProfile;
