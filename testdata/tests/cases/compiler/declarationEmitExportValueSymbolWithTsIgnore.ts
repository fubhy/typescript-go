// @declaration: true
// @strict: true
// @lib: es2015

// @filename: symbols.ts
// Defines a unique symbol that will be used in type hierarchies
export const MySymbol: unique symbol = Symbol.for("MySymbol");
export type MySymbol = typeof MySymbol;

// @filename: inspectable.ts
import { MySymbol } from "./symbols.js";

// Interface that uses MySymbol as a computed property key
export interface Inspectable {
    [MySymbol]: () => string;
}

// @filename: base.ts
import { MySymbol } from "./symbols.js";
import { Inspectable } from "./inspectable.js";

// Base class that implements Inspectable
export class Base implements Inspectable {
    [MySymbol](): string {
        return "inspectable";
    }
}

// @filename: service.ts
// @ts-ignore Import needed for type visibility but appears unused
import { MySymbol } from "./symbols.js";
import { Base } from "./base.js";

// The @ts-ignore on the import should not affect symbol accessibility for declaration emit
export class Service extends Base {
    doSomething(): string {
        return "hello";
    }
}
