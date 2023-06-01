const fs = require('fs').promises;
const PA = require("./Azure PronunciationAssessment/pronunciationAssessmentContinue.js");
const settings = require("./Azure PronunciationAssessment/settings.js");


async function main() {

    const files = await fs.readdir("./Input");

    const texto_para_2do = await fs.readFile("./Reference texts/2do.txt", 'utf8');
    const texto_para_4to = await fs.readFile("./Reference texts/4to.txt", 'utf8');


    files.map(async (file, index) => {

        let time = 0

        if (index === 0) {
            time = 0
        } else {
            time = 150000 * index
        }


        console.log(time)

        setTimeout(() => {
            console.log('')
            console.log('')
            console.log('------------------------------ Translated: \x1b[32m', `${file}\x1b[0m`, '\x1b[0m------------------------------');
            console.log('')
            console.log('')

            settings.filename = `./Input/${file}`

            if (file.split(".")[0] < 14) {
                settings.reference_text = texto_para_2do
            } else {
                settings.reference_text = texto_para_4to
            }
            PA.PronunciationAssessment(settings, file)
        }, time);

    })
};

main()


