import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SpecStyles } from "../Home/mainset";
import { useRoute } from "@react-navigation/native";
import { useGoto } from "../../../json/global";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
          height: hp(43),
          display: "flex",
          resizeMode: "contain",
          marginTop: hp(10),
        }}
      />
      <View
        style={{
          width: hp(33),
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: hp(1),
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
