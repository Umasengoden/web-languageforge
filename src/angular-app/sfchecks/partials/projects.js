'use strict';

angular.module(
		'sfchecks.projects',
		[ 'sf.services', 'palaso.ui.listview', 'palaso.ui.typeahead', 'ui.bootstrap' ]
	)
	.controller('ProjectsCtrl', ['$scope', 'projectService', function($scope, projectService) {
		// Listview Selection
		$scope.selected = [];
		$scope.updateSelection = function(event, item) {
			var selectedIndex = $scope.selected.indexOf(item);
			var checkbox = event.target;
			if (checkbox.checked && selectedIndex == -1) {
				$scope.selected.push(item);
			} else if (!checkbox.checked && selectedIndex != -1) {
				$scope.selected.splice(selectedIndex, 1);
			}
		};
		$scope.isSelected = function(item) {
			return item != null && $scope.selected.indexOf(item) >= 0;
		};
		// Listview Data
		$scope.projects = [];
		$scope.queryProjectsForUser = function() {
			console.log("queryProjectForUser()");
			projectService.list(function(result) {
				if (result.ok) {
					$scope.projects = result.data.entries;
					$scope.projectCount = result.data.count;
				}
			});
		};
		// Remove
		$scope.removeProject = function() {
			console.log("removeProject()");
			var projectIds = [];
			for(var i = 0, l = $scope.selected.length; i < l; i++) {
				projectIds.push($scope.selected[i].id);
			}
			if (l == 0) {
				// TODO ERROR
				return;
			}
			projectService.remove(projectIds, function(result) {
				if (result.ok) {
					$scope.selected = []; // Reset the selection
					$scope.queryProjectsForUser();
					// TODO
				}
			});
		};
		// Add
		$scope.addProject = function() {
			console.log("addProject()");
			var model = {};
			model.id = '';
			model.projectname = $scope.projectName;
			projectService.update(model, function(result) {
				if (result.ok) {
					$scope.queryProjectsForUser();
				}
			});
		};

		// Fake data to make the page look good while it's being designed. To be
		// replaced by real data once the appropriate API functions are writen.
		var fakeData = {
			textsCount: -3,
			viewsCount: -93,
			unreadAnswers: -4,
			unreadComments: -12
		};

		$scope.getTextsCount = function(project) {
			// return projects.texts.count;
			return fakeData.textsCount;
		}

		$scope.getViewsCount = function(project) {
			return fakeData.viewsCount;
		}

		$scope.getUnreadAnswers = function(project) {
			return fakeData.unreadAnswers;
		}

		$scope.getUnreadComments = function(project) {
			return fakeData.unreadComments;
		}

	}])
	;
