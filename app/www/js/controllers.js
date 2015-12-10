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

        $scope.logout = function () {
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

        function goToHomePage() {
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

    .controller('MemoCtrl', function ($scope, Memos, $location) {
        $scope.newMemo = {
            word: '',
            meaning: '',
            notes: []
        }
        $scope.tempMemo = {
            newNoteItem: null
        }
        $scope.noWord = true;
        $scope.memos = Memos.all();
        $scope.addToNotes = function () {
            console.log('called add note');
            if (!$scope.tempMemo.newNoteItem || $scope.tempMemo.newNoteItem.replace(/\s+/g, '') == '') {
                $scope.tempMemo.newNoteItem = null;
                console.log('note is empty');
            }
            else {
                $scope.newMemo.notes.push({
                    content: $scope.tempMemo.newNoteItem + '',
                    isEditing: false
                });
                $scope.tempMemo.newNoteItem = null;
                console.log('note added');
                console.log('notes: ', $scope.newMemo.notes);
            }
        }
        //$scope.captureAudio = function () {
        //    var options = {limit: 3, duration: 10};
        //
        //    $cordovaCapture.captureAudio(options).then(function (audioData) {
        //        console.log('audio data: ', audioData);
        //    }, function (err) {
        //        // An error occurred. Show a message to the user
        //    });
        //}
        $scope.addWord = function () {
            console.log('add word');
            $scope.memos.push($scope.newMemo);
            $location.path('/memohome');
        }
        // Record audio
        //$scope.startRecording = function () {
        //    //var time = new Date().getTime(),
        //    var time = new Date().getTime(),
        //        src = "../src/audios/123.mp3",
        //        //src = "../src/audios/"+new Date().getTime()+".mp3",
        //        media = $cordovaMedia.newMedia(src);
        //
        //    // Record audio
        //    media.startRecord();
        //
        //    return time;
        //}

        $scope.startRecording = function () {
            console.log('called record audio');
            console.log('media object: '+ Media);
            var src = "/Users/kyle.kan/WebstormProjects/learn/app/www/audio/test.wav";
            var mediaRec = new Media(src,
                // success callback
                function () {
                    alert("recordAudio():Audio Success");
                },

                // error callback
                function (err) {
                    alert("recordAudio():Audio Error: " + err.message);
                });

            // Record audio
            mediaRec.startRecord();
        }

        $scope.stopRecording = function (time) {
            var src = "audios/test.m4a";
            var mediaRec = new Media(src,
                // success callback
                function () {
                    alert("stop Audio():Audio Success");
                },

                // error callback
                function (err) {
                    alert("stop Audio():Audio Error: " + err.code);
                });

            mediaRec.stopRecord();
        }

        $scope.playRecord = function (time) {
            var src = "http://download.wavetlan.com/SVV/Media/HTTP/WAV/Media-Convert/Media-Convert_test1_Alaw_Mono_VBR_8SS_16000Hz.wav";
            var mediaRec = new Media(src,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },

                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err.message);
                });

            mediaRec.play();
        }

        $scope.$watch(
            // This function returns the value being watched. It is called for each turn of the $digest loop
            function () {
                return $scope.newMemo.word;
            },
            // This is the change listener, called when the value returned from the above function changes
            function (newValue, oldValue) {
                console.log('watch called');
                if (newValue !== oldValue) {
                    // Only increment the counter if the value changed
                    $scope.noWord = newValue.length >= 1 ? newValue.replace(/\s+/g, '') < 1 : true;

                    console.log('noWord?', $scope.noWord);
                }
            }
        );

        //recorder
        //$scope.recorder = new Object;
        $scope.recorderStop = function() {
            console.log('===========================\nstop recording');
            window.plugins.audioRecorderAPI.stop(function(msg) {
                // success
                alert('ok: ' + msg);
            }, function(msg) {
                // failed
                alert('ko: ' + msg);
            });
        }
        $scope.recorderRecord = function() {
            console.log('===========================\nstart recording');
            console.log('api: '+window.plugins.audioRecorderAPI);
            window.plugins.audioRecorderAPI.record(function(msg) {
                // complete
                alert('ok: ' + msg);
            }, function(msg) {
                // failed
                alert('ko: ' + msg);
            }, 30); // record 30 seconds
        }
        $scope.recorderPlayback = function() {
            console.log('===========================\nplay recording');
            window.plugins.audioRecorderAPI.playback(function(msg) {
                // complete
                alert('ok: ' + msg);
            }, function(msg) {
                // failed
                alert('ko: ' + msg);
            });
        }
    })

    .controller('MessageInBottleCtrl', function ($scope, $ionicPopover) {

        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        //$scope.popover = $ionicPopover.fromTemplate(template, {
        //    scope: $scope
        //});

        $scope.popover = $ionicPopover.fromTemplateUrl('templates/popoverMessageInBottle.html', {
            scope: $scope
        }).then(function (popover) {
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

        $scope.notAboutMe = function () {
            $scope.aboutMe = false;
        }

        $scope.isAboutMe = function () {
            $scope.aboutMe = true;
        }
    })
;
