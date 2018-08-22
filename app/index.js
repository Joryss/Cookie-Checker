const esprima = require('esprima')
const properties = require('./properties.js');
const tools = require('./tools.js');
var fs = require('fs');

var contents = fs.readFileSync('./app/scripts/scriptnew.js', 'utf8');

const warnings = [];
const errors = [];

const safeScript = tools.deconstructFunctions(contents);
//const final = tools.reconstructFunctions(safeScript.functionMap, safeScript.output);
//fs.writeFileSync('./app/scripts/tester.js', final)
//return;
function analyzeCode(code) {



    var ast = esprima.parse(code);
    var functionsStats = {}; //1
    var addStatsEntry = function(funcName) { //2
        if (!functionsStats[funcName]) {
            functionsStats[funcName] = {calls: 0, declarations:0};
        }
    };

    const globals = [];

    traverse(ast, function(node) { //3
        if (node.type === 'VariableDeclaration') {
            globals.push(node.declarations[0].id.name);
            console.log(`${JSON.stringify(node.declarations[0].id)}`.cyan);
            if (node.declarations[0].id.name == "config") {
                verifyConfig(node.declarations[0].init.properties);
            }
            //addStatsEntry(node.id.name); //4
            //functionsStats[node.id.name].declarations++;
        } else if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
            addStatsEntry(node.callee.name);
            functionsStats[node.callee.name].calls++; //5
        }
    });

    verifyGlobals(globals);
}

// create warning function
// line -1 is equivalent to global warning
function createWarning(warningContent, warningLine = -1) {
    let contentClean = warningContent.replace("<strong>", "").replace("</strong>", "");
    const warning = {
        content: warningContent,
        contentClean: contentClean,
        position: warningLine
    }
    warnings.push(warning)
}
// create errors function
function createError(errorContent, errorLine = -1) {
    let contentClean = errorContent.replace("<strong>", "").replace("</strong>", "");
    const error = {
        content: errorContent,
        contentClean: contentClean,
        position: errorLine
    }
    errors.push(error)
}
// remember pass the LOCation for future functions
function verifyConfig(configProperties){
    for (var i = 0; i < configProperties.length; i++) {
        const property = {
            key: configProperties[i].key,
            value: configProperties[i].value
        }
        properties.verifyConfigProperty(property);
        if (configProperties[i].key.name !== configProperties[i].key.name.toUpperCase()) {
            console.log(`${configProperties[i].key.name} is not in capital letters`.red);
        }
    }
}

function verifyGlobals(globals){
    if (!globals.includes("config")) {
        createWarning("The <strong>config</strong> area is missing in the script");
    }
    if (!globals.includes("move")) {
        createError("The <strong>move</strong> area is missing in the script");
    }
    if (!globals.includes("bank")) {
        createWarning("The <strong>bank</strong> area is missing in the script");
    }
    if (!globals.includes("phoenix")) {
        createWarning("The <strong>phoenix</strong> area is missing in the script");
    }
}

function traverse(node, func) {
    func(node);//1
    for (var key in node) { //2
        if (node.hasOwnProperty(key)) { //3
            var child = node[key];
            if (typeof child === 'object' && child !== null) { //4

                if (Array.isArray(child)) {
                    child.forEach(function(node) { //5
                        traverse(node, func);
                    });
                } else {
                    traverse(child, func); //6
                }
            }
        }
    }
}


analyzeCode(safeScript.output);

//console.log(test.body[0].declarations[0].init)
//console.log(test.body[0].declarations[0].init);
