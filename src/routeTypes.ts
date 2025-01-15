

import mineSweeper from "./pages/minesweeper/index.vue";
import Home from "./pages/home/index.vue";
import dorf from "./pages/dorf/index.vue";
import snake from "./pages/snake/index.vue";

type RouteTypes = {
    path: string,
    component: typeof mineSweeper,
    text: string,
    about?: string
}[]

export const routes: RouteTypes = [
    { path: '/home', component: Home, text: 'Home' },
    { path: '/mineSweeper', component: mineSweeper, text: "MineSweeper", about: 'Comme le nom l\'indique,  c\'est le jeu du démineur' },
    { path: '/dorf', component: dorf, text: "Dorf Romantik", about: 'Feuille interactive pour compter les points à Dorf Romantik' },
    { path: '/snake', component: snake, text: "Snake", about: 'Attention à ne pas se mordre soi-même' },
]

export default { routes }
