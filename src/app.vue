
<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>
<!--
<script>
    export default {
        name: 'app',
        data () {
            return {
                myData:[],
                v1:""
            }
        },
        methods:{
            show:function(){
                this.$http.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                    {//请求参数
                        params: {
                            wd:this.v1
                        },
                        jsonp:'cb'
                    }).then(function(res){
                    console.log(JSON.parse(res.bodyText).s)
                    this.myData = JSON.parse(res.bodyText).s
                    console.log(this.myData)
                },function(){
                    //console.log(1)
                });
            }
        }
    }
</script>-->
