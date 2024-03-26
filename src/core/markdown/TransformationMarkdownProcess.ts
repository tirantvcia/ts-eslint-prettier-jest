import { MarkDownLink } from "./MarkDownLink";


export class TransformationMarkdownProcess {

    constructor(readonly markdownText: string) { }

    transform() {
        const allLinks = this.findAllLinks();
        if(allLinks.length == 0) {
            return this.markdownText;
        }

        const linksRecord = this.generateLinksRecord(allLinks);
        const footnotes = this.generatesFootnotes(linksRecord);
        const transformedMarkDown = this.replaceLinksByAnchors(linksRecord);
        return this.appendFootnotesToMarkdown(transformedMarkDown, footnotes);
    }

    private findAllLinks(): MarkDownLink[] {

        let allLinks: MarkDownLink[] = [];
        let position = 0;
        let firstTextPosition = 0;
        let lastTextPosition = 0;
        let firstUrlPosition = 0;
        let lastUrlPosition = 0;
        let isPresentMarkDown = false;

        while (position < this.markdownText.length) {

            firstTextPosition = this.markdownText.indexOf('[', position) + 1;
            lastTextPosition = this.markdownText.indexOf(']', firstTextPosition);
            firstUrlPosition = this.markdownText.indexOf('(', lastTextPosition) + 1;
            lastUrlPosition = this.markdownText.indexOf(')', firstUrlPosition);
            isPresentMarkDown = (firstTextPosition > 0) &&
                (lastTextPosition > 0) &&
                (firstUrlPosition > 0) &&
                (lastUrlPosition > 0) &&
                (lastTextPosition + 2) == firstUrlPosition;

  

            if (!isPresentMarkDown) {
                return allLinks;
            }

            const newMarkDownLink = new MarkDownLink(
                this.markdownText.substring(firstTextPosition, lastTextPosition),
                this.markdownText.substring(firstUrlPosition, lastUrlPosition)
            );

            const markDownIsNotPresent = this.checkMarkDownIsNotPresent(allLinks, newMarkDownLink);

            if (markDownIsNotPresent) {
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

    private generateLinksRecord(markdownLinks: MarkDownLink[]): Record<string, MarkDownLink> {
        return markdownLinks.reduce((previous, current, index) => ({
            ...previous,
            [`[^anchor${index + 1}]`]: current
        }),
            {} as Record<string, MarkDownLink>);
    }

    private replaceLinksByAnchors(linksRecord: Record<string, MarkDownLink>) {
        return Object.keys(linksRecord).reduce((previousText, key) => {
            return previousText.replaceAll(linksRecord[key].toAnchorFormat(), `${linksRecord[key].text} ${key}`);
        }, this.markdownText);
    }

    private generatesFootnotes(linksRecord: Record<string, MarkDownLink>) {
        return Object.keys(linksRecord).map((footNoteKey) => 
           `${footNoteKey}: ${linksRecord[footNoteKey].url}`
        );
    }

    private appendFootnotesToMarkdown(transformedMarkDown: string, footnotes: string[]) {
       let markdownWithFootnotes = transformedMarkDown.concat(' \n\n ');
       let footnotesText:string = '';
       footnotes.forEach(footnote => {
            if(footnotesText.length > 0) {
                footnotesText = footnotesText.concat(' \n ');
            } 
            footnotesText = footnotesText.concat(footnote);
        })

        return markdownWithFootnotes.concat(footnotesText);

       
        
    }

}
