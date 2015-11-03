// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .directive('tapDetector',function($ionicGesture,$ionicScrollDelegate){
        return{
            restrict:'EA',
            link:function(scope,element){
                var startX,startY,isDown=false;
                element.bind("mousedown touchstart", function(e){
                    e=(e.touches)?e.touches[0]:e;//e.touches[0] is for ios
                    startX = e.clientX;
                    startY = e.clientY;
                    isDown=true;
                    //console.log("mousedown",startX,startY);
                });

                element.bind("mousemove touchmove", function(e){
                    e=(e.touches)?e.touches[0]:e;//e.touches[0] is for ios
                    if(isDown){
                        var deltaX = Math.abs(e.clientX - startX);
                        var deltaY = Math.abs(e.clientY - startY);

                        if(deltaX > deltaY) {
                            //console.log("horizontal move");
                            $ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(true);
                        }
                    }
                });

                element.bind("mouseup touchend", function(e){
                    isDown=false;
                    $ionicScrollDelegate.$getByHandle('mainScroll').freezeScroll(false);
                    //console.log("mouseup touchend");
                });
            }
        }
    })


    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })

            .state('chat', {
                url: '/chat',
                templateUrl: 'templates/chat.html'
            })

            .state('chatDetail', {
                url: '/chat/:chatId',
                templateUrl: 'templates/chatDetail.html'
            })

            //.state('chatDetail', {
            //    url: '/chat/:chatId',
            //    views: {
            //        'chatDetail': {
            //            templateUrl: 'templates/chatDetail.html',
            //            controller: 'ChatDetailCtrl'
            //        }
            //    }
            //})

            .state('homeFind', {
                url: '/homefind',
                templateUrl: 'templates/homeFind.html'
            })

            .state('messageInBottle', {
                url: '/messageinbottle',
                templateUrl: 'templates/messageInBottle.html'
            })

            .state('matchFind', {
                url: '/matchfind',
                templateUrl: 'templates/matchFind.html'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
