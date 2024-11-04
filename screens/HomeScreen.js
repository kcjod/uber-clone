import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";


const HomeScreen = () => {

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full mt-7`}>
      <View>
        <Image
          style={[
            tw`ml-3`,
            {
              width: 100,
              height: 100,
              resizeMode: "contain",
            },
          ]}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />

        <GooglePlacesAutocomplete
          placeholder="Select your destination"
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(setDestination({
              location: details.geometry.location,
              description: data.description
            }))
          }}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          returnKeyType={"search"}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          styles={{
            container: {
              flex: 0,
              paddingHorizontal: 10,
              marginTop: 5,
            },
            textInputContainer: {
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            },
            textInput: {
              backgroundColor: "#F9F9F9",
              height: 40,
              borderRadius: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              color: "#333",
            },
            listView: {
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: 5,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 2,
            },
            row: {
              padding: 10,
              height: 40,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderBottomColor: "#eee",
            },
            description: {
              color: "#555",
              fontSize: 15,
            },
          }}
        />

        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
