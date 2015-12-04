angular.module('starter.controllers', [])

    //find functions
    .controller('LoginCtrl', function ($scope, $window) {
        var ref = new Firebase("https://mimoapp.firebaseIO.com");

        $scope.isRegistering = false;
        $scope.credentials = {
            email: '',
            password: '',
            confirmPassword: ''
        };

        $scope.facebookLogin = function () {
            ref.authWithOAuthPopup("facebook", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    //$location.path('/chat');
                    goToHomePage();
                }
            });
            //Auth.$authWithOAuthRedirect("facebook").then(function (authData) {
            //    // User successfully logged in
            //    console.log('successfully logged into facebook');
            //    $location.path('/chat');
            //}, {
            //    remember: "sessionOnly"
            //}).catch(function (error) {
            //    if (error.code === "TRANSPORT_UNAVAILABLE") {
            //        Auth.$authWithOAuthPopup("facebook").then(function (authData) {
            //            // User successfully logged in. We can log to the console
            //            // since we’re using a popup here
            //            console.log(authData);
            //        });
            //    } else {
            //        // Another error occurred
            //        console.log(error);
            //    }
            //});
        }


        $scope.loginVerify = function () {
            ref.authWithPassword({
                email: $scope.credentials.email,
                password: $scope.credentials.password
            }, function (error, authData) {
                console.log('verifying user');
                clearCredentials();
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    goToHomePage();
                }
            }, {
                remember: "sessionOnly"
            });
        }

        $scope.createUser = function () {
            ref.createUser({
                email: $scope.credentials.email,
                password: $scope.credentials.password
            }, function (error, userData) {
                console.log('creating a user');
                clearCredentials();
                if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    goToHomePage();
                }
            });
        }

        $scope.logout = function(){
            ref.unauth();
        }

        $scope.toggleIsRegistering = function () {
            $scope.isRegistering = !$scope.isRegistering;
        }

        function clearCredentials() {
            console.log('clearing credentials');
            $scope.credentials = {
                email: '',
                password: '',
                confirmPassword: ''
            };
        }

        function goToHomePage () {
            var landingUrl = "http://" + $window.location.host + "/#/chat";
            $window.location.href = landingUrl;
            $window.open(landingUrl, "_self");
            console.log('called');
        }


    })

    //chat functions
    .controller('ChatCtrl', function ($scope, Chats, Auth) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
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

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    //find functions
    .controller('HomeFindCtrl', function ($scope, $timeout) {
    })

    .controller('MessageBoxCtrl', function ($scope, BottleMessages, ConnectionMessages) {
        $scope.chats = $scope.isConenctions ? ConnectionMessages.all() : BottleMessages.all();
        $scope.connectionMessages = ConnectionMessages.all();
        $scope.bottleMessages = BottleMessages.all();
        $scope.isConenctions = true;
        $scope.viewTitle = $scope.isConenctions ? 'Connections' : 'Bottles';
        $scope.toggleIsConnections = function () {
            $scope.isConenctions = !$scope.isConenctions;
            $scope.viewTitle = $scope.isConenctions ? 'Connections' : 'Bottles';
        }
        $scope.remove = function (chat) {
            var chats = $scope.isConenctions ? ConnectionMessages : BottleMessages;
            chats.remove(chat);
        };
    })

    .controller('MessageInBottleCtrl', function ($scope, $ionicPopover) {

        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        //$scope.popover = $ionicPopover.fromTemplate(template, {
        //    scope: $scope
        //});

        $scope.popover = $ionicPopover.fromTemplateUrl('templates/popoverMessageInBottle.html', {
            scope: $scope
        }).then(function(popover){
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function () {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function () {
            // Execute action
        });

    })

    .controller('MatchFindCtrl', function ($scope, $timeout) {

        $scope.aboutMe = true;

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

        $timeout(function () {
            $('.match-find .carousel').slick({
                dots: true
            });
        });

        $scope.notAboutMe = function(){
            $scope.aboutMe = false;
        }

        $scope.isAboutMe = function(){
            $scope.aboutMe = true;
        }
    })
;
