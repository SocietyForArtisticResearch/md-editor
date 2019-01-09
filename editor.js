"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//console.log("TS file loaded....");
class MDEditor {
    constructor(area) {
        this.listeners = {};
        this.textArea = area;
        this.textArea.spellcheck = true;
        this.textArea.disabled = false;
        this.textArea.readOnly = false;
        this.textArea.addEventListener('input', function () {
            alert();
        });
        console.log("created");
    }
    value(text) {
        this.textArea.value = text;
    }
}
exports.MDEditor = MDEditor;
var editor = new MDEditor(document.getElementById('md-editor'));
editor.value("Hi...");
