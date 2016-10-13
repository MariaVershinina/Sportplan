var main = function(Objects){
	"use strict";
	var description;
	var newToDone;
	var tabs = [];
	tabs.push({
		"name":"Планируемые тренировки",
		"content":function(callback){
			$.getJSON("trainings.json", function(Objects) {
				description = Objects.map(function(name){
					return name.description;
				});
				var $content;
				$content = $("<ul>").addClass("trainings");
				Objects.forEach(function(name){
					var $li = $("<li>").text(name.description);
					$li.on("click", function(){
						if(confirm("Вы выполнили упражнение?")){
							var $todoRemoveLink = $("<a>").attr("href", "trainings/"+name._id);
							$li.append($todoRemoveLink);
							 newToDone = {"description": name.description};
							 //alert(name.description);
							$.post("traidone", newToDone , function (response) {
							console.log("Мы отправили данные и получили ответ сервера!");
						//$("input").val("");	
						//$(".tabs a:nth-child(1)").trigger("click");
						});
							//alert(name.description)
						
						$.ajax({
							url: $todoRemoveLink.attr("href"),
							type: "DELETE",
							success: function(result) {
								console.log("Delete request");
							}
						}).done(function() {
							//alert($todoRemoveLink.attr("href"));
						//console.log(event.target.parentNode.remove());
						});	
							//var index = $.inArray($li.text(), description);
							//ready.push(description.splice(index,1));
							
						this.remove();
						};
						
					});
				$($content).append($li);
			});
			callback(null, $content);
			}).fail(function(jqXHR,textStatus,error){
				callback(error,null);
			});
			
		}
	});
	
	tabs.push({
		"name":"Прошедшие тренировки",
		"content":function(callback){
			$.getJSON("trainingsdone.json", function(Objects) {
				var $content = $("<ul>").addClass("trainings");
				Objects.forEach(function(name){
					var $li = $("<li>").text(name.description);
					$($content).append($li);
				});
			callback(null, $content);
			}).fail(function(jqXHR,textStatus,error){
				callback(error,null);
			});	
		}
	});

	tabs.push({
		"name":"Добавить",
		"content":function(callback){
			$.getJSON("trainings.json", function(Objects) {
				var $content = $("<div>").addClass("trainings");
				var $d =$("<p>").text("Описание:   ");
				var $inputDescription = $("<input>");
				var $t =$("<p>").text("Тег:   ")
				var $inputtag = $("<input>");
				var $button = $("<button>").text("ОК");
				var create = function(){
				var newToDoss = {"description": $inputDescription.val(), "tags": $inputtag.val().split(",")};
					if($inputDescription.val() && $inputtag.val() !== ""){
						Objects.push({"description": $inputDescription.val(), "tags": $inputtag.val().split(",")});
						description.push($inputDescription.val());
						$.post("trai", newToDoss , function (response) {
							console.log("Мы отправили данные и получили ответ сервера!");
							$("input").val("");	
							$(".tabs a:nth-child(1)").trigger("click");
						});
					};
			};

		$button.on("keypress",function(event){
			if(event.keyCode === 13) {
				create();
			};
		});

		$button.on("click",function(){
			create();
		});
		$content.append($d.append($inputDescription)).append($t.append($inputtag).append($button));
		callback(null, $content);
		}).fail(function(jqXHR,textStatus,error){
			callback(error,null);
		});
		
		}
	});
	tabs.push({
		"name":"Тэги",
		"content":function(callback){
			$.getJSON("trainings.json", function(Objects) {
			var $content = $("<ul>").addClass("trainings");

		var tag =[];
		//alert(Objects.length);
		Objects.forEach(function(name){
		//	alert(name.tags);
			name.tags.forEach(function(x){
				if(tag.indexOf(x) ==-1){
					tag.push(x);
					//descriptionlist.append($d);
				};
			});
		});
		//alert(tag);
		var tagObjects = tag.map(function (tag) {
			var DescriptionTag = [];
			Objects.forEach(function (toDo) {
				if (toDo.tags.indexOf(tag) !== -1) {
					DescriptionTag.push(toDo.description);
				}
			});
	
			return { "name": tag, "toDos": DescriptionTag };
		});
		tagObjects.forEach(function (tag) {
			var $tagName = $("<li>").text(tag.name).addClass("toTag");
			 var $contentul = $("<ul>");
			tag.toDos.forEach(function (description) {
				var $li = $("<li>").text(description).addClass("toDo");
				$contentul.append($li);
			});

		$($content).append($tagName);
		$($content).append($contentul);
		});
			callback(null, $content);
			}).fail(function(jqXHR,textStatus,error){
				callback(error,null);
			});
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href","").text(tab.name);
		//$spanElement = $("<span>")
		//$aElement.append($spanElement);
		$aElement.on("click", function () {
			var $content;
			$(".tabs a ").removeClass("active");
			$aElement.addClass("active");
			$("main .content").empty();

			tab.content(function(err, $content){
				if(err !== null){
					var $error = $("<p>").text("Что-то не так... Ошибка")
					$("main .content").empty().append($error);
				}else{
				$("main .content").append($content);
				}	
			});
			
					
			return false;
		});
		$("main .tabs").append($aElement);
	});	

	$(".tabs a:nth-child(1)").trigger("click");
};

$(document).ready(function () {
	$.getJSON("trainings.json",function (Objects) {
		main(Objects);
	});
});



