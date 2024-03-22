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

import { Url } from "url";

export class MarkDownLink {
    toAnchorFormat() {
        return `[${this.text}](${this.url})`
    }
    constructor(readonly text: string, readonly url: string) {}
    public isEqual(other: MarkDownLink) {
        if(other == null) {
            return false;
        }
        return this.text === other.text && this.url === other.url;
    }
}

export class TransformationMarkdownProcess {


    constructor(readonly markdownText:string){}

    transform() {
        return this.markdownText;
    }

    findAllLinks(): MarkDownLink[] {

        let allLinks:MarkDownLink[] = [];
        let position = 0;
        let firstTextPosition = 0;
        let lastTextPosition = 0;
        let firstUrlPosition = 0;
        let lastUrlPosition = 0;
        let isPresentMarkDown = false;

        while(position < this.markdownText.length) {
        
            firstTextPosition = this.markdownText.indexOf('[', position) + 1;
            lastTextPosition = this.markdownText.indexOf(']', firstTextPosition);
            firstUrlPosition = this.markdownText.indexOf('(', lastTextPosition) + 1;
            lastUrlPosition = this.markdownText.indexOf(')', firstUrlPosition);
            isPresentMarkDown = (firstTextPosition > 0) && 
                        (lastTextPosition > 0) && 
                        (firstUrlPosition > 0) && 
                        (lastUrlPosition > 0) ;


            if(!isPresentMarkDown) {
                return allLinks;
            }

            const newMarkDownLink = new MarkDownLink(
                this.markdownText.substring(firstTextPosition, lastTextPosition),
                this.markdownText.substring(firstUrlPosition, lastUrlPosition)
            );

            const markDownIsNotPresent = this.checkMarkDownIsNotPresent(allLinks, newMarkDownLink);

            if(markDownIsNotPresent) {
                allLinks.push(newMarkDownLink);
            }


            position = lastUrlPosition;

    
        }

        return allLinks;
    }


    private checkMarkDownIsNotPresent(allLinks: MarkDownLink[], newMarkDownLink: MarkDownLink) {
        const indexOf = allLinks.findIndex((markdownLink) => markdownLink.isEqual(newMarkDownLink));
        return indexOf === -1;
    }

    generateLinksRecord(markdownLinks: MarkDownLink[]): Record<string, MarkDownLink> {
        return markdownLinks.reduce((previous, current, index) => ({
            ...previous,
            [`[^anchor${index + 1}]`]: current
        }),
            {} as Record<string, MarkDownLink>);
    }

    replaceLinksByAnchors(linksRecord: Record<string, MarkDownLink>) {
        return Object.keys(linksRecord).reduce((previousText, key) => {
            return previousText.replaceAll(linksRecord[key].toAnchorFormat(), `${linksRecord[key].text} ${key}`)
        } , this.markdownText)
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
})

