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
    <section className='mx-auto' id='basic-info'>
      <div className='flex flex-row flex-wrap justify-center'>
        {/* Character Name */}
        <label>
          <BasicInfoTextInput
            className='text-right'
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
          <span className='mx-2 text-lg'>is a</span>
        </label>
        {/* Character Descriptor */}
        <BasicInfoTextInput
          className='text-center mr-2 w-28'
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
          className='font-sans min-h-12 leading-8 text-lg'
          dispatch={dispatch}
          characterType={state.sheet.characterType}
        />
        {/* Character Focus */}
        <label>
          <span className='mx-2 text-lg'>who</span>
          <BasicInfoTextInput
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
        </label>
      </div>
      <hr className='border border-dotted my-2' />
      <div className='flex flex-row space-x-4 justify-center'>
        {/* Character Tier */}
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Tier</span>
          </label>
          <BasicInfoTextInput
            className='input-bordered w-12 text-center input-secondary'
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
            <span className='label-text'>Effort</span>
          </label>
          <BasicInfoTextInput
            className='input-bordered w-12 text-center input-accent'
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
            <span className='label-text'>XP</span>
          </label>
          <BasicInfoTextInput
            className='input-bordered w-14 text-center input-success'
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
