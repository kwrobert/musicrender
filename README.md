# Introduction

This is my repo with a javascript code for rendering music notation in my
personal gitit wiki 

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
