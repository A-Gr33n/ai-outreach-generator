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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navbar)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Navbar() {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Navbar.useEffect\": ()=>{\n            const stored = localStorage.getItem(\"user\");\n            if (stored) setUser(JSON.parse(stored));\n        }\n    }[\"Navbar.useEffect\"], []);\n    const handleLogout = ()=>{\n        localStorage.removeItem(\"user\");\n        router.push(\"/login\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: styles.nav,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                style: styles.logo,\n                onClick: ()=>router.push(\"/\"),\n                children: \"AI Outreach\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                style: styles.links,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.btn,\n                        onClick: ()=>router.push(\"/\"),\n                        children: \"Home\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 25,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.btn,\n                        onClick: ()=>router.push(\"/pricing\"),\n                        children: \"Pricing\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 29,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.btn,\n                        onClick: ()=>router.push(\"/how-to-use\"),\n                        children: \"How to use\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 33,\n                        columnNumber: 12\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.btn,\n                        onClick: ()=>router.push(\"/account\"),\n                        children: \"Account\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 37,\n                        columnNumber: 9\n                    }, this),\n                    !user ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.btnPrimary,\n                        onClick: ()=>router.push(\"/login\"),\n                        children: \"Login\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 42,\n                        columnNumber: 11\n                    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        style: styles.btnDanger,\n                        onClick: handleLogout,\n                        children: \"Logout\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                        lineNumber: 46,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\aaron\\\\ai-outreach\\\\components\\\\Navbar.js\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, this);\n}\nconst styles = {\n    nav: {\n        display: \"flex\",\n        justifyContent: \"space-between\",\n        alignItems: \"center\",\n        padding: \"20px 40px\",\n        background: \"#fff\",\n        borderBottom: \"1px solid #eee\",\n        position: \"sticky\",\n        top: 0,\n        zIndex: 1000\n    },\n    logo: {\n        fontSize: \"20px\",\n        fontWeight: \"bold\",\n        cursor: \"pointer\"\n    },\n    links: {\n        display: \"flex\",\n        gap: \"12px\"\n    },\n    btn: {\n        padding: \"10px 16px\",\n        borderRadius: \"8px\",\n        border: \"1px solid #ddd\",\n        background: \"#fff\",\n        cursor: \"pointer\"\n    },\n    btnPrimary: {\n        padding: \"10px 16px\",\n        borderRadius: \"8px\",\n        border: \"none\",\n        background: \"linear-gradient(135deg, #4b4ded, #6c63ff)\",\n        color: \"#fff\",\n        fontWeight: \"600\",\n        cursor: \"pointer\"\n    },\n    btnDanger: {\n        padding: \"10px 16px\",\n        borderRadius: \"8px\",\n        border: \"none\",\n        background: \"#ff4d4f\",\n        color: \"#fff\",\n        cursor: \"pointer\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvTmF2YmFyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ0o7QUFFekIsU0FBU0c7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdKLCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU1LLFNBQVNKLHNEQUFTQTtJQUV4QkYsZ0RBQVNBOzRCQUFDO1lBQ1IsTUFBTU8sU0FBU0MsYUFBYUMsT0FBTyxDQUFDO1lBQ3BDLElBQUlGLFFBQVFGLFFBQVFLLEtBQUtDLEtBQUssQ0FBQ0o7UUFDakM7MkJBQUcsRUFBRTtJQUVMLE1BQU1LLGVBQWU7UUFDbkJKLGFBQWFLLFVBQVUsQ0FBQztRQUN4QlAsT0FBT1EsSUFBSSxDQUFDO0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ0M7UUFBSUMsT0FBT0MsT0FBT0MsR0FBRzs7MEJBQ3BCLDhEQUFDQztnQkFBR0gsT0FBT0MsT0FBT0csSUFBSTtnQkFBRUMsU0FBUyxJQUFNZixPQUFPUSxJQUFJLENBQUM7MEJBQU07Ozs7OzswQkFJekQsOERBQUNDO2dCQUFJQyxPQUFPQyxPQUFPSyxLQUFLOztrQ0FDdEIsOERBQUNDO3dCQUFPUCxPQUFPQyxPQUFPTyxHQUFHO3dCQUFFSCxTQUFTLElBQU1mLE9BQU9RLElBQUksQ0FBQztrQ0FBTTs7Ozs7O2tDQUk1RCw4REFBQ1M7d0JBQU9QLE9BQU9DLE9BQU9PLEdBQUc7d0JBQUVILFNBQVMsSUFBTWYsT0FBT1EsSUFBSSxDQUFDO2tDQUFhOzs7Ozs7a0NBSWhFLDhEQUFDUzt3QkFBT1AsT0FBT0MsT0FBT08sR0FBRzt3QkFBRUgsU0FBUyxJQUFNZixPQUFPUSxJQUFJLENBQUM7a0NBQWdCOzs7Ozs7a0NBSXpFLDhEQUFDUzt3QkFBT1AsT0FBT0MsT0FBT08sR0FBRzt3QkFBRUgsU0FBUyxJQUFNZixPQUFPUSxJQUFJLENBQUM7a0NBQWE7Ozs7OztvQkFJbEUsQ0FBQ1YscUJBQ0EsOERBQUNtQjt3QkFBT1AsT0FBT0MsT0FBT1EsVUFBVTt3QkFBRUosU0FBUyxJQUFNZixPQUFPUSxJQUFJLENBQUM7a0NBQVc7Ozs7OzZDQUl4RSw4REFBQ1M7d0JBQU9QLE9BQU9DLE9BQU9TLFNBQVM7d0JBQUVMLFNBQVNUO2tDQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPbEU7QUFFQSxNQUFNSyxTQUFTO0lBQ2JDLEtBQUs7UUFDSFMsU0FBUztRQUNUQyxnQkFBZ0I7UUFDaEJDLFlBQVk7UUFDWkMsU0FBUztRQUNUQyxZQUFZO1FBQ1pDLGNBQWM7UUFDZEMsVUFBVTtRQUNWQyxLQUFLO1FBQ0xDLFFBQVE7SUFDVjtJQUVBZixNQUFNO1FBQ0pnQixVQUFVO1FBQ1ZDLFlBQVk7UUFDWkMsUUFBUTtJQUNWO0lBRUFoQixPQUFPO1FBQ0xLLFNBQVM7UUFDVFksS0FBSztJQUNQO0lBRUFmLEtBQUs7UUFDSE0sU0FBUztRQUNUVSxjQUFjO1FBQ2RDLFFBQVE7UUFDUlYsWUFBWTtRQUNaTyxRQUFRO0lBQ1Y7SUFFQWIsWUFBWTtRQUNWSyxTQUFTO1FBQ1RVLGNBQWM7UUFDZEMsUUFBUTtRQUNSVixZQUFZO1FBQ1pXLE9BQU87UUFDUEwsWUFBWTtRQUNaQyxRQUFRO0lBQ1Y7SUFFQVosV0FBVztRQUNUSSxTQUFTO1FBQ1RVLGNBQWM7UUFDZEMsUUFBUTtRQUNSVixZQUFZO1FBQ1pXLE9BQU87UUFDUEosUUFBUTtJQUNWO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYWFyb25cXGFpLW91dHJlYWNoXFxjb21wb25lbnRzXFxOYXZiYXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdmJhcigpIHtcclxuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHN0b3JlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlclwiKTtcclxuICAgIGlmIChzdG9yZWQpIHNldFVzZXIoSlNPTi5wYXJzZShzdG9yZWQpKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlclwiKTtcclxuICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubmF2fT5cclxuICAgICAgPGgyIHN0eWxlPXtzdHlsZXMubG9nb30gb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goXCIvXCIpfT5cclxuICAgICAgICBBSSBPdXRyZWFjaFxyXG4gICAgICA8L2gyPlxyXG5cclxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmxpbmtzfT5cclxuICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnRufSBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9cIil9PlxyXG4gICAgICAgICAgSG9tZVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnRufSBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9wcmljaW5nXCIpfT5cclxuICAgICAgICAgIFByaWNpbmdcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ0bn0gb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goXCIvaG93LXRvLXVzZVwiKX0+XHJcbiAgICAgICAgIEhvdyB0byB1c2VcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ0bn0gb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goXCIvYWNjb3VudFwiKX0+XHJcbiAgICAgICAgICBBY2NvdW50XHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgIHshdXNlciA/IChcclxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idG5QcmltYXJ5fSBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9sb2dpblwiKX0+XHJcbiAgICAgICAgICAgIExvZ2luXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ0bkRhbmdlcn0gb25DbGljaz17aGFuZGxlTG9nb3V0fT5cclxuICAgICAgICAgICAgTG9nb3V0XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmNvbnN0IHN0eWxlcyA9IHtcclxuICBuYXY6IHtcclxuICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxyXG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcclxuICAgIHBhZGRpbmc6IFwiMjBweCA0MHB4XCIsXHJcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcclxuICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgI2VlZVwiLFxyXG4gICAgcG9zaXRpb246IFwic3RpY2t5XCIsXHJcbiAgICB0b3A6IDAsXHJcbiAgICB6SW5kZXg6IDEwMDAsXHJcbiAgfSxcclxuXHJcbiAgbG9nbzoge1xyXG4gICAgZm9udFNpemU6IFwiMjBweFwiLFxyXG4gICAgZm9udFdlaWdodDogXCJib2xkXCIsXHJcbiAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gIH0sXHJcblxyXG4gIGxpbmtzOiB7XHJcbiAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgIGdhcDogXCIxMnB4XCIsXHJcbiAgfSxcclxuXHJcbiAgYnRuOiB7XHJcbiAgICBwYWRkaW5nOiBcIjEwcHggMTZweFwiLFxyXG4gICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxyXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZGRkXCIsXHJcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcclxuICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgfSxcclxuXHJcbiAgYnRuUHJpbWFyeToge1xyXG4gICAgcGFkZGluZzogXCIxMHB4IDE2cHhcIixcclxuICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcclxuICAgIGJvcmRlcjogXCJub25lXCIsXHJcbiAgICBiYWNrZ3JvdW5kOiBcImxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM0YjRkZWQsICM2YzYzZmYpXCIsXHJcbiAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICBmb250V2VpZ2h0OiBcIjYwMFwiLFxyXG4gICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICB9LFxyXG5cclxuICBidG5EYW5nZXI6IHtcclxuICAgIHBhZGRpbmc6IFwiMTBweCAxNnB4XCIsXHJcbiAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXHJcbiAgICBib3JkZXI6IFwibm9uZVwiLFxyXG4gICAgYmFja2dyb3VuZDogXCIjZmY0ZDRmXCIsXHJcbiAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gIH0sXHJcbn07XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiTmF2YmFyIiwidXNlciIsInNldFVzZXIiLCJyb3V0ZXIiLCJzdG9yZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwiaGFuZGxlTG9nb3V0IiwicmVtb3ZlSXRlbSIsInB1c2giLCJkaXYiLCJzdHlsZSIsInN0eWxlcyIsIm5hdiIsImgyIiwibG9nbyIsIm9uQ2xpY2siLCJsaW5rcyIsImJ1dHRvbiIsImJ0biIsImJ0blByaW1hcnkiLCJidG5EYW5nZXIiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwicGFkZGluZyIsImJhY2tncm91bmQiLCJib3JkZXJCb3R0b20iLCJwb3NpdGlvbiIsInRvcCIsInpJbmRleCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImN1cnNvciIsImdhcCIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsImNvbG9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Navbar.js\n");

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