angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope) {
    })

    .controller('CardsCtrl', function ($scope, $ionicSwipeCardDelegate) {
        //var cardTypes = [{
        //    title: 'Swipe down to clear the card',
        //    image: 'img/pic.png'
        //}, {
        //    title: 'Where is this?',
        //    image: 'img/pic.png'
        //}, {
        //    title: 'What kind of grass is this?',
        //    image: 'img/pic2.png'
        //}, {
        //    title: 'What beach is this?',
        //    image: 'img/pic3.png'
        //}, {
        //    title: 'What kind of clouds are these?',
        //    image: 'img/pic4.png'
        //}];

        var cardTypes = [{
            title: 'Swipe down to clear the card',
            image: 'img/1.jpg'
        }, {
            title: 'Where is this?',
            image: 'img/2.jpeg'
        }, {
            title: 'What kind of grass is this?',
            image: 'img/3.jpg'
        }, {
            title: 'What beach is this?',
            image: 'img/4.jpg'
        }, {
            title: 'What kind of clouds are these?',
            image: 'img/5.jpg'
        }];

        $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

        $scope.cardSwiped = function (index) {
            $scope.addCard();
        };

        $scope.cardDestroyed = function (index) {
            $scope.cards.splice(index, 1);
        };

        $scope.addCard = function () {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        }

        $scope.cardSwiped();
    })

    .controller('CardCtrl', function ($scope, $ionicSwipeCardDelegate) {
        $scope.goAway = function () {
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
        };
    })
;
