import { useEffect, useReducer } from "react";
import BasicInfo from "./components/BasicInfo/BasicInfoSection";
import ConfirmActionModal from "./components/ConfirmActionModal";
import CyphersSection from "./components/Cyphers/CyphersSection";
import EquipmentSection from "./components/Equipment/EquipmentSection";
import SkillsSection from "./components/Skills/SkillsSection";
import SpecialAbilitiesSection from "./components/SpecialAbility/SpecialAbilitiesSection";
import StatPools from "./components/StatPools/StatPoolsSection";
import CornerTools from "./components/Tools/CornerTools";
import CharacterSheet from "./lib/characterSheet";
import { reducer, State } from "./lib/reducer";

const initialState: State = {
  sheet: new CharacterSheet(),
  promptedAction: null,
  confirmationText: "",
};

const getInitialState = () => {
  const json = localStorage.getItem("characterSheet");
  if (json !== null && json !== undefined) {
    const sheetData = JSON.parse(json);
    return { ...initialState, sheet: sheetData };
  } else {
    return initialState;
  }
};

function App() {
  //? Maybe create a context to pass down the state and dispatch fn
  const init = getInitialState();
  const [state, dispatch] = useReducer(reducer, init);
  const doThings = { state, dispatch };

  useEffect(() => {
    const json = JSON.stringify(state.sheet);
    localStorage.setItem("characterSheet", json);
  }, [state.sheet]);

  return (
    <main className='my-4 mx-12 flex flex-col container font-sans w-full lg:w-2/3'>
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
      <CyphersSection
        dispatch={dispatch}
        cyphers={state.sheet.cyphers}
        cypherLimit={state.sheet.cypherLimit}
      />
      <div className='divider' />
      <EquipmentSection
        dispatch={dispatch}
        inventory={state.sheet.inventory}
        armor={state.sheet.armor}
      />
      <CornerTools {...doThings} />
      <ConfirmActionModal
        dispatch={dispatch}
        promptedAction={state.promptedAction}
        confirmationText={state.confirmationText}
      />
    </main>
  );
}

export default App;
