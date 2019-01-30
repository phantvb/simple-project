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
                    <p class="fmini">企业名称：{{this.company.companyName}} </p>
                    <p class="fmini">证件编号： {{this.company.companyCardNo}}</p>
                    <p class="fmini">
                        <span>企业性质：{{this.company.companyCharacter}}</span>
                        <span>企业等级：{{this.company.companyRank}}</span>
                        <span>行业类型：{{this.company.industryType}}</span></p>
                    <p class="fmini">注册地址：{{this.company.registProvince+this.company.registCity+this.company.registaArea}}</p>
                    <p class="fmini">办公地址：{{this.company.officeProvince+this.company.officeCity+this.company.officeArea}}</p>
                    <p class="fmini">企业电话：{{this.company.phone}}</p>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <img class="examplew" :src="this.company.companyProofPic" alt="">
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
                    <p class="fmini">法人姓名： {{this.company.legalPerson}}</p>
                    <p class="fmini"> 法人电话： {{this.company.legalPhone}}</p>
                    <p class="fmini">法人证件： {{this.company.legalCard+" "+this.company.cardNum}} </p>
                    <p class="fmini" v-if="this.company.idCardAddress">身份证住址： {{this.company.idCardAddress}}</p>
                    <p class="fmini">证件有效期：{{this.company.cardStartDate+"-"+this.company.cardEndDate}}</p>
                    <div>
                        <!-- <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div> -->
                        <ul class="basedata">
                            <li>
                                <img class="exampleh" :src="this.company.legalCardFrontPic" alt="">
                                <p class="fmini center">法人身份证（正面）</p>
                            </li>
                            <li>
                                <img class="exampleh" :src="this.company.legalCardBackPic" alt="">
                                <p class="fmini center">法人身份证（反面）</p>
                            </li>
                        </ul>
                        <ul class="basedata">
                            <li>
                                <img class="exampleh" :src="this.company.legalCardHandPic" alt="">
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
    import {mapState} from "vuex";
    export default {
        name: 'firmBasicInfo',
        data() {
            return {};
        },
        components: {},
        created(){
            // this.getCacheData();
            console.log(this.company);

            // console.log(this.destNumber);
            // console.log(this.number400ValueAdded);
            // console.log(this.number400Concession);
        },
        methods: {
            // 存vuex更新企业信息模块入参
            ChangeCompanyStatus(val) {
                return this.$store.dispatch("ChangeCompanyStatus", val);
            },
            ChangeBusinessStatus(val) {
                return this.$store.dispatch("ChangeBusinessStatus", val);
            },
            ChangeDestNumber(val) {
                return this.$store.dispatch("ChangeDestNumberStatus", val);
            },
            ChangeNumber400ValueAdded(val) {
                return this.$store.dispatch("ChangeNumber400ValueAddedStatus", val);
            },
            ChangeNumber400Concession(val) {
                return this.$store.dispatch("ChangeNumber400ConcessionStatus", val);
            },
            ChangeFlowRecord(val) {
                return this.$store.dispatch("ChangeFlowRecord", val);
            },
        },
        computed: {
            ...mapState({
                company: state => state.createActivities.company,
                business: state => state.createActivities.business,
                destNumber: state => state.createActivities.destNumber,
                number400ValueAdded: state => state.createActivities.number400ValueAdded,
                number400Concession: state => state.createActivities.number400Concession,
                flowRecord: state => state.createActivities.flowRecord,
            })
        }
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
