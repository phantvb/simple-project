<template>
    <div id="portrait">
        <el-dialog title="修改头像" :visible.sync="dialogVisible" @close="close">
            <el-tabs v-model="active" @tab-click="handleClick">
                <el-tab-pane label="选择头像" name="1">
                    <ul class="portrait">
                        <li style="width:60%;border-right:1px solid #ccc;box-sizing: border-box;">
                            <p class="grey note">从个性头像库里选择一张图片作为头像</p>
                            <ul>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_1.png" alt="" id="listPortrait1"
                                         @click="imgUrl('listPortrait1')">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_2.png" alt="" id="listPortrait2"
                                         @click="imgUrl('listPortrait2')">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_3.png" alt="" id="listPortrait3"
                                         @click="imgUrl('listPortrait3')">
                                </li>
                            </ul>
                            <ul>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_4.png" alt="" id="listPortrait4"
                                         @click="imgUrl('listPortrait4')">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_5.png" alt="" id="listPortrait5"
                                         @click="imgUrl('listPortrait5')">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_6.png" alt="" id="listPortrait6"
                                         @click="imgUrl('listPortrait6')">
                                </li>
                            </ul>
                        </li>
                        <li style="width:40%" class="preview">
                            <img src="../../../../assets/portrait_1.png" id="prePortrait">
                            <p>头像预览</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="本地上传" name="2">
                    <p class="grey note">从电脑里挑选一张好图作为头像吧</p>
                    <el-input size="mini" style="width: 80%;float: left;"></el-input>

                    <el-button type="primary" plain size="mini" style="margin-left: 15px" @click.stop="uploadHeadImg">上传</el-button>

                    <p class="grey note">支持jpg/png格式图片，文件需小于2M</p>

                    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="uploadPortrait" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang='scss' scoped>
    @import './dialog.scss';

    img {
        width: 80%;
        height: 80%;
        border-radius: 100%;
    }
</style>
<script>
    export default {
        name: 'portrait',
        data() {
            return {
                active: "1",
                dialogVisible: false,
                src: ''
            }
        },
        props: ['show', 'data'],
        watch: {
            show(newV, oldV) {
                this.dialogVisible = newV;
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            close() {
                this.$emit('close');
            },
            uploadPortrait() {

                // this.$ajax.post('/vos/user/saveUser', {
                //     "user": {
                //         "id": this.data.id,
                //         "username": this.data.username,
                //         "password": null,
                //         "roleName": this.data.roleName,
                //         "roleId": this.data.roleId,
                //         "enabled": this.data.roleId,
                //         "name": this.data.name,
                //         "phone": this.data.phone,
                //         "sex": this.data.sex,
                //         "remark": this.data.remark,
                //         "province": this.data.province,
                //         "provinceId": this.data.provinceId,
                //         "city": this.data.city,
                //         "cityId": this.data.cityId,
                //         "area": this.data.area,
                //         "areaId": this.data.areaId,
                //         "email": this.data.email,
                //         "idNo": this.data.idNo,
                //         "headPicture": this.src,
                //         "businessType": this.data.businessType
                //     }
                // }).then((res) => {
                //     if (res.code == 200) {
                //         this.$message({
                //             message: '修改成功!',
                //             type: 'success'
                //         });
                //     }
                // });
                // this.dialogVisible = false
            },

            uploadHeadImg() {
                this.$el.querySelector('.hiddenInput').click();
            },

            handleFile(e){
                console.log(e.files);
            },

            imgUrl(id) {
                console.log(document.getElementById(id).src);
                this.src = document.getElementById(id).src;
                document.getElementById('prePortrait').src = this.src;
            }
        }
    }
</script>

