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
    var ChoseDictionaryComponent = function (props) {
        var _a = (0, react_1.useState)(-1), chosen_id_dictionary = _a[0], setChosenId = _a[1];
        var renderlistDictionary = function (list_dictionary) {
            return list_dictionary.map(function (elem) {
                return react_1.default.createElement("li", { key: "dict_" + elem.id, className: chosen_id_dictionary == elem.id ? "list-group-item list-group-item-action cutsor-pointer active rounded-1" : "list-group-item list-group-item-action cutsor-pointer", onClick: function () { setChosenId(elem.id); props.choseDictionary(elem.id); } },
                    react_1.default.createElement("a", { href: "#", className: chosen_id_dictionary == elem.id ? "link-light rounded-1" : "link-dark", key: "dict_INp_" + elem.id },
                        elem.name,
                        " "));
            });
        };
        return (react_1.default.createElement("div", { className: " col-3 d-flex " },
            react_1.default.createElement("ul", { className: 'd-flex flex-column list-group h-75 overflow-auto' },
                react_1.default.createElement("a", { href: "#", className: "list-group-item list-group-item-action disabled" }, "\u0421\u043B\u043E\u0432\u0430\u0440\u0438"),
                renderlistDictionary(props.list_dictionary))));
    };
    exports.default = ChoseDictionaryComponent;
});
