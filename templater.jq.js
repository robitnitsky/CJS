(function ($) {


    function init (elements, options) {
        const tags = options.tags;
        output(elements, tags);
    }

    function getTemplateParameters (template) {
        const templateParameter = /\{\{(\w+?)\}\}/ig;
        let execResults;
        let templateParameters = [];
        while ((execResults = templateParameter.exec(template)) !== null) {
            templateParameters.push(execResults[1]);
        }
        return templateParameters;
    }

    function render (templateParameters, renderedTemplate, element) {
        for (let i = 0; i < templateParameters.length; i++) {
            let tempStr = '{{' + templateParameters[i] + '}}';
            if ($(element).attr(templateParameters[i])) {
                renderedTemplate = renderedTemplate.replace(tempStr, element.getAttribute(templateParameters[i]));
            } else {
                renderedTemplate = renderedTemplate.replace(tempStr, element.innerHTML);
            }
        }
        return renderedTemplate;
    }

    function replaceElement (element, renderedTemplate) {
        console.log(element)
        element.outerHTML = renderedTemplate;
    }

    function output (elements, tags) {
        for (key in tags) {
            let elementsHtml = elements.find(key);
            let templateParameters = getTemplateParameters(tags[key]);
            elementsHtml.each(function(index, element){
                if ($(element).find(key).length !== 0) {
                    output($(element), tags);
                }
                replaceElement(element, render(templateParameters, tags[key], element));
            })
        }
    }

    $.fn.templater = function(options) {
        return init(this, options);
    };

})(jQuery)