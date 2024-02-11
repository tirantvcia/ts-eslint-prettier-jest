/*
'This is a template with zero variables' -> 'This is a template with zero variables
'This is a template with a ${variable}', {variable: 'food'} -> 'This is a template with food'
'This is a template with a ${variable} and {$anotherVariable}', {variable: 'foo', anotherVariable: 'bar'} -> 'This is a template with a foo and bar'
*/

import { setEngine } from "crypto"

class TemplateEngine {
    constructor(private readonly template: string, private readonly variables: Map<string, string>){}
    parse() {
       return this.template;
    }
    
}

describe('The template Engine', () => {
    it('parse template without variable', () => {
        const template = 'This is a template with zero variables';
        let variables = new Map<string, string>();

        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parse();

        expect(parsedTemplate).toEqual(template);

    })
})