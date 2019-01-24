<template>
    <div>
        <div>
            <el-button type="primary" style="float: left;" @click="showAddDiscount">
                <i class="el-icon-plus">&nbsp;新增优惠方案</i>
            </el-button>
        </div>
        <div style="clear: both;"></div>
        <div style="margin-top: 15px;">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="自助直销" name="5">
                    <div>
                        <el-row>
                            <el-col
                                :span="4"
                                v-for="(o, index) in cTotalCount1"
                                :key="o"
                                :offset="1"
                                style="margin-top: 10px;"
                            >
                                <el-card
                                    :body-style="{ padding: '0px'}"
                                    shadow="hover"
                                    style="width:300px;"
                                >
                                    <div class="add-title">{{cTableData1[index].concessionName}}</div>
                                    <div class="add-body">
                                        <el-form label-width="100px">
                                            <el-form-item
                                                label="优惠方式："
                                                class="add-item"
                                            >{{cTableData1[index].concessionWay}}</el-form-item>
                                            <el-form-item
                                                label="充值额度："
                                                class="add-item"
                                                v-if="cTableData1[index].rechargeLimit"
                                            >{{cTableData1[index].rechargeLimit}}元</el-form-item>
                                            <el-form-item
                                                label="赠送额度："
                                                class="add-item"
                                                v-if="cTableData1[index].donationQuota"
                                            >{{cTableData1[index].donationQuota}}元</el-form-item>
                                            <el-form-item
                                                label="优惠价格："
                                                class="add-item"
                                                v-if="cTableData1[index].packageDeals"
                                            >{{cTableData1[index].packageDeals}}元</el-form-item>
                                            <el-form-item
                                                label="减扣时长："
                                                class="add-item"
                                                v-if="cTableData1[index].availableTime"
                                            >{{cTableData1[index].availableTime}}分钟</el-form-item>
                                            <el-form-item
                                                label="优惠时间："
                                                class="add-item"
                                                v-if="cTableData1[index].concessionTime"
                                            >{{cTableData1[index].concessionTime}} {{cTableData1[index].units}}</el-form-item>
                                            <div style="border-top: 1px solid #f5f5f5;">
                                                <div style="float: right;">
                                                    <el-button
                                                        type="text"
                                                        class="button"
                                                        @click="updateDiscount(0,index)"
                                                    >编辑</el-button>
                                                    <el-button
                                                        type="text"
                                                        class="button"
                                                        @click="deleteInfo(cTableData1[index].id,'delConcessionScheme')"
                                                    >删除</el-button>
                                                </div>
                                            </div>
                                        </el-form>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="渠道" name="6">
                    <div>
                        <el-row>
                            <el-col
                                :span="4"
                                v-for="(o, index) in cTotalCount2"
                                :key="o"
                                :offset="1"
                                style="margin-top: 10px;"
                            >
                                <el-card
                                    :body-style="{ padding: '0px'}"
                                    shadow="hover"
                                    style="width:300px;"
                                >
                                    <div class="add-title">{{cTableData2[index].concessionName}}</div>
                                    <div class="add-body">
                                        <el-form label-width="100px">
                                            <el-form-item
                                                label="优惠方式："
                                                class="add-item"
                                            >{{cTableData2[index].concessionWay}}</el-form-item>
                                            <el-form-item
                                                label="充值额度："
                                                class="add-item"
                                                v-if="cTableData2[index].rechargeLimit"
                                            >{{cTableData2[index].rechargeLimit}}元</el-form-item>
                                            <el-form-item
                                                label="赠送额度："
                                                class="add-item"
                                                v-if="cTableData2[index].donationQuota"
                                            >{{cTableData2[index].donationQuota}}元</el-form-item>
                                            <el-form-item
                                                label="优惠价格："
                                                class="add-item"
                                                v-if="cTableData2[index].packageDeals"
                                            >{{cTableData2[index].packageDeals}}元</el-form-item>
                                            <el-form-item
                                                label="减扣时长："
                                                class="add-item"
                                                v-if="cTableData2[index].availableTime"
                                            >{{cTableData2[index].availableTime}}分钟</el-form-item>
                                            <el-form-item
                                                label="优惠时间："
                                                class="add-item"
                                                v-if="cTableData2[index].concessionTime"
                                            >{{cTableData2[index].concessionTime}} {{cTableData2[index].units}}</el-form-item>

                                            <div style="border-top: 1px solid #f5f5f5;">
                                                <div style="float: right;">
                                                    <el-button
                                                        type="text"
                                                        class="button"
                                                        @click="updateDiscount(1,index)"
                                                    >编辑</el-button>
                                                    <el-button
                                                        type="text"
                                                        class="button"
                                                        @click="deleteInfo(cTableData2[index].id,'delConcessionScheme')"
                                                    >删除</el-button>
                                                </div>
                                            </div>
                                        </el-form>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="addDiscountDialog">
            <el-dialog
                title="新增优惠方案"
                :visible.sync="addDiscountFormDialogVisible"
                width="30%"
                :before-close="handleClose"
            >
                <div>
                    <el-form ref="addDiscountForm" :model="addDiscountForm" label-width="100px">
                        <el-form-item label="优惠名称：">
                            <el-input
                                v-model="addDiscountForm.concessionName"
                                size="mini"
                                class="el-input"
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="优惠方案：">
                            <el-select
                                v-model="addDiscountForm.value"
                                placeholder="请选择"
                                style="float: left;width: 80%"
                                size="mini"
                                @change="changeStyle"
                            >
                                <el-option
                                    v-for="item in addDiscountForm.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="充值额度：" :style="'display:'+addDiscountForm.style1+';'">
                            <el-input
                                v-model="addDiscountForm.rechargeLimit"
                                size="mini"
                                class="el-input"
                            ></el-input>
                            <span class="span">元</span>
                        </el-form-item>

                        <el-form-item label="赠送额度：" :style="'display:'+addDiscountForm.style1+';'">
                            <el-input
                                v-model="addDiscountForm.donationQuota"
                                size="mini"
                                class="el-input"
                            ></el-input>
                            <span class="span">分钟</span>
                        </el-form-item>

                        <el-form-item label="优惠价格：" :style="'display:'+addDiscountForm.style2+';'">
                            <el-input
                                v-model="addDiscountForm.packageDeals"
                                size="mini"
                                class="el-input"
                            ></el-input>
                            <span class="span">元</span>
                        </el-form-item>

                        <el-form-item label="减扣时长：" :style="'display:'+addDiscountForm.style2+';'">
                            <el-input
                                v-model="addDiscountForm.availableTime"
                                size="mini"
                                class="el-input"
                            ></el-input>
                            <span class="span">分钟</span>
                        </el-form-item>

                        <el-form-item label="优惠时间：" :style="'display:'+addDiscountForm.style2+';'">
                            <el-input
                                v-model="addDiscountForm.concessionTime"
                                size="mini"
                                class="el-input"
                                style="width: 40%;"
                            ></el-input>
                            <el-select
                                v-model="addDiscountForm.value2"
                                placeholder="请选择"
                                style="float: left; margin-left: 10%; width: 30%;"
                                size="mini"
                            >
                                <el-option
                                    v-for="item in addDiscountForm.options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="渠道：">
                            <el-checkbox-group v-model="addDiscountForm.checkList">
                                <el-checkbox
                                    label="自助直销"
                                    class="el-checkbox"
                                    :disabled="this.disabledSelf"
                                ></el-checkbox>
                                <el-checkbox label="渠道" :disabled="this.disabledChannel"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDiscountFormDialogVisible = false" size="mini">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="addDiscount"
                        size="mini"
                        :style="'display:'+submitData+';'"
                    >确 定</el-button>
                    <el-button
                        type="primary"
                        @click="handleUpdateDiscount"
                        size="mini"
                        :style="'display:'+updateData+';'"
                    >编 辑</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addDiscountFormDialogVisible: false,
            activeNames: ["5", "6"],
            buttonShow1: "inline-block",
            buttonShow2: "inline-block",
            addDiscountForm: {
                concessionName: "",
                rechargeLimit: "",
                donationQuota: "",
                packageDeals: "",
                availableTime: "",
                concessionTime: "",
                id: "",
                options: [
                    {
                        value: "1",
                        label: "充值包满就送"
                    },
                    {
                        value: "2",
                        label: "套餐价格优惠"
                    }
                ],
                value: "",
                options2: [
                    {
                        value: "month",
                        label: "月"
                    },
                    {
                        value: "year",
                        label: "年"
                    }
                ],
                value2: "",
                checkList: [],
                style1: "block",
                style2: "none"
            },
            cTotalCount1: "",
            cTotalCount2: "",
            cTableData1: [],
            cTableData2: [],

            tableData: [],

            updateData: "none", // 编辑和新增公用一个弹窗控制按钮显示
            submitData: "inline-block",

            disabledSelf: false,
            disabledChannel: false
        };
    },
    methods: {
        showAddDiscount() {
            this.addDiscountFormDialogVisible = true;

            this.addDiscountForm.concessionName = "";
            this.addDiscountForm.value = "";
            this.addDiscountForm.rechargeLimit = "";
            this.addDiscountForm.donationQuota = "";
            this.addDiscountForm.packageDeals = "";
            this.addDiscountForm.availableTime = "";
            this.addDiscountForm.concessionTime = "";
            this.addDiscountForm.checkList = [];
            this.addDiscountForm.value2 = "";
            this.addDiscountForm.id = "";

            this.updateData = "none";
            this.submitData = "inline-block";

            this.changeStyle();

            this.disabledSelf = false;
            this.disabledChannel = false;
        },
        // 新增优惠方案
        addDiscount() {
            if (
                ((this.addDiscountForm.value == 2) &
                (this.addDiscountForm.concessionName == "" ||
                this.addDiscountForm.packageDeals == "" ||
                this.addDiscountForm.availableTime == "" ||
                this.addDiscountForm.concessionTime == "" ||
                this.addDiscountForm.checkList.length == 0 ||
                this.addDiscountForm.value == "" ||
                this.addDiscountForm.value2 == ""))
                ||
                ((this.addDiscountForm.value == 1||this.addDiscountForm.value == "")&
                (this.addDiscountForm.concessionName == "" ||
                this.addDiscountForm.rechargeLimit == "" ||
                this.addDiscountForm.donationQuota == "" ||
                this.addDiscountForm.value == "" ||
                this.addDiscountForm.checkList.length == 0))
            ) {
                this.$message({
                    message: "存在空字段!",
                    type: "warning"
                });
            } else {
                let channel = "";
                // let units = "";
                if (this.addDiscountForm.checkList.length == 2) {
                    channel = "self+channel";
                }
                if (
                    this.addDiscountForm.checkList.length == 1 &&
                    this.addDiscountForm.checkList[0] == "自助直销"
                ) {
                    channel = "self";
                }
                if (
                    this.addDiscountForm.checkList.length == 1 &&
                    this.addDiscountForm.checkList[0] == "渠道"
                ) {
                    channel = "channel";
                }

                // if (this.addDiscountForm.value2 == "month") {
                //     units = "month";
                // }
                // if (this.addDiscountForm.value2 == "year") {
                //     units = "year";
                // }
                this.$ajax
                    .post("/vos/tariffPackage/addConcessionScheme", {
                        concessionScheme: {
                            concessionName: this.addDiscountForm.concessionName,
                            concessionWay: this.addDiscountForm.value,
                            rechargeLimit: this.addDiscountForm.rechargeLimit,
                            donationQuota: this.addDiscountForm.donationQuota,
                            packageDeals: this.addDiscountForm.packageDeals,
                            availableTime: this.addDiscountForm.availableTime,
                            concessionTime: this.addDiscountForm.concessionTime,
                            channel: channel,
                            units: this.addDiscountForm.value2
                        }
                    })
                    .then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: "新增成功!",
                                type: "success"
                            });
                            this.loadData();
                        }
                        if (res.code == 60000) {
                            this.$message.error("数据已存在!");
                        }
                    });
            }

            this.addDiscountFormDialogVisible = false;
        },

        //删除信息
        deleteInfo(id, url) {
            this.$confirm("此操作将永久删除这条信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    this.$ajax
                        .post("/vos/tariffPackage/" + url, {
                            id: id
                        })
                        .then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: "删除成功!",
                                    type: "success"
                                });
                                this.loadData();
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        updateDiscount(num, index) {
            this.tableData = [this.cTableData1, this.cTableData2];

            this.addDiscountFormDialogVisible = true;

            this.updateData = "inline-block";
            this.submitData = "none";

            this.disabledSelf = true;
            this.disabledChannel = true;

            let value = "";
            if (this.tableData[num][index].concessionWay == "套餐价格优惠") {
                value = "2";
            }
            if (this.tableData[num][index].concessionWay == "充值包满就送") {
                value = "1";
            }

            let channel = "";
            if (this.tableData[num][index].channel == "self") {
                channel = ["自助直销"];
            }
            if (this.tableData[num][index].channel == "channel") {
                channel = ["渠道"];
            }
            if (this.tableData[num][index].channel == "self+channel") {
                channel = ["自助直销", "渠道"];
            }

            let units = "";
            if (this.tableData[num][index].units == "月") {
                units = "month";
            }
            if (this.tableData[num][index].units == "年") {
                units = "year";
            }
            this.addDiscountForm.concessionName = this.tableData[num][
                index
            ].concessionName;
            this.addDiscountForm.value = value;
            this.addDiscountForm.rechargeLimit = this.tableData[num][
                index
            ].rechargeLimit;
            this.addDiscountForm.donationQuota = this.tableData[num][
                index
            ].donationQuota;
            this.addDiscountForm.packageDeals = this.tableData[num][
                index
            ].packageDeals;
            this.addDiscountForm.availableTime = this.tableData[num][
                index
            ].availableTime;
            this.addDiscountForm.concessionTime = this.tableData[num][
                index
            ].concessionTime;
            this.addDiscountForm.checkList = channel;
            this.addDiscountForm.value2 = units;
            this.addDiscountForm.id = this.tableData[num][index].id;

            this.changeStyle();
        },

        handleUpdateDiscount() {
            if (
                ((this.addDiscountForm.value == 2) &
                (this.addDiscountForm.concessionName == "" ||
                this.addDiscountForm.packageDeals == "" ||
                this.addDiscountForm.availableTime == "" ||
                this.addDiscountForm.concessionTime == "" ||
                this.addDiscountForm.value == "" ||
                this.addDiscountForm.value2 == ""))
                ||
                ((this.addDiscountForm.value == 1||this.addDiscountForm.value == "")&
                (this.addDiscountForm.concessionName == "" ||
                this.addDiscountForm.rechargeLimit == "" ||
                this.addDiscountForm.donationQuota == "" ||
                this.addDiscountForm.value == "" ))
            ) {
                this.$message({
                    message: "存在空字段!",
                    type: "warning"
                });
            } else {
                let str = "";
            if (this.addDiscountForm.checkList.length == 2) {
                str = "self+channel";
            }
            if (
                this.addDiscountForm.checkList.length == 1 &&
                this.addDiscountForm.checkList[0] == "自助直销"
            ) {
                str = "self";
            }
            if (
                this.addDiscountForm.checkList.length == 1 &&
                this.addDiscountForm.checkList[0] == "渠道"
            ) {
                str = "channel";
            }
            this.$ajax
                .post("/vos/tariffPackage/updateConcessionScheme", {
                    concessionScheme: {
                        id: this.addDiscountForm.id,
                        concessionName: this.addDiscountForm.concessionName,
                        concessionWay: this.addDiscountForm.value,
                        rechargeLimit: this.addDiscountForm.rechargeLimit,
                        donationQuota: this.addDiscountForm.donationQuota,
                        packageDeals: this.addDiscountForm.packageDeals,
                        availableTime: this.addDiscountForm.availableTime,
                        concessionTime: this.addDiscountForm.concessionTime,
                        channel: str,
                        units: this.addDiscountForm.value2
                    }
                })
                .then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: "编辑成功!",
                            type: "success"
                        });
                        this.loadData();
                    }
                });
            }
            
            this.addDiscountFormDialogVisible = false;
        },

        //关闭确认
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleChange() {},

        // 改变新增优惠方案的dialog样式
        changeStyle() {
            if (
                this.addDiscountForm.value == "1" ||
                this.addDiscountForm.value == ""
            ) {
                this.addDiscountForm.style1 = "block";
                this.addDiscountForm.style2 = "none";
            }
            if (this.addDiscountForm.value == "2") {
                this.addDiscountForm.style1 = "none";
                this.addDiscountForm.style2 = "block";
            }
        },

        loadData() {
            this.$ajax
                .post("/vos/tariffPackage/getConcessionScheme", {
                    concessionScheme: {
                        channel: "self"
                    }
                })
                .then(res => {
                    if (res.code == 200) {
                        this.cTotalCount1 =
                            res.data.concessionSchemeList.length;
                        this.cTableData1 = res.data.concessionSchemeList;

                        for (var i = 0; i < this.cTotalCount1; i++) {
                            if (this.cTableData1[i].concessionWay == 1) {
                                this.cTableData1[i].concessionWay =
                                    "充值包满就送";
                            }
                            if (this.cTableData1[i].concessionWay == 2) {
                                this.cTableData1[i].concessionWay =
                                    "套餐价格优惠";
                            }
                            if (this.cTableData1[i].units == "month") {
                                this.cTableData1[i].units = "月";
                            }
                            if (this.cTableData1[i].units == "year") {
                                this.cTableData1[i].units = "年";
                            }
                        }
                    }
                });
            this.$ajax
                .post("/vos/tariffPackage/getConcessionScheme", {
                    concessionScheme: {
                        channel: "channel"
                    }
                })
                .then(res => {
                    if (res.code == 200) {
                        this.cTotalCount2 =
                            res.data.concessionSchemeList.length;
                        this.cTableData2 = res.data.concessionSchemeList;
                        for (var i = 0; i < this.cTotalCount2; i++) {
                            if (this.cTableData2[i].concessionWay == 1) {
                                this.cTableData2[i].concessionWay =
                                    "充值包满就送";
                            }
                            if (this.cTableData2[i].concessionWay == 2) {
                                this.cTableData2[i].concessionWay =
                                    "套餐价格优惠";
                            }
                            if (this.cTableData2[i].units == "month") {
                                this.cTableData2[i].units = "月";
                            }
                            if (this.cTableData2[i].units == "year") {
                                this.cTableData2[i].units = "年";
                            }
                        }
                    }
                });
        }
    },
    created() {
        this.loadData();
    }
};
</script>

<style lang="scss" scoped>
@import "../ComboSet.scss";
</style>
