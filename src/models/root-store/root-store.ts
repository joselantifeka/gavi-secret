import {
  applySnapshot,
  getSnapshot,
  Instance,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { createUserDefaultModel } from '../user/userModel';

export const resetStore = (self: any) => {
  let initialState: any;
  return {
    afterCreate() {
      initialState = getSnapshot(self);
    },
    resetStore() {
      applySnapshot(self, initialState);
    },
  };
};

export const RootStoreModel = types
  .model('RootStore')
  .props({
    userStorage: createUserDefaultModel(),
  })
  .actions(resetStore);

export const rootStore = RootStoreModel.create();
rootStore.afterCreate();
export type RootStore = Instance<typeof RootStoreModel>;
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;
