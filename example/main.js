var $ = require('sioux-global');
var Navigation = require('../index.js');

window.onload = function () {
	var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	var stateNav = {
		title: 'States'
		, content: function () {
			var statesHTML = document.createElement('ul');
			states.map(function (state, ix) {
				var li = document.createElement('li');
				li.innerHTML = state;
				statesHTML.appendChild(li.cloneNode(true));
			});
			return statesHTML;
		}
		, complete: function (content) {
			$('li', content).on('tap', function () {
				nav.push(stateNavs[states.indexOf(this.innerHTML)]);
			});
		}
	};

	var capitals = ['Montgomery', 'Juneau', 'Phoenix', 'Little Rock', 'Sacramento', 'Denver', 'Hartford', 'Dover', 'Tallahassee', 'Atlanta', 'Honolulu', 'Boise', 'Springfield', 'Indianapolis', 'Des Moines', 'Topeka', 'Frankfort', 'Baton Rouge', 'Augusta', 'Annapolis', 'Boston', 'Lansing', 'St. Paul', 'Jackson', 'Jefferson City', 'Helena', 'Lincoln', 'Carson City', 'Concord', 'Trenton', 'Santa Fe', 'Albany', 'Raleigh', 'Bismarck', 'Columbus', 'Oklahoma City', 'Salem', 'Harrisburg', 'Providence', 'Columbia', 'Pierre', 'Nashville', 'Austin', 'Salt Lake City', 'Montpelier', 'Richmond', 'Olympia', 'Charleston', 'Madison', 'Cheyenne']; 
	var stateNavs = capitals.map(function (capital, ix) {
		return {
			title: states[ix]
			, content: function () {
				var capitalHTML = document.createElement('ul');
				capitalHTML.innerHTML = '<li>' + capital + '</li>';
				return capitalHTML;
			}
			, complete: function (content) {
				console.log('Completed!');
			}
		};
	});

	var countryNav = {
		title: 'Country'
		, content: function () {
			var ul = document.createElement('ul');
			ul.innerHTML = '<li>United States of America</li>' +
				'<li><button class="ui-button" id="h_b">Hide bar!</button>' +
				'<button class="ui-button" id="s_b">' +
				'Show bar!</button></li>';
			return ul;
		}
		, complete: function (content) {
			$('li:first-child', content).on('tap', function () {
				nav.push(stateNav);
			});	
			$('#h_b').on('tap', function () {
				nav.hideBar();
			});

			$('#s_b').on('tap', function () {
				nav.showBar();
			});
		}
	};

	var nav = new Navigation(document.querySelector('.screen'), {
		isBarHidden: false
		, initWith: countryNav
	});
	window.nav = nav;
};