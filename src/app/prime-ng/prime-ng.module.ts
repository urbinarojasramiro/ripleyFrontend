import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    MenubarModule,
    PasswordModule,
    FieldsetModule,
    ToolbarModule,
    TableModule,
    SplitterModule,
    DividerModule,
    PanelModule,
    MultiSelectModule,
    DropdownModule
  ]
})

export class PrimeNgModule { }
