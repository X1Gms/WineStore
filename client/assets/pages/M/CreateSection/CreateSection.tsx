import { Text, View, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditText from "../../../components/EditText";
import { useState } from "react";
import { handleInputs } from "../../Home/logreg";
import Toast from "react-native-root-toast";
import Requests from "../../../components/Requests";
import { MainStyles } from "../Home/mainset";
import { useGoto } from "../../../json/global";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../../functions/global";
const CreateSection: React.FC = () => {
  const GoTo = useGoto();

  const [section, SetSection] = useState([
    {
      value: "",
      name: "Nome da Secção",
      type: "section",
    },
  ]);

  const { token } = useAuth();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const onCreate = () => {
    const emptyInputs: any = section.filter(({ value }) => !value);

    if (emptyInputs.length === 0) {
      Requests(
        "ctsection",
        "POST",
        { section: section[0].value.trim() },
        headers
      )
        .then(() => GoTo("MainContainer"))
        .catch((e) => console.error(e));
    } else {
      Toast.show("Caixa de Texto Vazia");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#FFF" }}
    >
      <View style={{ width: wp(70) }}>
        <Text style={MainStyles.MainTitle}>Crie uma Secção</Text>
      </View>

      {section.map((item, index) => (
        <EditText
          id={index}
          key={index}
          {...item}
          style={
            !item.value
              ? [MainStyles.input, { marginTop: hp(25), marginBottom: hp(25) }]
              : [
                  MainStyles.input,
                  MainStyles.eInput,
                  { marginTop: hp(25), marginBottom: hp(25) },
                ]
          }
          onChange={(value: string) =>
            SetSection((prev) => handleInputs(index, value, ...prev))
          }
        />
      ))}
      <TouchableHighlight
        style={MainStyles.button}
        underlayColor="#FFD6E9"
        onPress={onCreate}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Nunito Bold",
            fontSize: hp(3.6),
          }}
        >
          Criar Secção
        </Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};
export default CreateSection;
