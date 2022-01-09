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

AFRAME.registerState({
  initialState: {
    maxSpawnable: 3,
    numSpawned: 3,
    spawned: [{ id: 0 }, { id: 1 }, { id: 2 }] as DirtyableArray<{
      id: number;
    }>,
  },

  handlers: {
    despawn: (state) => {
      console.log("despawn!");
      if (state.numSpawned > 0) state.numSpawned -= 1;
    },
    spawn: (state) => {
      console.log("spawn!");
      if (state.numSpawned < state.maxSpawnable) state.numSpawned += 1;
    },
  },

  computeState: function (newState, payload) {
    newState.spawned = [];
    for (let i = 0; i < newState.numSpawned; i++) {
      newState.spawned.push({ id: i });
    }
    newState.spawned.__dirty = true;
    console.log("spawned", newState.spawned);
  },
});
