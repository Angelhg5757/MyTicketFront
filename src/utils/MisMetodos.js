import { encryptStorage } from 'Storage';
import moment from "moment";

export function validarToken() {
    const value = encryptStorage.getItem('tokenData');
    // console.log(value);
    var hoy = new Date();
    var fecha = ("0" + hoy.getDate()).slice(-2) + "-" + ("0" + (hoy.getMonth() + 1)).slice(-2) + "-" + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes();
    var actual = moment(hora, 'h:mm');
    var vencimiento = moment(value.horaVencimiento, 'h:mm');
    if (fecha == value.fecha && actual.isBefore(vencimiento)) {
        return true;
    } else {
        return false;
    }
}

export function getToken() {
    var token = encryptStorage.getItem('tokenData');
    return token.token;
}