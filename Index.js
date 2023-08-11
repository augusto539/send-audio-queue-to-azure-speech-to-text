const fs = require('fs').promises;
const PA = require("./Azure PronunciationAssessment/pronunciationAssessmentContinue.js");
const settings = require("./Azure PronunciationAssessment/settings.js");
const spawner = require('child_process').spawn

const { getAudioDurationInSeconds } = require('get-audio-duration')


async function main() {

    const files = await fs.readdir("./Input");

    const texto_para_2do = await fs.readFile("./Reference texts/2do.txt", 'utf8');
    const texto_para_4to = await fs.readFile("./Reference texts/4to.txt", 'utf8');

    const vueltas = files.length + 1

    for (let index = 0; index < vueltas; index++) {

        if (index < files.length) {
            time = 150000 * index

            console.log(time)

            setTimeout(() => {
                console.log('')
                console.log('')
                console.log('------------------------------ Translated: \x1b[32m', `${files[index]}\x1b[0m`, '\x1b[0m------------------------------');
                console.log('')
                console.log('')

                settings.filename = `./Input/${files[index]}`

                // From a local path...
                getAudioDurationInSeconds(`./Input/${files[index]}`).then((duration) => {
                    if (files[index].split(".")[0] < 14) {
                        settings.reference_text = texto_para_2do
                    } else {
                        settings.reference_text = texto_para_4to
                    }

                    PA.PronunciationAssessment(settings, files[index], duration)
                })

            }, time);

        } else {

            const data_to_pass = "kk"

                console.log("data to send to python: " + data_to_pass);

                const python_process = spawner('python', ['Clean data/limpiardata.py', data_to_pass]);

                python_process.stdout.on('data', (data) => {
                    console.log('data received from python: ' + data.toString())
                })

            setTimeout(() => {
                console.log("_________________ llamo a python __________________")

                // const python_process = spawner('python', ['./Clean data/limpiardata.py']);
                
                

                // python_process.stdout.on('data', (data) => {
                //     console.log('data received from python: ' + data.toString())
                // })

            }, 200000 * index);

        }

    }



    // files.map(async (file, index) => {

    //     time = 150000 * index

    //     console.log(time)

    //     setTimeout(() => {
    //         console.log('')
    //         console.log('')
    //         console.log('------------------------------ Translated: \x1b[32m', `${file}\x1b[0m`, '\x1b[0m------------------------------');
    //         console.log('')
    //         console.log('')

    //         settings.filename = `./Input/${file}`

    //         // From a local path...
    //         getAudioDurationInSeconds(`./Input/${file}`).then((duration) => {
    //             if (file.split(".")[0] < 14) {
    //                 settings.reference_text = texto_para_2do
    //             } else {
    //                 settings.reference_text = texto_para_4to
    //             }

    //             PA.PronunciationAssessment(settings, file, duration)
    //         })

    //     }, time);

    // })
};

main()


