import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectDestination,
  selectLocationDescription,
  selecttravelTimeInformation,
} from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";

const TravelDetails = () => {
  const travelDetails = useSelector(selecttravelTimeInformation);
  // const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const pickup = useSelector(selectLocationDescription);
  console.log("Pickup: ", pickup);
  console.log(travelDetails);
  console.log(destination);

  return (
    <View style={tw`flex-1 p-2`}>
      <View style={tw`flex-row px-2 ml-2 w-80 items-center`}>
        <Text style={tw`px-2 py-1 font-semibold`}>Pickup: </Text>
        <Text style={tw`font-bold`}>{pickup}</Text>
      </View>
      <View style={tw`flex-row px-2 ml-2 w-80 items-center`}>
        <Text style={tw`px-2 py-1 font-semibold`}>Drop: </Text>
        <Text style={tw`px-2 font-bold`}>{destination.description}</Text>
      </View>
      {travelDetails && (
        <View style={tw`flex-row w-full px-10 justify-between`}>
          <View style={tw`flex-row py-2 items-center`}>
            <Text style={tw`py-1 font-semibold`}>Distance: </Text>
            <Text style={tw`font-bold`}>
              {(travelDetails.distance.text.split(" ")[0] * 1.6).toFixed(1) +
                " km"}
            </Text>
          </View>
          <View style={tw`flex-row py-2 items-center`}>
            <Text style={tw`py-1 font-semibold`}>Duration: </Text>
            <Text style={tw`font-bold`}>
              {travelDetails.duration.text}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TravelDetails;

const styles = StyleSheet.create({});
