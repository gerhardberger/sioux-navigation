var events = require('events');
var Segue = require('sioux-segue');
var huk = require('huk-browserify');

var html =  huk()
	.div({ 'data-navigation': 'bar' }, huk()
		.div({ 'data-navigation': 'bar-back' }, huk.button({ 'class': 'ui-button touch' }, '<'))
		.div({ 'data-navigation': 'bar-title' })
		.div({ 'data-navigation': 'bar-next' }))
	.div({ 'data-navigation': 'content' }, huk.div({ 'class': 'ui-window' })).children;

function insertContent (what, to) {
	if (!(what instanceof HTMLElement || what instanceof NodeList || what instanceof Array)) {
		throw new Error('Content function not returning DOM!');
	}
	if (what instanceof HTMLElement) {
		to.appendChild(what);
	}
	else if (what instanceof NodeList || what instanceof Array) {
		for (var i = 0; i < what.length; ++i)
			to.appendChild(what[i]);
	}
}

function setContentHeight(height, self) {
	self.navContent.style.height = height;
	self.segue.element.style.height = height;
	self.segue.push.style.height = height;
}

module.exports = Navigation;

function Navigation (element, options) {
	var self = this;
	if (!options) options = {};

	self.element = element.element || element;
	self.stack = [];
	self.isBarHidden = options.isBarHidden;

	insertContent(html, self.element);

	self.bar = self.element.querySelector('div[data-navigation="bar"]');
	self.navContent = self.element.querySelector('div[data-navigation="content"] > div.ui-window');

	// Setting up the segue in content area
	self.segue = new Segue(self.navContent, 'push');
	self.content = self.segue.element;

	if (self.isBarHidden) {
		self.bar.style.display = 'none';
		var newHeight = self.isToolbarHidden ? '100%' : '92%';
		setContentHeight(newHeight, self);
	}

	// Initalizing with the first elem of the stack
	self.stack.push(options.initWith);
	var o = options.initWith;
	self.bar.querySelector('div[data-navigation="bar-title"]').innerHTML = o.title || 'Title';
	self.segue.init(o.content, function () {
		o.complete(self.content);
	});

	self.back = self.bar.querySelector('div[data-navigation="bar-back"] button');
	self.back.addEventListener('tap', function () {
		self.pop();
	}, false);
}

Navigation.prototype.push = function (o) {
	if (!o) throw new Error('No navigation object!');
	var self = this;

	self.stack.push(o);
	if (self.stack.length === 2) self.back.style.opacity = '1';
	self.bar.querySelector('div[data-navigation="bar-title"]').innerHTML = o.title || 'Title';

	self.segue.wind(o.content, function () {
		self.content = self.segue.element;
		o.complete(self.content);
	});

	return this;
};

Navigation.prototype.pop = function (cb) {
	var self = this;
	if (self.stack.length === 1) return;
	self.stack.pop();
	if (self.stack.length === 1) self.back.style.opacity = '0';
	var o = self.stack[self.stack.length - 1];
	self.bar.querySelector('div[data-navigation="bar-title"]').innerHTML = o.title || 'Title';
	self.segue.unwind(o.content, function () {
		self.content = self.segue.element;
		o.complete(self.content);
		if (cb) cb();
	});
	return this;
};

Navigation.prototype.hideBar = function(cb) {
	var self = this;
	if (self.isBarHidden) return;

	var handler = function () {
		self.isBarHidden = true;
		setContentHeight((parseInt(self.navContent.style.height, 10) + 8) + '%', self);
		this.style.display = 'none';
		if (cb) cb();
		this.removeEventListener('webkitTransitionEnd', handler, false);
	};
	self.bar.style.webkitTransform = 'translate3d(0, -100%, 0)';
	self.bar.addEventListener('webkitTransitionEnd', handler, false);
	return this;
};

Navigation.prototype.showBar = function(cb) {
	var self = this;
	if (!self.isBarHidden) return;
		
	var handler = function () {
		self.isBarHidden = false;
		setContentHeight((parseInt(self.navContent.style.height, 10) - 8) + '%', self);
		if (cb) cb();
		this.removeEventListener('webkitTransitionEnd', handler, false);
	};
	self.bar.style.display = 'table';
	setTimeout(function() { self.bar.style.webkitTransform = 'translate3d(0, 0, 0)'; }, 10);
	self.bar.addEventListener('webkitTransitionEnd', handler, false);
	return this;
};