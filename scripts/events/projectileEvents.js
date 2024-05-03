import { world, system } from "@minecraft/server";
import { Bows } from "../models/bows";

world.afterEvents.projectileHitEntity.subscribe((data) => {
    const { projectile, source, hitVector, location } = data;
    if (projectile.typeId !== "minecraft:arrow") return;
    source.playSound("random.orb", { volume: 0.4, pitch: 0.5 });
    const bow = Bows.bows[projectile.bowId];
    if (bow) bow.onHitEntity({ source, arrow: projectile, hitEntity: data.getEntityHit().entity, hitVector, location });
});

world.afterEvents.projectileHitBlock.subscribe((data) => {
    const { projectile, hitVector, source, location } = data;
    const bow = Bows.bows[projectile.bowId];
    if (bow) bow.onHitGround({ source, arrow: projectile, hitBlock: data.getBlockHit().block, hitVector, location });
    system.runTimeout(() => {
        if (projectile.isValid()) projectile.remove();
    }, 60);
});
