import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import TravelDetails from '../components/TravelDetails'

const MapScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full mt-7`}>
      <View style={tw`h-3/4`}>
        <Map />
      </View>
      <View style={tw`h-1/4`}>
      <TravelDetails />
      </View>
    </SafeAreaView>
  )
}

export default MapScreen