import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { detailAdmin } from '../../../store/actions/actionAdmin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RoomCard from '../../../components/admin/RoomCard'


export default function HomeAdmin({ navigation }) {
  const dispatch = useDispatch()

  const detail = useSelector((state) => state.admin.detailAdmin)

  useEffect(() => {
    (
      async () => {
        const access_token = await AsyncStorage.getItem('admin_access_token')
        dispatch(detailAdmin(access_token))
      }
    )()
  }, [])

  const handleAddFormScreen = () => {
    navigation.navigate('Add Room Admin')
  }

  const handleEditFormScreen = () => {
    // harusnya bawa semua detail roomnya atau id aja ge boleh
    navigation.navigate('Edit Room Admin')
  }

  const handleAddServiceFormScreen = () => {
    navigation.navigate('Add Service Admin')
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Room List</Text>
          <Button mode='contained' theme={{ colors: { primary: 'gray' } }} style={{ borderRadius: 5 }} onPress={handleAddFormScreen}>Add Room</Button>
        </View>
        <View style={{ marginTop: 12 }}>
          {/* Card room, nanti dibuat component sendiri */}
          {
            detail.Rooms.map((e) => {
              return <RoomCard key={e.id} room={e} handleEditFormScreen={handleEditFormScreen} />
            })
          }
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          <Text style={styles.title}>Services List</Text>
          <Button mode='contained' theme={{ colors: { primary: 'gray' } }} style={{ borderRadius: 5 }} onPress={handleAddServiceFormScreen}>Add Service</Button>
        </View>

        <View style={{ marginTop: 12 }}>
          {/* Card room, nanti dibuat component sendiri */}
          <TouchableOpacity activeOpacity={0.85}>
            <View style={[styles.card, styles.shadowProp]}>
              <View style={{ flex: 1 }}>
                {/* Card content */}
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Grooming</Text>
                <Text style={{ fontSize: 13, color: 'white', marginTop: 5 }}>Price: Rp. 50.000</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 17 }}>
                <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  card: {
    height: 80,
    backgroundColor: 'gray',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row'
  },
});
