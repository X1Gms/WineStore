import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStyles } from "../Main/mainset";
import EditText from "../../components/EditText";
import { useState } from "react";
import { handleInputs } from "../Home/logreg";
const AddBottle = () => {
  const [section, SetSection] = useState([
    {
      value: "",
      name: "Nome da Secção",
      type: "section",
    },
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#FFF" }}
    >
      <View style={{ width: 220 }}>
        <Text style={MainStyles.MainTitle}>Adicione Bebida</Text>
      </View>
      {section.map((item, index) => (
        <EditText
          id={index}
          key={index}
          {...item}
          style={
            !item.value
              ? MainStyles.input
              : [MainStyles.input, MainStyles.eInput]
          }
          onChange={(value: string) =>
            SetSection((prev) => handleInputs(index, value, ...prev))
          }
        />
      ))}
    </SafeAreaView>
  );
};
export default AddBottle;
const styles = StyleSheet.create({});
