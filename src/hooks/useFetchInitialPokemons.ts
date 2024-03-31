import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInitialPokemons } from "./useInitialPokemons";
import { RootState } from "../redux/store";
import { setInitialPokemons, setTypes } from "../redux/pokemonsSlice";
import { useAllTypes } from "./useAllTypes";

export const useFetchInitialPokemons = () => {
  const dispatch = useDispatch();
  const { data: initialPokemonsData, isLoading } = useInitialPokemons();
  const { initialPokemons, types } = useSelector(
    (state: RootState) => state.pokemons
  );
  const { data: allTypesData } = useAllTypes();

  useEffect(() => {
    if (initialPokemons.length === 0 && initialPokemonsData?.results) {
      dispatch(
        setInitialPokemons(
          initialPokemonsData.results.map((result) => ({ name: result.name }))
        )
      );
    }
  }, [dispatch, initialPokemonsData?.results, initialPokemons.length]);

  useEffect(() => {
    if (types.length === 0 && allTypesData?.results) {
      dispatch(setTypes(allTypesData?.results));
    }
  }, [allTypesData?.results, dispatch, types.length]);

  return { isLoading };
};
