"use strict";
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
exports.id = "pages/api/listings";
exports.ids = ["pages/api/listings"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "superstruct":
/*!******************************!*\
  !*** external "superstruct" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("superstruct");

/***/ }),

/***/ "console":
/*!**************************!*\
  !*** external "console" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("console");

/***/ }),

/***/ "(api)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZGIudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBRTlDLE1BQU1DLFNBQVMsSUFBSUQsd0RBQVlBO0FBRS9CLGlFQUFlQyxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm94eS8uL2xpYi9kYi50cz8xZGYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/db.ts\n");

/***/ }),

/***/ "(api)/./src/models/listings.ts":
/*!********************************!*\
  !*** ./src/models/listings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Listings)\n/* harmony export */ });\n/* harmony import */ var console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! console */ \"console\");\n/* harmony import */ var console__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(console__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var superstruct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! superstruct */ \"superstruct\");\n/* harmony import */ var superstruct__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superstruct__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass Listings {\n    constructor(listingsDB){\n        this.listingsDB = listingsDB;\n    }\n    async create(data) {\n        try {\n            // setting required attributes\n            this.setDefaultAttributes(data);\n            // input validation\n            this.validateInputData(data);\n            // add entry to database\n            await this.listingsDB.create({\n                data\n            });\n        } catch (e) {\n            throw e;\n        }\n    }\n    setDefaultAttributes(data) {\n        data[\"editable\"] = false;\n        data[\"created_on\"] = new Date();\n    }\n    validateInputData(data) {\n        (0,console__WEBPACK_IMPORTED_MODULE_0__.assert)(data, (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.object)({\n            name: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)(),\n            host_id: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.number)(),\n            dates_available: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.array)((0,superstruct__WEBPACK_IMPORTED_MODULE_1__.date)()),\n            price: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.refine)((0,superstruct__WEBPACK_IMPORTED_MODULE_1__.number)(), \"price\", (value)=>value % 1 !== 0),\n            description: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)(),\n            amenities: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.array)((0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)()),\n            space_type: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)(),\n            address: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)(),\n            city: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)(),\n            zip_code: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)(),\n            state: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.string)(),\n            editable: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.boolean)(),\n            created_on: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.date)(),\n            space_available: (0,superstruct__WEBPACK_IMPORTED_MODULE_1__.array)((0,superstruct__WEBPACK_IMPORTED_MODULE_1__.number)())\n        }));\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbW9kZWxzL2xpc3RpbmdzLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ2lDO0FBVVo7QUFFTixNQUFNUTtJQUNuQkMsWUFBNkJDLFdBQXNDOzBCQUF0Q0E7SUFBdUM7SUFFcEUsTUFBTUMsT0FBT0MsSUFBUyxFQUFFO1FBQ3RCLElBQUk7WUFDRiw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDQyxvQkFBb0IsQ0FBQ0Q7WUFFMUIsbUJBQW1CO1lBQ25CLElBQUksQ0FBQ0UsaUJBQWlCLENBQUNGO1lBRXZCLHdCQUF3QjtZQUN4QixNQUFNLElBQUksQ0FBQ0YsVUFBVSxDQUFDQyxNQUFNLENBQUM7Z0JBQUVDO1lBQUs7UUFDdEMsRUFBRSxPQUFPRyxHQUFHO1lBQ1YsTUFBTUEsRUFBRTtRQUNWO0lBQ0Y7SUFFUUYscUJBQXFCRCxJQUFTLEVBQUU7UUFDdENBLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSztRQUN4QkEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJSTtJQUMzQjtJQUVRRixrQkFBa0JGLElBQVMsRUFBRTtRQUNuQ1osK0NBQU1BLENBQ0pZLE1BQ0FYLG1EQUFNQSxDQUFDO1lBQ0xnQixNQUFNZixtREFBTUE7WUFDWmdCLFNBQVNmLG1EQUFNQTtZQUNmZ0IsaUJBQWlCZixrREFBS0EsQ0FBQ0MsaURBQUlBO1lBQzNCZSxPQUFPYixtREFBTUEsQ0FBQ0osbURBQU1BLElBQUksU0FBUyxDQUFDa0IsUUFBVUEsUUFBUSxNQUFNO1lBQzFEQyxhQUFhcEIsbURBQU1BO1lBQ25CcUIsV0FBV25CLGtEQUFLQSxDQUFDRixtREFBTUE7WUFDdkJzQixZQUFZdEIsbURBQU1BO1lBQ2xCdUIsU0FBU3ZCLG1EQUFNQTtZQUNmd0IsTUFBTXhCLG1EQUFNQTtZQUNaeUIsVUFBVXpCLG1EQUFNQTtZQUNoQjBCLE9BQU8xQixtREFBTUE7WUFDYjJCLFVBQVV2QixvREFBT0E7WUFDakJ3QixZQUFZekIsaURBQUlBO1lBQ2hCMEIsaUJBQWlCM0Isa0RBQUtBLENBQUNELG1EQUFNQTtRQUMvQjtJQUVKO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JveHkvLi9zcmMvbW9kZWxzL2xpc3RpbmdzLnRzPzU4YmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50LCBQcmlzbWEgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gXCJjb25zb2xlXCI7XG5pbXBvcnQge1xuICBvYmplY3QsXG4gIHN0cmluZyxcbiAgbnVtYmVyLFxuICBhcnJheSxcbiAgZGF0ZSxcbiAgYm9vbGVhbixcbiAgaW50ZWdlcixcbiAgcmVmaW5lLFxufSBmcm9tIFwic3VwZXJzdHJ1Y3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGluZ3Mge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxpc3RpbmdzREI6IFByaXNtYUNsaWVudFtcImxpc3RpbmdzXCJdKSB7fVxuXG4gIGFzeW5jIGNyZWF0ZShkYXRhOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgLy8gc2V0dGluZyByZXF1aXJlZCBhdHRyaWJ1dGVzXG4gICAgICB0aGlzLnNldERlZmF1bHRBdHRyaWJ1dGVzKGRhdGEpO1xuXG4gICAgICAvLyBpbnB1dCB2YWxpZGF0aW9uXG4gICAgICB0aGlzLnZhbGlkYXRlSW5wdXREYXRhKGRhdGEpO1xuXG4gICAgICAvLyBhZGQgZW50cnkgdG8gZGF0YWJhc2VcbiAgICAgIGF3YWl0IHRoaXMubGlzdGluZ3NEQi5jcmVhdGUoeyBkYXRhIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXREZWZhdWx0QXR0cmlidXRlcyhkYXRhOiBhbnkpIHtcbiAgICBkYXRhW1wiZWRpdGFibGVcIl0gPSBmYWxzZTtcbiAgICBkYXRhW1wiY3JlYXRlZF9vblwiXSA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlSW5wdXREYXRhKGRhdGE6IGFueSkge1xuICAgIGFzc2VydChcbiAgICAgIGRhdGEsXG4gICAgICBvYmplY3Qoe1xuICAgICAgICBuYW1lOiBzdHJpbmcoKSxcbiAgICAgICAgaG9zdF9pZDogbnVtYmVyKCksXG4gICAgICAgIGRhdGVzX2F2YWlsYWJsZTogYXJyYXkoZGF0ZSgpKSxcbiAgICAgICAgcHJpY2U6IHJlZmluZShudW1iZXIoKSwgXCJwcmljZVwiLCAodmFsdWUpID0+IHZhbHVlICUgMSAhPT0gMCksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcoKSxcbiAgICAgICAgYW1lbml0aWVzOiBhcnJheShzdHJpbmcoKSksIC8vTm90IHN1cmUgaWYgdGhpcyBpcyBjb3JyZWN0LCBjYW4gSSB2YWxpZGF0ZSBzb21ldGhpbmcgb2YgdHlwZSBhbWVudGl0eT9cbiAgICAgICAgc3BhY2VfdHlwZTogc3RyaW5nKCksXG4gICAgICAgIGFkZHJlc3M6IHN0cmluZygpLFxuICAgICAgICBjaXR5OiBzdHJpbmcoKSxcbiAgICAgICAgemlwX2NvZGU6IHN0cmluZygpLFxuICAgICAgICBzdGF0ZTogc3RyaW5nKCksXG4gICAgICAgIGVkaXRhYmxlOiBib29sZWFuKCksXG4gICAgICAgIGNyZWF0ZWRfb246IGRhdGUoKSxcbiAgICAgICAgc3BhY2VfYXZhaWxhYmxlOiBhcnJheShudW1iZXIoKSksXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJhc3NlcnQiLCJvYmplY3QiLCJzdHJpbmciLCJudW1iZXIiLCJhcnJheSIsImRhdGUiLCJib29sZWFuIiwicmVmaW5lIiwiTGlzdGluZ3MiLCJjb25zdHJ1Y3RvciIsImxpc3RpbmdzREIiLCJjcmVhdGUiLCJkYXRhIiwic2V0RGVmYXVsdEF0dHJpYnV0ZXMiLCJ2YWxpZGF0ZUlucHV0RGF0YSIsImUiLCJEYXRlIiwibmFtZSIsImhvc3RfaWQiLCJkYXRlc19hdmFpbGFibGUiLCJwcmljZSIsInZhbHVlIiwiZGVzY3JpcHRpb24iLCJhbWVuaXRpZXMiLCJzcGFjZV90eXBlIiwiYWRkcmVzcyIsImNpdHkiLCJ6aXBfY29kZSIsInN0YXRlIiwiZWRpdGFibGUiLCJjcmVhdGVkX29uIiwic3BhY2VfYXZhaWxhYmxlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/models/listings.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/listings/index.ts":
/*!*****************************************!*\
  !*** ./src/pages/api/listings/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib/db */ \"(api)/./lib/db.ts\");\n/* harmony import */ var _models_listings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/listings */ \"(api)/./src/models/listings.ts\");\n\n\nasync function handler(req, res) {\n    // GET - get listings and their basic details given filters\n    if (req.method === \"GET\") {\n        return res.status(200).json({\n            message: \"\"\n        });\n    }\n    // POST - create new listing\n    if (req.method === \"POST\") {\n        try {\n            //extract listing info from request body\n            const { body  } = req;\n            // Check if the user is logged in\n            // (To be added in the future)\n            // Create a new listing using Prisma\n            const newListing = new _models_listings__WEBPACK_IMPORTED_MODULE_1__[\"default\"](lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].listings);\n            await newListing.create(body);\n            return res.status(201).json({\n                message: \"Successful\"\n            });\n        } catch (error) {\n            return res.status(400).json({\n                message: String(error)\n            });\n        }\n    }\n    return res.status(405).send({\n        message: \"method not supported\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2xpc3RpbmdzL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUM0QjtBQUNhO0FBTTFCLGVBQWVFLFFBQzVCQyxHQUFtQixFQUNuQkMsR0FBNkIsRUFDN0I7SUFDQSwyREFBMkQ7SUFDM0QsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLE9BQU87UUFDeEIsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxTQUFTO1FBQUc7SUFDNUMsQ0FBQztJQUVELDRCQUE0QjtJQUM1QixJQUFJTCxJQUFJRSxNQUFNLEtBQUssUUFBUTtRQUN6QixJQUFJO1lBQ0Ysd0NBQXdDO1lBQ3hDLE1BQU0sRUFBRUksS0FBSSxFQUFFLEdBQUdOO1lBRWpCLGlDQUFpQztZQUNqQyw4QkFBOEI7WUFFOUIsb0NBQW9DO1lBQ3BDLE1BQU1PLGFBQWEsSUFBSVQsd0RBQVFBLENBQUNELHVEQUFlO1lBQy9DLE1BQU1VLFdBQVdFLE1BQU0sQ0FBQ0g7WUFDeEIsT0FBT0wsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFhO1FBQ3RELEVBQUUsT0FBT0ssT0FBTztZQUNkLE9BQU9ULElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVNNLE9BQU9EO1lBQU87UUFDdkQ7SUFDRixDQUFDO0lBRUQsT0FBT1QsSUFBSUUsTUFBTSxDQUFDLEtBQUtTLElBQUksQ0FBQztRQUFFUCxTQUFTO0lBQXVCO0FBQ2hFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3h5Ly4vc3JjL3BhZ2VzL2FwaS9saXN0aW5ncy9pbmRleC50cz9iMjE4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCJsaWIvZGJcIjtcbmltcG9ydCBMaXN0aW5ncyBmcm9tIFwiQC9tb2RlbHMvbGlzdGluZ3NcIjtcblxudHlwZSBNZXNzYWdlID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxNZXNzYWdlPlxuKSB7XG4gIC8vIEdFVCAtIGdldCBsaXN0aW5ncyBhbmQgdGhlaXIgYmFzaWMgZGV0YWlscyBnaXZlbiBmaWx0ZXJzXG4gIGlmIChyZXEubWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogXCJcIiB9KTtcbiAgfVxuXG4gIC8vIFBPU1QgLSBjcmVhdGUgbmV3IGxpc3RpbmdcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vZXh0cmFjdCBsaXN0aW5nIGluZm8gZnJvbSByZXF1ZXN0IGJvZHlcbiAgICAgIGNvbnN0IHsgYm9keSB9ID0gcmVxO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAgICAgIC8vIChUbyBiZSBhZGRlZCBpbiB0aGUgZnV0dXJlKVxuXG4gICAgICAvLyBDcmVhdGUgYSBuZXcgbGlzdGluZyB1c2luZyBQcmlzbWFcbiAgICAgIGNvbnN0IG5ld0xpc3RpbmcgPSBuZXcgTGlzdGluZ3MocHJpc21hLmxpc3RpbmdzKTtcbiAgICAgIGF3YWl0IG5ld0xpc3RpbmcuY3JlYXRlKGJvZHkpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgbWVzc2FnZTogXCJTdWNjZXNzZnVsXCIgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFN0cmluZyhlcnJvcikgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5zZW5kKHsgbWVzc2FnZTogXCJtZXRob2Qgbm90IHN1cHBvcnRlZFwiIH0pO1xufVxuIl0sIm5hbWVzIjpbInByaXNtYSIsIkxpc3RpbmdzIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiYm9keSIsIm5ld0xpc3RpbmciLCJsaXN0aW5ncyIsImNyZWF0ZSIsImVycm9yIiwiU3RyaW5nIiwic2VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/listings/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/listings/index.ts"));
module.exports = __webpack_exports__;

})();