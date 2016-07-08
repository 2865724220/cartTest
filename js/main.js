
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
];



var cartapp=angular.module('cartApp',['ngRoute']);
//路由功能

cartapp.config(['$routeProvider',function($routeProvider) {
     $routeProvider
     .when("/",{
          template:"<ul><li class='{{fruit.buy}}'  ng-repeat='fruit in fruits'  item ={{fruit.id}}>\
                         <p class='contentW'>\
                              名称：{{fruit.name}}\
                         </p>\
                         <p class='contentW'>\
                              单价：{{fruit.price}}\
                         </p>\
                         <p class='contentW'>\
                              数量：\
                              <a href='javascript:;' class='calc {{fruit.num<=1?'nobuy':''}}' ng-click='overdue(fruit.id)'>-</a>\
                              <span>{{fruit.num}}</span>\
                              <a href='javascript:;' class='calc {{fruit.num>=10?'nobuy':''}}' ng-click='add(fruit.id)'>+</a>\
                         </p>\
                         <div class='buttonW'>\
                              <div class='checkbox'>\
                                   <input type='checkbox' id='{{fruit.id}}' ng-model='fruit.buy' >\
                                   <span class='box'></span>\
                              </div>\
                              <label class='addc' for='{{fruit.id}}'>添加到购物车</label>\
                         </div>\
                    </li><ul>\
                    "
     })
     .when("/goBuy",{
          template:"\
              <div class='buyW'>\
              <a class='submit' href='#/'>返回</a>\
              <div ng-repeat='shoplist in bought'>\
                  <span ng-bind-template='{{shoplist.name}}:{{shoplist.price}} x {{shoplist.num}}'></span>\
                  <span ng-bind-template='{{shoplist.price *shoplist.num}}'></span>\
              </div>\
              </div>"
     })
     
}]);

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
     $scope.bought =[];      
    $scope.goBuy = function(event){
     if($scope.total>0){
      event.target.href="#/goBuy";
      for( var i=0;i<$scope.fruits.length;i++){
        if($scope.fruits[i].buy == true){
          $scope.bought.push($scope.fruits[i]);
          console.log($scope.bought);
        }
      }
     }
     else{
      alert("请选择商品");
      event.target.href="#/";
     }
    }
   

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