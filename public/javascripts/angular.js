var app = angular.module('meninos-de-oiro', ['ui.router','slick','vcRecaptcha','ngAnimate']);

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
        storiesPromise: ['stories', function(stories){
          return stories.getAll();
        }],
        categoriesPromise: ['categories', function(categories){
          return categories.getAll();
        }],
        newsPromise: ['news', function(news){
          return news.getAll();
        }],
        structurePromise: ['structuralInfo', function(structuralInfo){
          return structuralInfo.getAll();
        }],
      }
    })
    .state('news', {
      url: '/news/{id}',
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
    .state('stories', {
      url: '/stories/{id}',
      controller: 'StoryCtrl',
      resolve: {
        postPromise: ['stories', function(stories){
          console.log("before cenas");
          return stories.getAll();
        }],
      }
    })
    .state('categories', {
      url: '/categories/{id}',
      controller: 'CategoryCtrl',
      resolve: {
        postPromise: ['categories', function(categories){
          return categories.getAll();
        }],
      }
    })
    .state('partners',
    {
      url:'/partners',
      templateUrl: '/partners.html',
      controller: 'PartnerCtrl',
      resolve: {
        postPromise: ['partners', function(partners){
          return partners.getAll();
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
    })
    .state('donatebox', {
      url: '/donatebox/',
      controller: 'DonateBoxCtrl',
      resolve: {
        postPromise: ['structuralInfo', function(structuralInfo){
          return structuralInfo.getAll();
        }],
      }
    })
    .state('partnerbox', {
      url: '/partnerbox/',
      controller: 'PartnerBoxCtrl',
      resolve: {
        postPromise: ['partners', function(partners){
          return partners.getAll();
        }],
      }
    })
    .state('about',
    {
      url:'/about',
      templateUrl: '/about.html',
      controller: 'AboutCtrl',
    })
    .state('partnersPage',
    {
      url:'/partnersPage',
      templateUrl: '/partners.html',
      controller: 'PartnerPageCtrl',
    })
    .state('acknowledgments',
    {
      url:'/acknowledgments',
      templateUrl: '/acknowledgments.html',
      controller: 'AcknowledgmentsCtrl',
    })
    .state('contacts',
    {
      url:'/contacts',
      templateUrl: '/contacts.html',
      controller: 'ContactsCtrl',
    })
    .state('membership',
    {
      url:'/membership',
      templateUrl: '/membership.html',
      controller: 'MembershipCtrl',
    })
    .state('mission',
    {
      url:'/mission',
      templateUrl: '/mission.html',
      controller: 'MissionCtrl',
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
      })
      .error(function(data){
        console.log("acabei com erro a devolver noticias");
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

  app.factory('categories', ['$http', function($http)
  {
    var o = {
      categories: []
    };

    o.create = function(category)
    {
      return $http.post('/categories',category).success(function(data)
      {
        o.categories.push(data);
      })
    };

    o.getAll = function()
    {
      return $http.get('/categories').success(function(data)
      {
        console.log(o.categories);
        angular.copy(data, o.categories);
      });
    };

    o.get = function(id) {
      return $http.get('/categories/' + id).then(function(res){
        return res.data;
      });
    };

    o.update = function(category)
    {
      return $http.put('/categories/' + category._id + '/update/',category,{})
      .success(function(data){
        console.log("acabei update");
      })
      .error(function(data){
        console.log("acabei com erro");
      });
    };

    o.delete = function(category)
    {
      return $http.delete('/categories/' + category._id)
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

  app.factory('stories', ['$http', function($http)
  {
    var o = {
      stories: []
    };

    o.create = function(story)
    {
      return $http.post('/stories',story).success(function(data)
      {
        o.stories.push(data);
      })
    };

    o.getAll = function()
    {
      return $http({
        url: '/stories',
        method: 'GET'
      })
    }

    o.get = function(id) {
      return $http.get('/stories/' + id).then(function(res){
        return res.data;
      });
    };

    o.update = function(story)
    {
      return $http.put('/stories/' + story._id + '/update/',story,{})
      .success(function(data){
        console.log("acabei update");
      })
      .error(function(data){
        console.log("acabei com erro");
      });
    };

    o.delete = function(story)
    {
      return $http.delete('/stories/' + story._id)
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

  app.factory('partners', ['$http', function($http)
  {

    var o = {
      partners: []
    };

    o.create = function(partner)
    {
      return $http.post('/partners',partner).success(function(data)
      {
        o.partners.push(data);
      })
    };

    /*o.getAll = function()
    {
    return $http.get('/partners').success(function(data)
    {
    angular.copy(data, o.partners);
  });
};*/

o.getAll = function()
{
  return $http({
    url: '/partners',
    method: 'GET'
  })
}

o.get = function(id) {
  return $http.get('/partners/' + id).then(function(res){
    return res.data;
  });
};

o.update = function(partner)
{
  return $http.put('/partners/' + partner._id + '/update/',partner,{})
  .success(function(data){
    console.log("acabei update");
  })
  .error(function(data){
    console.log("acabei com erro");
  });
};

o.delete = function(partner)
{
  return $http.delete('/partners/' + partner._id)
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

app.factory('team', ['$http', function($http)
{

  var o = {
    team: []
  };

  o.create = function(teammember)
  {
    return $http.post('/team',teammember).success(function(data)
    {
      o.team.push(data);
    })
  };

  o.getAll = function()
  {
    return $http({
      url: '/team',
      method: 'GET'
    })
  }

  o.get = function(id) {
    return $http.get('/team/' + id).then(function(res){
      return res.data;
    });
  };

  o.update = function(teammember)
  {
    return $http.put('/team/' + teammember._id + '/update/',teammember,{})
    .success(function(data){
      console.log("acabei update");
    })
    .error(function(data){
      console.log("acabei com erro");
    });
  };

  o.delete = function(teammember)
  {
    return $http.delete('/team/' + teammember._id)
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

app.factory('projects', ['$http', function($http)
{

  var o = {
    projects: []
  };

  o.create = function(project)
  {
    return $http.post('/projects',project).success(function(data)
    {
      o.projects.push(data);
    })
  };

  o.getAll = function()
  {
    return $http({
      url: '/projects',
      method: 'GET'
    })
  }

  o.get = function(id) {
    return $http.get('/projects/' + id).then(function(res){
      return res.data;
    });
  };

  o.update = function(project)
  {
    return $http.put('/projects/' + project._id + '/update/',project,{})
    .success(function(data){
      console.log("acabei update");
    })
    .error(function(data){
      console.log("acabei com erro");
    });
  };

  o.delete = function(project)
  {
    return $http.delete('/projects/' + project._id)
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

app.controller('MainCtrl', [
  '$scope',
  '$http',
  '$sce',
  'categories',
  'news',
  'structuralInfo',
  'stories',
  function($scope,$http,$sce,categories,news,structuralInfo,stories){

    stories.getAll().success(function(data){
      $scope.stories=data;
    });

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

  $scope.categories = categories.categories;

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

  $scope.convertVideoLinksToTrust = function()
  {
    for(var i=0; i<$scope.stories.length; i++)
    {
      $scope.stories[i].trustedVideoLink = $sce.trustAsResourceUrl($scope.stories[i].videoLink);
    }
  }
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
    $scope.structuralInfo = structuralInfo.structuralInfo;
  }
]);

app.controller('AdminCtrl', [
  '$scope',
  '$http',
  'news',
  'structuralInfo',
  function($scope,$http,news,structuralInfo)
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
  'categories',
  'news',
  'structuralInfo',
  function($scope,$http,$element,categories,news,structuralInfo)
  {

    $scope.structuralInfo = structuralInfo.structuralInfo;
    $scope.rowCollectionPartners = [];
    $scope.rowCollectionPartners = news.news;

    $scope.categories = $scope.structuralInfo[1].categories;

    // reset login status
    $scope.news = news.news;
    $scope.title = "Associação Meninos de Oiro"

    $scope.getStructureCategories = function()
    {
      res = [];

      for (var i = 0; i <= $scope.categories.length-1; i++) {
        var category = $scope.categories[i];
        res.push($scope.categories[i].name);
      }
      return res;
    }

    $scope.changeCategory = function(category,newsPost)
    {

      alteredNewsPost = newsPost;

      alteredNewsPost.category = category;

      news.update(alteredNewsPost);
    }

    $scope.removeItem = function(row, newsPost)
    {
      var index = $scope.rowCollectionPartners.indexOf(newsPost);
      if (index !== -1) {
        news.delete(newsPost);
        $scope.rowCollectionPartners.splice(index, 1);
      }
    }

    $scope.addNews = function()
    {
      var currentDate = Date.now();

      var imagem = '';

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
      $scope.uploadedImagePathWithSuccess = undefined;
      $scope.newNewsForm.$setPristine();
    };

    $scope.fileNameChanged = function (ele) {
      var files = ele.files;
      var l = files.length;
      var namesArr = [];

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
    controller: function($scope,$element, news, categories)
    {
      //console.log(news);
      $scope.news = news.news;
      $scope.newsBulk = news;
      $scope.categoriesBulk = categories;
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

          switch(scope.show)
          {
            case("news"):
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
              alteredNewsPost.imageLink = changedText;
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
            break;
            case("categories"):
            alteredCategory = scope.category;

            console.log(alteredCategory);

            console.log(selectedCell);

            switch(selectedCell)
            {
              case(0):
              alteredCategory.name = changedText;
              break;
              case(1):
              alteredNewsPost.color = changedText;
              break;
              case(2):
              alteredNewsPost.icon = changedText;
              break;
            }

            console.log(alteredCategory);

            scope.categoriesBulk.update(alteredCategory);
            break;
          }

          var selectedCell = elm[0].parentElement.cellIndex;
          var changedText = elm[0].outerText;



          ctrl.$setViewValue(elm.html());
          el.blur();
          event.preventDefault();
        }

      });

    }
  };
});

app.directive('file', ['$http', function($http){
  return {
    scope: {
      file: '='
    },
    controller: function($scope,$element, news)
    {
      //console.log(news);
      $scope.news = news.news;
      $scope.newsBulk = news;
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){

        selectedNewsPost = scope.$parent.newsPost;

        var files = event.target.files;
        var l = files.length;
        var namesArr = [];

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
          selectedNewsPost.imageLink = '/uploads/'+ data;
          scope.newsBulk.update(selectedNewsPost);
        })
        .error(function(err){
          console.log("file upload - acabei com erro - " + err);
        });
        scope.$apply();
      });
    }
  };
}]);

app.controller('CategoryCtrl', [
  '$scope',
  '$http',
  '$element',
  'categories',
  'structuralInfo',
  'news',
  function($scope,$http,$element,categories,structuralInfo,news)
  {
    $scope.structuralInfo = structuralInfo.structuralInfo;
    $scope.collection = [];
    $scope.collection = categories.categories;

    $scope.categories = structuralInfo.structuralInfo[1].categories;

    // reset login status
    //$scope.categories = categories.categories;
    $scope.title = "Associação Meninos de Oiro"

    $scope.removeItem = function(row, category)
    {
      var index = $scope.collection.indexOf(category);
      if (index !== -1) {
        categories.delete(category);
        $scope.collection.splice(index, 1);
      }
    }

    $scope.addCategory = function()
    {
      var currentDate = Date.now();

      var imagem = '';

      if($scope.uploadedImagePathWithSuccess != undefined)
      {
        imagem = '/uploads/'+$scope.uploadedImagePathWithSuccess;
      }
      else
      {
        imagem = $scope.imagemCategory;
      }

      if(!$scope.nome || $scope.nome === '') { return; }
      categories.create({
        name: $scope.nome,
        color: $scope.color,
        icon: imagem,
      });
      $scope.nome = '';
      $scope.color = '';
      $scope.imagemCategory = '';
      $scope.uploadedImagePathWithSuccess = undefined;
      $scope.newCategoryForm.$setPristine();
    };

    $scope.fileNameChangedCategory = function (ele) {
      var files = ele.files;
      var l = files.length;
      var namesArr = [];

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
        console.log($scope.uploadedImagePathWithSuccess);
      })
      .error(function(err){
        console.log("file upload - acabei com erro - " + err);
      });

    }

  }]);

  app.controller('StoryCtrl', [
    '$scope',
    '$http',
    '$element',
    '$sce',
    'stories',
    function($scope,$http,$element,$sce,stories)
    {

      stories.getAll().success(function(data){
        $scope.stories=data;
        $scope.rowCollectionStories=data;
      });

      $scope.removeStory = function(row, story)
      {
        var index = $scope.rowCollectionStories.indexOf(story);
        if (index !== -1) {
          stories.delete(story);
          $scope.rowCollectionStories.splice(index, 1);
        }
      };

      $scope.convertVideoLinksToTrust = function()
      {
        for(var i=0; i<$scope.stories.length; i++)
        {

          $scope.stories[i].trustedVideoLink = $sce.trustAsResourceUrl($scope.stories[i].videoLink);
          console.log($scope.stories[i].trustedVideoLink);
        }
      }

      $scope.addStory = function()
      {
        var currentDate = Date.now();

        if(!$scope.tituloStory || $scope.tituloStory === '') { return; }
        stories.create({
          title: $scope.tituloStory,
          text: $scope.corpoStory,
          videoLink: $scope.linkStory,
          date: currentDate,
        }).success(function(data)
        {
          $scope.rowCollectionStories.push(data);
        });
        $scope.tituloStory = '';
        $scope.corpoStory = '';
        $scope.linkStory = '';
        currentDate = '';
        $scope.newStoryForm.$setPristine();
      };

    }]);

    app.controller('PartnerCtrl', [
      '$scope',
      '$http',
      '$element',
      'partners',
      function($scope,$http,$element,partners)
      {
        $scope.partners = partners.partners;

        $scope.partners = [];
        partners.getAll().success(function(data){
          $scope.partners=data;
          $scope.rowCollectionPartners=data;
        });

        $scope.removePartner = function(row, partner)
        {
          var index = $scope.rowCollectionPartners.indexOf(partner);
          if (index !== -1) {
            partners.delete(partner);
            $scope.rowCollectionPartners.splice(index, 1);
          }
        }

        $scope.addPartner = function()
        {
          var currentDate = Date.now();

          if(!$scope.nomeParceiro || $scope.nomeParceiro === '') { return; }
          partners.create({
            name: $scope.nomeParceiro,
            iconPath: $scope.iconeParceiro,
            link: $scope.linkParceiro,
            date: currentDate,
          }).success(function(data)
          {
            $scope.rowCollectionPartners.push(data);
          });
          $scope.nomeParceiro = '';
          $scope.iconeParceiro = '';
          $scope.linkParceiro = '';
          currentDate = '';
          $scope.newPartnerForm.$setPristine();
        };
      }]);

      app.controller('TeamCtrl', [
        '$scope',
        '$http',
        '$element',
        'team',
        function($scope,$http,$element,team)
        {
          $scope.team = team.team;

          $scope.team = [];
          team.getAll().success(function(data){
            $scope.team=data;
            $scope.rowCollectionTeam=data;
          });

          $scope.removeTeamMember = function(row, teammember)
          {
            var index = $scope.rowCollectionTeam.indexOf(teammember);
            if (index !== -1) {
              team.delete(teammember);
              $scope.rowCollectionTeam.splice(index, 1);
            }
          }

          $scope.addTeamMember = function()
          {
            var currentDate = Date.now();

            if(!$scope.nomeMembro || $scope.nomeMembro === '') { return; }
            team.create({
              name: $scope.nomeMembro,
              position: $scope.posicaoMembro,
              imagePath: $scope.linkMembro,
              date: currentDate,
            }).success(function(data)
            {
              $scope.rowCollectionTeam.push(data);
            });
            $scope.nomeMembro = '';
            $scope.posicaoMembro = '';
            $scope.linkMembro = '';
            currentDate = '';
            $scope.newTeamForm.$setPristine();
          };
        }]);

        app.controller('ProjectCtrl', [
          '$scope',
          '$http',
          '$element',
          'projects',
          function($scope,$http,$element,projects)
          {
            $scope.projects = projects.projects;

            $scope.projects = [];
            projects.getAll().success(function(data){
              $scope.projects=data;
              $scope.rowCollectionProject=data;
            });

            $scope.removeProject = function(row, project)
            {
              var index = $scope.rowCollectionProject.indexOf(project);
              if (index !== -1) {
                projects.delete(project);
                $scope.rowCollectionProject.splice(index, 1);
              }
            }

            $scope.addProject = function()
            {
              var currentDate = Date.now();

              if(!$scope.nomeProjecto || $scope.nomeProjecto === '') { return; }
              projects.create({
                title: $scope.nomeProjecto,
                description: $scope.descricaoProjecto,
                imagePath: $scope.linkProjecto,
                date: currentDate,
              }).success(function(data)
              {
                $scope.rowCollectionProject.push(data);
              });
              $scope.nomeProjecto = '';
              $scope.descricaoProjecto = '';
              $scope.linkProjecto = '';
              currentDate = '';
              $scope.newProjectForm.$setPristine();
            };
          }]);

        app.controller('DonateBoxCtrl', [
          '$scope',
          '$http',
          '$element',
          'structuralInfo',
          function($scope,$http,$element,structuralInfo)
          {
            console.log(structuralInfo);
            $scope.donateTexts = structuralInfo.structuralInfo[2].textos;

            $scope.selectedText = 1;
          }]);

          app.controller('StoryBoxCtrl', [
            '$scope',
            '$http',
            '$element',
            'structuralInfo',
            function($scope,$http,$element,structuralInfo)
            {
              console.log(structuralInfo);
              $scope.donateTexts = structuralInfo.structuralInfo[2].textos;

              $scope.selectedStory = 1;
            }]);

            app.controller('PartnerBoxCtrl', [
              '$scope',
              '$http',
              '$element',
              'partners',
              function($scope,$http,$element,partners)
              {
                $scope.partners = [];
                partners.getAll().success(function(data){
                  $scope.partners=data;
                  $scope.rowCollectionPartners=data;
                });
              }]);

              app.controller('ContactsCtrl', [
                '$scope',
                '$http',
                '$element',
                'vcRecaptchaService',
                function($scope,$http,$element,vcRecaptchaService)
                {
                console.log("this is your app's controller");
                $scope.response = null;
                $scope.widgetId = null;
                $scope.model = {
                    key: '6Ld-6icTAAAAAHvJiPgtX6mZVE2CQIfnc5sbCmzd'
                };

                $scope.setResponse = function (response) {
                    console.info('Response available');
                    $scope.response = response;
                };
                $scope.setWidgetId = function (widgetId) {
                    console.info('Created widget ID: %s', widgetId);
                    $scope.widgetId = widgetId;
                };
                $scope.cbExpiration = function() {
                    console.info('Captcha expired. Resetting response object');
                    vcRecaptcha.reload($scope.widgetId);
                    $scope.response = null;
                 };
                $scope.submitContactForm = function () {
                    var valid;
                    /**
                     * SERVER SIDE VALIDATION
                     *
                     * You need to implement your server side validation here.
                     * Send the reCaptcha response to the server and use some of the server side APIs to validate it
                     * See https://developers.google.com/recaptcha/docs/verify
                     */

                     if($scope.response != null)
                      valid=true;

                    console.log('sending the captcha response to the server', $scope.response);
                    if (valid) {

                      if(!$scope.nomeContacto || $scope.nomeContacto === '') { return; }
                      if(!$scope.emailContacto || $scope.emailContacto === '') { return; }
                      if(!$scope.textoContacto || $scope.textoContacto === '') { return; }

                      console.log({ nome: $scope.nomeContacto, email: $scope.emailContacto, texto: $scope.textoContacto });

                      $http({
                       method: 'POST',
                       url: 'http://localhost/phpmailer/testemail.php',
                       data: 'nome='+$scope.nomeContacto+'&email='+$scope.emailContacto+'&texto='+$scope.textoContacto,
                       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                     }).success(function(data)
                       {
                         console.log(data);
                       }).error(function(data){
                         console.log("Erro, Email Não Enviado!");
                       });

                      $scope.nomeContacto = '';
                      $scope.emailContacto = '';
                      $scope.textoContacto = '';
                      currentDate = '';
                      $scope.newContactForm.$setPristine();

                    } else {
                        console.log('Failed validation');
                        // In case of a failed validation you need to reload the captcha
                        // because each response can be checked just once
                        vcRecaptchaService.reload($scope.widgetId);
                    }
                };
              }
              ]);
