# zizoom
Lightweight jquery plugin magnify image

## Usage

1. Include jQuery:

	```html
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include ZoomToo code:

	```html
	<script src="dist/jquery.zizoom.js"></script>
	```

3. Markup the container element:

	```html
	<div class="photo" data-zoom="../assets/img/big.jpg" >
		<img src="../assets/img/small.jpg" alt="Photo must be zoomed" >
	</div>
	```

4. Call the plugin:

	```javascript
	$(".photo").zizoom();
	```

## Options

1. Activate Method:

	Select activation method.

	```html
	activate    : 'hover', 'click'
	```

	hover: on mouse over (default)
	click: onmouse click

2. Data name for zoomed img:

	Select activation method.

	```html
	dataElement : 'zoom'
	```
	zoom  (default) - retrieve form data-zoom 

3. Icon:

	Font icon reference.
	Used if you select 'click' option on activated method

	```html
	zoomicon : 'fa fa-search'
	```

	'fa fa-search' (default). As default use font-awersome search icon

3. Icon color:

	Font icon reference.
	Used if you select 'click' option on activated method

	```html
	zoomcolor : '#fff'
	```

	'#fff' (default). color Hex 

