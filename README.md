<div align="center">

  <h1>Instagram like social media application</h1>
  
  <p>
    Created this social media application in React Native with pleasant UI where users can Log in/Signup and log out, Post pictures, edit profile, view other user’s profile and posts, like, comment on user’s posts, and save posts. The purpose of creating this project was to sharpen up my UI/UX as well as programming skills in JavaScript and react native 
  </p>
  
</div>

<br />

<!-- About the Project -->

## :star2: About the Project

<!-- Screenshots -->

### :camera: Demo video of the application

<div align="center">

https://user-images.githubusercontent.com/34532828/189505007-884e062b-263b-45c7-b820-75a7fb6270ab.mp4

</div>

<!-- TechStack -->

### :space_invader: Tools, Technologies, APIs, and Services used:

- Created application using Expo CLI and leveraged Expo Libraries such as expo-camera, expo-image-picker, expo-permissions, and expo-location for basic features of the application like, clicking pictures, selecting images from system storage, getting user location, and checking various system permissions.
- react-navigation and its components such as bottom-tabs, material-top-tab-navigation, and native-stack to create navigation flow within the application.
- react-native-elements and react-native-paper to create various UI components
- Firebase for back-end needs, google cloud storage for storage purposes, and Firebase Auth for authentication purposes.
- Redux for storing and persisting data

<!-- Features -->

## :dart: Features

- User singin/ signup to the application using their email id
- Uers can post pictures in the application
- Users can view, like and save other user's posts
- users can view other user's profile by searching their name

## Additional steps required to make this project work for you.

> To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)), [Android Studio](https://developer.android.com/studio)(if you want to run on android), [Xcode](https://developer.apple.com/xcode/)(if you want to run on iOS) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/udkhatri/SocialShare.git
# Go into the repository
$ cd SocialShare
```

> Go to firebase console and create a new project
> Go to project setting and copy the Firebase configuration code (firebaseConfig)
> Follow below file structure to create a new file named firebaeConfig.js

    .
    ├── ...
    ├── components                  # Open component folder
    │   ├── Main                    # open main folder
    │   ├── firebaseConfig.js       # create this new file
    └── ...

> After creating this file add below lines to the file

```javascript
export const firebaseConfig = {
  // paste the copied code from the firebae console
  ...
  ...
};
```

> Open terminal at the root folder and type bellow command in terminal

```
npm install
expo start
```

> you will see a QR code in your terminal scan that from your device and app will be runnning to your phone

## You may also like...

- [Weather app in iOS](https://github.com/udkhatri/WeatherAppIos)
- [tikTok clone in react native](https://github.com/udkhatri/TikTokClone)
- [recepie finding sand saving progressive web app](https://github.com/udkhatri/PWAProject)
