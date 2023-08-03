import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from "../../../lib/imagekit"
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { registerAdmin } from '../../store/actions/actionAdmin'

export default function RegisterAdmin({ navigation }) {
  const [eye, setEye] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [logo, setLogo] = useState('')
  const [logoFile, setLogoFile] = useState({})
  const [images, setImages] = useState('')
  const [imageFiles, setImageFiles] = useState([])


  // Location
  const userLocation = useSelector((state) => state.user.location)
  const dispatch = useDispatch()
  const [location, setLocation] = useState({})
  useEffect(() => {
    if (userLocation) {
      setLocation({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      })
    }
  }, [userLocation])

  function formatLongLat() {
    return `${location.latitude} ${location.longitude}`
  }
  // End of Location


  // function getImageArr() {
  //   return [image1, image2, image3]
  // }

  function handleImageChange(val, i) {
    let newArr = [...images];
    newArr[i] = val;
    setImages(newArr);
  }

  function handleImageFileChange(val, i) {
    let newArr = [...imageFiles];
    newArr[i] = val;
    setImageFiles(newArr);
  }

  async function handleRegister() {
    // console.log(email, password, name, formatLongLat(),
    //   logo, description, address, phoneNumber, images, imageFiles)

    let formData = {
      email, password, name, location: formatLongLat(),
      logoHotel: "", description, address, phoneNumber, images: []
    }
    try {
      let resUpload = await uploadFileToImagekit(imageFiles[0])
      if (!resUpload.url) throw { name: "Upload Error" }
      formData.logoHotel = resUpload.url

      for (let i = 0; i < imageFiles.length; i++) {
        let resUpload = await uploadFileToImagekit(imageFiles[0])
        if (!resUpload.url) throw { name: "Upload Error" }
        formData.images.push(resUpload.url)
      }

      dispatch(registerAdmin(formData))
        // .then(() => {
        //     dispatch(detailAdmin())
        // })
        .then((res) => {
          Alert.alert('Success', 'Successfully Registered!', [
            { text: 'OK' },
          ])
          navigation.navigate('Admin Login')
        })
    } catch (error) {
      console.log(error)
    }
  }

  async function openFileSelector(i) {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({});
      console.log(res)
      res = {
        name: "register-admin",
        uri: res.assets[0].uri,
        type: res.assets[0].type + "/jpg"
      }
      handleImageChange(res.uri, i)
      handleImageFileChange(res, i)
    } catch (err) {
      console.log(err)
      // if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      // } else {
      // 	throw err;
      // }
    }
  }

  async function openFileSelectorLogo() {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({});
      console.log(res)
      res = {
        name: "register-admin",
        uri: res.assets[0].uri,
        type: res.assets[0].type + "/jpg"
      }
      setLogo(res.uri)
      setLogoFile(res)
    } catch (err) {
      console.log(err)
      // if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      // } else {
      // 	throw err;
      // }
    }
  }

  async function openCamera(i) {
    try {
      var res = await ImagePicker.launchCameraAsync({});
      console.log(res)
      res = {
        name: "register-admin",
        uri: res.assets[0].uri,
        type: res.assets[0].type + "/jpg"
      }
      handleImageChange(res.uri, i)
      handleImageFileChange(res, i)
    } catch (err) {
      console.log(err)
      // if (DocumentPicker.isCancel(err)) {
      // 	// User cancelled the picker, exit any dialogs or menus and move on
      // } else {
      // 	throw err;
      // }
    }
  }

  async function uploadFileToImagekit(fileData) {
    try {
      console.log("fileData", fileData)
      const uploadedFile = await uploadFile(fileData);
      return uploadedFile
      // setUploadFileUrl(uploadedFile.url);
    } catch (err) {
      //handle error in uploading file
      console.log(err)
    }
  }

  const handleEye = () => {
    if (eye) {
      setEye(false)
    } else {
      setEye(true)
    }
  }

  // if (!userLocation.latitude) {
  //   return (
  //     <View style={ styles.container }>
  //       <Text>No Location Detected!</Text>
  //     </View>
  //   )
  // }

  return (
    <ScrollView style={{ marginTop: 100 }} contentContainerStyle={{ alignContent: 'center', alignItems: 'center', paddingHorizontal: "6%" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Hotel Register</Text>
      <TextInput label='Email' style={styles.textInput} onChangeText={email => setEmail(email)}></TextInput>
      <TextInput label='Password' onChangeText={password => setPassword(password)} secureTextEntry={eye ? false : true} style={styles.textInput} right={<TextInput.Icon icon="eye" onPress={handleEye} />}></TextInput>
      <TextInput label='Hotel Name' onChangeText={name => setName(name)} style={styles.textInput}></TextInput>
      <TextInput label='Hotel Phone Number' onChangeText={phoneNumber => setPhoneNumber(phoneNumber)} style={styles.textInput}></TextInput>
      <TextInput label='Hotel Address' onChangeText={address => setAddress(address)} style={styles.textInput}></TextInput>
      <TextInput label='Hotel Location' value={formatLongLat()} style={styles.textInput} defaultValue="Please mark on map" disabled></TextInput>
      <MapView
        style={styles.map}
        region={location}
      >
        <Marker draggable
          coordinate={location}
          onDragEnd={(e) => {
            console.log(e.nativeEvent.coordinate)
            setLocation(e.nativeEvent.coordinate)
          }}
        />
      </MapView>
      <TextInput style={styles.textInput} label={'Hotel Description'} multiline={true} numberOfLines={4} onChangeText={val => setDescription(val)}></TextInput>

      <View style={{ flexDirection: 'row', width: "100%", marginBottom: 20 }}>
        <TextInput label='Hotel Logo' value={logo} style={styles.imageInput} disabled></TextInput>
        {/* <TextInput mode="outlined" label={'Room Image'} style={{ flex: 2 }} disabled value={image1}></TextInput> */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", gap: 20, marginStart: 5, justifyContent: "center" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openFileSelectorLogo()}>
            <FontAwesome name="upload" size={25} color="#48034F" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: "100%", marginBottom: 20 }}>
        <TextInput label='Hotel Image' value={images[0]} style={styles.imageInput} disabled></TextInput>
        {/* <TextInput mode="outlined" label={'Room Image'} style={{ flex: 2 }} disabled value={image1}></TextInput> */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", gap: 20, marginStart: 5, justifyContent: "center" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openCamera(0)}>
            <FontAwesome name="camera" size={25} color="#48034F" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openFileSelector(0)}>
            <FontAwesome name="upload" size={25} color="#48034F" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: "100%", marginBottom: 20 }}>
        <TextInput label='Hotel Image' value={images[1]} style={styles.imageInput} disabled></TextInput>
        {/* <TextInput mode="outlined" label={'Room Image'} style={{ flex: 2 }} disabled value={image1}></TextInput> */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", gap: 20, marginStart: 5, justifyContent: "center" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openCamera(1)}>
            <FontAwesome name="camera" size={25} color="#48034F" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openFileSelector(1)}>
            <FontAwesome name="upload" size={25} color="#48034F" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: "100%", marginBottom: 20 }}>
        <TextInput label='Hotel Image' value={images[2]} style={styles.imageInput} disabled></TextInput>
        {/* <TextInput mode="outlined" label={'Room Image'} style={{ flex: 2 }} disabled value={image1}></TextInput> */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", gap: 20, marginStart: 5, justifyContent: "center" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openCamera(2)}>
            <FontAwesome name="camera" size={25} color="#48034F" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => openFileSelector(2)}>
            <FontAwesome name="upload" size={25} color="#48034F" />
          </TouchableOpacity>
        </View>
      </View>

      <Button mode='contained' theme={{ colors: { primary: '#48034F' } }} onPress={handleRegister}>Register</Button>
      <View style={{ marginBottom: 50 }}>
        <Text style={{ marginTop: 15 }}>Already sign up?</Text>
        <Button style={{ marginTop: 0 }} onPress={() => navigation.navigate('Admin Login')}>Login</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: "100%",
    marginBottom: 20
  },
  imageInput: {
    flex: 2
  },
  map: {
    width: "100%",
    height: 250,
    marginBottom: 20
  }
});
