import React, { ReactNode } from "react";
import { useFonts } from "expo-font";

interface FontsLoaderProps {
  children: ReactNode;
}

const FontsLoader: React.FC<FontsLoaderProps> = ({ children }) => {
  const assets = "../fonts/";

  const [fontsLoaded] = useFonts({
    "Sansita One": require(assets + "Sansita-One.ttf"),
    "Nunito Bold": require(assets + "Nunito/Nunito-Bold.ttf"),
    "Nunito Italic": require(assets + "Nunito/Nunito-Italic.ttf"),
    "Nunito Bold Italic": require(assets + "Nunito/Nunito-BoldItalic.ttf"),
    "Inter Bold": require(assets + "Inter/Inter-Bold.ttf"),
    Nunito: require(assets + "Nunito/Nunito-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>;
};

export default FontsLoader;
