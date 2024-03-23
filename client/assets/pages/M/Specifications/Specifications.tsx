import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SpecStyles } from "../Home/mainset";
import { useRoute } from "@react-navigation/native";
import { useGoto } from "../../../json/global";

type Bottle = {
  id: number;
  name: string;
  price: string;
  section: string;
  imgSrc: string;
  quantity: number;
};

const Specifications: React.FC = () => {
  const wine: Bottle = useRoute().params as Bottle;

  const GoTo = useGoto();

  return (
    <SafeAreaView>
      <Pressable
        style={SpecStyles.EditButton}
        onPress={() => GoTo("EditBottle", wine)}
      >
        <Text style={SpecStyles.EBText}>Editar</Text>
      </Pressable>
      <Image
        src={`${process.env.LOCALHOST + wine?.imgSrc}`}
        style={{
          height: 350,
          display: "flex",
          resizeMode: "contain",
          marginTop: 75,
        }}
      />
      <View
        style={{
          width: 265,
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          alignItems: "flex-end",
        }}
      >
        <Text style={SpecStyles.Price}>
          {wine.price.replace(".", ",") + "€"}
        </Text>
        <Text style={SpecStyles.Quantity}>{"x" + wine.quantity}</Text>
      </View>
      <Text style={SpecStyles.Name}>{wine.name}</Text>
    </SafeAreaView>
  );
};

export default Specifications;
