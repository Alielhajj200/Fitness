import React, { useState,useEffect } from 'react';
import { Modal, TextInput, Button } from 'react-native';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as SecureStore from 'expo-secure-store';
import base64 from "react-native-base64";





export default function profile() {


  

const [token, setToken] = useState<string | null>(null);
const [datatoken, setdatatoken] = useState(null);
const TOKEN_KEY = 'abcd123';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const tokenObject = JSON.parse(token);
        const tokenvalue = tokenObject.token;
        setToken(tokenvalue);
        const payloadresult =await decodeJWT(tokenvalue)
           setdatatoken(payloadresult)
        console.log(datatoken?.user?.gender);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const decodeJWT = async (token: string) => {
    if (token.length === 0) {
      return null;
    }
    const headerPart = sanitizeJson(base64.decode(token.split(".")[0]));
    const payloadPart = sanitizeJson(base64.decode(token.split(".")[1]));

    const header = JSON.parse(headerPart);
    const payload = JSON.parse(payloadPart);
    return payload;
  };

  const sanitizeJson = (json: string) => {
    return json.replace(/[\u0000]+/g, "");
  };

  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar} />

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="edit-3"
                    size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>{datatoken?.user?.email}</Text>

            <Text style={styles.profileAddress}>
              Welcome in workfit
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                <FeatherIcon color="#fff" name="globe" size={20} />
              </View>

              <Text style={styles.rowLabel}>Language</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <FeatherIcon color="#fff" name="moon" size={20} />
              </View>

              <Text style={styles.rowLabel}>Dark Mode</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={darkMode => setForm({ ...form, darkMode })}
                value={form.darkMode} />
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon
                  color="#fff"
                  name="navigation"
                  size={20} />
              </View>

              <Text style={styles.rowLabel}>Location</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <FeatherIcon
                  color="#fff"
                  name="at-sign"
                  size={20} />
              </View>

              <Text style={styles.rowLabel}>Email Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={emailNotifications =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications} />
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <FeatherIcon color="#fff" name="bell" size={20} />
              </View>

              <Text style={styles.rowLabel}>Push Notifications</Text>

              <View style={styles.rowSpacer} />

              <Switch
                onValueChange={pushNotifications =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications} />
            </View>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <FeatherIcon color="#fff" name="mail" size={20} />
              </View>

              <Text style={styles.rowLabel}>Contact Us</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>Age</Text>
              <Text style={styles.agelabel}>{datatoken?.user?.age}</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>

            

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>Gender</Text>
              <Text style={styles.resultlabel}>{datatoken?.user?.gender}</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>Weight</Text>
              <Text style={styles.resultlabel}>{datatoken?.user?.weight}</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>Height</Text>
              <Text style={styles.heightlabel}>{datatoken?.user?.height}</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>ActivityLevel</Text>
              <Text style={styles.activitylabel}>{datatoken?.user?.activityLevel}</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>Goal</Text>
              <Text style={styles.resultlabel}>{datatoken?.user?.goal}</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>Bmi</Text>
              <Text style={styles.bmilabel}>{datatoken?.user?.bmi}</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}>
              

              <Text style={styles.rowLabel}>BodyType</Text>
              <Text style={styles.bodylabel}>{datatoken?.user?.bodyType}</Text>

             
              <View style={styles.rowSpacer} />
              <FeatherIcon
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
          
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop:20
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0c0c0c',
    marginLeft:12
    
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  resultlabel: {
    marginLeft: 170,
    fontSize: 17,
    textAlignVertical: 'center', // Add this line to vertically align the text
  },
  agelabel: {
    marginLeft: 195,
    fontSize: 17,
    textAlignVertical: 'center', // Add this line to vertically align the text
  },
  heightlabel:{
    marginLeft: 175,
    fontSize: 17,
    textAlignVertical: 'center', 
  },
  activitylabel:{
    marginLeft: 120,
    fontSize: 17,
    textAlignVertical: 'center',
  },
  bmilabel:{
    marginLeft: 200,
    fontSize: 17,
    textAlignVertical: 'center',
  },
  bodylabel:{
    marginLeft: 140,
    fontSize: 17,
    textAlignVertical: 'center',
  },
});