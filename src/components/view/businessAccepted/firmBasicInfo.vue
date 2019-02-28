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
                    <p class="fmini">企业名称：{{this.businessDetialCompanyInfo.companyName}} </p>
                    <p class="fmini">证件编号： {{this.businessDetialCompanyInfo.companyCardNo}}</p>
                    <p class="fmini">
                        <span>企业性质：{{this.businessDetialCompanyInfo.companyCharacter}}</span>
                        <span>企业等级：{{this.businessDetialCompanyInfo.companyRank}}</span>
                        <span>行业类型：{{this.businessDetialCompanyInfo.industryType}}</span></p>
                    <p class="fmini">注册地址：{{this.businessDetialCompanyInfo.registProvince+this.businessDetialCompanyInfo.registCity+this.businessDetialCompanyInfo.registArea+this.businessDetialCompanyInfo.registAddress}}</p>
                    <p class="fmini">办公地址：{{this.businessDetialCompanyInfo.officeProvince+this.businessDetialCompanyInfo.officeCity+this.businessDetialCompanyInfo.officeArea+this.businessDetialCompanyInfo.officeAddress}}</p>
                    <p class="fmini">企业电话：{{this.businessDetialCompanyInfo.phone}}</p>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <img class="examplew" :src="$global.serverSrc+this.businessDetialCompanyInfo.companyProofPic" alt="">
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
                    <p class="fmini">法人姓名： {{this.businessDetialCompanyInfo.legalPerson}}</p>
                    <p class="fmini"> 法人电话： {{this.businessDetialCompanyInfo.legalPhone}}</p>
                    <p class="fmini">法人证件： {{this.legalCardCn}} </p>
                    <p class="fmini">证件号码： {{this.businessDetialCompanyInfo.cardNum}} </p>
                    <p class="fmini" v-if="businessDetialCompanyInfo.idCardAddress">身份证住址： {{this.businessDetialCompanyInfo.idCardAddress}}</p>
                    <p class="fmini" v-if="businessDetialCompanyInfo.legalCard!='HK_pass' || businessDetialCompanyInfo.legalCard!='Taiwan_pass'">
                        证件有效期：{{this.businessDetialCompanyInfo.cardStartDate+"~"+this.businessDetialCompanyInfo.cardEndDate}}
                    </p>
                    <div>
                        <!-- <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div> -->
                        <ul class="basedata">
                            <li>
                                <img class="exampleh" :src="$global.serverSrc+this.businessDetialCompanyInfo.legalCardFrontPic" alt="">
                                <p class="fmini center">法人身份证（正面）</p>
                            </li>
                            <li>
                                <img class="exampleh" :src="$global.serverSrc+this.businessDetialCompanyInfo.legalCardBackPic" alt="">
                                <p class="fmini center">法人身份证（反面）</p>
                            </li>
                        </ul>
                        <ul class="basedata">
                            <li>
                                <img class="exampleh" :src="$global.serverSrc+this.businessDetialCompanyInfo.legalCardHandPic" alt="">
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
        props:[
            "companyInfos"
        ],
        watch: {
            companyInfos(val) {
                console.log("companyInfos",val);
                this.businessDetialInfo = val.data;
                console.log("businessDetialInfo.company",this.businessDetialInfo.company);
                this.businessDetialCompanyInfo = this.businessDetialInfo.company;

                switch (this.businessDetialCompanyInfo.legalCard){
                    case 'ID_card':
                        this.legalCardCn = '身份证';
                        break;
                    case 'OfficerCard':
                        this.legalCardCn = '军官证';
                        break;
                    case 'Passport':
                        this.legalCardCn = '护照';
                        break;
                    case 'HK_pass':
                        this.legalCardCn = '港澳居民来往内地通行证';
                        break;
                    case 'Taiwan_pass':
                        this.legalCardCn = '台湾居民来往大陆通行证';
                        break;
                }

            }
        },
        data() {
            return {
                businessDetialInfo:{},
                businessDetialCompanyInfo:{},
                legalCardCn:'',
            };
        },
        components: {},
        created(){
            console.log(this.company);
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
