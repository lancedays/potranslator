// API Doc
// https://github.com/rubenv/pofile
var PO = require('pofile');
// API Doc
// https://www.npmjs.com/package/@vitalets/google-translate-api
const translateApi = require('@vitalets/google-translate-api');
// API Doc
// https://www.npmjs.com/package/cli-progress
const _cliProgress = require('cli-progress');

// Check for input params
// - [2] Language to translate from
// - [3] Language to translate to
// - [4] PO file input name, must be placed in input directory
// - [5] PO file output name, will be placed in the output directory

var langFrom
var langTo
var inputName
var outputName

if(process.argv.length >= 6) {
    langFrom = process.argv[2];
    langTo = process.argv[3];
    inputName = process.argv[4];
    outputName = process.argv[5];
    startTranslation();
} else {
    console.log('Please provide required parameters');
}

function startTranslation() {
    PO.load(`input/${inputName}.po`, async function (err, po) {
        console.log('Reading and Translating...')
        const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
        bar1.start(po.items.length, 0);
        var skipped = 0;
        for (let i = 0; i < po.items.length; i++) {
            if (po.items[i].msgstr == '' && po.items[i].msgid.indexOf('{{') == -1 && po.items[i].msgid.indexOf('&nbsp') == -1) {
                await new Promise((resolve) => setTimeout(() => {
                    translate(po.items[i].msgid)
                        .then(result => {
                            po.items[i].msgstr = result;
                            //console.log(result);
                            po.save(`output/${outputName}.po`, function (err) {
                                // Handle Error
                                if (err) {
                                    console.log(err);
                                }
                            })
                        })
                    resolve();
                }, Math.floor(Math.random() * 2000) + 1000));
            } else {
                skipped += 1;
            }
            bar1.update(i + 1);
        }
        bar1.stop();
        console.log('Total Items Skipped : ', skipped)
    });
}

async function translate(value) {
    const result = translateApi(value, {
        from: langFrom,
        to: langTo
    }).then(res => {
        return res.text;
    }).catch(err => {
        console.error(err);
    });
    return await result;
}