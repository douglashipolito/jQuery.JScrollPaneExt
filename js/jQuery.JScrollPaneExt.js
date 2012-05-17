;(function ( $, window, undefined ) {

	var pluginName = 'jScrollPaneExt',
	    document = window.document,
	    defaults = {
	    	horizontalScroll : true,
	    	contentWidth	 : 'auto',
	    	showArrows		 : true
	    };

	function Plugin( element, options ) {
		this.element = $(element);
		this.options = $.extend( {}, defaults, options) ;
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	};

	Plugin.prototype.init = function () {
		if(this.options.horizontalScroll) {
			this.horizontalScroll();
		}
		this.element.jScrollPane.call(this.element, this.options);
	};

	Plugin.prototype.horizontalScroll = function () {
			var options = this.options,
			    contentWidth = (typeof this.options.contentWidth === 'number') ? this.options.contentWidth : this._defaults.contentWidth,
			    contentHeight = 0,
			    contentContainer = {},
			    item,
			    elementWidth = this.element.width();

			if(contentWidth === 'auto') {
				contentWidth = 0;
				contentContainer = this.options.contentContainer ? $(this.options.contentContainer) : this.element;
				$.each(contentContainer.children(), function() {
					item = $(this);
					contentWidth += item.outerWidth(true);
				});
				contentHeight = item.height();
			}
			
			this.element.width(contentWidth)
						.height(contentHeight + 16)
						.wrap('<div class="wrap-jspWrap" style="width:' + elementWidth + 'px;" />');
			
			this.element = this.element.parent();

			delete this.options['contentWidth'];
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}

}(jQuery, window));
