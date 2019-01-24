<template>
    <div id="firmBasicInfo">
        <div id="base">
            <section>
                <div class="detailMsg">
                    <p>
                        企业基本信息
                    </p>
                </div>
                <div class="block left">
                    <p class="fmini">VSMS客户编码：</p>
                    <p class="fmini">集团CRM客户编码： </p>
                    <p class="fmini">省CRM客户编码：</p>
                    <p class="fmini">企业名称： </p>
                    <p class="fmini">证件编号： </p>
                    <p class="fmini"><span>企业性质：</span><span>企业等级：</span><span>行业类型：</span></p>
                    <p class="fmini">注册地址：</p>
                    <p class="fmini">办公地址：</p>
                    <p class="fmini">企业电话：</p>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <img class="examplew" src="../../../assets/example_1.png" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <div class="detailMsg">
                    <p>
                        法人基本信息
                    </p>
                </div>
                <div class="block left">
                    <p class="fmini">法人姓名： 华勇 法人电话： 15678987654</p>
                    <p class="fmini">法人证件： 身份证 350203198505143020</p>
                    <p class="fmini">身份证住址： 杭州拱墅区仓基新村9幢7单元601室</p>
                    <p class="fmini">身份证有效期： 2011.5.5-2031.5.5</p>
                    <div>
                        <!-- <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div> -->
                        <ul class="basedata">
                            <li>
                                <img class="exampleh" src="../../../assets/example_2.png" alt="">
                                <p class="fmini center">法人身份证（正面）</p>
                            </li>
                            <li>
                                <img class="exampleh" src="../../../assets/example_3.png" alt="">
                                <p class="fmini center">法人身份证（反面）</p>
                            </li>
                        </ul>
                        <ul class="basedata">
                            <li>
                                <img class="exampleh" src="../../../assets/example_4.png" alt="">
                                <p class="fmini center">法人手持身份证（正面）</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'firmBasicInfo',
        data() {
            return {};
        },
        components: {},
        created(){
            this.getCacheData();
        },
        methods: {
            getCacheData(){
                this.$ajax.post('/vos/business/getCacheData',{
                    flowId:''
                }).then((res)=>{
                    console.log(res);
                })
            }
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
