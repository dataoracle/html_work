(function($) {

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
            var c = '<div><div style="position:relative;width:'+d+'px;height:'+d+';margin:auto;border-radius:'+s.size.borderRadius+'%;border-width:'+s.design.borderWidht+';color:'+s.design.fontColor+';text-align:center;border-color:'+s.design.borderColor+';font-family:'+s.design.fontFamily+';background-color:'+s.design.backgroundColor+'"><span class="cp_rounder_metric" style="font-size:'+s.design.fontSize+'px;margin-top:-'+s.design.fontSize+'px;">'+s.data.value+'</span><br><span class="cp_rounder_subtitle" style="font-size:'+s.design.subtitleFontSize+'px;">'+s.data.subtitle+'</span><br></div></div>';
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
            filledBar.style.width = s.size.barWidth + 'px';
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
            var d = document.createElement('div');
            var t = document.createElement('table');
            var r = document.createElement('tr');
            d.appendChild(t);
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

        $(this).html(d.outerHTML);
            
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
                scoreFontColor: '#666666',
                titleFontSize: '12',
                titleFontFamily: 'Helvetica',
                titleFontColor: '#666666',
                gap: '3',
                displayText: 'true'
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
                max:'100',                
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
      var max = s.data.max;
      canvas.width = s.size.width;
      canvas.height = s.size.height;
      
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = s.size.radius;
       
      
      context2.beginPath();
      context2.arc(centerX, centerY, radius, 1.5 * Math.PI, ((100*2*Math.PI)/100)+(1.5*Math.PI), false);
      
      context2.lineWidth = s.size.lineWidth;
      context2.strokeStyle = s.design.remainingColor;
      context2.stroke();
      
      context.beginPath();
      context.arc(centerX, centerY, radius, 1.5 * Math.PI, ((score*2*Math.PI)/max)+(1.5*Math.PI), false);
      
      context.lineWidth = s.size.lineWidth;
      context.strokeStyle = s.design.fillColor;
      context.stroke();

      if (s.design.displayText == 'true') {
        context.font= s.design.scoreFontSize+'px '+s.design.scoreFontFamily;
        context.fillStyle = s.design.scoreFontColor;
        var measure_Y,measure_X, title_Y, title_X = 0;
        
        if (s.data.subtitle == null) {
          //center
          measure_Y = centerY+(s.design.scoreFontSize/2.5);
          measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
        } else {
          measure_Y = centerY+(s.design.scoreFontSize/2)-(s.design.titleFontSize/2)-(s.design.gap/2);        
          measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
          title_X = centerX-(context.measureText(s.data.subtitle).width/2);
          title_Y = centerY+((s.design.scoreFontSize/2) + (s.design.titleFontSize/2)+ (s.design.gap/1));
        }
        context.fillText(score+s.design.unit,measure_X ,measure_Y);
        context.fillStyle = s.design.titleFontColor;
        context.font= s.design.titleFontSize+'px '+s.design.titleFontFamily;
        context.fillText(s.data.subtitle, centerX-(context.measureText(s.data.subtitle).width/2),title_Y);      
      }
    }

    $.fn.cp_tile = function (o) {
        var s = $.extend ({
            design: {
                backgroundColor:'#FFFFFF00',
                titleFontSize: '22',
                titleFontFamily: 'Helvetica',
                titleFontColor: '#666666',
                titlePaddingTop: '5px',                
                subtitleFontSize: '12',
                subtitleFontFamily: 'Helvetica',
                subtitleFontColor: '#666666',
                borderStyle: '1px solid #EBEBEB',

            },
            size: {                
                width: '150',
                height: '150',
                titleHeightPer: '15',
                contentHeightPer: '70',
                subtitleHeightPer:'15'
            },
            data: {
                content_id:'t_c1',
                title: 'This is title',    
                subtitle: 'Awesome!'
            }
        },o);

        return this.each (function() {

          var c = document.createElement('div');
          c.style.width = s.size.width;
          c.style.height = s.size.height;
          c.style.backgroundColor = s.design.backgroundColor;
          c.style.border = s.design.borderStyle;

          var title = document.createElement('div');
          title.style.width = '100%'
          title.style.height = s.size.height * (s.size.titleHeightPer/100);
          title.style.fontSize = s.design.titleFontSize;
          title.style.color = s.design.titleFontColor;
          title.style.fontFamily = s.design.titleFontFamily;
          title.style.textAlign = 'center';
          title.style.lineHeight = title.style.height;
          title.style.paddingTop = s.design.titlePaddingTop;
          title.innerText = s.data.title;

          var content = document.createElement('div');
          content.style.width = '100%';
          content.style.height = s.size.height * (s.size.contentHeightPer/100);
          content.id = s.data.content_id;          
          content.style.position = 'relative';
          content.style.margin = 'auto';  

          var subtitle = document.createElement('div');
          subtitle.style.width = '100%';
          subtitle.style.height = s.size.height * (s.size.subtitleHeightPer/100);
          subtitle.style.fontSize = s.design.subtitleFontSize;
          subtitle.style.color = s.design.subtitleFontColor;
          subtitle.style.fontFamily = s.design.subtitleFontFamily;
          subtitle.style.textAlign = 'center';
          subtitle.style.lineHeight = subtitle.style.height;
          subtitle.innerText = s.data.subtitle;          

          c.appendChild(title);
          c.appendChild(content);
          c.appendChild(subtitle);

          $(this).html(c.outerHTML);
        });

    }

    $.fn.cp_bubble = function (o) {
        var s = $.extend ({
            design: {
                fillColor:'#009CCC',               
                unit: '%',
                scoreFontSize: '22',
                scoreFontFamily: 'Helvetica',
                scoreFontColor: '#666666',
                titleFontSize: '12',
                titleFontFamily: 'Helvetica',
                titleFontColor: '#666666',
                titlePosition: 'center',
                gap: '3',
                displayText: 'true'                
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
                max:'100',                
                subtitle: 'Awesome'
            }
        },o);

      var c = document.createElement('canvas');
      c.id = s.data.canvas_id;
      
      $(this).html(c.outerHTML);

      var canvas = document.getElementById(s.data.canvas_id);

      var context = canvas.getContext('2d');
      
      var score = s.data.score; //score is a value from 0 to 100
      var max = s.data.max;
      canvas.width = s.size.width;
      canvas.height = s.size.height;
      canvas.style.display = 'block';
      canvas.style.margin = 'auto';
      
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = s.size.radius;
       
      
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2*Math.PI, false);            
      context.fillStyle = s.design.fillColor;
      context.fill();

      var o = radius-((radius*2 - (radius*2)*(s.data.score/s.data.max)));      
      var alpha = Math.asin(o/radius);
      console.log(alpha);
      if (alpha > 1.5) {alpha=1.5};
      if (alpha < -1.5) {alpha=-1.5};
      context.beginPath();
      context.arc(centerX, centerY, radius, 0-alpha, (1 * Math.PI)+alpha, true);            
      context.fillStyle = 'rgba(255,255,255,0.5)';
      context.fill();

      if (s.design.displayText == 'true') {
        context.font= s.design.scoreFontSize+'px '+s.design.scoreFontFamily;
        context.fillStyle = s.design.scoreFontColor;
        var measure_Y,measure_X, title_Y, title_X = 0;
        
        if (s.data.subtitle == null) {
          //center
          measure_Y = centerY+(s.design.scoreFontSize/2.5);
          measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
        } else {
          measure_X = centerX-(context.measureText(score+s.design.unit).width/2);
          title_X = centerX-(context.measureText(s.data.subtitle).width/2);
          if (s.design.titlePosition == 'center') {
            measure_Y = centerY+(s.design.scoreFontSize/2)-(s.design.titleFontSize/2)-(s.design.gap/2);                              
            title_Y = centerY+((s.design.scoreFontSize/2) + (s.design.titleFontSize/2)+ (s.design.gap/1));
          } else if (s.design.titlePosition == 'bottom') {
            measure_Y = centerY+(s.design.scoreFontSize/2.5);
            title_Y = centerY + radius*1 + s.design.gap*1;
          } else if (s.design.titlePosition == 'top') {
            measure_Y = centerY+(s.design.scoreFontSize/2.5);     
            title_Y = centerY - radius*1 - s.design.gap*1;
          } else {
            measure_Y = centerY+(s.design.scoreFontSize/2)-(s.design.titleFontSize/2)-(s.design.gap/2);                              
            title_Y = centerY+((s.design.scoreFontSize/2) + (s.design.titleFontSize/2)+ (s.design.gap/1));
          }
        }
        context.fillText(score+s.design.unit,measure_X ,measure_Y);
        context.fillStyle = s.design.titleFontColor;

        context.font= s.design.titleFontSize+'px '+s.design.titleFontFamily;
        context.fillText(s.data.subtitle, centerX-(context.measureText(s.data.subtitle).width/2),title_Y);      
      }
    }
    


    $.fn.center = function (p) {
      if (p != 'undefined') {
       $(this).css('width',p);
       $(this).css('height',p);
      }
      $(this).css('top',0);
      $(this).css('left',0);
      $(this).css('right',0);
      $(this).css('bottom',0);
      $(this).css('position','absolute');
      $(this).css('margin','auto');
    }



}(jQuery));