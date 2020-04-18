import { Respuesta } from './Respuesta';

export class Pregunta {
    id?: Number;
    fk_examen_id: Number;
    descripcion: String;
    imagen: String ="";
    valoracion: Number;
    tipo: String = "abierta";
    respuestas: Respuesta[] = [];
}