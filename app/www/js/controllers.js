angular.module('starter.controllers', [])

    //find functions
    .controller('LoginCtrl', function ($scope, $timeout) {
        var ref = new Firebase("https://yeemo.firebaseio.com");

        $scope.loginVerify = function(){
            ref.authWithPassword({
                email    : "bobtony@firebase.com",
                password : "correcthorsebatterystaple"
            }, function(error, authData) { /* Your Code */ }, {
                remember: "sessionOnly"
            });
        }

        $scope.createUser = function(){
            ref.authWithPassword({
                email    : "bobtony@firebase.com",
                password : "correcthorsebatterystaple"
            }, function(error, authData) { /* Your Code */ }, {
                remember: "sessionOnly"
            });
        }
    })

    //chat functions
    .controller('ChatCtrl', function($scope, Chats, Auth) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
        //$scope.login = function() {
        //    console.log('called login');
        //
        //    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
        //        // User successfully logged in
        //        console.log('logged in successfully');
        //    }).catch(function(error) {
        //        if (error.code === "TRANSPORT_UNAVAILABLE") {
        //            Auth.$authWithOAuthPopup("facebook").then(function(authData) {
        //                // User successfully logged in. We can log to the console
        //                // since we’re using a popup here
        //                console.log(authData);
        //            });
        //        } else {
        //            // Another error occurred
        //            console.log(error);
        //        }
        //    });
        //};
        //Auth.$onAuth(function(authData) {
        //    if (authData === null) {
        //        console.log("Not logged in yet");
        //    } else {
        //        console.log("Logged in as", authData.uid);
        //    }
        //    $scope.authData = authData; // This will display the user's name in our view
        //});
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    //find functions
    .controller('HomeFindCtrl', function ($scope, $timeout) {
    })

    .controller('MessageInBottleCtrl', function ($scope, $ionicPopover) {

        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });

    })

    .controller('MatchFindCtrl', function ($scope, $timeout) {

        $scope.profiles = [
            {
                image: '1.jpg',
                passed: false,
                connected: false
            },
            {
                image: '2.jpeg',
                passed: false,
                connected: false
            },
            {
                image: '3.jpg',
                passed: false,
                connected: false
            }
        ];

        $timeout(function(){
            $('.match-find .carousel').slick({});
        });

        $scope.addLabel = function(index, profile){
            index == 0 ? profile.passed = true : profile.connected = true;
        }
    })
;
