import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import TypeTag from "../TypeTag/TypeTag";
import { useEffect } from "react";
import { setSelectedPokemon } from "../../redux/pokemonsSlice";
import { firstLetterToUpperCase } from "../../utils/helpers";
import { isEqual } from "lodash";

interface TypeToColorMap {
  [key: string]: string;
}
const typeToColor: TypeToColorMap = {
  spriteColor: "bg-spriteColor",
  abilities: "bg-abilities",
};
const DetailedPokemonScreen = () => {
  const { name } = useParams();

  const { foundPokemons, selectedPokemon } = useSelector(
    (state: RootState) => state.pokemons
  );
  const foundPokemon =
    foundPokemons.find((pokemon) => pokemon.name === name) || selectedPokemon;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEqual(foundPokemon, selectedPokemon)) {
      dispatch(setSelectedPokemon(foundPokemon));
    }
  }, [foundPokemon, selectedPokemon, dispatch]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center p-4">
      <div className="w-full sm:w-2/3 lg:w-2/3 xl:w-2/3 h-screen sm:h-1/2 bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center">
        <div className="w-full sm:w-1/2 h-full text-black flex flex-col justify-center space-y-4 items-center">
          <div className="flex w-auto mx-auto">
            <h2 className="text-4xl font-bold text-center w-full mb-16">
              {firstLetterToUpperCase(foundPokemon?.name || "")}
            </h2>
          </div>
          <div>
            <p className="text-lg font-semibold text-left border-b">Stats</p>
            <div className="flex justify-start mt-4">
              <div className="flex flex-col space-y-4 items-left justify-evenly">
                <div className="text-left">Type</div>
                <div className="text-left">Height</div>
                <div className="text-left">Weight</div>
                <div className="text-left">Abilities</div>
              </div>
              <div className="flex flex-col ml-4 space-y-4 justify-evenly">
                <div className="flex">
                  {foundPokemon?.types.map((type, index) => (
                    <TypeTag name={type.type.name} key={index} />
                  ))}
                </div>
                <div className="text-left">{foundPokemon?.height} </div>
                <div className="text-left">{foundPokemon?.weight} </div>
                <div className="flex flex-wrap">
                  {foundPokemon?.abilities.map((ability, index) => (
                    <div
                      key={index}
                      className={`${typeToColor["abilities"]} rounded-lg border-b p-2 mr-2 text-white`}
                    >
                      <h3>
                        {firstLetterToUpperCase(ability.ability?.name || "")}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 h-full flex flex-col justify-center items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-8 bg-blue-100 flex justify-center items-center">
            <img
              className="rounded-full"
              src={foundPokemon?.sprites.front_default as string}
              alt={foundPokemon?.name}
            />
          </div>
          <p className="mt-4 text-lg font-semibold border-b text-black w-1/2 mb-6 text-center">
            Sprites
          </p>
          <div className="flex justify-between space-x-4">
            <div
              className={`w-20 h-20 rounded-full overflow-hidden mb-8 flex ${typeToColor["spriteColor"]}`}
            >
              <img
                className="rounded-full mx-auto"
                src={foundPokemon?.sprites.back_default as string}
                alt={foundPokemon?.name}
              />
            </div>
            <div
              className={`w-20 h-20 rounded-full overflow-hidden mb-8 flex ${typeToColor["spriteColor"]}`}
            >
              <img
                className="rounded-full mx-auto"
                src={foundPokemon?.sprites.back_shiny as string}
                alt={foundPokemon?.name}
              />
            </div>
            <div
              className={`w-20 h-20 rounded-full overflow-hidden mb-8 flex ${typeToColor["spriteColor"]}`}
            >
              <img
                className="rounded-full mx-auto"
                src={foundPokemon?.sprites.front_shiny as string}
                alt={foundPokemon?.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPokemonScreen;
