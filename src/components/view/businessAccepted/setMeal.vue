<template>
    <div id="setMeal">
        <p class="title">{{mealListInfo.tariffName}}</p>
        <!--<p style="color:#999999">套餐内<span>免费通话12000</span>分钟，超出部分按照0.1元/分钟收费</p>-->
        <p style="color:#999999">{{mealListInfo.packageContent}}</p>
        <div class="bigHouse">
            <div class="lowestExpense">
                <p>基本功能费</p>
                <div class="ellipse"><span>{{mealListInfo.basicFunctionFee}}</span>元</div>
            </div>
            <div class="lowestExpense">
                <p>预存话费</p>
                <div class="ellipse"><span>{{mealListInfo.durationPresentation}}</span>元</div>
            </div>
        </div>
        <!--号码详情-->
        <div class="numberDetail">
            <div class="unit" v-for="(item,index) in numberList" :key="index" @click="getAllByPackages(item.number400)">{{item.number400}}</div>
        </div>
        <!--分页-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageObj.total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: 'setMeal',
        props:[
            "unitMeal",
            "unitIndex",
            "getAllByPackages"
        ],
        data() {
            return {
                currentPage: 1,   //分页
                mealListInfo:[],  //套餐数组
                numberList:[],    //套餐对应的400号码
                mealIndex:'',     //套餐下标
                pageObj:{
                    total:0,
                    page:1,
                    pageSize:10
                }
            };
        },
        created(){
            console.log("unitMeal",this.unitMeal);
            console.log("unitIndex",this.unitIndex);

            this.getAllByPackage2();
            this.mealListInfo = this.unitMeal;
            this.mealIndex = this.unitIndex;
            this.$root.eventHub.$on('getLoginInfo', (resp)=>{
                // this.getTariff(resp);
            } )
        },
        components: {},
        methods: {
            handleSizeChange(val) {
                this.pageObj.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageObj.page = val;
                console.log(`当前页: ${val}`);
            },
            // 以套餐分类400号码
            getAllByPackage2(data){
                this.$ajax.post('/vos/number400/searchByPackage',{
                    "num400Package":{
                        "number400":"",
                        "packgeId":data?data:this.mealIndex
                    },
                    "page":{
                        "pageNo":this.pageObj.page,
                        "pageSize":this.pageObj.pageSize
                    }

                }).then((res)=>{
                    // console.log(res.data);
                    // console.log(res.data.number400s);
                    this.numberList = res.data.number400s;
                    this.pageObj.total = res.data.totalCount;
                })
            }
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
