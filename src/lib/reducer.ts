import { match } from "ts-pattern";
import CharacterSheet, {
  CharacterType,
  Cypher,
  InventoryItem,
  Skill,
  SkillProficiency,
  SpecialAbility,
  StatPoolName,
} from "./characterSheet";
import { clamp, minCap } from "./utils";

export type State = {
  sheet: CharacterSheet;
  promptedAction: Action | null;
  confirmationText: string;
  importDialogVisible: boolean;
};

type GlobalActions =
  | { t: "resetSheet" }
  | {
      t: "promptActionConfirmation";
      action: Action | null;
      confirmationText: string;
    }
  | { t: "setImportDialogVisibility"; visible: boolean }
  | { t: "importCharacterSheet"; sheet: CharacterSheet };

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

type SkillActions =
  | { t: "setSkillName"; id: string; name: string }
  | { t: "setSkillProficiency"; id: string; proficiency: SkillProficiency }
  | { t: "addSkill" }
  | { t: "removeSkill"; id: string };

type SpecialAbilityActions =
  | { t: "setAbilityName"; id: string; name: string }
  | { t: "setAbilityDescription"; id: string; description: string }
  | { t: "addAbility" }
  | { t: "removeAbility"; id: string };

type EquipmentActions =
  | { t: "setInventoryItemName"; id: string; name: string }
  | { t: "setInventoryItemDescription"; id: string; description: string }
  | { t: "addInventoryItem" }
  | { t: "removeInventoryItem"; id: string }
  | { t: "setArmor"; armor: number };

type CypherActions =
  | { t: "setCypherName"; id: string; name: string }
  | { t: "setCypherLevel"; id: string; level: number }
  | { t: "setCypherDescription"; id: string; description: string }
  | { t: "addCypher" }
  | { t: "removeCypher"; id: string }
  | { t: "setCypherLimit"; cypherLimit: number };

export type Action =
  | GlobalActions
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
      // Global Actions
      .with({ t: "resetSheet" }, () => {
        return { ...state, sheet: new CharacterSheet() };
      })
      .with(
        { t: "promptActionConfirmation" },
        ({ action, confirmationText }) => {
          return { ...state, promptedAction: action, confirmationText };
        }
      )
      .with({ t: "setImportDialogVisibility" }, ({ visible }) => {
        return { ...state, importDialogVisible: visible };
      })
      .with({ t: "importCharacterSheet" }, ({ sheet }) => {
        return { ...state, sheet };
      })
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
          if (sk.id === id) return { ...sk, name };
          return sk;
        });
        return { ...state, sheet: { ...state.sheet, skills } };
      })
      .with({ t: "setSkillProficiency" }, ({ id, proficiency }) => {
        let { skills } = state.sheet;
        skills = skills.map(sk => {
          if (sk.id === id) return { ...sk, proficiency };
          return sk;
        });
        return { ...state, sheet: { ...state.sheet, skills } };
      })
      // Special Abilities
      .with({ t: "addAbility" }, () => {
        return {
          ...state,
          sheet: {
            ...state.sheet,
            specialAbilities: [
              ...state.sheet.specialAbilities,
              new SpecialAbility(),
            ],
          },
        };
      })
      .with({ t: "removeAbility" }, ({ id }) => {
        let abilities = state.sheet.specialAbilities;
        abilities = abilities.filter(ability => ability.id !== id);
        return {
          ...state,
          sheet: { ...state.sheet, specialAbilities: abilities },
        };
      })
      .with({ t: "setAbilityName" }, ({ id, name }) => {
        let abilities = state.sheet.specialAbilities;
        abilities = abilities.map(ability => {
          if (ability.id === id) return { ...ability, name };
          return ability;
        });
        return {
          ...state,
          sheet: { ...state.sheet, specialAbilities: abilities },
        };
      })
      .with({ t: "setAbilityDescription" }, ({ id, description }) => {
        let abilities = state.sheet.specialAbilities;
        abilities = abilities.map(ability => {
          if (ability.id === id) return { ...ability, description };
          return ability;
        });
        return {
          ...state,
          sheet: { ...state.sheet, specialAbilities: abilities },
        };
      })
      // Cyphers
      .with({ t: "addCypher" }, () => {
        return {
          ...state,
          sheet: {
            ...state.sheet,
            cyphers: [...state.sheet.cyphers, new Cypher()],
          },
        };
      })
      .with({ t: "removeCypher" }, ({ id }) => {
        let cyphers = state.sheet.cyphers;
        cyphers = cyphers.filter(cypher => cypher.id !== id);
        return {
          ...state,
          sheet: { ...state.sheet, cyphers },
        };
      })
      .with({ t: "setCypherLevel" }, ({ id, level }) => {
        level = clamp(level, 1, 10);
        let cyphers = state.sheet.cyphers;
        cyphers = cyphers.map(cypher => {
          if (cypher.id === id) return { ...cypher, level };
          return cypher;
        });
        return {
          ...state,
          sheet: { ...state.sheet, cyphers: cyphers },
        };
      })
      .with({ t: "setCypherName" }, ({ id, name }) => {
        let cyphers = state.sheet.cyphers;
        cyphers = cyphers.map(cypher => {
          if (cypher.id === id) return { ...cypher, name };
          return cypher;
        });
        return {
          ...state,
          sheet: { ...state.sheet, cyphers: cyphers },
        };
      })
      .with({ t: "setCypherDescription" }, ({ id, description }) => {
        let cyphers = state.sheet.cyphers;
        cyphers = cyphers.map(cypher => {
          if (cypher.id === id) return { ...cypher, description };
          return cypher;
        });
        return {
          ...state,
          sheet: { ...state.sheet, cyphers: cyphers },
        };
      })
      .with({ t: "setCypherLimit" }, ({ cypherLimit }) => {
        cypherLimit = minCap(cypherLimit, 2);
        return { ...state, sheet: { ...state.sheet, cypherLimit } };
      })
      // Equipment
      .with({ t: "addInventoryItem" }, () => {
        return {
          ...state,
          sheet: {
            ...state.sheet,
            inventory: [...state.sheet.inventory, new InventoryItem()],
          },
        };
      })
      .with({ t: "removeInventoryItem" }, ({ id }) => {
        let inventory = state.sheet.inventory;
        inventory = inventory.filter(item => item.id !== id);
        return {
          ...state,
          sheet: { ...state.sheet, inventory },
        };
      })
      .with({ t: "setInventoryItemName" }, ({ id, name }) => {
        let inventory = state.sheet.inventory;
        inventory = inventory.map(item => {
          if (item.id === id) return { ...item, name };
          return item;
        });
        return {
          ...state,
          sheet: { ...state.sheet, inventory: inventory },
        };
      })
      .with({ t: "setInventoryItemDescription" }, ({ id, description }) => {
        let inventory = state.sheet.inventory;
        inventory = inventory.map(item => {
          if (item.id === id) return { ...item, description };
          return item;
        });
        return {
          ...state,
          sheet: { ...state.sheet, inventory: inventory },
        };
      })
      .with({ t: "setArmor" }, ({ armor }) => {
        armor = minCap(armor, 0);
        return { ...state, sheet: { ...state.sheet, armor } };
      })
      .otherwise(_ => state)
  );
}
