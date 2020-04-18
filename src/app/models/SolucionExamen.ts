export class SolucionExamen {
    fk_estudiante_id?: Number = 1;
    fk_pregunta_id: Number;
    fk_examen_id: Number;
    valoracion_obtenida: Number;
    respuesta_abierta?: string ="";
    tipo_pregunta: string;
    revisada: boolean = false;	
}