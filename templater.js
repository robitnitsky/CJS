
// создал объект для локализации свойств и методов
var Templater = {
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
		this.elements = Array.prototype.slice.call(document.getElementsByTagName(tag));
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
		elements.forEach(function(element) {
			//в цикле, используя атрибуты конкретного элемента генерирую RegExp для замены в шаблоне
			let renderedElement = (function(){
				//временая переменная со всеми атрибутами конкретного элемента
				let elementAttributes = Array.prototype.slice.call(element.attributes);
				//временная переменная для формирования обозначения темплейта, который мы преобразуем, чтобы не писать длинное выражение обращения свойству объекта
				var renderedTemplate = templates[element.tagName.toLowerCase()]
				//в цикле по атрибутам элемента, используя имя атрибута, генерирую RegExp для замены
				for (let i = 0; i < elementAttributes.length; i++) {
					//переменная, чтобы не писать длинное выражение в replace()
					let tempReg = '{{'+elementAttributes[i].name+'}}';
					// в цикле по очереди заменяю атрибуты темплейта на реальные аттрибуты
					renderedTemplate = renderedTemplate.replace(tempReg, elementAttributes[i].nodeValue);
				}
				//возвращаю готовый HTML в виде строки для последующей замены
				return renderedTemplate;
			})(element)
			//заменяю кастомную структуру на валидную
			element.outerHTML = renderedElement;
		})
	}
}