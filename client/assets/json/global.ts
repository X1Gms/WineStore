import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Colors: { [key: string]: string } = {
  Primary: "#B53170",
  Secondary: "#FFEEF7",
  Background: "#FFF3F9",
  Third: "#FFD6E9",
  Text: "#000",
  SecText: "#A8628C",
  ThText: "#8B2154",
  LightGray: "#9a9a9a",
  Label: "#C08BA1",
};

const retrieveData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Data found, handle it
      return value;
    } else {
      // No data found
      console.log("No data found");
      return null;
    }
  } catch (error) {
    // Error retrieving data
    console.error("Error retrieving data:", error);
    return null;
  }
};

const useGoto = () => {
  const navigation: any = useNavigation();

  const GoTo = (location: string, data?: any) => {
    navigation.navigate(location, data);
  };

  return GoTo;
};
export { Colors, retrieveData, useGoto };
