import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { UserContext } from '../provider/UserProvider';
import { useAuth } from '../provider/AuthProvider';
import RootComponent from '../component/RootComponent';

const Profile = () => {
  const { userDetails } = React.useContext(UserContext);
  const { accessToken } = useAuth();

  return (
    <RootComponent>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white', width: '100%', height: '100%', flexDirection: 'column' }}>
        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', padding: 16, justifyContent: 'center', alignItems: 'center' }}>
          {/* Top info container */}
          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
            <Text style={{ fontSize: 20 }}>
              PERSONAL DETAILS
            </Text>
          </View>

          {/* Input fields container */}
          <View style={{ marginTop: 10, width: '100%', flexDirection: 'column' }} >

            {/* profile image container */}
            <View style={{ alignSelf: 'center', position: 'relative', padding: 10 }}>

              <Avatar
                activeOpacity={0.7}
                rounded title="GA"
                size='xlarge' />

              <View style={{ right: 0, bottom: 0, position: 'absolute' }}>
                <Avatar
                  source={{
                    uri: userDetails.profileImage,
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                  }
                  }
                  onPress={() => this.pickImageButtonClick()}
                  activeOpacity={0.7}
                  rounded
                  size='medium' />
              </View>

            </View>

            <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20 }}>
              {/* Firstname fields*/}
              <View style={{ marginTop: 15 }}>
                <TextInput
                  style={{ paddingLeft: 16, borderRadius: 5, height: 50 }}
                  placeholder="First name"
                >
                </TextInput>

              </View>


              {/* Lastname field */}
              <View style={{ marginTop: 10 }}>
                <TextInput
                  style={{ paddingLeft: 16, borderRadius: 5, height: 50 }}
                  placeholder="Last name">

                </TextInput>
              </View>

              {/* Email field */}
              <View style={{ marginTop: 10 }}>
                <TextInput
                  style={{ paddingLeft: 16, borderRadius: 5, height: 50 }}
                  placeholder="Email">

                </TextInput>
              </View>

              {/* Password field */}
              <View style={{ marginTop: 10 }}>
                <TextInput
                  style={{ paddingLeft: 16, borderRadius: 5, height: 50 }}
                  placeholder="Password">

                </TextInput>
              </View>

              {/* Phone number field */}
              <View style={{ marginTop: 10 }}>
                <TextInput
                  keyboardType='phone-pad'
                  style={{ paddingLeft: 16, borderRadius: 5, height: 50 }}
                  placeholder="Phone number">

                </TextInput>
              </View>

              {/* Save button */}
              <TouchableOpacity
                style={{
                  marginTop: 26,
                  backgroundColor: '#1565c0',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center', height: 50
                }}
              >
                <Text style={{ color: 'white' }}>SAVE</Text>
              </TouchableOpacity>

              {/* Cancel button */}
              <TouchableOpacity
                style={{
                  marginTop: 8,
                  borderWidth: 1,
                  borderColor: '#1565c0',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center', height: 50
                }}
              >
                <Text >CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </RootComponent>
  )
};

export default Profile;