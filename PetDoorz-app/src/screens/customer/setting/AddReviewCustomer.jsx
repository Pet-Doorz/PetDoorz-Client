import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { createReview } from "../../../store/actions/actionCustomer";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AddReviewCustomer({ route, navigation }) {
    const { HotelId, bookingId, hotelName } = route.params
    const [star, setStar] = useState(1)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleAddReview = async () => {
        const access_token = await AsyncStorage.getItem('customer_access_token')
        dispatch(createReview({
            HotelId,
            bookingId,
            rating: star,
            comment,
            access_token
        }))
            .then((result) => {
                console.log(result)
                navigation.navigate('Customer Books')
            }).catch((err) => {
                console.log(err)
            });
    }

    const handlePlusStar = () => {
        if (star > 4) return console.log('ribet')
        setStar((prev) => prev + 1)
    }

    const handleDeleteStar = () => {
        if (star < 2) return console.log('ribet')
        setStar((prev) => prev - 1)
    }

    const getTempArray = () => {
        let res = []
        for (let i = 0; i < star; i++) {
            res.push(0)
        }

        return res
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={[card.container, card.shadowProp]}>
                <Text style={card.title}>{hotelName}</Text>
                <Text style={{ fontSize: 15, marginBottom: 15 }}>Review</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginBottom: 13, marginTop: 12 }}>
                    <TouchableOpacity onPress={handleDeleteStar}>
                        <AntDesign name="minuscircle" size={30} color="#48034F" />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            getTempArray().map((e, i) => {
                                return (
                                    <FontAwesome key={i} name="star" size={30} color="#FDCC0D" />
                                )
                            })
                        }
                    </View>
                    <TouchableOpacity onPress={handlePlusStar}>
                        <AntDesign name="pluscircle" size={30} color="#48034F" />
                    </TouchableOpacity>
                </View>
                <View style={{ gap: 20 }}>
                    <TextInput onChangeText={(e) => setComment(e)} label='Comment' mode="outlined" multiline={true} numberOfLines={5} style={[styles.textInput, { flex: 3 }]}></TextInput>
                    <Button onPress={handleAddReview} mode="contained" style={{ borderRadius: 8 }} theme={{ colors: { primary: '#48034F' } }}>Add</Button>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInput: {
    }
})

const card = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        width: '90%',
        paddingBottom: 25
    },
    shadowProp: {
        elevation: 3
    },
    title: {
        fontSize: 20,
        fontWeight: '600'
    },
    balance: {
        fontSize: 16,
        fontWeight: '500',
        marginEnd: 20
    }
})