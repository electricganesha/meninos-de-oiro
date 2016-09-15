var app = angular.module('meninos-de-oiro', ['ui.router','slick','vcRecaptcha','rzModule','ngMaterial']);

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
        structurePromise: ['structuralInfo', function(structuralInfo){
          return structuralInfo.getAll();
        }],
        storiesPromise: ['stories', function(stories){
          return stories.getAll();
        }],
        categoriesPromise: ['categories', function(categories){
          return categories.getAll();
        }],
        newsPromise: ['news', function(news){
          return news.getAll();
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
    .state('donatebox', {
      url: '/donatebox/',
      controller: 'DonateBoxCtrl',
      resolve: {
        postPromise: ['structuralInfo', function(structuralInfo){
          return structuralInfo.getAll();
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
    .state('donatenow', {
      url: '/donatenow',
      controller: 'DonationCtrl',
      resolve: {
        postPromise: ['structuralInfo', function(structuralInfo){
          return structuralInfo.getAll();
        }]
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
      resolve: {
        postPromise: ['members', function(members){
          return members.getAll();
        }],
      }
    })
    .state('mission',
    {
      url:'/mission',
      templateUrl: '/mission.html',
      controller: 'MissionCtrl',
    })
    .state('projectspage',
    {
      url:'/projectspage',
      templateUrl: '/projectspage.html',
      controller: 'ProjectCtrl',
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
      return $http({
        url: '/structuralInfo',
        method: 'GET'
      })
    }

    o.update = function(id,text)
    {
      return $http.put('/structuralInfo/' + id + '/update/',{text})
      .success(function(data){
        console.log("acabei update");
      })
      .error(function(data){
        console.log("acabei com erro");
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

/*
* STATS Factory
*/

app.factory('stats', ['$http', function($http)
{

  var o = {
    stats: []
  };

  o.create = function(stat)
  {
    return $http.post('/stats',stat).success(function(data)
    {
      o.stats.push(data);
    })
  };

  o.getAll = function()
  {
    return $http({
      url: '/stats',
      method: 'GET'
    })
  }

  o.get = function(id) {
    return $http.get('/stats/' + id).then(function(res){
      return res.data;
    });
  };

  o.update = function(stat)
  {
    return $http.put('/stats/' + stat._id + '/update/',stat,{})
    .success(function(data){
      console.log("acabei update");
    })
    .error(function(data){
      console.log("acabei com erro");
    });
  };

  o.delete = function(stat)
  {
    return $http.delete('/stats/' + stat._id)
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

/*
* MEMBERS Factory
*/

app.factory('members', ['$http', function($http)
{

  var o = {
    members: []
  };

  o.create = function(member)
  {
    return $http.post('/members',member).success(function(data)
    {
      o.members.push(data);
    })
  };

  o.getAll = function()
  {
    return $http({
      url: '/members',
      method: 'GET'
    })
  }

  o.get = function(id) {
    return $http.get('/members/' + id).then(function(res){
      return res.data;
    });
  };

  o.update = function(member)
  {
    return $http.put('/members/' + member._id + '/update/',member,{})
    .success(function(data){
      console.log("acabei update");
    })
    .error(function(data){
      console.log("acabei com erro");
    });
  };

  o.delete = function(member)
  {
    return $http.delete('/members/' + member._id)
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


    $scope.structuralInfo = [];
    structuralInfo.getAll().success(function(data){
      $scope.structuralInfo=data;

      $scope.title = data[0].title;
      $scope.text = data[0].text;
      $scope.mainImage = data[0].imageLink;
      $scope.date = data[0].date;

      $scope.category1 = data[0].categories[0];
      $scope.category2 = data[0].categories[1];
      $scope.category3 = data[0].categories[2];
    });

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
  '$http',
  '$element',
  'structuralInfo',
  function($scope,$stateParams,$http,$element,structuralInfo)
  {
    $scope.structuralInfo = [];
    structuralInfo.getAll().success(function(data){
      $scope.structuralInfo=data;
    });
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


    $scope.structuralInfo = [];
    structuralInfo.getAll().success(function(data){
      $scope.structuralInfo=data;
      $scope.categories = data[0].categories;
    });

    $scope.rowCollectionPartners = [];
    $scope.rowCollectionPartners = news.news;

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

      if($scope.$parent.uploadedImagePathWithSuccess != undefined)
      {
        imagem = '/uploads/'+$scope.$parent.uploadedImagePathWithSuccess;
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
      $scope.$parent.uploadedImagePathWithSuccess = undefined;
      $scope.newNewsForm.$setPristine();
    };

    $scope.fileNameChanged = function (ele) {
      var files = ele.files;
      var l = files.length;
      var namesArr = [];

      console.log($scope.$parent.financeFileNow);

      console.log($scope);
      console.log(ele);
      console.log(ele.id);

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
        $scope.$parent.uploadedImagePathWithSuccess = data;
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
    controller: function($scope,$element, news, categories, structuralInfo, stories, partners, team, projects, stats)
    {
      //console.log(news);
      $scope.news = news.news;
      $scope.newsBulk = news;
      $scope.categoriesBulk = categories;
      $scope.storiesBulk = stories;
      $scope.partnersBulk = partners;
      $scope.teamsBulk = team;
      $scope.projectsBulk = projects;
      $scope.statsBulk = stats;
      $scope.structuralInfo = structuralInfo;
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

        console.log(scope.show);

        if(scope.show == 'structure' || scope.show == 'finance')
        {

          if(elm[0].outerText.length >= attrs.contentlength)
          {
            if(event.keyCode !== 8) {
              event.preventDefault();
            }
          }
          else
          {
            for(var i=0; i<elm[0].parentElement.children.length; i++){
              if(elm[0].parentElement.children[i].contentEditable=="true")
              {
                if(elm[0].parentElement.children[i].id == attrs.id)
                {
                  elm[0].parentElement.children[i+1].innerHTML = "<b>"+attrs.$$element[0].firstChild.length+"</b> / <b>"+attrs.contentlength+"</b>";
                }
              }
            }

            ctrl.$setViewValue(elm.html());

            var esc = event.which == 27,
            el = event.target;

            var enter = event.which == 13;
            var backspace = event.which == 8;
            var del = event.which == 46;

            if (esc) {
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
                case('finance'):
                  scope.structuralInfo.update(15,elm[0].outerText);
                break;

                case('structure'):

                switch(elm[0].id)
                {
                  case('cabecalhoTitle'):
                    scope.structuralInfo.update(1,elm[0].outerText);
                  break;
                  case('cabecalhoTexto'):
                    scope.structuralInfo.update(2,elm[0].outerText);
                  break;
                  case('doacoesTitle1'):
                    scope.structuralInfo.update(3,elm[0].outerText);
                  break;
                  case('doacoesText1'):
                    scope.structuralInfo.update(4,elm[0].outerText);
                  break;
                  case('doacoesTitle2'):
                    scope.structuralInfo.update(5,elm[0].outerText);
                  break;
                  case('doacoesText2'):
                    scope.structuralInfo.update(6,elm[0].outerText);
                  break;
                  case('doacoesTitle3'):
                    scope.structuralInfo.update(7,elm[0].outerText);
                  break;
                  case('doacoesText3'):
                    scope.structuralInfo.update(8,elm[0].outerText);
                  break;
                  case('doacoesTitle4'):
                    scope.structuralInfo.update(9,elm[0].outerText);
                  break;
                  case('doacoesText4'):
                    scope.structuralInfo.update(10,elm[0].outerText);
                  break;
                  case('textoPaypal'):
                    scope.structuralInfo.update(11,elm[0].outerText);
                  break;
                  case('textoChamada'):
                    scope.structuralInfo.update(12,elm[0].outerText);
                  break;
                  case('textoTransferencia'):
                    scope.structuralInfo.update(13,elm[0].outerText);
                  break;
                  case('textoDoacao'):
                    scope.structuralInfo.update(14,elm[0].outerText);
                  break;

                }

                break;
              }

              var selectedCell = elm[0].parentElement.cellIndex;
              var changedText = elm[0].outerText;

              ctrl.$setViewValue(elm.html());
              el.blur();
              event.preventDefault();
            }
          }

        }
        else{ //if scope is any of the other categories except structure

          console.log(elm[0].contentlength);

          if(elm[0].outerText.length >= attrs.contentlength)
          {
            if(event.keyCode !== 8) {
              event.preventDefault();
            }
          }
          else
          {
            if(elm[0].parentElement.children.length > 2)
              elm[0].parentElement.children[1].innerHTML = "<b>"+attrs.$$element[0].firstChild.length+"</b> / <b>"+attrs.contentlength+"</b>";

            ctrl.$setViewValue(elm.html());

            var esc = event.which == 27,
            el = event.target;

            var enter = event.which == 13;
            var backspace = event.which == 8;
            var del = event.which == 46;

            if (esc) {
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

                scope.categoriesBulk.update(alteredCategory);
                break;

                case('stories'):

                alteredStory = scope.story;

                switch(selectedCell)
                {
                  case(0):
                    alteredStory.title = changedText;
                  break;
                  case(1):
                    alteredStory.text = changedText;
                  break;
                  case(2):
                    alteredStory.videoLink = changedText;
                    var iframe = document.getElementById('storiesVideoIFrame');
                    iframe.src = changedText;
                  break;
                }

                scope.storiesBulk.update(alteredStory);


                break;
                case('partners'):

                alteredPartner = scope.partner;

                switch(selectedCell)
                {
                  case(0):
                    alteredPartner.name = changedText;
                  break;
                  case(1):
                    alteredPartner.iconPath = changedText;
                  break;
                  case(2):
                    alteredPartner.link = changedText;
                  break;
                }

                scope.partnersBulk.update(alteredPartner);


                break;
                case('team'):

                alteredTeamMember = scope.teammember;

                switch(selectedCell)
                {
                  case(0):
                    alteredTeamMember.name = changedText;
                  break;
                  case(1):
                    alteredTeamMember.position = changedText;
                  break;
                  case(2):
                    alteredTeamMember.imagePath = changedText;
                  break;
                }

                scope.teamsBulk.update(alteredTeamMember);


                break;

                case('projects'):

                alteredProject = scope.project;

                switch(selectedCell)
                {
                  case(0):
                    alteredProject.title = changedText;
                  break;
                  case(1):
                    alteredProject.description = changedText;
                  break;
                  case(2):
                    alteredProject.imagePath = changedText;
                  break;
                }

                scope.projectsBulk.update(alteredProject);


                break;

                case('stats'):

                alteredStat = scope.stat;

                switch(selectedCell)
                {
                  case(0):
                    alteredStat.description = changedText;
                  break;
                  case(1):
                    alteredStat.number = changedText;
                  break;
                  case(2):
                    alteredStat.imagePath = changedText;
                  break;
                }

                scope.statsBulk.update(alteredStat);


                break;

              }

              var selectedCell = elm[0].parentElement.cellIndex;
              var changedText = elm[0].outerText;

              ctrl.$setViewValue(elm.html());
              el.blur();
              event.preventDefault();
            }
          }
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
    controller: function($scope,$element, news, partners, team, projects, stats)
    {
      //console.log(news);
      $scope.news = news.news;
      $scope.newsBulk = news;
      $scope.partnersBulk = partners;
      $scope.teamsBulk = team;
      $scope.projectsBulk = projects;
      $scope.statsBulk = stats;
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){

        console.log(attrs.ngModel);

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

          switch(attrs.ngModel)
          {
            case("newsImage"):
              scope.$parent.newsPost.imageLink = '/uploads/'+ data;
              scope.newsBulk.update(scope.$parent.newsPost);
            break;
            case("partnerImage"):
              scope.$parent.partner.iconPath = '/uploads/'+ data;
              scope.partnersBulk.update(scope.$parent.partner);
            break;
            case("teamImage"):
              scope.$parent.teammember.imagePath = '/uploads/'+ data;
              scope.teamsBulk.update(scope.$parent.teammember);
            break;
            case("projectImage"):
              scope.$parent.project.imagePath = '/uploads/'+ data;
              scope.projectsBulk.update(scope.$parent.project);
            break;
            case("statsImage"):
              scope.$parent.stat.imagePath = '/uploads/'+ data;
              scope.statsBulk.update(scope.$parent.stat);
            break;
          }



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

    $scope.structuralInfo = [];
    structuralInfo.getAll().success(function(data){
      $scope.structuralInfo=data;
      $scope.categories = data[0].categories;
    });

    $scope.collection = [];
    $scope.collection = categories.categories;

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

      if($scope.$parent.uploadedImagePathWithSuccess != undefined)
      {
        imagem = '/uploads/'+$scope.$parent.uploadedImagePathWithSuccess;
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
      $scope.$parent.uploadedImagePathWithSuccess = undefined;
      $scope.newCategoryForm.$setPristine();
    };

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
        }
      }

      $scope.addStory = function()
      {
        var currentDate = Date.now();

        if(stories.length <= 4)
        {
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
        }
        else
        {
          alert("Número Máximo de Histórias Inseridas!");
        }
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

        if(window.matchMedia( "(max-width: 378px)" ))
        {

        }
        else {

        }

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

          var imagem = '';

          if($scope.$parent.uploadedImagePathWithSuccess != undefined)
          {
            imagem = '/uploads/'+$scope.$parent.uploadedImagePathWithSuccess;
          }
          else
          {
            imagem = $scope.imagem;
          }

          if(!$scope.nomeParceiro || $scope.nomeParceiro === '') { return; }
          partners.create({
            name: $scope.nomeParceiro,
            iconPath: imagem,
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
          $scope.$parent.uploadedImagePathWithSuccess = undefined;
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

            console.log($scope.team.length);
            if($scope.team.length <= 9)
            {
              var currentDate = Date.now();
              var imagem = '';

              if($scope.$parent.uploadedImagePathWithSuccess != undefined)
              {
                imagem = '/uploads/'+$scope.$parent.uploadedImagePathWithSuccess;
              }
              else
              {
                imagem = $scope.imagem;
              }

              if(!$scope.nomeMembro || $scope.nomeMembro === '') { return; }
              team.create({
                name: $scope.nomeMembro,
                position: $scope.posicaoMembro,
                imagePath: imagem,
                date: currentDate,
              }).success(function(data)
              {
                $scope.rowCollectionTeam.push(data);
              });
              $scope.nomeMembro = '';
              $scope.posicaoMembro = '';
              $scope.linkMembro = '';
              currentDate = '';
              $scope.$parent.uploadedImagePathWithSuccess = undefined;
              $scope.newTeamForm.$setPristine();
            }
            else
            {
              alert("Número Máximo de Membros Inseridos!");
            }
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

              if(projects.length <= 3)
              {
                var currentDate = Date.now();

                var imagem = '';

                if($scope.$parent.uploadedImagePathWithSuccess != undefined)
                {
                  imagem = '/uploads/'+$scope.$parent.uploadedImagePathWithSuccess;
                }
                else
                {
                  imagem = $scope.imagem;
                }

                if(!$scope.nomeProjecto || $scope.nomeProjecto === '') { return; }
                projects.create({
                  title: $scope.nomeProjecto,
                  description: $scope.descricaoProjecto,
                  imagePath: imagem,
                  date: currentDate,
                }).success(function(data)
                {
                  $scope.rowCollectionProject.push(data);
                });
                $scope.nomeProjecto = '';
                $scope.descricaoProjecto = '';
                $scope.linkProjecto = '';
                currentDate = '';
                $scope.$parent.uploadedImagePathWithSuccess = undefined;
                $scope.newProjectForm.$setPristine();
              }
              else
              {
                alert("Número Máximo de Projectos Inserido!");
              }
            };
          }]);

          app.controller('DonateBoxCtrl', [
            '$scope',
            '$http',
            '$element',
            '$window',
            'structuralInfo',
            function($scope,$http,$element,$window,structuralInfo)
            {


              $scope.structuralInfo = [];
              structuralInfo.getAll().success(function(data){
                $scope.structuralInfo=data;
                $scope.donateTexts = data[0].textos;
              });

              $scope.changePage = function (id) {

                switch(id)
                {
                  case(1):
                  $window.location.href = '/donatenow?donationMethod=paypal';
                  break;
                  case(2):
                  $window.location.href = '/donatenow?donationMethod=call';
                  break;
                  case(3):
                  $window.location.href = '/donatenow?donationMethod=transfer';
                  break;
                  case(4):
                  $window.location.href = '/donatenow?donationMethod=donation';
                  break;
                }


              };

              $scope.selectedText = 1;

            }]);

            app.controller('StoryBoxCtrl', [
              '$scope',
              '$http',
              '$element',
              'structuralInfo',
              function($scope,$http,$element,structuralInfo)
              {

                $scope.structuralInfo = [];
                structuralInfo.getAll().success(function(data){
                  $scope.structuralInfo=data;
                  $scope.donateTexts = data[0].textos;
                });



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

                    $scope.dataLoaded=true;

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


                app.controller('StatsCtrl', [
                  '$scope',
                  '$http',
                  '$element',
                  'stats',
                  function($scope,$http,$element,stats)
                  {
                    $scope.stats = stats.stats;

                    $scope.stats = [];
                    stats.getAll().success(function(data){
                      $scope.stats=data;
                      $scope.rowCollectionStats=data;
                    });

                    $scope.removeStat = function(row, stat)
                    {
                      var index = $scope.rowCollectionStats.indexOf(stat);
                      if (index !== -1) {
                        stats.delete(stat);
                        $scope.rowCollectionStats.splice(index, 1);
                      }
                    }

                    $scope.addStat = function()
                    {
                      if(stats.length <= 4)
                      {
                        var currentDate = Date.now();

                        var imagem = '';

                        if($scope.$parent.uploadedImagePathWithSuccess != undefined)
                        {
                          imagem = '/uploads/'+$scope.$parent.uploadedImagePathWithSuccess;
                        }
                        else
                        {
                          imagem = $scope.imagem;
                        }

                        if(!$scope.descricaoStat || $scope.descricaoStat === '') { return; }
                        stats.create({
                          description: $scope.descricaoStat,
                          number: $scope.numeroStat,
                          imagePath: imagem,
                          date: currentDate,
                        }).success(function(data)
                        {
                          $scope.rowCollectionStats.push(data);
                        });
                        $scope.descricaoStat = '';
                        $scope.numeroStat = '';
                        $scope.linkStat = '';
                        currentDate = '';
                        $scope.$parent.uploadedImagePathWithSuccess = undefined;
                        $scope.newStatsForm.$setPristine();
                      }
                      else {
                      {
                        alert("Número Máximo de Estatísticas Inserido");
                      }
                      }
                    };
                  }]);


                  app.controller('DonationCtrl', [
                    '$scope',
                    '$http',
                    '$element',
                    'structuralInfo',
                    function($scope,$http,$element,structuralInfo)
                    {

                      $scope.currentPage = 1;
                      $scope.currentValue = 250;

                      structuralInfo.getAll().success(function(data){
                        $scope.structuralInfo=data;
                      });


                      $scope.donationMethod = window.donationMethod;

                      switch($scope.donationMethod)
                      {
                        case('paypal'):
                        $scope.currentPage = 1;
                        break;
                        case('call'):
                        $scope.currentPage = 2;
                        break;
                        case('transfer'):
                        $scope.currentPage = 3;
                        break;
                        case('donation'):
                        $scope.currentPage = 4;
                        break;
                      }

                      //Slider with selection bar
                      $scope.slider_visible_bar = {
                        value:250,
                        minValue:1,
                        maxValue:3000,
                        options: {
                          floor: 0,
                          ceil: 3000,
                          showSelectionBar: true,
                          step: 1,
                          precision: 0,
                          hideLimitLabels: true,
                          hidePointerLabels:true,
                          disabled: false,
                          draggableRange: true,
                        }
                      };

                      $scope.changePage = function(id)
                      {
                        $scope.currentPage = id;
                      }

                    }]);
                    app.controller('MembershipCtrl', [
                      '$scope',
                      '$http',
                      '$element',
                      'vcRecaptchaService',
                      'members',

                      function($scope,$http,$element,vcRecaptchaService,members)
                      {

                        $scope.members = [];
                        members.getAll().success(function(data){
                          $scope.members=data;
                        });

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
                        $scope.submitMemberForm = function () {
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

                            if(!$scope.nomeMembro || $scope.nomeMembro === '') { return; }
                            if(!$scope.emailMembro || $scope.emailMembro === '') { return; }
                            if(!$scope.telefoneMembro || $scope.telefoneMembro === '') { return; }

                            members.create({
                              name: $scope.nomeMembro,
                              email: $scope.emailMembro,
                              telephone: $scope.telefoneMembro,
                              address: $scope.moradaMembro+", "+$scope.postalcode1+"-"+$scope.postalcode2,
                              birthDate: $scope.dataNascimentoMembro,
                              subscribedToNewsLetter: $scope.checkboxNewsletter
                            });
                            $scope.nomeMembro = '';
                            $scope.emailMembro = '';
                            $scope.telefoneMembro = '';
                            $scope.moradaMembro = '';
                            $scope.postalcode1 = '';
                            $scope.postalcode2 = '';
                            $scope.dataNascimentoMembro = '';
                            $scope.checkboxNewsletter = '';
                            $scope.newMemberForm.$setPristine();


                          } else {
                            console.log('Failed validation');
                            // In case of a failed validation you need to reload the captcha
                            // because each response can be checked just once
                            vcRecaptchaService.reload($scope.widgetId);
                          }
                        };

                        $scope.myDate = new Date();

                        $scope.minDate = new Date(
                          $scope.myDate.getFullYear(),
                          $scope.myDate.getMonth() - 2,
                          $scope.myDate.getDate());

                          $scope.maxDate = new Date(
                            $scope.myDate.getFullYear(),
                            $scope.myDate.getMonth() + 2,
                            $scope.myDate.getDate());

                            $scope.onlyWeekendsPredicate = function(date) {
                              var day = date.getDay();
                              return day === 0 || day === 6;
                            };

                          }
                        ]);


                        app.controller('FinanceCtrl', [
                          '$scope',
                          '$http',
                          '$element',
                          'structuralInfo',
                          function($scope,$http,$element,structuralInfo)
                          {

                            $scope.structuralInfo = [];
                            structuralInfo.getAll().success(function(data){
                              $scope.structuralInfo=data;
                              $scope.documentLink = data[0].financeLink;
                            });

                            $scope.fileNameChangedFinance = function (ele) {
                              var files = ele.files;
                              var l = files.length;
                              var namesArr = [];

                              console.log($scope);
                              console.log(ele);
                              console.log(ele.id);

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
                                $scope.$parent.financeFile = data;
                                $scope.documentLink = "uploads/"+data;
                                $scope.structuralInfo.update(15,"uploads/"+data);
                              })
                              .error(function(err){
                                console.log("file upload - acabei com erro - " + err);
                              });

                            }

                          }]);

                        app.controller('MembersCtrl', [
                          '$scope',
                          '$http',
                          '$element',
                          'members',
                          function($scope,$http,$element,members)
                          {
                            $scope.members = members.members;

                            $scope.members = [];
                            members.getAll().success(function(data){
                              $scope.members=data;
                              $scope.rowCollectionMembers=data;
                            });

                            $scope.removeMember = function(row, member)
                            {
                              var index = $scope.rowCollectionMembers.indexOf(member);
                              if (index !== -1) {
                                members.delete(member);
                                $scope.rowCollectionMembers.splice(index, 1);
                              }
                            }

                            $scope.addMember = function()
                            {
                              if(!$scope.nomeMembro || $scope.nomeMembro === '') { return; }
                              if(!$scope.emailMembro || $scope.emailMembro === '') { return; }
                              if(!$scope.telefoneMembro || $scope.telefoneMembro === '') { return; }

                              members.create({
                                name: $scope.nomeMembro,
                                email: $scope.emailMembro,
                                telephone: $scope.telefoneMembro,
                                address: $scope.moradaMembro+", "+$scope.postalcode1+"-"+$scope.postalcode2,
                                birthDate: $scope.dataNascimentoMembro,
                                subscribedToNewsLetter: $scope.checkboxNewsletter
                              });
                              $scope.nomeMembro = '';
                              $scope.emailMembro = '';
                              $scope.telefoneMembro = '';
                              $scope.moradaMembro = '';
                              $scope.postalcode1 = '';
                              $scope.postalcode2 = '';
                              $scope.dataNascimentoMembro = '';
                              $scope.checkboxNewsletter = '';
                              $scope.newMemberForm.$setPristine();
                            };
                          }]);


                          app.filter('boolText',boolText);

                          function boolText() {
                            return function (boolValue) {
                              if (boolValue === true)
                              return "Sim";
                              else
                              return "Não";
                            }
                          }

                          app.filter('wordCounter', function () {
                            return function (value) {
                              if (value && typeof value === 'string') {
                                return value.trim().split(/\s+/).length;
                              } else {
                                return 0;
                              }
                            };
                          })
