<template>
  <div id="ComboSet">
    <header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
        <el-breadcrumb-item>资费及增值套餐管理</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <div style="position: relative;margin-top: 20px">
      <el-tabs v-model="active" type="card">
        <el-tab-pane label="资费套餐" name="1">
          <div>
            <el-button type="primary" style="float: left;" @click="showAddFees"><i class="el-icon-plus">&nbsp;新增资费套餐</i>
            </el-button>
          </div>
          <div style="clear: both;"></div>
          <div style="margin-top: 15px;">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="自助直销" name="1">
                <div>
                  <el-row>
                    <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="1">
                      <el-card :body-style="{ padding: '0px'}" shadow="hover">
                        <div class="add-title">{{addFeesForm.name}}1111</div>
                        <div class="add-body">
                          <el-form label-width="100px">
                            <el-form-item label="类型：" class="add-item">{{addFeesForm.radio}}</el-form-item>
                            <el-form-item label="套餐规则：" class="add-item">{{addFeesForm.rule}}</el-form-item>
                            <el-form-item label="基本功能费：" class="add-item">{{addFeesForm.fee}}</el-form-item>
                            <el-form-item label="保底消费：" class="add-item">100</el-form-item>
                            <el-form-item label="赠送时长：" class="add-item">{{addFeesForm.duration}}</el-form-item>
                            <el-form-item label="超出资费：" class="add-item">{{addFeesForm.exceeding}}</el-form-item>
                            <el-form-item label="套餐内容：" class="add-item">
                              <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click"
                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                <el-button slot="reference" type="text" class="button">查看详情</el-button>
                              </el-popover>
                            </el-form-item>
                            <div style="border-top: 1px solid #f5f5f5;">
                              <div style="float: right;">
                                <el-button type="text" class="button">编辑</el-button>
                                <el-button type="text" class="button">删除</el-button>
                              </div>
                            </div>

                          </el-form>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <el-collapse-item title="渠道" name="2">
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="增值业务" name="2">
          <div>
            <el-button type="primary" style="float: left;" @click="showAddCombo"><i
              class="el-icon-plus">&nbsp;新增增值服务套餐</i></el-button>
          </div>
          <div style="clear: both;"></div>
          <div style="margin-top: 15px;">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="自助直销" name="3">
                <div>
                  <el-row>
                    <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="1">
                      <el-card :body-style="{ padding: '0px'}" shadow="hover">
                        <div class="add-title">{{AddComboForm.name}}</div>
                        <div class="add-body">
                          <el-form label-width="100px">
                            <el-form-item label="功能资费：" class="add-item">{{AddComboForm.fee}}</el-form-item>
                            <el-form-item label="是否赠送：" class="add-item">{{AddComboForm.radio}}</el-form-item>
                            <el-form-item label="功能备注：" class="add-item">
                              <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click"
                                content="">
                                <el-button slot="reference" type="text" class="button">查看详情</el-button>
                              </el-popover>
                            </el-form-item>
                            <div style="border-top: 1px solid #f5f5f5;">
                              <div style="float: right;">
                                <el-button type="text" class="button">编辑</el-button>
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
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="优惠方案" name="3">
          <div>
            <el-button type="primary" style="float: left;" @click="showAddDiscount"><i
              class="el-icon-plus">&nbsp;新增优惠方案</i></el-button>
          </div>
          <div style="clear: both;"></div>
          <div style="margin-top: 15px;">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="自助直销" name="5">
                <div>
                  <el-row>
                    <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="1">
                      <el-card :body-style="{ padding: '0px'}" shadow="hover">
                        <div class="add-title">{{addDiscountForm.name}}</div>
                        <div class="add-body">
                          <el-form label-width="100px">
                            <el-form-item label="优惠方式：" class="add-item">满送</el-form-item>
                            <el-form-item label="充值额度：" class="add-item">{{addDiscountForm.rechargeFee}}</el-form-item>
                            <el-form-item label="赠送额度：" class="add-item">{{addDiscountForm.giveFee}}</el-form-item>
                            <div style="border-top: 1px solid #f5f5f5;">
                              <div style="float: right;">
                                <el-button type="text" class="button">编辑</el-button>
                                <el-button type="text" class="button">删除</el-button>
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
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="时长包" name="4">
          <div>
            <el-button type="primary" style="float: left;" @click="showAddTimePacket"><i class="el-icon-plus">&nbsp;新增时长包方案</i>
            </el-button>
          </div>
          <div style="clear: both;"></div>
          <div style="margin-top: 15px;">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="自助直销" name="7">
                <div>
                  <el-row>
                    <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="1">
                      <el-card :body-style="{ padding: '0px'}" shadow="hover">
                        <div class="add-title">{{addTimePacketForm.rechargeFee}}元{{addTimePacketForm.time}}分钟</div>
                        <div class="add-body">
                          <el-form label-width="100px">
                            <el-form-item label="充值额度：" class="add-item">{{addTimePacketForm.rechargeFee}}元</el-form-item>
                            <el-form-item label="拨打时长：" class="add-item">{{addTimePacketForm.time}}分钟</el-form-item>
                            <div style="border-top: 1px solid #f5f5f5;">
                              <div style="float: right;">
                                <el-button type="text" class="button">编辑</el-button>
                                <el-button type="text" class="button">删除</el-button>
                              </div>
                            </div>
                          </el-form>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <el-collapse-item title="渠道" name="8">
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="addFeesDialog">
      <el-dialog
        title="新增资费套餐"
        :visible.sync="addFeesFromDialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-form ref="addFeesForm" :model="addFeesForm" label-width="100px">
            <el-form-item label="套餐名称：">
              <el-input v-model="addFeesForm.name" size="mini" class="el-input"></el-input>
            </el-form-item>
            <el-form-item label="类型：">
              <el-radio v-model="addFeesForm.radio" label="1" class="el-radio">按月计费</el-radio>
              <el-radio v-model="addFeesForm.radio" label="2">按年计费</el-radio>
            </el-form-item>

            <el-form-item label="套餐规则：">
              <el-input v-model="addFeesForm.rule" size="mini" class="el-input"></el-input>
            </el-form-item>

            <el-form-item label="基本功能费：">
              <el-input v-model="addFeesForm.fee" size="mini" class="el-input"></el-input>
              <span class="span">元</span>
            </el-form-item>

            <el-form-item label="单位：">
              <el-input v-model="addFeesForm.unit" size="mini" class="el-input"></el-input>
              <span class="span">月</span>
            </el-form-item>

            <el-form-item label="赠送时长：">
              <el-input v-model="addFeesForm.duration" size="mini" class="el-input"></el-input>
              <span class="span">分钟</span>
            </el-form-item>

            <el-form-item label="超出资费：">
              <el-input v-model="addFeesForm.exceeding" size="mini" class="el-input"></el-input>
              <span class="span">元/分钟</span>
            </el-form-item>

            <el-form-item label="套餐内容：">
              <el-input type="textarea" :rows="5" v-model="addFeesForm.content" class="el-input"></el-input>
            </el-form-item>

            <el-form-item label="渠道：">
              <el-checkbox-group v-model="addFeesForm.checkList">
                <el-checkbox label="自助直销" class="el-checkbox"></el-checkbox>
                <el-checkbox label="渠道"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addFeesFromDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addFeesFromDialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
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
              <el-input v-model="AddComboForm.unit" size="mini" class="el-input"></el-input>
            </el-form-item>

            <el-form-item label="功能备注：">
              <el-input type="textarea" :rows="5" v-model="AddComboForm.content" class="el-input"></el-input>
            </el-form-item>

            <el-form-item label="是否赠送：">
              <el-radio v-model="AddComboForm.radio" label="1" class="el-radio">赠送</el-radio>
              <el-radio v-model="AddComboForm.radio" label="2">付费</el-radio>
            </el-form-item>

            <el-form-item label="渠道：">
              <el-checkbox-group v-model="AddComboForm.checkList">
                <el-checkbox label="自助直销" class="el-checkbox"></el-checkbox>
                <el-checkbox label="渠道"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="addComboFromDialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addComboFromDialogVisible = false" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <div class="addDiscountDialog">
      <el-dialog
        title="新增优惠方案"
        :visible.sync="addDiscountFormDialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-form ref="addDiscountForm" :model="addDiscountForm" label-width="100px">
            <el-form-item label="优惠方案：">
              <el-select v-model="addDiscountForm.value" placeholder="请选择" style="float: left;width: 80%">
                <el-option
                  v-for="item in addDiscountForm.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="充值额度：">
              <el-input v-model="addDiscountForm.rechargeFee" size="mini" class="el-input"></el-input>
              <span class="span">元</span>
            </el-form-item>

            <el-form-item label="赠送额度：">
              <el-input v-model="addDiscountForm.giveFee" size="mini" class="el-input"></el-input>
              <span class="span">元</span>
            </el-form-item>

            <el-form-item label="渠道：">
              <el-checkbox-group v-model="addDiscountForm.checkList">
                <el-checkbox label="自助直销" class="el-checkbox"></el-checkbox>
                <el-checkbox label="渠道"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="addDiscountFormDialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addDiscountFormDialogVisible = false" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <div class="addTimePacketDialog">
      <el-dialog
        title="新增时长包方案"
        :visible.sync="addTimePacketFormDialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-form ref="addDiscountForm" :model="addTimePacketForm" label-width="100px">

            <el-form-item label="充值额度：">
              <el-input v-model="addTimePacketForm.rechargeFee" size="mini" class="el-input"></el-input>
              <span class="span">元</span>
            </el-form-item>

            <el-form-item label="拨打时长：">
              <el-input v-model="addTimePacketForm.time" size="mini" class="el-input"></el-input>
              <span class="span">分钟</span>
            </el-form-item>

            <el-form-item label="渠道：">
              <el-checkbox-group v-model="addTimePacketForm.checkList">
                <el-checkbox label="自助直销" class="el-checkbox"></el-checkbox>
                <el-checkbox label="渠道"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="addTimePacketFormDialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addTimePacketFormDialogVisible = false" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "./ComboSet.scss";
</style>
<script>
  export default {
    data() {
      return {
        addFeesFromDialogVisible: false,
        addComboFromDialogVisible: false,
        addDiscountFormDialogVisible: false,
        addTimePacketFormDialogVisible: false,
        active: '1',
        activeNames: ['1'],
        addFeesForm: {
          name: '',
          radio: '1',
          rule: '',
          fee: '',
          unit: '',
          duration: '',
          exceeding: '',
          content: '',
          checkList: ['自助直销', '渠道']
        },
        AddComboForm: {
          name: '',
          fee: '',
          unit: '',
          content: '',
          radio: '1',
          checkList: ['自助直销', '渠道']
        },
        addDiscountForm: {
          rechargeFee: '',
          giveFee: '',
          options: [{
            value: '1',
            label: '满送'
          }],
          value: '',
          checkList: ['自助直销', '渠道']
        },
        addTimePacketForm: {
          rechargeFee: '100',
          time: '100',
          checkList: ['自助直销', '渠道']
        }
      }
    },
    methods: {
      showAddFees() {
        this.addFeesFromDialogVisible = true;
      },
      showAddDiscount() {
        this.addDiscountFormDialogVisible = true;
      },
      showAddTimePacket() {
        this.addTimePacketFormDialogVisible = true;
      },
      showAddCombo() {
        this.addComboFromDialogVisible = true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleChange() {

      }
    }
  }
</script>
