import { Bows } from "../../models/bows";

Bows.register({
    id: 0,
    name: "Default Bow",
    chargeUpMin: 138,
    cancelShot: false,
    delay: 200,
    onShoot: (data) => {
        if (!data.arrow.isValid()) return;
        const projectileComponent = data.arrow.getComponent("projectile");
        projectileComponent.shoot(data.arrow.getVelocity(), { uncertainty: 10 });
    },
    onHitEntity: (data) => {},
    onHitGround: (data) => {
        data.hitBlock.dimension.createExplosion(data.hitBlock.location, 3, { breaksBlocks: false, source: data.arrow });
    },
});
