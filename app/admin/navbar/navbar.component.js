(function () {
    angular
        .module('navbar')
        .component('navbar', {
            templateUrl: 'admin/navbar/navbar.html',
            css: 'admin/navbar/navbar.css',
            controller: ['$translate', function ($translate) {

                this.changeLang = function (locale) {
                    $translate.use(locale);
                }
            }]
        });

})();