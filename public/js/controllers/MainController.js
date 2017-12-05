syzApp.controller('MainController', ['$scope','$http', function($scope, $http) {
	'use strict';
	
	$scope.crimeData = [];
	$scope.d = new Date();
	$scope.monthNumber = $scope.d.getMonth()-2;

	//Syzygy Lat Lng
	$scope.locationLat = 51.5206362;
	$scope.locationLng = -0.1205564;

	//Get crime data using the Node API
	$scope.generateDataMap = function() {
		$http.get('/api/getCrimesData/2017-'+$scope.monthNumber+'/'+$scope.locationLat+'/'+$scope.locationLng)
		.then(function onSuccess(response) {
			$scope.crimeData = response;

			$scope.init();

		})
		.catch(function onError(response) {
			console.log(response);
		});
	}
	//Google map autocomplete
	$scope.loadSearchData = function() {
		var input = document.getElementById('locationSearch'),
			options = {
				componentRestrictions: {country: 'uk'}
			},
			autocomplete = new google.maps.places.Autocomplete(input, options);

		// Google location Autocomple search
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
			var place = autocomplete.getPlace();

			$scope.locationLat = place.geometry.location.lat(),
			$scope.locationLng = place.geometry.location.lng();

			// Get crime data from the location search
			$scope.generateDataMap();
		});
	}
	//Inititalze map with markers
	$scope.init = function() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: new google.maps.LatLng($scope.locationLat, $scope.locationLng),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

		for (i = 0; i < $scope.crimeData.data.length; i++) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng($scope.crimeData.data[i].location.latitude, $scope.crimeData.data[i].location.longitude),
				map: map
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infowindow.setContent('<h4>'+$scope.crimeData.data[i].category + '</h4><br>Location: '+$scope.crimeData.data[i].location.street.name);
					infowindow.open(map, marker);
				}
			})(marker, i));
		}
	}
	
	google.maps.event.addDomListener(window, 'load', $scope.loadSearchData);
	google.maps.event.addDomListener(window, 'load', $scope.generateDataMap);

}]);
