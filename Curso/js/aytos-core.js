angular.module('aytos-core', []);
angular.module('aytos-core').filter('capitalize', function () {
    return function (s) {
        if (typeof (s) === 'string') {
            return s.charAt(0).toUpperCase() +
                s.substring(1, s.length).toLowerCase();
        }
        return s;
    };
});
angular.module('aytos-core').filter("initcap", function () {
    return function (s) {
        if (typeof (s) === "string") {
            return s.replace(/[^\s]+/g,
                    function (cad) {
                        return cad.charAt(0).toUpperCase() +
                            cad.slice(1).toLowerCase();
                    });
        }
        return s;
    };
});

angular.module('aytos-core').filter("toComaDecimal", function () {
    return function (s) {
        if (typeof (s) === "number") {
            s = s.toString();
        }
        if (typeof (s) === "string") {
            return s.replace(/\./g, ",");
        }
        return s;
    };
});

angular.module('aytos-core').directive('uppercase', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.uppercase = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }
                return viewValue.toString() === viewValue.toString().toUpperCase();
            };
        }
    };
});
