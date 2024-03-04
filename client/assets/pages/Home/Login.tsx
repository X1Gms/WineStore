import {
  Text,
  View,
  TouchableHighlight,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Colors } from "../../json/global";
import { useState } from "react";
import { LoginInputs, handleInputs } from "./logreg";
import EditText from "../../components/EditText";
import { RegLogStyles } from "./logreg";
import Requests from "../../components/Requests";
import Toast from "react-native-root-toast";
import { ScrollView } from "react-native";

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loginInputs, SetLoginInputs] = useState(LoginInputs);

  const GoToRegister = () => navigation.navigate("Register");
  const SendRequest = () => {
    const result: any = {};
    loginInputs.map((item) => {
      if (item.type !== "Cpassword") {
        result[item.type] = item.value.trim();
      }
    });

    const emptyInputs: any = loginInputs.filter(({ value }) => !value);

    if (emptyInputs.length === 0) {
      Requests("login", "POST", result)
        .then((response) => {
          if (response) {
            setTimeout(() => {
              SetLoginInputs((prev) =>
                prev.map((item) => ({ ...item, value: "" }))
              );

              navigation.navigate("Main");
            }, 1000);
          } else {
            Toast.show("Utilizador ou Palavra-Passe Incorretos");
          }
        })
        .catch((e) => {
          console.error("Axios Error:", e);
        });
    } else {
      Toast.show("Caixas de Texto Vazias");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            paddingTop: 150,
            flex: 1,
            backgroundColor: "#FFF3F9",
          }}
        >
          <View style={[RegLogStyles.MainOne]}>
            <Text style={RegLogStyles.Title}>Bem-Vindo</Text>
            <Text style={[RegLogStyles.SubT, { marginBottom: 60 }]}>
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
                  fontSize: 16,
                  color: Colors.Primary,
                  marginBottom: 10,
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
                  fontSize: 30,
                }}
              >
                Login
              </Text>
            </TouchableHighlight>
            <Pressable onPress={GoToRegister}>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 16,
                  color: Colors.Primary,
                }}
              >
                Criar Conta
              </Text>
            </Pressable>
            <Text
              style={{
                marginTop: 60,
                textAlign: "center",
                fontSize: 16,
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
