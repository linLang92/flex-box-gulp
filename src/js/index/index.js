function createElemt(){
	var ols = $('.flex-wrap');
	var food = '<li  class="flex-item"><img src="./images/food.jpg" ></li>';
	var girl = '<li  class="flex-item"><img src="./images/girl.png" ></li>';
	var man = '<li  class="flex-item"><img src="./images/man.jpg" ></li>';

	for(var m=0;m<5;m++){
		var str='<ul class="flex-container">';
		(function(){
			var first,second,third;
			if(m%3==0){
				first=food;
				second=girl;
				third =man;
			}else if(m%3==1){
				first=girl;
				second =man;
				third=food;
			}else{
				first = man;
				second = food;
				third = girl
			}
			for(var i=0;i<9;i++){
				if(i%3==0){
					str+=first;
				}else if(i%3==1){
					str+=second;
				}else{
					str+=third;
				}
			}
			str+='</ul>'
		})();
	
		ols.append(str);
	}
}
$(document).ready(function(){
	createElemt();
})