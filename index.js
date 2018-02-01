paper = require('paper');
Fret = require("./node_modules/fretboard/src/fretboard.js");
$ = require("jquery");
Raphael = require("raphael")
Chord = require("./node_modules/vexchords/js/chord.js")

function convertToInt(el) {
    conv = parseInt(el)
    if (isNaN(conv)) {
        return el
    }
    else {
        return parseInt(el)
    }
}

function parseChord(str) {
    var array = str.split(/\r?\n/);
    var strings = []
    var bars = []
    var position = 0
    var position_text = ''
    for (i=0, len=array.length; i < len; i++) {
        line = array[i].trim()
        data = line.match(/[^\s]+/g)
        if (line.search('string') >= 0) {
            note = data.slice(1)
            note = note.map(convertToInt)
            strings.push(note)
        }
        else if (line.search('bar') >= 0) {
            var struct = {}
            struct['from_string'] = parseInt(data[1])
            struct['to_string'] = parseInt(data[2])
            struct['fret'] = parseInt(data[3])
            bars.push(struct)
        }
        else if (line.search('position') >= 0) {
            position = data[1]
        }
        else if (line.search('text') >= 0) {
            position_text = data[1]
        }
    }
    return [strings, position, bars, position_text]
}

// Get all div elements with class vex-tabdiv
content_width = $("div#wikipage").width()
console.log("Width: " + content_width)
tabdivs = $("div.vex-tabdivinit");
tabdivs.each(function( index ) {
    console.log("Div: " + index);
    console.log(this);
    console.log("Contents: " + $( this ).text());
    this.setAttribute("width", content_width)
    this.className = "vex-tabdiv"
    // div = new Vex.Flow.FretboardDiv($('div.vex-fretdiv'));
});

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


chorddivs = $("div.vex-chorddiv");
console.log(chorddivs);
chorddivs.each(function( index ) {
    console.log("Div: " + index);
    console.log(this);
    console.log("Contents: " + $( this ).text());
    res = parseChord($(this).text())
    this.innerHTML = ''
    strings = res[0]
    position = res[1]
    bars = res[2]
    position_text = res[3]
    var raphpaper = Raphael(this, 150, 140);
    var chord = new ChordBox(raphpaper, 30, 30);
    console.log(chord)
    console.log(raphpaper)
    console.log("Strings: ")
    console.log(strings)
    console.log("Position: ")
    console.log(position)
    console.log("Bars: ")
    console.log(bars)
    if (position_text == '') {
        chord.setChord(strings, position, bars)
    } else {
        chord.setChord(strings, position, bars, position_text)
    }
    chord.draw()
});

