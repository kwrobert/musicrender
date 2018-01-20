// Load VexTab module.
paper = require('paper');
Fret = require("./node_modules/fretboard/src/fretboard.js");
$ = require("jquery");
_ = require("lodash");

// VexTab = vextab.VexTab;
// Artist = vextab.Artist;
// Renderer = vextab.Vex.Flow.Renderer;

// Artist.DEBUG = true;
// VexTab.DEBUG = true;

// Get all div elements with class vex-tabdiv
fretdivs = $("div.vex-fretdiv");
console.log(fretdivs);
fretdivs.each(function( index ) {
    console.log("Div: " + index);
    console.log(this);
    console.log("Contents: " + $( this ).text());
    // div = new Vex.Flow.FretboardDiv($('div.vex-fretdiv'));
    div = new Vex.Flow.FretboardDiv($(this), 'vex-fretdiv' + index)
    div.build()
});
