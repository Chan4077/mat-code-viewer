import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	onCodeCopied(ev) {
		console.log(ev);
	}
}
