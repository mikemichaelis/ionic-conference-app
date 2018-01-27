<?xml version='1.0' encoding='utf-8'?>
<widget android-versionCode="2" id="com.reflectionship.mobile" ios-CFBundleVersion="0.0.1" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>reflectionship-mobile</name>
    <allow-navigation href="http://ionic.local/*" />
    <allow-navigation href="http://192.168.3.102:8100" />
    <allow-navigation href="http://192.168.3.104:8100" />
    <allow-navigation href="http://192.168.3.106:8100" />
    <allow-navigation href="http://140.170.227.119:8100" />
    <allow-navigation href="http://10.35.17.107:8100" />
    <platform name="android">
        <allow-intent href="market:*" />
        <icon density="ldpi" src="resources/android/icon/drawable-ldpi-icon.png" />
        <icon density="mdpi" src="resources/android/icon/drawable-mdpi-icon.png" />
        <icon density="hdpi" src="resources/android/icon/drawable-hdpi-icon.png" />
        <icon density="xhdpi" src="resources/android/icon/drawable-xhdpi-icon.png" />
        <icon density="xxhdpi" src="resources/android/icon/drawable-xxhdpi-icon.png" />
        <icon density="xxxhdpi" src="resources/android/icon/drawable-xxxhdpi-icon.png" />
        <splash density="land-ldpi" src="resources/android/splash/drawable-land-ldpi-screen.png" />
        <splash density="land-mdpi" src="resources/android/splash/drawable-land-mdpi-screen.png" />
        <splash density="land-hdpi" src="resources/android/splash/drawable-land-hdpi-screen.png" />
        <splash density="land-xhdpi" src="resources/android/splash/drawable-land-xhdpi-screen.png" />
        <splash density="land-xxhdpi" src="resources/android/splash/drawable-land-xxhdpi-screen.png" />
        <splash density="land-xxxhdpi" src="resources/android/splash/drawable-land-xxxhdpi-screen.png" />
        <splash density="port-ldpi" src="resources/android/splash/drawable-port-ldpi-screen.png" />
        <splash density="port-mdpi" src="resources/android/splash/drawable-port-mdpi-screen.png" />
        <splash density="port-hdpi" src="resources/android/splash/drawable-port-hdpi-screen.png" />
        <splash density="port-xhdpi" src="resources/android/splash/drawable-port-xhdpi-screen.png" />
        <splash density="port-xxhdpi" src="resources/android/splash/drawable-port-xxhdpi-screen.png" />
        <splash density="port-xxxhdpi" src="resources/android/splash/drawable-port-xxxhdpi-screen.png" />
    </platform>
    <preference name="AndroidLaunchMode" value="singleTask" />
    <preference name="webviewbounce" value="false" />
    <preference name="UIWebViewBounce" value="false" />
    <preference name="DisallowOverscroll" value="true" />
    <preference name="SplashShowOnlyFirstTime" value="false" />
    <plugin name="cordova-plugin-safariviewcontroller" spec="^1.5.1" />
    <plugin name="cordova-plugin-console" spec="^1.1.0" />
    <plugin name="cordova-sqlite-storage" spec="^2.1.2" />
    <plugin name="ionic-plugin-keyboard" spec="^2.2.1" />
    <plugin name="cordova-plugin-uniquedeviceid" spec="^1.3.2" />
    <plugin name="cordova-plugin-local-notification" spec="^0.8.4" />
    <plugin name="cordova-plugin-geolocation" spec="^2.4.3" />
    <plugin name="cordova-plugin-file" spec="^4.3.3" />
    <plugin name="cordova-plugin-network-information" spec="^1.3.4" />
    <plugin name="cordova-plugin-customurlscheme" spec="^4.3.0">
        <variable name="URL_SCHEME" value="com.reflectionship.mobile" />
        <variable name="ANDROID_SCHEME" value="com.reflectionship.mobile" />
        <variable name="ANDROID_HOST" value="mikemichaelis.auth0.com" />
        <variable name="ANDROID_PATHPREFIX" value="/cordova/com.reflectionship.mobile/callback" />
    </plugin>
    <plugin name="cordova-plugin-ionic" spec="^1.1.9">
        <variable name="APP_ID" value="ad1e2c60" />
        <variable name="CHANNEL_NAME" value="Master" />
        <variable name="UPDATE_METHOD" value="auto" />
        <variable name="UPDATE_API" value="https://api.ionicjs.com" />
        <variable name="MAX_STORE" value="2" />
    </plugin>
    <plugin name="cordova-plugin-firebase" spec="^0.1.25" />
    <hook src="scripts/incrementBuildNum.js" type="after_build" />
    <engine name="browser" spec="~5.0.3" />
    <engine name="android" spec="~6.4.0" />
    <plugin name="com.synconset.imagepicker" spec="~2.1.8">
        <variable name="PHOTO_LIBRARY_USAGE_DESCRIPTION" value="your usage message" />
    </plugin>
</widget>
