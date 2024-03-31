import SearchBar from "../SearchBar/SearchBar";
import TypeDropdown from "../TypeDropdown/TypeDropdown";
import { useFetchInitialPokemons } from "../../hooks/useFetchInitialPokemons";
import { useFilteredPokemonDetails } from "../../hooks/useFilteredPokemonsDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setViewAll } from "../../redux/searchSlice";
import { useState } from "react";
import PokemonTile from "../PokemonTile/PokemonTile";

const ListPokemonsScreen = () => {
  const { searchLoading, searchType, searchTerm } = useSelector(
    (state: RootState) => state.search
  );
  const { types, possiblePokemons } = useSelector(
    (state: RootState) => state.pokemons
  );
  const { isLoading } = useFetchInitialPokemons();
  const { pokemonsToDisplay, isLoading: searchedPokemonsLoading } =
    useFilteredPokemonDetails();

  const [isViewAll, setIsViewAll] = useState(false);

  const dispatch = useDispatch();

  const isAnythingLoading =
    isLoading || searchLoading || searchedPokemonsLoading;

  const isEverythingNotLoading =
    !searchLoading && !isLoading && !searchedPokemonsLoading;

  const handleViewAll = () => {
    dispatch(setViewAll(!isViewAll));
    setIsViewAll(!isViewAll);
  };

  const renderPokemonsToDisplay = () => {
    if (pokemonsToDisplay) {
      return pokemonsToDisplay
        .slice(0, isViewAll ? pokemonsToDisplay.length : 5)
        .map((pokemon) => <PokemonTile pokemon={pokemon} />);
    }
  };

  const renderLoader = () => {
    if (isAnythingLoading) {
      return <div>Loading...</div>;
    }
  };

  const renderViewAllButton = () => {
    if (
      possiblePokemons.length > 5 &&
      pokemonsToDisplay.length >= 5 &&
      !searchLoading &&
      !searchedPokemonsLoading &&
      searchTerm
    )
      return (
        <button onClick={handleViewAll}>
          View{" "}
          {!isViewAll
            ? `all (${
                searchType ? pokemonsToDisplay.length : possiblePokemons.length
              })`
            : "less"}
        </button>
      );
  };

  const renderNoPokemonFound = () => {
    if (pokemonsToDisplay?.length === 0 && isEverythingNotLoading) {
      return (
        <p>
          No pokemon found, please try a different name or a different type.
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-darkGray p-8 rounded-xl">
      <h1>Pokedex</h1>
      <div className="flex gap-6">
        <SearchBar />
        {types && <TypeDropdown types={types} />}
      </div>
      <hr className="border-t-4 rounded-lg" />

      {renderPokemonsToDisplay()}
      {renderLoader()}
      {renderViewAllButton()}
      {renderNoPokemonFound()}
    </div>
  );
};

export default ListPokemonsScreen;
