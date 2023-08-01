import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux"
import { uploadFile } from "../../../../lib/imagekit"
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { detailAdmin, editRoom } from "../../../store/actions/actionAdmin";


export default function EditDetailRoomAdmin({ navigation, route }) {
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.admin.detailAdmin)
    const { id } = route.params
    const room = detail.Rooms.find(e => e.id == id)

    const [ name, setName ] = useState(room.name);
    const [ description, setDescription ] = useState(room.description);
    const [ capacity, setCapacity ] = useState(room.capacity);
    const [ price, setPrice ] = useState(room.price);
    const [ imageUri, setImageUri ] = useState(room.imageUrl);
    const [ imageFile, setImageFile ] = useState([]);

    async function handleSubmit() {
        let formData = { name, description, capacity, price }
        try {
            let resUpload;
            if (imageFile.length === 1) {
                resUpload = await uploadFileToImagekit(imageFile[0])
                if (!resUpload.url) throw { name: "Upload Error" }
                formData.imageUrl = resUpload.url
            } else {
                formData.imageUrl = imageUri
            }
            dispatch(editRoom(formData, id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(detailAdmin())
    }, [])

    // IMAGEKIT
	async function openFileSelector() {
		try{
			let res = await ImagePicker.launchImageLibraryAsync({});
            console.log(res)
            res = {
                name: "booking",
                uri: res.assets[0].uri,
                type: res.assets[0].type + "/jpg"
            }
			setImageUri(res.uri)
            setImageFile([res])
		}catch(err) {
            console.log(err)
			// if (DocumentPicker.isCancel(err)) {
				// User cancelled the picker, exit any dialogs or menus and move on
			// } else {
			// 	throw err;
			// }
		}
	}

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
            setImageFile([res])
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
    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Edit Room</Text>
                    <Button mode="contained" style={{ borderRadius: 5 }} theme={{ colors: { primary: '#b00808' } }} >Delete</Button>
                </View>
                <TextInput mode="outlined" label={'Room Name'} defaultValue={room.name} onChangeText={val => setName(val)}></TextInput>
                <TextInput mode="outlined" label={'Room Description'} defaultValue={room.description} multiline={true} numberOfLines={4} onChangeText={val => setDescription(val)}></TextInput>
                <TextInput mode="outlined" label={'Room Capacity'} inputMode="numeric" defaultValue={room.capacity + ""} onChangeText={val => setCapacity(val)}></TextInput>
                <TextInput mode="outlined" label={'Room Price'} inputMode="numeric" defaultValue={room.price + ""} onChangeText={val => setPrice(val)}></TextInput>
                
                {/* Image Input */}
                <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="outlined" label={'Room Image'} style={{ flex: 2 }} disabled value={imageUri}></TextInput>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20, justifyContent: "center" }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={openCamera}>
                            <FontAwesome name="camera" size={25} color="#48034F" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={openFileSelector}>
                            <FontAwesome name="upload" size={25} color="#48034F" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                { imageUri && <Image
                    style={{ width: "100%", height: 200, objectFit: "contain", marginTop: 10 }}
                    source={{ uri: imageUri }}
                ></Image>}
                {/* end of image input */}

                <Button mode="contained" style={{ borderRadius: 5, marginTop: 12 }} theme={{ colors: { primary: 'gray' } }} onPress={handleSubmit}>Submit</Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingBottom: 25,
        elevation: 5,
        width: '98%',
        marginBottom: 50
    },
})