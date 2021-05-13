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

// scribble.midi(c, 'arp.mid');



// ***************************************** C major scale **********************
// *** Create a clip that plays the middle C
// const clip = scribble.clip({
// 	notes: scribble.scale('C4 major'),
// 	pattern: 'xxxxxxx'
// });

// *** Render a MIDI file of this clip
// scribble.midi(clip, 'c.mid');


// ********************************* CHORDS ***************************

let chords = scribble.clip({
    notes: ['F#min', 'C#min', 'Dmaj', 'Bmin', 'Emaj', 'Amaj', 'Dmaj', 'C#min', 'Amaj'],
    pattern: 'x_x_x_--'.repeat(8),
    sizzle: true
})
scribble.midi(chords, 'chords.mid')