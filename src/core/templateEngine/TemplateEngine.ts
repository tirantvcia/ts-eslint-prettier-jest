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

    private constructor(private readonly template: string, private readonly variables: Map<string, string>) { }

    static create(template: string, variables: Map<string, string>) {
        if ((TemplateEngine.isNotValidate(template, variables)).length > 0) {
            const checkedWarnings = TemplateEngine.isNotValidate(template, variables);
            return new TemplateReplaced(template, checkedWarnings);
        }

        return new TemplateEngine(template, variables).parse();

    }


    private parse(): TemplateReplaced {
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
        return this.addWarningsAboutNonReplacedVariables(templateReplaced);
    }
    private static isNotValidate(template: string, variables: Map<string, string>) {
        let warnings: TemplateWarning[] = [];
        if (TemplateEngine.isVariablesNotValid(variables)) {
            warnings.push(new TemplateWarning("Variables is not defined"));

        }
        if (TemplateEngine.isTextNotValid(template)) {
            warnings.push(new TemplateWarning("Text is not defined"));
        }
        return warnings;
    }
    private static isVariablesNotValid(variables: Map<string, string>) {
        return !variables;
    }

    static isTextNotValid(template: string) {
        return !template;
    }


    private addWarningsAboutNonReplacedVariables(templateReplaced: TemplateReplaced) {
        const textReplaced = templateReplaced.text;
        const warningsAboutNonReplacedVariables: TemplateWarning[] = [];

        const regex: RegExp = /\$\{[a-zA-Z0-9-]+\}/g;
        const matches = textReplaced.match(regex);
        if (!matches) {
            return templateReplaced;
        }

        matches.forEach(match => {
            const variableName = match.substring(2, match.length - 1);
            const warning = new TemplateWarning("variable " + variableName + " not be replaced");
            warningsAboutNonReplacedVariables.push(warning);
        });

        return templateReplaced.addWarning(warningsAboutNonReplacedVariables);
    }

}

