import { types, Instance, SnapshotOut } from "mobx-state-tree";
import getFirebase from "../../services/firebase/client";

export const userModelType = types.model("userModelType").props({
  IdSecretFriend: types.maybeNull(types.number),
  LastName: types.maybeNull(types.string),
  alreadyRaffle: types.maybeNull(types.boolean),
  desire: types.maybeNull(types.string),
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  isAvailable: types.maybeNull(types.boolean),
  urlImg: types.optional(types.string, ""),
  keyName: types.optional(types.string, ""),
});

export const UserModel = types
  .model("Contacts")
  .props({
    user: types.optional(userModelType, {}),
    isLoged: types.optional(types.boolean, false),
    isRaffle: types.optional(types.boolean, false),
  })
  .actions((self) => {
    function isLogin(login: boolean) {
      self.isLoged = login;
    }

    function Logout() {
      self.isLoged = false;
      self.isRaffle = false;
    }

    function setUser(user: any) {
      self.user = user;
    }
    function setIsRaffle(isRaffle: boolean) {
      self.isRaffle = isRaffle;
    }

    return { isLogin, Logout, setUser, setIsRaffle };
  })
  .actions((self) => ({
    getMeUser: (numberId: number) => {
      getFirebase()
        .firestore()
        .collection("account")
        .where("id", "==", numberId)
        .onSnapshot((user) => {
          const resp = user.docs.map((doc) => {
            const data = doc.data();
            return data;
          });
          self.setIsRaffle(resp[0].alreadyRaffle)
          self.setUser(resp[0])
          self.isLogin(true)
        });
    },
  }))
  .views((self) => ({}));

type UserModelType = Instance<typeof UserModel>;
export type UserModel = UserModelType;
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export type UsersSnapshot = UserSnapshotType;
export const createUserDefaultModel = () =>
  types.optional(UserModel, { user: {}, isLoged: false });
