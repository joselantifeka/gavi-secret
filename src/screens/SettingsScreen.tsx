import { Avatar, Heading, VStack,Button, Text } from 'native-base'
import React from 'react'
import { SafeAreaView} from 'react-native'
import { rootStore } from '../models/root-store/root-store'
import { useStores } from "../models/root-store/root-store-context";


function SettingsSreen(props:any) {
  const {navigation} = props
  const {userStorage} = useStores()
  const user = userStorage.user
  const goToSetting = () => {
    navigation.navigate("Settings")
  }
  return (
    <SafeAreaView>
        <VStack alignItems="center" mt="20px">
          <Heading size="xs" mb="10px">{user.name} {user.LastName}</Heading>
        <Avatar
          bg="cyan.500"
          source={{
            uri: `${user.urlImg}`,
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
        >
          TE
        </Avatar>
        <Button size="md" colorScheme="teal" mt="20px" onPress={() => rootStore.resetStore()}>
        Cerrar sesion
      </Button>
      <Text mt="100%">
        V 0.01
      </Text>
        </VStack>
    </SafeAreaView>
  )
}

export default SettingsSreen