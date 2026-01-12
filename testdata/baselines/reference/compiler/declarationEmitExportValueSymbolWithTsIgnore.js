//// [tests/cases/compiler/declarationEmitExportValueSymbolWithTsIgnore.ts] ////

//// [symbols.ts]
// Defines a unique symbol that will be used in type hierarchies
export const MySymbol: unique symbol = Symbol.for("MySymbol");
export type MySymbol = typeof MySymbol;

//// [inspectable.ts]
import { MySymbol } from "./symbols.js";

// Interface that uses MySymbol as a computed property key
export interface Inspectable {
    [MySymbol]: () => string;
}

//// [base.ts]
import { MySymbol } from "./symbols.js";
import { Inspectable } from "./inspectable.js";

// Base class that implements Inspectable
export class Base implements Inspectable {
    [MySymbol](): string {
        return "inspectable";
    }
}

//// [service.ts]
// @ts-ignore Import needed for type visibility but appears unused
import { MySymbol } from "./symbols.js";
import { Base } from "./base.js";

// The @ts-ignore on the import should not affect symbol accessibility for declaration emit
export class Service extends Base {
    doSomething(): string {
        return "hello";
    }
}


//// [symbols.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySymbol = void 0;
// Defines a unique symbol that will be used in type hierarchies
exports.MySymbol = Symbol.for("MySymbol");
//// [inspectable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_js_1 = require("./symbols.js");
//// [base.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const symbols_js_1 = require("./symbols.js");
// Base class that implements Inspectable
class Base {
    [symbols_js_1.MySymbol]() {
        return "inspectable";
    }
}
exports.Base = Base;
//// [service.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const base_js_1 = require("./base.js");
// The @ts-ignore on the import should not affect symbol accessibility for declaration emit
class Service extends base_js_1.Base {
    doSomething() {
        return "hello";
    }
}
exports.Service = Service;


//// [symbols.d.ts]
export declare const MySymbol: unique symbol;
export type MySymbol = typeof MySymbol;
//// [inspectable.d.ts]
import { MySymbol } from "./symbols.js";
export interface Inspectable {
    [MySymbol]: () => string;
}
//// [base.d.ts]
import { MySymbol } from "./symbols.js";
import { Inspectable } from "./inspectable.js";
export declare class Base implements Inspectable {
    [MySymbol](): string;
}
//// [service.d.ts]
import { Base } from "./base.js";
export declare class Service extends Base {
    doSomething(): string;
}
