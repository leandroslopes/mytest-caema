<template>
  <div class="list-cities">
    <v-row>
      <v-col
        cols="12"
        lg="4"
        sm="6"
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
      class="elevation-2"
    >
      <template v-slot:top>
        <v-dialog
          v-model="dialog"
          max-width="350px"
        >
          <v-card>
            <v-card-title class="text-h5 light-blue darken-4 white--text">
              Informações de Região
            </v-card-title> <br />
            <v-card-text>
              <span class="font-weight-bold">Microrregião: </span> {{ cityInfo.nameMicro }} <br />
              <span class="font-weight-bold">ID: </span> {{ cityInfo.idMicro }}
            </v-card-text>
            <v-card-text>
              <span class="font-weight-bold">Mesorregião: </span> {{ cityInfo.nameMeso }} <br />
              <span class="font-weight-bold">ID: </span> {{ cityInfo.idMeso }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color=""
                text
                @click="close"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.info={item}>
        <v-icon
          @click="dlgInfo(item)"
        >
          mdi-information
        </v-icon>
      </template>
    </v-data-table>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "ListCities",
  data () {
      return {
        dialog: false,
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
            text: 'Info Região', 
            value: 'info',
            align: 'center',
            sortable: false,
            filterable: false, 
          }
        ],
        cityInfo: {
          idMicro: '', 
          nameMicro: '', 
          idMeso: '', 
          nameMeso: ''
        },
        defaultCity: {
          idMicro: '', 
          nameMicro: '', 
          idMeso: '', 
          nameMeso: ''
        }
      }
  },
  computed: {
    ...mapState([
      'cities'
    ])
  },
  watch: {
      dialog (val) {
        val || this.close()
      }
  },
  mounted() {
    //this.$store.dispatch('cities/load')
  },
  methods: {
    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.cityInfo = Object.assign({}, this.defaultCity)
        })
    },
    dlgInfo(item) {
        this.cityInfo = Object.assign({}, item)
        this.dialog = true
    },
  }
};
</script>