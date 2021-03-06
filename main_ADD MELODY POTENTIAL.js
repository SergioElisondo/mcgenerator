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
// console.log(Object.values(allChords)



// ****************************************** ASCII CODE **********************************
// think of "x" as quarter note and "-" (aka HYPHEN or Minus) as quarter rest
// LETTER ASCII-CODE BINARY
// x	   120	       01111000
// -      45


// ****************************************** 8th note *************************************

//subdiv: '8n', // the default it a quarter note

// ******************************** WORD MIXED TO MIX UP CHORDS AND MELODIES **************
// THIS IS THE WORD MIXER!! ORIGINAL CODE -- same code below but edited
// let tracery = require('tracery-grammar');
 
// let grammar = tracery.createGrammar({
//   'animal': ['panda','fox','capybara','iguana'],
//   'emotion': ['sad','happy','angry','jealous'],
//   'origin':['I am #emotion.a# #animal#.'],
// });
 
// grammar.addModifiers(tracery.baseEngModifiers); 
 
// console.log(grammar.flatten('#origin#'));


//'note': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],

// CHORD MAKER --- EDITED CODE TO WORK FOR RANDOMIZATION
let tracery = require('tracery-grammar');
 
let grammar = tracery.createGrammar({
    //'definition': ["+add#9", "11th", "11b9", "13th", "13#11", "13#9", "13#9#11", "13b5", "13b9", "13b9#11", "13no5", "13sus4", "4th", "5th", 64, "69#11", "7th", "7#11", "7#11b13", "7#5", "7#5#9", "7#5b9", "7#5b9#11", "7#5sus4", "7#9", "7#9#11", "7#9#11b13", "7#9b13", "7add6", "7b13", "7b5", "7b6", "7b9", "7b9#11", "7b9#9", "7b9b13", "7b9b13#11", "7no5", "7sus4", "7sus4b9", "7sus4b9b13", "9th", "9#11", "9#11b13", "9#5", "9#5#11", "9b13", "9b5", "9no5", "9sus4", "M", "M#5", "M#5add9", "M13", "M13#11", "M6", "M6#11", "M69", "M69#11", "M7#11", "M7#5", "M7#5sus4", "M7#9#11", "M7add13", "M7b5", "M7b6", "M7b9", "M7sus4", "M9", "M9#11", "M9#5", "M9#5sus4", "M9b5", "M9sus4", "Madd9", "Maddb9", "Maj7", "Mb5", "Mb6", "Msus2", "Msus4", "m", "m#5", "m11", "m11A 5", "m11b5", "m13", "m6", "m69", "m7", "m7#5", "m7add11", "m7b5", "m9", "m9#5", "m9b5", "mM9", "mM9b6", "mMaj7", "mMaj7b6", "madd4", "madd9", "mb6M7", "mb6b9", "o", "o7", "o7M7", "oM7", "sus24"],
    'sadDefinition': ['m7-3'],
    'happyDefinition': ['Maj7-3'],
    'dominantDefinition': ['M-3'],
    'tritoneDefinition': ['7th-3'],
    // 'tritoneDefinitionLow': ['7th-2'],
    'dimishedDefinition': ['o7-2'], // this puts it into a third octave range -- DO NOT put it on chord letters below!!
    
    
    'sadNote': ['A', 'E', 'D'],
    'happyNote': ['C', 'F'],
    'dominantNote': ['G'],
    'tritoneNote': ['Db'], // sub for Dominant7th
    // 'tritoneNoteLow': ['Bb'], // tritone sub for Em7
    'diminishedNote': ['B'], // regular diminsished
    
    // ADD THIS INTO chordType if you Em7 tritone sub of Bb7 --- '#tritoneNoteLow##tritoneDefinitionLow#',

    'chordType': ['#sadNote##sadDefinition#', '#happyNote##happyDefinition#', '#dominantNote##dominantDefinition#','#tritoneNote##tritoneDefinition#', '#diminishedNote##dimishedDefinition#'],
    'text': ['#chordType#'],
    // 'origin':['#note##chord#'],
    // 'chords': 
});
 


// RHYTHM MAKER 
let rhythmGrammar = tracery.createGrammar({
  'groove': ['x__x__x-','x--x__x-','x--x--x_','x-x__x_-'],
  'text_1':['#groove#'],
});


// MELODY MAKER
// let melodyGrammar = tracery.createGrammar({
//   'groove': '[xR][Rx]'.repeat(8),
//   'theGroove':['#groove#'],
//   'notes': ['C4', 'E4', 'F4', 'G4', 'A4', 'C5', 'E5'],
//   'groovePlusNotes' : ['#theGroove##notes#']
// });

// --------------------- THIS IS FOR RANDOMIZING CHORDS -------------------------
let getRandomChord = function(grammar){
        return (grammar.flatten('#text#'));
}

let getChords = function(grammar, chordCount){
    let chords = []
    for(let i = 0; i < chordCount; i++){
        let chord = getRandomChord(grammar)
        console.log('pushing' + chord)
        chords.push(chord)
    }
    return chords
}

// --------------------------- RANDOMIZE RHYTHM ------------------------
let getRandomText = function(grammar) {
  return grammar.flatten('#text_1#');
}

let getText = function(grammar, textCount) {
  let textItems = [];
  for(let i = 0; i < textCount; i++) {
    let text = getRandomText(grammar);
    textItems.push(text);
  }
  return textItems;
}

// WORKING HERE
// ------------------------------ RANDOMIZE MELODY -----------------------

// let getRandomMelody = function(grammar){
//         return (grammar.flatten('#groovePlusNotes#'));
// }

// let getMelody = function(grammar, melodyCount){
//     let mainMelody = []
//     for(let i = 0; i < melodyCount; i++){
//         let melody = getRandomMelody(grammar)
//         console.log('pushing' + melody)
//         mainMelody.push(melody)
//     }
//     return mainMelody
// }


// GRABBIN CHORDS
let chordList = getChords(grammar, 8)
console.log('chordList:', chordList)

// GRABBING RYHTHM
let rhythms = getText(rhythmGrammar, 8);
console.log('rhythmList:', rhythms);



// PUTTING IT ALL TOGETHER
let chords = scribble.clip({
    notes: chordList,
    
    // THIS BELOW KEEPS CHORDS NORMAL, WITH LAST 1/4 note tied to 3rd beat
    // pattern: 'x_x_x___'.repeat(8)

    // -------------------------  THIS WILL MAKE THE RHYTHM RANDOM!!! -------------------
    pattern: rhythms.join('')
})


// let allMelody = scribble.clip({
//     notes: melody,
// })


scribble.midi(chords, 'random-chords.mid')




// ************************************* MAIN melody ******************* 
  // const clips = ['1032', '2032', '4021', '3052'].map(order =>
  //   scribble.clip({
  //     pattern: '[xx][xR]'.repeat(8),
  //     notes: scribble.arp({
  //       // melodyNotes: 'Dm BbM FM CM BbM Am FM Gm', //original sounds awesome!
  //       melodyNotes: 'CM Am Em DM GM Am FM GM',
  //       count: 8,
  //       order,
  //     }),
  //     accent: 'x-xx--xx', // think of "x" as quarter note and "-" as quarter rest
  //   })
  // );
  // scribble.midi([].concat(...clips), 'melody.mid');


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




// // Get C Major (Major is denoted by M)
// const cMajorChord = chord('CM'); // [ 'C4', 'E4', 'G4' ]
// // Get the C Major chord on the 5th octave
// const cMajorChord5 = scribble.chord('CM-5'); // [ 'C5', 'E5', 'G5' ]
// // Get the C minor chord (denoted with a lowercase `m`)
// const cMinorChord = chord('Cm'); // [ 'C4', 'EB4', 'G4' ]
