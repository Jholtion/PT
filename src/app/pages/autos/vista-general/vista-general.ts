import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Automoviles } from '../../../core/services/automoviles';
import { Automovil } from '../../../core/models/automovil.model';

@Component({
  selector: 'app-vista-general',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './vista-general.html',
  styleUrls: ['./vista-general.scss'],
})
export class VistaGeneral implements OnInit {
  autos: Automovil[] = [];

  constructor(private automovilesService: Automoviles, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarAutos();
  }
  cargarAutos(): void {
    this.automovilesService.GetAutos().subscribe({
      next: (autos) => {
        console.log('Autos registrados:', autos);
        this.autos = autos;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando autos:', err),
    });
  }
  deleteAuto(id: string): void {
    this.automovilesService.DeleteAuto(id).subscribe({
      next: () => {
        this.autos = this.autos.filter((auto) => auto.id !== id);
        alert(`Auto con ID ${id} eliminado.`);
        window.location.reload();
      },
      error: (err) => console.error('Error eliminando auto:', err),
    });
  }
}
