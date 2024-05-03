import { world } from "@minecraft/server";
import gameState from "../game/gamestate";

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
    if (entity.typeId !== "minecraft:arrow") return;
    gameState.latestArrow = entity;
    gameState.arrows.set(entity.id, entity);
});

world.afterEvents.entityRemove.subscribe(({ removedEntityId }) => {
    gameState.arrows.delete(removedEntityId);
});
