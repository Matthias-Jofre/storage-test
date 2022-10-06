<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Formulario</ion-title>
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

        <ion-input v-model="nombre"></ion-input>
        <ion-input v-model="apellido"></ion-input>
        <ion-input v-model="correo"></ion-input>
        <ion-input v-model="comentario"></ion-input>

        <ion-button @click="writeSecretFile">Texto secreto</ion-button>
        <ion-button @click="borrarSecreto">Borrar Secreto</ion-button>
        <ion-button>Guardar ewe</ion-button>
        {{ JSON.stringify(nombreeee) }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, onBeforeMount } from "vue";
import { ref, onMounted, watch } from "vue";

import {
  readSecretFile,
  writeSecretFile,
  deleteSecretFile,
} from "@/composables/test";

import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

import { Preferences } from "@capacitor/preferences";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
  },
  setup() {
    const usuarios = ref<Formulario[]>([]);

    const PHOTO_STORAGE = "users";

    const cachePhotos = () => {
      Preferences.set({
        key: PHOTO_STORAGE,
        value: JSON.stringify(usuarios.value),
      });
    };

    watch(usuarios, cachePhotos);

    const loadSaved = async () => {
      const photoList = await Preferences.get({ key: PHOTO_STORAGE });
      const photosInPreferences = photoList.value
        ? JSON.parse(photoList.value)
        : [];

      for (const photo of photosInPreferences) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
      usuarios.value = photosInPreferences;
    };

    const nombre: any = ref("Nombre");
    const apellido = ref("Apellido");
    const correo = ref("Correo");
    const comentario = ref("Comentario");

    const writeSecretFile = async () => {
      await Filesystem.writeFile({
        // path: "secrets/text.txt",
        path: "secrets/text.txt",
        data: JSON.stringify({
          nombre: nombre.value,
          apellido: apellido.value,
          correo: correo.value,
          comentario: comentario.value,
        }),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      // await Filesystem.writeFile({
      //   // path: "secrets/text.txt",
      //   path: `nombre/apellido`,
      //   data: apellido.value,
      //   directory: Directory.Data,
      //   encoding: Encoding.UTF8,
      // });
      // await Filesystem.writeFile({
      //   // path: "secrets/text.txt",
      //   path: `example`,
      //   data: correo.value,
      //   directory: Directory.Data,
      //   encoding: Encoding.UTF8,
      // });
      // await Filesystem.writeFile({
      //   // path: "secrets/text.txt",
      //   path: `example`,
      //   data: comentario.value,
      //   directory: Directory.Data,
      //   encoding: Encoding.UTF8,
      // });
    };

    const borrarSecreto = () => {
      deleteSecretFile();
    };

    const nombreeee = ref();

    const funcccc = async () => {
      nombreeee.value = await readSecretFile();
    }

    funcccc()

    return {
      writeSecretFile,
      borrarSecreto,

      nombre,
      apellido,
      correo,
      comentario,
      nombreeee,
    };
  },
});

export interface Formulario {
  nombre: string;
  apellido: string;
  correo: string;
  comentario: string;
}
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
