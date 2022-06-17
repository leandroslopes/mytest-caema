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
    </v-container> <br />
    <div class="charts" v-show="showCharts">
      <v-row>
        <v-col
          cols="6"
          lg="6"
          sm="6"
        >
          <column-chart :data="charData"></column-chart>
        </v-col>
        <v-col
          cols="6"
          lg="6"
          sm="6"
        >
          <line-chart :data="charData" :colors="['#95190C']"></line-chart>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api'
import { mapState } from 'vuex'

export default {
  name: "Dashboard",
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
      charData: []
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
    async getChartData() {
      let citiesAndNameFrequency = [
        {id: 2111300, city: 'São Luís', nameFrequency: 0}, 
        {id: 2105302, city: 'Imperatriz', nameFrequency: 0}
      ];

      this.cmbCities.forEach(c => {
        citiesAndNameFrequency.push({id: Number(c.value), city: c.text, nameFrequency: 0})
      });

      for (const c of citiesAndNameFrequency) {
        let index = citiesAndNameFrequency.findIndex(city => city.id == c.id);
        
        let nameFrenquecy = await this.getNamesFrequency(c.id);
        if (typeof nameFrenquecy === 'object') {        
          for (const nf of nameFrenquecy.res) {
            // Period example: [1930,1940[
            if (nf.periodo === `[${this.selDecades},${this.selDecades + 10}[`) {
              citiesAndNameFrequency[index].nameFrequency = nf.frequencia;    
            }
          }
        } else { // IF NAMEFREQUENCY IS UNDEFINED
          citiesAndNameFrequency[index].nameFrequency = 0;
        }
      }
      
      return citiesAndNameFrequency;
    },
    async getNamesFrequency(idCity) {
      let response = await axios.get(`/${this.selNames}?localidade=${idCity}`);
      let nameFrequencies = await response.data[0];
      return nameFrequencies;
    },
    async renderCharts() {
      let chartDataTemp = await this.getChartData();

      let chartDataArray = [];
      await chartDataTemp.forEach(function (c) {
        chartDataArray.push([c.city, c.nameFrequency]);
      });

      this.charData = chartDataArray;

      this.showCharts = true;
    }
  }
};
</script>