
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

angular.module('cartApp',[])
.controller('cartCtrl', function($scope){
     //取出水果
     $scope.fruits = fruits;

     //点击-事件
    
    
    $scope.overdue = function(id){
          angular.forEach($scope.fruits, function(value, key){
               if(value.id==id&&value.num>1){
                    $scope.fruits[key].num--;
               }
          });
     }

     $scope.add = function(id){
          angular.forEach($scope.fruits, function(value, key){
               if(value.id==id&&value.num<10){
                    $scope.fruits[key].num++;
               }
          });
          // $scope.value.num = $scope.value.num+1;
     }

     // $scope.isBuy = function(buy, $event){
     //   console.log(buy, $event)
     // }

     $scope.totalPrice = function(){
          $scope.total = 0;
          angular.forEach($scope.fruits, function(value, key){
               if(value.buy){
                    $scope.total = $scope.total + value.price*value.num;
               }
          });
          console.log($scope.total)
          return $scope.total;
     }
});