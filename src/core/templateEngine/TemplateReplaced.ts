import { TemplateWarning } from "./TemplateWarning";

export class TemplateReplaced {
    constructor(readonly text: string, readonly warnings: ReadonlyArray<TemplateWarning>) { }
    addWarning(warnings: TemplateWarning[]) {
        return new TemplateReplaced(this.text, this.warnings.concat(warnings));
    }
    containsWarnings() {
        return this.warnings.length > 0;
    }
}
