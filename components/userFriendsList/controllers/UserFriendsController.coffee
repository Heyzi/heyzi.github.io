#UserFriendsController#

'use strict';

UserFriendsModule.controller 'UserFriendsController', ($scope, $location, $state, $timeout, $stateParams, RestModel, Loader, LocalStorage, params,currentUser) ->

    $scope.stateParams = $stateParams;
    $scope.window = window;
    $scope.params = params;

    $scope.page = 1;
    $scope.pageSize = 6;

    $scope.userId = $scope.stateParams.userId;
    $scope.currentUser = currentUser;

    $scope.loading = true;
    $scope.resultUserFriends = false;

    $scope.back = () ->
        $scope.window.history.back();

    $scope.home = () ->
        $state.transitionTo('friends');

    $scope.userFriendsArray = null;


    # загружаем список друзей
    RestModel.getFriends(params, $scope.userId).then(
        (data)->
            $scope.loading = false;
            $scope.countFriends = data.response.count;
            $scope.userFriends = RestModel.isWorkingFriendsObject(data);
            $scope.userFriendsArray = null;
        (error) ->
            console.log(error);

    )

    $scope.getListFriendsOnlineOrDelete = (type) ->
        $scope.userFriendsArray = RestModel.friendsOnlineOrDelete(type, $scope.userFriends);


    $scope.getListFriends = () ->
        $scope.userFriendsArray = null;

    $scope.more = (user) ->
        LocalStorage.setItem('last', user.last_seen);
        $state.transitionTo('user', {userId: user.id || user.uid});

    $scope.getStatisticPage = () ->
        $state.transitionTo('statistics', {userId:$scope.userId});
