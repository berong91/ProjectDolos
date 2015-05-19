
	var terrain,
		terrainImage,
		canvas;					

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  terrain.update();
	  terrain.render();
	}
	
	function sprite (options) {
	
		var spin = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		spin.context = options.context;
		spin.width = options.width;
		spin.height = options.height;
		spin.image = options.image;
		
		spin.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		spin.render = function () {
		
		  // Clear the canvas
		  spin.context.clearRect(0, 0, spin.width, spin.height);
		  
		  // Draw the animation
		  spin.context.drawImage(
		    spin.image,
		    frameIndex * spin.width / numberOfFrames,
		    0,
		    spin.width / numberOfFrames,
		    spin.height,
		    0,
		    0,
		    spin.width / numberOfFrames,
		    spin.height);
		};
		
		return spin;
	}
	
	// Get canvas
	canvas = document.getElementById("terrainAnimation");
	canvas.width = 300;
	canvas.height = 300;
	
	// Create sprite sheet
	terrainImage = new Image();	
	
	// Create sprite
	terrain = sprite({
		context: canvas.getContext("2d"),
		width: 2400,
		height: 100,
		image: terrainImage,
		numberOfFrames: 24,
		ticksPerFrame: 10
	});
	
	// Load sprite sheet
	terrainImage.addEventListener("load", gameLoop);
	terrainImage.src = 'terrain100Flip.png';
	//asset/images/spritesheets/

 