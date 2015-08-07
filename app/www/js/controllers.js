angular.module('starter.controllers', [])

    .controller('HomeFindCtrl', function ($scope, $timeout) {
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
