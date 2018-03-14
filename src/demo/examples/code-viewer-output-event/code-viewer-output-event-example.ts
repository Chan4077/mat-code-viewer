import { Component } from '@angular/core';

@Component({
	selector: 'code-viewer-output-event-example',
	templateUrl: 'code-viewer-output-event-example.html'
})
export class CodeViewerOutputEventExample {
	onCodeCopied(ev) {
		console.log(ev);
	}
}