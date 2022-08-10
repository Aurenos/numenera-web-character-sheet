import { useReducer, useEffect } from "react";
import CharacterSheet from "./lib/characterSheet";
import { reducer } from "./lib/reducer";
import BasicInfo from "./components/BasicInfo/BasicInfoSection";
import StatPools from "./components/StatPools/StatPoolsSection";
import SkillsSection from "./components/Skills/SkillsSection";
import SpecialAbilitiesSection from "./components/SpecialAbility/SpecialAbilitiesSection";
import CyphersSection from "./components/Cyphers/CyphersSection";

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
    <main className='my-4 flex flex-col container font-sans'>
      <BasicInfo {...doThings} />
      <div className='divider' />
      <StatPools {...doThings} />
      <div className='divider' />
      <SkillsSection dispatch={dispatch} skills={state.sheet.skills} />
      <div className='divider' />
      <SpecialAbilitiesSection
        dispatch={dispatch}
        abilities={state.sheet.specialAbilities}
      />
      <div className='divider' />
      <CyphersSection dispatch={dispatch} cyphers={state.sheet.cyphers} />
    </main>
  );
}

export default App;
