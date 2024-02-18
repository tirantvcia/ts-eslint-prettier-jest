import { TemplateEngine } from './../../core/templateEngine/TemplateEngine';

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