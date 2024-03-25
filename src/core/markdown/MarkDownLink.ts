
export class MarkDownLink {
    toFoodNoteFormat(): string | RegExp {
        throw new Error("Method not implemented.");
    }

    constructor(readonly text: string, readonly url: string) { }
    public isEqual(other: MarkDownLink) {
        if (other == null) {
            return false;
        }
        return this.text === other.text && this.url === other.url;
    }
    public toAnchorFormat() {
        return `[${this.text}](${this.url})`;
    }
}
