var Templater = {
	templates: {},
	run: function () {
		for (var tag in this.templates) {
			for (let i = 0; i < this.findElements(tag).length;) {
				this.findElements(tag)[i].outerHTML = this.templates[tag];
			}
		}
	},
	findElements: function (tag) {
		return document.getElementsByTagName(tag);
	},
	addTag: function (tag, template) {
		this.templates[tag] = template;
	}
}