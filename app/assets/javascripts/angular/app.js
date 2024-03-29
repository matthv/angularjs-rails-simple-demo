var app = angular.module('rails-angular', ['ngRoute', 'ngResource']);

//Factory
app.factory('Users', ['$resource',function($resource){
    return $resource('/users.json', {},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

app.factory('User', ['$resource', function($resource){
    return $resource('/users/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);

//Controller
app.controller("UserListCtr", ['$scope', '$http', '$resource', 'Users', 'User', '$location', function($scope, $http, $resource, Users, User, $location) {
    $scope.users = Users.query();
    $scope.deleteUser = function (userId) {
        if (confirm("Are you sure you want to delete this user?")){
            User.delete({ id: userId }, function(){
                $scope.users = Users.query();
                $location.path('/');
            });
        }
    };
}]);

app.controller("UserUpdateCtr", ['$scope', '$resource', 'User', '$location', '$routeParams', function($scope, $resource, User, $location, $routeParams) {
    $scope.user = User.get({id: $routeParams.id})
    $scope.update = function(){
        if ($scope.userForm.$valid){
            User.update({id: $scope.user.id},{user: $scope.user},function(){
                $location.path('/');
            }, function(error) {
                console.log(error)
            });
        }
    };
}]);

app.controller("UserAddCtr", ['$scope', '$resource', 'Users', '$location', function($scope, $resource, Users, $location) {
    $scope.user = {addresses: [{street1: '', street2: '', city: '', state: '', country: '', zipcode: '' }]}
    $scope.save = function () {
        if ($scope.userForm.$valid){
            Users.create({user: $scope.user}, function(){
                $location.path('/');
            }, function(error){
                console.log(error)
            });
        }
    }
}]);


//Routes
app.config([
    '$routeProvider', function($routeProvider) {
        $routeProvider.when('/users',{
            templateUrl: '/templates/users/index.html',
            controller: 'UserListCtr'
        });
        $routeProvider.when('/users/new', {
            templateUrl: '/templates/users/new.html',
            controller: 'UserAddCtr'
        });
        $routeProvider.when('/users/:id/edit', {
            templateUrl: '/templates/users/edit.html',
            controller: "UserUpdateCtr"
        });
        $routeProvider.otherwise({
            redirectTo: '/users'
        });
    }
]);
