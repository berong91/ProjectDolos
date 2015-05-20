GROUP 16 - Project Dolos

Code Structure

|   index.html      # Our main html code.    
|   sql.php         # Basic backend code
|   test.php        #
|   
+---asset           # This folder store all music and picture files.
+---css             # This folder store our css style.
+---lib             # This folder store Phaser Framework library
+---mvc             # Basic mvc control.
+---src             # Our main code.
|       main.js                 # This is the main referecens file. 
                                # It stores a reference of all other js files in this folder.
|       Boot.js                 # Load boot screen
|       Preload.js              # Load all images and sounds
|       MainMenu.js             # Load main menu screen
|       LeaderBoard.js          # Load leader board screen
|       LevelSelect.js          # Load level select screen
|       Game.js                 # Our main game engine over here.
|       WinScreen.js            # Load level finish screen        
|       Generator.js            # We haven't use this file yet
|       Main Pseudo-Code.js     # We haven't use this file yet


index.html imports JQuerry library from Google Hosted Library and Phaser Framework library from lib folder.
It also imports all game's engine files from src folder.

sql.php and test.php need mysql on our server in order to work properly.

The online version of the site can be access at http://tylertrepanier.ca/dolos

========================
|   index.html
|   info.txt
|   output.txt
|   sql.php
|   test.php
|   
+---asset
|   |   TF2.ttf
|   |   
|   +---audio
|   |       bgsong.ogg
|   |       cash register.wav
|   |       coins (1).wav
|   |       coins (2).wav
|   |       coins (3).wav
|   |       collect.ogg
|   |       elevator.wav
|   |       explosion.ogg
|   |       explosion.wav
|   |       flea.mp3
|   |       level start.wav
|   |       list.txt
|   |       long explosion.wav
|   |       switch.wav
|   |       
|   \---images
|       |   background.png
|       |   BG 480x800.png
|       |   bg.jpg
|       |   bgSmall.png
|       |   fancy logo small.png
|       |   fancy.png
|       |   fire.png
|       |   progress.png
|       |   progress2.png
|       |   rules.png
|       |   sound off.png
|       |   sound on.png
|       |   SS 480x800.png
|       |   SS 720x1280.png
|       |   start-button.png
|       |   terrain.png
|       |   wood.png
|       |   
|       +---buttons
|       |       acheivementsDown.png
|       |       acheivementsUp.png
|       |       backDown.png
|       |       backUp.png
|       |       blankBigDown.png
|       |       blankBigUp.png
|       |       blankSmallDown.png
|       |       blankSmallUp.png
|       |       button template big.psd
|       |       button template smal.psd
|       |       continueDown.png
|       |       continueUp.png
|       |       forgotDown.png
|       |       forgotUp.png
|       |       guestDown.png
|       |       guestUp.png
|       |       highScoresDown.png
|       |       highScoresUp.png
|       |       loginDown.png
|       |       loginUp.png
|       |       newDown.png
|       |       newUp.png
|       |       nextVehicle.png
|       |       pauseDown.png
|       |       pauseUp.png
|       |       progress.png
|       |       progressColoured.png
|       |       registerDown.png
|       |       registerUp.png
|       |       restartDown.png
|       |       restartUp.png
|       |       soundOffDown.png
|       |       soundOffUp.png
|       |       soundOnDown.png
|       |       soundOnUp.png
|       |       startDown.png
|       |       startUp.png
|       |       
|       +---SorryChris
|       |       gameend.png
|       |       level1.png
|       |       level2.png
|       |       level3.png
|       |       level4.png
|       |       level5.png
|       |       lose.png
|       |       SelectLogo.png
|       |       tutorial.png
|       |       win.png
|       |       
|       \---spritesheets
|               boat100.png
|               boat200.png
|               boat300.png
|               glow example.png
|               glow100.png
|               glow200.png
|               glow300.png
|               plane100.png
|               plane200.png
|               plane300.png
|               terrain100.png
|               terrain100Flip.png
|               terrain200.png
|               terrain200Flip.png
|               terrain300.png
|               terrain300Flip.png
|               train100.png
|               train200.png
|               train300.png
|               
+---css
|       stylesheet.css
|       
+---icons
|       icon.png
|       
+---lib
|   \---phaser
|       |   config.php
|       |   phaser.js
|       |   phaser.map
|       |   phaser.min.js
|       |   
|       \---custom
|               phaser-arcade-physics.js
|               phaser-arcade-physics.map
|               phaser-arcade-physics.min.js
|               phaser-minimum.js
|               phaser-minimum.map
|               phaser-minimum.min.js
|               phaser-no-physics.js
|               phaser-no-physics.map
|               phaser-no-physics.min.js
|               
+---login
|   |   index.html
|   |   login.php
|   |   logo.png
|   |   
|   +---app_framework
|   |   |   appframework.js
|   |   |   appframework.ui.js
|   |   |   
|   |   +---2.1
|   |   |   |   appframework.js
|   |   |   |   appframework.ui.js
|   |   |   |   
|   |   |   \---css
|   |   |           af.ui.min.css
|   |   |           icons.min.css
|   |   |           
|   |   \---css
|   |           af.ui.min.css
|   |           icons.min.css
|   |           
|   +---console
|   |       console_widget.js
|   |       
|   +---css
|   |   |   index_main.less.css
|   |   |   old-android.css
|   |   |   
|   |   \---index
|   |       |   af-label-position.less
|   |       |   afui-header.less
|   |       |   bootstrap-button-group.less
|   |       |   bootstrap-button.less
|   |       |   bootstrap-checkbox.less
|   |       |   bootstrap-flex-group.less
|   |       |   bootstrap-label-position.less
|   |       |   bootstrap-radio.less
|   |       |   console_widget.less
|   |       |   defaults.less
|   |       |   iframe-outer.less
|   |       |   image-alignment.less
|   |       |   index_main.less
|   |       |   receptacle-alignment.less
|   |       |   uib-button-bar.less
|   |       |   uib-header-footer.less
|   |       |   uib_row_1.less
|   |       |   uib_row_2.less
|   |       |   uib_row_3.less
|   |       |   
|   |       \---styles
|   |               active-graphic-button -- active.less
|   |               Background -- custom.less
|   |               BG -- custom.less
|   |               ButtonMargins -- margins.less
|   |               center -- text_para.less
|   |               CenteredButton -- margins.less
|   |               Center_Login_Button -- custom.less
|   |               Color -- background_page.less
|   |               d-margins -- margins.less
|   |               default-button-bar-height -- height.less
|   |               default-graphic-button -- default.less
|   |               default-graphic-sizing -- graphic_sizing.less
|   |               default-graphic-text -- text.less
|   |               default-image-sizing -- graphic_image_sizing.less
|   |               font -- sizing_header.less
|   |               footer-bg -- background.less
|   |               gauge -- height_important.less
|   |               grid-pad -- padding.less
|   |               header-bg -- background.less
|   |               Heading -- text_para.less
|   |               hover-graphic-button -- hover.less
|   |               iframe-size -- iframe_sizing.less
|   |               Label_Color -- text_label.less
|   |               loginbuttonmargin -- margins.less
|   |               loginmargins -- margins.less
|   |               logomargins -- margins.less
|   |               Margins -- custom.less
|   |               Popup_Margins -- custom.less
|   |               Register_Margins -- margins.less
|   |               row-height-1 -- row_height.less
|   |               row-height-2 -- row_height.less
|   |               row-height-3 -- row_height.less
|   |               scale-image -- image_sizing_no_scale.less
|   |               SoRound -- round_button.less
|   |               style-45 -- background_page.less
|   |               TextColor -- custom.less
|   |               
|   +---images
|   |       Arrow.png
|   |       Checkmark.png
|   |       Exclaim.png
|   |       gamelogo.png
|   |       Strabburg.jpg
|   |       X.png
|   |       
|   +---js
|   |       index_user_scripts.js
|   |       init-app.js
|   |       init-dev.js
|   |       Login.js
|   |       
|   +---justgage
|   |   |   gauges.js
|   |   |   
|   |   \---js
|   |           justgage.min.js
|   |           raphael.min.js
|   |           
|   +---marginal
|   |       marginal-position.min.js
|   |       
|   +---media_button_bar
|   |   \---css
|   |           media_button_bar.css
|   |           
|   \---xdk
|       |   init-dev.js
|       |   
|       \---ad
|               bs_subpage.js
|               
+---mvc
|       Controller.php
|       index.php
|       Model.php
|       View.php
|       
+---src
|       Boot.js
|       Game.js
|       Generator.js
|       LeaderBoard.js
|       LevelSelect.js
|       LoseScreen.js
|       Main Pseudo-Code.js
|       main.js
|       MainMenu.js
|       Preload.js
|       WinScreen.js
|       
\---tile flip
    |   terrain flip.html
    |   terrain flip.js
    |   
    \---images
            terrain100Flip.png
            terrain200Flip.png
            terrain300Flip.png
            
