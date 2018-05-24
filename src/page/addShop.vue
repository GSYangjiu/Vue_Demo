<template>
    <div>
        <head-top></head-top>

        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-autocomplete
                            v-model="formData.address"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入地址"
                            style="width:100%"
                            @select="addressSelect">
                        </el-autocomplete>
                        <span>当前城市：{{city}}</span>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.number="formData.phone" maxLength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺简介" prop="description">
                        <el-input v-model="formData.description"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺标语" prop="promotionInfo">
                        <el-input v-model="formData.promotionInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类">
                        <el-cascader
                            :options="categoryOptions"
                            v-model="selectedCategory"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="店铺特点" style="white-space: nowrap;">
                        <span>品牌保证</span>
                        <el-switch on-text="" off-text="" v-model="formData.premium"></el-switch>
                        <span>蜂鸟专送</span>
                        <el-switch on-text="" off-text="" v-model="formData.deliveryMode"></el-switch>
                        <span>新开店铺</span>
                        <el-switch on-text="" off-text="" v-model="formData.news"></el-switch>
                    </el-form-item>
                    <el-form-item style="white-space: nowrap;">
                        <span>外卖保</span>
                        <el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
                        <span>准时达</span>
                        <el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
                        <span>开发票</span>
                        <el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
                    </el-form-item>
                    <el-form-item label="配送费" prop="floatDeliveryFee">
                        <el-input-number v-model="formData.floatDeliveryFee" :min="0" :max="20"></el-input-number>
                    </el-form-item>
                    <el-form-item label="起送价" prop="floatMinimumOrderAmount">
                        <el-input-number v-model="formData.floatMinimumOrderAmount" :min="0" :max="100">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item label="营业时间" style="white-space: nowrap;">
                        <el-time-select
                            placeholder="起始时间"
                            v-model="formData.startTime"
                            :picker-options="{
                            start:'05:30',
                            step:'00:15',
                            end:'23:30'
                            }">
                        </el-time-select>
                        <el-time-select
                            placeholder="结束时间"
                            v-model="formData.endTime"
                            :picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
                        </el-time-select>

                    </el-form-item>
                    <el-form-item label="上传店铺头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/common/addImg/shop'"
                            :show-file-list="false"
                            :on-success="handleShopAvatarScucess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="formData.imagePath" :src="baseImgPath + formData.imagePath" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传营业执照">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/common/addImg/shop'"
                            :show-file-list="false"
                            :on-success="handleBusinessAvatarScucess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="formData.businessLicenseImage"
                                 :src="baseImgPath + formData.businessLicenseImage" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传餐饮服务许可证">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/common/addImg/shop'"
                            :show-file-list="false"
                            :on-success="handleServiceAvatarScucess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="formData.cateringServiceLicenseImage"
                                 :src="baseImgPath + formData.cateringServiceLicenseImage" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="优惠活动">
                        <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-table
                        :data="activities"
                        style="min-width: 600px;margin-bottom: 20px;"
                        align="cneter"
                        :row-class-name="tableRowClassName">
                        <el-table-column
                            prop="iconName"
                            label="活动标题"
                            align="cneter"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="活动名称"
                            align="cneter"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            align="cneter"
                            label="活动详情">
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
        name: "addShop",
        components: {
            headTop
        },
        data() {
            return {
                city: {},
                formData: {
                    name: '', //店铺名称
                    address: '', //地址
                    latitude: '',
                    longitude: '',
                    description: '', //介绍
                    phone: '',
                    promotionInfo: '',
                    floatDeliveryFee: 5, //运费
                    floatMinimumOrderAmount: 20, //起价
                    premium: true,
                    deliveryMode: true,
                    news: true,
                    bao: true,
                    zhun: true,
                    piao: true,
                    startTime: '',
                    endTime: '',
                    imagePath: '',
                    businessLicenseImage: '',
                    cateringServiceLicenseImage: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入店铺名称', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入详细地址', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入联系电话'},
                        {type: 'number', message: '电话号码必须是数字'}
                    ],
                },
                options: [{
                    value: '满减优惠',
                    label: '满减优惠'
                }, {
                    value: '优惠大酬宾',
                    label: '优惠大酬宾'
                }, {
                    value: '新用户立减',
                    label: '新用户立减'
                }, {
                    value: '进店领券',
                    label: '进店领券'
                }],
                activityValue: '满减优惠',
                activities: [{
                    iconName: '减',
                    name: '满减优惠',
                    description: '满30减5，满60减8',
                }],
                baseUrl,
                baseImgPath,
                categoryOptions: [],
                selectedCategory: ['快餐便当', '简餐']
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const res = await cityGuess();
                    if (res.status == 10000) {
                        this.city = res.info
                    } else {
                        console.log('获取城市信息失败', err);
                    }
                    const categories = await foodCategory();
                    categories.forEach(item => {
                        if (item.child.length) {
                            const addnew = {
                                value: item.categories.name,
                                label: item.categories.name,
                                children: []
                            }
                            item.child.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                } catch (err) {
                    console.log('获取商铺种类失败', err);
                }
            },

            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try {
                        const cityList = await searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            },

            addressSelect(address) {
                this.formData.latitude = address.latitude;
                this.formData.longitude = address.longitude;
                console.log(this.formData.latitude, this.formData.longitude)
            },

            handleShopAvatarScucess(res, file) {
                if (res.status == 10000) {
                    this.formData.imagePath = res.info;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },
            handleBusinessAvatarScucess(res, file) {
                if (res.status == 10000) {
                    this.formData.businessLicenseImage = res.info;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 10000) {
                    this.formData.cateringServiceLicenseImage = res.info;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },

            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            selectActivity() {
                this.$prompt('请输入活动详情', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    if (value == null) {
                        this.$message({
                            type: 'info',
                            message: '请输入活动详情'
                        });
                        return
                    }
                    let newObj = {};
                    switch (this.activityValue) {
                        case '满减优惠':
                            newObj = {
                                iconName: '减',
                                name: '满减优惠',
                                description: value,
                            }
                            break;
                        case '优惠大酬宾':
                            newObj = {
                                iconName: '特',
                                name: '优惠大酬宾',
                                description: value,
                            }
                            break;
                        case '新用户立减':
                            newObj = {
                                iconName: '新',
                                name: '新用户立减',
                                description: value,
                            }
                            break;
                        case '进店领券':
                            newObj = {
                                iconName: '领',
                                name: '进店领券',
                                description: value,
                            }
                            break;
                    }
                    this.activities.push(newObj);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            handleDelete(index) {
                this.activities.splice(index, 1)
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        Object.assign(this.formData, {activities: this.activities}, {
                            category: this.selectedCategory.join('/')
                        })
                        try {
                            let result = await addShop(this.formData);
                            if (result.status == 10000) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.formData = {
                                    name: '', //店铺名称
                                    address: '', //地址
                                    latitude: '',
                                    longitude: '',
                                    description: '', //介绍
                                    phone: '',
                                    promotionInfo: '',
                                    floatDeliveryFee: 5, //运费
                                    floatMinimumOrderAmount: 20, //起价
                                    premium: true,
                                    deliveryMode: true,
                                    news: true,
                                    bao: true,
                                    zhun: true,
                                    piao: true,
                                    startTime: '',
                                    endTime: '',
                                    imagePath: '',
                                    businessLicenseImage: '',
                                    cateringServiceLicenseImage: '',
                                };
                                this.selectedCategory = ['快餐便当', '简餐'];
                                this.activities = [{
                                    iconName: '减',
                                    name: '满减优惠',
                                    description: '满30减5，满60减8',
                                }];
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: result.error
                                });
                            }
                            console.log(result)
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .button_submit {
        text-align: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>

