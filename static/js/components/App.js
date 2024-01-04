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
        var _d = (0, react_1.useState)(-1), edit_word_id = _d[0], setEditId = _d[1];
        var _e = (0, react_1.useState)("russian"), mode_dictionary = _e[0], setModeTranslateWord = _e[1];
        var _f = (0, react_1.useState)("translate"), mode_search = _f[0], setModeWordSearch = _f[1];
        var _g = (0, react_1.useState)("Случайный набор слов"), list_title = _g[0], setListTitle = _g[1];
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
            if (search_value.trim() == '' || search_insert_value.trim() == '') {
                alert('Введите значение перевода');
            }
            postJSON('/addWordToDictionary', {
                rus_value: mode_dictionary == 'russian' ? search_value : search_insert_value,
                chinese_value: mode_dictionary == 'russian' ? search_insert_value : search_value
            })
                .then(function (answer) {
                if (answer.result) {
                    alert('Слово добавлено');
                }
            });
        };
        var changeWord = function (edit_word_id) {
            postJSON('/editWord', {
                rus_value: mode_dictionary == 'russian' ? search_value : search_insert_value,
                chinese_value: mode_dictionary == 'russian' ? search_insert_value : search_value,
                word_id: edit_word_id
            })
                .then(function (answer) {
                if (answer.result) {
                    alert('Слово изменено');
                }
            });
        };
        var setFindTranslate = function () {
            if (search_value == '') {
                alert('Введите значение перевода');
            }
            postJSON('/FindTranslate', { search_value: search_value, mode: mode_dictionary })
                .then(function (answer) {
                if (answer.result) {
                    setListWords(answer.list);
                    setListTitle("Найденные слова:");
                }
            });
        };
        var setToEditWord = function (id) {
            var new_word_list = list_words.filter(function (elem) { return elem.id == id; });
            console.log(new_word_list, new_word_list[0].chinese_value);
            if (new_word_list.length > 0) {
                setSearchValue(mode_dictionary == 'russian' ? new_word_list[0].rus_value : new_word_list[0].chinese_value);
                setInsertValue(mode_dictionary == 'russian' ? new_word_list[0].chinese_value : new_word_list[0].rus_value);
                setModeWordSearch('edit');
                setEditId(id);
            }
        };
        var deleteWord = function (id) {
            postJSON('/Delete', { word_id: id })
                .then(function (answer) {
                var new_word_list = list_words.filter(function (elem) { return elem.id != answer.word.id; });
                setListWords(new_word_list);
            });
        };
        function renderWordList() {
            var list_words_elements = list_words.map(function (elem) {
                return react_1.default.createElement("li", { key: elem.id, className: 'd-flex d-flex justify-content-between list-group-item ' },
                    react_1.default.createElement("span", null, elem.rus_value),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null, elem.chinese_value),
                        react_1.default.createElement("button", { class: "btn btn-outline-secondary btn-sm m-2 mb-0 mt-0", value: elem.id, onClick: function (ev) { setToEditWord(ev.currentTarget.value); } },
                            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", maxWidth: "16", height: "16", fill: "currentColor", class: "bi bi-pencil-fill", viewBox: "0 0 16 16" },
                                react_1.default.createElement("path", { d: "M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" }))),
                        react_1.default.createElement("button", { class: "btn btn-outline-secondary btn-sm  mb-0 mt-0", value: elem.id, onClick: function (ev) { deleteWord(ev.currentTarget.value); } },
                            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", maxWidth: "16", height: "16", fill: "currentColor", class: "bi bi-x-circle", viewBox: "0 0 16 16" },
                                react_1.default.createElement("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" }),
                                react_1.default.createElement("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" })))));
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
                            "Rus/Ch")),
                    react_1.default.createElement("input", { type: "text", className: "form-control m-2 col ", style: { 'max-width': '400px' }, placeholder: mode_dictionary == 'russian' ? 'Введите слово' : '输入单词', value: search_value, onChange: function (ev) { setSearchValue(ev.target.value); } }),
                    props.mode == 'admin' ?
                        react_1.default.createElement("button", { className: 'btn btn-small btn-primary  m-1 col', onClick: function () { mode_search == 'translate' ? addWordToDictionary() : changeWord(edit_word_id); } }, mode_search == 'translate' ? ' Добавить слово в словарь' : 'Сохранить значения')
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
