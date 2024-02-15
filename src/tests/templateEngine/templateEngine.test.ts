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

    constructor(private readonly template: string, private readonly variables: Map<string, string>){}


    parseNew() : TemplateReplaced {
        let warnings:TemplateWarning[] = [];
        let textReplaced = this.template;
        this.variables.forEach((value, key) => {
            textReplaced = textReplaced.replaceAll('${'+key+'}', value);
            if(!textReplaced.includes(value)) {
                const warning = new TemplateWarning("variable "+ key + " not found");
                warnings.push(warning);
            }
        });
        const regex: RegExp = /\$\{[a-zA-Z0-9-]+\}/g;
        const matches = textReplaced.match(regex);
        if(!matches) {
            return new TemplateReplaced(textReplaced, warnings );
        }

        matches.forEach(match => {
            const variableName = match.substring(2, match.length - 1);
            const warning = new TemplateWarning("variable "+ variableName + " not be replaced");
            warnings.push(warning);            
        })

        return new TemplateReplaced(textReplaced, warnings );
    }
   
}

class TemplateReplaced {
    constructor(readonly text: string, readonly warnings: ReadonlyArray<TemplateWarning>){}
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

        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parseNew().text;

        expect(parsedTemplate).toEqual(template);

    })
    it('parse template with a variable', () => {
        const template = 'This is a template with a ${variable}';

        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parseNew().text;

        expect(parsedTemplate).toEqual('This is a template with a food');

    })
    it('parse template with more than one different variables', () => {
        const template = 'This is a template with a ${variable} and ${anotherVariable}';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        variables.set('anotherVariable', 'bar');
    
        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parseNew().text;

        expect(parsedTemplate).toEqual('This is a template with a food and bar');

    });

    it('parse template with repeated variables', () => {
        const template = 'This is a template with a ${variable}, ${variable} and ${anotherVariable}';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        variables.set('anotherVariable', 'bar');
    
        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parseNew().text;

        expect(parsedTemplate).toEqual('This is a template with a food, food and bar');

    });

    it('varoables not being found', () => {
        const template = 'This is a template with a ${variable} found and another Variable not being found';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        variables.set('anotherVariable', 'bar');
    
        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parseNew();
      
        expect(parsedTemplate.text).toEqual('This is a template with a food found and another Variable not being found');
        expect(parsedTemplate.containsWarnings()).toBeTruthy();
        expect(parsedTemplate.warnings[0].message).toEqual("variable anotherVariable not found");
    });

    it('Non replaced variables', () => {
        const template = 'Template with ${variable} and ${anotherVariable}';
        let variables = new Map<string, string>();
        variables.set('variable', 'food');

        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parseNew();
      
        expect(parsedTemplate.text).toEqual('Template with food and ${anotherVariable}');
        expect(parsedTemplate.containsWarnings()).toBeTruthy();
        expect(parsedTemplate.warnings[0].message).toEqual("variable anotherVariable not be replaced");
    });
})