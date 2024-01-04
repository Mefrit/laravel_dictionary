var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "react-dom", "./components/App"], function (require, exports, react_1, react_dom_1, App_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importDefault(react_1);
    react_dom_1 = __importDefault(react_dom_1);
    App_1 = __importDefault(App_1);
    react_dom_1.default.render(react_1.default.createElement(App_1.default, { mode: 'user' }), document.getElementById("root"));
});
