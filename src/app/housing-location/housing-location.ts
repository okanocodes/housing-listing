import { Component, input } from '@angular/core';
import { HousingLocationInfo } from '../housing-location';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink],
  template: `
    <section class="listing">
      <img
        [src]="housingLocation().photo"
        alt="Exterior photo of {{ housingLocation().name }}"
        class="listing-photo"
      />
      <h2 class="listing-heading">
        {{ housingLocation().name }}
      </h2>
      <p class="listing-location">{{ housingLocation().city }}, {{ housingLocation().state }}</p>
      <a [routerLink]="['/details', housingLocation().id]">View Details</a>
    </section>
  `,
  styleUrl: './housing-location.css',
})
export class HousingLocationComponent {
  housingLocation = input.required<HousingLocationInfo>({});
}
