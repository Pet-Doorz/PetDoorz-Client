import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewRoom } from "../../../store/actions/actionAdmin";
import { uploadFile } from "../../../../lib/imagekit"
import * as ImagePicker from 'expo-image-picker';

export default function AddRoomAdmin() {
    const dispatch = useDispatch()

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ capacity, setCapacity ] = useState(0);
    const [ price, setPrice ] = useState(0);
    const [ imageUri, setImageUri ] = useState("");
    const [ imageFile, setImageFile ] = useState([]);

    async function handleSubmit() {
        let formData = {
            name, description, capacity, price
        }
        try {
            let resUpload = await uploadFileToImagekit(imageFile[0])
            if (!resUpload.url) throw { name: "Upload Error" }
            formData.imageUrl = resUpload.url
            dispatch(postNewRoom(formData))
        } catch (error) {
            console.log(error)
        }
    }

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
    // ------------------------ END IMAGEKIT -------------------------

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[{ marginTop: 10, gap: 9 }, styles.card]}>
                <Text style={styles.title}>Add Room</Text>
                <TextInput mode="outlined" label={'Room Name'} onChangeText={newText => setName(newText)}></TextInput>
                <TextInput mode="outlined" label={'Room Description'} multiline={true} numberOfLines={4} onChangeText={newText => setDescription(newText)}></TextInput>
                <TextInput mode="outlined" label={'Room Capacity'} inputMode="numeric" onChangeText={newText => setCapacity(newText)}></TextInput>
                <TextInput mode="outlined" label={'Room Price'} inputMode="numeric" onChangeText={newText => setPrice(newText)}></TextInput>
                {/* Input image */}
                <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="outlined" label={'Room Image'} style={{ flex: 2 }} disabled value={imageUri}></TextInput>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20, justifyContent: "center" }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={openCamera}>
                            <FontAwesome name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={openFileSelector}>
                            <FontAwesome name="upload" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                { imageUri && <Image
                    style={{ width: "100%", height: 200, objectFit: "contain" }}
                    source={{ uri: imageUri }}
                ></Image>}

                {/* <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="outlined" label={'Image 1'} style={{ flex: 2 }} disabled value={images[1]}></TextInput>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20, justifyContent: "center"   }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('camera')}>
                            <FontAwesome name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('galery')}>
                            <FontAwesome name="upload" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput mode="outlined" label={'Image 1'} style={{ flex: 2 }} disabled value={images[2]}></TextInput>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 20, marginStart: 20, justifyContent: "center"   }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('camera')}>
                            <FontAwesome name="camera" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('galery')}>
                            <FontAwesome name="upload" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View> */}


                <Button mode="contained" style={{ borderRadius: 5, marginTop: 12 }} theme={{ colors: { primary: 'gray' } }} onPress={handleSubmit}>Add</Button>
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
        width: '98%'
    },
})