import { createSlice } from "@reduxjs/toolkit";
import { NamedAPIResource, Pokemon } from "pokenode-ts";

const initialState: {
  initialPokemons: Pokemon[];
  foundPokemons: Pokemon[];
  types: NamedAPIResource[];
  possiblePokemons: Pokemon[];
  selectedPokemon: Pokemon;
} = {
  initialPokemons: [],
  foundPokemons: [],
  types: [],
  possiblePokemons: [],
  selectedPokemon: {} as Pokemon,
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setInitialPokemons: (state, action) => {
      state.initialPokemons = action.payload;
    },
    setFoundPokemons: (state, action) => {
      state.foundPokemons = action.payload;
    },
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setPossiblePokemons: (state, action) => {
      state.possiblePokemons = action.payload;
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const {
  setInitialPokemons,
  setFoundPokemons,
  setTypes,
  setPossiblePokemons,
  setSelectedPokemon,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
