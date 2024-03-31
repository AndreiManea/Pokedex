import { useSelector } from "react-redux";
import { useSearchPokemons } from "../../hooks/useSearchPokemons";
import { RootState } from "../../redux/store";

const SearchBar = () => {
  const { handleSearchTermChange, localSearchTerm } = useSearchPokemons();
  const globalSearchTerm = useSelector(
    (state: RootState) => state.search.searchTerm
  );
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by name..."
        value={localSearchTerm || globalSearchTerm}
        onChange={handleSearchTermChange}
        className="w-full p-4 rounded-lg "
      />
    </div>
  );
};

export default SearchBar;
