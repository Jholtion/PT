import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Automoviles } from '../../../core/services/automoviles';
import { Automovil } from '../../../core/models/automovil.model';

@Component({
  selector: 'app-agregar-autos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregar-autos.html',
  styleUrls: ['./agregar-autos.scss'],
})
export class AgregarAutos {
  nuevoAuto: Automovil = {
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

  constructor(private autosService: Automoviles, private router: Router) {}

  validarCampos(): string[] {
    const faltantes: string[] = [];
    for (const key in this.nuevoAuto) {
      if ((this.nuevoAuto as any)[key] === '' || (this.nuevoAuto as any)[key] == null) {
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

    this.autosService.AddAuto(this.nuevoAuto).subscribe({
      next: () => {
        alert('Auto agregado correctamente');
        this.router.navigate(['/autos']);
      },
      error: (err) => alert('Error al agregar auto: ' + err),
    });
  }
}
