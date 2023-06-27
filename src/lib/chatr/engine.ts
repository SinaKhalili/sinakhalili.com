import {
  Direction,
  InteractOptions,
  LocationData,
  MinigameAbstract,
  ObjectData,
  ObjectFlags,
  ObjectNames,
  LocationNames,
} from "./types";

function isSynonymOf(word: string, synonym: string) {
  if (word == synonym) {
    return true;
  }
  let synonyms: any = {
    movement: ["go", "walk", "run", "move", "travel", "jump", "swim"],
    look: ["l", "look", "examine", "inspect", "observe", "read"],
    inventory: ["inventory", "items", "bag", "backpack"],
    take: ["t", "take", "get", "pick up", "grab"],
    drop: ["drop", "put down"],
    use: [
      "use",
      "activate",
      "interact",
      "put",
      "place",
      "insert",
      "click",
      "press",
      "smoke",
      "combine",
    ],
    help: ["help", "commands", "command", "options", "option"],
    north: ["north", "n"],
    south: ["south", "s"],
    east: ["east", "e"],
    west: ["west", "w"],
    up: ["up", "u"],
    down: ["down", "d"],
    around: ["around", "here", "room", "area"],
    talk: ["talk", "speak", "say", "ask"],
    adjective: ["old", "small"],
    "inside river": ["river", "water"],
  };
  if (synonyms[word] == undefined) {
    return false;
  } else {
    return synonyms[word].includes(synonym);
  }
}

export class ChaterObject {
  name: ObjectNames;
  description: string;
  inplaceDescription: string;
  flags: ObjectFlags[];
  interact: InteractOptions | null;
  synonyms: string[];

  constructor(objectData: ObjectData) {
    this.name = objectData.name;
    this.description = objectData.description;
    this.flags = objectData.flags;
    this.inplaceDescription = objectData.inplaceDescription;
    this.synonyms = objectData.synonyms;
    this.interact = objectData.interact || null;
  }

  getDescription(): string {
    return this.description;
  }

  getInplaceDescription(): string {
    return this.inplaceDescription;
  }

  isSynonymousWith(synonym: string): boolean {
    return this.name === synonym || this.synonyms.includes(synonym);
  }

  isTakeable(): boolean {
    return this.flags.includes(ObjectFlags.takeable);
  }

  isInteractable(): boolean {
    return this.interact != null;
  }

  interactWith(
    location: LocationNames,
    player: ChaterPlayer,
    globalObjects: ChaterObject[]
  ): string {
    if (this.interact == null || this.interact.default == undefined) {
      return `
You can't interact with that.
`;
    }
    if (this.interact.condition == undefined) {
      return this.interact.default;
    }
    for (let condition of this.interact.condition) {
      const isUserInCorrectLocation =
        condition.user_is_in == location || condition.user_is_in == undefined;
      const isPlayerHoldingCorrectObjects =
        condition.user_has == undefined ||
        condition.user_has.every((object) => player.isInInventory(object));

      if (isUserInCorrectLocation && isPlayerHoldingCorrectObjects) {
        if (condition.result.remove != undefined) {
          player.removeFromInventory(...condition.result.remove);
        }
        if (condition.result.add != undefined) {
          const objectsToAdd = globalObjects.filter((object) =>
            condition.result.add?.includes(object.name)
          );
          player.addToInventory(...objectsToAdd);
        }
        if (condition.result.minigame != undefined) {
          player.putInMinigame(condition.result.minigame);
        }
        if (condition.result.text != undefined) {
          return condition.result.text;
        }
      }
    }
    return this.interact.default;
  }
}

class ChaterContainer {
  public name: string;
  public exits: { [key in Direction]?: LocationNames };
  public parent: ChaterContainer | null;
  public synonyms: string[] = [];
  public children: ChaterObject[];
  public description: string;

  constructor(
    name: string,
    description: string,
    exits: { [key in Direction]?: LocationNames },
    parent: ChaterContainer | null,
    synonyms: string[] = []
  ) {
    this.name = name;
    this.parent = parent;
    this.exits = exits;
    this.children = [];
    this.description = description;
    this.synonyms = synonyms;
  }

  public getDescription(): string {
    return `${this.description}
${this.children.map((child) => child.getInplaceDescription()).join("\n")}
`;
  }

  public getDescriptionsOfChildren(): string {
    return this.children.map((child) => child.name).join("\n");
  }

  public getChild(name: string): ChaterObject | null {
    return this.children.find((child) => child.isSynonymousWith(name)) || null;
  }

  public removeChild(name: string) {
    const child = this.getChild(name);
    if (child) {
      this.children = this.children.filter((c) => c !== child);
    }
  }

  public isSynonymousWith(synonym: string): boolean {
    return this.name === synonym || this.synonyms.includes(synonym);
  }
}

export class ChaterPlayer {
  public container: ChaterContainer;
  public tokenHistory: string[] = [];
  public inventory: ChaterObject[] = [];
  public isInMiniGame: boolean = false;
  public minigame: MinigameAbstract | undefined = undefined;
  public chaterGame: ChaterGame;

  constructor(container: ChaterContainer, chaterGame: ChaterGame) {
    this.container = container;
    this.chaterGame = chaterGame;
  }

  putInMinigame(minigame: MinigameAbstract) {
    this.isInMiniGame = true;
    this.minigame = minigame;
    this.minigame.setPlayer(this);
    this.minigame.reset();
  }

  endMinigame() {
    this.isInMiniGame = false;
    this.minigame = undefined;
  }

  getCurrentRoom() {
    return this.container;
  }

  showInventory() {
    if (this.inventory.length === 0) {
      return `
You have nothing
`;
    } else {
      return `
You have the following items in your inventory:
 ${this.inventory.map((item) => item.name).join(", \n")}
`;
    }
  }

  isInInventory(name: string) {
    for (const item of this.inventory) {
      if (item.isSynonymousWith(name)) {
        return true;
      }
    }
    return false;
  }

  getItem(name: string) {
    for (const item of this.inventory) {
      if (item.isSynonymousWith(name)) {
        return item;
      }
    }
    return null;
  }

  addToInventory(...items: ChaterObject[]) {
    this.inventory.push(...items);
  }

  removeFromInventory(...items: string[]) {
    this.inventory = this.inventory.filter(
      (item) => !items.includes(item.name)
    );
  }
}

export class ChaterGame {
  public root: ChaterContainer = new ChaterContainer(
    "root",
    "root",
    {},
    null,
    []
  );
  public containers: { [key: string]: ChaterContainer } = { root: this.root };
  public startingLine: string;
  public globalObjects: ChaterObject[];
  public beforeTurnHooks: ((input: string, game: ChaterGame) => void)[] = [];
  public afterTurnHooks: ((ans: string, game: ChaterGame) => void)[] = [];
  public won: boolean = false;
  public seededAnswer: string | undefined = undefined;

  public player: ChaterPlayer;

  constructor(
    locations: LocationData[] | LocationData[],
    globalObjects: ObjectData[],
    startingLocation: LocationNames,
    startingItems: ObjectData[],
    startingLine: string
  ) {
    this.globalObjects = globalObjects.map(
      (objectData) => new ChaterObject(objectData)
    );
    this.startingLine = startingLine;
    for (const location of locations) {
      this.containers[location.name] = new ChaterContainer(
        location.name,
        location.description,
        location.exits,
        this.root,
        location.synonyms
      );

      for (const object of location.objects || []) {
        this.containers[location.name].children.push(new ChaterObject(object));
      }
    }

    this.player = new ChaterPlayer(this.containers[startingLocation], this);
    for (const item of startingItems) {
      this.player.addToInventory(new ChaterObject(item));
    }
  }

  getPlayer() {
    return this.player;
  }

  getCurrentLine() {
    return this.player.getCurrentRoom().getDescription();
  }

  tryToMovePlayer(direction: Direction) {
    let container = this.player.getCurrentRoom();
    let newContainer = this.containers[container.exits[direction]!];
    if (newContainer == undefined) {
      return `
You can't go that way.
`;
    } else {
      this.player.container = newContainer;
      return this.getCurrentLine();
    }
  }

  isDirection(word: string) {
    let directions = ["north", "south", "east", "west", "up", "down"];
    for (const direction of directions) {
      if (isSynonymOf(direction, word)) {
        return true;
      }
    }
    return false;
  }

  translateDirection(direction: string) {
    let directions = ["north", "south", "east", "west", "up", "down"];
    for (const dir of directions) {
      if (isSynonymOf(dir, direction)) {
        return dir as Direction;
      }
    }
  }

  parseMovement(noun: string) {
    if (this.isDirection(noun)) {
      const direction = this.translateDirection(noun);
      if (direction != undefined) {
        return this.tryToMovePlayer(direction);
      }
    }
    for (const direction of Object.keys(
      this.player.getCurrentRoom().exits
    ) as Direction[]) {
      let name_of_exit = this.player.getCurrentRoom().exits[direction]!;
      let location = this.containers[name_of_exit];
      if (isSynonymOf(name_of_exit, noun) || location.isSynonymousWith(noun)) {
        return this.tryToMovePlayer(direction);
      }
      if (isSynonymOf(this.player.getCurrentRoom().name, noun)) {
        return `
You are already here.
You can also write movement commands
with a direction like "go north".
`;
      }
    }
    return `
You can't go that way.
`;
  }

  parseLook(noun: string) {
    if (isSynonymOf("around", noun)) {
      return this.getCurrentLine();
    } else if (this.player.getCurrentRoom().getChild(noun)) {
      return this.player.getCurrentRoom().getChild(noun)!.getDescription();
    } else if (this.player.isInInventory(noun)) {
      return this.player.inventory
        .find((item) => item.isSynonymousWith(noun))!
        .getDescription();
    } else {
      return `
Much like questionable erotica, you can't look at that.
`;
    }
  }

  parseTake(noun: string) {
    if (this.player.getCurrentRoom().getChild(noun)) {
      let object = this.player.getCurrentRoom().getChild(noun);
      if (object?.isTakeable()) {
        this.player.inventory.push(object);
        this.player.getCurrentRoom().removeChild(noun);
        return `
Taken. You can inspect this item now.
`;
      }

      return "An interesting idea...";
    }

    return `
That object isn't in this room.
`;
  }

  wrapIgnore(show: string) {
    return ["I'm just going to ignore the second part\n", show].join("\n");
  }

  parseUse(noun: string) {
    if (this.player.isInInventory(noun)) {
      const item = this.player.getItem(noun);
      if (item == null) {
        return `
Item is not in your inventory.
`;
      }
      if (item.isInteractable()) {
        return item.interactWith(
          this.player.getCurrentRoom().name as LocationNames,
          this.player,
          this.globalObjects
        );
      }
    } else {
      return `
You don't have a ${noun} in your inventory.
`;
    }
  }

  parseVerbNoun(verb: string, noun: string) {
    this.player.tokenHistory = [];
    if (isSynonymOf("movement", verb)) {
      return this.parseMovement(noun);
    } else if (isSynonymOf("look", verb)) {
      return this.parseLook(noun);
    } else if (isSynonymOf("talk", verb)) {
      return `
You speak but hear no response. Now it's even weirder.
`;
    } else if (isSynonymOf("inventory", verb)) {
      return this.wrapIgnore(this.player.showInventory());
    } else if (isSynonymOf("take", verb)) {
      return this.parseTake(noun);
    } else if (isSynonymOf("drop", verb)) {
      return `
You fight the intrusive thoughts and decide
not to drop the item.
`;
    } else if (isSynonymOf("use", verb)) {
      return this.parseUse(noun);
    } else if (isSynonymOf("help", verb)) {
      return this.showHelp();
    } else {
      return `
Ngl. I don't understand what you mean by that.
You could try typing help if you want.
`;
    }
  }

  showHelp() {
    return `
Try to use the following commands:
  go,
  look,
  inventory,
  take,
  drop,
  use,
  help
`;
  }

  parseSingleWord(word: string) {
    if (isSynonymOf("movement", word)) {
      this.player.tokenHistory.push(word);
      return "\nWhere do you want to go?\n";
    } else if (isSynonymOf("look", word)) {
      return this.getCurrentLine();
    } else if (isSynonymOf("inventory", word)) {
      return this.player.showInventory();
    } else if (isSynonymOf("take", word)) {
      this.player.tokenHistory.push(word);
      return "\nWhat do you want to take?\n";
    } else if (isSynonymOf("drop", word)) {
      this.player.tokenHistory.push(word);
      return "\nWhat do you want to drop?\n";
    } else if (isSynonymOf("use", word)) {
      this.player.tokenHistory.push(word);
      return "\nWhat do you want to use?\n";
    } else if (isSynonymOf("help", word)) {
      return this.showHelp();
    } else if (this.isDirection(word)) {
      return this.parseVerbNoun("go", word);
    } else if (isSynonymOf("talk", word)) {
      return `
You speak but hear no response. Now it's even weirder.
`;
    } else {
      return `
I don't understand the word ${word}
`;
    }
  }

  registerBeforeTurnHook(hook: (input: string, game: ChaterGame) => void) {
    this.beforeTurnHooks.push(hook);
  }

  registerAfterTurnHook(hook: (ans: string, game: ChaterGame) => void) {
    this.afterTurnHooks.push(hook);
  }

  seedAnswer(answer: string) {
    this.seededAnswer = answer;
  }

  doWork(input: string) {
    let ans: string | undefined = "";

    if (this.seededAnswer != undefined) {
      ans = this.seededAnswer;
      this.seededAnswer = undefined;
      return ans;
    }
    if (this.won) {
      ans = "";
      return ans;
    }

    let tokens = input.split(" ");

    let stopWords = [
      "the",
      "a",
      "an",
      "to",
      "from",
      "with",
      "",
      "at",
      "button",
    ];

    let adjectives = ["old", "new", "small", "big"];

    if (this.player.isInMiniGame && this.player.minigame != null) {
      ans = this.player.minigame.getAnswer(input);
      if (ans == undefined || ans == "" || ans == null) {
        return "-----\n";
      } else {
        return ["-----", `~ ${input}`, ans].join("\n");
      }
    }

    tokens = tokens.filter((token) => !stopWords.includes(token));
    tokens = tokens.filter((token) => !adjectives.includes(token));

    tokens = this.player.tokenHistory.concat(tokens);

    if (tokens.length == 2) {
      ans = this.parseVerbNoun(tokens[0], tokens[1]);
    }
    if (tokens.length == 1) {
      ans = this.parseSingleWord(tokens[0]);
    }
    if (tokens.length > 2) {
      if (
        tokens.includes("and") ||
        tokens.includes("using") ||
        tokens.includes("on") ||
        tokens.includes("in")
      ) {
        ans = this.parseVerbNoun(tokens[0], tokens[1]);
      } else {
        this.player.tokenHistory = [];
        ans = `
Try rephrasing that using only one or two words
`;
      }
    }

    if (ans == undefined || ans == "" || ans == null) {
      return "-----\n";
    } else {
      return ["-----", `~ ${input}`, ans].join("\n");
    }
  }

  getAnswer(input: string) {
    input = input.toLowerCase();
    this.beforeTurnHooks.forEach((hook) => hook(input, this));
    let answer = this.doWork(input);
    this.afterTurnHooks.forEach((hook) => hook(answer, this));
    return answer;
  }

  getOpeningLine() {
    return this.startingLine;
  }

  win() {
    this.won = true;
  }
}
