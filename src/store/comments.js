import { defineStore } from "pinia";

export const useCommentStore = defineStore({
    id: 'comment',
    state : () => ({
        comments : [],
    }),
    getters: {
        async findComment(featureId){
            try {
                const comments = this.comments.filter(comment => comment.featureId === featureId);
                console.log("comments? ", comments)
                return comments;   
            } catch (error) {
                console.log("Error finding comment/s: ", error);
                return [];
            }            
        }
    },
    actions: {
        async addComment(featureId,comment) {
            try {
                const newComment = {
                    featureId: featureId,
                    body: comment
                }
                this.comments.push(newComment);
                //Acá generar post a la BD a través de ROR
            } catch (error) {
                console.log("Error adding comment: ", error);                
            }
            
        },
    }

})