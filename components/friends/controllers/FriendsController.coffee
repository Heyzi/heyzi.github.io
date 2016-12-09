#FriendsController#

'use strict'

FriendsModule.controller 'FriendsController', ($scope, $location, $window, $timeout, $state, $stateParams, params, ngTableParams, LocalStorage, Loader, RestModel, currentUser) ->

#    $scope.group = {
#        name:'',
#        id:''
#    };
    # авторизованный пользователь
    if currentUser
        $scope.currentUser = currentUser;
    else
        $scope.currentUser

    # параметры авторизации и отображения списка пользователей

    $scope.openTable = false;
    $scope.loading = false;

    $scope.params = $scope.params || LocalStorage.getItem('params');

    $scope.getStat = () ->
        $state.transitionTo('statistics', {userId:$scope.currentUser.id});

    $scope.openListGroup = () ->
        $state.transitionTo('groups');

    $scope.getGlobalStat = () ->
        $state.transitionTo('global');


    # список друзей
    $scope.getListFriends = () ->
        $scope.page = 1;
        $scope.friendsOnline = [];
        $scope.openTableOnline = false;

        if !$scope.friends
            $scope.loading = true;
            RestModel.getFriends($scope.params).then(
                (data) ->
                    $scope.countFriends = data.response.count;
                    $scope.loading = false;
                    $scope.friends = RestModel.isWorkingFriendsObject(data);

                    $scope.openTable = if $scope.friends then true else false;
                (error) ->
                    console.log(error);
            );
        else
            $scope.openTable = true;


    # список друзей - онлайн
    $scope.getListFriendsOnlineOrDelete = (type) ->
        $scope.page = 1;
        $scope.friendsArray = RestModel.friendsOnlineOrDelete(type, $scope.friends);

        $scope.openTable = false;
        $scope.openTableOnline = if $scope.friendsArray then true else false;


    # выход
    $scope.signOff = () ->
        LocalStorage.removeAllItem();
        $scope.openAccess = false;
        $scope.openTable = false;

        $state.transitionTo('login');

    #получение подробной информации о пользователе
    $scope.more = (user) ->
        $state.transitionTo('user', {userId: user.id || user.uid});
        LocalStorage.setItem('page',$scope.page);


    if LocalStorage.getItem('page') then $scope.getListFriends();
    $scope.page = if LocalStorage.getItem('page') then LocalStorage.getItem('page') else 1;
    $scope.pageSize = 6;
