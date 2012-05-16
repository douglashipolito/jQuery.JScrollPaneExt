;(function ( $, window, undefined ) {

	var pluginName = 'jScrollPaneExt',
	    document = window.document,
	    defaults = {};

	function Plugin( element, options ) {
		this.element = $(element);
		this.options = $.extend( {}, defaults, options) ;
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	};

	Plugin.prototype.init = function () {
		this.horizontalScroll();
		this.element.jScrollPane.call(this.element, this.options);
	};

	Plugin.prototype.horizontalScroll = function () {
		if(this.options.horizontalScroll) {
			var options = this.options,
			    contentWidth = 0,
			    elementWidth = this.element.width();
			
			$.each(this.element.children(), function(index, item) {
				item = $(item);
				contentWidth += item.outerWidth();
			});
			
			this.element.width(contentWidth);
			this.element.wrap('<div class="wrap-jspWrap" style="width:' + elementWidth + 'px;" />');
			this.element = this.element.parent();
		}
		return false;
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}

}(jQuery, window));
