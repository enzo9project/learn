angular.module('starter.controllers', [])

    //chat functions
    .controller('ChatCtrl', function($scope, Chats) {
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
