const colors = require('colors');

module.exports = {
    verifyConfigProperty: function(configProperty) {
        const autoRegenObjects = 4;
        const bankGetPutObjects = 2;

        console.log(`${JSON.stringify(configProperty)}`.cyan);
        switch (configProperty.key.name){
            case "MAX_PODS":
                isInteger(configProperty);
                break;
            case "MIN_MONSTERS":
                isInteger(configProperty);
                break;
            case "MAX_MONSTERS":
                isInteger(configProperty);
                break;
            case "MIN_MONSTERS_LEVEL":
                isInteger(configProperty);
                break;
            case "MAX_MONSTERS_LEVEL":
                isInteger(configProperty);
                break;
            case "FORBIDDEN_MONSTERS":
                isArrayOfInteger(configProperty);
                break;
            case "MANDATORY_MONSTERS":
                isArrayOfInteger(configProperty);
                break;
            case "MAX_FIGHTS_PER_MAP":
                isInteger(configProperty);
                break;
            case "ELEMENTS_TO_GATHER":
                isArrayOfInteger(configProperty);
                break;
            case "BANK_PUT_ITEMS":
                //do something
                break;
            case "BANK_GET_ITEMS":
                if (isArrayOfObjects(configProperty)){
                    const validElements = [];
                    const currentElem = configProperty.value.properties;
                    for (var i = 0; i < currentElem.length; i++) {
                        if (currentElem[i].key.name == "item" && isInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else if (currentElem[i].key.name == "quantity" && isInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else {
                            console.log(`${currentElem[i].key.name} is not a valid BANK_GET_ITEMS Element`.red);
                            validElements.push(currentElem[i]);
                        }
                    }
                    if (validElements.length === bankGetPutObjects) {
                        console.log(`${configProperty.key.name} is indeed a valid BANK_GET_ITEMS Object`.green);
                    } else {
                        console.log(`${configProperty.key.name} is not a valid BANK_GET_ITEMS Object`.red);
                    }
                }
                break;
            case "BANK_PUT_KAMAS":
                isInteger(configProperty);
                break;
            case "BANK_GET_KAMAS":
                isInteger(configProperty);
                break;
            case "AUTO_REGEN":
                if (isValidObject(configProperty)){
                    const validElements = [];
                    const currentElem = configProperty.value.properties;
                    for (var i = 0; i < currentElem.length; i++) {
                        if (currentElem[i].key.name == "minLife" && isInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else if (currentElem[i].key.name == "maxLife" && isInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else if (currentElem[i].key.name == "items" && isArrayOfInteger(currentElem[i])) {
                                validElements.push(currentElem[i]);
                        } else if (currentElem[i].key.name == "store" && isInteger(currentElem[i])) {
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
                isArrayOfInteger(configProperty);
                break;
            case "OPEN_BAGS":
                isBoolean(configProperty);
                break;
            case "DISPLAY_GATHER_COUNT":
                isBoolean(configProperty);
                break;
            case "DISPLAY_FIGHT_COUNT":
                isBoolean(configProperty);
                break;
            default:
                console.log(`${configProperty.key.name} is not a valid config identifier`.red);

        }
    }
}

function isInteger(configProperty, fromArray = false) {
    if (fromArray){
        if (isNumeric(configProperty.raw)){
            console.log(`${configProperty.raw} is indeed an integer`.green);
            return true;
        } else {
            console.log(`${configProperty.raw} is not an integer`.red);
            return false;
        }
    } else {
        if (isNumeric(configProperty.value.raw)){
            console.log(`${configProperty.key.name} is indeed an integer`.green);
            return true;
        } else {
            console.log(`${configProperty.key.name} is not an integer`.red);
            return false;
        }
    }
}
function isArrayOfInteger(configProperty, fromObject = false) {
    if (configProperty.value.type == "ArrayExpression") {
        const validIntegers = [];
        for (let i = 0; i < configProperty.value.elements.length; i++) {
            if (isInteger(configProperty.value.elements[i], true)){
                validIntegers.push(configProperty.value.elements[i].raw)
            }
        }
        if (validIntegers.length === configProperty.value.elements.length) {
            console.log(`${configProperty.key.name} is indeed a valid integer array`.green);
            return true;
        } else {
            console.log(`${configProperty.key.name} is not a valid integer array`.red);
            return false;
        }
    } else {
        console.log(`${configProperty.key.name} is not an array`.red);
        return false;
    }
}

function isArrayOfObjects(configProperty, fromObject = false) {
    if (configProperty.value.type == "ArrayExpression") {
        const validIntegers = [];
        console.log(configProperty.value)
        for (let i = 0; i < configProperty.value.elements.length; i++) {
            /*if (isValidObject(configProperty.value.elements[i], true)){
                validIntegers.push(configProperty.value.elements[i].raw)
            }*/
        }
        if (validIntegers.length === configProperty.value.elements.length) {
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
}

function isValidObject(configProperty, fromArray = false) {
    const currentElem = (fromArray) ? configProperty.value : configProperty;
    //console.log(configProperty)
    if (currentElem.type == "ObjectExpression") {
        console.log(`${configProperty.key.name} is indeed an Object`.green);
        return true;
    } else {
        console.log(`${configProperty.key.name} is not an Object`.red);
        return false;
    }
}

function isBoolean(configProperty) {
    if (configProperty.value.raw == "true"){
        console.log(`${configProperty.key.name} is indeed a boolean`.green);
        return true;
    } else {
        console.log(`${configProperty.key.name} is not a boolean`.red);
        return false;
    }
}

function isNumeric(num){
  return !isNaN(num)
}
