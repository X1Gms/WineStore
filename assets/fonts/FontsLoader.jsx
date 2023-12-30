import { useFonts } from "expo-font";

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    "Sansita One": require("./Sansita-One.ttf"),
    "Nunito Bold": require("./Nunito/Nunito-Bold.ttf"),
    "Nunito Italic": require("./Nunito/Nunito-Italic.ttf"),
    "Nunito Bold Italic": require("./Nunito/Nunito-BoldItalic.ttf"),
    Nunito: require("./Nunito/Nunito-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return children;
};

export default FontLoader;
