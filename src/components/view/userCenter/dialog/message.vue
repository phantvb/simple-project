<template>
    <div>
        <el-dialog title="编辑资料" :visible.sync="dialogFormVisible" @close="close">
            <el-form :model="form">
                <section>
                    <div class="title">
                        账号信息
                    </div>
                    <div class="part message">
                        <p>登录账号 ：<span class="grey">18072886969</span></p>
                        <ul>
                            <li>
                                <p>角色：超级管理员</p>
                            </li>
                            <li>
                                <p>状态：启用</p>
                            </li>
                        </ul>
                    </div>
                </section>
                <div class="title">
                    用户资料
                </div>
                <ul>
                    <li class="l2">
                        <el-form-item label="用户名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </li>
                </ul>
                <ul>
                    <li class="l2">
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-radio v-model="form.sex" label="1">男</el-radio>
                            <el-radio v-model="form.sex" label="2">女</el-radio>
                        </el-form-item>
                    </li>
                    <li class="l2">
                        <el-form-item label="手机" :label-width="formLabelWidth">
                            <el-input v-model="form.phone" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </li>
                </ul>
                <el-form-item label="地区" :label-width="formLabelWidth">
                    <el-select v-model="form.province" filterable placeholder="请选择" size="mini" style="width:30%;">
                        <el-option
                        v-for="item in options.province"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.city" filterable placeholder="请选择" size="mini" style="width:30%;">
                        <el-option
                        v-for="item in options.city"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.area" filterable placeholder="请选择" size="mini" style="width:30%;">
                        <el-option
                        v-for="item in options.area"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <ul>
                    <li class="l2">
                        <el-form-item label="身份证" :label-width="formLabelWidth">
                            <el-input v-model="form.idCard" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </li>
                    <li class="l2">
                        <el-form-item label="邮箱" :label-width="formLabelWidth">
                            <el-input v-model="form.email" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </li>
                </ul>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form.desc">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang='scss' scoped>
@import './dialog.scss';
</style>
<script>
export default {
    name:'message',
    data(){
        return {
            form: {
                name: '',
                sex:1,
                phone:'',
                province:'',
                city:'',
                area:'',
                idCard:'',
                email:'',
                desc: ''
            },
            options:{
                province:null,
                city:null,
                area:null
            },
            dialogFormVisible:false,
            formLabelWidth: '100px'
        }
    },
    props:['show'],
    watch:{
        show(newV,oldV){
            this.dialogFormVisible=newV;
        }
    },
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>

