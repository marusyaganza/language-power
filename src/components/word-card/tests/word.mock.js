export const mock = {
  uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
  id: 'mockid',
  name: 'shoal',
  stems: ['shoal', 'shoals'],
  defs: [
    '{bc} a large group or number',
    '{bc} an area where the water in a sea, lake, or river is not deep',
    '{bc} a small, raised area of sand just below the surface of the water'
  ],
  particle: 'noun',
  examples: ['Example1', 'Example2'],
  pronunciation: {
    transcription: 'ˈʃoʊl',
    audioUrl: 'https://media.merriam-webster.com/soundc11/s/shoal001.wav'
  }
};

export const reducedMock = {
  ...mock,
  examples: null,
  defs: null,
  pronunciation: { audioUrl: null, transcription: null }
};
