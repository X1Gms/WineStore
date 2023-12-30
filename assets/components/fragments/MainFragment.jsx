import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { ChangingInputs } from "../redux/login";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/input";
import { OAuth } from "../../json/components";
import OAuthbtn from "../components/OAuthbtn";

export default function MainFragment({ navigation }) {
  const Login = () => {
    navigation.navigate("HomePage");
  };

  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.login);

  const handleInputChange = (index, value) => {
    dispatch(ChangingInputs({ index, value }));
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ alignItems: "center", marginBottom: 80 }}>
          <Text style={styles.mTitle}>Bem-Vindo</Text>
          <Text style={styles.SubTitle}>Vamos Pôr a Mão na Massa</Text>
          <StatusBar style="auto" />
        </View>
        {inputs.map((item, index) => {
          const style = item.input
            ? [styles.input, styles.inputEntered]
            : styles.input;

          return (
            <Input
              key={index}
              id={index}
              style={style}
              onChange={handleInputChange}
              {...item}
            />
          );
        })}
        <View>
          <Text style={{ fontFamily: "Nunito", color: "#000" }}>
            Ou continue
          </Text>
        </View>
        <View style={styles.OAuthM}>
          {OAuth.map((item, index) => (
            <OAuthbtn
              key={index}
              icon={item.icon}
              style={styles.OAuthContainer}
            />
          ))}
        </View>
        <TouchableHighlight underlayColor="white" onPress={Login}>
          <View style={styles.Button}>
            <Text
              style={{ color: "#fff", fontFamily: "Nunito Bold", fontSize: 30 }}
            >
              Login
            </Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            width: 260,
            marginTop: 10,
            alignItems: "flex-end",
            marginBottom: 80,
          }}
        >
          <Pressable>
            <Text style={{ color: "#B53170", fontSize: 15 }}>
              Não tem conta?
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            width: 260,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#c1a6b61f" }}>Made By Gonçalo Santos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3F9",
    alignItems: "center",
    paddingTop: 140,
  },
  mTitle: {
    color: "#000",
    fontFamily: "Sansita One",
    fontSize: 50,
  },
  SubTitle: {
    color: "#B53170",
    fontFamily: "Nunito Bold",
    fontSize: 15,
  },
  input: {
    color: "#000",
    fontFamily: "Nunito Italic",
    padding: 15,
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 30,
  },
  inputEntered: {
    fontFamily: "Nunito Bold Italic",
    borderWidth: 2,
    borderColor: "#B53170",
  },
  placeholder: {
    color: "#000",
    fontFamily: "Nunito Italic",
    padding: 15,
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 30,
  },
  OAuthM: {
    flexDirection: "row",
    marginVertical: 25,
    gap: 17,
  },
  OAuthContainer: {
    backgroundColor: "#F3E4EC",
    width: 75,
    height: 65,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B53170",
    borderRadius: 20,
  },
});
