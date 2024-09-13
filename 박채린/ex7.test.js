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
const ex7_1 = require("./ex7");
function test(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const posts = yield (0, ex7_1.getPosts)(userId);
        assert_1.default.strictEqual(posts === null || posts === void 0 ? void 0 : posts.length, 10);
        assert_1.default.strictEqual((_b = (_a = posts === null || posts === void 0 ? void 0 : posts.at(-1)) === null || _a === void 0 ? void 0 : _a.comments) === null || _b === void 0 ? void 0 : _b.length, 5);
        assert_1.default.deepStrictEqual(posts[0], {
            postId: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            comments: [
                {
                    postId: 1,
                    id: 1,
                    email: 'Eliseo@gardner.biz',
                    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\n' +
                        'tempora quo necessitatibus\n' +
                        'dolor quam autem quasi\n' +
                        'reiciendis et nam sapiente accusantium',
                },
                {
                    postId: 1,
                    id: 2,
                    email: 'Jayne_Kuhic@sydney.com',
                    body: 'est natus enim nihil est dolore omnis voluptatem numquam\n' +
                        'et omnis occaecati quod ullam at\n' +
                        'voluptatem error expedita pariatur\n' +
                        'nihil sint nostrum voluptatem reiciendis et',
                },
                {
                    postId: 1,
                    id: 3,
                    email: 'Nikita@garfield.biz',
                    body: 'quia molestiae reprehenderit quasi aspernatur\n' +
                        'aut expedita occaecati aliquam eveniet laudantium\n' +
                        'omnis quibusdam delectus saepe quia accusamus maiores nam est\n' +
                        'cum et ducimus et vero voluptates excepturi deleniti ratione',
                },
                {
                    postId: 1,
                    id: 4,
                    email: 'Lew@alysha.tv',
                    body: 'non et atque\n' +
                        'occaecati deserunt quas accusantium unde odit nobis qui voluptatem\n' +
                        'quia voluptas consequuntur itaque dolor\n' +
                        'et qui rerum deleniti ut occaecati',
                },
                {
                    postId: 1,
                    id: 5,
                    email: 'Hayden@althea.biz',
                    body: 'harum non quasi et ratione\n' +
                        'tempore iure ex voluptates in ratione\n' +
                        'harum architecto fugit inventore cupiditate\n' +
                        'voluptates magni quo et',
                },
            ],
        });
        // 추가 테스트 코드를 작성하시오.
    });
}
test(1);
