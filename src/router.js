import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Projects from "./views/Projects.vue";
import Completed from "./views/Completed.vue";
import Expired from "./views/Expired.vue";
import ProjectDetails from "./views/ProjectDetails.vue";
import EditProject from "./views/EditProject.vue";
import Team from "./views/Team.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";
import Profile from "./views/Profile.vue";
import { fb } from "./firebase";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "*",
            redirect: "/login"
        },
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/home",
            name: "dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/projects",
            name: "projects",
            component: Projects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/completed",
            name: "completed",
            component: Completed,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/expired",
            name: "expired",
            component: Expired,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/project/:id",
            name: "project",
            component: ProjectDetails,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/editProject/:id",
            name: "editProject",
            component: EditProject,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/team",
            name: "team",
            component: Team,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: { hideNavigation: true }
        },
        {
            path: "/signup",
            name: "signup",
            component: Signup,
            meta: { hideNavigation: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = fb.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next("/login");
    else if (!requiresAuth && currentUser) next("/home");
    else next();
});

export default router;
