<template>
  
  <div class="cities pa-6">
    
    <h4>Municípios</h4>
    
    <ListCities />

  </div>

</template>

<script>
import ListCities from "../components/ListCities.vue"

export default {
  name: "Cities",
  components: {
      ListCities
  },
};
</script>