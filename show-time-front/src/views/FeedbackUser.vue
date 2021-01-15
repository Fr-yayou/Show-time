<template>
    <div class="container-feedbackUser">
        <p>If you wish, you can leave a comment on your user experience on BandSite, on the event you just booked...</p>
        <p>Whatever, you feel like.</p>
        <p class="mb-1">The whole team will appreciate it very much. Thanks :-)</p>

        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
        <v-textarea
            v-model="feedbackUser"
            :rules="feedbackRules"
            counter
            clearable
            clear-icon="mdi-close-circle"
            label="Feedback"
            required
            placeholder="Your feedback here.."
        ></v-textarea>

        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must check the box to post your feedback!']"
            label="Submit my feedback?"
            required
        ></v-checkbox>

        <router-link :to="`/myqrcodes`" class="btn-feedback">
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
            >
                Validate
            </v-btn>
        </router-link>

        <router-link :to="`/myqrcodes`" class="skip">
            <v-btn
                color="secondary"
                class="mr-4"
            >
                Later...
            </v-btn>
        </router-link>

        
    </v-form>

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "FeedbackUser",

    data() {
        return {
            valid: true,
            feedbackUser: '',
            feedbackRules: [
                v => !!v || 'Feedback is required',

            ],
            checkbox: false,
        }
    },

    methods: {
        ...mapActions(["addFeedback"]),

        validate() {
            if (this.$refs.form.validate()) {
                let newFeedback = {
                    user_id: this.authenticated.userId,
                    concert_id: this.$route.params.id,
                    feedback: this.feedbackUser
                };
                this.addFeedback(newFeedback)
                this.$router.push("/bookedconcerts")
            }
        },
    },

    computed: {
        ...mapGetters(["authenticated"])
    }

}
</script>

<style scoped>

.container-feedbackUser {
    padding: 80px;
}

.skip {
    text-decoration: none;
}

.btn-feedback {
    text-decoration: none;
}

</style>