import { Component, ViewEncapsulation, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as hljs from 'highlight.js';
import { ThemePalette } from '@angular/material/core';

@Component({
	selector: 'mat-code-viewer',
	templateUrl: 'code-viewer.component.html',
	styleUrls: ['code-viewer.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CodeViewer implements AfterViewInit {
	@ViewChild('code') private _content: ElementRef;
	/**
	 * The language of the code snippet
	 */
	@Input() language: string;
	/**
	 * Whether to show lines
	 * Note: If the value specified is a number, the lines will start with that number.
	 */
	@Input() lines: boolean | number;
	/**
	 * The filename
	 */
	@Input() fileName?: string;

	/**
	 * The color scheme of the snippet
	 * Applies to the copy button (for now)
	 */
	@Input() color?: ThemePalette;
	/**
	 * The icon of the copy button
	 */
	@Input() copyIcon?: string;
	/**
	 * Whether to disable syntax highlighting
	 */
	@Input() disableHighlight?: boolean;
	/**
	 * Whether to hide the copy button
	 * Take note that this will **only** hide the copy button, but still allows users to copy the text itself
	 */
	@Input() hideCopy?: boolean;
	/**
	 * Sets the tab size
	 */
	@Input() tabSize?: number;
	/**
	 * An event for when the code is successfully copied to the clipboard
	 */
	@Output() codeCopied: EventEmitter<boolean> = new EventEmitter<boolean>();
	/**
	 * @private
	 */
	private _originalCode: string;
	constructor(private snackbar: MatSnackBar) { }
	private _copyToClipboard() {
		if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
			let textarea = document.createElement("textarea");
			textarea.textContent = this._originalCode;
			textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
			document.body.appendChild(textarea);
			textarea.select();
			try {
				return document.execCommand("copy");  // Security exception may be thrown by some browsers.
			} catch (e) {
				this.snackbar.open(`Error: ${e}`, null, { horizontalPosition: "start", duration: 6000 });
				this.codeCopied.emit(false);
				return false;
			} finally {
				document.body.removeChild(textarea);
				this.snackbar.open('Code copied to clipboard', null, { duration: 5000, horizontalPosition: "start" });
				this.codeCopied.emit(true);
			}
		}
	}
	ngAfterViewInit() {
		// Checks if the `disableHighlight` input is true
		if (!!this.disableHighlight) {
		} else {
			// Checks if the file name input is stated
			if (this.fileName) {
				// Yes, the file input is stated
				hljs.highlightBlock(this._content.nativeElement.childNodes[6]);
				this._originalCode = this._content.nativeElement.childNodes[6].innerText;
			} else if (this._content.nativeElement.childNodes.length >= 6) {
				// No, the file input is not stated or is invalid
				// console.log(this._content.nativeElement.childNodes);
				hljs.highlightBlock(this._content.nativeElement.childNodes[5]);
				this._originalCode = this._content.nativeElement.childNodes[5].innerText;
			} else {
				hljs.highlightBlock(this._content.nativeElement.childNodes[3]);
				this._originalCode = this._content.nativeElement.childNodes[3].innerText;
			}
		}
	}
}