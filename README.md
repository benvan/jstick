#jstick

## Simple javascript joystick utility with no dependencies

# Usage:
```html
	<script src="js/jstick.js" type="text/javascript"></script>
```
```javascript	
	var jstick = new JStick({
		target: // some dom element
		onactivate: ...,
		onrelease: ...,
		ondrag: ...
	});

	// user clicked/dragged 5x10
	jstick.dx()    // 5
	jstick.dy()    // 10

	// specifying sensitivity
	jstick.dx(2)   // 0.05
	jstick.dx(3)   // 0.005

	// arbitrary (non-integer) sensitivities
	jstick.dx(3.1) // 0.003971...
```

