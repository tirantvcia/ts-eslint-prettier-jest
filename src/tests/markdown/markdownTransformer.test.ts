/**
 * Pasos para transformar el texto markdown
 * - Buscar todos los links en el texto
 * - Evitar los links duplicados
 * - Almacenar los links en algún tipo de almacén
 * - Transformar los links al formato achor
 * - Reemplazar los links almacenados en el texto
 * - Crear las notas al pie
 * - Añadir las notas al pie
 */
export class TransformationMarkdownProcess {
    constructor(readonly markdownText:string){}
    transform() {
        return this.markdownText;
    }

}

describe('The Markdown Transformer', ()=> {
    it('does not transform a given markdown text that does not contain any link', () => {
        const markdownText = 'does not transform a given markdown text that does not contain any link';
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const transformedText = process.transform();

        expect(transformedText).toBe(markdownText);
    })
    xit('transform a given markdown text that contains one link', () => {
        const markdownText = '[visible text link](url)';
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const expectedTransformedText = 'visible text link [^anchor1] \n\n [^anchor1]: url';
        const transformedText = process.transform();

        expect(transformedText).toBe(expectedTransformedText);
    })
})