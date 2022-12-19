import { View, SafeAreaView, Platform } from "react-native";
import {
  Center,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  Avatar,
  Divider,
  Box,
  Input,
  HStack,
  KeyboardAvoidingView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import NoRaffle from "../components/common/noRaffle";
import Raffle from "../components/common/Raffle";
import MyGift from "../components/common/MyGift";
import { useStores } from "../models/root-store/root-store-context";
import { observer } from "mobx-react-lite";

const HomeSreen = observer((props: any) => {
  const { navigation } = props;
  const { userStorage } = useStores();
  const { user } = userStorage;
  const goToSetting = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView>
      {user.alreadyRaffle ? <Raffle /> : <NoRaffle />}
      <Divider />
      <MyGift />
    </SafeAreaView>
  );
});

export default HomeSreen;
