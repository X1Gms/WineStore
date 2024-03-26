import { Text, Image, Pressable } from "react-native";
import { StockStyle } from "../Home/mainset";
import { useGoto } from "../../../json/global";
import { View } from "react-native-animatable";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
  const wine: Bottle = item.item;
  const GoTo = useGoto();

  return (
    <View>
      <Pressable style={StockStyle.Card} onPress={() => GoTo("Specs", wine)}>
        <Image
          src={`${LOCALHOST + wine.imgSrc}`}
          style={{
            height: hp(13.5),
            display: "flex",
            resizeMode: "contain",
          }}
        />
        <Text style={StockStyle.quantity}>x{wine.quantity}</Text>
        <Text style={StockStyle.Label}>
          {wine.name.length >= 21
            ? wine.name.substring(0, 22).trim() + "..."
            : wine.name}
        </Text>
      </Pressable>
    </View>
  );
};
export default WineItem;
