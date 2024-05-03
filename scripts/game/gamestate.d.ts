import { Entity } from "@minecraft/server";

declare const gameState = {
    /**
     * Contains all the arrows currently on the map.
     * The map is structured as follows:
     * - Key: The arrow's unique identifier
     * - Value: The entity Object
     */
    arrows: new Map<string, Entity>(),
    latestArrow: Entity
};

export default gameState;
