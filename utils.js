import chalk from "chalk";
import boxen from "boxen";
import { translate } from "@vitalets/google-translate-api";


const usage = chalk.hex('#83aaff')("Usage: tran -l <lang_name> -t <sentence to be translated>");


export function handleCommandTranslate(argv) {

  //just show the languages and go home
  if (argv.list) {
    showAll()
    return;
  }


  //check that -l and -t exist, the check includes them not being fucking empty
  if (!argv.l || !argv.t) {
    console.error(chalk.red("\nYou need to input a language and text to translate"))
    console.log(usage);
    console.log(chalk.green("Enter tran --help to get started.\n"))
    return
  }

  //all the checks for the language
  var lan = parseLanguage(argv.l)
  if (!lan) return;

  // console.log(lan, argv.t)

  //magic happens here
  translate(argv.t, { to: lan })
    .then(res => {
      console.log("\n" + boxen(chalk.green("\n" + res.text + "\n"), { padding: 1, borderColor: 'blue', dimBorder: true }) + "\n")
    })
    .catch(err => {
      if (err.status == 429) {
        console.log(chalk.red("\nToo many requests at the moment\n"))
      }
    })
}

export function showAll(argv) {
  console.log(chalk.magenta.bold("\nLanguage Name\t\tISO-639-1 Code\n"))
  //How to map a motherfucker down here
  for (let [key, value] of languages) {
    console.log(key + "\t\t\t" + value + "\n")
  }
}

function parseLanguage(raw) {
  var lan = raw.toLowerCase()
  if (languages.has(lan)) {
    return languages.get(lan)
  } else if (lan.length == 2) {
    for (let [k, v] of languages)
      if (v == lan) {
        return v;
      }
  }
  console.error(chalk.red.bold("\nLanguage not supported!"))
  console.log(usage)
}


let languages = new Map();
// languages.set('afrikaans', 'af')
// languages.set('albanian', 'sq')
// languages.set('amharic', 'am')
// languages.set('arabic', 'ar')
// languages.set('armenian', 'hy')
// languages.set('azerbaijani', 'az')
// languages.set('basque', 'eu')
// languages.set('belarusian', 'be')
// languages.set('bengali', 'bn')
// languages.set('bosnian', 'bs')
// languages.set('bulgarian', 'bg')
// languages.set('catalan', 'ca')
// languages.set('cebuano', 'ceb') //(iso-639-2)
// languages.set('chinese', 'zh')	//zh-cn or zh (bcp-47)
// //chinese (traditional)	zh-tw (bcp-47)
// languages.set('corsican', 'co')
// languages.set('croatian', 'hr')
// languages.set('czech', 'cs')
// languages.set('danish', 'da')
// languages.set('dutch', 'nl')
languages.set('english', 'en')
// languages.set('esperanto', 'eo')
// languages.set('estonian', 'et')
// languages.set('finnish', 'fi')
// languages.set('french', 'fr')
// languages.set('frisian', 'fy')
// languages.set('galician', 'gl')
// languages.set('georgian', 'ka')
// languages.set('german', 'de')
// languages.set('greek', 'el')
// languages.set('gujarati', 'gu')
// languages.set('haitian creole', 'ht')
// languages.set('hausa', 'ha')
// languages.set('hawaiian', 'haw') // (iso-639-2)
// languages.set('hebrew', 'he') //or iw
// languages.set('hindi', 'hi')
// languages.set('hmong', 'hmn') //(iso-639-2)
// languages.set('hungarian', 'hu')
// languages.set('icelandic', 'is')
// languages.set('igbo', 'ig')
// languages.set('indonesian', 'id')
// languages.set('irish', 'ga')
// languages.set('italian', 'it')
languages.set('japanese', 'ja')
// languages.set('javanese', 'jv')
// languages.set('kannada', 'kn')
// languages.set('kazakh', 'kk')
// languages.set('khmer', 'km')
// languages.set('kinyarwanda', 'rw')
// languages.set('korean', 'ko')
// languages.set('kurdish', 'ku')
// languages.set('kyrgyz', 'ky')
// languages.set('lao', 'lo')
// languages.set('latin', 'la')
// languages.set('latvian', 'lv')
// languages.set('lithuanian', 'lt')
// languages.set('luxembourgish', 'lb')
// languages.set('macedonian', 'mk')
// languages.set('malagasy', 'mg')
// languages.set('malay', 'ms')
// languages.set('malayalam', 'ml')
// languages.set('maltese', 'mt')
// languages.set('maori', 'mi')
// languages.set('marathi', 'mr')
// languages.set('mongolian', 'mn')
// languages.set('burmese', 'my')
// languages.set('nepali', 'ne')
// languages.set('norwegian', 'no')
// languages.set('nyanja', 'ny')
// languages.set('odia', 'or')
// languages.set('pashto', 'ps')
// languages.set('persian', 'fa')
// languages.set('polish', 'pl')
// languages.set('portuguese', 'pt')
// languages.set('punjabi', 'pa')
// languages.set('romanian', 'ro')
languages.set('russian', 'ru')
// languages.set('samoan', 'sm')
// languages.set('scots', 'gd')//gd gaelic
// languages.set('serbian', 'sr')
// languages.set('sesotho', 'st')
// languages.set('shona', 'sn')
// languages.set('sindhi', 'sd')
// languages.set('sinhalese', 'si')
// languages.set('slovak', 'sk')
// languages.set('slovenian', 'sl')
// languages.set('somali', 'so')
languages.set('spanish', 'es')
// languages.set('sundanese', 'su')
// languages.set('swahili', 'sw')
// languages.set('swedish', 'sv')
// languages.set('tagalog', 'tl')
// languages.set('tajik', 'tg')
// languages.set('tamil', 'ta')
// languages.set('tatar', 'tt')
// languages.set('telugu', 'te')
// languages.set('thai', 'th')
// languages.set('turkish', 'tr')
// languages.set('turkmen', 'tk')
// languages.set('ukrainian', 'uk')
// languages.set('urdu', 'ur')
// languages.set('uyghur', 'ug')
// languages.set('uzbek', 'uz')
// languages.set('vietnamese', 'vi')
// languages.set('welsh', 'cy')
// languages.set('xhosa', 'xh')
// languages.set('yiddish', 'yi')
// languages.set('yoruba', 'yo')
// languages.set('zulu', 'zu')
