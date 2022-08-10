import CharacterSheet, {
  CharacterType,
  Skill,
  SkillProficiency,
  StatPoolName,
} from "./characterSheet";
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

// TODO: Implement
type SkillActions =
  | { t: "setSkillName"; id: string; name: string }
  | { t: "setSkillProficiency"; id: string; proficiency: SkillProficiency }
  | { t: "addSkill" }
  | { t: "removeSkill"; id: string };

// TODO: Implement
type SpecialAbilityActions =
  | { t: "setAbilityName"; id: string; name: string }
  | { t: "setAbilityDescription"; id: string; description: string }
  | { t: "addAbility" }
  | { t: "removeAbility"; id: string };

// TODO: Implement
type EquipmentActions =
  | { t: "setInventoryItemName"; id: string; name: string }
  | { t: "setInventoryItemDescription"; id: string; description: string }
  | { t: "addInventoryItem" }
  | { t: "removeInventoryItem"; id: string }
  | { t: "setArmor"; value: number };

// TODO: Implement
type CypherActions =
  | { t: "setCypherName"; id: string; name: string }
  | { t: "setCypherLevel"; id: string; level: number }
  | { t: "setCypherDescription"; id: string; description: string }
  | { t: "addCypher" }
  | { t: "removeCypher"; id: string };

export type Action =
  | BasicInfoActions
  | StatPoolActions
  | SkillActions
  | SpecialAbilityActions
  | EquipmentActions
  | CypherActions;

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
      .with({ t: "setPoolMaximum", pool: "Might" }, ({ maxValue }) => {
        maxValue = minCap(maxValue, 1);
        let mightPool = { ...state.sheet.mightPool, maxValue };
        return { ...state, sheet: { ...state.sheet, mightPool } };
      })
      .with({ t: "setPoolMaximum", pool: "Speed" }, ({ maxValue }) => {
        maxValue = minCap(maxValue, 1);
        let speedPool = { ...state.sheet.speedPool, maxValue };
        return { ...state, sheet: { ...state.sheet, speedPool } };
      })
      .with({ t: "setPoolMaximum", pool: "Intellect" }, ({ maxValue }) => {
        maxValue = minCap(maxValue, 1);
        let intellectPool = { ...state.sheet.intellectPool, maxValue };
        return { ...state, sheet: { ...state.sheet, intellectPool } };
      })
      // Stat Pool Current Values
      .with({ t: "setPoolCurrent", pool: "Might" }, ({ currentValue }) => {
        let mightPool = { ...state.sheet.mightPool };
        currentValue = clamp(currentValue, 0, mightPool.maxValue);
        mightPool.currentValue = currentValue;
        return { ...state, sheet: { ...state.sheet, mightPool } };
      })
      .with({ t: "setPoolCurrent", pool: "Speed" }, ({ currentValue }) => {
        let speedPool = { ...state.sheet.speedPool };
        currentValue = clamp(currentValue, 0, speedPool.maxValue);
        speedPool.currentValue = currentValue;
        return { ...state, sheet: { ...state.sheet, speedPool } };
      })
      .with({ t: "setPoolCurrent", pool: "Intellect" }, ({ currentValue }) => {
        let intellectPool = { ...state.sheet.intellectPool };
        currentValue = clamp(currentValue, 0, intellectPool.maxValue);
        intellectPool.currentValue = currentValue;
        return { ...state, sheet: { ...state.sheet, intellectPool } };
      })
      // Stat Pool Edge
      .with({ t: "setPoolEdge", pool: "Might" }, ({ edge }) => {
        edge = clamp(edge, 0, 6);
        let mightPool = { ...state.sheet.mightPool, edge };
        return { ...state, sheet: { ...state.sheet, mightPool } };
      })
      .with({ t: "setPoolEdge", pool: "Speed" }, ({ edge }) => {
        edge = clamp(edge, 0, 6);
        let speedPool = { ...state.sheet.speedPool, edge };
        return { ...state, sheet: { ...state.sheet, speedPool } };
      })
      .with({ t: "setPoolEdge", pool: "Intellect" }, ({ edge }) => {
        edge = clamp(edge, 0, 6);
        let intellectPool = { ...state.sheet.intellectPool, edge };
        return { ...state, sheet: { ...state.sheet, intellectPool } };
      })
      // Skills
      .with({ t: "addSkill" }, () => {
        return {
          ...state,
          sheet: {
            ...state.sheet,
            skills: [...state.sheet.skills, new Skill()],
          },
        };
      })
      .with({ t: "removeSkill" }, ({ id }) => {
        let { skills } = state.sheet;
        skills = skills.filter(sk => sk.id !== id);
        return { ...state, sheet: { ...state.sheet, skills } };
      })
      .with({ t: "setSkillName" }, ({ id, name }) => {
        let { skills } = state.sheet;
        skills = skills.map(sk => {
          if (sk.id === id) {
            return { ...sk, name };
          }
          return sk;
        });
        return { ...state, sheet: { ...state.sheet, skills } };
      })
      .with({ t: "setSkillProficiency" }, ({ id, proficiency }) => {
        console.log(id, proficiency);
        let { skills } = state.sheet;
        skills = skills.map(sk => {
          if (sk.id === id) {
            return { ...sk, proficiency };
          }
          return sk;
        });
        return { ...state, sheet: { ...state.sheet, skills } };
      })
      .otherwise(_ => state)
  );
}
