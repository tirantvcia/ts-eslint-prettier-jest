/**
 * Pasos para transformar el texto markdown
 * + Buscar todos los links en el texto
 * + Evitar los links duplicados
 * + Almacenar los links en algún tipo de almacén
 * + Transformar los links al formato achor
 * + Reemplazar los links almacenados en el texto
 * - Crear las notas al pie
 * - Añadir las notas al pie
 */

import { TransformationMarkdownProcess } from "../../core/markdown/TransformationMarkdownProcess";
import { MarkDownLink } from "../../core/markdown/MarkDownLink";

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

describe('Auxiliar Tests', ()=> {
    it('does not find links in a given markdown text that does not contain anyone', () => {
        const markdownText = 'text without link';
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        expect(allLinks).toEqual([]);
    })
    it('find one link in a given markdown text that contains one link', () => {
        const markdownText = '[visible text link](url)';
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        expect(allLinks).toEqual([
            new MarkDownLink('visible text link', 'url')
        ]);

    })
    it('find all links in a given markdown text that contains two links', () => {
        const markdownText = '[visible first text link](url1) and [visible second text link](url2)';
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        expect(allLinks).toEqual([
            new MarkDownLink('visible first text link', 'url1'),
            new MarkDownLink('visible second text link', 'url2')
        ]);

    })

    it('find one link in a given markdown text that contains duplicated links', () => {
        const markdownText = '[visible first text link](url1) and [visible first text link](url1)';
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        expect(allLinks).toEqual([
            new MarkDownLink('visible first text link', 'url1')
        ]);

    })

    it('generates a record for a given links', () => {
        const aMarkdownLink = new MarkDownLink('visible text link', 'url');
        const otherMarkdownLink = new MarkDownLink('other visible text link', 'other url');

        const linksRecord = new TransformationMarkdownProcess('irrelevant').generateLinksRecord([aMarkdownLink, otherMarkdownLink]);

        expect(linksRecord).toEqual({
            ['[^anchor1]']: aMarkdownLink,
            ['[^anchor2]']: otherMarkdownLink
        })
    })
    it('replaces text links by anchors', () => {
        const markdownText = '[visible text link](url)'; 
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        const linksRecord = process.generateLinksRecord(allLinks);
        const transformedMarkDown = process.replaceLinksByAnchors(linksRecord);

        expect(transformedMarkDown).toBe('visible text link [^anchor1]');
    })

    it('creates footnotes', () => {
        const markdownText = '[visible text link](url)'; 
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        const linksRecord = process.generateLinksRecord(allLinks);
        const footnotes = process.generatesFootnotes(linksRecord);

        expect(footnotes).toEqual(['[^anchor1]: url']);
    })

    it('appends footnotes to markdown', () => {
        const markdownText = '[visible text link](url)'; 
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        const linksRecord = process.generateLinksRecord(allLinks);
        const footnotes = process.generatesFootnotes(linksRecord);
        const transformedMarkDown = process.replaceLinksByAnchors(linksRecord);
        const transformedMarkDownWithFootnotes = process.appendFootnotesToMarkdown(transformedMarkDown, footnotes);
       

        const expectedTransformedMarkDownWithFootnotes = 'visible text link [^anchor1] \n\n [^anchor1]: url';
        
        expect(transformedMarkDownWithFootnotes).toEqual(expectedTransformedMarkDownWithFootnotes);
    })

    it('appends several footnotes to markdown', () => {
        const markdownText = '[visible first text link](url1) and [visible second text link](url2)';
        const process:TransformationMarkdownProcess = new TransformationMarkdownProcess(markdownText);
        const allLinks = process.findAllLinks();
        const linksRecord = process.generateLinksRecord(allLinks);
        const footnotes = process.generatesFootnotes(linksRecord);
        const transformedMarkDown = process.replaceLinksByAnchors(linksRecord);
        const transformedMarkDownWithFootnotes = process.appendFootnotesToMarkdown(transformedMarkDown, footnotes);
       

        const expectedTransformedMarkDownWithFootnotes = 'visible first text link [^anchor1] and visible second text link [^anchor2] \n\n ' +
                                                          '[^anchor1]: url1 \n [^anchor2]: url2';
        
        expect(transformedMarkDownWithFootnotes).toEqual(expectedTransformedMarkDownWithFootnotes);
    })

})

