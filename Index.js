const fs = require('fs').promises;
const PA = require("./Azure PronunciationAssessment/pronunciationAssessmentContinue.js");
const settings = require("./Azure PronunciationAssessment/settings.js");


async function main(){

    const files = await fs.readdir("./Input");


    files.map( (file, index) => {

        // console.log('------------------------------ Translating: \x1b[32m',`${file}\x1b[0m, File: \x1b[33m${index}\x1b[0m of: \x1b[33m${files.length}` ,'\x1b[0m------------------------------');

        settings.filename = `./Input/${file}`

        settings.reference_text = `whats the weather like`

        PA.PronunciationAssessment(settings, file)

    })
};

main()


