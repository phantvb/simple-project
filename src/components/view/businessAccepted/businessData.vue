<template>
    <div id="businessData">
        <section>
            <div class="detailMsg">
                <p>
                    经办人基本信息
                </p>
            </div>
            <div class="block left">
                <p class="fmini">经办人姓名： {{this.businessDetailBusinessInfo.agentName}} </p>
                <p class="fmini">经办人电话：{{this.businessDetailBusinessInfo.agentMobilePhone}} </p>
                <p class="fmini">经办人证件： {{this.businessDetailBusinessInfo.agentDocumentType+""+this.businessDetailBusinessInfo.agentDocumentNum}}</p>
                <!--<p class="fmini">证件有效期： 2011.5.5-2031.5.5</p>-->
                <div>
                    <!-- <div style="float:left;">
                        <span class="fmini">企业资质证明文件：</span>
                    </div> -->
                    <ul class="abc">
                        <li>
                            <img class="exampleh" :src="this.businessDetailBusinessInfo.agentCardFront" alt="">
                            <p class="fmini center">经办人身份证（正面）</p>
                        </li>
                        <li>
                            <img class="exampleh" :src="this.businessDetailBusinessInfo.agentCardBack" alt="">
                            <p class="fmini center">经办人身份证（反面）</p>
                        </li>
                    </ul>
                    <ul class="abc">
                        <li>
                            <img class="exampleh" :src="this.businessDetailBusinessInfo.agentCardWIthHand" alt="">
                            <p class="fmini center">经办人手持身份证（正面）</p>
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
                    <!--<ul class="abc">-->
                        <!--<li class="12">-->
                            <el-table :data="objCodeTable"
                                      border
                                      style="width: 90%">

                                <el-table-column
                                        prop="number400"
                                        label="400号码">
                                </el-table-column>

                                <el-table-column
                                        prop="tariffName"
                                        label="套餐">
                                </el-table-column>

                                <el-table-column
                                        prop="basicFunctionFee"
                                        label="基本功能费">
                                </el-table-column>

                                <el-table-column
                                        prop="durationPresentation"
                                        label="预存话费">
                                </el-table-column>

                                <el-table-column
                                        prop="units"
                                        label='单位'>
                                </el-table-column>

                                <el-table-column
                                        prop="packageContent"
                                        label='套餐详情'>
                                </el-table-column>
                            </el-table>
                        <!--</li>-->
                    <!--</ul>-->
                </div>
                <!--<div>-->
                    <p class="fmini" v-for="(item,index) in destNumberList">{{"目的码"+(index+1)+"："+ item.destnumber}}</p>
                <!--</div>-->
                <p class="fmini">归属地区： {{this.businessDetailBusinessInfo.provinceBelong+this.businessDetailBusinessInfo.cityBelong+this.businessDetailBusinessInfo.cityBelong}}</p>
                <p class="fmini">业务身份： {{this.businessDetailBusinessInfo.channel}} </p>
                <p class="fmini"> 优惠：{{this.businessDetailBusinessInfo.discounts}}</p>
                <div>
                    <div style="float:left;">
                        <span class="fmini">增值服务：</span>
                    </div>
                    <el-table :data="addValueList"
                              border
                              style="width: 90%">

                        <el-table-column
                                prop="valueAddedName"
                                label="增值服务名称">
                        </el-table-column>

                        <el-table-column
                                prop="amounts"
                                label="数量">
                        </el-table-column>

                        <el-table-column
                                prop="unit"
                                label="资费/单位">
                        </el-table-column>

                        <el-table-column
                                prop="remarks"
                                label="备注">
                        </el-table-column>

                        <el-table-column
                                prop="present"
                                label='是否赠送'>
                        </el-table-column>

                    </el-table>
                </div>
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
                    <ul class="abc">
                        <li class="l2">
                            <img class="imgSize" :src="this.businessDetailBusinessInfo.unionAgreementPic" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">业务受理单：</span>
                    </div>
                    <ul class="abc">
                        <li class="l2">
                            <img class="imgSize" :src="this.businessDetailBusinessInfo.businessHandlePic" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">办理授权书：</span>
                    </div>
                    <ul class="abc">
                        <li class="l2">
                            <img class="imgSize" :src="this.businessDetailBusinessInfo.authorizationPic" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">信息安全责任书：</span>
                    </div>
                    <ul class="abc">
                        <li class="l2">
                            <img class="imgSize" :src="this.businessDetailBusinessInfo.safeAgreementPic" alt="">
                        </li>
                    </ul>
                </div>
                <div>
                    <div style="float:left;">
                        <span class="fmini">目的码证明材料：</span>
                    </div>
                    <ul class="abc">
                        <li class="l2">
                            <img class="imgSize" :src="this.businessDetailBusinessInfo.destNumProfPic" alt="">
                        </li>
                    </ul>
                </div>
                <!--<p class="fmini">其他文件(非必传）：</p>-->
                <div>
                    <div style="float:left;">
                        <span class="fmini">其他文件(非必传）：</span>
                    </div>
                    <ul class="abc">
                        <li class="l2">
                            <img class="imgSize" :src="this.businessDetailBusinessInfo.otherPic" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    export default {
        name: 'businessData',
        props: [
            "detialInfos",
            "companyInfos"
        ],
        watch: {
            companyInfos(val) {
                console.log("companyInfos",val);
                this.businessDetialInfo = val.data;
                console.log("businessDetialInfo.company",this.businessDetialInfo.company);
                this.businessDetailBusinessInfo = this.businessDetialInfo.business;
                this.destNumberList = this.businessDetialInfo.destNumber;
                this.addValueList = this.businessDetialInfo.number400ValueAdded;
                console.log("addValueList",this.addValueList);
                //增值资费
                this.addValueList.map((item)=>{
                    console.log("addItem",item);
                    item.amount = item.numOfMonth;
                    item.numOfone = item.numOfone;
                    if(item.units=="perMonth"){
                        item.unit=item.valueAddedFee+"元/月";
                        item.amounts = item.amount +"月";
                    }else if(item.units=="perOne"){
                        item.unit="元/个";
                        item.amounts = item.numOfone +"个";
                    }else if(item.units=="perMonthOne"){
                        item.unit=item.numOfone+"元/月/个";
                        item.amounts = item.amount+"月" + item.numOfone +"个";
                    }

                    if(item.presents==1){
                        item.present="赠送"
                    }else{
                        item.present="付费"
                    }
                });

                //400号码表格
                let num400Obj = {};
                num400Obj.number400 = this.businessDetailBusinessInfo.number400;
                num400Obj.tariffName = this.businessDetailBusinessInfo.tariffName;
                num400Obj.basicFunctionFee = this.businessDetailBusinessInfo.basicFunctionFee;
                num400Obj.durationPresentation = this.businessDetailBusinessInfo.durationPresentation;
                num400Obj.units = this.businessDetailBusinessInfo.units;
                num400Obj.packageContent = this.businessDetailBusinessInfo.packageContent;
                this.objCodeTable.push(num400Obj);
                console.log(this.objCodeTable);
            }
        },
        data() {
            return {
                objCodeTable: [],
                addValueList:[],
                destNumberList:[],
                businessDetailBusinessInfo:{},
            };
        },
        components: {},
        created(){
            console.log("addValueList",this.addValueList);

        },
        methods: {

        },
        computed: {
            ...mapState({
                // company: state => state.createActivities.company,
                // business: state => state.createActivities.business,
                // destNumber: state => state.createActivities.destNumber,
                // number400ValueAdded: state => state.createActivities.number400ValueAdded,
                // number400Concession: state => state.createActivities.number400Concession,
            })
        }
    }
</script>
<style lang="scss" scoped>
    @import './stepTwo.scss';
    @import './400businessManage.scss';
</style>
