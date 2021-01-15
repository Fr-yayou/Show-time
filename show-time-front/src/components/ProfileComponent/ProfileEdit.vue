<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="mb-2" 
                    color="#F9A825"
                    elevation="8"
                    dark
                    small
                    v-bind="attrs"
                    v-on="on"
                >
                Edit
                </v-btn>
            </template>

            <div>
            <v-form ref="editUserInfoForm">
                <v-card>
                    <v-toolbar
                    dark
                    color="primary"
                    >
                    <v-toolbar-title>Edit Profile</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            icon
                            dark
                            @click="dialog = false"
                    >
                        <v-icon> mdi-close </v-icon>
                    </v-btn>
                    </v-toolbar-items>
                    </v-toolbar>
                    <v-list
                    three-line
                    subheader
                    >
                    <v-subheader>Profile Information</v-subheader>
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title class="mb-0">Username</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-text-field
                                id="username"
                                name="username"
                                required
                                v-model="username"
                                :rules="usernameRules"
                            ></v-text-field>
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title>Email</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-text-field
                                id="email"
                                name="email"
                                required
                                v-model="email"
                                :rules="emailRules"
                            ></v-text-field>
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-btn
                        class="primary"
                        dark
                        text
                        type="submit"
                        @click="submitEditUserInfo"
                        >
                        Save
                        </v-btn>
                    </v-list-item>
                    </v-list>
                </v-card>
            </v-form>
            </div>

            <div>
            <v-form ref="editUserPwdForm">
                <v-card>
                    <v-divider></v-divider>
                    <v-list
                    three-line
                    subheader
                    >
                    <v-subheader>Update Password</v-subheader>
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title>Current Password</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-text-field
                                id="crtPwd"
                                name="crtPwd"
                                required
                                v-model="crtPwd"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.minChar]"
                                :type="show1 ? 'text' : 'password'"
                                @click:append="show1 = !show1"
                            ></v-text-field>
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title>New Password</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-text-field
                                id="newPwd"
                                name="newPwd"
                                required
                                v-model="newPwd"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.minChar]"
                                :type="show2 ? 'text' : 'password'"
                                @click:append="show2 = !show2"
                            ></v-text-field>
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title>Confirm New Password</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-text-field
                                id="confirmNewPwd"
                                name="confirmNewPwd"
                                required
                                v-model="confirmNewPwd"
                                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.minChar, passwordMatch]"
                                :type="show3 ? 'text' : 'password'"
                                @click:append="show3 = !show3"
                            ></v-text-field>
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-btn
                        class="primary"
                        dark
                        text
                        type="submit"
                        @click="submitEditUserPwd"
                        >
                        Save
                        </v-btn>
                    </v-list-item>
                    </v-list>
                </v-card>
            </v-form>
            </div>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import bcrypt from 'bcryptjs';

export default {
    name: 'ProfileEdit',
    
    components: {
    },

    props:['user'],

    data () {
        return {
            dialog: false,
            username: this.user.username,
            email: this.user.email,
            crtPwd: '',
            newPwd: '',
            confirmNewPwd: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v => 3 <= v.length || 'Username must be at least 3 characters.',
            ],
            emailRules: [
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            show1: false,
            show2: false,
            show3: false,
            rules: {
                required: (value) => !!value || "Required.",
                minChar: (v) => (v && v.length >= 6) || 'Password must be at least 8characters.',
            },
        }
    },

    methods: {
        ...mapActions(["setUser", "updateUser"]),

        comparePassword(plainPwd, encryptedPwd) {
            return bcrypt.compare(plainPwd, encryptedPwd)
        },

        async hashPassword(plainPwd) {
            return await bcrypt.hash(plainPwd, 10)
        },

        submitEditUserInfo(event){
            event.preventDefault()
            if (this.$refs.editUserInfoForm.validate()) {
                let editUser = {
                    _id: this.user._id,
                    username: this.username,
                    email: this.email,
                    password: this.user.password
                }
                this.updateUser(editUser);
                this.setUser(this.user._id);
                this.dialog = false;
            }
        },

        async submitEditUserPwd(event) {
            event.preventDefault()
            if (this.$refs.editUserPwdForm.validate()) {
                if ((this.newPwd == this.confirmNewPwd) && (this.comparePassword(this.crtPwd, this.user.password))) {
                    let editUser = {
                        _id: this.user._id,
                        username: this.user.username,
                        email: this.user.email,
                        password: await this.hashPassword(this.newPwd)
                    }
                    this.updateUser(editUser);
                    this.dialog = false;
                }
            }
        }
    },

    computed: {
        ...mapGetters(["authenticated"]),

        passwordMatch() {
            return () =>
            this.newPwd === this.confirmNewPwd || "New Passwords must match";
        }
    },

    created() {
        this.setUser(this.authenticated.userId)
    }
}
</script>

<style>

</style>