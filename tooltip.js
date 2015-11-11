var tooltipMessage = "";
var flavorText = "";
var letterColours = ["#000000", "#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF5500", "#8000FF", "#FF00FF", "#863200"];
var upgradeMessages = ['Increases multi-click by 5 times',
						'Increases multi-click by 5 times',
						'Increases multi-click by 5 times',
						'Increases multi-click by 5 times',
						'Increases generator '+changeColor(1)+' by 69 times',
						'Increases generator '+changeColor(2)+' by 69 times',
						'Increases generator '+changeColor(3)+' by 69 times',
						'Increases generator '+changeColor(4)+' by 69 times',
						'Increases autoclicker speed by 2 times',
						'Increases autoclicker speed by 2 times',
						'Increases autoclicker speed by 2 times',
						'Increases autoclicker speed by 2 times',
						'Unlock generator autoclick speed',
						'Reduce cost of '+changeColor(5)+'\'s to 1',
						'Every '+changeColor(2)+' generator after 30 will reduce the cost of '+changeColor(4)+'\'s by 15 (up to 66 times)',
						'Every '+changeColor(1)+' generator reduces the cost of '+changeColor(3)+' and '+changeColor(1)+' generators by 1.2 times',
						'Unlocks \'research\' feature (not at all suspicious)',
						'Reduce the cost of '+changeColor(2)+' generators by 1000',
						'Increase generator '+changeColor(5)+' by 69 times',
						'Reduce the cost of '+changeColor(2)+' generators by 1000',
						'Unlock Button',
						'If the number of '+changeColor(4)+'generators is a multiple of 10, increase the multiplier of '+changeColor(4)+' generators by 10 times',
						'Every three '+changeColor(2)+' generators will add one to the multiplier for '+changeColor(2)+' generators (before any other bonuses)',
						'Increases '+changeColor(5)+' generator multiplier by 5 times',
						'Increases '+changeColor(5)+' generator multiplier by 5 times',
						'Increases '+changeColor(5)+' generator multiplier by 5 times',
						'Increases '+changeColor(5)+' generator multiplier by 5 times',
						'Increases '+changeColor(5)+' generator multiplier by 5 times'];
var flavorTextMessages = ['high five',
'high five',
'high five',
'high five',
						'gotta go fast',
						'gotta go fast',
						'gotta go fast',
						'gotta go fast',
						'meme number', 
						'meme number', 
						'meme number', 
						'meme number', 
						'dank discounts', 
						'gotta go faster',
						'42',
						'13',
						'uh oh',
						'discounted',
						'gotta go fast',
						'discounted',
						'!!!omg!!!]',
						'\'four\' has four letters',
						'you need to do to twos too',
						'very spoopy',
						'very spoopy',
						'very spoopy',
						'very spoopy',
						'very spoopy'];
var researchMessages = ['Increase rate of decrease of cost of '+changeColor(7)+'\'s by 5',
						'Increase rate of decrease of cost of '+changeColor(7)+'\'s by 100',
						'Increase rate of decrease of cost of '+changeColor(7)+'\'s by 100',
						'Increase rate of decrease of cost of '+changeColor(7)+'\'s by 25',
						'Increase rate of decrease of cost of '+changeColor(7)+'\'s by 25',
						'Increase rate of decrease of cost of '+changeColor(7)+'\'s by 25'
						];
var researchFlavorTextMessages = ['lucky number',
						'lucky number',
						'lucky number',
						'lucky number',
						'lucky number',
						'lucky number',
						];
function renderTooltip() {
	document.getElementById("tooltipMessage").innerHTML = tooltipMessage+"<br /><br />";
	document.getElementById("flavorText").innerHTML = flavorText;
	if (!flavorText)
		document.getElementById("tooltipMessage").innerHTML = tooltipMessage;
}
function changeColor(num) {
	return "<span style=\"color:" + letterColours[num-1]+"\">" + num + "</span>";
}
function setResearchTooltip(num) {
	tooltipMessage = researchMessages[num-1];
	if (!researchMessages[num-1])
		tooltipMessage = "";
	flavorText = researchFlavorTextMessages[num-1];
	if (!researchFlavorTextMessages[num-1])
		flavorText = "";
	document.getElementById("tooltip").className = "footer text";
	renderTooltip();
}
function setUpgradeTooltip(num) {
	tooltipMessage = upgradeMessages[num-1];
	if (!upgradeMessages[num-1])
		tooltipMessage = "";
	flavorText = flavorTextMessages[num-1];
	if (!flavorTextMessages[num-1])
		flavorText = "";
	document.getElementById("tooltip").className = "footer text";
	renderTooltip();
}
function setTooltip(num) {
	if (num<8)
		tooltipMessage = "Generates 1 " + changeColor(num) + " per second, multiplied by (1+each amount of higher generators)";
	else
		tooltipMessage = "Generates [amount you have]x[amount of illegal numbers] " + changeColor(num) + "\'s per second";
		flavorText = "";
	document.getElementById("tooltip").className = "footer text";
	renderTooltip();
}
function cancelTooltip() {
	tooltipMessage = "";
	flavorText = "";
	document.getElementById("tooltip").className = "text";
	renderTooltip();
}