import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { detailAdmin } from '../../../store/actions/actionAdmin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RoomCard from '../../../components/admin/RoomCard'
import ServiceCard from '../../../components/admin/ServiceCard'


export default function HomeAdmin({ navigation }) {
  const dispatch = useDispatch()

  const detail = useSelector((state) => state.admin.detailAdmin)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (
      async () => {
        const access_token = await AsyncStorage.getItem('admin_access_token')
        dispatch(detailAdmin(access_token))
          .then((_) => {
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    )()
  }, [])

  const handleAddFormScreen = () => {
    navigation.navigate('Add Room Admin')
  }

  const handleAddServiceFormScreen = () => {
    navigation.navigate('Add Service Admin')
  }

  if (loading) {
    return <View style={{ justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator size={'large'}></ActivityIndicator>
    </View>
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Room List</Text>
          <Button mode='contained' theme={{ colors: { primary: '#48034F' } }} style={{ borderRadius: 5 }} onPress={handleAddFormScreen}>Add Room</Button>
        </View>
        <View style={{ marginTop: 12 }}>
          {/* Card room, nanti dibuat component sendiri */}
          {
            detail.Rooms.map((e) => {
              return <RoomCard key={e.id} room={e} />
            })
          }
        </View>

        {/* Card service */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          <Text style={styles.title}>Services List</Text>
          <Button mode='contained' theme={{ colors: { primary: '#48034F' } }} style={{ borderRadius: 5 }} onPress={handleAddServiceFormScreen}>Add Service</Button>
        </View>

        <View style={{ marginTop: 12 }}>
          {/* Card room, nanti dibuat component sendiri */}
          {
            detail.Services.map((e) => {
              return <ServiceCard key={e.id} service={e} />
            })
          }
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
    fontSize: 22,
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
