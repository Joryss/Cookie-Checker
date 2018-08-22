module.exports = {
    deconstructFunctions: function(content) {
        // Split all lines
        let splitted = content.split(/\r\n|\n|\r/);
        // Mapping the changes
        const functions = [];
        // Deconstruct Script Functions
        for (let i = 0; i < splitted.length; i++) {
            if (splitted[i].includes("async") && splitted[i].includes("function*")){
                splitted[i] = splitted[i].replace("function*", "function");
                functions.push(i);
            }
        }
        const result = splitted.join("\n");
        return {functionMap: functions, output: result};
    },

    reconstructFunctions: function (functionMap, content) {
        let splitted = content.split(/\r\n|\n|\r/);
        for (let i = 0; i < functionMap.length; i++) {
            splitted[functionMap[i]] = splitted[functionMap[i]].replace("function", "function*");
        }
        const result = splitted.join("\n");
        return result;
    },

    indexFunctions: function (content){
        return true;
    }
}
