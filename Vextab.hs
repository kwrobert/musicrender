module Vextab (plugin) where
{- 
This plugin lays the groundwork for rendered musical notation output in the
html of wiki pages. It does so by taking the contents of code block with
specific classes, and placing the conents into HTML div elements with a special
class name. Example below:

```{.vexchord}
position 3
bar 2 1 1
string 5 0
string 4 3
string 3 2
string 6 x
```

License: GPL
written by Kohei OZAKI <i@smly.org>
modified by John MacFarlane to use withTempDir
modified by Kyle Robertson to acomplish a totally different goal
with the same basic functionality

-}

import Network.Gitit.Interface
import System.Process (system)
import System.Directory
import Data.ByteString.Lazy.UTF8 (fromString)
import Data.Digest.Pure.SHA
import System.FilePath
import Control.Monad.Trans (liftIO)

-- plugin has type Plugin, defined in Network.Gitit.Interface
plugin :: Plugin
-- Calls mkPageTransformM on transformBlock and assigns it to plugin
plugin = mkPageTransformM transformBlock

transformBlock :: Block -> PluginM Block
transformBlock (CodeBlock (_, classes, namevals) contents)
    | "vextab" `elem` classes = do
  cfg <- askConfig
  let text = concat ["<div class=vex-tabdivinit>\n", contents, "\n</div>"]
  return $ RawBlock (Format "html") text
    | "vexfretboard" `elem` classes = do
  cfg <- askConfig
  let text = concat ["<div class=vex-fretdiv>\n", contents, "\n</div>"]
  return $ RawBlock (Format "html") text
    | "vexchord" `elem` classes = do
  cfg <- askConfig
  let text = concat ["<div class=vex-chorddiv>\n", contents, "\n</div>"]
  return $ RawBlock (Format "html") text
transformBlock x = return x
