import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RickMortyService, Character } from '../services/rick-morty.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  public character: Character | null = null;
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private rickMortyService: RickMortyService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacterDetails(parseInt(id, 10));
    }
  }

  loadCharacterDetails(id: number) {
    this.loading = true;
    this.rickMortyService.getCharacterDetails(id).subscribe({
      next: (character) => {
        this.character = character;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes do personagem:', error);
        this.character = null;
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  }

  getEpisodeNumbers(): number[] {
    if (!this.character) return [];
    
    return this.character.episode.map(episodeUrl => {
      const parts = episodeUrl.split('/');
      return parseInt(parts[parts.length - 1], 10);
    }).sort((a, b) => a - b);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  goBack() {
    this.navController.navigateBack('/tabs/tab1');
  }
}
