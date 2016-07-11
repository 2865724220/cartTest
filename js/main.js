var fruits=[
{
     id:'fruit1',
     name:"苹果",
     price:"10",
     num:1,
     buy:false
},
{
     id:'fruit2',
     name:"香蕉",
     price:"1",
     num:1,
     buy:false
},
{
     id:'fruit3',
     name:"橘子",
     price:"20",
     num:1,
     buy:false
}
// {
//      id:'fruit4',
//      name:"菠萝",
//      price:"18",
//      num:1,
//      buy:false
// },
// {
//      id:'fruit5',
//      name:"西瓜",
//      price:"18",
//      num:1,
//      buy:false
// }
];



var cartapp=angular.module('cartApp',['ngRoute']);
//路由功能

cartapp.config(['$routeProvider',function($routeProvider) {
  $routeProvider
    .when("/",
      {
        templateUrl:"views/index.html",
      })
    .when("/goBuy",{
          templateUrl:"views/order.html"
     })
     
}]);

cartapp.run(function($rootScope){
  var price =document.getElementById('price');
  $rootScope.$on('$viewContentLoaded',function(event){
    price.style.display="table";
  });

});
  

cartapp.controller('cartCtrl', function($scope){
     //取出水果
     $scope.fruits = fruits;

    
    
    //点击- +事件
    $scope.overdue = function(id){
          angular.forEach($scope.fruits, function(value, key){
               if(value.id==id&&value.num>1){
                    $scope.fruits[key].num--;
               }
          });
     };

     $scope.add = function(id){
          angular.forEach($scope.fruits, function(value, key){
               if(value.id==id&&value.num<10){
                    $scope.fruits[key].num++;
               }
          });
          
     };
    


     //将要购买的商品存放在bought中
    $scope.goBuy = function(event){
     if($scope.total>0){
      event.target.href="#/goBuy";
      $scope.bought =[];




      for( var i=0;i<$scope.fruits.length;i++){
        if($scope.fruits[i].buy == true){
          $scope.bought.push($scope.fruits[i]);
          // event.target.innerHTML="提交订单;";
          // console.log($scope.bought);
        }
      }
     }
     else{
      alert("请选择商品");
      event.target.href="#/";
     }
    };
     



     $scope.totalPrice = function(){
          $scope.total = 0;
          angular.forEach($scope.fruits, function(value, key){
               if(value.buy){
                    $scope.total = $scope.total + value.price*value.num;
               }
          });
          // console.log($scope.total);
          return $scope.total;
     }


});