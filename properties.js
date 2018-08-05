const colors = require('colors');

module.exports = {
    verifyConfigProperty: function(configProperty) {
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
                //do something
                break;
            case "BANK_PUT_KAMAS":
                isInteger(configProperty);
                break;
            case "BANK_GET_KAMAS":
                isInteger(configProperty);
                break;
            case "AUTO_REGEN":
                if (configProperty.value.type == "ObjectExpression") {
                    for (var i = 0; i < configProperty.value.properties.length; i++) {
                        console.log(configProperty.value.properties[i].key.name);
                    }
                }
                //console.log(JSON.stringify(configProperty));
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
function isArrayOfInteger(configProperty) {
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
