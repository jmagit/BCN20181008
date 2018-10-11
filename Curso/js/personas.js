angular.module('my-app').factory('PersonasDAO', ['$http', function ($http) {
    var baseUrl = '/api/personas';
    return {
        query: function () {
            return $http.get(baseUrl);
        },
        get: function (id) {
            return $http.get(baseUrl + '/' + id);
        },
        add: function (item) {
            return $http.post(baseUrl, item);
        },
        change: function (id, item) {
            return $http.put(baseUrl + '/' + id, item);
        },
        remove: function (id) {
            return $http.delete(baseUrl + '/' + id);
        }
    };
}]);


angular.module('my-app').controller('PersonasController',
    ['NotificationService', '$window', 'PersonasDAO',
        '$route', '$routeParams', '$location',
        function (notify, $window, dao, $route, $routeParams, $location) {
            var vm = this;

            vm.modo = 'list';
            vm.listado = null;
            vm.elemento = {};
            var idOriginal = null;
            var urlList = '/personas';

            vm.list = function () {
                dao.query().then(
                    function (resp) {
                        vm.listado = resp.data;
                        vm.modo = 'list';
                    },
                    function (err) {
                        notify.add(err.statusText);
                    }
                    );
            };

            vm.add = function () {
                vm.elemento = {};
                vm.modo = 'add';
            };
            vm.edit = function (key) {
                dao.get(key).then(
                    function (resp) {
                        vm.elemento = resp.data;
                        idOriginal = key;
                        vm.modo = 'edit';
                    },
                    function (err) {
                        notify.add(err.statusText);
                    }
                    );
            };
            vm.view = function (key) {
                dao.get(key).then(
                    function (resp) {
                        vm.elemento = resp.data;
                        vm.modo = 'view';
                    },
                    function (err) {
                        notify.add(err.statusText);
                    }
                    );
            };
            vm.delete = function (key) {
                if (!$window.confirm('¿Seguro?')) return;
                dao.remove(key).then(
                    function (resp) {
                        vm.list();
                    },
                    function (err) {
                        notify.add(err.statusText);
                    }
                    );
            };

            vm.cancel = function () {
                vm.elemento = {};
                idOriginal = null;
                // vm.list();
                $location.url(urlList);
            };
            vm.send = function () {
                switch (vm.modo) {
                    case 'add':
                        dao.add(vm.elemento).then(
                            function (resp) {
                                vm.cancel();
                            },
                            function (err) {
                                notify.add(err.statusText);
                            }
                            );
                        break;
                    case 'edit':
                        dao.change(idOriginal, vm.elemento).then(
                            function (resp) {
                                vm.cancel();
                            },
                            function (err) {
                                notify.add(err.statusText);
                            }
                            );
                        break;
                    case 'view':
                        vm.cancel();
                        break;
                }
            };

            if ($routeParams.id) {
                if ($location.url().endsWith('/edit')) {
                    vm.edit($routeParams.id);
                } else {
                    vm.view($routeParams.id);
                }
            } else {
                if ($location.url().endsWith('/add')) {
                    vm.add();
                } else {
                    vm.list();
                }
            }
        }]);
angular.module('my-app').controller('PersonasSinDAOController',
    ['NotificationService', '$window', function (notify, $window) {
        var vm = this;

        vm.modo = 'list';
        vm.listado = null;
        vm.elemento = {};
        var idOriginal = null;
        var pk = 'id';

        vm.list = function () {
            if (!vm.listado) {
                vm.listado = [
                    { id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 34 },
                    { id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155 },
                    { id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 50 },
                    { id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 47 },
                ];
            }
            vm.modo = 'list';
        };

        vm.add = function () {
            vm.elemento = {};
            vm.modo = 'add';
        };
        vm.edit = function (key) {
            var rslt = vm.listado.find(function (item) { return item[pk] == key; });
            if (rslt) {
                vm.elemento = angular.copy(rslt);
                idOriginal = key;
                vm.modo = 'edit';
            } else {
                notify.add('Elemento no encontrado.');
            }
        };
        vm.view = function (key) {
            var rslt = vm.listado.find(function (item) { return item[pk] == key; });
            if (rslt) {
                vm.elemento = angular.copy(rslt);
                vm.modo = 'view';
            } else {
                notify.add('Elemento no encontrado.');
            }
        };
        vm.delete = function (key) {
            if (!$window.confirm('¿Seguro?')) return;
            var index = vm.listado.findIndex(function (item) { return item[pk] == key; });
            if (index >= 0) {
                vm.listado.splice(index, 1);
                vm.list();
            } else {
                notify.add('Elemento no encontrado.');
            }
        };

        vm.cancel = function () {
            vm.elemento = {};
            idOriginal = null;
            vm.list();
        };
        vm.send = function () {
            switch (vm.modo) {
                case 'add':
                    vm.listado.push(vm.elemento);
                    vm.cancel();
                    break;
                case 'edit':
                    var index = vm.listado.findIndex(function (item) { return item[pk] == idOriginal; });
                    if (index >= 0) {
                        vm.listado[index] = vm.elemento;
                        vm.list();
                    } else {
                        notify.add('Elemento no encontrado.');
                    }
                    vm.cancel();
                    break;
                case 'view':
                    vm.cancel();
                    break;
            }
        };

        vm.list();
    }]);
