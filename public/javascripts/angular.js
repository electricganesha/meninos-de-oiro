var app = angular.module('meninos-de-oiro', [
    'ui.router',
    'ngCookies',
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('home',
  {
    url:'/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl',
    resolve: {
      postPromise: ['news', function(news){
        return news.getAll();
      }],
      postPromise2: ['structuralInfo', function(structuralInfo){
        return structuralInfo.getAll();
      }],
    }
  })
  .state('news', {
    url: '/news/{id}',
    templateUrl: '/news.html',
    controller: 'NewsCtrl',
    resolve: {
      postPromise: ['news', function(news){
        return news.getAll();
      }],
      postPromise2: ['structuralInfo', function(structuralInfo){
        return structuralInfo.getAll();
      }],
    }
  })
  .state('admin', {
    url: '/admin',
    templateUrl: '/admin.html',
    controller: 'AdminCtrl',
    resolve: {
      postPromise: ['news', function(news){
        return news.getAll();
      }],
      postPromise2: ['structuralInfo', function(structuralInfo){
        return structuralInfo.getAll();
      }],
    }
  })
  .state('structuralInfo', {
    url: '/structuralInfo/{id}',
    templateUrl: '/structuralInfo.html',
    controller: 'StructureCtrl'
  });

  $urlRouterProvider.otherwise('home');
  }]);

app.factory('news', ['$http', function($http)
{
  var o = {
    news: []
  };

  o.create = function(newsPost)
  {
      return $http.post('/news',newsPost).success(function(data)
    {
      o.news.push(data);
    })
  };

  o.getAll = function()
  {
    return $http.get('/news').success(function(data)
    {
      angular.copy(data, o.news);
    });
  };

  o.upvote = function(newsPost) {
    return $http.put('/news/' + newsPost._id + '/upvote')
      .success(function(data){
        newsPost.upvotes += 1;
      });
  };

  o.get = function(id) {
    return $http.get('/news/' + id).then(function(res){
      return res.data;
    });
  };

  o.update = function(newsPost)
  {
    return $http.put('/news/' + newsPost._id + '/update/',newsPost,{})
      .success(function(data){
        console.log("acabei update");
      })
      .error(function(data){
        console.log("acabei com erro");
      });
  };

  o.delete = function(newsPost)
  {
    return $http.delete('/news/' + newsPost._id)
    .success(function(data)
    {
      console.log("sucesso");
    })
    .error(function(err){
      console.log("acabei com erro - " + err);
    });
  }

  return o;

}]);

app.factory('structuralInfo', ['$http', function($http)
{
  var o = {
    structuralInfo: []
  };

  o.getAll = function()
  {
    return $http.get('/structuralInfo').success(function(data)
    {
      angular.copy(data, o.structuralInfo);
    });
  };

  return o;

}]);

app.controller('MainCtrl', [
  '$scope',
  '$cookies',
  '$cookieStore',
  '$http',
  'news',
  'structuralInfo',
  function($scope,$cookies,$cookieStore,$http,news,structuralInfo){

    $scope.news = news.news;
    $scope.newsLikes = news.news;

    $scope.title = "Associação Meninos de Oiro"
    $scope.text = structuralInfo.structuralInfo[0].text;
    $scope.mainImage = structuralInfo.structuralInfo[0].imageLink;
    $scope.date = structuralInfo.structuralInfo[0].date;

    $scope.$watch(function(scope) {
      return scope.paintedHeart
    },
    function() {}
  );

  $scope.disableLike = function($event,id)
  {
    for(var i=0; i<news.news.length; i++)
    {
      if(news.news[i]._id == id)
      {
        $scope.newsLikes[i].isDisabled=true;
        }
    }

    $event.currentTarget.children[0].style = '-webkit-filter: grayscale(100%)';
    $event.currentTarget.children[1].style = '-webkit-filter: grayscale(0%)';
    $event.currentTarget.children[1].style.color = 'black';
    //$scope.isDisabled=true;
  }

  $scope.newsLikeIsDisabled = function(id)
  {
    for(var i=0; i<$scope.newsLikes.length; i++)
    {
      if($scope.newsLikes[i]._id == id && $scope.newsLikes[i].isDisabled == true){
        return true;
      }
    }
    return false;
  }

  $scope.changeMainFocus = function(newsPost,$event) {
    $scope.title = newsPost.title;
    $scope.text = newsPost.text;
    $scope.mainImage = newsPost.imageLink;
    $scope.date = newsPost.date;
  }

  $scope.incrementUpvotes = function(newsPost) {
    news.upvote(newsPost);
  };
  }
]);

app.controller('NewsCtrl', [
  '$scope',
  '$stateParams',
  'news',
  'newsPost',
  function($scope,news,newsPost)
  {
    $scope.newsPost = newsPost;
  }
]);

app.controller('StructureCtrl', [
  '$scope',
  '$stateParams',
  'structuralInfo',
  function($scope,$stateParams,structuralInfo)
  {
  }
]);

app.controller('AdminCtrl', [
  '$scope',
  '$cookies',
  '$cookieStore',
  '$http',
  'news',
  'structuralInfo',
  function($scope,$cookies,$cookieStore,$http,news,structuralInfo)
  {
    // reset login status
    $scope.news = news.news;
    $scope.title = "Associação Meninos de Oiro"

    $scope.login = function()
    {
    }
  }
]);

app.controller('TableCtrl', [
  '$scope',
  '$http',
  '$element',
  'news',
  function($scope,$http,$element,news)
  {
    $scope.collection = [];
    $scope.collection = news.news;

    // reset login status
    $scope.news = news.news;
    $scope.title = "Associação Meninos de Oiro"


    $scope.removeItem = function(row, newsPost)
    {
      var index = $scope.collection.indexOf(newsPost);
        if (index !== -1) {
            news.delete(newsPost);
            $scope.collection.splice(index, 1);
      }
    }

    $scope.addNews = function()
    {
      var currentDate = Date.now();

      //$scope.news.push({ });

      console.log($scope);

      console.log($scope.categoria);
      console.log($scope.uploadImageFile);

      var imagem = '';

      console.log($scope.uploadedImagePathWithSuccess);

      if($scope.uploadedImagePathWithSuccess != undefined)
      {
        imagem = '/uploads/'+$scope.uploadedImagePathWithSuccess;
      }
      else
      {
        imagem = $scope.imagem;
      }

      if($scope.categoria == undefined)
        $scope.categoria = "Artigo";

      if(!$scope.title || $scope.title === '') { return; }
        news.create({
          category: $scope.categoria,
          title: $scope.titulo,
          link: $scope.link,
          body: $scope.rubrica,
          imageLink: imagem,
          text: $scope.texto,
          date: currentDate,
          upvotes:0
        });
        $scope.categoria = '';
        $scope.titulo = '';
        $scope.link = '';
        $scope.rubrica = '';
        $scope.imagem = '';
        $scope.texto = '';
        $scope.uploadedImagePathWithSuccess = '';
        $scope.newNewsForm.$setPristine();
      };

      $scope.fileNameChanged = function (ele) {
        var files = ele.files;
        var l = files.length;
        var namesArr = [];

        console.log(files);
        console.log(files[0]);
        /*for (var i = 0; i < l; i++) {
          namesArr.push(files[i].name);
        }*/

        var fd = new FormData();
        //Take the first selected file
        fd.append("uploadImageFile", files[0]);

        $http.post('/upload', fd, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        })
        .success(function(data)
        {
          console.log("file upload success " + data );
          $scope.uploadedImagePathWithSuccess = data;
        })
        .error(function(err){
          console.log("file upload - acabei com erro - " + err);
        });

      }

    }
]);

app.directive('contenteditable', function() {
return {
    require: 'ngModel',
    controller: function($scope,$element, news)
    {
      //console.log(news);
      $scope.news = news.news;
      $scope.newsBulk = news;
    },
    link: function(scope, elm, attrs, ctrl, newsPost) {
        // view -> model
        elm.bind('blur', function() {
            scope.$apply(function() {
                ctrl.$setViewValue(elm.html());
            });
        });

        // model -> view
        ctrl.render = function(value) {
            elm.html(value);
        };

        elm.bind('keydown', function(event) {
            //console.log("keydown " + event.which);
            var esc = event.which == 27,
                el = event.target;

            var enter = event.which == 13;

            if (esc) {
                console.log("esc");
                ctrl.$setViewValue(elm.html());
                el.blur();
                event.preventDefault();
            }

            if(enter)
            {
              var selectedCell = elm[0].parentElement.cellIndex;
              var changedText = elm[0].outerText;

              alteredNewsPost = scope.newsPost;

              switch(selectedCell)
              {
                case(0):
                  alteredNewsPost.category = changedText;
                break;
                case(1):
                  alteredNewsPost.title = changedText;
                break;
                case(2):
                  alteredNewsPost.link = changedText;
                break;
                case(3):
                  alteredNewsPost.body = changedText;
                break;
                case(4):

                break;
                case(5):
                  alteredNewsPost.text = changedText;
                break;
                case(6):
                break;
                case(7):

                break;

              }

              scope.newsBulk.update(alteredNewsPost);

              ctrl.$setViewValue(elm.html());
              el.blur();
              event.preventDefault();
            }

        });

    }
};
});
