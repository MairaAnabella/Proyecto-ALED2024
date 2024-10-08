export interface Estudiantes {
    id: number;
    nombre: string;
    apellido: string;
    email:string;
    fechaAlta: string;//Date
    fechaModificacion: string;
  }


  /* 
  CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(50),
    idRol INT,
    fechaAlta DATE,
    fechaModificacion DATE,
    CONSTRAINT idRol FOREIGN KEY(idRol) references roles(id)



)
  
  
  */