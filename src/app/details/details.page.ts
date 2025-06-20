import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetailsPage implements OnInit {
  character: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://rickandmortyapi.com/api/character/${id}`)
        .subscribe({
          next: (data) => {
            this.character = data;
            this.loading = false;
          },
          error: () => {
            this.character = null;
            this.loading = false;
          }
        });
    } else {
      this.loading = false;
    }
  }

  getStatusClass(status: string) {
    if (status === 'Alive') return 'alive';
    if (status === 'Dead') return 'dead';
    return 'unknown';
  }

  formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  }

  getEpisodeNumbers() {
    return this.character?.episode || [];
  }
}
