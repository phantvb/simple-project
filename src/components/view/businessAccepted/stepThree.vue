<template>
    <div id="stepThree">
        <!--新增号码弹窗-->
        <div class="addNumDialog">
            <el-dialog
                    title="新增号码"
                    :visible.sync="addNumdialogVisible"
                    width="80%"
                    :before-close="handleClose">
                <div>
                    <div class="numMessage">
                        <p>选择号码</p>
                        <p style="border-color:rgba(255,255,255,1)">已选号码：</p>
                        <div class="block left">
                            <el-form ref="addNumform" :model="addNumform" class="addNumform" label-width="120px">
                            <div class="selectNumTable">
                                <ul>
                                    <li style="float: unset">
                                        <el-table :data="selectedNum"
                                                  border
                                                  style="width: 100%">

                                            <el-table-column
                                                    prop="number"
                                                    label="400号码">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="setMeal"
                                                    label="套餐">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="lowest"
                                                    label="最低年消费">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="prestore"
                                                    label="预存话费">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="unit"
                                                    label="单位">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="setMealDetail"
                                                    label="套餐详细">
                                            </el-table-column>

                                            <el-table-column
                                                    label="操作">
                                                    <template slot-scope="scope">
                                                        <el-button size="mini" type="text">删除</el-button>
                                                    </template>
                                            </el-table-column>
                                        </el-table>
                                    </li>
                                </ul>
                            </div>
                                <el-form-item label="号码模糊搜索：">
                                    <el-input v-model="addNumform.activeName" size="mini"></el-input>
                                    <el-button type="primary" size="mini">搜索</el-button>
                                </el-form-item>

                                <el-tabs type="border-card">
                                    <el-tab-pane label="1200套餐">
                                        <set-meal></set-meal>
                                    </el-tab-pane>
                                    <el-tab-pane label="3000套餐">3000套餐</el-tab-pane>
                                    <el-tab-pane label="6000套餐">6000套餐</el-tab-pane>
                                </el-tabs>

                            </el-form>

                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addNumdialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addNumSave()" size="mini">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <el-form ref="stepTwoForm" :model="stepTwoForm" label-width="100px">
            <div class="title left">
                经办人基本信息
            </div>
            <div class="handleInfo">
                <el-form-item label="经办人姓名：" class="firmName">
                    <el-input v-model="stepTwoForm.handleName" size="mini" placeholder="填入法人真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="经办人电话：" class="firmName">
                    <el-input v-model="stepTwoForm.handlePhone" size="mini" placeholder="填入法人联系电话（固话或手机）"></el-input>
                </el-form-item>
                <el-form-item label="经办人证件：" class="identity">
                    <el-select v-model="stepTwoForm.handleIdentity" @change="change123" placeholder="请选择" size="mini">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                    </el-select>
                    <el-input class="handleIdentityNo" v-model="stepTwoForm.handleIdentityNo" size="mini" placeholder="根据证件类型，填写相应的证件号码"></el-input>
                </el-form-item>
            </div>
            <div class="block person_data">
            <div>
                <div style="float:left;">
                    <span class="grey fmini">经办人身份证：</span>
                </div>
                <ul>
                    <li class="l2">
                        <ul>
                            <li class="l2">
                                <el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.frontImageUrl" :src="stepTwoForm.frontImageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                            <li class="l2">
                                <el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.contraryImageUrl" :src="stepTwoForm.contraryImageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                        <ul>
                            <li class="l2">
                                <el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.selfImageUrl" :src="imageUrl.selfImageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </li>
                    <li class="l2">
                        <ul>
                            <li class="l2 example">
                                <img class="exampleh" src="../../../assets/example_2.png" alt="">
                            </li>
                            <li class="l2 example">
                                <img class="exampleh" src="../../../assets/example_3.png" alt="">
                            </li>
                        </ul>
                        <ul>
                            <li class="l2 example">
                                <img class="exampleh" src="../../../assets/example_4.png" alt="">
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="stepTwotips">
                    <p class="grey">◆ 请提供身份证的原件照片或者彩色扫描件文字清晰可辨认，如正反面复印件在一页上只需上传一张。</p>
                    <p class="grey">◆ 法人持身份证照片法人外貌必须和证件文字必须清晰可辨认</p>
                    <p class="grey">◆ 格式根据要求jpg、jpeg、png,不能超过10MB</p>
                </div>

            </div>
        </div>
            <div class="title left">
                业务信息
            </div>
            <div style="margin-left:32px">
                <div class="num400">
                    <span>400号码：</span>
                    <el-button type="primary" size="mini" @click="addNumdialogVisible = true">+新增号码</el-button>
                </div>
                <div style="overflow: hidden;margin-bottom:30px">
                    <ul>
                        <li style="float:unset;margin-left:70px">
                            <p style="text-align: right">业务身份： 本地网直销</p>
                            <el-table :data="objCodeTable"
                                      border
                                      style="width: 100%">

                                <el-table-column
                                        prop="number"
                                        label="400号码">
                                </el-table-column>

                                <el-table-column
                                        prop="setMeal"
                                        label='套餐'>
                                </el-table-column>

                                <el-table-column
                                        prop="lowest"
                                        label='最低年消费'>
                                </el-table-column>

                                <el-table-column
                                        prop="prestoreCost"
                                        label='预存话费'>
                                </el-table-column>

                                <el-table-column
                                        prop="unit"
                                        label='单位'>
                                </el-table-column>

                                <el-table-column
                                        prop="setMealDetail"
                                        label='套餐详情'>
                                </el-table-column>

                                <el-table-column
                                        prop="objCode"
                                        label='目的码'>
                                </el-table-column>
                            </el-table>
                        </li>
                    </ul>
                </div>

                <div class="num400">
                    <span>目的码：</span>
                    <div class="objCodeBox">
                        <div class="addObjCode">
                            <el-input v-model="addObjCode" size="mini"></el-input>
                            <el-button type="primary" size="mini">+</el-button>
                        </div>
                        <div class="addObjCode">
                            <el-input v-model="delObjCode" size="mini"></el-input>
                            <el-button type="primary" size="mini">-</el-button>
                        </div>
                    </div>
                </div>

                <div class="num400" style="margin-bottom:30px;">
                    <span>归属地区：</span>
                    <div class="QCellCore">
                        <el-select v-model="stepTwoForm.province" placeholder="请选择" size="mini">
                            <el-option
                                    v-for="item in provinceList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="stepTwoForm.city" placeholder="请选择" size="mini">
                            <el-option
                                    v-for="item in cityList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="QCellCore">
                        <span>优惠：</span>
                        <el-select v-model="stepTwoForm.discounts" placeholder="请选择" size="mini">
                            <el-option
                                    v-for="item in discountsList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div style="float:left;">
                    <span class="fmini">增值服务：</span>
                </div>
                <div style="overflow: hidden">
                    <ul>
                        <li style="float:unset">
                            <el-table :data="objCodeTable"
                                      border
                                      style="width: 100%">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="增值服务名称">
                                </el-table-column>

                                <el-table-column
                                        prop="amount"
                                        label='数量'>
                                </el-table-column>

                                <el-table-column
                                        prop="tariff"
                                        label='资费/单位'>
                                </el-table-column>

                                <el-table-column
                                        prop="remark"
                                        label='备注'>
                                </el-table-column>

                                <el-table-column
                                        prop="cost"
                                        label='费用'>
                                </el-table-column>

                                <el-table-column
                                        prop="setMealDetail"
                                        label='套餐详情'>
                                </el-table-column>

                            </el-table>
                        </li>
                    </ul>
                </div>

            </div>
        </el-form>

        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next(2)">上一步</el-button>
            <el-button type="primary" size="mini" @click="next">暂存信息</el-button>
            <el-button type="primary" size="mini" @click="next(4)">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import setMeal from './setMeal';
    export default {
        name: 'stepThree',
        data() {
            return {
                addNumdialogVisible:false,
                addNumform:{
                    activeName:'',
                },
                stepTwoForm:{
                    handleName:'', //经办人姓名
                    handlePhone:'',//经办人电话
                    handleIdentity:'',//经办人证件
                    handleIdentityNo:'',//经办人证件号码
                    proveFile:'',
                    reference:'',
                    frontImageUrl:'',        //正面照
                    contraryImageUrl: '',    //反面照
                    selfImageUrl:'',         //本人手持证件照
                    province:'',             //归属地(省)
                    city:'',                 //归属地(市)
                    discounts:'',            //优惠
                },
                selectedNum:[{
                    number:'40023842846',
                    setMeal:'9000商务套餐',
                    lowest:'',
                    prestore:'',
                    unit:'',
                    setMealDetail:'',
                }],
                objCodeTable: [{
                    name: '234567',
                    amount:'',
                    tariff:'',
                    remark:'',
                    cost:'',
                    setMealDetail:'',
                },{
                    name: '1111111',
                    amount:'',
                    tariff:'',
                    remark:'',
                    cost:'',
                    setMealDetail:'',
                }],
                identityTypeList:[   //证件类型
                    {
                        value: '1',
                        label: '营业执照'
                    }, {
                        value: '2',
                        label: '组织机构代码证'
                    }, {
                        value: '3',
                        label: '三证合一'
                    }
                ],
                provinceList:[{
                    value:'1',
                    label:'广东省'
                },{
                    value:'2',
                    label:'浙江省'
                }],
                cityList:[{
                    value:'1',
                    label:'中山市'
                },{
                    value:'2',
                    label:'杭州市'
                }],
                discountsList:[{
                    value:'1',
                    label:'无优惠'
                },{
                    value:'2',
                    label:'3000套餐签3年'
                }],
                addObjCode:'',  //添加目的码
                delObjCode:'',  //删减目的码
            };
        },
        components: {
            setMeal
        },
        methods: {
            // 图片上传
            handleAvatarSuccess(res, file) {
                this.acceptForm.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            change123(event) {
                console.log("event",event);
            },
            next(val){
                this.$emit('childNext', val);
            },
            // 选号
            addNumSave(){

            },
            // 弹窗关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
        },
        computed: {}
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background-color: #ecf5ff;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .examplew .avatar-uploader-icon {
        width: 120px;
        height: 148px;
        line-height: 148px;
    }

    .examplew .avatar {
        width: 120px;
        height: 148px;
    }

    .exampleh .avatar-uploader-icon {
        width: 148px;
        height: 120px;
        line-height: 120px;
    }

    .exampleh .avatar {
        width: 148px;
        height: 120px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
    }
    .avatar {
        display: block;
    }
</style>
<style lang="scss" scoped>
    @import './stepTwo.scss';
</style>
