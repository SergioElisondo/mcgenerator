const scribble = require('scribbletune');




// ************************************* melody ******************* 
//   const clips = ['1032', '2032', '4021', '3052'].map(order =>
//     scribble.clip({
//       pattern: '[xx][xR]'.repeat(4),
//       notes: scribble.arp({
//         chords: 'Dm BbM FM CM BbM Am FM Gm',
//         count: 8,
//         order,
//       }),
//       accent: 'x-xx--xx',
//     })
//   );
//   scribble.midi([].concat(...clips), 'chords.mid');


// ***************************** Arpeggio **********************
// const c = scribble.clip({
//   notes: scribble.arp('CM FM CM GM'),
//   pattern: 'x'.repeat(32)
// });

// scribble.midi(c, 'arppegio.mid');



// ***************************************** C major scale **********************
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



// ********************************* CHORDS ***************************

let chords = scribble.clip({
    notes: ['F#m', 'C#m', 'DM', 'Bm', 'EM', 'AM', 'DM', 'C#m', 'AM'],
    pattern: 'x_x_x_--'.repeat(8),
    // sizzle: true    THIS CREATES A FADE IN AND FADE OUT
})
scribble.midi(chords, 'chords.mid')