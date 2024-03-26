import {
  Text,
  View,
  TouchableHighlight,
  Pressable,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../json/global";
import { useEffect, useState } from "react";
import { LoginInputs, handleInputs } from "./logreg";
import EditText from "../../components/EditText";
import { RegLogStyles } from "./logreg";
import Requests from "../../components/Requests";
import Toast from "react-native-root-toast";
import { ScrollView } from "react-native";
import { useGoto } from "../../json/global";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Login: React.FC<{}> = () => {
  const [loginInputs, SetLoginInputs] = useState(LoginInputs);

  const GoTo = useGoto();

  useEffect(() => {
    Execute();
  }, []);

  const GetInfo = async () => {
    try {
      const infoString = await AsyncStorage.getItem("info");
      if (infoString) {
        const info = JSON.parse(infoString);
        return info;
      }
      return null; // Handle case where AsyncStorage has no data for "info"
    } catch (e) {
      console.error("Error retrieving 'info' from AsyncStorage:", e);
      return null;
    }
  };

  const SendRequest = (info: any) => {
    const result: any = {};

    if (info && info?.email && info?.password) {
      result.email = info?.email;
      result.password = info?.password;
    } else {
      loginInputs.map((item) => (result[item.type] = item.value.trim()));
    }

    const emptyInputs: any = loginInputs.filter(({ value }) => !value);

    if (emptyInputs.length === 0 || info) {
      Requests("login", "POST", result)
        .then(async (response) => {
          if (response) {
            await AsyncStorage.setItem("info", JSON.stringify(result));
            await AsyncStorage.setItem("name", JSON.stringify(response));

            setTimeout(() => {
              SetLoginInputs((prev) =>
                prev.map((item) => ({ ...item, value: "" }))
              );

              GoTo("MainContainer");
            }, 1000);
          } else {
            Toast.show("Utilizador ou Palavra-Passe Incorretos");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      Toast.show("Caixas de Texto Vazias");
    }
  };

  const Execute = async () => {
    try {
      const info = await GetInfo();
      if (info && info?.email && info?.password) {
        SendRequest(info);
      } else {
        console.log("Nothing here to See");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF3F9", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            paddingTop: hp(16),
            flex: 1,
          }}
        >
          <View style={[RegLogStyles.MainOne]}>
            <Text style={RegLogStyles.Title}>Bem-Vindo</Text>
            <Text style={[RegLogStyles.SubT, { marginBottom: hp(6.5) }]}>
              Vamos Pôr a Mão na Massa
            </Text>
            <View style={{ alignItems: "center" }}>
              {loginInputs.map((item, index) => (
                <EditText
                  id={index}
                  key={index}
                  {...item}
                  style={
                    !item.value
                      ? RegLogStyles.input
                      : [RegLogStyles.input, RegLogStyles.eInput]
                  }
                  onChange={(value: string) =>
                    SetLoginInputs((prev) =>
                      handleInputs(index, value, ...prev)
                    )
                  }
                />
              ))}
            </View>
            <Pressable>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: hp(2),
                  color: Colors.Primary,
                  marginBottom: hp(1),
                }}
              >
                Esqueceu da Palavra-Passe?
              </Text>
            </Pressable>
            <TouchableHighlight
              style={RegLogStyles.button}
              underlayColor="#FFD6E9"
              onPress={SendRequest}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Nunito Bold",
                  fontSize: hp(3.6),
                }}
              >
                Login
              </Text>
            </TouchableHighlight>
            <Pressable onPress={() => GoTo("Register")}>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: hp(2),
                  color: Colors.Primary,
                }}
              >
                Criar Conta
              </Text>
            </Pressable>
            <Text
              style={{
                marginTop: hp(7.5),
                textAlign: "center",
                fontSize: hp(2),
                color: "#c1a6b613",
              }}
            >
              Made By Gonçalo Santos
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
