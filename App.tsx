import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Text, Box } from "native-base";
import { RootStoreProvider } from "./src/models/root-store/root-store-context";
import { rootStore } from './src/models/root-store/root-store';
import NavigationTab from "./src/navigation/NavigationTab";
import LoginScreen from "./src/screens/LoginScreen";
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';

const App: React.FC = observer(() => {
  return (
    <RootStoreProvider value={rootStore}>
      <NavigationContainer>
        <NativeBaseProvider>
        {rootStore.userStorage.isLoged ? <NavigationTab /> : <LoginScreen />}
        </NativeBaseProvider>
      </NavigationContainer>
    </RootStoreProvider>
  );
})

export default App
