import { TemplateReplaced } from "./TemplateReplaced";
import { TemplateWarning } from "./TemplateWarning";

/*
Happy path:
'This is a template with zero variables' -> 'This is a template with zero variables
'This is a template with a ${variable}', {variable: 'food'} -> 'This is a template with food'
'This is a template with a ${variable} and ${anotherVariable}', {variable: 'foo', anotherVariable: 'bar'} -> 'This is a template with a foo and bar'
Edge cases:
- Varoables not being found
- Non replaced variables
- Null text & null dictionary
*/
export class TemplateEngine {

    constructor(private readonly template: string, private readonly variables: Map<string, string>){}
    
    parse() : TemplateReplaced {

        if((this.isNotValidate()).length > 0) {
            const checkedWarnings = this.isNotValidate();
            return new TemplateReplaced(this.template, checkedWarnings );
        }
        const templateReplaced = this.templateWithReplacedVariables();
        return this.addWarningsAboutNonReplacedVariables(templateReplaced);

    }
    private templateWithReplacedVariables() {
        let warnings: TemplateWarning[] = [];
        let textReplaced = this.template;
        this.variables.forEach((value, key) => {
            textReplaced = textReplaced.replaceAll('${' + key + '}', value);
            if (!textReplaced.includes(value)) {
                const warning = new TemplateWarning("variable " + key + " not found");
                warnings.push(warning);
            }
        });
        const templateReplaced = new TemplateReplaced(textReplaced, warnings);
        return templateReplaced;
    }

    private isNotValidate() {
        let warnings: TemplateWarning[] = [];
        if(this.isVariablesNotValid()) {
            warnings.push(new TemplateWarning("Variables is not defined"));
            
        }
        if(this.isTextNotValid()) {
            warnings.push(new TemplateWarning("Text is not defined"));
        }
        return warnings;
    }

    private isTextNotValid() {
        return !this.template;
    }

    private isVariablesNotValid() {
        return !this.variables;
    }

    private addWarningsAboutNonReplacedVariables(templateReplaced:TemplateReplaced) {
        const textReplaced = templateReplaced.text;
        const warningsAboutNonReplacedVariables: TemplateWarning[] = [];

        const regex: RegExp = /\$\{[a-zA-Z0-9-]+\}/g;
        const matches = textReplaced.match(regex);
        if(!matches) {
            return templateReplaced;
        }

        matches.forEach(match => {
            const variableName = match.substring(2, match.length - 1);
            const warning = new TemplateWarning("variable "+ variableName + " not be replaced");
            warningsAboutNonReplacedVariables.push(warning);
        })

        return templateReplaced.addWarning(warningsAboutNonReplacedVariables);
    }
   
}