// создал объект для локализации свойств и методов
let Templater = {
	// объект для хранения добавляемых темплейтов
	templates: {},
	//метод для вызова всех необходимых для работы функций
	run: function () {
		for (key in this.templates) {
			let elements = this.findElements(key);

			for (let i = 0; i < elements.length; i++) {
				this.replace(elements[i], this.render(this.findTemplateParameters(this.templates[key]), this.templates[key], elements[i]));
			}
		}
	},
	//метод для поиска я кастомных элементов на странице
	findElements: function (tag) {
		return Array.prototype.slice.call(document.getElementsByTagName(tag));
	},
	//метод для добавления тэгов бутстрап
	addTag: function (tag, template) {
		//заполняю объект. в качестве ключа имя кастомного тега, а значение - необходимый шаблон
		this.templates[tag] = template;
	},
	// метод заменяющей невалидный HTML на валидный
	replace: function (element, template) {
		element.outerHTML = template;
	},
	findTemplateParameters: function (template) {
		// формируем RegExp для поисков параметров в шаблоне
		let regExp = /\{\{(\w+?)\}\}/ig;
		// служебная переменная для результатов метода .exec
		let execResultsArray;
		// переменная для хранения всех параметров шаблона в виде строки без скобок
		let templateParameters = [];
		// цикл для извлечения параметров шаблона из строки шаблона
		while ((execResultsArray = regExp.exec(template)) !== null) {
			// записываем в массив параметров шаблона подстроку совпадения (из круглых скобок),
			// чтобы избавиться от {{...}}
			templateParameters.push(execResultsArray[1]);
		}
		return templateParameters;
	},
	//метод для преобразования шаблона в валидный HTML элемент
	render: function (templateParameters, renderedTemplate, element) {
		//в цикле по параметрам шаблона, используя имя параметра, генерирую строку для замены
		for (let i = 0; i < templateParameters.length; i++) {
			//переменная, чтобы не писать длинное выражение в replace()
			let tempStr = '{{' + templateParameters[i] + '}}';
			// в цикле по очереди заменяю атрибуты темплейта на реальные аттрибуты
			// также нужно исключить строку {{html}} так как нет такого атрибута 'html'
			if (templateParameters[i] !== 'html') {
				renderedTemplate = renderedTemplate.replace(tempStr, element.getAttribute(templateParameters[i]));
			} else {
				renderedTemplate = renderedTemplate.replace(tempStr, element.innerHTML);
			}
		}
		//возвращаю готовый HTML в виде строки для последующей замены
		return renderedTemplate;
	}
}