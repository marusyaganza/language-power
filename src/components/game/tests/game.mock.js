export const config = {
  audio: {
    MAX_GAMES: 5,
    MIN_WORDS_IN_VOCAB: 1,
    WORDS_PER_GAME: 2,
    AUDIO_IS_REQUIRED: true,
    OPTIONS_NUM: 0,
    MULTIPLE_CORRECT_ANSWERS: false,
    QUESTION_PROP: 'audioUrl',
    ANSWER_PROP: 'name'
  },
  writing: {
    MAX_GAMES: 5,
    MIN_WORDS_IN_VOCAB: 1,
    WORDS_PER_GAME: 2,
    AUDIO_IS_REQUIRED: false,
    OPTIONS_NUM: 0,
    MULTIPLE_CORRECT_ANSWERS: false,
    QUESTION_PROP: 'defs',
    ANSWER_PROP: 'name'
  },
  findAllDefs: {
    MAX_GAMES: 5,
    MIN_WORDS_IN_VOCAB: 6,
    WORDS_PER_GAME: 2,
    AUDIO_IS_REQUIRED: false,
    OPTIONS_NUM: 6,
    MULTIPLE_CORRECT_ANSWERS: true,
    QUESTION_PROP: 'name',
    ANSWER_PROP: 'defs'
  },
  definitionWord: {
    MAX_GAMES: 1,
    MIN_WORDS_IN_VOCAB: 6,
    WORDS_PER_GAME: 6,
    AUDIO_IS_REQUIRED: false,
    OPTIONS_NUM: 6,
    MULTIPLE_CORRECT_ANSWERS: false,
    QUESTION_PROP: 'defs',
    ANSWER_PROP: 'name'
  }
};
export const gameData = {
  audio: {
    qa: [
      {
        text: 'bodily',
        q: 'https:/test/audio.com',
        a: 'bodily'
      }
    ],
    learntCards: [
      {
        index: 0,
        id: '0'
      }
    ],
    gameId: 'audio'
  },
  writing: {
    qa: [
      {
        text: 'syllabic',
        audioUrl: 'https://media.merriam-webster.com/soundc11/s/syllab02.wav',
        q: '{it}linguistics{/it} {bc} of or relating to syllables',
        a: 'syllabic'
      },
      {
        text: 'spew',
        audioUrl: 'https://media.merriam-webster.com/soundc11/s/spew0001.wav',
        q: '{bc} to flow out of something in a fast and forceful way',
        a: 'spew'
      }
    ],
    learntCards: [
      {
        index: 0,
        id: '0'
      },
      {
        index: 1,
        id: '2'
      }
    ],
    gameId: 'writing'
  },
  findAllDefs: {
    qa: [
      {
        text: 'spew',
        audioUrl: 'https://media.merriam-webster.com/soundc11/s/spew0001.wav',
        q: 'spew',
        a: '14',
        options: [
          '{it}formal{/it} {bc} to do (something that is illegal or wrong)',
          '{bc} to cause (something) to flow out in a fast and forceful way',
          '{it}music{/it} {bc} a short and usually repeated pattern of notes in a song',
          '{bc} any one of the parts into which a word is naturally divided when it is pronounced',
          '{bc} to flow out of something in a fast and forceful way',
          '{it}formal{/it} {bc} doing or producing good'
        ]
      }
    ],
    learntCards: [
      {
        index: 0,
        id: '0'
      }
    ],
    gameId: 'findAllDefs'
  },
  definitionWord: {
    qa: [
      {
        text: 'syllable',
        audioUrl: 'https://media.merriam-webster.com/soundc11/s/syllab09.wav',
        q:
          '{bc} any one of the parts into which a word is naturally divided when it is pronounced',
        a: '0',
        options: [
          'syllable',
          'bodily',
          'perpetrate',
          'voluptuous',
          'beneficent',
          'profundity',
          'manslaughter'
        ]
      }
    ],
    learntCards: [
      {
        index: 0,
        id: '0'
      }
    ],
    gameId: 'defenitionWord'
  }
};

export const gameDataEmpty = {
  qa: [],
  learntCards: [],
  gameId: 'audio'
};

export const finishTexts = [
  'Training complete',
  'You made 1 mistakes',
  'You practiced 1 words'
];
export const finishTexts2 = [
  'Training complete',
  'You made 1 mistakes',
  'You practiced 2 words'
];
