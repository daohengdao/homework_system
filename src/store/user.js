import baseUrl from "@/util/config";
import $ from 'jquery';
import jwt_decode from 'jwt-decode';

const ModuleUser={
    state: {
        userId:"",
        username:"",
        sex:"",
        teamName:"",
        teamId:"",
        name:"",
        phone:"",
        identity:"",
        teacher:"",
        stuNum:"",
        access:"",
        refresh:"",
        is_login:false,
        is_team:false
    },
    getters: {
    },
    mutations: {
        updateUser(state,user){
            state.userId=user.userId;
            state.username=user.username;
            state.sex=user.sex;
            state.teamName=user.teamName;
            state.teamId=user.teamId;
            state.name=user.name;
            state.phone=user.phone
            state.identity=user.identity
            state.teacher=user.teacher;
            state.stuNum=user.stuNum;
            state.access=user.access;
            state.refresh=user.refresh;
            state.is_login=user.is_login;
            state.is_team=user.is_team;

        },
        updateAccess(state,access){
            state.access=access;
        },
        logout(state){
            state.userId="";
            state.username="";
            state.sex="";
            state.teamName="";
            state.teamId="";
            state.name="";
            state.phone="";
            state.identity="";
            state.teacher="";
            state.stuNum="";
            state.access="";
            state.refresh="";
            state.is_login=false;
            state.is_team=false;
        }
    },
    actions: {
        login(context,data){
            $.ajax({
                url:baseUrl+":8080/api/token",
                type:"POST",
                crossDomain: true,
                data:{
                    username:data.username,
                    password:data.password,
                },
                success(resp){
                    const {access,refresh}=resp;
                    const access_obj=jwt_decode(access);

                    setInterval(()=>{
                        $.ajax({
                            url:baseUrl+":8080/api/token/refresh",
                            type:"POST",
                            crossDomain: true,
                            data:{
                                refresh,
                            },
                            success(resp){
                                context.commit('updateAccess',resp.access)
                            }
                        })
                    },4.5*60*1000);

                    $.ajax({
                        url:baseUrl+":8080/api/user",
                        type:"GET",
                        crossDomain: true,
                        data:{
                            user_id:access_obj.user_id,
                        },
                        headers:{
                            'Authorization':"Bearer "+access,
                        },
                        success(resp){
                            context.commit("updateUser",{
                                ...resp.userInfo,
                                access:access,
                                refresh:refresh,
                                is_login:true
                            });
                            data.success();
                        }
                    })
                },
                error(){
                    data.error();
                }
            })
        }
    },
    modules: {
    }
};

export default ModuleUser;