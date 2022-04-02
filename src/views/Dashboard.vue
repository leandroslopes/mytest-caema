<template>
  
  <div class="dashboard pa-6">

    <h4>Ranking dos nomes mais registrados</h4>
    
    <v-container fluid>
    
    <v-row align="center">
      
      <v-col
        class="d-flex"
        cols="12"
        lg="4"
        sm="6"
      >
        <v-select
          label="Selecione a década"
          v-model="selDecades"
          :items="decades"
          :rules="[v => !!v || 'Selecione a década']"
          v-on:change="popularSelectNames()"
        ></v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="12"
        lg="4"
        sm="6"
      >
        <v-select
          label="Selecione o nome"
          v-model="selNames"
          :items="names"
          :rules="[v => !!v || 'Selecione o nome']"
          v-on:change="renderCharts()"
        ></v-select>
      </v-col>
    
    </v-row>

    <!-- <v-row>

      <v-col
        class="d-flex"
        cols="12"
      >

        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
          </v-col>
        </v-row> <br />

    <v-data-table
      :headers="headers"
      :items="cities.cities"
      :search ="search"
      :items-per-page="5"
      class="elevation-1"
    >
        
        <template v-slot:item.checkbox={item}>
          <v-simple-checkbox
          v-model="item.glutenfree"
        ></v-simple-checkbox>
        </template>

    </v-data-table>

      </v-col>      

    </v-row> -->
  
  </v-container>

    <div class="charts">

      <v-row>
        
        <v-col
          cols="12"
          lg="6"
          sm="6"
        >
          <BarChart :label="labelGraph" :decade="decade" :name="name"/>
        </v-col>
        
        <v-col
          cols="12"
          lg="6"
          sm="6"
        >
          <BarChart :label="labelGraph" :decade="decade" :name="name"/>
        </v-col>
      
      </v-row>

    </div>
    
  </div>

</template>

<script>
import axios from 'axios'
//import { mapState } from 'vuex'

import BarChart from '../components/chart/BarChart.vue'

export default {
  name: "Dashboard",
  components: {
    BarChart
  },
  data: () => ({
      selDecades: '',
      selNames: '',
      decades: [],
      decade: 0,
      names: [],
      name: '',
      labelGraph: '',
      search: '',
        headers: [
          { 
            text: 'ID',
            value: 'id',
            sortable: false,
            filterable: false,  
          },
          {
            text: 'Município',
            value: 'nameCity',
            align: 'start'
          },
          { 
            text: '', 
            value: 'checkbox',
            align: 'center',
            sortable: false,
            filterable: false, 
          }
        ],
  }),
  /* computed: {
    ...mapState([
      'cities'
    ])
  }, */
  mounted() {
    this.pupularSelectDecades()
    this.$store.dispatch('cities/load')
  },
  methods: {
    pupularSelectDecades() {
      for (let index = 1930; index < 2020; index += 10) {
        this.decades.push(index)
      }
    },
    async popularSelectNames() {
      this.names = []

      const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${this.selDecades}`)
        
      data.forEach(d => {
        
        for (const key in d.res) {
          this.names.push(d.res[key]['nome'])
        }

      });
    },
    renderCharts() {
      this.name = this.selNames
      this.decade = this.selDecades
      this.labelGraph = `${this.selNames} (DÉCADA: ${this.selDecades})`
    }
  }
};
</script>