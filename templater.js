var Templater = {
	body: document.getElementsByTagName('body')[0],
	run: function() {
		var bootstrapButtonsArr = this.findElements();
		for (let i = 0; i < bootstrapButtonsArr.length; i++) {
			this.addElement(this.body, this.createElement());
		}
		this.deleteElements(bootstrapButtonsArr);
	},
	findElements: function () {
		return document.getElementsByTagName('bootstrap_button');
	},
	createElement: function() {
		var btn = document.createElement('button');
		btn.className = 'btn btn-default';
		btn.innerHTML = 'Some Text';
		return btn;
	},
	addElement: function(parent, element) {
		parent.appendChild(element);
	},
	deleteElements: function(elemArr){
		while (elemArr.length > 0) {
			elemArr[elemArr.length - 1].remove();
		}
	}
}

Templater.run();