import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/install', pathMatch: 'full' },
  {
    path: 'install',
    loadComponent: () =>
      import('./install/install.component').then((m) => m.InstallComponent),
  },
  {
    path: 'sample',
    loadComponent: () =>
      import('./sample/sample.component').then((m) => m.SampleComponent),
  },
  {
    path: 'sample-editable',
    loadComponent: () =>
      import('./sample-editable/sample-editable.component').then(
        (m) => m.SampleEditableComponent
      ),
  },
  { path: '**', redirectTo: '/install' },
];
