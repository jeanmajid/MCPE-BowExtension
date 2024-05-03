import { ItemStack } from "@minecraft/server";
import { BOW_TYPES } from "../constants/bowTypes";

class BowError extends Error {
    constructor(message) {
        super(message);
        this.name = "BowError";
    }
}

export class Bows {
    /**
     * @type {Array.<{
     *   id: number,
     *   name: string,
     *   chargeUpMin?: number,
     *   cancelShot?: boolean,
     *   onShoot?: function,
     *   onHitEntity?: function,
     *   onHitGround?: function
     * }>}
     */
    static bows = [];

    /**
     * Registers a new bow.
     * @param {Object} info - The bow to register.
     * @param {Number} info.id - The ID of the bow.
     * @param {String} info.name - The name of the bow.
     * @param {number} [info.chargeUpMin] - The min amount of time in ms you have to charge your bow to shoot. Default is 138.
     * @param {Boolean} [info.cancelShot] - (Custom projectiles) Whether the arrow should be killed when shooting. Default is false.
     * @param {function({ source: import("@minecraft/server").Player, useTime: number, arrow: import("@minecraft/server").Entity}): void} [info.onShoot] - Function to call when player shoots the bow.
     * @param {function({ source: import("@minecraft/server").Player, arrow: import("@minecraft/server").Entity, hitEntity: import("@minecraft/server").Entity, hitVector: {x: number, y: number, z:number}, location: {x: number, y: number, z:number} }): void} [info.onHitEntity] - Function to call when an entity gets hit with the bow
     * @param {function({ source: import("@minecraft/server").Player, arrow: import("@minecraft/server").Entity, hitBlock: import("@minecraft/server").Block, hitVector: {x: number, y: number, z:number}, location: {x: number, y: number, z:number} }): void} [info.onHitGround] - Function to call when the ground gets hit with the bow
     */
    static register(info) {
        if (info.name === undefined || info.id === undefined) throw new BowError("Name and ID are required to register a bow.");
        if (info.id !== this.bows.length) throw new BowError(`Bow registered in wrong order, ${info.name}(${info.id}) should be the id ${this.bows.length}`);

        this.bows.push({
            id: info.id,
            name: info.name,
            chargeUpMin: info.chargeUpMin || 138,
            cancelShot: info.cancelShot || false,
            onShoot: info.onShoot,
            onHitEntity: info.onHitEntity,
            onHitGround: info.onHitGround,
        });
    }

    /**
     * Creates a new bow item with the specified ID.
     * @param {Number} id - The ID of the bow determining the type of bow.
     * @returns {ItemStack} The created bow item.
     */
    static create(id) {
        const bow = new ItemStack("minecraft:bow", 1);
        bow.setDynamicProperty("id", id);
        bow.nameTag = this.bows[id].name || "§cName not found";
        return bow;
    }

    /**
     * @param {import("@minecraft/server").Player} source - the player
     * @param {number} bowId - id of the bow
     * @param {number} useTime - The amount of time in ms the bow got charged
     * @param {import("@minecraft/server").Entity} arrow - The shot arrow
     * @returns
     */
    static shoot(source, bowId, useTime, arrow) {
        arrow.bowId = bowId;
        const bow = this.bows[bowId];
        if (!bow) return /*source.sendMessage(`§cBow with that id ${bowId} not found`)*/;
        if (useTime <= bow.chargeUpMin) {
            if (useTime > 138) arrow.remove();
            source.playSound("note.bass");
            source.sendMessage(`§cCharge up your bow at least ${bow.chargeUpMin}ms`);
            return;
        } else if (bow.cancelShot) {
            if (useTime > 138) arrow.remove();
        }
        bow.onShoot({ source, useTime, arrow });
    }
}
