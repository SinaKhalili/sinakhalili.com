import { Direction, LocationData, LocationNames } from "./types";

function getReverseDirection(direction: Direction) {
  switch (direction) {
    case Direction.north:
      return Direction.south;
    case Direction.south:
      return Direction.north;
    case Direction.east:
      return Direction.west;
    case Direction.west:
      return Direction.east;
  }
}

function getPossibleDirections(exits: { [key in Direction]?: LocationNames }) {
  return Object.keys(exits).map((key) => key as Direction);
}

export function validateMap(locations: LocationData[]) {
  let locationsByName: { [key: string]: LocationData } = {};
  for (const location of locations) {
    locationsByName[location.name] = location;
  }

  for (const location of locations) {
    for (const direction of getPossibleDirections(location.exits)) {
      let exit = location.exits[direction];
      if (!exit) {
        throw new Error(
          `Location ${location.name} has no exit in direction ${direction}`
        );
      }

      if (exit in locationsByName) {
        let exitLocation = locationsByName[exit];
        let reverseDirection = getReverseDirection(direction);
        if (reverseDirection in exitLocation.exits) {
          let reverseExit = exitLocation.exits[reverseDirection];
          if (reverseExit != location.name) {
            throw new Error(
              `Invalid map: ${location.name} has exit ${direction} to ${exit}, but ${exit} has exit ${reverseDirection} to ${reverseExit}`
            );
          }
        } else {
          throw new Error(
            `Invalid map: ${location.name} has exit ${direction} to ${exit}, but ${exit} has no exit ${reverseDirection}`
          );
        }
      } else {
        throw new Error(
          `Invalid map: ${location.name} has exit ${direction} to ${exit}, but ${exit} does not exist on this map`
        );
      }
    }
  }
}

export const NEWLINE_REPLACE = "</div><div>";

export const parseMessage = (message: string): string => {
  let parsed_message = message.replace(/\n\n/g, "\n&nbsp\n");
  parsed_message = parsed_message.replace(/\n/g, NEWLINE_REPLACE);
  const colors = ["blue", "red", "green", "yellow", "orange", "purple"];
  for (let i = 0; i < colors.length; i++) {
    parsed_message = parsed_message.replace(
      new RegExp(`\\[${colors[i]}\\]`, "g"),
      `<span style='color: ${colors[i]};'>`
    );
    parsed_message = parsed_message.replace(
      new RegExp(`\\[bg_${colors[i]}\\]`, "g"),
      `<span style='background-color: ${colors[i]};'>`
    );
  }
  parsed_message = parsed_message.replace(/\[\/\]/g, "</span>");
  return parsed_message;
};
