<template>
    <div id="billDetail" class="lightblueTable">
        <el-dialog title="号码月账单详情" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
            <div class="title">
                基本信息
            </div>
            <div class="block">
                <ul>
                    <li class="l2">
                        <p class="fmini">
                            400号码:  4008818611
                        </p>
                        <p class="fmini">
                            企业名称:  15622771295 
                        </p>
                    </li>
                    <li class="l2">
                        <p class="fmini">
                            引示号:  057186694234 
                        </p>
                        <p class="fmini">
                            账单月份:  2018-10
                        </p>
                    </li>
                </ul>
            </div>
            <div class="title">
                套餐信息    
            </div>
            <div class="block">
                <ul>
                    <li class="l2">
                        <p class="fmini">
                            基本套餐:  400商务热线3000套餐
                        </p>
                        <p class="fmini">
                            套餐金额: 3000 元  
                        </p>
                        <p class="fmini">
                            套餐内时长（剩余/总量）：0/30000 分钟 
                        </p>
                    </li>
                    <li class="l2">
                        <p class="fmini">
                            套餐期限:  1 年
                        </p>
                        <p class="fmini">
                            套餐内计费：3000 元  
                        </p>
                        <p class="fmini">
                            套餐剩余金额: 0 元 
                        </p>
                    </li>
                </ul>
            </div>
            <div class="title">
                时长包
            </div>
            <div class="block">
                <p class="fmini">
                    充值记录: 
                </p>
                <el-table :data="recordData" border style="width: 100%" :header-row-class-name="'lightblue'">
                    <el-table-column prop="name" label="时长包" min-width="150">
                    </el-table-column>
                    <el-table-column prop="num" label="数量" min-width="80">
                    </el-table-column>
                    <el-table-column prop="money" label="金额" min-width="120">
                    </el-table-column>
                </el-table>
                <ul>
                    <li class="l2">
                        <p class="fmini">
                            时长包剩余时长:  0  分钟
                        </p>
                    </li>
                    <li class="l2">
                        <p class="fmini">
                            时长包计费:  55100  元
                        </p>
                    </li>
                </ul>
            </div>
            <div class="title">
                超额计费
            </div>
            <div class="block">
                <ul>
                    <li class="l2">
                        <p class="fmini">
                            超额时长：2109 分钟
                        </p>
                    </li>
                    <li class="l2">
                        <p class="fmini">
                            超额计费：210 元
                        </p>
                    </li>
                </ul>
            </div>
            <div class="title">
                增值业务
            </div>
            <div class="block">
                <el-table :data="firmData" border style="width: 100%" :header-row-class-name="'lightblue'">
                    <el-table-column prop="name" label="名称" min-width="150">
                    </el-table-column>
                    <el-table-column prop="num" label="数量" min-width="80">
                    </el-table-column>
                    <el-table-column prop="money" label="金额" min-width="120">
                    </el-table-column>
                </el-table>
            </div>
            <div class="total">
                <p class="left">费用合计：<span class="red">23323</span> 元</p>
            </div>
            <footer class="right">
                <el-button type="primary" size="mini">确定</el-button>
                <el-button type="primary" size="mini" plain>取消</el-button>
            </footer>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
@import './common.scss';
</style>

<script>
export default {
    name:'billDetail',
    props:['show'],
    watch:{
        show(newV,oldV){
            this.dialogVisible=newV;
        }
    },
    data(){
        return {
            dialogVisible:false,
            recordData:[{
                name:'500元5000分钟',
                num:1,
                money:500
            }],
            firmData:[]
        }
    },
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>
