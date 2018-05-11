<template>
    <div class="visitorpie">
        <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';

    export default {
        data() {
            return {
                tableData: [{
                    count: 20,
                    name: '武汉'
                }, {
                    count: 10,
                    name: '深圳'
                }, {
                    count: 5,
                    name: '上海'
                }, {
                    count: 4,
                    name: '南京'
                }, {
                    count: 10,
                    name: '其他'
                }]
            }
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById('visitorpie'));
            this.initData();
        },
        props: ['pieData'],
        methods: {
            initData() {
                const tableDataTemp = this.pieData;
                tableDataTemp.forEach(item => {
                    const tableItem = {
                        value: item.count,
                        name: item.city,
                    };
                    this.tableData.push(tableItem)
                });
                const option = {
                    title: {
                        text: '用户分布',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['北京', '上海', '深圳', '杭州', '其他']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.tableData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        watch: {
            pieData: function () {
                this.initData()
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .visitorpie {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
