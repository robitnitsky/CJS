var Templater = {
	body: document.getElementsByTagName('body')[0],
	btnTemplate: '<button class="btn btn-default" type="submit">Some Text</button>',
	run: function() {
		var bootstrapButtonsArr = this.findElements();
		for (let i = 0; i < bootstrapButtonsArr.length;) {
			bootstrapButtonsArr[i].outerHTML = this.btnTemplate;
		}
	},
	findElements: function () {
		return document.getElementsByTagName('bootstrap_button');
	}
}

Templater.run();