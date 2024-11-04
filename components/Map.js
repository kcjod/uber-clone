import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setLocationDescription, setOrigin, setTravelTimeInformation } from "../slices/navSlice";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import axios from "axios";

const Map = () => {
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const [dest, setDest] = useState(null);
  const [locDesc, setlocDesc] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      setDest({
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      });
      dispatch(
        setOrigin({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        })
      );
    })();
  }, [destination]);

  useEffect(() => {
    if (location && dest && mapRef.current) {
      setTimeout(() => {
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
          edgePadding: {
            top: 180,
            right: 50,
            bottom: 20,
            left: 20,
          },
        });
      }, 100);
    }
  }, [location, dest]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!location) return;
      try {
        const response = await axios.post(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_APIKEY}`
        );
  
        const result = response.data.results;
        if (result.length > 0) {
          const formattedAddress = result[0].formatted_address;
          setlocDesc(formattedAddress);
          console.log(formattedAddress);
          dispatch(setLocationDescription(formattedAddress));
        }

        
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
  
    fetchLocation();
  }, [location, GOOGLE_MAPS_APIKEY, dispatch]);
  

  useEffect(() => {
    if (!location || !dest) return;
  
    const getTravelTime = async () => {
      try {
        const response = await axios.post(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${locDesc}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
        );
        const data = response.data;
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      } catch (error) {
        console.error("Error fetching travel time:", error);
      }
    };
  
    getTravelTime();
  }, [location, destination, locDesc]);

  if (!location) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Fetching location...</Text>
      </View>
    );
  }

  return (
    <MapView
      ref={mapRef}
      mapType="standard"
      style={tw`flex-1`}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      // showsUserLocation={true}
    >
      {destination && origin && (
        <MapViewDirections
          origin={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
          destination={dest}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="black"
        />
      )}

      {destination && destination.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          pinColor="pink"
          title="Drop"
          identifier="destination"
        />
      )}
      {location && (
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          pinColor="pink"
          title="Pickup"
          identifier="origin"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
