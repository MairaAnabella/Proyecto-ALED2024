export interface Cursos {
    id: number;
    nombre: string;
    tipo: 'virtual' | 'presencial';
    descripcion:string;
    fechaAlta: string;//Date
    fechaModificacion: string;
  }