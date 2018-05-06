var Templater = {
	templates: {},
	element: {},
	run: function () {
		this.render(this.templates, this.element);
	},
	findElements: function (tag) {
		this.element[tag] = document.getElementsByTagName(tag)[0];
	},
	addTag: function (tag, template) {
		this.templates[tag] = template;
		this.findElements(tag);
	},
	render: function (templates, element) {
		var templateItem = this.templates['bootstrap_button'];
		var elementItem = this.element['bootstrap_button'];
		templateItem = templateItem.replace(/{{class}}/, elementItem.className);
		templateItem = templateItem.replace(/{{type}}/, elementItem.getAttribute("type"));
		if (elementItem.innerHTML.search(/<\w+>/) > -1) {
			templateItem = templateItem.replace(/{{html}}/, elementItem.innerHTML);
			elementItem.outerHTML = templateItem
		} else {
			templateItem = templateItem.replace(/{{html}}/, '');
			this.element['bootstrap_button'].outerHTML = templateItem
			var newBtn = document.getElementsByTagName('button')[0].value = this.element['bootstrap_button'].innerHTML;
		}
	}
}