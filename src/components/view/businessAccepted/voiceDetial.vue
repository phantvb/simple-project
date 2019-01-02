<template>
    <div id="voiceDetial">
        <div id="base">
            <header class="left">
                业务受理> 400业务> 目的码审核详情
                <div style="float:right;color:#FF6600">【待审核】</div>
            </header>
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
                        语音文件信息
                    </p>
                </div>
                <div class="block left">
                    <p class="fmini">400号码：</p>
                    <p class="fmini">语音类型：</p>
                    <p class="fmini">语音名称：</p>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">语音文件：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <div>
                                    <audio controls>
                                        <source src="horse.ogg" type="audio/ogg">
                                        <source src="horse.mp3" type="audio/mpeg">
                                        您的浏览器不支持 audio 元素。
                                    </audio>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p class="fmini">是否制作计费：</p>
                    <div>
                    </div>
                </div>
            </section>
        </div>
        <div id="progress">
            <header class="left">
                审核流程 > 目的码审核
            </header>
            <div class="block underline">
                <div class="step">
                    <el-steps direction="vertical" :active="1">
                        <el-step title="业务员(姚明)" description="递交 12月08日 16:59"></el-step>
                        <el-step title="管理员" description="审批 12月08日 16:59"></el-step>
                    </el-steps>
                </div>
                <button class="pass"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过</button>
            </div>
            <div class="block">
                <button class="pass passback">撤回</button>
                <div>
                    <button class="fleft passgo">送审</button>
                    <button class="fright passback">删除</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'voiceDetial',
        data() {
            return {
                objCodeTable: [{
                    number: '234567',
                    objCode: '',
                }],
            };
        },
        components: {},
        methods: {},
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
