<template>

  <div class="register pa-6">
    
    <h4>Cadastro</h4>
    
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>
        Cadastrado com sucesso!
      </span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
          
        <v-row>
          <v-col
            cols="12"
            lg="6"
            sm="6"
          >
            <v-text-field
              v-model="form.first"
              :rules="rules.name"
              color=""
              label="Nome"
              required
            ></v-text-field>
          </v-col>
        </v-row>
          
        <v-row>
          <v-col
            cols="12"
            lg="6"
            sm="6"
          >
            <v-text-field
              v-model="form.last"
              :rules="rules.name"
              color=""
              label="Sobrenome"
              required
            ></v-text-field>
          </v-col>    
        </v-row>

        <v-row>
      <v-col 
        cols="12"
        lg="6"
        sm="6"
        >
        <v-text-field
          v-model="form.email"
          label="E-mail"
          value="exemplo"
          suffix="@gmail.com"
          color=""
        ></v-text-field>
      </v-col>
        </v-row>

          <v-row>  
          <v-col
            cols="12"
            lg="6"
            sm="6"
          >
            <v-select
              v-model="form.gender"
              :items="genders"
              :rules="[v => !!v || 'Selecione o sexo']"
              color=""
              label="Gênero"
              required
            ></v-select>
          </v-col>
          </v-row>
      
          <v-row>
          <v-col
            cols="12"
            lg="6"
            sm="6"
          >
            <v-slider
              v-model="form.age"
              :rules="rules.age"
              color=""
              label="Idade"
              hint="Seja honesto!"
              min="1"
              max="100"
              thumb-label
            ></v-slider>
          </v-col>
          </v-row>

      <v-row>
      <v-col
        cols="12"
        sm="6"
      >
      <v-textarea
        v-model="form.bio"
        color=""  
      >
        <template v-slot:label>
          <div>
            Bio <small>(Fale um pouco sobre você)</small>
          </div>
        </template>
      </v-textarea>
      </v-col>
      </v-row>

      <v-row>
      <v-col
        cols="12"
        lg="6"
        sm="6"
      >
        <v-file-input
          show-size
          counter
          multiple
          label="Envie sua foto"
        ></v-file-input>
      </v-col>
      </v-row>

      <v-row>
      <v-col
        cols="12"
        lg="4"
        sm="6"
      >
        <v-text-field
          v-model="form.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="rules.password"
          :type="show ? 'text' : 'password'"
          name="password"
          label="Senha"
          color=""
          @click:append="show = !show"
          required
        >
        </v-text-field>
      </v-col>
       </v-row>

       <v-row>   
          <v-col 
            cols="12">
            <v-checkbox
              v-model="form.terms"
              color=""
            >
              <template v-slot:label>
                <div @click.stop="">
                  Você aceita os
                  <a
                    href="#"
                    @click.prevent="terms = true"
                  >Termos</a>
                  e
                  <a
                    href="#"
                    @click.prevent="conditions = true"
                  >Condições?</a>
                </div>
              </template>
            </v-checkbox>
          </v-col>  
        </v-row>

        <v-row>

          <v-col
            cols="12"
            lg="6"
            sm="6"
          >

            <v-card-actions>
        <v-btn
          text
          @click="resetForm"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          text
          color=""
          type="submit"
        >
          Register
        </v-btn>
      
      </v-card-actions>

          </v-col>

        </v-row>
        
      </v-container>
      
    </v-form>
    
    <v-dialog
      v-model="terms"
      width="70%"
    >
      <v-card>
        <v-card-title class="text-h6">
          Termos
        </v-card-title>
        <v-card-text
          v-for="n in 5"
          :key="n"
        >
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color=""
            @click="terms = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-dialog
      v-model="conditions"
      width="70%"
    >
      <v-card>
        <v-card-title class="text-h6">
          Conndições
        </v-card-title>
        <v-card-text
          v-for="n in 5"
          :key="n"
        >
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color=""
            @click="conditions = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
  
</template>

<script>
  export default {
    data () {
      const defaultForm = Object.freeze({
        first: '',
        last: '',
        gender: null,
        age: null,
        password: '',
        terms: false,
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          age: [val => val < 18 || `Eu não acredito em você!`],
          name: [val => (val || '').length > 0 || 'Campo obrigatório'],
          password: [val => (val || '').length > 0 || 'Campo obrigatório']
        },
        genders: ['Masculino', 'Feminino'],
        conditions: false,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.',
        snackbar: false,
        terms: false,
        show: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last &&
          this.form.gender &&
          this.form.terms
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.snackbar = true
        this.resetForm()
      },
    },
  }
  
</script>