# Introduction

This is my repo with a javascript code for rendering music notation in my
personal gitit wiki 

## Usage

To get rendered musical notation, fretboard diagrams, and chord diagrams in the
web representation of your markdown notes, you have access to codeblocks of three
different classes:

1) vextab: This is for rendering musical notation and tablature
2) vexfretboard: This is for rendering fretboard diagrams
3) vexchord: This is for rendering chord diagrams

You specify the class on a codeblock like so:

~~~~~~~~~~~~~
```{.classnamehere}
```
~~~~~~~~~~~~~

You can use a ~ instead of backticks to specify codeblocks. For more info about
what you can do with codeblocks, see the documentation for pandoc flavored
markdown  [here](https://pandoc.org/MANUAL.html#verbatim-code-blocks)


Inside the codeblocks, you would then use a mini-language that is specific to
the thing you're trying to render. This mini language is what allows you
specify chords, notes, etc. It gets parsed and rendered by some scripts behind
the scenes (full functionality described in the next section. I will not
document each mini language tool here, instead go to the links below for
examples and documentation about each tool:

- [vextab](http://vexflow.com/vextab/tutorial.html)
- [fretboard](http://my.vexflow.com/articles/119)
- chords: This is one I had to write a super simple parser for in javascript,
  so I have defined the mini language and it therefore wont be documented
  elsewhere. So there are three directives:

  1) **position:** Which position/fret the chord shape starts from. It takes a
     single number as an argument. You can also specify text here if you want,
     it just gets placed to the left of the first fret in the chord diagram
  2) **bar:** Specify a bar for a bar chord. It takes 3 numbers as arguments in the following order:
     fromstring, tostring, fret. Fret is specified relative to position. 
  3) **string**: Takes 2 numbers as arguments: string, fret. Fret is specified
     relative to position. One can specify an 'x' for the fret to indicate it
     should be muted
  4) **text**: Specify some text to label the chord diagram. Currently doesn't seem
     to render properly


Here are some examples of useage:

**Tablature via vextab:**

```{.vextab}
options space=20
tabstave
notation=true
key=A time=3/4

notes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |
notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4
text :w, |#segno, ,|, :hd, , #tr
```

**Fretboard diagram via fretboard:**

```{.vexfretboard}
fretboard
show frets=3,4,5 string=1
show frets=3,4,5 string=2 color=red
show fret=3 string=6 text=G
show notes=10/1,10/2,9/3,9/4
```

**Chord shape via vexchord:**

```{.vexchord}
position 3
bar 2 1 1
string 5 0
string 4 3
string 3 2
string 6 x
```

## How it Works

This ended up requiring multiple pieces that were in themselves pretty simple,
but required learning a lot of new stuff and got complicated in how they all
connected. 

So first, I had to modify a simple Haskell plugin for gitit that parses the
codeblocks mentioned above and places their contents into HTML divs with
special class names that are easy to identify. This plugin is located in 
[this file](./Vextab.hs)

Once the contents were on the pages in the proper divs, I had to write some
Javascript to take the mini language inside those divs and render them. This
code is only used for the fretboard and chord divs, and is located at [this git repo](https://github.com/kwrobert/musicrender).
All the javascript code depends on the [VexChord](https://github.com/0xfe/vexchords) and 
[VexFretboard](https://github.com/0xfe/fretboard) javascript libs.

For the tablature and notation, I just used the prewritten scripts in the
[Vextab](https://github.com/0xfe/vextab) library. 

Both my musicrender script and the Vextab scripts are included in script tags
at the bottom of the page template
[here](file:~/wiki/wikidata/templates/page.st). 

I also added some CSS to make chord diagrams line up left to right at the same
height instead of stacking on top of each other. That is simple and is located 
[here](file:~/wiki/wikidata/static/css/vex.css)

I also made tablature expand to the width of the content section in the wiki
page. This required modifying the Haskell plugin to write out an "initial" div
with a unique class. I use my musicrender javascript lib to grab the width of
the wikipage divs, grab all the divs with the special class, set the width
attribute on those divs, then change their class to vex-tabdiv so they get
picked up and rendered by the stock vextab script included at the bottom of the
page template.

I think that's about it. It all works quite nicely thus far, with a few little
hang ups here and there.

# Installing

Thanks to the npm package manager, its actually not so bad to get this set up. You'll need to install node. Do so with 

```
sudo apt install nodejs nodejs-legacy
```

This `nodejs-legacy` package just adds a symlink so you can run things on the
command line with `node`. Install all dependencies with

```
npm install
```

Next, globally install the browserify command line tool for bundling node
dependencies into the main client side script

```
sudo npm install -g browserify
```

Now just compile the `index.js` file with `browserify` and you should be
ready to roll

```
browserify index.js -o bundle.js
```

Just include the `bundle.js` file in your HTML page via 

```
<script src=/path/to/bundle.js></script>
```

and you should get nicely rendered fretboards in your page!
