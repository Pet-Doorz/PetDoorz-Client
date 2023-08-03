import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from "react-native"
import { TextInput } from "react-native-paper"
import ImageView from "react-native-image-viewing"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-native-paper"
import { detailAdmin, updateStatusToProcess } from '../../../store/actions/actionAdmin'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { uploadFile } from "../../../../lib/imagekit"
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'


export default function BookDetailAdmin({ route, navigation }) {
    const { id } = route.params

    const dispatch = useDispatch()

    const detail = useSelector((state) => state.admin.detailAdmin)
    const bookings = []
    const data = detail.Rooms.map((e) => e.Bookings)
    data.forEach((e) => {
        e.forEach((i) => {
            bookings.push(i)
        })
    })

    const [booking] = bookings.filter(e => e.id === id)
    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)
    const bookDate = new Date(booking.createdAt)

    const [room] = detail.Rooms.filter((e) => e.id == booking.RoomId)

    const [visible, setIsVisible] = useState(false) // bikin foto jadi keliatan

    const [petUrl, setPetUrl] = useState('')

    const alertSuccess = () =>
        Alert.alert('Success', 'Successfully change status', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    const handleProcessBooking = async () => {
        const access_token = await AsyncStorage.getItem('admin_access_token')
        uploadFileToImagekit(imageFile)
            .then((res) => {
                return dispatch(updateStatusToProcess({
                    id: booking.id,
                    petImage: res.url,
                    access_token
                }))
            })
            .then((result) => {
                console.log(result)
                alertSuccess()
                return dispatch(detailAdmin())
            })
            .then((_) => {
                navigation.navigate('Admin Books Stack')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // IMAGEKIT
    const [ imageUri, setImageUri ] = useState("");
    const [ imageFile, setImageFile ] = useState({});

    async function openCamera() {
        try{
			var res = await ImagePicker.launchCameraAsync({});
            console.log(res)
            res = {
                name: "booking",
                uri: res.assets[0].uri,
                type: res.assets[0].type + "/jpg"
            }
            setImageUri(res.uri)
            setImageFile(res)
		} catch(err) {
            console.log(err)
			// if (DocumentPicker.isCancel(err)) {
			// 	// User cancelled the picker, exit any dialogs or menus and move on
			// } else {
			// 	throw err;
			// }
		}
    }

	async function uploadFileToImagekit(fileData) {
		try{
            console.log("fileData", fileData)
			const uploadedFile = await uploadFile(fileData);
			return uploadedFile
            // setUploadFileUrl(uploadedFile.url);
		}catch(err){
			//handle error in uploading file
            console.log(err)
		}
	}

    const currency = (value) => {
        const currency = new Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR' }).format(value)
        return currency.split(',')[0]
    }


    return (
        <ScrollView>
            {
                booking.petImage ? (
                    <ImageView // ini tuh cuman modal doang, jadi harus ditrigger, triggernya lewat touchable opacity dibawah
                        images={[{
                            uri: booking.petImage
                        }]} // harus array of object dengan key uri
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setIsVisible(false)}
                    />
                ) : ''
            }
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>{booking.Customer.fullName}</Text>
                        <Text style={{ fontWeight: '300' }}>{bookDate.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.horizontalMarker}></View>
                    <View style={styles.contentRow}>
                        <Text>Checkin Date: </Text>
                        <Text>{checkIn.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Checkout Date: </Text>
                        <Text>{checkOut.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Room: </Text>
                        <Text>{room.name}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Total Pet: </Text>
                        <Text>{booking.totalPet}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Services: </Text>
                        <Text>
                            {
                                booking.BookingServices.length > 0 ? (
                                    booking.BookingServices.map((e) => e.Service.name).join(', ')
                                ) : ''
                            }
                        </Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Total: </Text>
                        <Text>{currency(booking.grandTotal)}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Text>Status: </Text>
                        <Text>{booking.status}</Text>
                    </View>

                    {/* Ini buat update status, sama upload foto */}
                    {
                        booking.status === 'booked' ? (
                            <View style={{ alignItems: 'center', gap: 5, marginTop: 35 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 12 }}>Pet Photo</Text>
                                <View style={{ flexDirection: 'row', alignItems: "center", gap: 20 }}>
                                    <TextInput mode="outlined" label={'Please take a picture of the pet to proceed'} style={{ width: 250, marginBottom: 12 }} value={imageUri} disabled></TextInput>
                                    <TouchableOpacity activeOpacity={0.8} onPress={openCamera}>
                                        <FontAwesome name="camera" size={25} color="#48034F" />
                                    </TouchableOpacity>
                                </View>
                                
                                { imageUri && <Image
                                    style={{ width: "100%", height: 200, objectFit: "contain" }}
                                    source={{ uri: imageUri }}
                                ></Image>}

                                {/* dialog untuk done */}
                                <Button mode="contained" onPress={handleProcessBooking} style={{ borderRadius: 10, marginTop: 45 }} theme={{ colors: { primary: '#48034F' } }}>Process</Button>
                            </View>
                        ) : (
                            <View style={{ alignItems: 'center', gap: 5 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 12 }}>Pet Photo</Text>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
                                    <Image style={{ width: 100, height: 100 }} source={{ uri: booking.petImage }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 20,
        paddingBottom: 50,
        flexDirection: 'column',
        borderRadius: 10,
        elevation: 5
    },
    horizontalMarker: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 12,
        marginBottom: 12,
        elevation: 2
    },
    contentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }
})