import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemonsSlice";
import searchReducer from "./searchSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const pokemonsPersistConfig = {
  key: "pokemons",
  storage: storage,
  whitelist: ["selectedPokemon"], // Only selectedPokemon will be persisted
};

const rootReducer = combineReducers({
  pokemons: persistReducer(pokemonsPersistConfig, pokemonsReducer),
  search: searchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
