<template>
    <div id="businessData">
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
        <section>
            <div class="detailMsg">
                <p>
                    业务信息
                </p>
            </div>
            <div class="block left">
                <div>
                    <div style="float:left;">
                        <span class="fmini">400号码：</span>
                    </div>
                    <ul>
                        <li class="l2">
                            <el-table :data="objCodeTable"
                                      border
                                      style="width: 100%">

                                <el-table-column
                                        prop="number"
                                        label="400号码">
                                </el-table-column>

                                <el-table-column
                                        prop="objCode"
                                        label="目的码">
                                </el-table-column>

                                <el-table-column
                                        prop="pilotCode"
                                        label="引示码">
                                </el-table-column>

                                <el-table-column
                                        prop="operator"
                                        label="所属运营商">
                                </el-table-column>
                            </el-table>
                        </li>
                    </ul>
                </div>
                <p class="fmini">归属地区： 业务身份： </p>
                <p class="fmini">受理人：</p>
                <p class="fmini">资费套餐： 优惠：</p>
            </div>
        </section>
        <section>
            <div class="detailMsg">
                <p>
                    业务资料
                </p>
            </div>
            <div class="block left serviceData">
                <p class="fmini">标准协议编号：</p>
                <div>
                    <div style="float:left;">
                        <span class="fmini">统一的标准协议：</span>
                    </div>
                    <ul class="businessDataUl">
                        <li class="l2">
                            <img class="examplew" src="../../../assets/example_1.png" alt="">
                            <img class="examplew" src="../../../assets/example_1.png" alt="">
                            <img class="examplew" src="../../../assets/example_1.png" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">业务受理单：</span>
                    </div>
                    <ul>
                        <li class="l2">
                            <img class="examplew" src="../../../assets/example_1.png" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">办理授权书：</span>
                    </div>
                    <ul class="businessDataUl">
                        <li class="l2">
                            <img class="examplew" src="../../../assets/example_1.png" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">信息安全责任书：</span>
                    </div>
                    <ul>
                        <li class="l2">
                            <img class="examplew" src="../../../assets/example_1.png" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">目的码证明材料：</span>
                    </div>
                    <ul>
                        <li class="l2">
                            <img class="examplew" src="../../../assets/example_1.png" alt="">
                        </li>
                    </ul>
                </div>
                <p class="fmini">其他文件(非必传）：</p>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        name: 'businessData',
        data() {
            return {
                objCodeTable: [{
                    number: '234567',
                    objCode: '057189087171',
                    pilotCode:'057189087171',
                    operator:'中国电信'
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
