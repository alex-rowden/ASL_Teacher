z= 2.326 // .99   significance level
	/* 2.576 .995
	   3.090 .999
	   3.291 .9995
	   3.719 .9999
	   3.891 .99995
	   4.265 .99999 
	in case we are going to use t-test,
	 the table with df= 200:	
	 0.1	0.05	0.02	0.01	0.005	0.002	0.001
	 1.6525	1.9719	2.3451	2.6007	2.8385	3.1315	3.3398
	*/


function pooled_variance(sd){// find the variance of the population
							//note: assume it has same population so the varience are same.
	for (i = 0; i < 3 i++{// pooled varience t-test formular
	var	sp += sd[i]^2;
		sp= sp/3;
		sp = Math.sqrt(sp);
		return sp;
	}
}

function pop_mean(mean){// find the mean of population

	for (i = 0; i < 3 i++{// just the average mean with estimated same varience
	var	mu += mean[i];
	    mu /= 3;
		return mu;
}

function range of mean(z// we can change it to t and then that's all the difference (maybe t test is better)
{// since the simple size is relative huge, we can assume for
	sup = mu + z*sp;
	inf = mu - z*sp;
}

if (newmean <= sup && newmean >= inf) {return true;} else {return false;}