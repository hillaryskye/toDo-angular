app.controller('AuthController', function($scope, $location, $firebaseAuth) {
  var authRef = new Firebase('https://intense-inferno-3420.firebaseio.com')
  var authObj = $firebaseAuth(authRef)

  $scope.register = function() {
    authObj.$createUser($scope.user)
    .then(function() {
      $scope.login()
    })
  }
  $scope.login = function() {
    authObj.$authWithPassword($scope.user)
    .then(function() {
      $location.path('/todos')
    })
    .catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
})

app.controller('TodosController', function($scope, $firebaseArray, $firebaseAuth, $location) {
  //create ref
  var authRef = new Firebase('https://intense-inferno-3420.firebaseio.com')
  var authObj = $firebaseAuth(authRef)

  var todosRef = new Firebase("https://intense-inferno-3420.firebaseio.com/todos")
  //use ref to create synchronized angular-route
  $scope.todos = $firebaseArray(todosRef)
  $scope.newTodo = {text: "", completed:false}
  $scope.addTodo = function() {
    $scope.todos.$add($scope.newTodo)
    .then(function(data) {
      $scope.newTodo.text = ""
    })
  }

  $scope.removeTodo = function(todo) {
    $scope.todos.$remove(todo)
  }
  //{text: "some todo", completed: false}
  $scope.logout = function() {
    authObj.$unauth();
    $location.path('/')
  }
})
