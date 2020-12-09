let CurveOption = {
    tooltip:{},
    legend:{
        data:['访客来源']
    },
    xAxis:{
        data:[],
        axisTick:{
            show:false,//不显示刻度线
        },
    },
    yAxis:{
        axisTick:{
            show:false,//不显示刻度线
        },
    },
    series:[{
        name:'数量',
        type:'line',
        smooth:true,
        areaStyle: {
            normal: {color: '#CECEFA'}
        },

        //itemStyle --折线拐点标志的样式
        itemStyle : {
            color: "#fff" 
        },
        //线条颜色
        lineStyle: {
            color:"#55CCFF"
        },
        itemStyle : { normal: {label : {show: true}}}, //数据图上线上显示数据
        data:[]
    }]
};
let PieOption = {
    series : [
        {
            name: '访问来源',
            type: 'pie',    // 设置图表类型为饼图
            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data:[          // 数据数组，name 为数据项名称，value 为数据项值
            ]
        }
    ]
}
let BarOption = {
    tooltip: {},//当鼠标落在柱状上显示数据
    xAxis: {
        data: []
    },
    yAxis: {
     name: "商品数"   
    },
    series: [
        {
            name: '商品数',
            type: 'bar',
            data: []
        }
    ]
}

//初始化echarts实例
let Curve = echarts.init(document.getElementById('curve'));
let Bar = echarts.init(document.getElementById('bar'));
let Pie = echarts.init(document.getElementById('pie'));



async function getMonth(){
    let data = await axios({
        url: "https://edu.telking.com/api/?type=month"
    })
    
    let series =data.data.data.series
    let xAxis = data.data.data.xAxis
    CurveOption.series[0].data = series
    CurveOption.xAxis.data = xAxis
    
    Curve.setOption(CurveOption);
    
    
}
async function getWeek(){
    let data = await axios({
        url: "https://edu.telking.com/api/?type=week"
    })
    let series = data.data.data.series
    let xAxis = data.data.data.xAxis
    BarOption.xAxis.data = xAxis
    BarOption.series[0].data = series

    let obj = [] 
    for(let i in xAxis ){
        obj.push({value:series[i], name:xAxis[i]})
    }
    PieOption.series[0].data = obj
    Bar.setOption(BarOption)
    Pie.setOption(PieOption)
}

getMonth()
getWeek()

