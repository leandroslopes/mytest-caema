<template>
  <div>
    <!-- {{$props.chartData}} -->
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
  </div>
</template>

<script>
import axios from 'axios'

import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
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
      default: 300
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
    },
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
    /* label: {
      type: String,
      default: ''
    },
    arrCities: {
      type: Array,
      default: []
    },
    decade: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    } */
  },
  /* data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          { 
            // label: '',
            backgroundColor: '#1976d2', 
            data: [] 
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
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
  }, */
  computed: {
    /* chartData() {
      return this.$props.chartData
    } */
  },
  watch: {
    /* label(newVal, oldVal) {
      this.chartData.datasets.label = newVal
      this.chartData.labels = ['mai', 'jun']
      this.chartData.datasets.data = [5, 15]
      console.log(this.chartData)
    } */
  },
  methods: {
    /* createLabelCharts() {
      this.chartData.datasets.label = `${this.$props.name} (DÉCADA: ${this.$props.decade})`
      console.log(this.chartData.datasets.label)
    },
    popularChartData() { 
      this.chartData.datasets.label = "`${selNames} (DÉCADA: ${selDecades})`"
      console.log(this.chartData.datasets.label)      
      var finder = `[${this.$props.decade},${this.$props.decade + 10}[`;
      var index = this.locationFrequency.indexOf(finder);
      var f = this.locationFrequency[index]['frequencia'];
       
      data.forEach(d => {
        
        for (const key in d.res) {
          this.locationFrequency.push(d.res[key])
        }

      });
    }
    async getLocationFrequency(location) {
      const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${this.$props.name}?localidade=${location}`);
      this.frequencyName = data[0]['res'];
    } */
  }
}
</script>