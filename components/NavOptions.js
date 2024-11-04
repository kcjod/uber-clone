import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectDestination } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order food",
        image: "https://links.papareact.com/28w",
        screen: "EatScreen"
    }
];

const NavOptions = () => {

    const navigation = useNavigation();
    const destination = useSelector(selectDestination);
  return (
    <FlatList 
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
             onPress={()=>navigation.navigate(item.screen)}
             disabled={!destination}
             style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-40 rounded-lg`}>
                <View style={tw`${!destination && "opacity-20"}`}>
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            resizeMode: "contain"
                        }}
                        source={{ uri: item.image }}
                    />
                    <Text style={tw`font-semibold mt-3`}>{item.title}</Text>
                <Icon
                style={tw`p-3 bg-black rounded-full w-14 mt-4 text-center`}
                type="antdesign" name="arrowright" color="white" size={16} />
                </View>
            </TouchableOpacity>
        )}
    />
  );
}

export default NavOptions;
