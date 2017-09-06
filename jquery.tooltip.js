;(function($){
	var name="tooltip";
	Plugin.prototype={
		defaults:{
			height:30,
			showDelay:0,
			bgColor:"rgba(0,0,255,1)",
			color:"rgba(255,255,255,1)",
			direction:"right",
			fontFamily:"Arial, Helvetica, sans-serif",
			position: {
				offsetX:5,
				offsetY:3
			}
		}
	};
	//the actual plugin constructor
	function Plugin(element,options){
		var $scope=this;
		$scope.$element=$(element);
		$scope.element=element;
		$scope.options=$.extend(this.defaults,options);
		$scope.init=function(){
			var linkTitle="";
			$scope._text=(typeof $scope.$element.data("title")!=="undefined")?$scope.$element.data("title"):$scope.$element.prop("title");
			if(typeof $scope._text !=="undefined" ){
				var $html = $("<div class='tooltip-frame'><div class='tooltip-text'>"+$scope._text+"</div></div>");
				$html.css({
					'position': 'absolute',
					'text-align': 'center',
					'height': $scope.options.height,
					'line-height': $scope.options.height + "px",
					'background-color':$scope.options.bgColor,
					'color': $scope.options.color,
					'padding': '0 10px 0 10px',
					'border-radius': '5px',
					'font-size':$scope.options.height*0.6+"px",
					"font-family": $scope.options.fontFamily
				});
				switch($scope.options.direction){
					case "bottom":
						$html.css({
							left:$scope.$element.offset().left+$scope.options.position.offsetX,
							top:$scope.$element.offset().top+$scope.$element.outerHeight()+$scope.options.position.offsetY
						});
						break;
					default:
						$html.css({
							left:$scope.$element.offset().left+$scope.$element.outerWidth()+$scope.options.position.offsetX,
							top:$scope.$element.offset().top+$scope.options.position.offsetY
						});
				}
				$scope.$element.on("mouseover", function(){
					if(this.nodeName==="A"){
						linkTitle=$(this).prop("title");
						$(this).prop("title","");
					}
					$scope.$element.after($html);
					$html.hide().delay($scope.options.showDelay).fadeIn("fast");
					}).on("mouseout", function(){
						if(this.nodeName==="A"){
							$(this).prop("title",linkTitle);
						}
						$html.remove();
					});
			}
		};
	}
	$.fn[name]=function(options){
		return this.each(function(){
			new Plugin(this,options).init();
		});
	};
})(jQuery)