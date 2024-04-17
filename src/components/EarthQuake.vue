<template>
    <v-data-table        
        :headers="headers"
        :items="features.features"
        :items-length="totalItems"
        items-per-page="5"
        height="400"
        
        item-value="feature"
        @update:options="loadFeatures"
    />
  
                <h2>Crear Comentario</h2>
                <!-- <form @submit.prevent="submitComment">
                    <label for="featureId">Feature ID:</label>
                    <input type="text" id="featureId" v-model="featureId" required>
                    <label for="commentBody">Comentario:</label>
                    <textarea id="commentBody" v-model="commentBody" required></textarea>
                    <button type="submit">Enviar Comentario</button>
                </form> -->
         
            <div>
                <h2>Lista de Comentarios</h2>
                <ul>
                    <!-- <li v-for="comment in comments" :key="comment.id">
                        <p>Comentario ID: {{ comment.id }}</p>
                        <p>Feature ID: {{ comment.featureId }}</p>
                        <p>Comentario: {{ comment.body }}</p>                        
                    </li> -->
                </ul>
            </div>
   
</template>

<script>
    import { defineComponent, ref, onMounted  } from 'vue'
    //import axios from 'axios';
    import { useCommentStore } from './../store/comments';
    import { useFeatureStore } from './../store/features';
    export default defineComponent({
        name: 'App',
        methods: {
            loadFeatures () {
                this.loading = true
                console.log("features¡ ", this.features.features, "SI? " , !(this.features.features))
                if(this.features.features)
                    this.loading = false
            }
        },
        setup () {
            const features = useFeatureStore();
            const comments = useCommentStore();
            const commentBody = ref('')
            const featureId = ref('');
            const loading = ref(true);
            const totalItems = ref(0);
            const search = ref('');
            const itemsPerPage = ref(5);
            const headers = [
                {
                    title: 'External ID',
                    align: 'start',
                    sortable: false,
                    key: 'external_id'
                },
                {
                    title: 'Magnitude',
                    align: 'left',
                    sortable: true,
                    key: 'magnitude'
                },
                {
                    title: 'Magnitude type',
                    align: 'left',
                    sortable: true,
                    key: 'mag_type'
                },
                {
                    title: 'Place',
                    align: 'left',
                    sortable: true,
                    key: 'place'
                },
                {
                    title: 'Time',
                    align: 'center',
                    sortable: true,
                    key: 'time'
                },
                {
                    title: 'Title',
                    align: 'left',
                    sortable: false,
                    key: 'title'
                },
                {
                    title: 'Tsunami',
                    align: 'left',
                    sortable: true,
                    key: 'tsunami'
                },
                {
                    title: 'Coordinates',
                    align: 'left',
                    sortable: false,
                    key: 'coordinates'
                },
            ];

            onMounted(async () => {
                loading.value = true;
                try {
                    await features.fetchFeatures();
                } catch (error) {
                    console.error('Error fetching features:', error);
                    // Manejar errores si es necesario
                } finally {
                    console.log("Arreglo listo");
                    loading.value = false;
                }
            });

            return {
                commentBody,
                featureId,
                features,
                comments,
                loading,
                totalItems,
                search,
                itemsPerPage,
                headers
            }
        },
        
    });
</script>