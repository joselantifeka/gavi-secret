import {
  Center,
  Button,
  Heading,
  Text,
  VStack,
  Box,
  Input,
  HStack,
  KeyboardAvoidingView,
  FormControl,
  Icon,
  Flex,
} from "native-base";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo";
import { userLoginProps } from "../lib/types";
import getFirebase from "../services/firebase/client";
import { useStores } from "../models/root-store/root-store-context";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const LoginScreen = () => {
  const { userStorage } = useStores();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [err, setErr] = useState("");
  const users: Array<userLoginProps> = [
    {
      name: "Camilo",
      year: "1993",
      id: 1,
    },
    {
      name: "Mauricio",
      year: "1997",
      id: 2,
    },
    {
      name: "Juan",
      year: "2004",
      id: 3,
    },
    {
      name: "Jose",
      year: "2005",
      id: 4,
    },
  ];
  const login = () => {
    users.forEach((user, index) => {
      if (user.name === name && user.year === year) {
        userStorage.getMeUser(index + 1);
      }
      if ((index === 3 && user.name !== name) || user.year !== year) {
        setErr("Nombre o año erroneos");
      }
    });
  };

  useEffect(() => {}, [userStorage]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <VStack alignItems="center" mb={20}>
            <Logo width="80%" />
          </VStack>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            ¡Bienvenido!
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Ingresa para poder empezar!
          </Heading>
          <KeyboardAvoidingView behavior="height">
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Primer nombre</FormControl.Label>
                <Input
                  placeholder="ej: Juan, Mauricio, Camilo"
                  value={name}
                  onChangeText={setName}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Año de nacimiento</FormControl.Label>
                <Input
                  placeholder="ej: 2005"
                  value={year}
                  onChangeText={setYear}
                />
              </FormControl>
              <Button mt="2" colorScheme="red" onPress={() => login()}>
                Sign in
              </Button>
              {err && (
                <Flex flexDirection="row">
                  <Icon as={Ionicons} name="alert" mr="2px" color="red.600" />
                  <Text fontSize="xs" color="red.600">
                    {err}
                  </Text>
                </Flex>
              )}
              <HStack mt="2" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  ¿Tienes problemas para ingresar? Comunicate con el ingeniero
                  encargado
                </Text>
              </HStack>
            </VStack>
          </KeyboardAvoidingView>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
