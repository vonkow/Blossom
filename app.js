var randPos=function() {
	var rand = Math.random();
	if (rand<0.25) return '{"dir":"u"}';
	if (rand<0.5) return '{"dir":"d"}';
	if (rand<0.75) return '{"dir":"l"}';
	return '{"dir":"r"}';
}

this.dispatch = function(ary) {
	if (ary[0]=='randpos') return randPos();
};

