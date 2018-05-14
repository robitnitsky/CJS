// создал объект для локализации свойств и методов
let Templater = {
	// объект для хранения добавляемых темплейтов
	templates: {},
	//массив для хранения кастомных элементов преобразованных из HTML коллекции
	//решил хранить в таком виде так как не понял требуемую структуру объекта
	//element - сюда будет передаваться объект кастомного элемента DOM (например bootstrap_button (не строка, а именно объект))
	elements: [],
	//метод для вызова всех необходимых для работы функций
	run: function () {
		//вызов метода
		this.render(this.templates, this.elements);
	},
	//метод для поиска я кастомных элементов на странице
	findElements: function (tag) {
		//сразу преодбразую HTMLCollection в массив, чтобы в дальнейшем пользоваться методами Array
		for (let i = 0; i < Array.prototype.slice.call(document.getElementsByTagName(tag)).length; i++) {
			this.elements.push(Array.prototype.slice.call(document.getElementsByTagName(tag))[i]);
		}
	},
	//метод для добавления тэгов бутстрап
	addTag: function (tag, template) {
		//заполняю объект. в качестве ключа имя кастомного тега, а значение - необходимый шаблон
		this.templates[tag] = template;
		//вызываю поиск кастомных тегов здесь, чтобы сразу передавать параметр tag в обе функции
		this.findElements(tag);
	},
	//метод для преобразования шаблона в валидный HTML элемент
	render: function (templates, elements) {
		//чтобы заменить outerHTML каждого элемента прохожусь по ним циклом
		elements.forEach(function (element) {
			//временная переменная для формирования обозначения темплейта, который мы преобразуем, чтобы не писать длинное выражение обращения свойству объекта
			let renderedTemplate = templates[element.tagName.toLowerCase()];
			// формируем RegExp для поисков параметров в шаблоне
			let regExp = /\{\{(\w+?)\}\}/ig;
			// служебная переменная для результатов метода .exec
			let execResultsArray;
			// переменная для хранения всех параметров шаблона в виде строки без скобок
			let templateParameters = [];
			// цикл для извлечения параметров шаблона из строки шаблона
			while ((execResultsArray = regExp.exec(renderedTemplate)) !== null) {
				// записываем в массив параметров шаблона подстроку совпадения (из круглых скобок),
				// чтобы избавиться от {{...}}
				templateParameters.push(execResultsArray[1]);
			}
			//получаю строку валидного HTML для последующей замены
			let renderedElement = (function () {
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
			})(element)
			//заменяю кастомную структуру на валидную
			element.outerHTML = renderedElement;
		})
	}
}