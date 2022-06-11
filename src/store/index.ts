import { createStore, mapMutations } from "vuex";
import brand from "./modules/brand";
import shopCart from "./modules/shopcart";
import user from './modules/user'
const store = createStore({
    modules: {
        brand,
        user,
        shopCart
    },
})

export default store