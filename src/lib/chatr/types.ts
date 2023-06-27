import { ChaterPlayer } from "./engine";
import * as data from "./levels/data";

export type LocationNames = data.LocationNames;
export type ObjectNames = data.ObjectNames;

export enum Direction {
  north = "north",
  south = "south",
  east = "east",
  west = "west",
}

export enum ObjectFlags {
  none = 0,
  takeable = 1,
  edible = 2,
  drinkable = 4,
  wearable = 8,
  usable = 16,
}

export type LocationData = {
  name: LocationNames;
  description: string;
  synonyms?: string[];
  objects?: ObjectData[];
  exits: {
    [key in Direction]?: LocationNames;
  };
};

type Condition = {
  user_is_in?: LocationNames;
  user_has?: ObjectNames[];
  result: InteractResult;
};

export type InteractOptions = {
  default?: string;
  condition?: Condition[];
};

export type ObjectData = {
  name: ObjectNames;
  inplaceDescription: string;
  synonyms: string[];
  description: string;
  interact?: InteractOptions;
  flags: ObjectFlags[];
};

export interface MinigameAbstract {
  player: undefined | ChaterPlayer;
  name: string;
  setPlayer(player: ChaterPlayer): void;
  reset(): void;
  getAnswer(input: string): string;
}

type InteractResult = {
  text: string;
  minigame?: MinigameAbstract;
  remove?: ObjectNames[];
  add?: ObjectNames[];
};
