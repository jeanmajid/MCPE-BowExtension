import { world, system } from "@minecraft/server";
import gameState from "../game/gamestate";
import { Bows } from "../models/bows";

world.afterEvents.itemStartUse.subscribe(({ source, itemStack }) => {
    if (itemStack.typeId !== "minecraft:bow") return;
    source.useStart = Date.now();
    source.useSlot = source.selectedSlot;
});

world.afterEvents.itemStopUse.subscribe(({ source, itemStack }) => {
    if (itemStack.typeId !== "minecraft:bow" || source.useSlot !== source.selectedSlot) return;
    const useTime = Date.now() - source.useStart;
    Bows.shoot(source, itemStack.getDynamicProperty("id") || 0, useTime, gameState.latestArrow); 
});
