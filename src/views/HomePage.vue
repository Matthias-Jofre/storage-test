<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{test}}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <!-- <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p> -->
          
        <ion-input v-model="test"></ion-input>

        <ion-button @click="secreto">Texto secreto</ion-button>
        <ion-button @click="borrarSecreto">Borrar Secreto</ion-button>
        <ion-button>Guardar ewe</ion-button>

      </div>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import { readSecretFile, writeSecretFile, deleteSecretFile } from '@/composables/test'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton
  },
  setup() {

    const test = ref('Blank')

    const secreto = () => {
      writeSecretFile()
    }

    const borrarSecreto = () => {
      deleteSecretFile()
    }
    
    readSecretFile()

    return {
      secreto,
      borrarSecreto,

      test
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
