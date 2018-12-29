<template>
    <div id="stepFour">

        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next(3)">上一步</el-button>
            <el-button type="primary" size="mini" @click="next">暂存信息</el-button>
            <el-button type="primary" size="mini" @click="">送审</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'stepFour',
        data() {
            return {};
        },
        components: {},
        methods: {
            next(val){
                this.$emit('next', val);
            }
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
