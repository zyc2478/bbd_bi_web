<style type="text/css">
    .test{
        margin: 20px 20px 20px 20px;     
    }
    .test Button{
        margin-bottom: 10px;
    }
</style>
<!--<template>
    <div class="test">
        <Button type="warning" @click="click()">test</Button>
        <Button type="warning" @click="click2()">测试</Button>
        <Input v-model="value" type="textarea" :rows="4" placeholder="Enter something..."></Input>
    </div>
</template>
<script>
/*    import Drilldown from '../node_modules/highcharts/modules/Drilldown.js'
    import Highcharts from 'highcharts'
    Drilldown(Highcharts);

    <vue-highcharts :highcharts="Highcharts" :options="drilldownOptions" ref="drilldownChart"></vue-highcharts>*/

    export default {
        data(){
            return {
                value: null
            }
        },
        methods: {
            click(){
                this.$store.dispatch('userLogin',{"user_name":"test1","user_password":"123","router":this.$router});
                this.$router.push({ path: 'base' }) ;
            },
            click2(){
                this.axios({
                    /*headers: {'Authorization': 'bearer '+this.$store.state.users.currentUser.UserToken},*/
                    method: 'post',
                    url: '/test',
                    data: {
                        "test": "123456"
                    }
                }).then(function(response){
                    /*console.log(response);*/
                    this.value = response.data;
                }.bind(this)).catch(function(error){
                    console.log(error);
                });
            }
        }   
    };
</script>-->
<template>
    <div>
        <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
        <button @click="load">load</button>
    </div>
</template>

<script>
    import VueHighcharts from 'vue2-highcharts';

    const asyncData = [{"bid_date":"2018-07-01","bid_count":19,"bid_total_amount":3249},
        {"bid_date":"2018-07-05","bid_count":25,"bid_total_amount":3875},
        {"bid_date":"2018-07-10","bid_count":38,"bid_total_amount":3205},
        {"bid_date":"2018-07-30","bid_count":180,"bid_total_amount":4280}]
    export default{
        components: {
            VueHighcharts
        },
        data(){
            return{
                options: {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: '30天投标数分析'
                    },
                    subtitle: {
                        text: 'Source: BidByDebt'
                    },
                    xAxis: {},
                    yAxis: [{
                        title: {
                            text: '投标数'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }],
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    },
                    {
                        title: {
                            text: '投标金额'
                        },
                        opposite: true,
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#FFF080',
                            id: 'amount_plot_line'
                        }],
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }
                    }],
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: []
                }
            }
        },
        methods: {
            load(){
                let lineCharts = this.$refs.lineCharts;
                lineCharts.delegateMethod('showLoading', 'Loading...');
                var serverData;
                var seriesCountData = [];
                var seriesAmountData = [];
                var categoriesData = [];
                var amount_max = 0;
                var count_max = 0;
                var base_url = "http://192.168.15.32:8089/bbd_ds/vwBidList/getVwBidList/30";

                setTimeout(() => {

                    this.axios({
/*                        method: 'get',
                        url: '/selectVwBidList',*/

                        url: '/getLatestBidSummary/diffDays',
                        params: {
                            'diffDays': 30
                        }
/*                        url: '/roles',
                        params: {x`
                            'page': 0,
                            'pageSize': 5
                        }*/
                    }).then(function (response) {
                        serverData = response.data.data;
                        console.log("serverData:" + serverData);

                        for (var i = 0; i < serverData.length; i++) {
                            console.log("asyncData[i]['bid_count']:" + serverData[i]['bid_count']);
                            console.log("asyncData[i]['bid_total_amount']:" + serverData[i]['bid_total_amount']);
                            seriesCountData.push(serverData[i]['bid_count']);
                            seriesAmountData.push(serverData[i]['bid_total_amount']);
                            categoriesData.push(serverData[i]['bid_date']);
                            if (serverData[i]['bid_count'] > count_max) {
                                count_max = serverData[i]['bid_count'];
                            }
                            if (serverData[i]['bid_total_amount'] > amount_max) {
                                amount_max = serverData[i]['bid_total_amount'];
                            }
                        }
                        console.log("seriesCountData:" + seriesCountData);
                        console.log("seriesAmountDate:" + seriesAmountData);
                        lineCharts.addSeries({name: '投标数', data: seriesCountData});
                        lineCharts.addSeries({name: '投标金额', data: seriesAmountData, yAxis: 1});
                        lineCharts.getChart().xAxis[0].setCategories(categoriesData);

                        lineCharts.hideLoading();
                        // this.total=response.data.totalCount;
                    }.bind(this)).catch(function (error) {
                        alert(error);
                    });
                },2000)


                    /*this.$http.get('http://localhost:8089/bbd_ds/vwBidList/getVwBidList/30')
                        .then(res => {
                            console.log(1)
                            console.log(res);
                            console.log('res.bodyText' + res.bodyText)
                            var resBody = res.bodyText
                            console.log(JSON.parse(resBody))
                            serverData = JSON.parse(resBody);
                            console.log("asyncData.length = " + serverData.length);
                            for (var i = 0; i < serverData.length; i++) {
                                console.log("asyncData[i]['bid_count']:" + serverData[i]['bid_count']);
                                console.log("asyncData[i]['bid_total_amount']:" + serverData[i]['bid_total_amount']);
                                seriesCountData.push(serverData[i]['bid_count']);
                                seriesAmountData.push(serverData[i]['bid_total_amount']);
                                categoriesData.push(serverData[i]['bid_date']);
                                if (serverData[i]['bid_count'] > count_max) {
                                    count_max = serverData[i]['bid_count'];
                                }
                                if (serverData[i]['bid_total_amount'] > amount_max) {
                                    amount_max = serverData[i]['bid_total_amount'];
                                }
                            }
                            console.log("seriesCountData:" + seriesCountData);
                            console.log("seriesAmountDate:" + seriesAmountData);
                            lineCharts.addSeries({name: '投标数', data: seriesCountData});
                            lineCharts.addSeries({name: '投标金额', data: seriesAmountData, yAxis: 1});
                            lineCharts.getChart().xAxis[0].setCategories(categoriesData);

                            lineCharts.hideLoading();

                        })
                        .catch(error=> {
                            console.log(error);
                        });
                }, 2000)*/
                    /*this.$http.get('http://localhost:8089/bbd_ds/vwBidList/getVwBidList/30')
                        .then(function(res) {
                            if (res.body.code === '200') {
                                let serverData = response.body.data;
                                console.log("asyncData.length = " + serverData.length);
                                for (var i = 0; i < serverData.length; i++) {
                                    console.log("asyncData[i]['bid_count']:" + serverData[i]['bid_count']);
                                    console.log("asyncData[i]['bid_total_amount']:" + serverData[i]['bid_total_amount']);
                                    seriesCountData.push(serverData[i]['bid_count']);
                                    seriesAmountData.push(serverData[i]['bid_total_amount']);
                                    categoriesData.push(serverData[i]['bid_date']);
                                    if (serverData[i]['bid_count'] > count_max) {
                                        count_max = serverData[i]['bid_count'];
                                    }
                                    if (serverData[i]['bid_total_amount'] > amount_max) {
                                        amount_max = serverData[i]['bid_total_amount'];
                                    }
                                }
                                console.log("seriesCountData:" + seriesCountData);
                                console.log("seriesAmountDate:" + seriesAmountData);
                                lineCharts.addSeries({name: '投标数', data: seriesCountData});
                                lineCharts.addSeries({name: '投标金额', data: seriesAmountData, yAxis: 1});
                                lineCharts.getChart().xAxis[0].setCategories(categoriesData);

                                lineCharts.hideLoading();
                            }
                        });
                }, 2000)*/
                    /*console.log("asyncData.length = " + asyncData.length);
                    for(var i = 0;i < asyncData.length; i++) {
                        console.log("asyncData[i]['bid_count']:" + asyncData[i]['bid_count']);
                        console.log("asyncData[i]['bid_total_amount']:" + asyncData[i]['bid_total_amount']);
                        seriesCountData.push(asyncData[i]['bid_count']);
                        seriesAmountData.push(asyncData[i]['bid_total_amount']);
                        categoriesData.push(asyncData[i]['bid_date']);
                        if(asyncData[i]['bid_count'] > count_max){
                            count_max = asyncData[i]['bid_count'];
                        }
                        if(asyncData[i]['bid_total_amount'] > amount_max){
                            amount_max = asyncData[i]['bid_total_amount'];
                        }
                    }
                    console.log("seriesCountData:" + seriesCountData);
                    console.log("seriesAmountDate:" + seriesAmountData);
                    lineCharts.addSeries({name:'投标数',data:seriesCountData});
                    lineCharts.addSeries({name:'投标金额',data:seriesAmountData,yAxis:1});
                    lineCharts.getChart().xAxis[0].setCategories(categoriesData);

                    lineCharts.hideLoading();
                }, 2000)*/
            }
        }
    }
</script>