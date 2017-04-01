var height = 0; // in cm
var weight = 0; // in kg
var heightSlider = null;
var weightSlider = null;
var errorDisplayed = false;
var botMessages = [[
	"<p>Hi there, I'm Pi.</p>",
	"<p>I'm your new personal fitting assistant.</p>",
	"<p>I can find your size in just one click</p><div class='slider-wrapper'><p>Height</p><input id='heightSlider' data-slider-id='heightSlider' type='text'><div class='action-btn'><button class='decrease-height plain-button'>-</button><p class='display-value' id='height-value'>158</p><button class='increase-height plain-button'>+</button></div><div class='btn-group toggle-btn'><button class='plain-button' data-value='height'>ft/in</button><button class='plain-button active' data-value='height'>cm</button></div><hr><p>Weight</p><input id='weightSlider'><div class='action-btn'><button class='decrease-weight plain-button'>-</button><p class='display-value' id='weight-value'>57</p><button class='increase-weight plain-button'>+</button></div><div class='btn-group toggle-btn'><button class='plain-button' data-value='weight'>st/lb</button><button class='plain-button active' data-value='weight'>kg</button></div></div>"
]];
var userMessages = [["<p>Tell me my size</p>"]];
var speaker = "bot";
var units = {
	"height": "cm",
	"weight": "kg"
};

//helper functions
function format(measurement){
	if(measurement === "height"){
		return units["height"] === "cm" ? height : `${Math.floor(height/30.48)} ft ${Math.floor((height%30.48)/2.54)} in`;
	}
	return units["weight"] === "kg" ? weight : `${Math.floor(weight/6.35)} st ${Math.floor((weight%6.35)/0.454)} lb`;
}
function displayLoading(){
	var el = `<img src="./css/png/loading-dots.gif" class="loading" />`;
	$(".footer").append(el);
}
function createMessage(content,dispatcher){
	if(dispatcher === null){
		return `<div class="error">${content}</div>`;
	}
	return `<div class='chat-bubble ${dispatcher} slideInUpShort'>${content}</div>`;
}
function getMessages(){
	return speaker === "bot" ? botMessages : userMessages;
}
function appendMessage(content,element,dispatcher){
	//content - content of the message
	//element - where you want to append the message
	//dispathcer - who is dispathcing the messsage (user or bot)
	$(element).append(createMessage(content,dispatcher));
	setTimeout(function(){
		//waiting for the slideup animation to get over
		$("#chat-body").scrollTop($("#chat-body")[0].scrollHeight);
	},200);
}
function displayMessages(){
	var messages = getMessages()[0];
	if(speaker === "bot"){
		botMessages.shift();
		messages.map((i,j) => setTimeout(appendMessage.bind(null,i,"#chat-body",speaker),2000*j + 1000));
		setTimeout(() => {
			speaker = speaker === "bot" ? "user" : "bot";
			displayMessages();
		},2000*(messages.length-1)+1300)
	}
	else{
		$(".footer").html('');
		userMessages.shift();
		messages.map(i => appendMessage(i,".footer",speaker))
	}
}
function startChat(speaker){
	displayMessages();
};

//adding event listeners on dynamic components
$('.footer').on('click', '.user', function(){
		var checkIfConstant = heightSlider.getValue() === 158 && weightSlider.getValue() === 57;
		if(checkIfConstant && !errorDisplayed){
			errorDisplayed = true;
			appendMessage('select your measurements',"#chat-body",null);
		}
		else{
			if(!errorDisplayed){
				heightSlider.disable();
				weightSlider.disable();
				$('#chat-body').off('click', '.increase-height');
				$('#chat-body').off('click', '.decrease-height');
				$('#chat-body').off('click', '.increase-weight');
				$('#chat-body').off('click', '.decrease-weight');
				$('.error').hide();
				errorDisplayed = false;
				appendMessage($(this).html(),"#chat-body",'user');
				$(".footer").html("");
			}
		}
});
$('#chat-body').on('click', '.increase-height', function(){
	if(errorDisplayed){errorDisplayed = false}
	heightSlider.setValue(heightSlider.getValue() + 1)
});
$('#chat-body').on('click', '.decrease-height', function(){
	if(errorDisplayed){errorDisplayed = false}
	heightSlider.setValue(heightSlider.getValue() - 1)
});
$('#chat-body').on('click', '.increase-weight', function(){
	if(errorDisplayed){errorDisplayed = false}
	weightSlider.setValue(weightSlider.getValue() + 1)
});
$('#chat-body').on('click', '.decrease-weight', function(){
	if(errorDisplayed){errorDisplayed = false}
	weightSlider.setValue(weightSlider.getValue() - 1)
});
$('#chat-body').on('click', '.plain-button', function(e){
	var child = $(this).parent().children()
	child.map(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}
		else{
			units[$(this).attr('data-value')] = $(this).html();
			$(this).addClass('active');
		}
		if($(this).attr('data-value') === "weight"){
			$("#weight-value").html(format("weight"));
		}
		else{
			$("#height-value").html(format("height"));

		}
	});
});

//initializing the sliders when mounted
$.initialize("#heightSlider", function() {
	heightSlider = new Slider('#heightSlider', {
		min:90,
		max:200,
		step: 1,
		value: 158,
		tooltip: 'hide',
		formatter: function(value) {
			if(errorDisplayed){errorDisplayed = false}
			height = value;
			$("#height-value").html(format("height"));
			return value;
		}
	});
});
$.initialize("#weightSlider", function() {
	weightSlider = new Slider('#weightSlider',{
		min:20,
		max:150,
		step: 1,
		value: 57,
		tooltip: 'hide',
		formatter: function(value) {
			if(errorDisplayed){errorDisplayed = false}
			weight = value;
			$("#weight-value").html(format("weight"));
			return value;
		},
	});
});

$("#show-chat").click(function() {
	setTimeout(function(){
		$(".view-opaque-layer").css('background','rgba(0,0,0,0.5)');
	},1200);
	$(".chat").css('display','flex');
	$("#show-chat").css('display','none');
	displayLoading()
	setTimeout(startChat.bind(null,speaker), 1000)
});
