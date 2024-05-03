// Bow imports make sure to order by id
import "./registry/bows/0-default";

// Regular imports
import "./events/itemEvents"
import "./events/projectileEvents"
import "./events/entityEvents"

// Testing code
import { system, world } from "@minecraft/server";
import { Bows } from "./models/bows";
import { BOW_TYPES } from "./constants/bowTypes";

world.getAllPlayers().forEach((p) => {
    p.getComponent("inventory").container.addItem(Bows.create(BOW_TYPES.DEFAULT));
});

// TODO: make each arrow have its own interval add multi particle support and stuff like that so move this stuff into the class
const overworld = world.getDimension("overworld");
system.runInterval(() => {
    const arrows = overworld.getEntities({ type: "minecraft:arrow" });
    for (let i = 0; i < arrows.length; i++) {
        try {
            overworld.spawnParticle("minecraft:lava_particle", arrows[i].location);
        } catch (_) {
            arrows[i].remove();
        }
    }
});
