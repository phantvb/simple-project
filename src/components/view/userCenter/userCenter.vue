<template>
    <div id="userCenter">
        <header>
            用户中心
        </header>
        <section>
            <div class="title">
                基本资料
                <p class="edit">
                    <i class="el-icon-edit-outline"></i>
                    <el-button type="text" @click="editMes(true)">编辑</el-button>
                </p>
            </div>
            <div class="part center portrait">
                <img src="../../../assets/portrait_1.png">
                <el-button type="text" class="button" @click="editPortrait(true)">修改头像</el-button>
            </div>
            <div class="part message">
                <p>登录账号 ：<span class="grey">18072886969</span></p>
                <p>用户名称：沈嘉</p>
                <p>性别：男</p>
                <p>身份证号：</p>
                <p>邮箱：nikor@126.com</p>
                <p>手机：18072886969</p>
            </div>
            <div class="part message">
                <p>角色：超级管理员</p>
                <p>地区：浙江省 杭州市 萧山区</p>
                <p>状态：启用</p>
                <p>备注：</p>
            </div>
        </section>
        <section>
            <div class="title">
                安全设置
            </div>
            <div class="part">
                <el-button type="text" class="button" @click="editPass">修改密码</el-button>
            </div>
        </section>
        <message :show="mesEdit" @close="editMes(false)"></message>
        <portrait :show="portraitEdit" @close="editPortrait(false)"></portrait>
    </div>
</template>
<style lang='scss' scoped>
@import './userCenter.scss';
</style>
<script>
import message from './dialog/message.vue'
import portrait from './dialog/portrait.vue'
export default {
    name:'userCenter',
    data(){
        return {
            mesEdit:false,
            portraitEdit:false,
            passEdit:false
        }
    },
    components:{
        message,portrait
    },
    methods:{
        editMes(bol){
            this.mesEdit=bol;
        },
        editPortrait(bol){
            this.portraitEdit=bol;
        },
        editPass(){
            this.passEdit=true;
        }
    }
}
</script>

