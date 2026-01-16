import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Automoviles } from '../../../core/services/automoviles';
import { Automovil } from '../../../core/models/automovil.model';


@Component({
  selector: 'app-vista-autos',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vista-autos.html',
  styleUrl: './vista-autos.scss',
})
export class VistaAutos implements OnInit {
  auto: Automovil = {
    id: '',
    description: '',
    img: '',
    marca: '',
    modelo: '',
    motor: '',
    tipo: '',
    transmision: '',
  };
  previewImg: string = '';
  constructor(
    private autosService: Automoviles,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.auto.id = this.route.snapshot.paramMap.get('id') || '';
    this.cargarAuto();
  }
  cargarAuto() {
    this.autosService.GetAuto(this.auto.id).subscribe({
      next: (data) => {
        this.auto = data;
        this.previewImg = data.img;
        this.cdr.detectChanges();
      },
      error: (err) => alert('Error al cargar auto: ' + err),
    });
  }
}
