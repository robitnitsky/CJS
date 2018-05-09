var Templater = {
	templates: {},
	elements: [],
	run: function () {
		this.render(this.templates, this.elements);
	},
	findElements: function (tag) {
		this.elements = Array.prototype.slice.call(document.getElementsByTagName(tag));
	},
	addTag: function (tag, template) {
		this.templates[tag] = template;
		this.findElements(tag);
	},
	render: function (templates, elements) {
		elements.forEach(function(element) {
			let renderedElement = (function(){
				let elementAttributes = Array.prototype.slice.call(element.attributes);
				var renderedTemplate = templates[element.tagName.toLowerCase()]
				for (let i = 0; i < elementAttributes.length; i++) {
					let tempReg = '{{'+elementAttributes[i].name+'}}';
					renderedTemplate = renderedTemplate.replace(tempReg, elementAttributes[i].nodeValue);
				}
				return renderedTemplate;
			})(element)
			element.outerHTML = renderedElement;
		})
	}
}


// render: function (templates, element) {
// 	var templateItem = this.templates['bootstrap_button'];
// 	var elementItem = this.element['bootstrap_button'];
// 	templateItem = templateItem.replace(/{{class}}/, elementItem.className);
// 	templateItem = templateItem.replace(/{{type}}/, elementItem.getAttribute("type"));
// 	if (elementItem.innerHTML.search(/<\w+>/) > -1) {
// 		templateItem = templateItem.replace(/{{html}}/, elementItem.innerHTML);
// 		elementItem.outerHTML = templateItem
// 	} else {
// 		templateItem = templateItem.replace(/{{html}}/, '');
// 		this.element['bootstrap_button'].outerHTML = templateItem
// 		var newBtn = document.getElementsByTagName('button')[0].value = this.element['bootstrap_button'].innerHTML;
// 	}
// }