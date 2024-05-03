export class Vector {
    static add(vector1, vector2) {
        return { x: vector1.x + vector2.x, y: vector1.y + vector2.y, z: vector1.z + vector2.z };
    }

    static subtract(vector1, vector2) {
        return { x: vector1.x - vector2.x, y: vector1.y - vector2.y, z: vector1.z - vector2.z };
    }

    static multiply(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar, z: vector.z * scalar };
    }

    static divide(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar, z: vector.z / scalar };
    }

    static dotProduct(vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    }

    static crossProduct(vector1, vector2) {
        const x = vector1.y * vector2.z - vector1.z * vector2.y;
        const y = vector1.z * vector2.x - vector1.x * vector2.z;
        const z = vector1.x * vector2.y - vector1.y * vector2.x;
        return { x: x, y: y, z: z };
    }

    static magnitude(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }

    static normalize(vector) {
        const magnitude = Vector.magnitude(vector);
        return { x: vector.x / magnitude, y: vector.y / magnitude, z: vector.z / magnitude };
    }

    static locationInfront(location, direction, distance) {
        return Vector.add(location, this.multiply(direction, distance));
    }
}
