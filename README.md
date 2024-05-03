# MCPE-BowExtension
MCPE-BowExtension is a Minecraft extension that enhances the bow and arrow gameplay. It introduces new types of bows, each with unique properties and effects. The extension is designed to work with the Minecraft Bedrock Edition.
## Features
- Custom Bows: The extension introduces new types of bows, each with unique properties. The bow types are defined in bowTypes.js.
- Bow Usage Events: The extension listens to bow usage events such as start and stop of bow usage. These events are handled in itemEvents.js.
- Projectile Events: The extension also listens to projectile events such as when an arrow hits an entity or a block. These events are handled in projectileEvents.js.
- Entity Events: The extension keeps track of the latest arrow entity and a map of all arrow entities in entityEvents.js.
- Bow Registry: The extension maintains a registry of bow types. The default bow type is registered in 0-default.js.
- Performance: The extension is designed to be efficient and optimized for performance. It uses a simple and lightweight methods to handle bow and arrow events with 0 runIntervals which does make it kinda look bad ingame but it works.
## Installation
1. Clone this repository.
2. Navigate to the Minecraft behavior packs directory.
3. Copy the MCPE-BowExtension folder into the behavior packs directory.
4. Open Minecraft and enable the MCPE-BowExtension behavior pack for your world.
## Usage
This can be used as an base for any other project and feel free to do so. I would gladly appreciate it if you would give me a small credit for the base.
Once the behavior pack is enabled, new bow types will be available in the game. You can use these bows like the default Minecraft bow. Each bow type has unique properties and effects. You can define new bow types and register them in the bow registry like this.
```javascript
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
```

## Contributing
Contributions are welcome. Please open an issue or submit a pull request if you would like to help improve MCPE-BowExtension. It's currently not really finished, it was just a test project to make my code structure better and now im not working on it anymore. But if you want to continue it, feel free to do so and also don't judge me I kinda rushed the code in some places.

## License
MCPE-BowExtension is open-source software released under the MIT license. Please see the LICENSE file for details.