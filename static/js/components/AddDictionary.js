var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "react"], function (require, exports, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importStar(react_1);
    var AddDictionaryComponent = function () {
        (0, react_1.useEffect)(function () {
            console.log("mount");
        }, []);
        return react_1.default.createElement("form", { encType: "multipart/form-data", method: 'post', className: " col-5 d-flex flex-column form-group justify-content-evenly h-50 w-100   align-items-center", action: "/dictionary/add" },
            react_1.default.createElement("label", { className: "d-flex flex-column justify-content-center" },
                react_1.default.createElement("p", { className: "text-center" }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C EXEL \u0444\u0430\u0439\u043B"),
                react_1.default.createElement("input", { type: "file", title: " ", name: "file_dictionary", className: " btn btn-default form-control rounded-1" })),
            react_1.default.createElement("input", { type: "text", className: "form-control w-25", name: "name_dictionary", placeholder: 'name dictionary' }),
            react_1.default.createElement("input", { type: "submit", className: "btn btn-primary", value: "Загрузить словарь" }));
    };
    exports.default = AddDictionaryComponent;
});
