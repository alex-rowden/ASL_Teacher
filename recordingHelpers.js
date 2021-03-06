
<html>
  <head>
    <script src="//js.leapmotion.com/leap-0.6.4.js"></script>

  </head>

  <body>
    <h1>Recording Data from the Phalanges</h1>
    <div id="output"></div>
    
    <script src="https://js.leapmotion.com/leap-0.6.4.js"></script>
    
    <script type="text/javascript">
    
	
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

function mean_multi(values)
{
	
}

	
    function concatData(id, data) {
      return id + ": " + data + "<br>";
    }
    
    function getFingerName(fingerType) {
      switch(fingerType) {
        case 0:
          return 'Thumb';
        break;
    
        case 1:
          return 'Index';
        break;
    
        case 2:
          return 'Middle';
        break;
    
        case 3:
          return 'Ring';
        break;
    
        case 4:
          return 'Pinky';
        break;
      }
    }
    
    function concatJointPosition(id, position) {
      return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
    }
    
    var output = document.getElementById('output');
    var frameString = "", handString = "", fingerString = "";
    var hand, finger;
    
    // Leap.loop uses browser's requestAnimationFrame
    var options = { enableGestures: true };
	
	var file = fopen("C:\\test.txt", 3);
	if(fh!=-1)
	{
		
	
	
	var hand_confidence, hand_pinch_strength, hand_grab_strength=[];
	var finger_dip = [];
	var finger_pip = [];
	var finger_mcp = [];
	for(var i=0; i<5; i++)//creates joint functions on dip, pip, mcp for x,y,z axis
	{
		finger_dip[i]=[];
		finger_pip[i]=[];
		finger_mcp[i]=[];
	}
    // Main Leap Loop
    Leap.loop(options, function(frame) {
      //frameString = concatData("frame_id", frame.id);
      //frameString += concatData("num_hands", frame.hands.length);
      //frameString += concatData("num_fingers", frame.fingers.length);
      //frameString += "<br>";
    
      // Showcase some new V2 features
      for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        hand_type=hand.type;
		//write hand_type once
        //handString += concatData("confidence", hand.confidence);
		hand_confidence.push(hand.confidence);
		//write hand_confidence after mean, stddev found
        //handString += concatData("pinch_strength", hand.pinchStrength);
        hand_pinch_strength.push(hand.pinchStrength);
		//write hand_pinch_strength after mean, stddev found
		//handString += concatData("grab_strength", hand.grabStrength);
		hand_grab_strength.push(hand.grabStrength);
        //handString += '<br>';
    
        // Helpers for thumb, pinky, etc.
        //fingerString = concatJointPosition("finger_thumb_dip", hand.thumb.dipPosition);
        for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
          finger = hand.fingers[j];
          //fingerString += concatData("finger_type", finger.type) + " (" + getFingerName(finger.type) + ") <br>";
          finger_dip[j][0].push(finger.dipPosition[0]);//x axis
		  finger_dip[j][1].push(finger.dipPosition[1]);//y axis
		  finger_dip[j][2].push(finger.dipPosition[2]);//z axis
		  finger_pip[j][0].push(finger.pipPosition[0]);//x axis
		  finger_pip[j][1].push(finger.pipPosition[1]);//y axis
		  finger_pip[j][2].push(finger.pipPosition[2]);//z axis
		  finger_mcp[j][0].push(finger.mcpPosition[0]);//x axis
		  finger_mcp[j][1].push(finger.mcpPosition[1]);//y axis
		  finger_mcp[j][2].push(finger.mcpPosition[2]);//z axis
		  //fingerString += concatJointPosition("finger_dip", finger.dipPosition);
          //fingerString += concatJointPosition("finger_pip", finger.pipPosition);
          //fingerString += concatJointPosition("finger_mcp", finger.mcpPosition);
          //fingerString += "<br>";
        }
        frameString += handString;
        frameString += fingerString;
      }
    fwrite(file, hand_type);
	fwrite(file, mean(hand_confidence);
	fwrite(file, stdDeviation(hand_confidence);
	fwrite(file, mean(hand_pinch_strength);
	fwrite(file, stdDeviation(hand_pinch_strength);
	fwrite(file, mean(hand_grab_strength);
	fwrite(file, stdDeviation(hand_grab_strength);
	
	for(var i=0; i<5; i++)
	{
		
		for(var j=0; j<3; j++)
		{
			fwrite(file, mean(finger_dip[i][j]));
			
		}
	}
	for(var i = 0; i<5; i++)
	{
		for(var j=0; j<3; j++)
		{
			fwrite(file, stdDeviation(finger_dip[i][j]));
		}
	}
	for(var i = 0; i<5; i++)
	{
		for(var j=0; j<3; j++)
		{
			fwrite(file, mean(finger_pip[i][j]));
		}
	}
	for(var i = 0; i<5; i++)
	{
		for(var j=0; j<3; j++)
		{
				fwrite(file, stdDeviation(finger_pip[i][j]));
		}
	}
	for(var i = 0; i<5; i++)
	{
		for(var j=0; j<3; j++)
		{
			fwrite(file, mean(finger_mcp[i][j]));
		}
	}
	for(var i = 0; i<5; i++)
	{
		for(var j=0; j<3; j++)
		{
			fwrite(file, stdDeviation(finger_mcp[i][j]));		
		}
	}
	
      output.innerHTML = frameString;
    }
    });
    
    </script>
  </body>
</html>




