/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./components/Navbar.js":
/*!******************************!*\
  !*** ./components/Navbar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navbar)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Navbar() {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Navbar.useEffect\": ()=>{\n            const handleStorage = {\n                \"Navbar.useEffect.handleStorage\": ()=>{\n                    const stored = localStorage.getItem(\"user\");\n                    setUser(stored ? JSON.parse(stored) : null);\n                }\n            }[\"Navbar.useEffect.handleStorage\"];\n            window.addEventListener(\"storage\", handleStorage);\n            return ({\n                \"Navbar.useEffect\": ()=>window.removeEventListener(\"storage\", handleStorage)\n            })[\"Navbar.useEffect\"];\n        }\n    }[\"Navbar.useEffect\"], []);\n    const handleLogout = ()=>{\n        localStorage.removeItem(\"user\");\n        setUser(null); // 🔥 THIS FIXES UI\n        router.push(\"/login\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: styles.nav,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                style: {\n                    cursor: \"pointer\"\n                },\n                onClick: ()=>router.push(\"/\"),\n                children: \"AI Outreach\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: styles.links,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>router.push(\"/\"),\n                        children: \"Home\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>router.push(\"/pricing\"),\n                        children: \"Pricing\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>router.push(\"/how-to-use\"),\n                        children: \"How to use\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 34,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>router.push(\"/account\"),\n                        children: \"Account\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, this),\n                    user ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.logout,\n                        onClick: handleLogout,\n                        children: \"Logout\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 39,\n                        columnNumber: 11\n                    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.login,\n                        onClick: ()=>router.push(\"/login\"),\n                        children: \"Login\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 43,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\nconst styles = {\n    nav: {\n        display: \"flex\",\n        justifyContent: \"space-between\",\n        alignItems: \"center\",\n        padding: \"20px 40px\",\n        background: \"#fff\",\n        borderBottom: \"1px solid #eee\",\n        position: \"sticky\",\n        top: 0,\n        zIndex: 1000\n    },\n    logo: {\n        fontSize: \"20px\",\n        fontWeight: \"bold\",\n        cursor: \"pointer\"\n    },\n    links: {\n        display: \"flex\",\n        gap: \"12px\"\n    },\n    btn: {\n        padding: \"10px 16px\",\n        borderRadius: \"8px\",\n        border: \"1px solid #ddd\",\n        background: \"#fff\",\n        cursor: \"pointer\"\n    },\n    btnPrimary: {\n        padding: \"10px 16px\",\n        borderRadius: \"8px\",\n        border: \"none\",\n        background: \"linear-gradient(135deg, #4b4ded, #6c63ff)\",\n        color: \"#fff\",\n        fontWeight: \"600\",\n        cursor: \"pointer\"\n    },\n    btnDanger: {\n        padding: \"10px 16px\",\n        borderRadius: \"8px\",\n        border: \"none\",\n        background: \"#ff4d4f\",\n        color: \"#fff\",\n        cursor: \"pointer\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvTmF2YmFyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ0o7QUFFekIsU0FBU0c7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdKLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU1LLFNBQVNKLHNEQUFTQTtJQUUxQkYsZ0RBQVNBOzRCQUFDO1lBQ1IsTUFBTU87a0RBQWdCO29CQUNwQixNQUFNQyxTQUFTQyxhQUFhQyxPQUFPLENBQUM7b0JBQ3BDTCxRQUFRRyxTQUFTRyxLQUFLQyxLQUFLLENBQUNKLFVBQVU7Z0JBQ3hDOztZQUVBSyxPQUFPQyxnQkFBZ0IsQ0FBQyxXQUFXUDtZQUVuQztvQ0FBTyxJQUFNTSxPQUFPRSxtQkFBbUIsQ0FBQyxXQUFXUjs7UUFDckQ7MkJBQUcsRUFBRTtJQUVILE1BQU1TLGVBQWU7UUFDbkJQLGFBQWFRLFVBQVUsQ0FBQztRQUN4QlosUUFBUSxPQUFPLG1CQUFtQjtRQUNsQ0MsT0FBT1ksSUFBSSxDQUFDO0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ0M7UUFBSUMsT0FBT0MsT0FBT0MsR0FBRzs7MEJBQ3BCLDhEQUFDQztnQkFBR0gsT0FBTztvQkFBRUksUUFBUTtnQkFBVTtnQkFBR0MsU0FBUyxJQUFNbkIsT0FBT1ksSUFBSSxDQUFDOzBCQUFNOzs7Ozs7MEJBSW5FLDhEQUFDQztnQkFBSUMsT0FBT0MsT0FBT0ssS0FBSzs7a0NBQ3RCLDhEQUFDQzt3QkFBT0YsU0FBUyxJQUFNbkIsT0FBT1ksSUFBSSxDQUFDO2tDQUFNOzs7Ozs7a0NBQ3pDLDhEQUFDUzt3QkFBT0YsU0FBUyxJQUFNbkIsT0FBT1ksSUFBSSxDQUFDO2tDQUFhOzs7Ozs7a0NBQ2hELDhEQUFDUzt3QkFBT0YsU0FBUyxJQUFNbkIsT0FBT1ksSUFBSSxDQUFDO2tDQUFnQjs7Ozs7O2tDQUNuRCw4REFBQ1M7d0JBQU9GLFNBQVMsSUFBTW5CLE9BQU9ZLElBQUksQ0FBQztrQ0FBYTs7Ozs7O29CQUcvQ2QscUJBQ0MsOERBQUN1Qjt3QkFBT1AsT0FBT0MsT0FBT08sTUFBTTt3QkFBRUgsU0FBU1Q7a0NBQWM7Ozs7OzZDQUlyRCw4REFBQ1c7d0JBQ0NQLE9BQU9DLE9BQU9RLEtBQUs7d0JBQ25CSixTQUFTLElBQU1uQixPQUFPWSxJQUFJLENBQUM7a0NBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPWDtBQUVBLE1BQU1HLFNBQVM7SUFDYkMsS0FBSztRQUNIUSxTQUFTO1FBQ1RDLGdCQUFnQjtRQUNoQkMsWUFBWTtRQUNaQyxTQUFTO1FBQ1RDLFlBQVk7UUFDWkMsY0FBYztRQUNkQyxVQUFVO1FBQ1ZDLEtBQUs7UUFDTEMsUUFBUTtJQUNWO0lBRUFDLE1BQU07UUFDSkMsVUFBVTtRQUNWQyxZQUFZO1FBQ1pqQixRQUFRO0lBQ1Y7SUFFQUUsT0FBTztRQUNMSSxTQUFTO1FBQ1RZLEtBQUs7SUFDUDtJQUVBQyxLQUFLO1FBQ0hWLFNBQVM7UUFDVFcsY0FBYztRQUNkQyxRQUFRO1FBQ1JYLFlBQVk7UUFDWlYsUUFBUTtJQUNWO0lBRUFzQixZQUFZO1FBQ1ZiLFNBQVM7UUFDVFcsY0FBYztRQUNkQyxRQUFRO1FBQ1JYLFlBQVk7UUFDWmEsT0FBTztRQUNQTixZQUFZO1FBQ1pqQixRQUFRO0lBQ1Y7SUFFQXdCLFdBQVc7UUFDVGYsU0FBUztRQUNUVyxjQUFjO1FBQ2RDLFFBQVE7UUFDUlgsWUFBWTtRQUNaYSxPQUFPO1FBQ1B2QixRQUFRO0lBQ1Y7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhYXJvblxcYWktb3V0cmVhY2hcXGNvbXBvbmVudHNcXE5hdmJhci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF2YmFyKCkge1xyXG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG5cclxudXNlRWZmZWN0KCgpID0+IHtcclxuICBjb25zdCBoYW5kbGVTdG9yYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpO1xyXG4gICAgc2V0VXNlcihzdG9yZWQgPyBKU09OLnBhcnNlKHN0b3JlZCkgOiBudWxsKTtcclxuICB9O1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgaGFuZGxlU3RvcmFnZSk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN0b3JhZ2VcIiwgaGFuZGxlU3RvcmFnZSk7XHJcbn0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VyXCIpO1xyXG4gICAgc2V0VXNlcihudWxsKTsgLy8g8J+UpSBUSElTIEZJWEVTIFVJXHJcbiAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBzdHlsZT17c3R5bGVzLm5hdn0+XHJcbiAgICAgIDxoMiBzdHlsZT17eyBjdXJzb3I6IFwicG9pbnRlclwiIH19IG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiL1wiKX0+XHJcbiAgICAgICAgQUkgT3V0cmVhY2hcclxuICAgICAgPC9oMj5cclxuXHJcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5saW5rc30+XHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9cIil9PkhvbWU8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiL3ByaWNpbmdcIil9PlByaWNpbmc8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiL2hvdy10by11c2VcIil9PkhvdyB0byB1c2U8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiL2FjY291bnRcIil9PkFjY291bnQ8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgey8qIPCflKUgQ09ORElUSU9OQUwgQlVUVE9OICovfVxyXG4gICAgICAgIHt1c2VyID8gKFxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxvZ291dH0gb25DbGljaz17aGFuZGxlTG9nb3V0fT5cclxuICAgICAgICAgICAgTG9nb3V0XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmxvZ2lufVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9sb2dpblwiKX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgTG9naW5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gIG5hdjoge1xyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxyXG4gICAgcGFkZGluZzogXCIyMHB4IDQwcHhcIixcclxuICAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiLFxyXG4gICAgYm9yZGVyQm90dG9tOiBcIjFweCBzb2xpZCAjZWVlXCIsXHJcbiAgICBwb3NpdGlvbjogXCJzdGlja3lcIixcclxuICAgIHRvcDogMCxcclxuICAgIHpJbmRleDogMTAwMCxcclxuICB9LFxyXG5cclxuICBsb2dvOiB7XHJcbiAgICBmb250U2l6ZTogXCIyMHB4XCIsXHJcbiAgICBmb250V2VpZ2h0OiBcImJvbGRcIixcclxuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgfSxcclxuXHJcbiAgbGlua3M6IHtcclxuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgZ2FwOiBcIjEycHhcIixcclxuICB9LFxyXG5cclxuICBidG46IHtcclxuICAgIHBhZGRpbmc6IFwiMTBweCAxNnB4XCIsXHJcbiAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXHJcbiAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNkZGRcIixcclxuICAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiLFxyXG4gICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICB9LFxyXG5cclxuICBidG5QcmltYXJ5OiB7XHJcbiAgICBwYWRkaW5nOiBcIjEwcHggMTZweFwiLFxyXG4gICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxyXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcclxuICAgIGJhY2tncm91bmQ6IFwibGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzRiNGRlZCwgIzZjNjNmZilcIixcclxuICAgIGNvbG9yOiBcIiNmZmZcIixcclxuICAgIGZvbnRXZWlnaHQ6IFwiNjAwXCIsXHJcbiAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gIH0sXHJcblxyXG4gIGJ0bkRhbmdlcjoge1xyXG4gICAgcGFkZGluZzogXCIxMHB4IDE2cHhcIixcclxuICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcclxuICAgIGJvcmRlcjogXCJub25lXCIsXHJcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZjRkNGZcIixcclxuICAgIGNvbG9yOiBcIiNmZmZcIixcclxuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgfSxcclxufTtcclxuXHJcblxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJOYXZiYXIiLCJ1c2VyIiwic2V0VXNlciIsInJvdXRlciIsImhhbmRsZVN0b3JhZ2UiLCJzdG9yZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVMb2dvdXQiLCJyZW1vdmVJdGVtIiwicHVzaCIsImRpdiIsInN0eWxlIiwic3R5bGVzIiwibmF2IiwiaDIiLCJjdXJzb3IiLCJvbkNsaWNrIiwibGlua3MiLCJidXR0b24iLCJsb2dvdXQiLCJsb2dpbiIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJwYWRkaW5nIiwiYmFja2dyb3VuZCIsImJvcmRlckJvdHRvbSIsInBvc2l0aW9uIiwidG9wIiwiekluZGV4IiwibG9nbyIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImdhcCIsImJ0biIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsImJ0blByaW1hcnkiLCJjb2xvciIsImJ0bkRhbmdlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Navbar.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar */ \"(pages-dir-node)/./components/Navbar.js\");\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\pages\\\\_app.js\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\pages\\\\_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE4QjtBQUNZO0FBRTNCLFNBQVNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDbEQscUJBQ0U7OzBCQUNFLDhEQUFDSCwwREFBTUE7Ozs7OzBCQUNQLDhEQUFDRTtnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhYXJvblxcYWktb3V0cmVhY2hcXHBhZ2VzXFxfYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIkAvc3R5bGVzL2dsb2JhbHMuY3NzXCI7XHJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvTmF2YmFyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxOYXZiYXIgLz5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufSJdLCJuYW1lcyI6WyJOYXZiYXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();