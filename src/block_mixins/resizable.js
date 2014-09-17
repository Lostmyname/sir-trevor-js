/* Adds resize functionality to this block */

SirTrevor.BlockMixins.Resizable = {

  mixinName: "Resizable",
  isDirty: false,

  initializeResizable: function() {
    SirTrevor.log("Adding resizable to block " + this.blockID);

    this.resize_options = _.extend({}, SirTrevor.DEFAULTS.Block.resize_options, this.resize_options);

    this.$inputs.append(this.resize_options.html);

    this.$('.st-resize-size').bind('change', _.bind(this._handleChange, this));
  },

  _handleChange: function(e) {
    this.isDirty = true;
    var size = this.$(".st-resize-size").val();
    this.resize_options.size = size;
    this.resizeObject(size);

    SirTrevor.EventBus.trigger('block:content:resized', this.blockID);
  },

  showResizableInput: function() {
    this.$inputs.show();
    this.$inputs.find(".st-block__resizezone").show();
  },

  setResizableInput: function(value) {
    if (typeof value == "undefined") {
      var data = this.getData();
      value = data.size || "large";
    }

    this.$inputs.find(".st-block__resizezone select").val(value);
  },

  resizeObject: function(size) {
    var obj = this.resize_options.object;
    if (obj != null) {
      var $obj = $(obj);
      var type = $obj.attr("data-object-type")
      $obj.removeClass("yeti-"+type+"-small yeti-"+type+"-medium yeti-"+type+"-large yeti-"+type+"-hero");
      if (size == "small")   { $obj.addClass("yeti-"+type+"-small"); }
      if (size == "medium")  { $obj.addClass("yeti-"+type+"-medium"); }
      if (size == "large")   { $obj.addClass("yeti-"+type+"-large"); }
      if (size == "hero")    { $obj.addClass("yeti-"+type+"-hero"); }

      if (typeof this.resizeHeight === "function") {
        this.resizeHeight(obj);
      }
    }
  },

  setupResizeWidgets: function() {
    this.setResizableInput();
    var data = this.getData();
    this.resizeObject(data.size || this.resize_options.size);
  },

  injectSizeData: function(data) {
    var val = this.$inputs.find(".st-block__resizezone select").val();
    if (this.resizable && this.isDirty) {
      data.size = val;
    }
    return data;
  }


};