var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var App = function (props) {
        var _a = (0, react_1.useState)(""), search_value = _a[0], setSearchValue = _a[1];
        var _b = (0, react_1.useState)(""), search_insert_value = _b[0], setInsertValue = _b[1];
        var _c = (0, react_1.useState)([]), list_words = _c[0], setListWords = _c[1];
        var _d = (0, react_1.useState)("russian"), mode_dictionary = _d[0], setModeTranslateWord = _d[1];
        var _e = (0, react_1.useState)("Случайный набор слов"), list_title = _e[0], setListTitle = _e[1];
        function postJSON(url, args) {
            try {
                return fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify(__assign({}, args)),
                }).then(function (response) {
                    if (response.status == 401) {
                        return { result: false, message: "Вы не вошли в систему, пожалуйста, авторизуйтесь" };
                    }
                    else {
                        return response.json();
                    }
                })
                    .then(function (data) {
                    return data;
                });
            }
            catch (err) {
                alert("Error! " + err.toString());
                return null;
            }
        }
        function getJSON(url) {
            try {
                return fetch(url, {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                }).then(function (response) {
                    if (response.status == 401) {
                        return { result: false, message: "Произошла непредвиденная ошибка" };
                    }
                    else {
                        return response.json();
                    }
                })
                    .then(function (data) {
                    return data;
                });
            }
            catch (err) {
                alert("Error! " + err.toString());
                return null;
            }
        }
        function GetRandomWords() {
            setTimeout(function () {
                getJSON('/GetRandomWords')
                    .then(function (answer) {
                    if (answer.result) {
                        setListWords(answer.list);
                    }
                });
            }, 700);
        }
        (0, react_1.useEffect)(function () {
            GetRandomWords();
        }, []);
        var addWordToDictionary = function () {
            postJSON('/addWordToDictionary', {
                rus_value: search_value,
                chinese_value: search_insert_value
            })
                .then(function (answer) {
                if (answer.result) {
                    alert('Слово добавлено');
                }
            });
        };
        var setFindTranslate = function () {
            postJSON('/FindTranslate', { search_value: search_value, mode: mode_dictionary })
                .then(function (answer) {
                if (answer.result) {
                    setListWords(answer.list);
                    setListTitle("Найденные слова:");
                }
            });
        };
        function renderWordList() {
            var list_words_elements = list_words.map(function (elem) {
                return react_1.default.createElement("li", { className: 'd-flex d-flex justify-content-between list-group-item ' },
                    react_1.default.createElement("span", null, elem.rus_value),
                    "  ",
                    react_1.default.createElement("span", null, elem.chinese_value));
            });
            return react_1.default.createElement("ul", { className: "list-group list-group-flush" }, list_words_elements);
        }
        return (react_1.default.createElement("div", { className: "container d-flex mt-5 p-3 w-100 justify-content-center flex-column " },
            react_1.default.createElement("div", { className: 'w-100 mt-1  container', style: { 'max-width': '600px' } },
                react_1.default.createElement("div", { class: "row w-100 d=flex" },
                    react_1.default.createElement("div", { className: "form-check form-switch col-2 pt-2 pl-6 mt-1 ", style: { 'min-width': '70px' } },
                        react_1.default.createElement("label", { className: "form-check-label" },
                            react_1.default.createElement("input", { className: "form-check-input col-form-label-lg p-1", onChange: function (ev) {
                                    setModeTranslateWord(ev.target.checked ? "chinese" : "russian");
                                }, type: "checkbox" }),
                            "Ru/Ch")),
                    react_1.default.createElement("input", { type: "text", className: "form-control m-2 col ", style: { 'max-width': '400px' }, placeholder: mode_dictionary == 'russian' ? 'Введите слово' : '输入单词', value: search_value, onChange: function (ev) { setSearchValue(ev.target.value); } }),
                    props.mode == 'admin' ?
                        react_1.default.createElement("button", { className: 'btn btn-small btn-primary  m-1 col', onClick: function () { addWordToDictionary(); } }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043B\u043E\u0432\u043E \u0432 \u0441\u043B\u043E\u0432\u0430\u0440\u044C")
                        : '',
                    props.mode == 'admin' ?
                        react_1.default.createElement("input", { type: "text", placeholder: props.mode == 'admin' && mode_dictionary == 'russian' ? '输入单词' : 'Введите слово', className: 'form-control m-1 col', value: search_insert_value, onChange: function (ev) { setInsertValue(ev.target.value); } })
                        : ''),
                react_1.default.createElement("div", { class: 'row d-flex justify-content-center mt-4' },
                    react_1.default.createElement("button", { className: 'btn  btn-primary m-1 w-50 col', style: { 'max-width': '300px' }, onClick: function () { setFindTranslate(); } }, "\u041F\u0435\u0440\u0435\u0432\u043E\u0434")),
                react_1.default.createElement("div", { className: 'mt-4 row w-100 d-flex justify-content-center', style: { 'max-width': '500px' } },
                    react_1.default.createElement("h4", null, list_title),
                    renderWordList()))));
    };
    exports.default = App;
});
