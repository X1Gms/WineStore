import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MainStyles } from "../pages/M/Home/mainset";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Requests from "./Requests";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../json/global";
const DropDown: React.FC<{ name: string; onChange: any }> = ({
  name,
  onChange,
}) => {
  const [Handler, SetHandler] = useState(false);
  const [list, SetList] = useState<any>([]);
  const HandleHandler = () => SetHandler((prev) => !prev);
  const [hoveredItem, setHoveredItem] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const info = await Requests("getsections", "GET");
          SetList(info);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [])
  );

  return (
    <View style={{ maxHeight: 241, marginBottom: 30 }}>
      <Pressable
        style={
          Handler === true
            ? [MainStyles.dropdown, MainStyles.dropdownOpen]
            : MainStyles.dropdown
        }
        onPress={HandleHandler}
      >
        <Text style={MainStyles.dropText}>{name}</Text>
        <Image
          source={require("../images/imgs/Arrow.png")}
          style={Handler === true && { transform: [{ rotate: "180deg" }] }}
        />
      </Pressable>

      <ScrollView style={!Handler && { display: "none" }}>
        <View
          style={{
            backgroundColor: Colors.Third,
            borderRadius: 20,
          }}
        >
          {list.map((item: any, index: number) => (
            <Pressable
              key={index}
              onPress={() => {
                onChange(item.section);
                HandleHandler();
              }}
              onPressIn={() => setHoveredItem(index)}
              onPressOut={() => setHoveredItem(null)}
            >
              <View
                style={[
                  [MainStyles.input, { backgroundColor: Colors.Third }],
                  hoveredItem === index && { backgroundColor: "#F1CEE5" }, // Customize background color on hover
                  list.length - 1 === index
                    ? {
                        height: 60,
                        borderTopEndRadius: 0,
                        borderTopStartRadius: 0,
                        justifyContent: "center",
                      }
                    : {
                        borderRadius: 0,
                        height: 60,
                        justifyContent: "center",
                      },
                ]}
              >
                <Text style={MainStyles.dropItem}>{item.section}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default DropDown;
