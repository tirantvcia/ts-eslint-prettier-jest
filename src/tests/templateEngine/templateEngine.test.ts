/*
'This is a template with zero variables' -> 'This is a template with zero variables
'This is a template with a ${variable}', {variable: 'food'} -> 'This is a template with food'
'This is a template with a ${variable} and {$anotherVariable}', {variable: 'foo', anotherVariable: 'bar'} -> 'This is a template with a foo and bar'
*/

import { setEngine } from "crypto"

class TemplateEngine {
    constructor(private readonly template: string, private readonly variables: Map<string, string>){}
    parse() {
        if(this.variables.size == 0) {
            return this.template;
        }
        const textToBeReplaced = '${'+'variable'+'}';
        console.log(textToBeReplaced+'->'+'food');
        const textReplaced = this.template.replace(textToBeReplaced, 'food');
        console.log(textReplaced);
        return textReplaced;
       
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
    it('parse template with a variable', () => {
        const template = 'This is a template with a ${variable}';

        let variables = new Map<string, string>();
        variables.set('variable', 'food');
        const engine = new TemplateEngine(template, variables);
        const parsedTemplate = engine.parse();

        expect(parsedTemplate).toEqual('This is a template with a food');

    })
})