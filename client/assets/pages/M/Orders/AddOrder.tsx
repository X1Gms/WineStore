import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainStyles } from "../Home/mainset";
import { useState, useCallback, useEffect } from "react";
import { handleInputs } from "../../Home/logreg";
import EditText from "../../../components/EditText";
import DropDown from "../../../components/DropDown";
import DropDownById from "../../../components/DropDownById";
import Requests from "../../../components/Requests";
import Quantity from "../../../components/Quantity";
import Toast from "react-native-root-toast";
import Order from "./Order";
import CheckForm from "../../../components/CheckForm";
import { useGoto } from "../../../json/global";
const AddOrder: React.FC = () => {
  const GoTo = useGoto();

  const [address, SetAddress] = useState([
    {
      value: "",
      name: "Nome",
      type: "name",
    },
    {
      value: "",
      name: "E-mail",
      type: "email",
    },
    {
      value: "",
      name: "Nº Telefone/Fax",
      type: "phone",
    },
    {
      value: "",
      name: "Morada",
      type: "address",
    },
  ]);

  type wineType = { price: string; section: string };

  const [section, setSection] = useState("Secção");
  const [sectionValues, setSecValues] = useState<any[]>([]);
  const [wine, setWine] = useState<wineType>({ price: "", section: "Vinho" });
  const [wineValues, setWineValues] = useState<any[]>([]);
  const [query, setQuery] = useState<any>([{ section: "", price: "" }]);
  const [quantity, setQuantity] = useState<number>(0);
  const [order, setOrder] = useState<any[]>([]);

  const fetchData = () => {
    Requests("getsections", "GET")
      .then((sectionData) => {
        setSecValues(sectionData);
        return Requests("getbottles", "GET");
      })
      .then((wineData) => {
        setWineValues(wineData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const sectionQuery = () => {
    const sectQ = wineValues.filter(
      (item) => item.section === section && item.section
    );

    if (sectQ && sectQ.length > 0) {
      const sectionWines = sectQ[0].items;

      const wineNames = sectionWines.map((item: any) => {
        const i = { section: item.name, price: item.price };
        return i;
      });

      setQuery(wineNames);
    } else {
      setQuery(sectQ);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sectionQuery();
  }, [section, wineValues]);

  const Counter = (funnction: string) => {
    setQuantity((prev) => {
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

  const Reset = () => {
    setQuantity(0);
    setWine({ price: "", section: "Vinho" });
    setSection("Secção");
  };

  const SendRequest = () => {
    const checks = CheckForm(address);

    if (typeof checks === "string") {
      Toast.show(checks);
    } else if (order.length <= 0) {
      Toast.show("Encomendas Não Efetuadas");
    } else {
      const form: any = {};

      address.map((item) => {
        form[item.type] = item.value;
      });

      form.order = order;

      Requests("addorder", "POST", form)
        .then(() => {
          GoTo("MainContainer");
        })
        .catch((e) => console.error(e));
    }
  };

  const SubmitBeverage = (wine: wineType, quantity: number, ...prev: any[]) => {
    const previous = [...prev];

    if (wine.section !== "Vinho") {
      if (quantity !== 0) {
        previous.push({
          price: wine.price,
          wine: wine.section,
          quantity: quantity,
        });
        Reset();
      } else {
        Toast.show("Quantidade não Selecionada");
      }
    } else {
      Toast.show("Vinho não Selecionado");
    }

    return previous;
  };

  const RemoveBeverage = (id: number) => {
    const removedOrder = order.filter((item, index) => index !== id);
    setOrder(removedOrder);
    Reset();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView>
        <SafeAreaView style={{ alignItems: "center" }}>
          <View style={{ width: 285 }}>
            <Text style={[MainStyles.MainTitle, { marginBottom: 30 }]}>
              Adicionar Encomenda
            </Text>
            {address.map((item, index) => (
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
                  SetAddress((prev) => handleInputs(index, value, ...prev))
                }
              />
            ))}

            <DropDown
              name={section}
              value={sectionValues}
              onChange={(name: string) => {
                setSection(name);
              }}
            />

            <DropDownById
              name={wine.section}
              value={query}
              onChange={(price: string, name: string) => {
                setWine({
                  price: price,
                  section: name,
                });
              }}
            />

            <Text
              style={[
                MainStyles.quantityLbl,
                { marginVertical: 0, marginBottom: 15 },
              ]}
            >
              Quantidade
            </Text>

            <Quantity number={quantity} onChange={Counter} />

            <Order value={order} onDelete={RemoveBeverage} />

            <TouchableHighlight
              style={[
                MainStyles.button,
                { marginVertical: 0, marginTop: 15, marginBottom: 15 },
              ]}
              underlayColor="#FFD6E9"
              onPress={() => {
                setOrder((prev) => SubmitBeverage(wine, quantity, ...prev));
              }}
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

            <TouchableHighlight
              style={[
                MainStyles.button,
                { marginVertical: 0, marginTop: 5, marginBottom: 15 },
              ]}
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
                Submeter Encomenda
              </Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
export default AddOrder;
