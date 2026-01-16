import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Automoviles } from '../../../core/services/automoviles';
import { Automovil } from '../../../core/models/automovil.model';

@Component({
  selector: 'app-editar-autos',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-autos.html',
  styleUrl: './editar-autos.scss',
})
export class EditarAutos implements OnInit {
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

  constructor(private autosService: Automoviles, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.auto.id = this.route.snapshot.paramMap.get('id')|| "";
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
  validarCampos(): string[] {
    const faltantes: string[] = [];
    for (const key in this.auto) {
      if ((this.auto as any)[key] === '' || (this.auto as any)[key] == null) {
        faltantes.push(key);
      }
    }
    return faltantes;
  }

  actualizarImagen(imgUrl: string) {
    this.previewImg = imgUrl;
  }

  guardarAuto() {
    const faltantes = this.validarCampos();
    if (faltantes.length > 0) {
      alert('Faltan los siguientes campos: ' + faltantes.join(', '));
      return;
    }

    this.autosService.PutAuto(this.auto.id, this.auto).subscribe({
      next: () => {
        alert('Auto actualizado correctamente');
        this.router.navigate(['/autos']);
      },
      error: (err) => alert('Error al actualizar auto: ' + err),
    });
  }
}
