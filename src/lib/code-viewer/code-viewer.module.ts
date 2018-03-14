import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommonModule } from '@angular/common';

import { CodeViewer } from './code-viewer.component';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatSnackBarModule,
		MatTooltipModule
	],
	declarations: [
		CodeViewer
	],
	exports: [
		CodeViewer
	]
})
export class CodeViewerModule {}