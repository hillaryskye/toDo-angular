app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/landing.html',
      controller: "AuthController"
      })
    .when('/todos', {
      templateUrl: 'partials/todo.html',
      controller: "TodosController",
      resolve: {user: resolveUser}
    })
})

app.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error === 'AUTH_REQUIRED') {
      $location.path('/')
    }
  })
})  

function resolveUser($firebaseAuth) {
  var authRef = new Firebase('https://intense-inferno-3420.firebaseio.com')
  var authObj = $firebaseAuth(authRef)

  return authObj.$requireAuth();
}
