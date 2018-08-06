<style type="text/css">
    .test{
        margin: 20px 20px 20px 20px;     
    }
    .test Button{
        margin-bottom: 10px;
    }
</style>
<template>
    <div class="test">
        <Button type="warning" @click="click()">test</Button>
        <Button type="warning" @click="click2()">测试</Button>
        <Input v-model="value" type="textarea" :rows="4" placeholder="Enter something..."></Input>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                value: null
            }
        },
        methods: {
            click(){
                this.$store.dispatch('userLogin',{"user_name":"test1","user_password":"123","router":this.$router});
                this.$router.push({ path: 'base' })

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
</script>

<!--<template>
    <div>
        <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
        <button @click="load">load</button>
    </div>
</template>

<script>
    import VueHighcharts from 'vue2-highcharts'
    const asyncData = {
        name: 'Tokyo',
        marker: {
            symbol: 'square'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
            y: 26.5,
            marker: {
                symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
            }
        }, 23.3, 18.3, 13.9, 9.6]
    }
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
                        text: 'Monthly Average Temperature'
                    },
                    subtitle: {
                        text: 'Source: WorldClimate.com'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature'
                        },
                        labels: {
                            formatter: function () {
                                return this.value + '°';
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: []
                }
            }
        },
        methods: {
            load(){
                let lineCharts = this.$refs.lineCharts;
                lineCharts.delegateMethod('showLoading', 'Loading...');
                setTimeout(() => {
                    lineCharts.addSeries(asyncData);
                    lineCharts.hideLoading();
                }, 2000)
            }
        }
    }
</script>-->

