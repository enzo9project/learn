angular.module('starter.controllers', [])

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
