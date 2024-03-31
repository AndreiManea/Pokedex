import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ListPokemonsScreen from "./components/ListPokemonsScreen/ListPokemonsScreen";
import DetailedPokemonScreen from "./components/DetailedPokemonScreen/DetailedPokemonScreen";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ListPokemonsScreen />} />
          <Route path="/:name" element={<DetailedPokemonScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
