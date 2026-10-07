# 🎥 Streaming Informative videos App
This repository implements an application for streaming informative videos, aimed at professionals, businesses, and learners.
This application provides free access to information in video form: users sign up or log in, browse and search videos, interact with channels and comments, and manage saved videos and profiles.
The React Native app routes users through these screens and uses an Axios service layer to call an Express/Mongoose backend.
The backend separates HTTP routes, domain controllers, and MongoDB models.

## 🧱 Architecture Overview
<img width="7425" height="8131" alt="diagram (4)" src="https://github.com/user-attachments/assets/3c5fb83b-cbfc-4b82-a080-cb8580c90ac7" />

## 📁 Structure
```
Directory structure:
└── nourchene-hamrita-streamingapp/
    ├── myapp/
    │   ├── App.js
    │   ├── app.json
    │   ├── babel.config.js
    │   ├── gradlew
    │   ├── gradlew.bat
    │   ├── index.js
    │   ├── metro.config.js
    │   ├── package.json
    │   ├── .buckconfig
    │   ├── .eslintrc.js
    │   ├── .flowconfig
    │   ├── .prettierrc.js
    │   ├── .watchmanconfig
    │   ├── __tests__/
    │   │   └── App-test.js
    │   ├── actions/
    │   │   └── user.actions.js
    │   ├── android/
    │   │   ├── gradle.properties
    │   │   ├── gradlew
    │   │   ├── gradlew.bat
    │   │   ├── app/
    │   │   │   ├── _BUCK
    │   │   │   ├── build_defs.bzl
    │   │   │   ├── debug.keystore
    │   │   │   ├── proguard-rules.pro
    │   │   │   └── src/
    │   │   │       ├── debug/
    │   │   │       │   ├── AndroidManifest.xml
    │   │   │       │   └── java/
    │   │   │       │       └── com/
    │   │   │       │           └── myapp/
    │   │   │       │               └── ReactNativeFlipper.java
    │   │   │       └── main/
    │   │   │           ├── AndroidManifest.xml
    │   │   │           ├── java/
    │   │   │           │   └── com/
    │   │   │           │       └── myapp/
    │   │   │           │           ├── MainActivity.java
    │   │   │           │           └── MainApplication.java
    │   │   │           └── res/
    │   │   │               └── values/
    │   │   │                   ├── strings.xml
    │   │   │                   └── styles.xml
    │   │   └── gradle/
    │   │       └── wrapper/
    │   │           └── gradle-wrapper.properties
    │   ├── components/
    │   │   ├── CustomHeader.js
    │   │   ├── SideBar.js
    │   │   ├── Tab1.js
    │   │   ├── Tab2.js
    │   │   ├── Tab3.js
    │   │   ├── utils.js
    │   │   ├── VideoItem.js
    │   │   └── Posts/
    │   │       ├── EditPost.js
    │   │       ├── Post.js
    │   │       └── style.js
    │   ├── gradle/
    │   │   └── wrapper/
    │   │       └── gradle-wrapper.properties
    │   ├── ios/
    │   │   ├── Podfile
    │   │   ├── myapp/
    │   │   │   ├── AppDelegate.h
    │   │   │   ├── AppDelegate.m
    │   │   │   ├── Info.plist
    │   │   │   ├── LaunchScreen.storyboard
    │   │   │   ├── main.m
    │   │   │   └── Images.xcassets/
    │   │   │       ├── Contents.json
    │   │   │       └── AppIcon.appiconset/
    │   │   │           └── Contents.json
    │   │   ├── myapp-tvOS/
    │   │   │   └── Info.plist
    │   │   ├── myapp-tvOSTests/
    │   │   │   └── Info.plist
    │   │   └── myappTests/
    │   │       ├── Info.plist
    │   │       └── myappTests.m
    │   ├── navigations/
    │   │   ├── Navigation.js
    │   │   └── stack.js
    │   ├── reducers/
    │   │   ├── index.js
    │   │   └── user.reducer.js
    │   ├── Screens/
    │   │   ├── AddChannel.js
    │   │   ├── AddComment.js
    │   │   ├── Channel.js
    │   │   ├── FirstTab.js
    │   │   ├── Header.js
    │   │   ├── history.js
    │   │   ├── Home.js
    │   │   ├── Library.js
    │   │   ├── Login.js
    │   │   ├── Notifications.js
    │   │   ├── Playlist.js
    │   │   ├── Profile.js
    │   │   ├── Recommandation.js
    │   │   ├── Result.js
    │   │   ├── Routes.js
    │   │   ├── Saved.js
    │   │   ├── Search.js
    │   │   ├── SecondTab.js
    │   │   ├── SignUp.js
    │   │   └── Subscription.js
    │   ├── services/
    │   │   └── apis.js
    │   └── Styles/
    │       └── style.js
    └── Server/
        ├── Connection.js
        ├── package.json
        ├── components/
        │   ├── Dashboard.jsx
        │   ├── picture.jsx
        │   └── video.jsx
        ├── config/
        │   └── db.js
        ├── Controllers/
        │   ├── authController.js
        │   ├── ChannelController.js
        │   ├── CommentController.js
        │   ├── followingController.js
        │   ├── SavedController.js
        │   ├── UserController.js
        │   └── VideoController.js
        ├── middleware/
        │   └── auth.middleware.js
        ├── Models/
        │   ├── channel.model.js
        │   ├── comment.model.js
        │   ├── following.model.js
        │   ├── saved.model.js
        │   ├── user.model.js
        │   └── video.model.js
        ├── Routes/
        │   ├── admin.routes.js
        │   ├── channel.routes.js
        │   ├── comment.routes.js
        │   ├── following.routes.js
        │   ├── saved.routes.js
        │   ├── user.routes.js
        │   └── video.routes.js
        ├── Utils/
        │   └── errors.util.js
        └── .adminbro/
            └── .entry.js

