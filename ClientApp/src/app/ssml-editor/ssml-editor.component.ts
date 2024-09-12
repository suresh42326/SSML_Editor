// ssml-editor.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ssml-editor',
  templateUrl: './ssml-editor.component.html',
  styleUrls: ['./ssml-editor.component.css']
})
export class SsmlEditorComponent implements OnInit {
  @ViewChild('editor', { static: true }) editor!: ElementRef; // Added '!'
  @ViewChild('output', { static: true }) output!: ElementRef; // Added '!

  constructor() { }

  ngOnInit() {
    document.execCommand("defaultParagraphSeparator", false, "p");
  }

  markword(className: string) {
    document.execCommand("insertHTML", false, `<span class='${className}'>${document.getSelection()}</span>`);
  }

  insertDelay() {
    document.execCommand("insertHTML", false, "<i class='fa fa-clock-o' contenteditable='false'></i>");
  }

  emphasis() {
    this.markword("emphasis");
  }

  pitchUp() {
    this.markword("pitch-up");
  }

  pitchDown() {
    this.markword("pitch-down");
  }

  undo() {
    document.execCommand("undo");
  }

  convertToSsml() {
    const html = this.editor.nativeElement.innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Replace nbsp
    doc.body.innerHTML = doc.body.innerHTML.replace(/&nbsp;/g, ' ');

    // Remove empty paragraphs
    doc.querySelectorAll('p').forEach(p => {
      if (p?.textContent?.trim() === '') {
        p.remove();
      }
    });

    // Replace elements
    doc.querySelectorAll('.emphasis').forEach(el => {
      const emphasis = doc.createElement('emphasis');
      emphasis.setAttribute('level', 'strong');
      emphasis.innerHTML = el.innerHTML;
      el.replaceWith(emphasis);
    });

    doc.querySelectorAll('.fa-clock-o').forEach(el => {
      const breakEl = doc.createElement('break');
      breakEl.setAttribute('time', '300ms');
      el.replaceWith(breakEl);
    });

    doc.querySelectorAll('.pitch-up').forEach(el => {
      const prosody = doc.createElement('prosody');
      prosody.setAttribute('pitch', '+3st');
      prosody.innerHTML = el.innerHTML;
      el.replaceWith(prosody);
    });

    doc.querySelectorAll('.pitch-down').forEach(el => {
      const prosody = doc.createElement('prosody');
      prosody.setAttribute('pitch', '-3st');
      prosody.innerHTML = el.innerHTML;
      el.replaceWith(prosody);
    });

    this.output.nativeElement.textContent = `<speak>${doc.body.innerHTML}</speak>`;
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event?.clipboardData?.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  }
}