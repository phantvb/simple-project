<template>
    <div>
        <el-dialog title="编辑资料" :visible.sync="dialogFormVisible" @close="close" width="50%">
            <el-form :model="form">
                <section>
                    <div class="title">
                        账号信息
                    </div>
                    <div class="part message">
                        <p>登录账号 ：<span class="grey">{{this.data.username}}</span></p>
                        <ul>
                            <li>
                                <p>角色：{{this.data.roleName}}</p>
                            </li>
                            <li style="margin-left: 100px;">
                                <p>状态：{{this.data.enabled}}</p>
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
                            <el-radio v-model="form.sex" label="man">男</el-radio>
                            <el-radio v-model="form.sex" label="woman">女</el-radio>
                        </el-form-item>
                    </li>
                    <li class="l2">
                        <el-form-item label="手机" :label-width="formLabelWidth">
                            <el-input v-model="form.phone" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </li>
                </ul>
                <el-form-item label="地区" :label-width="formLabelWidth" style="width: 100%">
                    <el-select v-model="form.province" placeholder="请选择" size="mini"
                               @focus="loadProvince" @change="loadCity">
                        <el-option
                            v-for="(index,item) in options.province"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.city" placeholder="请选择" size="mini"
                               @change="loadArea">
                        <el-option
                            v-for="(index,item) in options.city"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.area" placeholder="请选择" size="mini" >
                        <el-option
                            v-for="(index,item) in options.area"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
                <ul>
                    <li >
                        <el-form-item label="身份证" :label-width="formLabelWidth">
                            <el-input v-model="form.idCard" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </li>
                    <li >
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
                <el-button type="primary" @click="submit" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang='scss' scoped>
    @import './dialog.scss';
</style>
<script>
    export default {
        name: 'message',
        data() {
            return {
                form: {
                    name: '',
                    sex: 'man',
                    phone: '',
                    province: '',
                    city: '',
                    area: '',
                    idCard: '',
                    email: '',
                    desc: ''
                },
                options: {
                    province: [],
                    city: [],
                    area: []
                },
                dialogFormVisible: false,
                formLabelWidth: '100px'
            }
        },
        props: ['show', 'data'],
        watch: {
            show(newV, oldV) {
                this.dialogFormVisible = newV;

                this.form.name = this.data.name;
                this.form.sex = this.data.sex;
                this.form.phone = this.data.phone;
                this.form.province = this.data.province;
                this.form.city = this.data.city;
                this.form.area = this.data.area;
                this.form.idCard = this.data.idNo;
                this.form.email = this.data.email;
                this.form.desc = this.data.remark;
            }
        },
        methods: {
            close() {
                this.init();
                this.$emit('close');
            },
            init() {
                for (let key in this.form) {
                    if (key == 'sex') {
                        this.form[key] = 1;
                    } else {
                        this.form[key] = '';
                    }
                }
            },
            loadProvince() {
                this.options.province = [];
                this.$ajax.get('/vos/address/getAllProvince').then(res => {
                    if (res.code == 200) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.options.province.push({
                                "value": res.data[i].provinceId,
                                "label": res.data[i].province
                            })
                        }
                    }
                });
            },
            loadCity() {
                this.form.city = '';
                this.form.area = '';
                this.options.city = [];
                this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + this.form.province).then(res => {
                    if (res.code == 200) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.options.city.push({
                                "value": res.data[i].cityId,
                                "label": res.data[i].city
                            })
                        }
                    }
                });
            },
            loadArea() {
                this.form.area = '';
                this.options.area = [];
                this.$ajax.get('/vos/address/getAreasByCityId?cityId=' + this.form.city).then(res => {
                    if (res.code == 200) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.options.area.push({
                                "value": res.data[i].areaId,
                                "label": res.data[i].area
                            })
                        }
                    }
                });
            },

            submit() {
                let enabled;
                if (this.data.enabled == '启用') {
                    enabled = true;
                }
                if (this.data.enabled == '关闭') {
                    enabled = false;
                }
                let provinceName;
                let cityName;
                let areaName;
                for (let i = 0; i < this.options.province.length; i++) {
                    if (this.options.province[i].value == this.form.province) {
                        provinceName = this.options.province[i].label;
                    }
                }
                for (let i = 0; i < this.options.city.length; i++) {
                    if (this.options.city[i].value == this.form.city) {
                        cityName = this.options.city[i].label;
                    }
                }
                for (let i = 0; i < this.options.area.length; i++) {
                    if (this.options.area[i].value == this.form.area) {
                        areaName = this.options.area[i].label;
                    }
                }
                this.$ajax.post('/vos/user/saveUser', {
                    "user": {
                        "id": this.data.id,
                        "username": this.data.username,
                        "password": this.data.password,
                        "roleName": this.data.roleName,
                        "roleId": this.data.roleId,
                        "enabled": enabled,
                        "name": this.form.name,
                        "phone": this.form.phone,
                        "sex": this.form.sex,
                        "remark": this.form.desc,
                        "province": provinceName,
                        "provinceId": this.form.province,
                        "city": cityName,
                        "cityId": this.form.city,
                        "area": areaName,
                        "areaId": this.form.area,
                        "email": this.form.email,
                        "idNo": this.form.idCard,
                        "headPicture": this.data.headPicture,
                        "businessType": this.data.businessType
                    }
                }).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '编辑成功!',
                            type: 'success'
                        });
                    }
                });
                this.dialogFormVisible = false
            }
        }
    }
</script>

