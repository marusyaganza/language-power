import {WEBSTER} from "./api-data";

fetch('https://dictionaryapi.com/api/v3/references/learners/json/apple?key=28f09e58-08be-4679-b361-dfdcb6ab3eb8')
    .then(res => res.json())
    .then(res => console.log(res));

const data = {};

const datamodel = {
    functionalLabel: data.fl,
    defs: data.shortdef,
    examples: data.dros
};

fetch('https://dictionaryapi.com/api/v3/references/learners/json/apple?key=28f09e58-08be-4679-b361-dfdcb6ab3eb8')
    .then(res => res.json())
    .then(res => res.forEach(item => defs3.push({
        functionalLabel: item.fl,
        defs: item.shortdef,
        examples: item.dros,
        audio: item.hwi.prs ? res[0].hwi.prs[0].sound.audio : null
    })));

fetch('https://dictionaryapi.com/api/v3/references/learners/json/demure?key=28f09e58-08be-4679-b361-dfdcb6ab3eb8')
    .then(res => res.json())
    .then(res => console.log(res[0].hwi.prs[0].sound.audio));

const player = document.createElement('audio');
audio.src = defs5[0].audio;
document.body.append(player);