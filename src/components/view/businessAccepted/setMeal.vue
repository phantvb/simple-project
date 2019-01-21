<template>
    <div id="setMeal">
        <p class="title">400商务热线1200套餐规则</p>
        <p style="color:#999999">套餐内<span>免费通话12000</span>分钟，超出部分按照0.1元/分钟收费</p>
        <div class="bigHouse">
            <div class="lowestExpense">
                <p>年最低消费</p>
                <div class="ellipse"><span>1200</span>元</div>
            </div>
            <div class="lowestExpense">
                <p>预存话费</p>
                <div class="ellipse"><span>1200</span>元</div>
            </div>
        </div>
        <!--号码详情-->
        <div class="numberDetail">
            <div class="unit">4008-801-490</div>
        </div>
        <!--分页-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: 'setMeal',
        data() {
            return {
                currentPage: 4,   //分页
            };
        },
        components: {},
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
