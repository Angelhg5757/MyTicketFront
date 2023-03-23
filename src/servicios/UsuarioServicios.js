import http from '../http-common.js';

class UsuarioServicios {
    
    login(data) {
        return http.post(`/login`, data);
    }
}

export default new UsuarioServicios();