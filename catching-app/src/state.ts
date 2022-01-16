import { randomId } from "./helpers";
import { revealSpawn } from "./actions";

interface RegisterState<T> {
  initialState: T;
  nonBindedStateKeys?: any[]; // Not sure
  handlers: {
    [key: string]: (state: T, action?: any) => void;
  };
  computeState?: (newState: T, payload?: any) => void;
}

declare namespace AFRAME {
  let registerState: <T>(register: RegisterState<T>) => void;
}

interface DirtyableArray<T> extends Array<T> {
  __dirty?: boolean;
}

export type Mob = { id: string };

export const initialState = {
  maxSpawnable: 3,
  spawned: [
    { id: randomId() },
    { id: randomId() },
    { id: randomId() },
  ] as DirtyableArray<{
    id: string;
  }>,
  inCombat: "",
  enemy: null as { species: string; dexId: string; hp: number },
  enemyImage: "",
};

AFRAME.registerState({
  initialState,

  handlers: {
    despawn: (state, action: Mob) => {
      console.log("state: despawn");
      const index = state.spawned.findIndex(({ id }) => id === action.id);
      if (index > -1) {
        state.spawned.splice(index, 1);
        state.spawned.__dirty = true;
      }
    },
    spawn: (state) => {
      console.log("state: spawn");
      if (state.spawned.length < state.maxSpawnable) {
        state.spawned.push({ id: randomId() });
        state.spawned.__dirty = true;
      }
    },
    enterCombat: (state, action: Mob) => {
      console.log("state: enterCombat", action);
      state.inCombat = action.id;
      revealSpawn();
    },
    exitCombat: (state) => {
      console.log("state: exitCombat");
      state.inCombat = "";
    },
    setEnemy: (state, action) => {
      console.log("state: setEnemy", action);
      state.enemy = action;
    },
  },

  computeState: function (newState, payload) {
    if (newState.enemy && newState.enemy.dexId !== undefined) {
      newState.enemyImage = `assets/${newState.enemy.dexId}.png`;
    }
  },
});
