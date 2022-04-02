<template>

  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  
</template>

<script>
import axios from 'axios'

import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          label: this.label, 
          data: [] 
        }]
      },
      chartOptions: {
        responsive: true
      },
      ranking: [
        {
          'id': 2111300, 
          'name': 'São Luís',
          'frequency': 0
        },
        {
          'id': 2105302, 
          'name': 'Imperatriz',
          'frequency': 0
        }
      ],
      frequencyName: []
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    decade: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  /*methods: {
    popularChartData() {
      console.log(this.frequencyName)
      
      var finder = `[${this.$props.decade},${this.$props.decade + 10}[`;
      var index = this.locationFrequency.indexOf(finder);
      var f = this.locationFrequency[index]['frequencia'];
       
      data.forEach(d => {
        
        for (const key in d.res) {
          this.locationFrequency.push(d.res[key])
        }

      });
    },
    async getLocationFrequency(location) {
      const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${this.$props.name}?localidade=${location}`);
      this.frequencyName = data[0]['res'];
    }, 
  }*/
}
</script>