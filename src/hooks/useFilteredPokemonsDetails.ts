import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setFoundPokemons } from "../redux/pokemonsSlice";
import { usePokemonsByName } from "./usePokemonByName";
import { setViewAll } from "../redux/searchSlice";

export const useFilteredPokemonDetails = () => {
  const dispatch = useDispatch();
  const { foundPokemons, initialPokemons, possiblePokemons } = useSelector(
    (state: RootState) => state.pokemons
  );
  const { searchTerm, searchType, viewAll } = useSelector(
    (state: RootState) => state.search
  );

  const pokemonNames = useMemo(() => {
    return viewAll
      ? possiblePokemons.map((pokemon) => pokemon.name)
      : initialPokemons.map((pokemon) => pokemon.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPokemons, viewAll]);

  const { results: pokemonDetailsQueries, isLoading: searchedPokemonsLoading } =
    usePokemonsByName(pokemonNames, viewAll);

  const allQueriesCompleted = pokemonDetailsQueries.every(
    (query) => query.isFetched
  );

  useEffect(() => {
    if (
      (allQueriesCompleted &&
        pokemonDetailsQueries.length > 0 &&
        foundPokemons.length === 0) ||
      (viewAll && allQueriesCompleted && pokemonDetailsQueries.length > 0)
    ) {
      const queriesData = pokemonDetailsQueries.map((query) => query.data);
      dispatch(setFoundPokemons(queriesData));
      if (viewAll) {
        dispatch(setViewAll(false));
      }
    }
  }, [
    dispatch,
    pokemonDetailsQueries,
    allQueriesCompleted,
    foundPokemons.length,
    viewAll,
  ]);

  const filteredFoundPokemonsByName = foundPokemons.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  const filteredFoundPokemonsByType = foundPokemons.filter((pokemon) =>
    pokemon.types.some((type) => type.type.name === searchType)
  );

  return {
    pokemonsToDisplay: searchType
      ? filteredFoundPokemonsByType
      : filteredFoundPokemonsByName,
    isLoading: searchedPokemonsLoading,
  };
};
