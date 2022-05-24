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
            :return-object="true"
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
                {{ data.item.text }}
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
import axios from '@/services/api'
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
      const { data } = await axios.get(`/ranking/?decada=${this.selDecades}`)
      data.forEach(d => {
        for (const key in d.res) {
          this.names.push(d.res[key]['nome'])
        }
      });
    },
    popularComboboxCities() {
      this.cmbCitiesItems = []
      this.$store.state.cities.cities.forEach(city => {
        if (city.nameCity !== "Imperatriz" && city.nameCity !== "São Luís") {
          this.cmbCitiesItems.push({value: city.id, text: city.nameCity})
        }
      })
    },
    popularChartData() {
      let citiesAndNameFrequency = [
        {id: 2111300, city: 'São Luís', nameFrequency: 0}, 
        {id: 2105302, city: 'Imperatriz', nameFrequency: 0}
      ]

      this.cmbCities.forEach(c => {
        citiesAndNameFrequency.push({id: Number(c.value), city: c.text, nameFrequency: 0})
      })
      
      for (const c of citiesAndNameFrequency) {
        this.getNamesFrequency(c.id)
          .then(nameFrequency => {
            if (nameFrequency.length != 0) {
              for (const nf of nameFrequency[0].res) {
                // Period example: [1930,1940[
                if (nf.periodo === `[${this.selDecades},${this.selDecades + 10}[`) {
                  //console.log(c.id, nf.frequencia)
                  let cityIndex = citiesAndNameFrequency.findIndex((obj => obj.id === c.id))
                  citiesAndNameFrequency[cityIndex].nameFrequency = nf.frequencia
                }
              }
            }
          })
      }

      this.chartData.datasets[0].backgroundColor = '#1976d2'
      this.chartData.datasets[0].data = citiesAndNameFrequency.map(({ nameFrequency }) => nameFrequency)
      this.chartData.datasets[0].label = `${this.selNames} (DÉCADA: ${this.selDecades})`
      this.chartData.labels = citiesAndNameFrequency.map(({ city }) => city)
    },
    getNamesFrequency(idCity) {
      return axios.get(`/${this.selNames}?localidade=${idCity}`).then(response => response.data)
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

      this.popularChartData()
      
      this.showCharts = true
    }
  }
};
</script>