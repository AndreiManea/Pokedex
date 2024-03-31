import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { usePokemonsByName } from "./usePokemonByName";
import { Pokemon } from "pokenode-ts";
import { setFoundPokemons, setPossiblePokemons } from "../redux/pokemonsSlice";
import { setGlobalSearchTerm, setSearchLoading } from "../redux/searchSlice";
import { useDebouncedCallback } from "use-debounce";

export const useSearchPokemons = () => {
  const dispatch = useDispatch();
  const { initialPokemons } = useSelector((state: RootState) => state.pokemons);
  const { searchTerm, searchLoading } = useSelector(
    (state: RootState) => state.search
  );
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const [searchedPokemons, setSearchedPokemons] = useState<Pokemon[]>([]);
  const pokemonNames = searchedPokemons.map((pokemon) => pokemon.name);
  const { results, isLoading: resultsLoading } =
    usePokemonsByName(pokemonNames);
  const allQueriesCompleted = results.every((query) => query.isFetched);

  const debouncedSearch = useDebouncedCallback((newSearchTerm: string) => {
    const possiblePokemons = initialPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    dispatch(setGlobalSearchTerm(newSearchTerm.toLowerCase()));
    setSearchedPokemons(possiblePokemons);
    dispatch(setPossiblePokemons(possiblePokemons));
  }, 300);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  useEffect(() => {
    if (allQueriesCompleted && results.length > 0) {
      const queriesData = results.map((query) => query.data);
      dispatch(setFoundPokemons(queriesData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, allQueriesCompleted, results.length, searchTerm]);

  useEffect(() => {
    if (searchLoading !== resultsLoading) {
      dispatch(setSearchLoading(resultsLoading));
    }
  }, [resultsLoading, dispatch, searchLoading]);

  return {
    handleSearchTermChange,
    localSearchTerm,
  };
};
