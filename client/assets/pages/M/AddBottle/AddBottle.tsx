import {
  TouchableHighlight,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStyles } from "../Home/mainset";
import EditText from "../../../components/EditText";
import { useState } from "react";
import { handleInputs } from "../../Home/logreg";
import DropDown from "../../../components/DropDown";
import * as ImagePicker from "expo-image-picker";
import Quantity from "../../../components/Quantity";
import Toast from "react-native-root-toast";
import Requests from "../../../components/Requests";
const AddBottle: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [bottle, SetBottle] = useState([
    {
      value: "",
      name: "Nome da Bebida",
      type: "bottle",
    },
    {
      value: "",
      name: "Preço",
      type: "number",
    },
  ]);

  const wine = `https://reactnative.dev/img/tiny_logo.png`;

  const [section, SetSection] = useState("Secção");
  const [file, SetFile] = useState<string>(
    "https://reactnative.dev/img/tiny_logo.png"
  );
  const [quantity, SetQuantity] = useState<number>(0);

  const Counter = (funnction: string) => {
    SetQuantity((prev) => {
      switch (funnction) {
        case "plus":
          return prev + 1;
        case "minus":
          return prev > 0 ? prev - 1 : prev;

        default:
          return prev;
      }
    });
  };

  const SendRequest = async () => {
    const emptyInput: any = bottle.filter(({ value }: any) => !value);

    if (emptyInput.length > 0) {
      Toast.show("Caixa de Texto Vazia");
    } else if (section === "Secção") {
      Toast.show("Secção não Atribuída");
    } else if (!file) {
      Toast.show("Imagem não Selecionada");
    } else if (quantity <= 0) {
      Toast.show("Quantidade não Atribuída");
    } else {
      const formData = new FormData();
      formData.append("bottle", bottle[0].value);
      formData.append("price", bottle[1].value);
      formData.append("section", section);
      formData.append("quantity", String(quantity));

      const fileName: any = file.substring(file.lastIndexOf("/") + 1);
      const fileExtension: string = fileName.split(".").pop() as string;

      const File: any = {
        uri: file,
        name: fileName,
        type: `image/${fileExtension}`,
      };

      formData.append("file", File);

      console.log(formData);

      Requests("addbottle", "POST", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          setTimeout(() => {
            navigation.navigate("MainContainer");
            Toast.show("Enviado com Sucesso");
          }, 1000);
        })
        .catch((e: any) => {
          console.error("Error:", e);
        });
    }
  };

  const uploadImage = async () => {
    try {
      let result: any = {}; // Explicitly define the type of result
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
      if (!result?.cancelled && result?.assets?.length > 0) {
        SetFile(result?.assets[0].uri);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView>
        <SafeAreaView style={{ alignItems: "center" }}>
          <View style={{ width: 285 }}>
            <View style={{ width: 220, alignSelf: "center" }}>
              <Text style={[MainStyles.MainTitle]}>Adicione Bebida</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              {bottle.map((item, index) => (
                <EditText
                  id={index}
                  key={index}
                  {...item}
                  style={
                    !item.value
                      ? [MainStyles.input, { marginBottom: 30 }]
                      : [
                          MainStyles.input,
                          MainStyles.eInput,
                          { marginBottom: 30 },
                        ]
                  }
                  onChange={(value: string) =>
                    SetBottle((prev) => handleInputs(index, value, ...prev))
                  }
                />
              ))}
            </View>

            <DropDown
              name={section}
              onChange={(name: string) => {
                SetSection(name);
              }}
            />

            <Pressable
              style={MainStyles.cloudbtn}
              onPress={async () => {
                await uploadImage();
              }}
            >
              <Image
                style={{ width: 30, height: 30, marginRight: 5 }}
                source={require("../../../images/imgs/cloud.png")}
              />
              <Text
                style={{
                  fontFamily: "Nunito Bold",
                  color: "#AD608E",
                  fontSize: 23,
                }}
              >
                Carregar Imagem
              </Text>
            </Pressable>

            <Image
              source={file ? { uri: file } : { uri: wine }}
              style={{
                height: 180,
                width: 136,
                display: file === wine ? "none" : "flex",
              }}
            />

            <Text style={MainStyles.quantityLbl}>Quantidade</Text>

            <Quantity number={quantity} onChange={Counter} />

            <TouchableHighlight
              style={MainStyles.button}
              underlayColor="#FFD6E9"
              onPress={SendRequest}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Nunito Bold",
                  fontSize: 25,
                }}
              >
                Submeter Bebida
              </Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
export default AddBottle;
