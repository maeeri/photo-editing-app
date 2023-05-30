var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var jwt = require('jsonwebtoken');
var logger = require('./logger');
var User = require('../models/user');
var tokenExtractor = function (request, response, next) {
    var authorization = request.get('authorization');
    request.token =
        authorization && authorization.toLowerCase().startsWith('bearer ')
            ? authorization.substring(7)
            : null;
    next();
};
var userExtractor = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
    var decodedToken, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                decodedToken = request.token !== null
                    ? jwt.verify(request.token, process.env.SECRET)
                    : null;
                if (decodedToken === null) {
                    return [2 /*return*/, response.status(401).json({ error: 'token missing or invalid' })];
                }
                _a = request;
                return [4 /*yield*/, User.findById(decodedToken.id)];
            case 1:
                _a.user = _b.sent();
                next();
                return [2 /*return*/];
        }
    });
}); };
var errorHandler = function (error, request, response, next) {
    logger.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' });
    }
    next(error);
};
module.exports = { tokenExtractor: tokenExtractor, errorHandler: errorHandler, userExtractor: userExtractor };
