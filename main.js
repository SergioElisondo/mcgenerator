const scribble = require('scribbletune');
// const { Note, Scale } = require("@tonaljs/tonal");
// const { Z_BINARY } = require('node:zlib');
// import { Note, Scale } from "@tonaljs/tonal";
// import { transpose } from "@tonaljs/note";
// import { chord, clip } from 'scribbletune';


// ***************************************** VARIATION OF LOGS for CONSOLE **********************

// console.log('Console Log')
// console.info('Console Info')
// console.debug('Console Debug')
// console.warn('Console Warn')
// console.error('Console Error')
// console.assert
// console.count
// console.countReset
// console.group
// console.table

// **************************************** LIST OF SCALES AND CHORDS **************************
// const allScales = scribble.scales(); // returns an array of all the available scales from tonal
// console.log(allScales)

// // Get a list of all the available chords
// const allChords = scribble.chords(); // Returns an array of all the available chords

// console.group()
// console.info(allChords)
// console.groupEnd()

// ****************************************** ASCII CODE **********************************
// think of "x" as quarter note and "-" (aka HYPHEN or Minus) as quarter rest
// LETTER ASCII-CODE BINARY
// x	   120	       01111000
// -      45



// ******************************** WORD MIXED TO MIX UP CHORDS AND MELODIES **************
// THIS IS WORD MIXER!! ORIGINAL CODE -- same code below but edited
// let tracery = require('tracery-grammar');
 
// let grammar = tracery.createGrammar({
//   'animal': ['panda','fox','capybara','iguana'],
//   'emotion': ['sad','happy','angry','jealous'],
//   'origin':['I am #emotion.a# #animal#.'],
// });
 
// grammar.addModifiers(tracery.baseEngModifiers); 
 
// console.log(grammar.flatten('#origin#'));



// RANDOMIZER --- EDITED CODE TO WORK FOR RANDOMIZATION
// let tracery = require('tracery-grammar');
 
// let grammar = tracery.createGrammar({
//   'chords': ['panda','fox','capybara','iguana'],
//   'emotion': ['sad','happy','angry','jealous'],
//   'origin':['I am #emotion.a# #animal#.'],
// });
 
// grammar.addModifiers(tracery.baseEngModifiers); 
 
// console.log(grammar.flatten('#origin#'));













// ************************************* melody ******************* 
//   const clips = ['1032', '2032', '4021', '3052'].map(order =>
//     scribble.clip({
//       pattern: '[xx][xR]'.repeat(4),
//       notes: scribble.arp({
//         chords: 'Dm BbM FM CM BbM Am FM Gm',
//         count: 8,
//         order,
//       }),
//       accent: 'x-xx--xx', // think of "x" as quarter note and "-" as quarter rest
//     })
//   );
//   scribble.midi([].concat(...clips), 'melody.mid');


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



// USING A 7th -- DOMINTANT 7th!
let userNotes = prompt('give 4 chords: ')
const cMajorChord = scribble.clip({
    notes: userNotes,
    pattern: 'x-'.repeat(4) // gets all 4 chords
})
scribble.midi(cMajorChord, 'test.mid')




// // Get C Major (Major is denoted by M)
// const cMajorChord = chord('CM'); // [ 'C4', 'E4', 'G4' ]
// // Get the C Major chord on the 5th octave
// const cMajorChord5 = scribble.chord('CM-5'); // [ 'C5', 'E5', 'G5' ]
// // Get the C minor chord (denoted with a lowercase `m`)
// const cMinorChord = chord('Cm'); // [ 'C4', 'EB4', 'G4' ]
