var number = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var baseCosts = [0, 10, 100, 1000, 420420, 666, 7777777, 88888888, 999999999];
var discounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var costs = [0, 10, 100, 1000, 420420, 666, 7777777, 88888888, 999999999];
var largestNumberAchieved = 1;

var generatorCosts = [[1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,8], [1,9]];
var generatorDiscounts = [1, 1, 1, 1, 1, 1, 1, 1];
var generatorEffects = [0, 0, 0, 0, 0, 0, 0, 0];
var generatorMultiplier = [1, 1, 1, 1, 1, 1, 1, 1];
var generatorBoost = 1;

var upgradeCosts = [[[11111, 1]], [[22222, 2]], [[33333, 3]], [[44444, 4]], [[111111, 1]], [[222222, 2]], [[333333, 3]], [[444444, 4]], [[11111, 1]], [[22222, 2]], [[33333, 3]], [[44444, 4]],[[111111, 1], [22222, 2], [3333, 3]], [[2, 5]], [[10000000000, 2]], [[1000000000, 1]], [[666, 6]], [[50000000000000, 1]], [[555555, 5]],[[1000000000000, 2]],[[10000, 4]], [[4444444, 4]],[[50000000000000, 1],[333333333, 3]],[[6666, 6]],[[6666, 6]],[[6666, 6]],[[6666, 6]],[[6666, 6]]];
var displayPermutation = new Array(upgradeCosts.length);
var upgradeEffects = new Array(upgradeCosts.length);

var researchInit = true;
var researchUnlocked = false;
var researchCosts = [[[666, 6]],[[66666, 6]],[[66666, 6]],[[6666, 6]],[[6666, 6]],[[6666, 6]]];
var researchTimers = [10000, 100000, 200000, 500000, 500000, 1000000];
var researchPermutation = new Array(researchCosts.length);
var researchEffects = new Array(researchCosts.length);
var researchCounting = new Array(researchCosts.length);
var researchCurrentTime = new Array(researchCosts.length);
var researchActivated = new Array(researchCosts.length);

var multiplierCosts = [[[1000, 2], [1000, 3], [1000, 4], [1000, 5], [1000, 6], [1000, 7], [1000, 8], [1000, 9]], [[1000000, 2], [1000000, 3], [1000000, 4], [1000000, 5], [1000000, 6], [1000000, 7], [1000000, 8], [1000000, 9]]]
var multiplierMultipliers = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]];

var letterColours = ["#000000", "#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF5500", "#8000FF", "#FF00FF", "#863200"];

var upgradeTimer = false;
var saveTimer = false;
var clickTimer = false;
var ok = false;
var mainInterval = 50;

var multiClick = true;
var clickTime = 1000;
var upgradeTime = 250;
var clickNo = 1;
var clickButton = 0;
var upgradeButton = 0;

var buttonUnlocked = false;
var offset = 3;

var bigAutoUnlocked = false;
var generatorAuto = false;
var auto = false;

//var yes = true;
//var ayes = true;

var fourtyTwoUnlocked = false;
var thirteenUnlocked = false;
var fourModTen = false;
var fourModTenActivated = false;
var twosToo = false;
var twosTooActivated = false;
var twosTooTemporary = 0;
var twosTooOriginal = 0;

var sevensCounter = 0;
var sevensGenerator = 0;
var discounterInterval = 100;

var startTime = 0;
var elapsedTime = 0;
var totalElapsedTime = 0;

function bigButtonPress() {
	offset+=25;
	if (offset>603)
		offset=603;
}
function buttonPress(num) {
	if (!auto)
		button(num);
}
function button(num) {
	if (num==1) {
		i=0;
		c=clickNo;
		if (!multiClick)
				c = 1;
		while(i<c) {
			number[num-1]++;
			i++;
		}
	}
	else {
		if (number[num-2]>=costs[num-1]) {
			i = 0;
			c = clickNo;
			if (!multiClick)
				c = 1;
			while(number[num-2]>=costs[num-1]&&i<c) {
				number[num-2]-=costs[num-1];
				number[num-1]++;
				i++;
			}
		}
	}
	render();
}
function toggle() {
	multiClick = !multiClick;
	render();
}
function clickToggle() {
	auto = !auto;
	render();
}
function clickUpgradeToggle() {
	if(bigAutoUnlocked)
	generatorAuto = !generatorAuto;
	render();
}
function checkPrice() {
	var biggest = 0;
	for (i=1; i<number.length; i++) {
		if (number[i-1]>0) {
			biggest = i;
		}
	}
	if (largestNumberAchieved>biggest)
		biggest = largestNumberAchieved;
	if (biggest>=number.length)
		biggest = number.length-1;
	for (num=(biggest-1); num>0; num--) {
		document.getElementById((num+2)+"Button").className = "sick text";
		document.getElementById((num+2)+"Cost").className = "sick text";
		document.getElementById("cost" + (num+2)).className = "sick text";
		document.getElementById((num+2)+"Option").style.width = "auto";
		document.getElementById((num+2)+"Option").style.height = "auto";
		document.getElementById((num+2)+"Option").style.overflow = "visible";
	}
	checkUnlockPrices();
	checkResearchPrices();
	checkButton();
}
function largestTierOwned() {
	var tier = 0;
	for (i=0; i<number.length; i++) {
		if (number[i]>0) {
			tier = i;
		}
	}
	return (tier+1);
}
function checkUnlockPrices() {
	var x = largestTierOwned();
	var unlocked = new Array(upgradeCosts.length);
	for (i=0; i<upgradeCosts.length; i++) {
			if (upgradeEffects[i]) {
				unlocked[i] = true;
				continue;
			}
			if (upgradeCosts[i][upgradeCosts[i].length-1][1]<=x||largestNumberAchieved>=upgradeCosts[i][upgradeCosts[i].length-1][1]) {
				unlocked[i] = true;
			} else {
				unlocked[i] = false;
			}
	}
	setTimeout(function() {
	for (i=0; i<unlocked.length; i++) {
		if (unlocked[i]) {
			document.getElementById("UnlockButton"+(i+1)).className = "sick text";
			document.getElementById("UnlockCost"+(i+1)).className = "sick text";
			document.getElementById("UnlockPrice"+(i+1)).className = "sick text";
			document.getElementById("Unlock"+(i+1)).className = "center sick text";
			document.getElementById("Unlocked"+(i+1)).style.width = "auto";
			document.getElementById("Unlocked"+(i+1)).style.height = "auto";
			document.getElementById("Unlocked"+(i+1)).style.overflow = "visible";
			document.getElementById("Unlocked"+(i+1)).style.paddingLeft = "20px";
			document.getElementById("Unlocked"+(i+1)).style.paddingRight = "20px";
		}
	}
	}, 1);
}
function checkResearchPrices() {
	var x = largestTierOwned();
	var unlocked = new Array(researchCosts.length);
	for (i=0; i<researchCosts.length; i++) {
			if (researchEffects[i]) {
				unlocked[i] = true;
				continue;
			}
			if (researchCosts[i][researchCosts[i].length-1][1]<=x||largestNumberAchieved>=upgradeCosts[i][upgradeCosts[i].length-1][1]) {
				unlocked[i] = true;
			} else {
				unlocked[i] = false;
			}
	}
	setTimeout(function() {
	for (i=0; i<unlocked.length; i++) {
		if ((unlocked[i])&&researchUnlocked) {
			document.getElementById("ResearchButton"+(i+1)).className = "sick text";
			document.getElementById("ResearchCost"+(i+1)).className = "sick text";
			document.getElementById("ResearchPrice"+(i+1)).className = "sick text";
			document.getElementById("Research"+(i+1)).className = "sick text";
			document.getElementById("Researched"+(i+1)).style.width = "auto";
			document.getElementById("ResearchTimer"+(i+1)).className = "sick text";
			document.getElementById("Researched"+(i+1)).style.height = "auto";
			document.getElementById("Researched"+(i+1)).style.overflow = "visible";
			document.getElementById("Researched"+(i+1)).style.paddingLeft = "20px";
			document.getElementById("Researched"+(i+1)).style.paddingRight = "20px";
		}
	}
	if (researchUnlocked)
		document.getElementById("researchMain").className = "sick resources";
		if (researchInit) {
			document.getElementById("researchMain").innerHTML += "<br />";
			researchInit = false;
		}
	}, 1);
}
function checkButton() {
	setTimeout(function() {
		if (buttonUnlocked) {
			document.getElementById("buttonMain").className = "sick resources";
		}
	}, 1);
}
function getCost(num) {
	return costs[num-1];
}
function initUnlocked() {
	var c = new Array(upgradeCosts.length);
	for (i=0; i<upgradeCosts.length; i++) {
		c[i] = 1;
		for (j=0; j<upgradeCosts[i].length; j++) {
			if (upgradeCosts[i][j][1]>c[i])
				c[i]=upgradeCosts[i][j][1];
		}
	}
	var d=0;
	var prePermutation = new Array(upgradeCosts.length);
	for (i=1; i<number.length+1; i++) {
		var initialD=d;
		for (j=0; j<c.length; j++) {
			if (c[j]==i) {
				prePermutation[d] = j;
				d++;
			}
		}
		var costsD = new Array(d-initialD);
		for (k=initialD; k<d; k++) {
			costsD[k-initialD] = upgradeCosts[prePermutation[k]][upgradeCosts[prePermutation[k]].length-1][0];
		}
		var costTemplate = new Array(costsD.length);
		for (k=0; k<costsD.length; k++) {
			costTemplate[k] = costsD[k];
		}
		costsD.sort(function(a, b) {
  return a - b;
});
		var costPermutations = new Array(costsD.length);
		for (num=0; num<costsD.length; num++) {
		for (k=0; k<costsD.length; k++) {
			if (costsD[num] == costTemplate[k]) {
				costPermutations[num] = k;
				costTemplate[k] = -1;
				break;
			}
		}
		}
		for (k=initialD; k<d; k++) {
			displayPermutation[k] = prePermutation[costPermutations[k-initialD]+initialD];
		}
	}
	var string = "";
	for (i=1; i<upgradeCosts.length+1; i++) {
		upgradeEffects[i-1] = false;
		string += "<div id=\"Unlocked"+(displayPermutation[i-1]+1)+"\" class=\"hidden center inline unit\"><img src=\"upgrades/upgrade"+(displayPermutation[i-1]+1)+".png\" id=\"UnlockButton"+(displayPermutation[i-1]+1)+"\" onMouseOver=\"setUpgradeTooltip("+(displayPermutation[i-1]+1)+")\" onMouseOut=\"cancelTooltip()\" onClick=\"acquire("+(displayPermutation[i-1]+1)+")\" align=middle class=\"dank text\" /><br /><div class=\"center inline\"><div id=\"UnlockCost"+(displayPermutation[i-1]+1)+"\" class=\"dank text\">Cost: </div><div class=\"dank text\" id=\"UnlockPrice"+(displayPermutation[i-1]+1)+"\"></div></div><div class=\"dank text\" id=\"Unlock"+(displayPermutation[i-1]+1)+"\"><span style=\"color:red\">Not Acquired</span></div></div>";
	}
	document.getElementById("unlocks").innerHTML = string;
}
function initResearch() {
	var c = new Array(researchCosts.length);
	for (i=0; i<researchCosts.length; i++) {
		c[i] = 1;
		for (j=0; j<researchCosts[i].length; j++) {
			if (researchCosts[i][j][1]>c[i])
				c[i]=researchCosts[i][j][1];
		}
	}
	var d=0;
	var prePermutation = new Array(researchCosts.length);
	for (i=1; i<number.length+1; i++) {
		var initialD=d;
		for (j=0; j<c.length; j++) {
			if (c[j]==i) {
				prePermutation[d] = j;
				d++;
			}
		}
		var costsD = new Array(d-initialD);
		for (k=initialD; k<d; k++) {
			costsD[k-initialD] = researchCosts[prePermutation[k]][researchCosts[prePermutation[k]].length-1][0];
		}
		var costTemplate = new Array(costsD.length);
		for (k=0; k<costsD.length; k++) {
			costTemplate[k] = costsD[k];
		}
		costsD.sort(function(a, b) {
  return a - b;
});
		var costPermutations = new Array(costsD.length);
		for (num=0; num<costsD.length; num++) {
		for (k=0; k<costsD.length; k++) {
			if (costsD[num] == costTemplate[k]) {
				costPermutations[num] = k;
				costTemplate[k] = -1;
				break;
			}
		}
		}
		for (k=initialD; k<d; k++) {
			researchPermutation[k] = prePermutation[costPermutations[k-initialD]+initialD];
		}
	}
	var string = "";
	for (i=1; i<researchCosts.length+1; i++) {
		researchEffects[i-1] = false;
		researchCounting[i-1] = false;
		researchCurrentTime[i-1] = 100000000000000000000;
		researchActivated[i-1] = false;
		string += "<div id=\"Researched"+(researchPermutation[i-1]+1)+"\" class=\"hidden center inline unit\"><img src=\"upgrades/upgrade17.png\" id=\"ResearchButton"+(researchPermutation[i-1]+1)+"\" onMouseOver=\"setResearchTooltip("+(researchPermutation[i-1]+1)+")\" onMouseOut=\"cancelTooltip()\" onClick=\"acquireR("+(researchPermutation[i-1]+1)+")\" align=middle class=\"dank text\" /><br /><div class=\"center inline\"><div id=\"ResearchCost"+(researchPermutation[i-1]+1)+"\" class=\"dank text\">Cost: </div><div class=\"dank text\" id=\"ResearchPrice"+(researchPermutation[i-1]+1)+"\"></div></div><br /><div class=\"dank text\" id=\"ResearchTimer"+(researchPermutation[i-1]+1)+"\">0s</div><div class=\"dank text\" id=\"Research"+(researchPermutation[i-1]+1)+"\"><span style=\"color:red\">Not Acquired</span></div></div>";
	}
	document.getElementById("research").innerHTML = string;
}
function initBackground() {
	var string = "";
	for (i=0; i<number.length; i++) {
		for (j=0; j<20; j++)
				string += "<img id=\"Background"+(i+1)+"-"+(j+1)+"\" class=\"back\" src=\"numbers/"+(i+1)+".png\" />";
	}
	document.getElementById("fly").innerHTML = string;
}
function initGenerators() {
	var string = "";
	for (i=1; i<generatorEffects.length+1; i++) {
		string += "<div class=\"center inline sheep\"><img src=\"generators/gear"+i+".png\" id=\"Upgrade"+i+"\" onMouseOver=\"setTooltip("+i+"), autoUpgradeClick("+i+")\" onMouseOut=\"cancelTooltip(), cancelUpgradeAuto()\" onClick=\"upgrade("+i+")\" align=middle class=\"text\" /><br /><div class=\"center inline\"><span id=\"UpgradeCost"+i+"\" class=\"text\">Cost: </span><span class=\"text\" id=\"UpgradePrice"+i+"\" /></div><br /><div class=\"center text\" id=\"UpAmount"+i+"\">You have: 0</div><div id=\"UpgradeMultiplier"+i+"\" class=\"center text\">Multiplier: x1</div></div>"
	}
	document.getElementById("generators").innerHTML = string;
}
function initNumbers() {
	var string = '<h2 class="text" style="text-align:left; font-size:48px">Numbers</h2>';
	for (i=1; i<number.length+1; i++) {
		string += '<span id="'+i+'Counter" class="text counter">0 '+i+'\'s</span><br />';
	}
	document.getElementById("counters").innerHTML = string;
}
function initClickers() {
	var string = "";
	for (i=1; i<number.length+1; i++) {
		if (i>2)
			string+='<div id="'+i+'Option" class="hidden inline center sheep">';
		else
			string+='<div class="inline center sheep">';
		string += '<img src="numbers/'+i+'.png" id="'+i+'Button" onmouseout="cancelAuto()" onmouseover="autoClick('+i+')" onClick="buttonPress('+i+')" align=middle class="text" /><br /><div class="center inline"><span id="'+i+'Cost" class="text">Cost: </span><span class="text" id="cost'+i+'"/></div></div>';
	}
	document.getElementById("buttons").innerHTML = string;
}
function initMultipliers() {
	var string = "";
	for (j=0; j<multiplierMultipliers.length; j++) {
	string += '<tr class="center">';
	for (i=1; i<number.length; i++) {
		string += '<td><img src="numbers/'+i+'.png" onMouseOver="setMultiplierTooltip('+i+')" onMouseOut="cancelTooltip()" onclick="multiplierPress('+(j+1)+','+i+')"/><br /><div class="center inline"><span id="MultiplierCost'+(j+1)+'-'+i+'" class="text">Cost: </span><span class="text" id="MultiplierPrice'+(j+1)+'-'+i+'" /></div><br /><div id="MultiplierMultiplier'+(j+1)+'-'+i+'" class="center text">Multiplier: x1</div></div></td>';
	}
	string += '</tr>';
	}
	document.getElementById("multipliers").innerHTML = string;
}
function init() {
	var d = new Date();
	startTime = d.getTime();
	initNumbers();
	initClickers();
	initGenerators();
	initUnlocked();
	initResearch();
	initBackground();
	initMultipliers();
	load();
	startUpgrades();
	renderCosts();
	for (i = 0; i < generatorCosts.length; i++) {
		document.getElementById("UpgradePrice"+(i+1)).innerHTML = Math.round(generatorCosts[i][0]*generatorDiscounts[i]) + " " + changeColor(generatorCosts[i][1]) + "'s";
	}
	for (i = 0; i < upgradeCosts.length; i++) {
		for (j = 0; j < upgradeCosts[i].length; j++) {
			if (j==0)
				document.getElementById("UnlockPrice"+(i+1)).innerHTML = upgradeCosts[i][j][0]+" "+changeColor(upgradeCosts[i][j][1])+"'s";
			else
				document.getElementById("UnlockPrice"+(i+1)).innerHTML += "<br />" + upgradeCosts[i][j][0]+" "+changeColor(upgradeCosts[i][j][1])+"'s"
		}
	}
	for (i = 0; i < researchCosts.length; i++) {
		for (j = 0; j < researchCosts[i].length; j++) {
			if (j==0)
				document.getElementById("ResearchPrice"+(i+1)).innerHTML = researchCosts[i][j][0]+" "+changeColor(researchCosts[i][j][1])+"'s";
			else
				document.getElementById("ResearchPrice"+(i+1)).innerHTML += "<br />" + researchCosts[i][j][0]+" "+changeColor(researchCosts[i][j][1])+"'s"
		}
	}
	for (i=0; i<researchTimers.length; i++) {
		document.getElementById("ResearchTimer"+(i+1)).innerHTML = Math.round(researchTimers[i]/1000) + "s";
	}
	ok = setInterval(timer, mainInterval);
	saveTimer = setInterval(save, 10000);
	var blah = setInterval(backgroundTick, 100);
	render();
}
function checkClick() {
	if (auto) {
		button(clickButton);
	}
}
function checkUpgrade() {
	if (generatorAuto&&bigAutoUnlocked) {
		upgradePress(upgradeButton);
	}
}
function autoClick(num) {
	clickButton = num;
	clickTimer = setInterval(checkClick, clickTime);
}
function cancelAuto() {
	clickButton = 0;
	clearInterval(clickTimer);
}
function autoUpgradeClick(num) {
	upgradeButton = num;
	upgradeTimer = setInterval(checkUpgrade, upgradeTime);
}
function cancelUpgradeAuto() {
	upgradeButton = 0;
	clearInterval(upgradeTimer);
}
function buttonTick() {
	offset--;
	if (offset<3)
		offset=3;
	generatorBoost = 10-Math.round(Math.abs(300-(offset-3))/(300/9));
}
function timer() {
	checkFourtyTwo();
	checkThirteen();
	checkFourModTen();
	checkTwosToo();
	var d = new Date();
	elapsedTime = d.getTime()-startTime;
	totalElapsedTime += elapsedTime;
	generatorsTick();
	researchTick();
	buttonTick();
	discountersTick();
	for (i=0; i<costs.length; i++) {
		costs[i] = baseCosts[i]-discounts[i];
	}
	if (number[6]>=100)
		document.getElementById("winrar").innerHTML = "U R WINRAR";
	for (i=1; i<number.length+1; i++) {
		if (number[i-1]>0&&largestNumberAchieved<i) {
			largestNumberAchieved = i;
		}
	}
	render();
	d = new Date();
	startTime = d.getTime();
}
function backgroundTick() {
	for (i=0; i<number.length; i++) {
		for (j=0; j<20; j++) {
			if (number[i]>=1)
				length = Math.floor(Math.log(number[i]))+1;
			else
				length = 0;
			if (j<length) {
				document.getElementById("Background"+(i+1)+"-"+(j+1)).style.visibility = "visible";
			}else {
				document.getElementById("Background"+(i+1)+"-"+(j+1)).style.visibility = "hidden";
				continue;
			}
			document.getElementById("Background"+(i+1)+"-"+(j+1)).style.top = (Math.round(150*Math.random())+30)+"px";
			document.getElementById("Background"+(i+1)+"-"+(j+1)).style.right = (Math.round(150*Math.random())+30)+"px";
		}
	}
}
function skippedTicks() {
	return ((Math.floor(totalElapsedTime/mainInterval))-Math.floor((totalElapsedTime-elapsedTime)/mainInterval));
}
function skippedTicksDiscounters() {
	return ((Math.floor(totalElapsedTime/discounterInterval))-Math.floor((totalElapsedTime-elapsedTime)/discounterInterval));
}
function generatorsTick() {
	var lagMultiplier = skippedTicks();
	for (i=0; i<generatorEffects.length; i++) {
		if (generatorEffects[i]>0) {
			if (i<generatorEffects.length-1) {
				var multiplier = 1;
				for (j=generatorEffects.length-1; j>i; j--)
					multiplier*=(1+generatorEffects[j]);
				number[i]+=(generatorEffects[i]*multiplierMultipliers[0][i]*multiplierMultipliers[1][i]*generatorMultiplier[i]*multiplier*generatorBoost*lagMultiplier*mainInterval/1000);
			}
			else
				number[i]+=(generatorEffects[i]*multiplierMultipliers[0][i]*multiplierMultipliers[1][i]*generatorMultiplier[i]*lagMultiplier*mainInterval/1000);
		}
	}
}
function researchTick() {
	for (i=0; i<researchCosts.length; i++) {
		if (researchEffects[i]&&!researchCounting[i]) {
			var d = new Date();
			researchCurrentTime[i] = d.getTime();
			researchCounting[i] = true;
		}
		var d = new Date();
		if ((d.getTime()-researchCurrentTime[i])>researchTimers[i]&&!researchActivated[i]) {
			actionR(i);
			researchActivated[i] = true;
		}
	}
}
function renderButton() {
	document.getElementById("pointer").style.left = offset+2+"px";
	document.getElementById("buttonMultiplier").innerHTML = "Generator Multiplier: x"+generatorBoost;
}
function render() {
	renderGenerators();
	renderMultipliers();
	renderResources();
	renderUpgrades();
	renderResearch();
	renderButton();
	renderCosts();
	if (multiClick)
		document.getElementById("toggle").innerHTML = "Toggle Multiclick (<span style=\"color:green\">on</span>)";
	else
		document.getElementById("toggle").innerHTML = "Toggle Multiclick (<span style=\"color:red\">off</span>)";
	if (auto)
		document.getElementById("clickToggle").innerHTML = "Toggle Autoclick (<span style=\"color:green\">on</span>)";
	else
		document.getElementById("clickToggle").innerHTML = "Toggle Autoclick (<span style=\"color:red\">off</span>)";
	if (bigAutoUnlocked)
		if (generatorAuto)
			document.getElementById("clickUpgradeToggle").innerHTML = "Toggle Autoclick (<span style=\"color:green\">on</span>)";
		else
			document.getElementById("clickUpgradeToggle").innerHTML = "Toggle Autoclick (<span style=\"color:red\">off</span>)";
	else
		document.getElementById("clickUpgradeToggle").innerHTML = "Toggle Autoclick (<span style=\"color:blue\">locked</span>)";
	checkPrice();
}
function changeColor(num) {
	return "<span style=\"color:" + letterColours[num-1]+"\">" + num + "</span>";
}
function renderCosts() {
	for (i = 0; i < costs.length; i++) {
		if (i!=0)
			document.getElementById("cost" + (i+1)).innerHTML = getCost(i+1) + " " + changeColor(i) + "'s";
		else
			document.getElementById("cost" + (i+1)).innerHTML = 0;
	}
}
function renderResources() {
	for (i=0; i<number.length; i++) {
		document.getElementById((i+1)+"Counter").innerHTML = Math.floor(number[i]) + " " + changeColor(i+1) + "'s";
	}
}
function renderGenerators() {
	for (i=0; i<generatorEffects.length; i++) {
		document.getElementById("UpAmount"+(i+1)).innerHTML = "You have: " + generatorEffects[i];
		var multiplier = 1;
		for (j=generatorEffects.length-1; j>i; j--)
			multiplier*=(1+generatorEffects[j]);
		document.getElementById("UpgradeMultiplier"+(i+1)).innerHTML = "Multiplier: x"+generatorMultiplier[i]*multiplier;
		}
	for (i = 0; i < generatorCosts.length; i++) {
		document.getElementById("UpgradePrice"+(i+1)).innerHTML = Math.round(generatorCosts[i][0]*generatorDiscounts[i]) + " " + changeColor(generatorCosts[i][1]) + "'s";
	}
}
function renderMultipliers() {
	for (i=0; i<multiplierMultipliers.length; i++) {
		for (j=0; j<multiplierMultipliers[i].length; j++) {
			document.getElementById("MultiplierMultiplier"+(i+1)+"-"+(j+1)).innerHTML = "Multiplier: x"+multiplierMultipliers[i][j];
			document.getElementById("MultiplierPrice"+(i+1)+"-"+(j+1)).innerHTML = Math.round(multiplierCosts[i][j][0]) + " " + changeColor(multiplierCosts[i][j][1]) + "'s";
		}
	}
}
function renderUpgrades() {
	for (i=0; i<upgradeEffects.length; i++) {
		document.getElementById("Unlock"+(i+1)).innerHTML = displayBoolean(upgradeEffects[i]);
	}
}
function renderResearch() {
	for (i=0; i<researchEffects.length; i++) {
		document.getElementById("Research"+(i+1)).innerHTML = displayBoolean(researchEffects[i]);
		var d = new Date();
		if (researchEffects[i]) {
			if ((d.getTime()-researchCurrentTime[i])<researchTimers[i])
			document.getElementById("ResearchTimer"+(i+1)).innerHTML = Math.ceil((researchTimers[i]-(d.getTime()-researchCurrentTime[i]))/1000)+"s";
			else
				document.getElementById("ResearchTimer"+(i+1)).innerHTML = "0s";
		}
	}
}
function displayBoolean(bool) {
	if (bool)
		return "<span style=\"color:green\">Acquired</span>";
	else
		return "<span style=\"color:red\">Not Acquired</span>";
}
function acquire(number1) {
	var num1=number1-1;
	for (i=0; i<upgradeCosts[num1].length; i++) {
		if (upgradeEffects[num1]||number[upgradeCosts[num1][i][1]-1]<upgradeCosts[num1][i][0]) {
			break;
		} else if (i==upgradeCosts[num1].length-1) {
				action(num1);
				render();
				upgradeEffects[num1] = true;
				for (j=0; j<upgradeCosts[num1].length; j++) {
					number[upgradeCosts[num1][j][1]-1] -= upgradeCosts[num1][j][0];
				}
			}
	}
	render();
}
function acquireR(number1) {
	var num1=number1-1;
	for (i=0; i<researchCosts[num1].length; i++) {
		if (researchEffects[num1]||number[researchCosts[num1][i][1]-1]<researchCosts[num1][i][0]) {
			break;
		} else if (i==researchCosts[num1].length-1) {
				researchEffects[num1] = true;
				for (j=0; j<researchCosts[num1].length; j++) {
					number[researchCosts[num1][j][1]-1] -= researchCosts[num1][j][0];
				}
			}
	}
	render();
}
function save() {
	var save = {
		number: number,
		generatorEffects: generatorEffects,
		upgradeEffects: upgradeEffects,
		generatorCosts: generatorCosts,
		researchTimers: researchTimers,
		researchEffects: researchEffects,
		largestNumberAchieved: largestNumberAchieved,
		researchCounting: researchCounting,
		researchCurrentTime: researchCurrentTime,
		sevensCounter: sevensCounter,
		multiplierMultipliers: multiplierMultipliers,
		multiplierCosts: multiplierCosts
	};
	localStorage.setItem("save", JSON.stringify(save));
}
function load() {
	var save = JSON.parse(localStorage.getItem("save"));
	if (!save) {
		return;
	}
	if (typeof save.largestNumberAchieved !== "undefined")
		largestNumberAchieved = save.largestNumberAchieved;
	if (typeof save.sevensCounter !== "undefined")
		sevensCounter = save.sevensCounter;
	if (typeof save.multiplierMultipliers !== "undefined")
		multiplierMultipliers = save.multiplierMultipliers;
	if (typeof save.multiplierCosts !== "undefined")
		multiplierCosts = save.multiplierCosts;
	if (typeof save.number !== "undefined")
	for (i=0; i<save.number.length; i++)
		if (typeof save.number[i] !== "undefined")
			number[i] = save.number[i];
	if (typeof save.generatorEffects !== "undefined")
	for (i=0; i<save.generatorEffects.length; i++)
		if (typeof save.generatorEffects[i] !== "undefined")
			generatorEffects[i] = save.generatorEffects[i];
	if (typeof save.researchCounting !== "undefined")
	for (i=0; i<save.researchCounting.length; i++)
		if (typeof save.researchCounting[i] !== "undefined")
			researchCounting[i] = save.researchCounting[i];
	if (typeof save.researchCurrentTime !== "undefined")
	for (i=0; i<save.researchCurrentTime.length; i++)
		if (typeof save.researchCurrentTime[i] !== "undefined")
			researchCurrentTime[i] = save.researchCurrentTime[i];
	if (typeof save.generatorCosts !== "undefined")
	for (i=0; i<save.generatorCosts.length; i++)
		if (typeof save.generatorCosts[i] !== "undefined")
			generatorCosts[i] = save.generatorCosts[i];
	if (typeof save.upgradeEffects !== "undefined")
	for (i=0; i<upgradeEffects.length; i++)
		if (typeof save.upgradeEffects[i] !== "undefined")
			upgradeEffects[i] = save.upgradeEffects[i];
	if (typeof save.researchEffects !== "undefined")
	for (i=0; i<researchEffects.length; i++)
		if (typeof save.researchEffects[i] !== "undefined")
			researchEffects[i] = save.researchEffects[i];
	if (typeof save.researchTimers !== "undefined")
	for (i=0; i<researchTimers.length; i++)
		if (typeof save.researchTimers[i] !== "undefined")
			researchTimers[i] = save.researchTimers[i];
}
function startUpgrades() {
	for (i=0; i<upgradeEffects.length; i++) {
		if (upgradeEffects[i]) {
			action(i);
		}
	}
}
function action(j) {
		switch(j) {
			case 0:
			case 1:
			case 2:
			case 3:
				clickNo*=5;
				break;
			case 4:
			case 5:
			case 6:
			case 7:
				generatorMultiplier[j-4]*=69;
				break;
			case 8:
			case 9:
			case 10:
			case 11:
				clickTime/=2;
				break;
			case 12:
				bigAutoUnlocked = true;
				break;
			case 13:
				discounts[4] = 420419;
				break;
			case 14:
				fourtyTwoUnlocked = true;
				break;
			case 15:
				thirteenUnlocked = true;
				break;
			case 16:
				researchUnlocked = true;
				break;
			case 17:
			case 19:
				generatorDiscounts[1]*=0.001;
				break;
			case 18:
				generatorMultiplier[4]*=69;
				break;
			case 20:
				buttonUnlocked = true;
				break;
			case 21:
				fourModTen = true;
				break;
			case 22:
				twosToo = true;
				break;
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
				generatorMultiplier[4]*=5;
				break;
			default:
				alert("i messed up the code");
				break;
		}
}
function actionR(num) {
	switch (num) {
		case 0:
			sevensGenerator+=5;
			break;
		case 1:
			sevensGenerator+=100;
			break;
		case 2:
			sevensGenerator+=100;
			break;
		case 3:
			sevensGenerator+=25;
			break;
		case 4:
			sevensGenerator+=25;
			break;
		case 5:
			sevensGenerator+=25;
			break;
		default:
			alert("i messed up the code");
			break;
	}
}
function checkFourtyTwo() {
	if (fourtyTwoUnlocked&&generatorEffects[1]>30) {
		discounts[3] = 15*(generatorEffects[1]-30);
		if (discounts[3]>990)
			discounts[3] = 990;
	}
}
function checkThirteen() {
	if (thirteenUnlocked) {
		generatorCosts[2][0]=Math.pow(1.3, generatorEffects[2])/Math.pow(1.2, generatorEffects[0]);
		generatorCosts[0][0]=Math.pow(1.3, generatorEffects[0])/Math.pow(1.2, generatorEffects[0]);
	}
}
function checkFourModTen() {
	if (fourModTen) {
		if ((generatorEffects[3]%10) == 0&&!fourModTenActivated) {
			generatorMultiplier[3] *=10;
			fourModTenActivated = true;
		} else if ((generatorEffects[3]%10) != 0&&fourModTenActivated) {
			generatorMultiplier[3] = Math.round(generatorMultiplier[3]/10);
			fourModTenActivated = false;
		}
	}
}
function checkTwosToo() {
	if (twosToo) {
		var currentTwos = Math.floor(Math.round(generatorEffects[1]*10000/3)/10000)
		if (twosTooTemporary!=currentTwos) {
			generatorMultiplier[1] = Math.round(generatorMultiplier[1]/(twosTooTemporary+1));
			twosTooTemporary = currentTwos;
			generatorMultiplier[1] *= (twosTooTemporary+1);
		}
	}
}
function discountersTick() {
	var lagMultiplier = skippedTicksDiscounters();
	sevensCounter += sevensGenerator*lagMultiplier*discounterInterval/1000;
	if (sevensCounter > 7777000)
		discounts[6] = 7777000;
	else
		discounts[6] = Math.round(sevensCounter);
}
function smaller(num1, num2) {
	if (num1<=num2)
		return num1;
	else
		return num2;
}
function upgradePress(num) {
	if (number[generatorCosts[num-1][1]-1]>=Math.round(generatorCosts[num-1][0]*generatorDiscounts[num-1])) {
		generatorEffects[num-1]++;
		number[generatorCosts[num-1][1]-1]-=Math.round(generatorCosts[num-1][0]*generatorDiscounts[num-1]);
		generatorCosts[num-1][0]*=1.3;
	}
	render();
}
function multiplierPress(num1, num2) {
	if (number[multiplierCosts[num1-1][num2-1][1]-1]>=Math.round(multiplierCosts[num1-1][num2-1][0])) {
		multiplierMultipliers[num1-1][num2-1]++;
		number[multiplierCosts[num1-1][num2-1][1]-1]-=Math.round(multiplierCosts[num1-1][num2-1][0]);
		multiplierCosts[num1-1][num2-1][0]*=(1.3-0.05*num1);
	}
	render();
}
function upgrade(num) {
	if (!generatorAuto)
		upgradePress(num);
}