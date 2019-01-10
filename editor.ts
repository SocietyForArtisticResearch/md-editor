import MarkdownIt from "markdown-it";
//import * as  MarkdownItFootnote from "markdown-it-footnote";
//import * as  MarkdownItCenter from "markdown-it-center-text";
//import * as MarkdownItMultimdTable from "markdown-it-multimd-table";
//const md = new MarkdownIt({ html: true, typographer: true }).use(MarkdownItFootnote).use(MarkdownItCenter);
const md = new MarkdownIt({ html: true, typographer: true });

//console.log("TS file loaded....");
export class MDEditor {
    textArea: HTMLTextAreaElement;
    targetArea: HTMLElement;
    listeners: { [key: string]: ((data: any) => void)[]; } = {}
    changed: boolean = false;
    renderTimer: number;
    timeInactivity: number = 0;

    constructor(area: HTMLTextAreaElement, target: HTMLElement) {
        this.textArea = area;
        this.textArea.spellcheck = true;
        this.textArea.disabled = false;
        this.textArea.readOnly = false;

        this.targetArea = target;

        let self = this;
        this.textArea.addEventListener('input', function () {
            self.changed = true;
        });

        this.renderTimer = setInterval(() => {
            if (self.changed) {
                this.targetArea.innerHTML = md.render(this.getValue());
                this.emit('changed', null);
                self.changed = false;
                this.timeInactivity = 0;
            } else {
                ++this.timeInactivity;
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


    public addListener(label: string, callback: () => void) {
        if (this.listeners[label] == undefined) {
            this.listeners[label] = [callback];
        } else {
            this.listeners[label].push(callback);
        }
    }
    //  removeListener(label, callback) { }

    private emit(label: string, data: any) {
        this.listeners[label].forEach((listener) => {
            listener(data);
        });

    }
}

// Testing
var editor = new MDEditor(<HTMLTextAreaElement>document.getElementById('md-editor'), <HTMLElement>document.getElementById('md-preview'));
editor.setValue("Welcome...type markdown.");
editor.addListener('changed', () => console.log("changed event..."));

