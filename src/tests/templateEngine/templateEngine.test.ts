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

import { match } from "assert";


class TemplateEngine {

    private constructor(private readonly template: string, private readonly variables: Map<string, string>){}

    static create(template: string, variables: Map<string, string>) {
        if((TemplateEngine.isNotValidate(template, variables)).length > 0) {
            const checkedWarnings = TemplateEngine.isNotValidate(template, variables);
            return new TemplateReplaced(template, checkedWarnings );
        }

        return new TemplateEngine(template, variables).parse();

    }


    private parse() : TemplateReplaced {
        let warnings:TemplateWarning[] = [];
        let textReplaced = this.template;
        this.variables.forEach((value, key) => {
            textReplaced = textReplaced.replaceAll('${'+key+'}', value);
            if(!textReplaced.includes(value)) {
                const warning = new TemplateWarning("variable "+ key + " not found");
                warnings.push(warning);
            }
        });
        const templateReplaced = new TemplateReplaced(textReplaced, warnings );
        return this.addWarningsAboutNonReplacedVariables(templateReplaced);
    }
    private static isNotValidate(template: string, variables: Map<string, string>) {
        let warnings: TemplateWarning[] = [];
        if(TemplateEngine.isVariablesNotValid(variables)) {
            warnings.push(new TemplateWarning("Variables is not defined"));
            
        }
        if(TemplateEngine.isTextNotValid(template)) {
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

class TemplateReplaced {
    constructor(readonly text: string, readonly warnings: ReadonlyArray<TemplateWarning>){}
    addWarning(warnings:TemplateWarning[]) {
       return  new TemplateReplaced(this.text, this.warnings.concat(warnings)); 
    }
    containsWarnings () {
        return this.warnings.length > 0;
    }
}

class TemplateWarning {
    constructor(readonly message: string) {}
}

describe('The template Engine', () => {
    it('parse template without variable', () => {
        const template = 'This is a template with zero variables';
        let variables = new Map<string, string>();

        
        const parsedTemplate = TemplateEngine.create(template, variables);

        expect(parsedTemplate.text).toEqual(template);

    })
    it('parse template with a variable', () => {
        const template = 'This is a template with a ${variable}';

        let variables = new Map<string, string>();
        variables.set('variable', 'food');

        const parsedTemplate =  TemplateEngine.create(template, variables);

        expect(parsedTemplate.text).toEqual('This is a template with a food');

    })
    it('parse template with more than one different variables', () => {
        const template = 'This is a template with a ${variable} and ${anotherVariable}';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        variables.set('anotherVariable', 'bar');
    

        const parsedTemplate =  TemplateEngine.create(template, variables);

        expect(parsedTemplate.text).toEqual('This is a template with a food and bar');

    });

    it('parse template with repeated variables', () => {
        const template = 'This is a template with a ${variable}, ${variable} and ${anotherVariable}';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        variables.set('anotherVariable', 'bar');
    
        const parsedTemplate =  TemplateEngine.create(template, variables);

        expect(parsedTemplate.text).toEqual('This is a template with a food, food and bar');

    });

    it('varoables not being found', () => {
        const template = 'This is a template with a ${variable} found and another Variable not being found';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        variables.set('anotherVariable', 'bar');
    
        const parsedTemplate =  TemplateEngine.create(template, variables);
      
        expect(parsedTemplate.text).toEqual('This is a template with a food found and another Variable not being found');
        expect(parsedTemplate.containsWarnings()).toBeTruthy();
        expect(parsedTemplate.warnings[0].message).toEqual("variable anotherVariable not found");
    });

    it('Non replaced variables', () => {
        const template = 'Template with ${variable} and ${anotherVariable}';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');

        const parsedTemplate =  TemplateEngine.create(template, variables);
      
        expect(parsedTemplate.text).toEqual('Template with food and ${anotherVariable}');
        expect(parsedTemplate.containsWarnings()).toBeTruthy();
        expect(parsedTemplate.warnings[0].message).toEqual("variable anotherVariable not be replaced");
    });

    it('warns about null dictionary', () => {
        const template = '${variable} and ${anotherVariable}';
        let variables = null;

        const parsedTemplate =  TemplateEngine.create(template, variables);
      
        expect(parsedTemplate.text).toEqual('${variable} and ${anotherVariable}');
        expect(parsedTemplate.containsWarnings()).toBeTruthy();
        expect(parsedTemplate.warnings[0].message).toEqual("Variables is not defined");
    });    
    it('warns about null texxt', () => {
        const template = null;
        let variables = new Map<string, string>();

        const parsedTemplate =  TemplateEngine.create(template, variables);
      
        expect(parsedTemplate.text).toBeNull();
        expect(parsedTemplate.containsWarnings()).toBeTruthy();
        expect(parsedTemplate.warnings[0].message).toEqual("Text is not defined");
    });   
})