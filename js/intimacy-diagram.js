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
        drawGraphics();
    });

    /**
     * 初始化全局参数
     */
    function initParams() {
        //初始化参数信息
        params = {
            w: window.innerWidth,
            h: window.innerHeight,
            cx: function () {
                return this.w / 2;
            },
            cy: function () {
                return this.h / 2;
            },
            r: function () {
                if (this.w > this.h) {
                    return this.h / 15;
                } else {
                    return this.w / 15;
                }
            }
        };
        draw = draw.size(params.w, params.h);

        //绘制场景图
    }

    /**
     * 绘制图形
     */
    function drawGraphics() {

        draw.clear();
        //var nested = draw.nested();
        //
        //var group = draw.group();
        //
        //var rect = nested.rect(200,800);
        //屏蔽元素的方法
        var ellipse = draw.ellipse(0, 0).move(10, 10).fill({color: '#fff'});


        var r = params.r();//半径 可控变量
        var scale = 0.4;//人头像相对中心圆的缩放比例

        var cradius = r * scale;//头像的半径

        var centerCircle = {diameter: r, color: "#00FF00"};//中心圆属性

        var radarLineColor = "#00FF00";

        var firstCircle = {diameter: r * 2 * 3, color: "#ffe"};//第一个内圆属性

        var secondCircle = {diameter: r * 2 * 4, color: "#eee"};//第二个内圆属性

        var thirdCircle = {diameter: r * 2 * 5, color: "#ddd"};//外圆属性


        var lineColor = "#ED7D31";

        var borderColor = "#D8D8D8";

        /**
         * 绘制圆形布局
         */
        function drawLayout(text) {

            //外圆3
            draw.circle(thirdCircle.diameter).center(params.cx(), params.cy())
                .fill(thirdCircle.color).stroke({width: 2, color: borderColor});//事件在此处继续添加

            //外圆2
            draw.circle(secondCircle.diameter).center(params.cx(), params.cy())
                .fill(secondCircle.color).stroke({width: 2, color: borderColor});//事件在此处继续添加

            //外圆1
            draw.circle(firstCircle.diameter).center(params.cx(), params.cy())
                .fill(firstCircle.color).stroke({width: 2, color: borderColor});//事件在此处继续添加

            //中心圆
            draw.circle(centerCircle.diameter).center(params.cx(), params.cy())
                .fill(centerCircle.color);//事件在此处继续添加

            draw.text(text).center(params.cx(), params.cy()).stroke("#f05");


        }


        /**
         * 绘制雷达效果
         */
        function drawRadar() {
            //绘制指针
            var x = params.cx() + Math.cos(270 / 180 * Math.PI) * (thirdCircle.diameter / 2);
            var y = params.cy() + Math.sin(270 / 180 * Math.PI) * (thirdCircle.diameter / 2);
            //绘制线段
            draw.line(params.cx(), params.cy(), x, y).stroke({width: 3, color: radarLineColor})
                .animate(2000).rotate(360, params.cx(), params.cy()).loop();

        }


        function createCircle() {

            return {
                x: params.cx(),
                y: params.cy(),
                radius: cradius,
                image: '',
                text: '',
                line: '',
                drawInstance: function () {
                    var diameter = this.radius * 2;
                    var c1 = draw.circle(diameter).center(params.cx(), params.cy());
                    c1.fill({color: "#0067AA"})
                        .animate(500).center(this.x, this.y);

                    var cir = draw.circle(diameter - 4).center(params.cx(), params.cy());
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

                    var rx = params.cx() + Math.cos(0 / 180 * Math.PI) * r * 5;
                    var ry = params.cy() + Math.sin(0 / 180 * Math.PI) * r * 5;

                    var lineRightBegin = draw.line(rsx - 8, rsy, rx, ry).stroke({width: 2, color: lineColor}).hide();
                    var lineRightEnd = draw.line(rx - 1, ry, rx + r * 2, ry).stroke({
                        width: 2,
                        color: lineColor
                    }).hide();

                    //连线 左侧侧 人员到 中心边界 到 详细信息矩形
                    var lsx = this.x + Math.cos(0 / 180 * Math.PI) * (r / 2);
                    var lsy = this.y + Math.sin(0 / 180 * Math.PI) * (r / 2);

                    var lx = params.cx() - Math.cos(0 / 180 * Math.PI) * r * 5;
                    var ly = params.cy() + Math.sin(0 / 180 * Math.PI) * r * 5;


                    var lineLeftBegin = draw.line(lsx - r + 8, lsy, lx, ly).stroke({width: 2, color: lineColor}).hide();
                    var lineLeftEnd = draw.line(lx - r * 2, ly, lx, ly).stroke({width: 2, color: lineColor}).hide();


                    var r_detail_rect = draw.rect(r * 4, r * 10).center(rx + r * 2.5, params.cy()).stroke(lineColor).fill("#fff").hide();
                    var l_detail_rect = draw.rect(r * 4, r * 10).center(rx + r * 2.5, params.cy()).stroke(lineColor).fill("#fff").hide();

                    cir_img.on("click", function (e) {

                        cir_img.maskWith(ellipse);

                        if (e.target.cx.animVal.value > params.cx()) {
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

                    cir_img.on("mouseover",function(e,c){

                        cir_bg.unmask();

                    });
                    var ellipse = draw.ellipse(100, 100).attr('cx', '20%').fill('#333')

                    cir_img.animate(3000).scale(1, 1).during(function(pos, morph) {
                        // numeric values
                        //cir_img.size(morph(100, 200), morph(100, 50))

                        console.log(pos);
                        // unit strings
                        //cir_img.attr('cx', morph('80%', '80%'))

                        // hex color strings
                        cir_img.fill(morph('#333', '#ff0066'));
                    });

                    //cir_img.scale(1,0.5);
                    cir_img.on("mouseout", function (e) {

                        cir_bg.maskWith(ellipse);
                        cir_img.fill({color: "#0067AA"});
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

        function drawPeople(callback) {


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
                var perimeter = json.length * r;
                //根据周长求 距离圆心的距离（距离圆心的半径）
                var centerLength = perimeter / (2 * Math.PI);

                if (centerLength < cradius * 1.5) {
                    centerLength = cradius * 2;
                }
                var angle = 360 / json.length;

                for (var i = 0; i < json.length; i++) {

                    var jentity = json[i];


                    var angleNum = angle * i + angle * 0.5;

                    var x = params.cx() + Math.cos(angleNum / 180 * Math.PI) * (centerLength + jentity.intimacy);
                    var y = params.cy() + Math.sin(angleNum / 180 * Math.PI) * (centerLength + jentity.intimacy);


                    var linex = params.cx() + Math.cos(angleNum / 180 * Math.PI) * cradius;
                    var liney = params.cy() + Math.sin(angleNum / 180 * Math.PI) * cradius;


                    var c = createCircle();
                    c.image = jentity.head;
                    c.x = x;
                    c.y = y;
                    c.Init(linex, liney);

                }

                return callback();

                /*for (var j = 0; j < 3; j++) {
                 var templen = centerLength + cradius * j;

                 var sx = params.cx() + Math.cos(angle * 1.5 / 180 * Math.PI) * templen;
                 var sy = params.cy() + Math.sin(angle * 1.5 / 180 * Math.PI) * templen;


                 }*/
            });


        }


        function Init() {
            drawLayout("");
            drawPeople(function(){
                drawRadar();


            });
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

    }

    //初始化调用
    initParams();
    drawGraphics();


});







