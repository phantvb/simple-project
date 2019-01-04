<template>
    <div>
        <div>
            <el-button type="primary" style="float: left;" @click="showAddCombo">
                <i class="el-icon-plus">&nbsp;新增增值服务套餐</i>
            </el-button>
        </div>
        <div style="clear: both;"></div>
        <div style="margin-top: 15px;">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="自助直销" name="3">
                    <div>
                        <el-row>
                            <el-col :span="4" v-for="(o, index) in bTotalCount1" :key="o" :offset="1"
                                    style="margin-top: 10px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                    <div class="add-title">{{bTableData1[index].tariffName}}</div>
                                    <div class="add-body">
                                        <el-form label-width="100px">
                                            <el-form-item label="功能资费：" class="add-item">
                                                {{bTableData1[index].tariffFee}}{{bTableData1[index].units}}
                                            </el-form-item>
                                            <el-form-item label="是否赠送：" class="add-item">
                                                {{bTableData1[index].presents}}
                                            </el-form-item>
                                            <el-form-item label="功能备注：" class="add-item">
                                                <el-popover
                                                    placement="bottom"
                                                    width="200"
                                                    trigger="click"
                                                    :content=bTableData1[index].remarks>
                                                    <el-button slot="reference" type="text" class="button">查看详情
                                                    </el-button>
                                                </el-popover>
                                            </el-form-item>
                                            <div style="border-top: 1px solid #f5f5f5;">
                                                <div style="float: right;">
                                                    <el-button type="text" class="button"
                                                               @click="updateTariff(0,index)">编辑
                                                    </el-button>
                                                    <el-button type="text" class="button"
                                                               :style="'display:'+bTableData1[index].type+';'"
                                                               @click="deleteInfo(bTableData1[index].id,'delValueAdded')">
                                                        删除
                                                    </el-button>
                                                </div>
                                            </div>
                                        </el-form>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="渠道" name="4">
                    <div>
                        <el-row>
                            <el-col :span="4" v-for="(o, index) in bTotalCount2" :key="o" :offset="1"
                                    style="margin-top: 10px;">
                                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                                    <div class="add-title">{{bTableData2[index].tariffName}}</div>
                                    <div class="add-body">
                                        <el-form label-width="100px">
                                            <el-form-item label="功能资费：" class="add-item">
                                                {{bTableData2[index].tariffFee}}{{bTableData2[index].units}}
                                            </el-form-item>
                                            <el-form-item label="是否赠送：" class="add-item">
                                                {{bTableData2[index].presents}}
                                            </el-form-item>
                                            <el-form-item label="功能备注：" class="add-item">
                                                <el-popover
                                                    placement="bottom"
                                                    width="200"
                                                    trigger="click"
                                                    :content=bTableData2[index].remarks>
                                                    <el-button slot="reference" type="text" class="button">查看详情
                                                    </el-button>
                                                </el-popover>
                                            </el-form-item>
                                            <div style="border-top: 1px solid #f5f5f5;">
                                                <div style="float: right;">
                                                    <el-button type="text" class="button"
                                                               @click="updateTariff(1,index)">编辑
                                                    </el-button>
                                                    <el-button type="text" class="button"
                                                               :style="'display:'+bTableData2[index].type+';'"
                                                               @click="deleteInfo(bTableData2[index].id,'delValueAdded')">
                                                        删除
                                                    </el-button>
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

        <div class="addComboDialog">
            <el-dialog
                title="新增增值套餐"
                :visible.sync="addComboFromDialogVisible"
                width="30%"
                :before-close="handleClose">
                <div>
                    <el-form ref="addFeesForm" :model="AddComboForm" label-width="100px">
                        <el-form-item label="套餐名称：">
                            <el-input v-model="AddComboForm.name" size="mini" class="el-input"></el-input>
                        </el-form-item>

                        <el-form-item label="套餐资费：">
                            <el-input v-model="AddComboForm.fee" size="mini" class="el-input"></el-input>
                            <span class="span">元</span>
                        </el-form-item>

                        <el-form-item label="计价单位：">
                            <el-select v-model="AddComboForm.value" placeholder="请选择" style="float: left;width: 80%" size="mini">
                                <el-option
                                    v-for="item in AddComboForm.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="功能备注：">
                            <el-input type="textarea" :rows="5" v-model="AddComboForm.remark"
                                      class="el-input"></el-input>
                        </el-form-item>

                        <el-form-item label="是否赠送：">
                            <el-radio v-model="AddComboForm.radio" label="1" class="el-radio">赠送</el-radio>
                            <el-radio v-model="AddComboForm.radio" label="2">付费</el-radio>
                        </el-form-item>

                        <el-form-item label="是否可删除：">
                            <el-radio v-model="AddComboForm.type" label="1" class="el-radio">不可删除</el-radio>
                            <el-radio v-model="AddComboForm.type" label="2">可删除</el-radio>
                        </el-form-item>

                        <el-form-item label="渠道：">
                            <el-checkbox-group v-model="AddComboForm.checkList">
                                <el-checkbox label="自助直销" class="el-checkbox"
                                             :disabled="this.disabledSelf"></el-checkbox>
                                <el-checkbox label="渠道" :disabled="this.disabledChannel"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="addComboFromDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addCombo" size="mini" :style="'display:'+submitData+';'">确 定</el-button>
          <el-button type="primary" @click="updateCombo" size="mini" :style="'display:'+updateData+';'">编 辑</el-button>
      </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addComboFromDialogVisible: false,
                activeNames: ['3', '4'],
                buttonShow1: 'inline-block',
                buttonShow2: 'inline-block',
                AddComboForm: {
                    name: '',
                    fee: '',
                    remark: '',
                    radio: '1',
                    type: '1',
                    checkList: [],
                    id: '',
                    options: [{
                        value: 'perMonth',
                        label: '/月'
                    }, {
                        value: 'perOne',
                        label: ' /个'
                    }, {
                        value: 'perMonthOne',
                        label: ' /月/个'
                    }],
                    value: '',
                },
                bTotalCount1: '',
                bTotalCount2: '',
                bTableData1: [],
                bTableData2: [],

                tableData: [],

                updateData: 'none',// 编辑和新增公用一个弹窗控制按钮显示
                submitData: 'inline-block',

                disabledSelf: false,
                disabledChannel: false
            }
        },
        methods: {
            showAddCombo() {
                this.addComboFromDialogVisible = true;

                this.AddComboForm.name = '';
                this.AddComboForm.fee = '';
                this.AddComboForm.remark = '';
                this.AddComboForm.radio = '';
                this.AddComboForm.type = '';
                this.AddComboForm.id = '';
                this.AddComboForm.value = '';

                this.updateData = 'none';
                this.submitData = 'inline-block';

                this.disabledSelf = false;
                this.disabledChannel = false;
            },
            // 新增增值业务
            addCombo() {
                let str = '';
                if (this.AddComboForm.checkList.length == 2) {
                    str = "self+channel";
                }
                if (this.AddComboForm.checkList.length == 1 && this.AddComboForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.AddComboForm.checkList.length == 1 && this.AddComboForm.checkList[0] == "渠道") {
                    str = "channel";
                }
                this.$ajax.post('/vos/tariffPackage/addValueAdded', {
                    "valueAdded": {
                        "tariffName": this.AddComboForm.name,
                        "tariffFee": this.AddComboForm.fee,
                        "units": this.AddComboForm.value,
                        "remarks": this.AddComboForm.remark,
                        "presents": this.AddComboForm.radio,
                        "channel": str,
                        "type": this.AddComboForm.type
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message: '新增成功!',
                            type: 'success'
                        });
                        this.loadData();
                    }
                    if (res.code == 60000) {
                        this.$message({
                            message: '数据已存在!',
                            type: 'warning'
                        });
                    }
                });

                this.addComboFromDialogVisible = false;
            },

            updateTariff(num, index) {
                this.tableData = [this.bTableData1, this.bTableData2];

                this.addComboFromDialogVisible = true;

                this.AddComboForm.name = '';
                this.AddComboForm.fee = '';
                this.AddComboForm.value = '';
                this.AddComboForm.remark = '';
                this.AddComboForm.radio = '';
                this.AddComboForm.type = '';
                this.AddComboForm.checkList = '';
                this.AddComboForm.id = '';

                this.updateData = 'inline-block';
                this.submitData = 'none';

                this.disabledSelf = true;
                this.disabledChannel = true;

                let type = '';
                if (this.tableData[num][index].type == 'none') {
                    type = '1';
                }
                if (this.tableData[num][index].type == '2') {
                    type = '2';
                }

                let radio = '';
                if (this.tableData[num][index].presents == '赠送') {
                    radio = '1';
                } else {
                    radio = '2';
                }

                let channel = '';
                if (this.tableData[num][index].channel == 'self') {
                    channel = ['自助直销'];
                }
                if (this.tableData[num][index].channel == 'channel') {
                    channel = ['渠道'];
                }
                if (this.tableData[num][index].channel == 'self+channel') {
                    channel = ['自助直销', '渠道']
                }

                this.AddComboForm.name = this.tableData[num][index].tariffName;
                this.AddComboForm.fee = this.tableData[num][index].tariffFee;
                this.AddComboForm.value = this.tableData[num][index].units;
                this.AddComboForm.remark = this.tableData[num][index].remarks;
                this.AddComboForm.radio = radio;
                this.AddComboForm.type = type;
                this.AddComboForm.checkList = channel;
                this.AddComboForm.id = this.tableData[num][index].id;
            },

            updateCombo() {
                let str = '';
                if (this.AddComboForm.checkList.length == 2) {
                    str = "self+channel";
                }
                if (this.AddComboForm.checkList.length == 1 && this.AddComboForm.checkList[0] == "自助直销") {
                    str = "self";
                }
                if (this.AddComboForm.checkList.length == 1 && this.AddComboForm.checkList[0] == "渠道") {
                    str = "channel";
                }
                this.$ajax.post('/vos/tariffPackage/updateValueAdded', {
                    "valueAdded": {
                        "id": this.AddComboForm.id,
                        "tariffName": this.AddComboForm.name,
                        "tariffFee": this.AddComboForm.fee,
                        "units": this.AddComboForm.value,
                        "remarks": this.AddComboForm.remark,
                        "presents": this.AddComboForm.radio,
                        "channel": str,
                        "type": this.AddComboForm.type
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message: '编辑成功!',
                            type: 'success'
                        });
                        this.loadData();
                    }
                });
                this.addComboFromDialogVisible = false;
            },

            //删除信息
            deleteInfo(id, url) {
                this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$ajax.post('/vos/tariffPackage/' + url, {
                        "id": id
                    }).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            this.loadData();
                        }
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除!'
                    });
                });
            },

            //关闭确认
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            handleChange() {

            },

            loadData() {
                this.$ajax.post('/vos/tariffPackage/getValueAdded', {
                    "valueAdded": {
                        "channel": "self"
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.bTotalCount1 = res.data.valueAddedList.length;
                        this.bTableData1 = res.data.valueAddedList;
                        for (var i = 0; i < this.bTotalCount1; i++) {
                            if (this.bTableData1[i].presents == 1) {
                                this.bTableData1[i].presents = "赠送";
                            }
                            if (this.bTableData1[i].presents == 2) {
                                this.bTableData1[i].presents = "付费";
                            }
                            if (this.bTableData1[i].type == 1) {
                                this.bTableData1[i].type = 'none';
                            }
                            if(this.bTableData1[i].units=='perMonth'){
                                this.bTableData1[i].units='/月'
                            }
                            if(this.bTableData1[i].units=='perOne'){
                                this.bTableData1[i].units='/个'
                            }
                            if(this.bTableData1[i].units=='perMonthOne'){
                                this.bTableData1[i].units='/月/个'
                            }
                        }
                    }
                });
                this.$ajax.post('/vos/tariffPackage/getValueAdded', {
                    "valueAdded": {
                        "channel": "channel"
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.bTotalCount2 = res.data.valueAddedList.length;
                        this.bTableData2 = res.data.valueAddedList;
                        for (var i = 0; i < this.bTotalCount2; i++) {
                            if (this.bTableData2[i].presents == 1) {
                                this.bTableData2[i].presents = "赠送";
                            }
                            if (this.bTableData2[i].presents == 2) {
                                this.bTableData2[i].presents = "付费";
                            }
                            if (this.bTableData2[i].type == 1) {
                                this.bTableData2[i].type = 'none';
                            }
                            if(this.bTableData2[i].units=='perMonth'){
                                this.bTableData2[i].units='/月'
                            }
                            if(this.bTableData2[i].units=='perOne'){
                                this.bTableData2[i].units='/个'
                            }
                            if(this.bTableData2[i].units=='perMonthOne'){
                                this.bTableData2[i].units='/月/个'
                            }
                        }
                    }
                });
            }
        },
        created() {
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../ComboSet.scss";
</style>
