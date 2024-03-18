import { View, Text, FlatList } from "react-native";
import { StockStyle } from "../Home/mainset";
import WineItem from "./WineItem";

type Bottle = {
  section: string;
  items: {
    id: number;
    name: string;
    price: string;
    section: string;
    imgSrc: string;
    quantity: number;
  }[];
};

const WineSection: React.FC<{ item: Bottle }> = ({ item }) => {
  return (
    <View>
      <Text style={StockStyle.WineTitle}>{item.section}</Text>
      <FlatList
        horizontal
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => item.id.toString()}
        data={item.items}
        renderItem={(item) => <WineItem item={item} />}
      />
    </View>
  );
};
export default WineSection;
