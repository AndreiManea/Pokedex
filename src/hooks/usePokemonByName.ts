import { useQueries } from "react-query";
import { pokemonClient } from "../api/pokemonClient";

export const usePokemonsByName = (names: string[], viewAll?: boolean) => {
  const totalNames = viewAll ? names : names.slice(0, 5);
  const queries =
    names.length > 0
      ? totalNames.map((name) => ({
          queryKey: ["pokemonByName", name],
          queryFn: () => pokemonClient.getPokemonByName(name),
        }))
      : [];

  const results = useQueries(queries);

  const isLoading = results.some((result) => result.isLoading);

  return { results, isLoading };
};
