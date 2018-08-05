const colors = require('colors');

module.exports = {
    verifyConfigProperty: function(configProperty) {
        console.log(`${JSON.stringify(configProperty)}`.cyan);
        switch (configProperty.key.name){
            case "MAX_PODS":
                if (isNumeric(configProperty.value.raw)){
                    console.log(`${configProperty.key.name} is indeed an integer`.green);
                } else {
                    console.log(`${configProperty.key.name} is not an integer`.red);
                }
                break;
            case "MIN_MONSTERS":
                if (isNumeric(configProperty.value.raw)){
                    console.log(`${configProperty.key.name} is indeed an integer`.green);
                } else {
                    console.log(`${configProperty.key.name} is not an integer`.red);
                }
                break;
            case "MAX_MONSTERS":
                if (isNumeric(configProperty.value.raw)){
                    console.log(`${configProperty.key.name} is indeed an integer`.green);
                } else {
                    console.log(`${configProperty.key.name} is not an integer`.red);
                }
            case "MIN_MONSTERS_LEVEL":
                if (isNumeric(configProperty.value.raw)){
                    console.log(`${configProperty.key.name} is indeed an integer`.green);
                } else {
                    console.log(`${configProperty.key.name} is not an integer`.red);
                }
            case "MAX_MONSTERS_LEVEL":
                if (isNumeric(configProperty.value.raw)){
                    console.log(`${configProperty.key.name} is indeed an integer`.green);
                } else {
                    console.log(`${configProperty.key.name} is not an integer`.red);
                }
            case "FORBIDDEN_MONSTERS":
                if (configProperty.value.type == "ArrayExpression") {
                    console.log(`${configProperty.key.name} is indeed an array`.green);
                    for (var i = 0; i < configProperty.value.elements.length; i++) {
                        if (isNumeric(configProperty.value.elements[i].raw)){
                            console.log(`${configProperty.value.elements[i].raw} is indeed an integer`.green);
                        } else {
                            console.log(`${configProperty.value.elements[i].raw} is not an integer`.red);
                        }
                    }

                }else{
                    console.log(`${configProperty.key.name} is not an array`.red);
                }
            case "MANDATORY_MONSTERS":
                //do something
                break;
            case "MAX_FIGHTS_PER_MAP":
                //do something
                break;
            case "ELEMENTS_TO_GATHER":
                //do something
                break;
            case "BANK_PUT_ITEMS":
                //do something
                break;
            case "BANK_GET_ITEMS":
                //do something
                break;
            case "BANK_PUT_KAMAS":
                //do something
                break;
            case "BANK_GET_KAMAS":
                //do something
                break;
            case "AUTO_REGEN":
                //do something
                break;
            case "AUTO_DELETE":
                //do something
                break;
            case "OPEN_BAGS":
                //do something
                if (configProperty.value.raw == "true"){
                    console.log(`${configProperty.key.name} is indeed a boolean`.green);
                } else {
                    console.log(`${configProperty.key.name} is not a boolean`.red);
                }
                break;
            case "DISPLAY_GATHER_COUNT":
                //do something
                break;
            case "DISPLAY_FIGHT_COUNT":
                //do something
                break;
            default:
                console.log(`${configProperty.key.name} is not a valid config identifier`.red);

        }
    }
}

function isNumeric(num){
  return !isNaN(num)
}
