import { Filter } from "./filter";
import { Photo } from "./photo";

export class Place {
    id!:number;
    userId!:number;
    categoryId!:number;
    name!:string;
    description!:string;
    uyarilar!:string;
    adres!:string;
    sehirId!:number;
    ilceId!:number;
    videoURL!:string;
    photos!:Photo[];
    photoURL!:string;
    verified!: boolean;
    sehiradi!: string;
    ilceadi!: string;
    vergiNumarasi!: string;
    filters!:Filter;
}