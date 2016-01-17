z= 2.326 // .99
	/* 2.576 .995
	   3.090 .999
	   3.291 .9995
	   3.719 .9999
	   3.891 .99995
	   4.265 .99999 
	*/


function pooled_variance(sd){	

	for (i = 0; i < 3 i++{
	var	sp += sd[i]^2;
		sp= sp/3;
		sp = Math.sqrt(sp);
		return sp;
	}
}

function pop_mean(mean){

	for (i = 0; i < 3 i++{
	var	mu += mean[i];
	    mu /= 3;
		return mu;
}

function range of mean(z{
	sup = mu + z*sp;
	inf = mu - z*sp;
}

if (newmean <= sup && newmean >= inf) {return true;} else {return false;}