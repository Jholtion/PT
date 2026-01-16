  import { Route } from "@angular/router";
  import { AgregarAutos } from "./agregar-autos/agregar-autos";
  import { EditarAutos } from "./editar-autos/editar-autos";
  import { VistaAutos } from "./vista-autos/vista-autos";
  import { VistaGeneral } from "./vista-general/vista-general";


  export const autosRoutes: Route[] = [
    {path: 'autos', component: VistaGeneral},
    { path: 'agregar', component: AgregarAutos },
        { path: 'editar/:id', component: EditarAutos },
        { path: 'vista/:id', component: VistaAutos },

  ];
