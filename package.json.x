{
  "scripts": {
    "test": "ng test",
    "karma": "karma start --browsers ChromeDebugging",
    "clean": "ionic-app-scripts clean",
    "ionic:build": "ionic-app-scripts build  --dev",
    "metadata": ".\\breeze-tools\\bin\\MetadataGenerator.exe -i ..\\reflectionship-api\\reflectionship-model\\bin\\Debug\\reflectionship-model.dll -o ./src/assets/metadata/metadata.json",
    "entities": "node ./breeze-tools/tsgen.js",
    "metadata-entities": "npm run metadata && npm run entities"
  },
  "config": {
    "ionic_source_map": "source-map"
  },
  "dependencies": {
    "@angular/cli": "^1.5.5",
    "@auth0/cordova": "^0.2.0",
    "@ionic-native/app-version": "^4.5.2",
    "@ionic-native/device": "^4.5.2",
    "@ionic-native/file": "^4.4.0",
    "@ionic-native/firebase": "^4.5.2",
    "@ionic-native/geolocation": "^4.4.0",
    "@ionic-native/image-picker": "^4.5.2",
    "@ionic-native/keyboard": "^3.4.2",
    "@ionic-native/network": "^4.4.0",
    "@ionic-native/unique-device-id": "^3.14.0",
    "@ngx-translate/core": "^9.0.1",
    "@ngx-translate/http-loader": "^0.1.0",
    "angular2-jwt": "^0.2.3",
    "auth0-js": "^8.9.3",
    "base64-js": "^1.2.1",
    "breeze-bridge-angular": "^4.0.1",
    "breeze-client": "^1.6.3",
    "cordova-browser": "~5.0.3",
    "cordova-plugin-add-swift-support": "^1.7.0",
    "cordova-plugin-app-event": "^1.2.1",
    "cordova-plugin-app-version": "^0.1.9",
    "cordova-plugin-compat": "^1.2.0",
    "cordova-plugin-console": "^1.1.0",
    "cordova-plugin-customurlscheme": "^4.3.0",
    "cordova-plugin-file": "^4.3.3",
    "cordova-plugin-firebase": "^0.1.25",
    "cordova-plugin-geolocation": "^2.4.3",
    "cordova-plugin-ionic": "^1.1.9",
    "cordova-plugin-local-notification": "^0.8.4",
    "cordova-plugin-network-information": "^1.3.4",
    "cordova-plugin-safariviewcontroller": "^1.5.2",
    "cordova-plugin-telerik-imagepicker": "^2.1.8",
    "cordova-plugin-uniquedeviceid": "^1.3.2",
    "cordova-sqlite-storage": "^2.1.5",
    "ionic-angular": "3.9.2",
    "ionic-plugin-keyboard": "^2.2.1",
    "le_js": "0.0.1",
    "lodash-es": "^4.17.4",
    "ng2-nvd3": "^2.0.0"
  },
  "devDependencies": {
    "@angular/cli": "^1.5.0",
    "@types/base64-js": "^1.2.5",
    "@types/jasmine": "^2.5.53",
    "@types/node": "^8.0.32",
    "codecov": "^2.2.0",
    "cordova-build-increment": "^0.1.0",
    "handlebars": "^4.0.10",
    "ionic": "3.19.0",
    "jasmine-core": "^2.6.4",
    "jasmine-spec-reporter": "^4.1.1",
    "karma": "^1.7.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^1.1.0",
    "karma-mocha-reporter": "^2.2.3",
    "karma-remap-istanbul": "^0.6.0",
    "ts-node": "^3.1.0",
    "tslint": "^5.7.0",
    "tslint-eslint-rules": "^4.1.1",
    "ws": "3.3.2"
  },
  "cordovaPlugins": [
    "cordova-plugin-whitelist",
    "cordova-plugin-console",
    "cordova-plugin-statusbar",
    "cordova-plugin-device",
    "cordova-plugin-splashscreen",
    "ionic-plugin-keyboard"
  ],
  "cordovaPlatforms": [],
  "cordova": {
    "plugins": {
      "cordova-plugin-safariviewcontroller": {},
      "cordova-plugin-console": {},
      "cordova-sqlite-storage": {},
      "ionic-plugin-keyboard": {},
      "cordova-plugin-uniquedeviceid": {},
      "cordova-plugin-ionic": {
        "APP_ID": "ad1e2c60",
        "CHANNEL_NAME": "Master",
        "UPDATE_METHOD": "auto",
        "UPDATE_API": "https://api.ionicjs.com",
        "MAX_STORE": "2"
      },
      "cordova-plugin-local-notification": {},
      "cordova-plugin-geolocation": {},
      "cordova-plugin-file": {},
      "cordova-plugin-network-information": {},
      "cordova-plugin-customurlscheme": {
        "URL_SCHEME": "com.reflectionship.mobile",
        "ANDROID_SCHEME": "com.reflectionship.mobile",
        "ANDROID_HOST": "mikemichaelis.auth0.com",
        "ANDROID_PATHPREFIX": "/cordova/com.reflectionship.mobile/callback"
      },
      "cordova-plugin-firebase": {},
      "cordova-plugin-app-version": {},
      "com.synconset.imagepicker": {
        "PHOTO_LIBRARY_USAGE_DESCRIPTION": "your usage message"
      }
    },
    "platforms": [
      "browser",
      "android"
    ]
  }
}
