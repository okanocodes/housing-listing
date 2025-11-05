import { Component, signal, inject, computed } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          name="filter"
          id="filter"
          placeholder="Filter by city, state, or name"
          #filter
          (input)="$event.preventDefault(); setFilter(filter.value)"
        />
        <button class="primary" type="button" (click)="setFilter(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredLocationList(); track housingLocation.id) {
      <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrl: './home.css',
})
export class HomeComponent {
  housingLocationList = signal<HousingLocationInfo[]>([]);
  private filterText = signal('');

  housingService: HousingService = inject(HousingService);

  filteredLocationList = computed(() => {
    const text = this.filterText().trim().toLowerCase();
    if (!text) return this.housingLocationList();
    return this.housingLocationList().filter(
      (housingLocation) =>
        housingLocation.city.toLowerCase().includes(text) ||
        housingLocation.state.toLowerCase().includes(text) ||
        housingLocation.name.toLowerCase().includes(text)
    );
  });

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList) => {
      this.housingLocationList.set(housingLocationList);
    });
  }

  setFilter(text: string) {
    this.filterText.set(text);
  }
}
