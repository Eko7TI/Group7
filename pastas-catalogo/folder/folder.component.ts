import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent {
  @Input() folderName: string = '';
  @Input() redirectTo: string = '';

  constructor(private router: Router) {}

  goToPage() {
    this.router.navigateByUrl(this.redirectTo);
  }
}
