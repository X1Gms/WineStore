import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Colors } from "../json/global";
const Quantity: React.FC<{ number: number; onChange: any }> = ({
  number,
  onChange,
}) => {
  return (
    <View style={styles.Container}>
      <Pressable style={styles.plus} onPress={() => onChange("plus")}>
        <Icon name="plus" size={35} color={Colors.SecText} />
      </Pressable>
      <View style={styles.number}>
        <Text style={styles.numbert}>{number}</Text>
      </View>
      <Pressable style={styles.minus} onPress={() => onChange("minus")}>
        <Icon name="minus" size={35} color={Colors.SecText} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
  },
  plus: {
    width: 75,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Third,
    borderTopStartRadius: 20,
    borderBottomLeftRadius: 20,
  },
  minus: {
    width: 75,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Third,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  number: {
    width: 85,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEBF6",
  },
  numbert: {
    fontFamily: "Sansita One",
    color: "#D195B9",
    fontSize: 45,
  },
});
export default Quantity;
