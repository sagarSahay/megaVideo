/**
 * Created by Sagar on 07/07/2015.
 */
var app = angular.module("myApp", []);

app.directive("megaVideo", function ($sce) {
    return {
        restrict: 'E',
        templateUrl: 'megaVideo-template.html',
        scope: true,
        link: function (scope, element, attrs) {
            var videoPlayer = element.find('video')[0];
            scope.sources = [];
            function processSources() {
                var sourceTypes = {
                    webm: {type: 'video/webm'},
                    mp4: {type: 'video/mp4'},
                    ogg: {type: 'video/ogg'}
                };
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
            scope.video = {
                play: function () {
                    videoPlayer.play();
                    scope.video.status = 'play';
                },
                pause: function () {
                    videoPlayer.pause();
                    scope.video.status = 'pause';
                },
                stop: function () {
                    videoPlayer.pause();
                    videoPlayer.currentTime = 0;
                    scope.video.status = 'stop';
                },
                togglePlay: function () {
                    scope.video.status == 'play' ? this.pause() : this.play();
                },
                width: attrs.width,
                height: attrs.height

            };
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
