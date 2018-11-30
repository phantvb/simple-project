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
                                    <img src="../../../../assets/portrait_1.png" alt="">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_2.png" alt="">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_3.png" alt="">
                                </li>
                            </ul>
                            <ul>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_4.png" alt="">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_5.png" alt="">
                                </li>
                                <li class="l3">
                                    <img src="../../../../assets/portrait_6.png" alt="">
                                </li>
                            </ul>
                        </li>
                        <li style="width:40%" class="preview">
                            <img src="../../../../assets/portrait_1.png">
                            <p>头像预览</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="本地上传" name="2">
                    <p class="grey note">从电脑里挑选一张好图作为头像吧</p>
                    <p class="grey note">支持jpg/png格式图片，文件需小于2M</p>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang='scss' scoped>
@import './dialog.scss';
img{
    width: 80%;
    height: 80%;
    border-radius: 100%;
}
</style>
<script>
export default {
    name:'portrait',
    data(){
        return {
            active:"1",
            dialogVisible:false,
        }
    },
    props:['show'],
    watch:{
        show(newV,oldV){
            this.dialogVisible=newV;
        }
    },
    methods:{
        handleClick(tab, event){
            console.log(tab, event);
        },
        close(){
            this.$emit('close');
        }
    }
}
</script>

