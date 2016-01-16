function stdDeviation(mean, values){
    var sum = 0;
    var distance = 0;
    for (i = 0; i < values.length; i++){
	distance = values - mean;
	sum += distance * distance;
    }
    return sum/values.length;
}

function mean(values){
    var sum = 0;
    for (i = 0; i < value.length; i++){
	sum += distance;
    }
    return sum;
}
