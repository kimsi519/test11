"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const ex6_1 = require("./ex6");
(function testNormal() {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.deepStrictEqual(yield (0, ex6_1.promiseAllSettled)([(0, ex6_1.randTime)(1), (0, ex6_1.randTime)(2), (0, ex6_1.randTime)(3)]), yield Promise.allSettled([(0, ex6_1.randTime)(1), (0, ex6_1.randTime)(2), (0, ex6_1.randTime)(3)]));
    });
})();
(function testWithReject() {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.deepStrictEqual(yield (0, ex6_1.promiseAllSettled)([
            (0, ex6_1.randTime)(11),
            Promise.reject('REJECT'),
            (0, ex6_1.randTime)(33),
        ]), yield Promise.allSettled([
            (0, ex6_1.randTime)(11),
            Promise.reject('REJECT'),
            (0, ex6_1.randTime)(33),
        ]));
    });
})();
