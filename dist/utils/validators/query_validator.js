"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryValidator = exports.isValidResurgentCard = exports.isValidRestrictedCountCoSub = exports.isValidRestrictedCountCoMain = exports.isValidRestrictedCount = exports.isValidFormatType = exports.isValidUseRedEther = exports.isValidGetRedEther = exports.isValidRarity = exports.isValidLife = exports.isValidAtk = exports.isValidCost = exports.isValidTribeNameCode = exports.isValidCharTypeCode = exports.isValidClanCode = exports.isValidCardSetCode = exports.isValidCardName = exports.isValidLanguageCode = void 0;
const isValidLanguageCode = (lang) => {
    return ["en", "ja", "zh-tw"].includes(lang || "");
};
exports.isValidLanguageCode = isValidLanguageCode;
const isValidCode = (code, predicate) => {
    if (Array.isArray(code)) {
        return code.every(c => isValidCode(c, predicate));
    }
    else if (typeof code === "string") {
        return predicate(code);
    }
    return false;
};
// Utility function to check if a string is a number in a given range
const isNumberInRange = (min, max) => (code) => {
    const num = Number(code);
    return !isNaN(num) && num >= min && num <= max;
};
// Utility function to check if the code is a number
const isNumericCode = (code) => {
    return isValidCode(code, (code) => !isNaN(Number(code)));
};
const isValidCardName = (cardName) => {
    return typeof cardName === "string" && cardName.length > 0;
};
exports.isValidCardName = isValidCardName;
exports.isValidCardSetCode = isNumericCode;
const isValidClanCode = (clan) => {
    return isValidCode(clan, isNumberInRange(0, 8));
};
exports.isValidClanCode = isValidClanCode;
const isValidCharTypeCode = (charType) => {
    return isValidCode(charType, isNumberInRange(1, 4));
};
exports.isValidCharTypeCode = isValidCharTypeCode;
const isValidTribeNameCode = (tribeName) => {
    return isValidCode(tribeName, isNumberInRange(0, 36));
};
exports.isValidTribeNameCode = isValidTribeNameCode;
exports.isValidCost = isNumericCode;
exports.isValidAtk = isNumericCode;
exports.isValidLife = isNumericCode;
const isValidRarity = (rarity) => {
    return isValidCode(rarity, isNumberInRange(1, 4));
};
exports.isValidRarity = isValidRarity;
exports.isValidGetRedEther = isNumericCode;
exports.isValidUseRedEther = isNumericCode;
const isValidFormatType = (formatType) => {
    return isValidCode(formatType, isNumberInRange(0, 1));
};
exports.isValidFormatType = isValidFormatType;
const isValidRestrictedCount = (restrictedCount) => {
    return isValidCode(restrictedCount, isNumberInRange(0, 3));
};
exports.isValidRestrictedCount = isValidRestrictedCount;
const isValidRestrictedCountCoMain = (restrictedCountCoMain) => {
    return isValidCode(restrictedCountCoMain, isNumberInRange(0, 3));
};
exports.isValidRestrictedCountCoMain = isValidRestrictedCountCoMain;
const isValidRestrictedCountCoSub = (restrictedCountCoSub) => {
    return isValidCode(restrictedCountCoSub, isNumberInRange(0, 3));
};
exports.isValidRestrictedCountCoSub = isValidRestrictedCountCoSub;
const isValidResurgentCard = (resurgentCard) => {
    return isValidCode(resurgentCard, isNumberInRange(0, 1));
};
exports.isValidResurgentCard = isValidResurgentCard;
// Check if a query is valid
const queryValidator = (query) => {
    // Validate language code
    if (query.lang && !(0, exports.isValidLanguageCode)(query.lang)) {
        throw new Error("Invalid language code");
    }
    // Undefined query parameters are valid
    if (Object.keys(query).length === 0) {
        return;
    }
    // Validate other query parameters
    if (query.card_name && !(0, exports.isValidCardName)(query.card_name)) {
        throw new Error("Invalid card name");
    }
    if (query.card_set_id && !(0, exports.isValidCardSetCode)(query.card_set_id)) {
        throw new Error("Invalid card_set_id");
    }
    if (query.clan && !(0, exports.isValidClanCode)(query.clan)) {
        throw new Error("Invalid clan code");
    }
    if (query.char_type && !(0, exports.isValidCharTypeCode)(query.char_type)) {
        throw new Error("Invalid char_type code");
    }
    if (query.tribe_name && !(0, exports.isValidTribeNameCode)(query.tribe_name)) {
        throw new Error("Invalid tribe_name code");
    }
    if (query.cost && !(0, exports.isValidCost)(query.cost)) {
        throw new Error("Invalid cost");
    }
    if (query.atk && !(0, exports.isValidAtk)(query.atk)) {
        throw new Error("Invalid atk");
    }
    if (query.life && !(0, exports.isValidLife)(query.life)) {
        throw new Error("Invalid life");
    }
    if (query.rarity && !(0, exports.isValidRarity)(query.rarity)) {
        throw new Error("Invalid rarity");
    }
    if (query.get_red_ether && !(0, exports.isValidGetRedEther)(query.get_red_ether)) {
        throw new Error("Invalid get_red_ether");
    }
    if (query.use_red_ether && !(0, exports.isValidUseRedEther)(query.use_red_ether)) {
        throw new Error("Invalid use_red_ether");
    }
    if (query.format_type && !(0, exports.isValidFormatType)(query.format_type)) {
        throw new Error("Invalid format_type");
    }
    if (query.restricted_count && !(0, exports.isValidRestrictedCount)(query.restricted_count)) {
        throw new Error("Invalid restricted_count");
    }
    if (query.restricted_count_co_main && !(0, exports.isValidRestrictedCountCoMain)(query.restricted_count_co_main)) {
        throw new Error("Invalid restricted_count_co_main");
    }
    if (query.restricted_count_co_sub && !(0, exports.isValidRestrictedCountCoSub)(query.restricted_count_co_sub)) {
        throw new Error("Invalid restricted_count_co_sub");
    }
    if (query.resurgent_card && !(0, exports.isValidResurgentCard)(query.resurgent_card)) {
        throw new Error("Invalid resurgent_card");
    }
};
exports.queryValidator = queryValidator;
//# sourceMappingURL=query_validator.js.map