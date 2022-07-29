import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView";
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import NotFoundView from "@/views/NotFoundView";
import PointView from "@/views/PointView";
import TeamSignView from "@/views/TeamSignView";
import TeamRecruitView from "@/views/TeamRecruitView";
import TeamInfoView from "@/views/TeamInfoView";
import ComGoingView from "@/views/ComGoingView";
import CompReView from "@/views/CompReView";
import CompRegisterView from "@/views/CompRegisterView";
import BaseInfoView from "@/views/BaseInfoView";
import CompRecruit from "@/views/CompRecruit";
import TeamReview from "@/views/TeamReview";
import TeamResume from "@/views/TeamResumeView";
import SuccessView from "@/views/SuccessView";
import CompPersonView from "@/views/CompPersonView";
import updatePassword from "@/views/updatePassword";
import coachingTeamView from "@/views/CoachingTeamView";




const routes = [
  {
    path: '/web/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/web/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/web/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/web/point/',
    name: 'point',
    component: PointView
  },
  {
    path:'/web/team/sign/',
    name: 'teamSign',
    component: TeamSignView
  },
  {
    path: '/web/team/recruit/',
    name: 'teamRecruit',
    component: TeamRecruitView
  },
  {
    path: '/web/team/info/',
    name: 'teamInfo',
    component: TeamInfoView
  },
  {
    path: '/web/comp/going/',
    name: 'compGoing',
    component: ComGoingView
  },
  {
    path: '/web/comp/review/',
    name: 'compReView',
    component: CompReView
  },
  {
    path: '/web/comp/register/',
    name: 'compRegister',
    component: CompRegisterView
  },
  {
    path: '/web/comp/recruit/',
    name: 'compRecruit',
    component: CompRecruit
  },
  {
    path: '/web/comp/person/',
    name: 'compPerson',
    component: CompPersonView
  }
  ,
  {
    path: '/web/team/review/',
    name: 'teamReView',
    component: TeamReview
  },
  {
    path: '/web/team/resume/',
    name: 'teamResume',
    component: TeamResume
  },
  {
    path: '/web/base/info',
    name: 'baseInfo',
    component: BaseInfoView
  },
  {
    path: '/web/modify/password',
    name: 'modifyPassword',
    component: updatePassword
  },
  {
    path: '/web/coach/team',
    name:'coachTeam',
    component: coachingTeamView
  },
  {
    path: '/web/success',
    name: 'success',
    component: SuccessView
  },
  {
    path: '/web/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/web/404/"
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
