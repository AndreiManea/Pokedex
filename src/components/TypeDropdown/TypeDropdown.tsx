import { NamedAPIResource } from "pokenode-ts";
import { useDispatch, useSelector } from "react-redux";
import { setSearchType, setViewAll } from "../../redux/searchSlice";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

interface TypeDropdownProps {
  types: NamedAPIResource[];
}

const TypeDropdown: React.FC<TypeDropdownProps> = ({ types }) => {
  const dispatch = useDispatch();
  const { searchTerm, searchType } = useSelector(
    (state: RootState) => state.search
  );
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSearchType(e.target.value));
  };

  useEffect(() => {
    if (searchTerm && searchType) {
      dispatch(setViewAll(true));
    }
  }, [searchTerm, searchType, dispatch]);

  return (
    <select
      value={searchType || ""}
      onChange={handleTypeChange}
      className="w-full rounded-lg p-4 pr-6 appearance-none"
    >
      <option value="">Filter by type dropdown</option>
      {[...types]
        ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((type) => (
          <option value={type.name} key={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
    </select>
  );
};

export default TypeDropdown;
