import axios from "axios"

const cities = {
    namespaced: true,
    state: {
        cities: []
    }, 
    mutations: {
        SET_CITIES(state, data) {
            var arrCities = []
            data.forEach(c => {
                var city = {
                    id: "", nameCity: "", 
                    idMicro: "", nameMicro: "", 
                    idMeso: "", nameMeso: ""
                }
                city.id = c.id
                city.nameCity = c.nome
                city.idMicro = c.microrregiao.id 
                city.nameMicro = c.microrregiao.nome
                city.idMeso = c.microrregiao.mesorregiao.id
                city.nameMeso = c.microrregiao.mesorregiao.nome
            
                arrCities.push(city)
            });
            state.cities = arrCities
        }
    },
    actions: {
        load({commit}) {
            axios
                .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/21/municipios")
                .then(response => {
                    commit('SET_CITIES', response.data)
                })
                .catch(error => console.table(error))
        }
    }
}

export default cities