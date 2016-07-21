/**
 * Created by allen on 2016/7/12.
 */

$(document).ready(function () {

    //判断浏览器是否支持SVG
    if (SVG.supported === false) {
        alert('SVG not supported');
        return;
    }
    //初始化参数
    var params = {};
    var draw = SVG('drawing').spof();//spof 像素偏移修正


    $(window).resize(function () {

        initParams();


    });

    /**
     * 初始化全局参数
     */
    function initParams() {
        //初始化参数信息
        params = {
            w: window.innerWidth,
            h: window.innerHeight,
            cx: this.w / 2,
            cy: this.h / 2,
            r:function(){
                if(this.w>this.h){
                    return this.h/15;
                }else{
                    return this.w/15;
                }
            }
        };
        draw = draw.size(params.w, params.h);

        //绘制场景图
    }

    //初始化调用
    initParams();

    var width = window.innerWidth;
    var height = window.innerHeight;


    //var nested = draw.nested();
    //
    //var group = draw.group();
    //
    //var rect = nested.rect(200,800);
    //屏蔽元素的方法
    var ellipse = draw.ellipse(0, 0).move(10, 10).fill({color: '#fff'});


    var r = params.r();//半径 可控变量

    console.log(r);

    var diameter = r;    //直径

    var scale = 0.8;//人头像相对中心圆的缩放比例

    var cradius = diameter / 2 * scale;//头像的半径

    // console.log(cradius);

    var centerCircle = {diameter: r * 2, color: "#ED7D31"};//中心圆属性

    var firstCircle = {diameter: r * 2 * 3, color: "#D2D2D2"};//第一个内圆属性

    var secondCircle = {diameter: r * 2 * 4, color: "#E2E2E2"};//第二个内圆属性

    var thirdCircle = {diameter: r * 2 * 5, color: "#F1F1F1"};//外圆属性


    var lineColor = "#ED7D31";

    var borderColor = "#D8D8D8";


    //圆心坐标
    /* var centerid = {
     x: r * 6,
     y: r * 6
     };*/

    var centerid = {
        x: width / 2,
        y: height / 2
    };


    /**
     * 绘制圆形布局
     */
    function drawLayout(text) {

        var sx = centerid.x + Math.cos(315 / 180 * Math.PI) * r;
        var sy = centerid.y + Math.sin(315 / 180 * Math.PI) * r;

        var x = centerid.x + Math.cos(315 / 180 * Math.PI) * r * 7;
        var y = centerid.y + Math.sin(315 / 180 * Math.PI) * r * 7;

        var lineBegin = draw.line(sx, sy, x, y).stroke({width: 2, color: lineColor});
        var lineEnd = draw.line(x - 1, y, x + r * 2, y).stroke({width: 2, color: lineColor});

        var cir1 = drawLegend("专家", firstCircle.color);
        var cir2 = drawLegend("研究", secondCircle.color);
        var cir3 = drawLegend("涉及", thirdCircle.color);

        //外圆3
        draw.circle(thirdCircle.diameter).center(centerid.x, centerid.y)
            .fill(thirdCircle.color).stroke({width: 2, color: borderColor})
            .mouseover(function () {

                lineBegin.show();
                lineEnd.show();
                cir3.show();
                cir2.hide();
                cir1.hide();

            })
            .mouseout(function () {
                // lineBegin.hide();
                // lineEnd.hide();
                // cir3.hide();

            });//事件在此处继续添加

        //外圆2
        draw.circle(secondCircle.diameter).center(centerid.x, centerid.y)
            .fill(secondCircle.color)
            .mouseover(function () {
                lineBegin.show();
                lineEnd.show();
                cir2.show();
                cir3.hide();
                cir1.hide();
            })
            .mouseout(function () {
                // lineBegin.hide();
                // lineEnd.hide();
            });//事件在此处继续添加

        //外圆1
        draw.circle(firstCircle.diameter).center(centerid.x, centerid.y)
            .fill(firstCircle.color)
            .mouseover(function () {

                lineBegin.show();
                lineEnd.show();
                cir1.show();
                cir2.hide();
                cir3.hide();

            })
            .mouseout(function () {
                // lineBegin.hide();
                // lineEnd.hide();

            });//事件在此处继续添加

        //中心圆
        draw.circle(centerCircle.diameter).center(centerid.x, centerid.y)
            .fill(firstCircle.color)
            .stroke({width: 4, color: centerCircle.color});//事件在此处继续添加

        draw.text(text).center(centerid.x, centerid.y).stroke("#f05");


    }


    /**
     * 绘制图例
     */
    function drawLegend(txt, color) {

        var width = r;
        var height = r / 2;

        var cx = centerid.x + r * 7;
        var cy = r;

        return {
            brect: draw.rect(width, height).center(cx, cy)
                .stroke({width: 4, color: lineColor}).hide(),
            rect: draw.rect(width, height).center(cx, cy)
                .fill(color).hide(),
            txt: draw.text(txt).center(cx, cy)
                .stroke("#0067AA").hide(),
            show: function () {
                this.brect.show();
                this.rect.show();
                this.txt.show();
            },
            hide: function () {
                this.brect.hide();
                this.rect.hide();
                this.txt.hide();
            }
        };
    }


    /**
     * 绘制雷达效果
     */
    function drawRadar() {

        for (var i = 0; i < 360; i++) {


        }
        // draw.circle(firstCircle.diameter).

    }


    function createCircle() {

        return {
            x: centerid.x,
            y: centerid.y,
            radius: cradius,
            image: '',
            text: '',
            line: '',
            drawInstance: function () {
                var diameter = this.radius * 2;
                var c1 = draw.circle(diameter).center(centerid.x, centerid.y);
                c1.fill({color: "#0067AA"})
                    .animate(500).center(this.x, this.y);

                var cir = draw.circle(diameter - 4).center(centerid.x, centerid.y);
                if (this.image) {

                    cir.fill(draw.image(this.image, diameter, diameter))
                        .animate(500).center(this.x, this.y);

                    // .mousemove(function (e) {
                    //     if (e.which === 1) {
                    //         c1.center(e.layerX, e.layerY);
                    //         cir.center(e.layerX, e.layerY);
                    //     }
                    // });
                } else {
                    cir.fill({color: "#0067AA"});
                    draw.text(this.text).center(this.x, this.y)
                        .font({
                            family: 'Helvetica'
                            , size: 16
                            , leading: '1.5em'
                        }).fill({color: "#fff"});
                }
                return {bg: c1, img: cir};
            },

            drawLinkLine: function (tox, toy) {

                this.line = draw.line(this.x, this.y, tox, toy).stroke({width: 1, color: "#f06"});
                this.line.hide();
                return this.line;
            },

            Init: function () {

                var cirs = this.drawInstance();
                var cir_bg = cirs.bg;
                var cir_img = cirs.img;
                var diameter = this.radius * 2;
                var img_src = this.image;


                //连线 右侧 人员到 中心边界 到 详细信息矩形
                var rsx = this.x + Math.cos(0 / 180 * Math.PI) * (r / 2);
                var rsy = this.y + Math.sin(0 / 180 * Math.PI) * (r / 2);

                var rx = centerid.x + Math.cos(0 / 180 * Math.PI) * r * 5;
                var ry = centerid.y + Math.sin(0 / 180 * Math.PI) * r * 5;

                var lineRightBegin = draw.line(rsx - 8, rsy, rx, ry).stroke({width: 2, color: lineColor}).hide();
                var lineRightEnd = draw.line(rx - 1, ry, rx + r * 2, ry).stroke({width: 2, color: lineColor}).hide();

                //连线 左侧侧 人员到 中心边界 到 详细信息矩形
                var lsx = this.x + Math.cos(0 / 180 * Math.PI) * (r / 2);
                var lsy = this.y + Math.sin(0 / 180 * Math.PI) * (r / 2);

                var lx = centerid.x - Math.cos(0 / 180 * Math.PI) * r * 5;
                var ly = centerid.y + Math.sin(0 / 180 * Math.PI) * r * 5;


                var lineLeftBegin = draw.line(lsx - r + 8, lsy, lx, ly).stroke({width: 2, color: lineColor}).hide();
                var lineLeftEnd = draw.line(lx - r * 2, ly, lx, ly).stroke({width: 2, color: lineColor}).hide();


                console.log(r);
                var r_detail_rect = draw.rect(r * 4, r * 10).center(rx + r * 2.5, centerid.y).stroke(lineColor).fill("#fff").hide();
                var l_detail_rect = draw.rect(r * 4, r * 10).center(rx + r * 2.5, centerid.y).stroke(lineColor).fill("#fff").hide();

                cir_img.on("click", function (e) {

                    if (e.target.cx.animVal.value > centerid.x) {
                        lineRightBegin.show();
                        lineRightEnd.show();
                        r_detail_rect.show();
                    } else {
                        lineLeftBegin.show();
                        lineLeftEnd.show();
                        l_detail_rect.show();
                    }
                    cir_bg.fill({color: lineColor});
                });

                cir_img.on("mouseout", function (e) {

                    cir_bg.fill({color: "#0067AA"});
                    cir_img.fill(draw.image(img_src, diameter, diameter));
                    //lineRightBegin.hide();
                    //lineRightEnd.hide();
                    //lineLeftBegin.hide();
                    //lineLeftEnd.hide();

                    //detail_rect.hide();

                });

                draw.click(function (e) {
                    var r = e.target.getAttribute("r");
                    console.log(cradius + " " + r);
                    if (r !== cradius - 2 + "" || r === null) {
                        //alert("click body");

                    }

                });


            }
        };

    }


    /**
     * 绘制人员分布
     */

    function drawPeople() {


        $.getJSON('data.json', function (json) {


            //获取最大亲密值

            var intimacys = new Array(json.length);

            for (var j = 0; j < json.length; j++) {
                var intimacy = json[j].intimacy;
                intimacys.push(intimacy);
            }

            console.log(intimacys.max());
            console.log(intimacys.min());


            //根据数量求最小周长
            var perimeter = json.length * diameter;
            //根据周长求 距离圆心的距离（距离圆心的半径）
            var centerLength = perimeter / (2 * Math.PI);

            // console.log(centerLength);

            if (centerLength < cradius * 1.5) {
                centerLength = cradius * 2;
            }
            // centerLength += cradius;
            var angle = 360 / json.length;

            for (var i = 0; i < json.length; i++) {

                var jentity = json[i];


                var angleNum = angle * i + angle * 0.5;

                var x = centerid.x + Math.cos(angleNum / 180 * Math.PI) * (centerLength + jentity.intimacy);
                var y = centerid.y + Math.sin(angleNum / 180 * Math.PI) * (centerLength + jentity.intimacy);


                var linex = centerid.x + Math.cos(angleNum / 180 * Math.PI) * cradius;
                var liney = centerid.y + Math.sin(angleNum / 180 * Math.PI) * cradius;


                var c = createCircle();
                c.image = jentity.head;
                c.x = x;
                c.y = y;
                c.Init(linex, liney);

            }

            /*for (var j = 0; j < 3; j++) {
             var templen = centerLength + cradius * j;

             var sx = centerid.x + Math.cos(angle * 1.5 / 180 * Math.PI) * templen;
             var sy = centerid.y + Math.sin(angle * 1.5 / 180 * Math.PI) * templen;


             }*/
        });


    }


    function Init() {
        drawLayout("软件架构设计");
        drawPeople();
    }


    Init();

    //mainCircle.fill(draw.image('img/2.jpg',100,100)).x(200).y(100);
    //
    //
    //draw.use(mainCircle).move(  -20,-50);
    //var rect = draw.circle(100).fill({color:"#0067AA"}).center(width/2-75,height/2-75);
    //rect.animate().center(width/2-75,height/2-75);
    //rect.animate().center(width/2-75+5, height/2-75+10).loop(0,true);
    //rect.animate().center(width/2-75-10, height/2-75-5).loop(0,true);
    //draw.text("CAE").center(rect.x()+50,rect.y()+50).fill({color:"#fff"});
    //centerCircle.animate().rotate(80,width/2-75,height/2-75);

    //rect.animate(2000,">",1000).attr({ fill: '#f03' });


    //rect.stop();


    /*draw.circle(60).fill(draw.image(,60,60)).center(i*100+40,40).click(function(e){

     console.log(e);
     console.log(e.target.getAttribute("cx"));
     //this.animate().center(e.clientX, e.clientY+200);
     //this.animate().reverse(false);

     }).mouseover(function(e){
     //console.log(e.target);
     var line = draw.line(e.target.getAttribute("cx"),e.target.getAttribute("cy"),width/2-75,height/2-75).stroke({ width: 1 })
     }).mouseout(function(e){

     }).linkTo(function(link){
     //link.to("http://112.74.66.179/Quadratic").target("_blank");
     });*/


});







