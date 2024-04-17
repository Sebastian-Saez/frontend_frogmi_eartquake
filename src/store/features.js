import { defineStore } from "pinia";
import  apiClient  from "./../services/axios";

export const useFeatureStore = defineStore({
    id:'feature',
    state: () => ({
        features: [],
    }),
    getters: {
        getFeatureById: (state) => (id) => {
            return state.features.find(feature => feature.id === id);
        },
    },
    actions: {
        async fetchFeatures() {
            try {                                
                const response_oficial = await apiClient.get('/features');
                this.features = response_oficial.data;
               // this.features.push(feature);
            } catch (error) {
                console.log("Error-feature: ", error)
            }
        }
    }
    
});