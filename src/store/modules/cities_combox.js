import axios from "axios"

const cities_combox = {
    namespaced: true,
    state: {
        cities_combox: []
    }, 
    mutations: {
        SET_CITIES(state, data) {
            state.cities_combox = data.map(c => {
                return {
                    value: c.id,
                    text: c.nome
                }           
            });
        }
    },
    actions: {
        load({commit}) {
            axios
                .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/21/municipios")
                .then(response => {
                    commit('SET_CITIES', response.data);
                })
                .catch(error => console.table(error))
        }
    }
}

export default cities_combox