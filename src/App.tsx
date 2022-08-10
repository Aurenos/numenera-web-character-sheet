import { useReducer, useEffect } from "react";
import CharacterSheet from "./lib/characterSheet";
import { reducer } from "./lib/reducer";
import BasicInfo from "./components/BasicInfo/BasicInfoSection";
import StatPools from "./components/StatPools/StatPoolsSection";

const initialState = {
  sheet: new CharacterSheet(),
};

function App() {
  //? Maybe create a context to pass down the state and dispatch fn
  const [state, dispatch] = useReducer(reducer, initialState);
  const doThings = { state, dispatch };

  useEffect(() => {
    // TODO: implement auto-saving to local storage
  }, [state]);

  return (
    <main className='my-4 flex flex-col container'>
      <BasicInfo {...doThings} />
      <hr className='border my-4' />
      <StatPools {...doThings} />
      <hr className='border my-4' />
    </main>
  );
}

export default App;
