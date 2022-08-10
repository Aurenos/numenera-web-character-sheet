import { useReducer } from "react";
import CharacterSheet from "./lib/characterSheet";
import { reducer } from "./lib/reducer";
import BasicInfo from "./components/BasicInfo";
import StatPools from "./components/StatPools";

const initialState = {
  sheet: new CharacterSheet(),
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const doThings = { state, dispatch };
  return (
    <main className='my-4 flex flex-col container'>
      <BasicInfo {...doThings} />
      <hr className='border border-dotted my-4' />
      <StatPools {...doThings} />
    </main>
  );
}

export default App;
