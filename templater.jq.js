(function ($) {

    let methods = {
        init (elements, options) {
            let tags = options.tags;
            this.output(elements, tags);
        },
        getTemplateParameters (template) {
            let regExp = /\{\{(\w+?)\}\}/ig;
            let execResultsArray;
            let templateParameters = [];
            while ((execResultsArray = regExp.exec(template)) !== null) {
                templateParameters.push(execResultsArray[1]);
            }
            return templateParameters;
        },
        render (templateParameters, renderedTemplate, element) {
            for (let i = 0; i < templateParameters.length; i++) {
                let tempStr = '{{' + templateParameters[i] + '}}';
                if (templateParameters[i] !== 'html') {
                    renderedTemplate = renderedTemplate.replace(tempStr, element.getAttribute(templateParameters[i]));
                } else {
                    renderedTemplate = renderedTemplate.replace(tempStr, element.innerHTML);
                }
            }
            return renderedTemplate;
        },
        replace (element, template) {
            element.outerHTML = template;
        },
        output (elements, tags) {
            for (key in tags) {
                let elementsHtml = elements.find(key);

                for (let i = 0; i < elementsHtml.length; i++) {
                    let templateParameters = methods.getTemplateParameters(tags[key]);
                    methods.replace(elementsHtml[i], methods.render(templateParameters, tags[key], elementsHtml[i]));
                }
            }
        }
    }

    $.fn.templater = function(options) {
        return methods.init(this, options);
    };

})(jQuery)