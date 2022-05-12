const scribble = require("scribbletune"); //framework or module that creates midi notes
// const { Note, Scale } = require("@tonaljs/tonal");
// const { Z_BINARY } = require('node:zlib');
// import { Note, Scale } from "@tonaljs/tonal";
// import { transpose } from "@tonaljs/note";
// import { chord, clip } from 'scribbletune';
// Load the full build.

let _ = require("lodash");
// Load the core build.
// let _ = require('lodash/core');
// // Load the FP build for immutable auto-curried iteratee-first data-last methods.
// let fp = require('lodash/fp');

// // Load method categories.
// let array = require('lodash/array');
// let object = require('lodash/fp/object');

// // Cherry-pick methods for smaller browserify/rollup/webpack bundles.
// let at = require('lodash/at');
// let curryN = require('lodash/fp/curryN');

// **************************************** LIST OF SCALES AND CHORDS **************************
// const allScales = scribble.scales(); // returns an array of all the available scales from tonal
// console.log(allScales)

// // Get a list of all the available chords
// const allChords = scribble.chords(); // Returns an array of all the available chords
// console.log(Object.values(allChords)

// ****************************************** ASCII CODE **********************************
// think of "x" as quarter note and "-" (aka HYPHEN or Minus) as quarter rest
// LETTER ASCII-CODE BINARY
// x	   120	       01111000
// -      45

// ******************************** WORD MIXER TO MIX UP CHORDS AND MELODIES **************
// THIS IS THE WORD MIXER!! EXAMPLE
// let tracery = require('tracery-grammar');
let tracery = require("tracery-grammar"); // library that randomizes

// testing tracery!  --- START
// let grammar_1 = tracery.createGrammar({
//   'animal': ['panda','fox','capybara','iguana'],
//   'emotion': ['sad','happy','angry','jealous'],
//   'origin':['I am #emotion.a# #animal#.'],
// });

// grammar_1.addModifiers(tracery.baseEngModifiers);

// console.log(grammar_1.flatten('#origin#'));
// testing tracery!  --- END



//'note': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],

// CHORD MAKER --- EDITED CODE TO WORK FOR RANDOMIZATION
let grammar = tracery.createGrammar({
  //'chord': ["+add#9", "11th", "11b9", "13th", "13#11", "13#9", "13#9#11", "13b5", "13b9", "13b9#11", "13no5", "13sus4", "4th", "5th", 64, "69#11", "7th", "7#11", "7#11b13", "7#5", "7#5#9", "7#5b9", "7#5b9#11", "7#5sus4", "7#9", "7#9#11", "7#9#11b13", "7#9b13", "7add6", "7b13", "7b5", "7b6", "7b9", "7b9#11", "7b9#9", "7b9b13", "7b9b13#11", "7no5", "7sus4", "7sus4b9", "7sus4b9b13", "9th", "9#11", "9#11b13", "9#5", "9#5#11", "9b13", "9b5", "9no5", "9sus4", "M", "M#5", "M#5add9", "M13", "M13#11", "M6", "M6#11", "M69", "M69#11", "M7#11", "M7#5", "M7#5sus4", "M7#9#11", "M7add13", "M7b5", "M7b6", "M7b9", "M7sus4", "M9", "M9#11", "M9#5", "M9#5sus4", "M9b5", "M9sus4", "Madd9", "Maddb9", "Maj7", "Mb5", "Mb6", "Msus2", "Msus4", "m", "m#5", "m11", "m11A 5", "m11b5", "m13", "m6", "m69", "m7", "m7#5", "m7add11", "m7b5", "m9", "m9#5", "m9b5", "mM9", "mM9b6", "mMaj7", "mMaj7b6", "madd4", "madd9", "mb6M7", "mb6b9", "o", "o7", "o7M7", "oM7", "sus24"],
  sadChord: ["m7-3"],
  happyChord: ["Maj7-3"],
  dominantChord: ["M-2"],
  tritoneChord: ["7th-3"],
  // 'tritoneChordLow': ['7th-2'],
  dimishedChord: ["o7-2"], // this puts it into a third octave range -- DO NOT put it on chord letters below

  // added G B Eb to sadNotes
  sadNote: ["A", "E", "D"], // G was moved down -- B and Eb was taken out
  happyNote: ["C", "F"],
  happyNote1: ['G'],

  // removed 'dominantNote tritoneNote diminishedNote' from the list
  //'dominantNote': ['G'],
  //'tritoneNote': ['Db'], // sub for Dominant7th
  //'diminishedNote': ['B'], // regular diminsished
  // 'tritoneNoteLow': ['Bb'], // tritone sub for Em7

  // currently not in ORIGINAL set of chords but ADD THIS INTO chordType if you Em7 tritone sub of Bb7 --- '#tritoneNoteLow##tritoneChordLow#',

  // THREE ORIGINALS that were removed 060121 add these for chord types if you want dim and tritones in the mix '#dominantNote##dominantChord#','#tritoneNote##tritoneChord#', '#diminishedNote##dimishedChord#'
  chordType: ["#sadNote##sadChord#", "#happyNote##happyChord#", "#happyNote1##dominantChord#"],
  text: ["#chordType#"],
  // 'origin':['#note##chord#'],
  // 'chords':
});

// RHYTHM MAKER!
let rhythmGrammar = tracery.createGrammar({
  groove: ["xxxxxxx-", "x_x_xxxx", "x--x--x_", "x-x__x_-"],
  text_1: ["#groove#"],
});

// MELODY MAKER!
// let rhythmGrammar = tracery.createGrammar({
//   'groove': ['x__x__x-','x--x__x-','x--x--x_','x-x__x_-'],
//   'text_1':['#groove#'],
// });


// ****************************************************** NEW MELODY GEN!!!! ************************************

// mix it up
let melodyMix = tracery.createGrammar({
  notes1: ['C4', 'D4', 'E4', 'G4', 'A4', 'B4'],
  notesInline: ['#notes1#'],
}) 

// RHYTHM MAKER!
let rhythmGrammar1 = tracery.createGrammar({
  'groove': ['xxxx_--','x__x---x','-x_x__-x','xxx_x_xx'],
  'text_1': ['#groove#'],
});

let getRandomNote = function (grammar0) {
  return grammar0.flatten("#notesInline#");
};

let getNote = function (grammar1, chordCount) {
  let chords = [];
  for (let i = 0; i < chordCount; i++) {
    let chord = getRandomNote(grammar1);
    console.log("pushing" + chord);
    chords.push(chord);
  }
  return chords;
};

// seccondary loop for rhythm

let getRandomText1 = function (grammar0) {  // this merges the rhythm aka 'flattens'
  return grammar0.flatten("#text_1#");
};

let getText1 = function (grammar2, textCount) {  // anonymous function just for this 
  let textItems = [];
  for (let i = 0; i < textCount; i++) {
    let text = getRandomText1(grammar2); // getRandomText method we created here
    textItems.push(text);
  }
  return textItems;
};


// GRABBIN Notes!
let chordList1 = getNote(melodyMix, 8); // passing in actual grammar argument from above 
console.log("chordList1:", chordList1);

// GRABBING RYHTHM
let rhythm1 = getText1(rhythmGrammar1, 8);
console.log("rhythm1:", rhythm1);


let finalNotes = scribble.clip({
  notes: chordList1,
  // pattern: 'x_x_x___'.repeat(8)

  // -------------------------  THIS WILL MAKE THE RHYTHM RANDOM!!! -------------------
  pattern: rhythm1.join(""),
});


scribble.midi(finalNotes, "melody_gen2.mid");


// *************************************************** melody gen end **********************************









// --------------------- THIS IS FOR RANDOMIZING CHORDS -------------------------
let getRandomChord = function (grammar0) {
  return grammar0.flatten("#text#");
};

let getChords = function (grammar1, chordCount) {
  let chords = [];
  for (let i = 0; i < chordCount; i++) {
    let chord = getRandomChord(grammar1);
    console.log("pushing" + chord);
    chords.push(chord);
  }
  return chords;
};

// --------------------------- RANDOMIZE RHYTHM ------------------------

let getRandomText = function (grammar0) {
  return grammar0.flatten("#text_1#");
};

let getText = function (grammar2, textCount) {  // anonymous function just for this 
  let textItems = [];
  for (let i = 0; i < textCount; i++) {
    let text = getRandomText(grammar2); // getRandomText method we created here
    textItems.push(text);
  }
  return textItems;
};

// GRABBIN CHORDS!
let chordList = getChords(grammar, 8); // passing in actual grammar argument from above 
console.log("chordList:", chordList);

// GRABBING RYHTHM
let rhythms = getText(rhythmGrammar, 8);
console.log("rhythmList:", rhythms);

// PUTTING CHORDS + RYHTHM TOGETHER
let chords = scribble.clip({
  notes: chordList,
  // pattern: 'x_x_x___'.repeat(8)

  // -------------------------  THIS WILL MAKE THE RHYTHM RANDOM!!! -------------------
  pattern: rhythms.join(""),
});

// THIS OUTPUTS CHORDS ONLY --
scribble.midi(chords, "chords.mid");









// Basic Melody Gen from DOCS
// ************************************* MAIN melody from DOCS *******************
const clips = ["1032", "2032", "4021", "3052"].map(order =>
  scribble.clip({
    pattern: "[x_][xR]".repeat(8),
    notes: scribble.arp({
      // chords: 'Dm BbM FM CM BbM Am FM Gm', //original sounds awesome!
      chords: "CM Am Em CM GM Am CM GM", // last CM was formally a FM  --- removed Dm from 4th note position 110221
      count: 8,
      order,
    }),
    accent: "x-xx---x", // -- changed beat 7 from x to -  (think of "x" as quarter note and "-" as quarter rest)
  })
);






// ******************************************** MERGING ***************************************************************

let melodyNotes = [].concat(...clips); // ... spread operator allowing iterable like an array expression or string to be expanded whereever placed
// // THIS OUTPUTS MELODY ONLY!
scribble.midi(melodyNotes, "melody.mid");





// // this outputs them all together! but not fully working... tried with Leon
// let combined = _.merge(chords, melodyNotes);
// scribble.midi(chords, "AllPartsTogether.mid");










// // this outputs them all together! but not fully working...
// let combined =
// scribble.midi(combined, 'AllPartsTogether.mid')

// let combined2 = chords.concat(melodyNotes).reduce((a,b) => a+b, 0)
// scribble.midi(combined2, 'AllPartsTogether2.mid')

// THIS PLAYS BUT THERE IS NO SOUND!!!
// let newArray = [...chords, ...melodyNotes]
// let all = Object.assign(newArray.join(''))
// scribble.midi(all, 'random-chords.mid')

// THIS PLAYS BUT THEY ARE IN LINE
// let newArray = [...chords, ...melodyNotes]
// scribble.midi(newArray, 'random-chords.mid')

// THIS PLAYS BUT THEY ARE IN LINE
// scribble.midi(chords.concat(melodyNotes),'random-chords.mid')

// THIS PLAYS BUT THEY ARE IN LINE
// Array.prototype.unique = function() {
//     var a = this.concat();
//     for(var i=0; i<a.length; ++i) {
//         for(var j=i+1; j<a.length; ++j) {
//             if(a[i] === a[j])
//                 a.splice(j--, 1);
//         }
//     }

//     return a;
// };
// var array3 = chords.concat(melodyNotes).unique();
// scribble.midi(array3,'random-chords.mid')

// ***************************** Arpeggio **********************
// const c = scribble.clip({
//   notes: scribble.arp('CM FM CM GM'),
//   pattern: 'x'.repeat(32)
// });

// scribble.midi(c, 'arppegio.mid');

// *****************************************  SCALES  **********************
// *** Create a clip that plays the middle C
// const clip = scribble.clip({
// 	notes: scribble.scale('C4 major'),
// 	pattern: 'xxxxxxx'
// });

// *** Render a MIDI file of this clip
// scribble.midi(clip, 'c-major-scale.mid');

// TOP CODE HERE WORKS TOO!!!
// a diff way to write the "pattern"

// const clip = scribble.clip({
//     notes: scribble.scale('C4 major'),
//     pattern: 'x'.repeat(7) + '_'
// });

// scribble.midi(clip, 'c-major.mid');

// MINOR!!
// let cMinor = scribble.mode('C4 aeolian'); // [ 'C4', 'D4', 'D#4', 'F4' ...]
// const clip = scribble.clip({
//     notes: cMinor,
//     pattern: 'xxxxxxx'
// });

// scribble.midi(clip, 'c-min.mid'); // Export this clip as a MIDI file

// ********************************* CHORDS ***************************

// THIS WORKS WELL!
// let chords = scribble.clip({
//     notes: ['F#m', 'C#m', 'DM', 'Bm', 'EM', 'AM', 'DM', 'C#m', 'AM'],
//     pattern: 'x_x_x_--'.repeat(8),
//     // sizzle: true    THIS CREATES A FADE IN AND FADE OUT
// })
// scribble.midi(chords, 'chords.mid')

//This works too
// const chordsClip = scribble.clip({
// 	// Use chord names directly in the notes array
// 	// M stands for Major, m stands for minor
//     // CM7-3 is C Major 7 chord on 3rd octave range
// 	notes: 'CM7-3 FM7-3 GM7-3 CM7-3',
// 	pattern: 'x-x-x-x-'.repeat(4)  // think of "x" as quarter note and "-" as quarter rest
// });
// scribble.midi(chordsClip, 'chords.mid');

// USING A 7th -- DOMINTANT 7th! ******************* WORKING HERE
// need to add user input
// const cMajorChord = scribble.clip({
//     notes: 'Dm7 G7th CM7 CM7',
//     pattern: 'x-'.repeat(4) // gets all 4 chords
// })
// scribble.midi(cMajorChord, 'test.mid')

// // Get any Major Chord with "M" (Major is denoted by M)
// const cMajorChord = chord('CM'); // [ 'C4', 'E4', 'G4' ]
// // Get the C Major chord on the 5th octave
// const cMajorChord5 = scribble.chord('CM-5'); // [ 'C5', 'E5', 'G5' ]
// // Get the C minor chord (denoted with a lowercase `m`)
// const cMinorChord = chord('Cm'); // [ 'C4', 'EB4', 'G4' ]
