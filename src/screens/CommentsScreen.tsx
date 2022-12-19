import { SafeAreaView } from "react-native";
import {
  Avatar,
  Box,
  Input,
  VStack,
  Text,
  Flex,
  Icon,
  Button,
} from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useStores } from "../models/root-store/root-store-context";
import { useEffect, useState } from "react";
import getFirebase from "../services/firebase/client";
const CommentsScreen = (props: any) => {
  const [coments, setComents] = useState<any>([{}]);
  const [text, setText] = useState("");
  const { userStorage } = useStores();
  const { user } = userStorage;

  const postMessage = () => {
    if (text !== "") {
      const date = new Date();
      const data = {
        comment: text,
        date: date,
        name: `${user.name}`,
        urlImg: `${user.urlImg}`,
      };
      getFirebase().firestore().collection("comments").add(data);
      setText("");
    }
  };

  useEffect(() => {
    getFirebase()
      .firestore()
      .collection("comments")
      .orderBy("date", "asc")
      .onSnapshot((comments) => {
        const resp = comments.docs.map((doc) => {
          const data = doc.data();
          return data;
        });
        setComents(resp);
      });
  }, [coments]);

  return (
    <SafeAreaView>
      <Box alignItems="center">
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          InputLeftElement={
            <Icon as={Ionicons} name="pencil" size="5" ml="2" />
          }
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="25%"
              h="full"
              onPress={() => postMessage()}
            >
              Publicar
            </Button>
          }
          mt="5"
          placeholder="Escribí tu comentario!"
          value={text}
          onChangeText={setText}
        />
      </Box>
      <VStack alignItems="center" space="5">
        {coments &&
          coments.map((coment: any, index: number) => (
            <Box key={index}>
              <Flex flexDirection={"row"} top="10px" h="auto">
                <Avatar
                  top="20px"
                  bg="green.500"
                  source={{
                    uri: `${coment.urlImg}`,
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
                    {coment.name}
                  </Text>
                  <Text italic fontSize="xs" left="10px" top="30px">
                    {coment.comment}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
      </VStack>
    </SafeAreaView>
  );
};

export default CommentsScreen;
