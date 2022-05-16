<template>  
  <div class="dashboard pa-6">
    <h4>Ranking dos nomes mais registrados</h4>
    <v-container fluid>    
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="6"
        >
          <v-combobox
            v-model="cmbCities"
            :items="cmbCitiesItems"
            item-value="value"
            item-text="text"
            :return-object="false"
            hint="Máximo de 5 municípios"
            label="Selecione os munípicios"
            clearable
            multiple
            persistent-hint
            small-chips
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
        <v-col
          class="d-flex"
          cols="3"
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
          cols="3"
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
    </v-container>
    <div class="charts" v-show="showCharts">
      <v-row>
        <v-col
          cols="12"
          lg="6"
          sm="6"
        >
          <BarChart
            :chartData="chartData"
            :chartOptions="chartOptions"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

import BarChart from '../components/chart/BarChart.vue'

export default {
  name: "Dashboard",
  components: {
    BarChart
  },
  data: () => ({
      cmbCities: '',
      cmbCitiesItems: [],
      selDecades: '',
      selNames: '',
      arrCities: [],
      decades: [],
      decade: 0,
      names: [],
      name: '',
      search: '',
      showCharts: false,
      chartData: {
        labels: [],
        datasets: [
          { 
            label: '',
            backgroundColor: '#1976d2', 
            data: [] 
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
  }),
  watch: {
    cmbCities(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.cmbCities.pop())
      }
    },
  },
  computed: {
    ...mapState([
      'cities'
    ])
  },
  mounted() {
    this.$store.dispatch('cities/load')
    this.popularComboboxCities()
    this.popularSelectDecades()
  },
  methods: {
    popularSelectDecades() {
      for (let index = 1930; index < 2020; index += 10) {
        this.decades.push(index)
      }
    },
    async popularSelectNames() {
      this.names = []
      let request = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${this.selDecades}`
      const { data } = await axios.get(request)
      data.forEach(d => {
        for (const key in d.res) {
          this.names.push(d.res[key]['nome'])
        }
      });
    },
    popularComboboxCities() {
      this.cmbCitiesItems = []
      this.$store.state.cities.cities.forEach(city => {
        if (city.nameCity !== "Imperatriz" || city.nameCity !== "São Luís") {
          this.cmbCitiesItems.push({text: city.nameCity, id: city.id})
        }
      })
    },
    renderCharts() {
      this.chartData = {
        labels: [],
        datasets: [{
          label: '',
          backgroundColor: '#1976d2',
          data: []
        }]
      };

      this.chartData.labels = ['jan', 'fev']
      this.chartData.datasets[0].label = `${this.selNames} (DÉCADA: ${this.selDecades})`
      this.chartData.datasets[0].backgroundColor = '#1976d2'
      this.chartData.datasets[0].data = [5, 15]
      
      this.showCharts = true
    }
  }
};
</script>