class Types {

    constructor() {}

    isBankItems(configProperty, bankGetPutObjects) {
        if (this.isArrayOfObjects(configProperty)){
            const validElements = [];
            const currentElem = configProperty.value.elements;
            for (let i = 0; i < currentElem.length; i++) {
                const validItemElems = []
                for (let j = 0; j < currentElem[i].properties.length; j++) {
                    if (currentElem[i].properties[j].key.name == "item" && this.isInteger(currentElem[i].properties[j])) {
                            validItemElems.push(currentElem[i].properties[j]);
                    } else if (currentElem[i].properties[j].key.name == "quantity" && this.isInteger(currentElem[i].properties[j])) {
                            validItemElems.push(currentElem[i].properties[j]);
                    } else {
                        console.log(`${currentElem[i].properties[j].key.name} is not a valid BANK_GET_ITEMS Element`.red);
                    }
                } // end sub element for
                if (currentElem[i].properties.length == validItemElems.length) {
                    validElements.push(currentElem[i].type);
                    console.log(`${JSON.stringify(currentElem[i].type)} is a valid BANK_GET_ITEMS Object`.green);
                } else {
                    console.log(`${JSON.stringify(currentElem[i].type)} is not a valid BANK_GET_ITEMS Object`.red);
                }
            }
            if (validElements.length === bankGetPutObjects) {
                console.log(`${configProperty.key.name} is indeed a valid BANK_GET_ITEMS Object`.green);
            } else {
                return false;
                console.log(`${configProperty.key.name} is not a valid BANK_GET_ITEMS Object`.red);
            }
        }
    }

    isInteger(configProperty, fromArray = false) {
        if (fromArray){
            if (this.isNumeric(configProperty.raw)){
                console.log(`${configProperty.raw} is indeed an integer`.green);
                return true;
            } else {
                console.log(`${configProperty.raw} is not an integer`.red);
                return false;
            }
        } else {
            if (this.isNumeric(configProperty.value.raw)){
                console.log(`${configProperty.key.name} is indeed an integer`.green);
                return true;
            } else {
                console.log(`${configProperty.key.name} is not an integer`.red);
                return false;
            }
        }
    }

    isArrayOfInteger(configProperty, fromObject = false){
        if (configProperty.value.type == "ArrayExpression") {
            const validIntegers = [];
            for (let i = 0; i < configProperty.value.elements.length; i++) {
                if (this.isInteger(configProperty.value.elements[i], true)){
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

    isArrayOfObjects(configProperty, fromObject = false) {
        if (configProperty.value.type == "ArrayExpression") {
            const validObjects = [];
            for (let i = 0; i < configProperty.value.elements.length; i++) {
                if (configProperty.value.elements[i].type == "ObjectExpression") {
                    validObjects.push(configProperty.value.elements[i].raw)
                }
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
    }

    isValidObject(configProperty){
        if (configProperty.value.type == "ObjectExpression") {
            console.log(`${configProperty.key.name} is indeed an Object`.green);
            return true;
        } else {
            console.log(`${configProperty.key.name} is not an Object`.red);
            return false;
        }
    }

    isBoolean(configProperty){
        if (configProperty.value.raw == "true" || configProperty.value.raw == "false"){
            console.log(`${configProperty.key.name} is indeed a boolean`.green);
            return true;
        } else {
            console.log(`${configProperty.key.name} is not a boolean`.red);
            return false;
        }
    }

    isNumeric(num){
      return !isNaN(num)
    }

    isMoveObject(configProperty){
        console.log(configProperty);
    }
}
module.exports = new Types();
