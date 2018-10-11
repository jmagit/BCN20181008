angular.module('my-app', ['aytos-core', 'ngSanitize', 'ngRoute']);
angular.module('my-app').config(
    ['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'demo0.html'
      })
      .when('/chisme/de/calcular', {
          templateUrl: 'views/calculadora.html', controller: 'CalculadoraCtrl', controllerAs: 'ctrl'
      })
      .when('/otra/calculadora', {
          templateUrl: 'views/calculadora.en.html', controller: 'CalculadoraCtrl', controllerAs: 'ctrl'
      })
      .when('/personas', {
          templateUrl: 'views/personas/list.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/personas/add', {
          templateUrl: 'views/personas/form.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/personas/:id/edit', {
          templateUrl: 'views/personas/form.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/personas/:id', {
          templateUrl: 'views/personas/view.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/personas/:id/:kk*', {
          templateUrl: 'views/personas/view.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .otherwise({
          redirectTo: '/'
      });
}])

angular.module('my-app').controller('AppController', [function () {
    var vm = this;
    vm.menu = [
        { texto: 'Demos', titulo: 'Demos de plantillas', plantilla: 'demo0.html' },
        { texto: 'Pag 1', titulo: 'Demo plantilla 1', plantilla: 'views/demo1.html' },
        { texto: 'Pag 2', titulo: 'Otra página', plantilla: 'cdemo2.html' },
        { texto: 'Calculadora', titulo: 'Calculadora', plantilla: 'views/calculadora.en.html' },
        { texto: 'Personas', titulo: 'Mantenimiento de personas', plantilla: 'views/personas.html' },
    ];
    vm.titulo = vm.menu[0].titulo;
    vm.plantilla = vm.menu[0].plantilla;

    vm.seleciona = function (index) {
        if (0 <= index && index < vm.menu.length) {
            vm.titulo = vm.menu[index].titulo;
            vm.plantilla = vm.menu[index].plantilla;
        }
    };
}]);
angular.module('my-app').controller('NotificationController', ['NotificationService', function (srv) {
    this.notify = srv;
}]);

angular.module('my-app').controller('my-controller', ['NotificationService', function (srv) {
    var vm = this;

    vm.notify = srv;

    vm.nombre = 'mundo';
    vm.persona = { nombre: 'Pepito', apellidos: 'Grillo' };
    vm.listado = [
        {id: 1, nombre: 'Madrid'},
        {id: 2, nombre: 'BARCELONA'},
        {id: 3, nombre: 'bilbao'},
        {id: 4, nombre: 'ValenciA'},
    ];
    vm.idProvincia = 2;

    vm.resultado = '';
    vm.visible = true;
    vm.estetica = { importante: true, error: false, urgente: true, };

    vm.saluda = function () {
        vm.resultado = 'Hola ' + vm.nombre;
    };
    vm.despide = function () {
        vm.resultado = 'Adios ' + vm.nombre;
    };
    vm.di = function (algo) {
        vm.resultado = 'Dice ' + algo;
    };

    vm.cambia = function () {
        vm.visible = !vm.visible;
        vm.estetica.importante = !vm.estetica.importante;
        vm.estetica.error = !vm.estetica.error;
    };

    vm.calcula = function (a, b) { return a + b; };

    vm.add = function (provincia) {
        var newId = vm.listado.length ? vm.listado[vm.listado.length - 1].id + 1 : 1;
        vm.listado.push({ id: newId, nombre: provincia });
        vm.idProvincia = newId;
    };
}]);


angular.module('my-app').controller('DemosController', ['AuthService', function (srv) {
    this.srv = srv;
    this.texto = 'Esto es una demo';
}]);

angular.module('my-app').factory('NotificationService', ['$log', function ($log) {
    return {
        listado: [],
        add: function (msg) {
            if (msg) {
                this.listado.push(msg);
            } else {
                $log.error('Falta el mensaje.');
            }
            this.hayMensajes = this.listado.length > 0;
        },
        remove: function (index) {
            if (0 <= index && index < this.listado.length) {
                this.listado.splice(index, 1);
            } else {
                $log.error('Index out of range.');
            }
            this.hayMensajes = this.listado.length > 0;
        },
        clear: function () {
            this.listado = [];
            this.hayMensajes = false;
        },
        hayMensajes: false,
    };
}]);

angular.module('my-app').factory('AuthService', ['$log', function ($log) {
    return {
        nombre: 'mundo',
    };
}]);
