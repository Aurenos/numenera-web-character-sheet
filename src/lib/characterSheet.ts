//? Need to decide if I should just make this the state root
class CharacterSheet {
  // Basic Info
  name: string = "";
  descriptor: string = "";
  characterType: CharacterType = "Glaive";
  focus: string = "";
  tier: number = 1;
  effort: number = 1;
  xp: number = 0;

  // Pools
  mightPool: StatPool = new StatPool();
  speedPool: StatPool = new StatPool();
  intellectPool: StatPool = new StatPool();

  // Equipment
  armor: number = 0;
  cypherLimit: number = 2;
  cyphers: Cypher[] = [];
  inventory: InventoryItem[] = [];

  // Skills & Abilities
  skills: Skill[] = [];
  specialAbilities: SpecialAbility[] = [];
}

export type CharacterType = "Glaive" | "Jack" | "Nano";

class Describable {
  name: string = "";
  description: string = "";
}

interface CollectionItem {
  id: string;

  generateId(): string;
}

export type StatPoolName = "Might" | "Speed" | "Intellect";
export class StatPool {
  maxValue: number = 10;
  currentValue: number = 10;
  edge: number = 0;
}

export type SkillProficiency = "Trained" | "Specialized" | "Inability";
export class Skill {
  name: string = "";
  proficiency: SkillProficiency = "Trained";
}

export class SpecialAbility extends Describable implements CollectionItem {
  id: string;

  constructor() {
    super();
    this.id = this.generateId();
  }

  generateId() {
    return "ability-" + Date.now();
  }
}

export class Cypher extends Describable implements CollectionItem {
  level: number = 1;
  id: string;

  constructor() {
    super();
    this.id = this.generateId();
  }

  generateId() {
    return "cypher-" + Date.now();
  }
}

export class InventoryItem extends Describable implements CollectionItem {
  id: string;

  constructor() {
    super();
    this.id = this.generateId();
  }

  generateId() {
    return "inventory-" + Date.now();
  }
}

export default CharacterSheet;
