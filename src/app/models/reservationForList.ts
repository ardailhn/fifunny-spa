import { DefaultUser } from "./defaultUser";
import { Place } from "./place";

export class ReservationForList {
    id!:number;
    userId!:number;
    placeId!:number;
    verified!:boolean;
    sday!:number;
    smonth!:number;
    syear!:number;
    eday!:number;
    emonth!:number;
    eyear!:number;
    place!:Place;
    user!:DefaultUser;
}
