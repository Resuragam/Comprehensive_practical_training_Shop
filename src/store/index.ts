import { createStore, mapMutations } from "vuex";
import brand from "./modules/brand";
import user from './modules/user'
const store = createStore({
    modules: {
        brand,
        user
    },
})

export default store