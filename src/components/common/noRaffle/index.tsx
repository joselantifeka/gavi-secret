import React, { useEffect, useState } from "react";
import { Avatar, Button, Flex, Heading, Text, VStack } from "native-base";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../models/root-store/root-store-context";
import getFirebase from "../../../services/firebase/client";

const NoRaffle = observer(() => {
  const { userStorage } = useStores();
  const { user } = userStorage;
  const [sFriends, setSFriends] = useState<any>([{}])
  const allParticipants = [
    {
      keyName: "camilo",
      urlImg:
        "https://scontent.faep34-1.fna.fbcdn.net/v/t39.30808-1/290213338_10159375317679262_8830087792890196717_n.jpg?stp=dst-jpg_p240x240&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=BSt4tnCv5lkAX__yvZt&_nc_ht=scontent.faep34-1.fna&oh=00_AfBUTYJZ5O7U9Mo_cTIl2FbbRDYQhy-FMMNRw8EY7Ste7A&oe=639DBBB8",
      id: 0,
    },
    {
      keyName: "junior",
      urlImg:
        "https://scontent.faep34-1.fna.fbcdn.net/v/t1.6435-1/177285002_10159272485358044_1312850650843117589_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=oBLxZWWT0CoAX_lzhgZ&_nc_ht=scontent.faep34-1.fna&oh=00_AfDmDgrhA-MmOP_YVlUQ4XgB0QIPXdJ_zDsh3WCreuTa0A&oe=63C07892",
      id: 1,
    },
    {
      keyName: "juancho",
      urlImg:
        "https://scontent.faep34-1.fna.fbcdn.net/v/t39.30808-6/275223694_10160701953714893_7017511662183631702_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=PXd72YPsMS8AX_z0Ypz&_nc_ht=scontent.faep34-1.fna&oh=00_AfDpFcW8rd4l-rTCOldelkb77mXolEiMRrl0GgME4Vo4Bg&oe=639E05CE",
      id: 3,
    },
    {
      name: "jose",
      urlImg:
        "https://scontent.faep22-1.fna.fbcdn.net/v/t1.6435-9/86420308_2499963340318751_4891096511733039104_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xmf5Oq1RElgAX-DH01r&_nc_ht=scontent.faep22-1.fna&oh=00_AfAsQW-TaMegqOLahpOHNQV05LFzwtu8ZzE5cU8nM3hClw&oe=63C44327",
      id: 4,
    },
  ];
  const participants = allParticipants.filter(
    (participant) => participant.id !== user.id
  );
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    getFirebase()
      .firestore()
      .collection("account")
      .where("keyName", "!=", user.keyName)
      .onSnapshot((users) => {
        const resp = users.docs.map((doc) => {
          const data = doc.data();
          return {
            keyName: data.keyName,
            id: data.id,
            IdSecretFriend: data.IdSecretFriend,
            isAvailable: data.isAvailable,
          };
        }).filter(
          (participant) => participant.isAvailable
        );
        setSFriends(resp)
      });
  }, [])
  
  const lottery = () => {
      getFirebase()
        .firestore()
        .collection("account")
        .doc(`${sFriends[0].keyName}`)
        .update({ isAvailable: false});
      getFirebase()
        .firestore()
        .collection("account")
        .doc(`${user.keyName}`)
        .update({ alreadyRaffle: true, IdSecretFriend: sFriends[0].id});
  };

  return (
    <VStack alignItems="center" justifyContent="center" height="50%">
      <Heading size="xs">¿Quien sera tu amigo secreto?</Heading>
      <Flex
        direction="row"
        mb="1.5"
        mt="5"
        alignContent="center"
        position="relative"
      >
        {participants.map((participant, index) => (
          <Avatar
            bg="green.500"
            source={{
              uri: `${participant.urlImg}`,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
            position={index !== 1 ? "absolute" : null}
            left={index === 0 ? "21%" : null}
            right={index === 2 ? "21%" : null}
          >
            {participant.keyName}
          </Avatar>
        ))}
      </Flex>
      <Text italic fontSize="xs" mb="15px">
        ¡No le digas a nadie quien te salio!
      </Text>
      <Button size="md" colorScheme="teal" onPress={() => lottery()}>
        Sortear
      </Button>
    </VStack>
  );
});

export default NoRaffle;
