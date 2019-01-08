<template>
    <div id="stepTwo">
        <el-form ref="stepTwoForm" :model="stepTwoForm">
            <div>
                <div class="title left">
                    企业资料
                </div>
                <div class="block data">
                    <div>
                        <div style="float:left;">
                            <span class="grey fmini">企业资质证明文件：</span>
                        </div>
                        <ul>
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.proveFile" :src="stepTwoForm.proveFile" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                            <li class="8 example">
                                <div style="float:left;">
                                    <span class="grey fmini">参考示例：</span>
                                </div>
                                <img class="examplew left" src="../../../assets/example_1.png" alt="">
                            </li>
                        </ul>
                        <div class="stepTwotips">
                            <p class="grey">◆ 请提供证件的原件照片或者彩色扫描件（正副本均可）,文字/盖章清晰可辨认，并说明材料优先级 参考样式</p>
                            <p class="grey">◆ 格式根据要求jpg、jpeg、png,不能超过10MB</p>
                        </div>
                    </div>
                </div>
                <div class="title left">
                    法人资料
                </div>
                <div class="block person_data">
                    <div>
                        <div style="float:left;">
                            <span class="grey fmini">法人身份证：</span>
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
            </div>

        </el-form>
        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next(1)">上一步</el-button>
            <el-button type="primary" size="mini" @click="next">暂存信息</el-button>
            <el-button type="primary" size="mini" @click="next(3)">下一步</el-button>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'stepTwo',
        data() {
            return {
                stepTwoForm:{
                    proveFile:'',
                    reference:'',
                    frontImageUrl:'',        //正面照
                    contraryImageUrl: '',    //反面照
                    selfImageUrl:'',         //本人手持证件照
                }
            };
        },
        components: {},
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
            next(val){
                this.$emit('childNext', val);
            }
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
