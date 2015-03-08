(function($) {

    $.fn.helloWorld = function(o) {
			var s = $.extend ({
         		values: ['default1','default2'],
         		color: '#000',
         		fontSize: '12px'
         	}, o);

         return this.each( function() {

            var c = '<table style="color:'+s.color+';font-size:'+s.fontSize+'"><tr><td>'+s.values[0]+'</td><td>'+s.values[1]+'</td></tr></table>';           
            $(this).html(c);
        });

    }

    $.fn.cp_circle = function (o) {
        var s = $.extend ({
            design: {
                borderWidht:'1px',
                borderColor:'#009CCC',
                backgroundColor:'#009CCC',
                fontColor:'#FFFFFF',
                fontFamily: 'Segoe UI, Arial',
                fontSize:'36',
                subtitleFontSize:'12'
            },
            size: {
                width:'120px',
                height:'120px',
                radius:'50',
                borderRadius:'50'
            }, 
            data: {
                value:'42',
                subtitle:'is the asnwer'
            }
        }, o);

        return this.each (function(){
            var d = s.size.radius*2;
            var c = '<div style="position:relative;width:'+d+'px;height:'+d+';margin:auto;border-radius:'+s.size.borderRadius+'%;border-width:'+s.design.borderWidht+';color:'+s.design.fontColor+';text-align:center;border-color:'+s.design.borderColor+';font-family:'+s.design.fontFamily+';background-color:'+s.design.backgroundColor+'"><span class="cp_rounder_metric" style="font-size:'+s.design.fontSize+'px;margin-top:-'+s.design.fontSize+'px;">'+s.data.value+'</span><br><span class="cp_rounder_subtitle" style="font-size:'+s.design.subtitleFontSize+'px;">'+s.data.subtitle+'</span><br></div>';
            $(this).html(c);
            $(this).css('width',s.size.width);
            $(this).css('height',s.size.height);
        });            
    }

    $.fn.cp_vertical_bar = function(o) {
        var s = $.extend ({
            design: {
                fillColor: '#009CCC',
                remainingColor: '#E4E4E4',
                paddingRight: '5px'
            }, 
            size: {
                barWidth:'12',
                barHeight:'50'
            },
            data: {
                value:'7',
                maxValue: '10'
            }
        },o);

        return this.each (function() {
            var barContainer = document.createElement('div');
            barContainer.style.cssText = "position:relative;padding-right:"+s.design.paddingRight;

            var fullBar = document.createElement('div');
            fullBar.style.height = s.size.barHeight+'px';
            fullBar.style.width = s.size.barWidth+'px';
            fullBar.style.position = 'absolute';
            fullBar.style.backgroundColor = s.design.remainingColor;

            var filledBar = document.createElement('div');
            var h = (s.size.barHeight*s.data.value)/s.data.maxValue;
            var o = s.size.barHeight - h;
            filledBar.style.height = h+'px';
            filledBar.style.top = o + 'px';
            filledBar.style.width = s.size.barWidth;
            filledBar.style.position = 'absolute';
            filledBar.style.backgroundColor = s.design.fillColor;

            barContainer.appendChild(fullBar);
            barContainer.appendChild(filledBar);

            $(this).html(barContainer.outerHTML);

        });

    }


    $.fn.cp_vertical_bar_chart = function (o) {
        var s = $.extend ({
            design: {
                fillColor: '#009CCC',
                remainingColor: '#E4E4E4',
                paddingRight: '5px'
            }, 
            size: {
                barWidth:'12',
                barHeight:'50'
            },
            data: {
                values:[]
            }            
        },o);


        return this.each (function() {

            var t = document.createElement('table');
            var r = document.createElement('tr');

            t.appendChild(r);            
            for (key in s.data.values) {
                    var c = document.createElement('td');
                    c.style.paddingRight = s.design.paddingRight;
                    var e = $('<div>').cp_vertical_bar({design:{fillColor:s.design.fillColor,remainingColor:s.design.remainingColor,paddingRight:s.design.paddingRight},
                                                        data:{value:s.data.values[key].value,maxValue:s.data.values[key].maxValue},
                                                        size:{barWidth:s.size.barWidth,barHeight:s.size.barHeight}});
                    c.appendChild(e[0]);                 
                    r.appendChild(c);
            }

        $(this).html(t.outerHTML);
            
        });
    }

    $.fn.cp_donut = function (o) {
        var s = $.extend ({
            design: {
                fillColor:'#009CCC',
                remainingColor:'#E4E4E4',                
                unit: '%',
                scoreFontSize: '22',
                scoreFontFamily: 'Helvetica',
                scoreFontColor: '#EBEBEB',
                titleFontSize: '12',
                titleFontFamily: 'Helvetica',
                titleFontColor: '#EBEBEB',
                gap: '3'
            },
            size: {
                radius: '40',
                width: '100',
                height: '100',
                lineWidth: '10'
            },
            data: {
                canvas_id:'c1',
                score: '90',                
                subtitle: 'Awesome'
            }
        },o);

      var c = document.createElement('canvas');
      c.id = s.data.canvas_id;
      
      $(this).html(c.outerHTML);

      var canvas = document.getElementById(s.data.canvas_id);

      var context = canvas.getContext('2d');
      var context2 = canvas.getContext('2d');
      var context3 = canvas.getContext('2d');
      
      var score = s.data.score; //score is a value from 0 to 100
      canvas.width = s.size.width;
      canvas.width = s.size.height;
      
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = s.size.radius;
       
      
      context2.beginPath();
      context2.arc(centerX, centerY, radius, 1.5 * Math.PI, ((100*2*Math.PI)/100)+(1.5*Math.PI), false);
      
      context2.lineWidth = s.size.lineWidth;
      context2.strokeStyle = s.design.remainingColor;
      context2.stroke();
      
      context.beginPath();
      context.arc(centerX, centerY, radius, 1.5 * Math.PI, ((score*2*Math.PI)/100)+(1.5*Math.PI), false);
      
      context.lineWidth = s.size.lineWidth;
      context.strokeStyle = s.design.fillColor;
      context.stroke();
      context.font= s.design.scoreFontSize+'px '+s.design.scoreFontFamily;
      var measure_Y,measure_X, title_Y, title_X = 0;
      
      if (s.data.subtitle == null) {
        //center
        measure_Y = centerY+(s.design.scoreFontSize/2);
        measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
      } else {
        measure_Y = centerY+(s.design.scoreFontSize/2)-(s.design.titleFontSize/2)-(s.design.gap/2);        
        measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
        title_X = centerX-(context.measureText(s.data.subtitle).width/2);
        title_Y = centerY+((s.design.scoreFontSize/2) + (s.design.titleFontSize/2)+ (s.design.gap/1));
      }
      context.fillText(score+s.design.unit,measure_X ,measure_Y);
      console.log(measure_X);
      console.log(measure_Y);
      context.font= s.design.titleFontSize+'px '+s.design.titleFontFamily;

      context.fillText(s.data.subtitle, centerX-(context.measureText(s.data.subtitle).width/2),title_Y);
      console.log(centerX);
      console.log(context.measureText(s.data.subtitle).width/2);
      console.log(title_X);
      console.log(title_Y);
      console.log(canvas.outerHTML);
      

    }


}(jQuery));