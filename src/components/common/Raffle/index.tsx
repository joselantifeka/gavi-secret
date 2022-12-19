import { observer } from "mobx-react-lite";
import { Avatar, Button, Flex, Heading, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { participantsTypes } from "../../../lib/types";
import { useStores } from "../../../models/root-store/root-store-context";
import getFirebase from "../../../services/firebase/client";

const Raffle = observer(() => {
  const [sFriend, setSFriend] = useState<any>([{}]);
  const { userStorage } = useStores();
  const { user } = userStorage;
  useEffect(() => {
    getFirebase()
      .firestore()
      .collection("account")
      .where("id", "==", user.IdSecretFriend)
      .onSnapshot((users) => {
        const resp = users.docs.map((doc) => {
          const data = doc.data();
          return data;
        });

        setSFriend(resp[0]);
      });
  }, [userStorage.user]);
  return (
    <VStack alignItems="center" justifyContent="center" height="50%">
      <Heading size="xs">
        ¡{sFriend.name} {sFriend.LastName} es tu amigo Secreto!
      </Heading>
      <Flex
        direction="row"
        mb="1.5"
        mt="5"
        alignContent="center"
        position="relative"
      >
        <Avatar
          bg="cyan.500"
          source={{
            uri: `${sFriend.urlImg}`,
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        >
          JU
        </Avatar>
      </Flex>
      {sFriend.desire !== "" ? (
        <>
          <Text bold fontSize="xs" mt="15px">
            {sFriend.name} {sFriend.LastName} Quiere:
          </Text>
          <Text italic fontSize="xs" mb="20px">
            {sFriend.desire}
          </Text>
        </>
      ) : (
        <Text italic fontSize="xs" mb="20px">
          {sFriend.name} Aun no ha comentado que quiere, motiva a todos los
          participantes a comentar que quieren en la seccion de comentrarios!
        </Text>
      )}
      {/* <Button onPress={goToSetting} title='Ir a ajustes'/> */}
      <Heading size="xs">
        ¡No le digas a nadie quien es tu amigo secreto!
      </Heading>
    </VStack>
  );
});

export default Raffle;
