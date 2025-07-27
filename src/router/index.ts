import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import SectionMaker from '@/components/SectionMaker/SectionMaker.vue';
import BuildMaker from '@/components/BuildMaker/BuildMaker.vue';
import NotFound from '@/components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/section-maker/:projectName?-:dataName?',
      name: 'section-maker',
      component: SectionMaker,
      props: true,
    },
    {
      path: '/build-maker/:projectName?-:dataName?',
      name: 'build-maker',
      component: BuildMaker,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

export default router;
