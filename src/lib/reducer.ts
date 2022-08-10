import CharacterSheet, { CharacterType, StatPoolName } from "./characterSheet";
import { match, P } from "ts-pattern";
import { clamp, minCap } from "./utils";

export type State = {
  sheet: CharacterSheet;
};

type BasicInfoActions =
  | { t: "setCharName"; name: string }
  | { t: "setCharDescriptor"; descriptor: string }
  | { t: "setCharType"; characterType: CharacterType }
  | { t: "setCharFocus"; focus: string }
  | { t: "setCharTier"; tier: number }
  | { t: "setCharEffort"; effort: number }
  | { t: "setCharXP"; xp: number };

type StatPoolActions =
  | { t: "setPoolMaximum"; pool: StatPoolName; maxValue: number }
  | { t: "setPoolCurrent"; pool: StatPoolName; currentValue: number }
  | { t: "setPoolEdge"; pool: StatPoolName; edge: number };

export type Action = BasicInfoActions | StatPoolActions;

// TODO: Skills
// TODO: Equipment
// TODO: Cyphers
// TODO: Special Abilities

// Praise be to the ts-pattern library
export function reducer(state: State, action: Action): State {
  return (
    match<Action, State>(action)
      // Basic Info
      .with({ t: "setCharName" }, ({ name }) => {
        return { ...state, sheet: { ...state.sheet, name } };
      })
      .with({ t: "setCharDescriptor" }, ({ descriptor }) => {
        return { ...state, sheet: { ...state.sheet, descriptor } };
      })
      .with({ t: "setCharType" }, ({ characterType }) => {
        return { ...state, sheet: { ...state.sheet, characterType } };
      })
      .with({ t: "setCharFocus" }, ({ focus }) => {
        return { ...state, sheet: { ...state.sheet, focus } };
      })
      .with({ t: "setCharTier" }, ({ tier }) => {
        tier = clamp(tier, 1, 6);
        return { ...state, sheet: { ...state.sheet, tier } };
      })
      .with({ t: "setCharEffort" }, ({ effort }) => {
        effort = clamp(effort, 1, 6);
        return { ...state, sheet: { ...state.sheet, effort } };
      })
      .with({ t: "setCharXP" }, ({ xp }) => {
        xp = minCap(xp, 0);
        return { ...state, sheet: { ...state.sheet, xp } };
      })
      // Stat Pool Maxima
      .with(
        { t: "setPoolMaximum", pool: P.when(pool => pool === "Might") },
        ({ maxValue }) => {
          maxValue = minCap(maxValue, 1);
          let mightPool = { ...state.sheet.mightPool, maxValue };
          return { ...state, sheet: { ...state.sheet, mightPool } };
        }
      )
      .with(
        { t: "setPoolMaximum", pool: P.when(pool => pool === "Speed") },
        ({ maxValue }) => {
          maxValue = minCap(maxValue, 1);
          let speedPool = { ...state.sheet.speedPool, maxValue };
          return { ...state, sheet: { ...state.sheet, speedPool } };
        }
      )
      .with(
        { t: "setPoolMaximum", pool: P.when(pool => pool === "Intellect") },
        ({ maxValue }) => {
          maxValue = minCap(maxValue, 1);
          let intellectPool = { ...state.sheet.intellectPool, maxValue };
          return { ...state, sheet: { ...state.sheet, intellectPool } };
        }
      )
      // Stat Pool Curent Values
      .with(
        { t: "setPoolCurrent", pool: P.when(pool => pool === "Might") },
        ({ currentValue }) => {
          let mightPool = { ...state.sheet.mightPool };
          currentValue = clamp(currentValue, 0, mightPool.maxValue);
          mightPool.currentValue = currentValue;
          return { ...state, sheet: { ...state.sheet, mightPool } };
        }
      )
      .with(
        { t: "setPoolCurrent", pool: P.when(pool => pool === "Speed") },
        ({ currentValue }) => {
          let speedPool = { ...state.sheet.speedPool };
          currentValue = clamp(currentValue, 0, speedPool.maxValue);
          speedPool.currentValue = currentValue;
          return { ...state, sheet: { ...state.sheet, speedPool } };
        }
      )
      .with(
        { t: "setPoolCurrent", pool: P.when(pool => pool === "Intellect") },
        ({ currentValue }) => {
          let intellectPool = { ...state.sheet.intellectPool };
          currentValue = clamp(currentValue, 0, intellectPool.maxValue);
          intellectPool.currentValue = currentValue;
          return { ...state, sheet: { ...state.sheet, intellectPool } };
        }
      )
      // Stat Pool Edge
      .with(
        { t: "setPoolEdge", pool: P.when(pool => pool === "Might") },
        ({ edge }) => {
          edge = clamp(edge, 0, 6);
          let mightPool = { ...state.sheet.mightPool, edge };
          return { ...state, sheet: { ...state.sheet, mightPool } };
        }
      )
      .with(
        { t: "setPoolEdge", pool: P.when(pool => pool === "Speed") },
        ({ edge }) => {
          edge = clamp(edge, 0, 6);
          let speedPool = { ...state.sheet.speedPool, edge };
          return { ...state, sheet: { ...state.sheet, speedPool } };
        }
      )
      .with(
        { t: "setPoolEdge", pool: P.when(pool => pool === "Intellect") },
        ({ edge }) => {
          edge = clamp(edge, 0, 6);
          let intellectPool = { ...state.sheet.intellectPool, edge };
          return { ...state, sheet: { ...state.sheet, intellectPool } };
        }
      )
      .otherwise(_ => state)
  );
}
