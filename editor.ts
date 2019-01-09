import MarkdownIt from "markdown-it";
//import * as  MarkdownItFootnote from "markdown-it-footnote";
//import * as  MarkdownItCenter from "markdown-it-center-text";
//import * as MarkdownItMultimdTable from "markdown-it-multimd-table";
//const md = new MarkdownIt({ html: true, typographer: true }).use(MarkdownItFootnote).use(MarkdownItCenter);
const md = new MarkdownIt({ html: true, typographer: true });

//console.log("TS file loaded....");
export class MDEditor {
    textArea: HTMLTextAreaElement;
    targetArea: HTMLTextAreaElement;
    listeners: { [key: string]: (data: any) => void; } = {}
    changed: boolean = false;
    renderTimer: number;


    constructor(area: HTMLTextAreaElement, target: HTMLTextAreaElement) {
        this.textArea = area;
        this.textArea.spellcheck = true;
        this.textArea.disabled = false;
        this.textArea.readOnly = false;

        this.targetArea = target;
        this.targetArea.readOnly = true;

        let self = this;
        this.textArea.addEventListener('input', function () {
            self.changed = true;
        });

        this.renderTimer = setInterval(() => {
            if (self.changed) {
                this.targetArea.innerHTML = md.render(this.getValue());
                self.changed = false;
            }
        }, 1000);

    }


    public setValue(text: string) {
        this.textArea.value = text;
        this.changed = true;
    }

    public getValue() {
        return this.textArea.value;
    }




    //    addListener(label, callback) { }
    //  removeListener(label, callback) { }
    //  emit(label, ...args) {  }
}

var editor = new MDEditor(<HTMLTextAreaElement>document.getElementById('md-editor'), <HTMLTextAreaElement>document.getElementById('md-preview'));
editor.setValue("Welcome...type markdown.");
