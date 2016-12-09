// Generated by CoffeeScript 1.7.1
'use strict';
ProcessingPhotoModule.controller('ProcessingPhotoController', function($scope, $stateParams, $location, $timeout, RestModel, Loader, params, currentUser, friends) {
  $scope.params = params;
  $scope.window = window;
  $scope.loading = false;
  $scope.isLikes = [];
  $scope.result = false;
  $scope.count = 0;
  $scope.stopped = false;
  $scope.lookedItems = false;
  $scope.procent = 0;
  $scope.type = {};
  $scope.type.typeUsers = "all";
  $scope.userId = $stateParams.userId;
  $scope.currentUser = currentUser.response[0];
  $scope.countFriends = friends.response.count;
  $scope.userFriends = RestModel.isWorkingFriendsObject(friends);
  $scope.back = function() {
    $scope.stopped = true;
    if (Loader.ID !== null) {
      Loader.stopLoad();
    }
    return $scope.window.history.back();
  };
  $scope.allFriends = angular.copy($scope.userFriends);
  $scope.scaned = function() {
    var scaningUsers, userFriends;
    userFriends = angular.copy($scope.userFriends);
    Loader.startLoad();
    $scope.isLikes = [];
    $scope.result = false;
    $scope.stopped = false;
    $scope.procent = 0;
    $scope.count = 0;
    scaningUsers = RestModel.filteredUsers(userFriends, $scope.type.typeUsers);
    $scope.allCountUsers = scaningUsers.length;
    return $scope.searchPhotoAmongUsers(scaningUsers);
  };
  $scope.searchPhotoAmongUsers = function(userFriends) {
    var checkedUser;
    checkedUser = userFriends.splice(0, 1);
    $scope.userPhotos = [];
    $scope.userLikes = [];
    $scope.procent = 100 - Math.floor(userFriends.length * 100 / $scope.allCountUsers);
    Loader.process($scope.procent);
    if (checkedUser !== void 0) {
      return $timeout(function() {
        return RestModel.getPhoto(checkedUser[0].id, $scope.params, 1000, "profile").then(function(data) {
          var photos;
          if (angular.isDefined(data.response && data.response.items)) {
            photos = data.response.items;
            if (photos.length === 0) {
              return $scope.searchPhotoAmongUsers(userFriends);
            } else {
              return $scope.getLikesFromsPhotos(checkedUser, userFriends, photos);
            }
          } else {
            return $scope.searchPhotoAmongUsers(userFriends);
          }
        }, function(error) {
          console.log(error);
          return $scope.searchPhotoAmongUsers(userFriends);
        });
      }, 300);
    } else {
      return console.log('no');
    }
  };
  $scope.getLikesFromsPhotos = function(checkedUser, userFriends, photos) {
    var tempPhotos;
    tempPhotos = '';
    if (photos.length < 25) {
      return $timeout(function() {
        return RestModel.getLikesExecute($scope.userId, photos, $scope.params, "photo").then(function(likes) {
          $scope.userPhotos.push(photos);
          $scope.userLikes.push(likes.response);
          return $scope.isSearchLikes(checkedUser, userFriends, $scope.userPhotos, $scope.userLikes);
        }, function(error) {
          return console.log(error);
        });
      }, 300);
    } else {
      tempPhotos = photos.splice(0, 24);
      return $timeout(function() {
        return RestModel.getLikesExecute($scope.userId, tempPhotos, $scope.params, "photo").then(function(likes) {
          $scope.userPhotos.push(tempPhotos);
          $scope.userLikes.push(likes.response);
          return $scope.getLikesFromsPhotos(checkedUser, userFriends, photos);
        }, function(error) {
          return console.log(error);
        });
      }, 300);
    }
  };
  $scope.isSearchLikes = function(checkedUser, userFriends, userPhotos, userLikes) {
    $scope.isLikes.push({
      user: checkedUser,
      photos: [],
      photosCount: ''
    });
    angular.forEach(userLikes, function(likes) {
      return angular.forEach(likes, function(like, key) {
        var photoId;
        photoId = parseInt(key.replace(/\D+/g, ""));
        return angular.forEach(like.users, function(user) {
          if (user === parseInt($scope.userId)) {
            if (userPhotos) {
              return $scope.addPhotoWithLike(checkedUser, photoId, userPhotos);
            }
          }
        });
      });
    });
    if ($scope.isLikes.length > 0) {
      $scope.result = true;
    }
    $scope.count = $scope.count + 1;
    if (userFriends.length !== 0 && !$scope.stopped) {
      return $scope.searchPhotoAmongUsers(userFriends);
    } else {
      return Loader.stopLoad();
    }
  };
  $scope.addPhotoWithLike = function(checkedUser, photoId, userPhotos) {
    var count;
    count = 0;
    angular.forEach(userPhotos, function(photos) {
      count = count + photos.length;
      return angular.forEach(photos, function(photo) {
        if (photo.id === photoId) {
          photo.dateText = moment.unix(photo.date).format('DD.MM.YYYY HH:mm');
          return $scope.isLikes[$scope.count].photos.push(photo);
        }
      });
    });
    return $scope.isLikes[$scope.count].photosCount = count;
  };
  $scope.sortableDate = function(a, b) {
    var oneTime, twoTime;
    oneTime = new Date(a.date).getTime();
    twoTime = new Date(b.date).getTime();
    return twoTime - oneTime;
  };
  $scope.sortableLastPhoto = function(a, b) {
    var oneTime, twoTime;
    oneTime = new Date(a.lastPhoto.date).getTime();
    twoTime = new Date(b.lastPhoto.date).getTime();
    return twoTime - oneTime;
  };
  $scope.sortingPhoto = function() {
    var tempArray;
    if ($scope.isLikes.length > 0) {
      tempArray = [];
      angular.forEach($scope.isLikes, function(item) {
        if (item.photos.length > 0) {
          item.photos.sort($scope.sortableDate);
          item.lastPhoto = {};
          item.lastPhoto = item.photos[0];
          return tempArray.push(item);
        }
      });
      if (tempArray.length > 0) {
        tempArray.sort($scope.sortableLastPhoto);
      }
      $scope.isLikes = null;
      return $scope.isLikes = tempArray;
    }
  };
  $scope.stopScan = function() {
    return $scope.stopped = true;
  };
  return $scope.lookPhoto = function(photos) {
    $scope.lookPhotos = photos;
    $scope.lookedItems = true;
    $scope.offcet = window.pageYOffset;
    $('body').scrollTop(0);
    return true;
  };
});

//# sourceMappingURL=ProcessingPhotoController.map
