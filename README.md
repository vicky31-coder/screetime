----------
#Screetime 
----------
##Screetime is a app for ultilizing any old mobile phone or your regular phone screen by making it a minimalistic clock displaying date, 
  day and time with battery percentage since it is first release of the app the app focusses on basic workablity of the app rather than 
  the aestectic parts of the app. The app have no touchables (AKA - Button or touchables items) since the app is built specially for 
  phones that suffer from ghost touch but Svreetime is used as a small desktop clock which adds a nice touch to the desktop.
----------
Usecase: Minimalistic Desktop clock
----------
The App is devoloped in react-native (Expo-cli)
----------
* Devolopment Tools
* Node.js 
* NPM for package management (alternatively u can use yarn)
* Expo-cli for devolopment and debugging
* EAS (expo application services) for building releases
* Android studio for native android error rectification
* Git for version control
----------
Setting up the devolopment Environment
----------
* Installation of Node.js -preferably (v20)
* Choosing package manager like yarn or NPM (I used NPM)
* Installing Expo-cli - `npm i expo-cli` (will install the local-cli)
  If you install global-cli it will throw an warning since the local-cli 
  superseeded the global-cli 
* Create a expo app by - `npx create-expo-app@latest --template` 
  blank template will make a app project directory with javascript 
  Project name shoud be specified
* Starting a devolopment server `npx expo start`
  now u can use a android emulator for debug and devolop the project 
  alterntaively u can also EXPO go app in android for development
----------
Setting up the Build Environment 
----------
* The build or release of the project is done by EAS (expo application services)
    where they offer to build services and much more in the free tier
* Installation of eas-cli  `npm install -g eas-cli` - will install eas globally 
* before building of the apk package u should tune the eas.json in the root directory 
  can be found after when installing the eas-cli. if not running this command 
  `eas build -p android --profile preview` will generate the file 
*`eas build -p android --profile preview` - -p is the platform android or ios 
* `eas build -p android --profile preview` - preview is the build profile 
  devolopment and production are the other two profile where production build 
  will give the AAB file to publish in the play store
* if build is failing consider checking the ios or android folder in root directory
* if no android or ios folder is present run this command `npx expo prebuild` since 
  by default these folders are managed by expo-cli
* Installtion of Android studio is preferable to manually solve error in times 
  like failing build
* If you want to make changes edit configurations u can do it by opening the android
  folder in the root directory in android studio (For android only)
---------

