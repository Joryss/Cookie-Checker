const colors = require('colors');
const types = require('./types.js');

module.exports = {
    verifyConfigProperty: function(configProperty) {
        const autoRegenObjects = 4;
        const bankGetPutObjects = 2;
        switch (configProperty.key.name){
            case "MAX_PODS":
                types.isInteger(configProperty);
                break;
            case "MIN_MONSTERS":
                types.isInteger(configProperty);
                break;
            case "MAX_MONSTERS":
                types.isInteger(configProperty);
                break;
            case "MIN_MONSTERS_LEVEL":
                types.isInteger(configProperty);
                break;
            case "MAX_MONSTERS_LEVEL":
                types.isInteger(configProperty);
                break;
            case "FORBIDDEN_MONSTERS":
                types.isArrayOfInteger(configProperty);
                break;
            case "MANDATORY_MONSTERS":
                types.isArrayOfInteger(configProperty);
                break;
            case "MAX_FIGHTS_PER_MAP":
                types.isInteger(configProperty);
                break;
            case "ELEMENTS_TO_GATHER":
                types.isArrayOfInteger(configProperty);
                break;
            case "BANK_PUT_ITEMS":
                types.isBankItems(configProperty, bankGetPutObjects);
                break;
            case "BANK_GET_ITEMS":
                types.isBankItems(configProperty, bankGetPutObjects);
                break;
            case "BANK_PUT_KAMAS":
                types.isInteger(configProperty);
                break;
            case "BANK_GET_KAMAS":
                types.isInteger(configProperty);
                break;
            case "AUTO_REGEN":
                if (types.isValidObject(configProperty)){
                    const validElements = [];
                    const currentElem = configProperty.value.properties;
                    for (var i = 0; i < currentElem.length; i++) {
                        if (currentElem[i].key.name == "minLife" && types.isInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else if (currentElem[i].key.name == "maxLife" && types.isInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else if (currentElem[i].key.name == "items" && types.isArrayOfInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else if (currentElem[i].key.name == "store" && types.isInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else {
                            console.log(`${currentElem[i].key.name} is not a valid AUTO_REGEN Element`.red);
                            validElements.push(currentElem[i]);
                        }
                    }
                    if (validElements.length === autoRegenObjects) {
                        console.log(`${configProperty.key.name} is indeed a valid AUTO_REGEN Object`.green);
                    } else {
                        console.log(`${configProperty.key.name} is not a valid AUTO_REGEN Object`.red);
                    }
                }
                break;
            case "AUTO_DELETE":
                types.isArrayOfInteger(configProperty);
                break;
            case "OPEN_BAGS":
                types.isBoolean(configProperty);
                break;
            case "DISPLAY_GATHER_COUNT":
                types.isBoolean(configProperty);
                break;
            case "DISPLAY_FIGHT_COUNT":
                types.isBoolean(configProperty);
                break;
            default:
                console.log(`${configProperty.key.name} is not a valid config identifier`.red);
        }
    },
    verifyMoveProperty: function(configProperty) {

        if (configProperty.value.type == "ArrayExpression") {
            const validObjects = [];
            for (let i = 0; i < configProperty.value.elements.length; i++) {
                types.isMoveObject(configProperty.value.elements[i]);
                /*if (configProperty.value.elements[i].type == "ObjectExpression") {
                    validObjects.push(configProperty.value.elements[i].raw)
                }*/
            }
            if (validObjects.length === configProperty.value.elements.length) {
                console.log(`${configProperty.key.name} is indeed a valid object array`.green);
                return true;
            } else {
                console.log(`${configProperty.key.name} is not a valid object array`.red);
                return false;
            }
        } else {
            console.log(`${configProperty.key.name} is not an array`.red);
            return false;
        }

        /*switch (configProperty.key.name){
            case "map":
                types.isInteger(configProperty);
                break;
            default:
                console.log(`${configProperty.key.name} is not a valid config identifier`.red);
        }*/
    }

}
