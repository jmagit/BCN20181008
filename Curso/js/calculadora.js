angular.module('my-app').controller('CalculadoraCtrl',
		['$log', function ($log) {
		    var vm = this;
		    var acumulado = 0;
		    var operador = '+';
		    var limpiar = true;

		    vm.pantalla = '0';
		    vm.resumen = '';

		    vm.inicia = function () {
		        acumulado = 0;
		        operador = '+';
		        vm.pantalla = '0';
		        vm.resumen = '';
		        limpiar = true;
		    };
		    vm.ponDijito = function (value) {
		        if (typeof (value) !== 'string')
		            value = value.toString();
		        if (value.length !== 1 || value < '0' || value > '9')
		            return;
		        if (limpiar || vm.pantalla == '0') {
		            vm.pantalla = value;
		            limpiar = false;
		        } else
		            vm.pantalla += value;
		    };
		    vm.ponOperando = function (value) {
		        if (!Number.isNaN(parseFloat(value)))
		            vm.pantalla = value;
		    };
		    vm.ponComa = function () {
		        if (limpiar) {
		            //vm.pantalla = '0,';
		            vm.pantalla = '0.';
		            limpiar = false;
		            /*
                    } else if (vm.pantalla.indexOf(',') === -1)
                        vm.pantalla += ',';
                    */
		        } else if (vm.pantalla.indexOf('.') === -1)
		            vm.pantalla += '.';
		    };
		    vm.borrar = function () {
		        if (limpiar || vm.pantalla.length == 1) {
		            vm.pantalla = '0';
		            limpiar = true;
		        } else
		            vm.pantalla = vm.pantalla.substr(0,
                            vm.pantalla.length - 1);
		    };
		    vm.cambiaSigno = function () {
		        vm.pantalla = (-vm.pantalla).toString();
		        if (limpiar) {
		            acumulado = -acumulado;
		        }
		    };
		    vm.calcula = function (value) {
		        /*
                var operando = parseFloat(vm.pantalla.replace(',',
                '.'));
                */
		        if ('+-*/='.indexOf(value) == -1) {
		            $log.error('Operacion no soportada');
		            return;
		        }

		        var operando = parseFloat(vm.pantalla);
		        switch (operador) {
		            case '+':
		                acumulado += operando;
		                break;
		            case '-':
		                acumulado -= operando;
		                break;
		            case '*':
		                acumulado *= operando;
		                break;
		            case '/':
		                acumulado /= operando;
		                break;
		            case '=':
		                break;
		        }
		        /*
                vm.pantalla = acumulado.toString().replace(
                        '.', ',');
                */
		        // Con eval()
		        // acumulado = eval (acumulado + operador + vm.pantalla);
		        vm.resumen = value == '=' ? '' : (vm.resumen + vm.pantalla + value);
		        vm.pantalla = acumulado.toString();
		        operador = value;
		        limpiar = true;
		    };
		}]);
