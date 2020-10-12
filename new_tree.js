
function trans(){
    var first = [];
    var second = [];
    var third = [];
	var textt=0;
	var ajob = [];
	var s_name=[];
	var data=[];
    var dat = document.getElementById("tree").value;
	first = dat.split("\n\n\n");
	
	for(var i = 0;i<first.length;i++)
	{//console.log(data);
		second = first[i].split("\n\n");
		third=second[0].split("\n");
		
		//console.log(third);
		var flogg=0;  //表示不需要关联
		var ss=third[0].split("：");
		var t_name=ss[1];
		for(var j = 0;j<third.length;j++)
		{
			
			ajob=third[j].split("：");
			var job = ajob[0];
			var name1 = ajob[1];
			
			//console.log(s_name);
			if(job=="导师")
			{
				for(var ii=0;ii<s_name.length;ii++)
				{
					if(name1==s_name[ii])
					{
						flogg=1;
					}
					else{
						continue;
					}
				}
				if(flogg==0)
				{
					s_name=[];
					data=[];
					data.push({name:name1,value:"导师",sj:"-"});
				}
				
				
			}
			else
			{
				
				if(flogg == 0){
					
					var childd = name1.split("、");
					
					data.push({name:job,value:job,sj:"导师"});
					
				}
				else{
					
					var childd = name1.split("、");
					//console.log(childd);
					
					data.push({name:job,value:job,sj:t_name});
				}
				for(var k=0;k<childd.length;k++)
					{
						s_name.push(childd[k]);
						data.push({name:childd[k],value:childd[k],sj:job});
					}
			}
		}
		//console.log(data);
		for(var j = 1;j<second.length;j++)
		{
			var ajob1=second[j].split("：");
			var name11=ajob1[0];
			var jineng=ajob1[1].split("、");
			//
			//console.log(name11);
			for(var k=0;k<jineng.length;k++)
			{
				data.push({name:jineng[k],value:jineng[k],sj:name11});
			}
		}
		
		//
		
		var treeData=[];
		var nname="";
		var dw=compare(data);
		nname=i.toString()+"tree";
		treeData = transData(dw, 'value', 'sj', 'children');
		drawTree(treeData,nname);
		console.log(dw);
		//document.write("\n");
	}
	
}



 
/**2.数据处理成层级关系的数据***/ 
function transData(a, idStr, pidStr, childrenStr) {
	var r = [], hash = {}, id = idStr, pid = pidStr, children = childrenStr, i = 0, j = 0, len = a.length;
	for (; i < len; i++) {
		hash[a[i][id]] = a[i];
	}
	for (; j < len; j++) {
		var aVal = a[j], hashVP = hash[aVal[pid]];
		if (hashVP) {
			!hashVP[children] && (hashVP[children] = []);
			hashVP[children].push(aVal);
		} else {
			r.push(aVal);
		}
	}
	return r;
}
 
/**
 *3. 画树
 */
function drawTree(treeData,nname="") {
	var  myChart = echarts.init(document.getElementById(nname));//div元素节点的对象
	myChart.setOption({
		tooltip : {
			trigger : 'item',
			triggerOn : 'mousemove'
		},
		series : [ {
			type : 'tree',
			name : 'TREE_ECHARTS',
			data : treeData,
			top : '2%',
			left : '10%',
			bottom : '2%',
			right : '15%',
			symbolSize : 7,
			label : {
				normal : {
					position : 'left',
					verticalAlign : 'middle',
					align : 'right'
				}
			},
			leaves : {
				label : {
					position : 'right',
					verticalAlign : 'middle',
					align : 'left'
				}
			},
			expandAndCollapse : true ,
			initialTreeDepth : 2 //展示层级数,默认是2
		} ]
	});
	

}
//删除数组中重复元素
 function compare(arr) {
      var result = [], isfl;
      for (var i = 0; i < arr.length; i++) {
		  isfl=false;
         for (var j = 0; j < i; j++) {
              if (arr[i].name ===arr[j].name&&arr[i].sj ===arr[j].sj) {   
                  isfl = true;
				  break;
				  }
              }
		 for (var j = i+1; j < arr.length; j++) {
              if (arr[i].name ===arr[j].name&&arr[i].sj ===arr[j].sj) {   
                  isfl = true;
                 break;
              }	  
			  
		 
         }
         if (!isfl) {
             result.push(arr[i]);
         }
    
        
 }
	return result;

 }
