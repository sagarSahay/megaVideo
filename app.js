/**
 * Created by Sagar on 07/07/2015.
 */
var app = angular.module("myApp", []);

app.directive("megaVideo", function ($sce) {
    return {
        restrict: 'E',
        templateUrl: 'megaVideo-template.html',
        scope: true,
        transclude: true,
        link: function (scope, element, attrs) {
            scope.sources = [];
            function processSources() {
                var sourceTypes = {
                    webm: {type: 'video/webm'},
                    mp4: {type: 'video/mp4'},
                    ogg: {type: 'video/ogg'}
                }
                for (source in sourceTypes) {
                    if (attrs.hasOwnProperty(source)) {
                        scope.sources.push(
                            {
                                type: sourceTypes[source].type,
                                src: $sce.trustAsResourceUrl(attrs[source])
                            }
                        );
                    }
                }
            }
            processSources();
        },
        controller: function ($scope, $element, $attrs) {
            console.log('controller function running');
            var videoPlayer = $element.find('video')[0];
            $scope.video = {
                play: function () {
                    videoPlayer.play();
                    $scope.video.status = 'play';
                },
                pause: function () {
                    videoPlayer.pause();
                    $scope.video.status = 'pause';
                },
                stop: function () {
                    videoPlayer.pause();
                    videoPlayer.currentTime = 0;
                    $scope.video.status = 'stop';
                },
                togglePlay: function () {
                    $scope.video.status == 'play' ? this.pause() : this.play();
                },
                width: $attrs.width,
                height: $attrs.height

            };
            var ctrl = this;
            this.setVolume = function (level) {
                videoPlayer.volume = level;
            }
        }

    }
});

app.directive('volumeSlider', function () {
    return {
        require: '?^megaVideo',
        restrict: 'A',
        link: function (scope, element, attrs, megaVideoController) {
            var initialVolume = parseFloat(attrs.initialVolume);
            megaVideoController.setVolume(initialVolume);
            angular.element(element.slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: initialVolume,
                orientation: "horizontal",
                slide: function (event, ui) {
                    scope.$apply(function () {
                        megaVideoController.setVolume(ui.value);
                    })
                },
                change: function (event, ui) {
                    scope.$apply(function () {
                        megaVideoController.setVolume(ui.value);
                    })
                }
            }));
        }
    }
});

app.directive("makeEditable", function () {
    return {
        restrict: 'A',
        templateUrl: 'makeEditable-template.html',
        transclude: true,
    }
});

app.controller("directiveController", function ($scope) {
    var vm = this;
    vm.isEditable = false;
    vm.makeEditable = function () {
        vm.isEditable = !vm.isEditable;
    };
});
