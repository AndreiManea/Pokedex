interface TypeToColorMap {
  [key: string]: string;
}

const typeToColor: TypeToColorMap = {
  normal: "bg-normal",
  fighting: "bg-fighting",
  flying: "bg-flying",
  poison: "bg-poison",
  ground: "bg-ground",
  rock: "bg-rock",
  bug: "bg-bug",
  ghost: "bg-ghost",
  steel: "bg-steel",
  fire: "bg-fire",
  water: "bg-water",
  grass: "bg-grass",
  electric: "bg-electric",
  psychic: "bg-psychic",
  ice: "bg-ice",
  dragon: "bg-dragon",
  dark: "bg-dark",
  fairy: "bg-fairy",
  unknown: "bg-unknown",
  shadow: "bg-shadow",
};

interface TypeTagProps {
  name: string;
}

const TypeTag = ({ name }: TypeTagProps) => {
  const colorClass = typeToColor[name] || "bg-unknown";
  return (
    <h3
      className={`${colorClass} text-sm text-white capitalize mr-2 p-2 rounded-lg`}
    >
      {name}
    </h3>
  );
};

export default TypeTag;
