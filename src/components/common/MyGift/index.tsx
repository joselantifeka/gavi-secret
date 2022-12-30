import {
  Avatar,
  Box,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  KeyboardAvoidingView,
  Button,
  Icon,
  HStack,
  CheckIcon,
} from "native-base";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Ionicons } from "@expo/vector-icons";
import { useStores } from "../../../models/root-store/root-store-context";
import getFirebase from "../../../services/firebase/client";

const MyGift = observer(() => {
  const { userStorage } = useStores();
  const { user } = userStorage;
  const [desire, setDesire] = useState(user.desire || "");
  const [succes, setSucces] = useState(false);
  const postDesire = () => {
    getFirebase()
      .firestore()
      .collection("account")
      .doc(`${user.keyName}`)
      .update({ desire: desire });
  };

  return (
    <VStack top="30px" alignItems="center" justifyContent="start" height="45%">
      <Heading size="xs">
        Comenta que te gustaria recibir de amigo secreto!
      </Heading>
      <Flex flexDirection={"row"} top="10px" h="auto">
        <Avatar
          top="20px"
          bg="green.500"
          source={{
            uri: `${user.urlImg}`,
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        >
          AJ
        </Avatar>
        <Box flexBasis={"55%"} top="20px">
          <Text bold italic left={"10px"} top="10px">
            {user.name} {user.LastName}
          </Text>
          <Input
            mx="1.5"
            placeholder="comentá que te gustaria recibir"
            w="100%"
            top="20px"
            borderColor="transparent"
            borderBottomColor="grey"
            value={desire}
            onChangeText={setDesire}
            InputRightElement={
              <Button size="xs" rounded="none" onPress={postDesire}>
                <Icon
                  as={Ionicons}
                  name="send"
                  color="white"
                  style={{
                    transform: [{ skewX: "20deg" }, { skewY: "-20deg" }],
                  }}
                />
              </Button>
            }
          />
        </Box>
      </Flex>
      {user.desire && (
        <HStack space={2} mt="20px" ml="75%">
          <CheckIcon size="5" mt="0.5" color="emerald.500" />
        </HStack>
      )}
      <Text italic fontSize="xs" mb="15px" top="40px">
        ¡Recuerda comentar regalo que no pase de 5000 pesos!
      </Text>
    </VStack>
  );
});

export default MyGift;
