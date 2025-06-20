import { Component, OnInit } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { RickMortyService, Character } from '../services/rick-morty.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class Tab1Page implements OnInit {
  public characters: Character[] = [];
  public loading = false;
  public currentPage = 1;
  public totalPages = 1;
  public searchTerm = '';

  constructor(
    private rickMortyService: RickMortyService,
    private navController: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(event?: any) {
    this.loading = true;
    
    const request = this.searchTerm 
      ? this.rickMortyService.searchCharacters(this.searchTerm, this.currentPage)
      : this.rickMortyService.getCharacters(this.currentPage);

    request.subscribe({
      next: (data) => {
        this.characters = data.results;
        this.totalPages = data.info.pages;
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: (error) => {
        console.error('Erro ao carregar personagens:', error);
        this.characters = [];
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  showDetails(id: number) {
    this.router.navigate(['/tabs/tab2/details', id]);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.currentPage = 1;
    this.loadCharacters();
  }

  doRefresh(event: any) {
    this.currentPage = 1;
    this.loadCharacters(event);
  }
}

