import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// imports components
import { HeaderComponent } from './header/header.component';
import { Content1Component } from './content-1/content-1.component';
import { Content2Component } from './content-2/content-2.component';
import { Content3Component } from './content-3/content-3.component';
import { Content4Component } from './content-4/content-4.component';
import { Content5Component } from './content-5/content-5.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,

    // IMPORTS 
    HeaderComponent,
    Content1Component,
    Content2Component,
    Content3Component ,
    Content4Component,
    Content5Component,
    FooterComponent 
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'burger_grill';
}
