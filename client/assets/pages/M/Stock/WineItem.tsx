import { Text, Image, Pressable } from "react-native";
import { StockStyle } from "../Home/mainset";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native-animatable";

type item = {
  index: number;
  item: {
    id: number;
    name: string;
    price: string;
    section: string;
    imgSrc: string;
    quantity: number;
  };
};

type Bottle = {
  id: number;
  name: string;
  price: string;
  section: string;
  imgSrc: string;
  quantity: number;
};

const WineItem: React.FC<{ item: item }> = ({ item }) => {
  const LOCALHOST = process.env.LOCALHOST;
  const navigation: NavigationProp<any> = useNavigation();
  const wine: Bottle = item.item;

  return (
    <View>
      <Pressable
        style={StockStyle.Card}
        onPress={() => navigation.navigate("EditBottle", wine)}
      >
        <Image
          src={`${LOCALHOST + wine.imgSrc}`}
          style={{
            height: 110,
            display: "flex",
            resizeMode: "contain",
          }}
        />
        <Text style={StockStyle.quantity}>x{wine.quantity}</Text>
        <Text style={StockStyle.Label}>
          {wine.name.length >= 21
            ? wine.name.substring(0, 22) + "..."
            : wine.name}
        </Text>
      </Pressable>

      {/* <MenuOptions>
          <Options
            text="Editar"
            icon="edit"
            color="#dfb600"
            func={() => navigation.navigate("EditBottle", wine)}
          />
          <Options
            text="Eliminar"
            icon="trash-2"
            color="#df0000"
            func={() => SetShowMe(true)}
          />
        </MenuOptions> */}
    </View>
  );
};
export default WineItem;
