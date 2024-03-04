import {
  Text,
  View,
  TouchableHighlight,
  Pressable,
  ScrollView,
} from "react-native";
import { Colors } from "../../json/global";
import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { RegisterInputs, handleInputs } from "./logreg";
import EditText from "../../components/EditText";
import { RegLogStyles } from "./logreg";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import PasswordCriteria from "../../components/PasswordCriteria";
import CheckForm from "../../components/CheckForm";
import Toast from "react-native-root-toast";
import Requests from "../../components/Requests";
import Icon from "react-native-vector-icons/FontAwesome5";
const Register: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loginInputs, SetLoginInputs] = useState(RegisterInputs);

  useEffect(() => {
    SetLoginInputs((prev) => prev.map((item) => ({ ...item, value: "" })));
  }, []);

  const bottomRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%"], []);

  const handleOpenAction = () => bottomRef.current?.expand();

  const SendRequest = async () => {
    const checks = CheckForm(loginInputs);
    if (typeof checks === "string") {
      Toast.show(checks);
    } else {
      const result: any = {};
      loginInputs.map((item) => {
        if (item.type !== "Cpassword") {
          result[item.type] = item.value.trim();
        }
      });

      Requests("register", "POST", result)
        .then((response) => {
          setTimeout(() => {
            SetLoginInputs((prev) =>
              prev.map((item) => ({ ...item, value: "" }))
            );

            Toast.show(`${response}`);
          }, 1000);

          navigation.navigate("Login");
        })
        .catch((e) => {
          console.error("Axios Error:", e);
        });
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF3F9" }}>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <Pressable
          style={[RegLogStyles.returnButton, { marginTop: 60, marginLeft: 30 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Icon name="chevron-left" size={30} color="#D3AFC2" />
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <View style={[RegLogStyles.MainOne, { marginTop: 0 }]}>
            <Text style={RegLogStyles.Title}>Sem Conta</Text>
            <Text style={[RegLogStyles.SubT, { marginBottom: 60 }]}>
              Está na hora de criar uma 🍷
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
            <Pressable onPress={handleOpenAction}>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 16,
                  color: Colors.Primary,
                }}
              >
                Critérios da Password
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
                Criar Conta
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          borderRadius: 50,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <PasswordCriteria
            input={loginInputs.find((item) => item.type === "password")}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default Register;
