import axios from "axios"

const cities = {
    namespaced: true,
    state: {
        cities: []
    }, 
    mutations: {
        SET_CITIES(state, data) {
            state.cities = data.map(c => {
                return {
                    id: c.id,
                    nameCity: c.nome,
                    idMicro: c.microrregiao.id, 
                    nameMicro: c.microrregiao.nome,
                    idMeso: c.microrregiao.mesorregiao.id,
                    nameMeso: c.microrregiao.mesorregiao.nome
                }           
            });
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