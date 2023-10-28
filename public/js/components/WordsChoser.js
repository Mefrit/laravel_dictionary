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
    var WordsChoser = function (props) {
        var _a = (0, react_1.useState)(false), show_translate = _a[0], setShowTranslate = _a[1];
        var _b = (0, react_1.useState)(0), index_word = _b[0], setIndexWord = _b[1];
        var _c = (0, react_1.useState)("russian"), mode_translate_word = _c[0], setModeTranslateWord = _c[1];
        (0, react_1.useEffect)(function () {
        }, [index_word]);
        var renderInterface = function (index_word, list_words) {
            return react_1.default.createElement("div", { className: 'w-100 h-50 d-flex flex-column justify-content-around' },
                react_1.default.createElement("div", { className: "form-check form-switch col-1" },
                    react_1.default.createElement("label", { className: "form-check-label" },
                        react_1.default.createElement("input", { className: "form-check-input", onChange: function (ev) { setShowTranslate(false); setModeTranslateWord(ev.target.checked ? "english" : "russian"); }, type: "checkbox" }),
                        "Rus/Eng")),
                react_1.default.createElement("div", { className: 'd-flex flex-column p-1 justify-content-around  ' },
                    react_1.default.createElement("h4", { className: "font-weight-bold  border-primary border-bottom text-center" }, mode_translate_word == 'english' ? list_words[index_word].english_word : list_words[index_word].russian_word),
                    react_1.default.createElement("input", { type: show_translate ? "button" : "password", value: mode_translate_word == 'english' ? list_words[index_word].russian_word : list_words[index_word].english_word, className: show_translate ? 'mt-3 btn btn-primary' : " mt-3 btn btn-primary disabled" })),
                react_1.default.createElement("div", { className: 'd-flex  justify-content-around' },
                    react_1.default.createElement("button", { className: 'btn btn-small btn-primary', onClick: function () { setShowTranslate(false); setIndexWord(index_word > 0 ? index_word - 1 : props.list_words.length - 1); } }, "\u041D\u0430\u0437\u0430\u0434"),
                    react_1.default.createElement("button", { className: 'btn btn-small btn-primary', onClick: function () { setShowTranslate(!show_translate); } }, show_translate ? "Скрыть перевод" : "Показать перевод"),
                    react_1.default.createElement("button", { className: 'btn btn-small btn-primary', onClick: function () { setShowTranslate(false); setIndexWord(index_word < props.list_words.length - 1 ? index_word + 1 : 0); } }, "\u0412\u043F\u0435\u0440\u0435\u0434")));
        };
        return (react_1.default.createElement("div", { className: " col-5 d-flex " }, props.list_words.length == 0 ? react_1.default.createElement("h5", null, "\u0421\u043F\u0438\u0441\u043E\u043A \u0441\u043B\u043E\u0432 \u043F\u0443\u0441\u0442. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043B\u043E\u0432\u0430\u0440\u044C") : renderInterface(index_word, props.list_words)));
    };
    exports.default = WordsChoser;
});
