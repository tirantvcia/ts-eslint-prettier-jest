import { MarkDownLink } from "./MarkDownLink";


export class TransformationMarkdownProcess {

    constructor(readonly markdownText: string) { }

    transform() {
        return this.markdownText;
    }

    findAllLinks(): MarkDownLink[] {

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

    generateLinksRecord(markdownLinks: MarkDownLink[]): Record<string, MarkDownLink> {
        return markdownLinks.reduce((previous, current, index) => ({
            ...previous,
            [`[^anchor${index + 1}]`]: current
        }),
            {} as Record<string, MarkDownLink>);
    }

    replaceLinksByAnchors(linksRecord: Record<string, MarkDownLink>) {
        return Object.keys(linksRecord).reduce((previousText, key) => {
            return previousText.replaceAll(linksRecord[key].toAnchorFormat(), `${linksRecord[key].text} ${key}`);
        }, this.markdownText);
    }

    generatesFootnotes(linksRecord: Record<string, MarkDownLink>) {
        return Object.keys(linksRecord).map((footNoteKey) => 
           `${footNoteKey}: ${linksRecord[footNoteKey].url}`
        );
    }

    appendFootnotesToMarkdown(transformedMarkDown: string, footnotes: string[]) {
       let markdownWithFootnotes = transformedMarkDown.concat(' \n\n ');
       footnotes.forEach(footnote => 
            markdownWithFootnotes = markdownWithFootnotes.concat(footnote)
        )

        return markdownWithFootnotes;

       
        
    }

}
