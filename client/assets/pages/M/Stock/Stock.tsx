import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StockStyle } from "../Home/mainset";
import WineSection from "./WineSection";
import Requests from "../../../components/Requests";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";
const Stock: React.FC<any> = () => {
  type Bottles = {
    section: string;
    items: {
      id: number;
      name: string;
      price: string;
      section: string;
      imgSrc: string;
      quantity: number;
    }[];
  }[];

  const [WineBottles, SetBottles] = useState<Bottles | any[]>([]);

  const getData = async () => {
    const info = await Requests("getbottles", "GET");
    SetBottles(info);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={StockStyle.title}>Veja o que tem armazenado</Text>

        {WineBottles?.length > 0 ? (
          WineBottles?.map((item, index) => {
            return <WineSection key={index} item={item} />;
          })
        ) : (
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              width: 300,
              alignSelf: "center",
              fontWeight: "600",
              marginTop: 150,
            }}
          >
            Adicione bebidas para que possa visualizá-las 🍷
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stock;
