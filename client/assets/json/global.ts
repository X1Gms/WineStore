import AsyncStorage from "@react-native-async-storage/async-storage";

const Colors: { [key: string]: string } = {
  Primary: "#B53170",
  Secondary: "#FFEEF7",
  Background: "#FFF3F9",
  Third: "#FFD6E9",
  Text: "#000",
  SecText: "#A8628C",
  ThText: "#8B2154",
  LightGray: "#9a9a9a",
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

export { Colors, retrieveData };
