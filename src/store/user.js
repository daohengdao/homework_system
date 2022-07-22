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
        login(context,date){
           if (date.password=="test000"){
               let access="023225";
               let refresh="zadasdese";
               context.commit('updateAccess',access);

               let test={
                   userId:"1",
                   username:date.username,
                   sex:"男",
                   teamName:"啊对对队",
                   teamId:"1",
                   name:"张三",
                   phone:"1215555666",
                   identity:"队长",
                   teacher:"老师1",
                   stuNum:"02566596626",
                   is_team:true
               };

               context.commit('updateUser',{
                   ...test,
                   access:access,
                   refresh:refresh,
                   is_login:true
               });
               date.success();
           }else {
               date.error();
           }
        }
    },
    modules: {
    }
};

export default ModuleUser;