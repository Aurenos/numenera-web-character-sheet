import React from "react";
import { Action, State } from "../../lib/reducer";
import BasicInfoTextInput from "./BasicInfoTextInput";
import CharacterTypeSelect from "./CharacterTypeSelect";

interface BasicInfoProps {
  dispatch: React.Dispatch<Action>;
  state: State;
}

const BasicInfo = (props: BasicInfoProps) => {
  const { dispatch, state } = props;
  return (
    <section className='flex flex-row space-x-2'>
      <div className='flex flex-col text-center space-y-2 p-2 w-1/2 rounded-lg border-2'>
        {/* Character Name */}
        <BasicInfoTextInput
          className='text-center border-none text-primary'
          type='text'
          placeholder='Character Name'
          currentValue={state.sheet.name}
          handleChange={evt =>
            dispatch({
              t: "setCharName",
              name: evt.target.value,
            })
          }
        />
        <span className='text-lg'>is a</span>
        {/* Character Descriptor */}
        <BasicInfoTextInput
          className='text-center border-none text-primary'
          type='text'
          placeholder='Descriptor'
          currentValue={state.sheet.descriptor}
          handleChange={evt =>
            dispatch({
              t: "setCharDescriptor",
              descriptor: evt.target.value,
            })
          }
        />
        {/* Character Type */}
        <CharacterTypeSelect
          className='font-sans text-lg input-primary text-primary'
          dispatch={dispatch}
          characterType={state.sheet.characterType}
        />
        {/* Character Focus */}
        <span className='text-lg'>who</span>
        <BasicInfoTextInput
          className='text-center border-none text-primary'
          type='text'
          placeholder='Focus'
          currentValue={state.sheet.focus}
          handleChange={evt =>
            dispatch({
              t: "setCharFocus",
              focus: evt.target.value,
            })
          }
        />
      </div>
      <div className='flex flex-row space-x-4'>
        {/* Character Tier */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text mx-auto'>Tier</span>
          </label>
          <BasicInfoTextInput
            className='input-bordered w-12 text-center input-primary'
            type='number'
            currentValue={state.sheet.tier}
            handleChange={evt =>
              dispatch({
                t: "setCharTier",
                tier: parseInt(evt.target.value),
              })
            }
          />
        </div>
        {/* Character Effort */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text mx-auto'>Effort</span>
          </label>
          <BasicInfoTextInput
            className='input-bordered w-12 text-center input-primary'
            type='number'
            currentValue={state.sheet.effort}
            handleChange={evt =>
              dispatch({
                t: "setCharEffort",
                effort: parseInt(evt.target.value),
              })
            }
          />
        </div>
        {/* Character XP */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text mx-auto'>XP</span>
          </label>
          <BasicInfoTextInput
            className='input-bordered w-12 text-center input-primary'
            type='number'
            currentValue={state.sheet.xp}
            handleChange={evt =>
              dispatch({
                t: "setCharXP",
                xp: parseInt(evt.target.value),
              })
            }
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
