/* Adds position functionality to this block */

SirTrevor.BlockMixins.Positionable = {

  mixinName: "Positionable",
  isDirty: false,

  initializePositionable: function() {
    SirTrevor.log("Adding positionable to block " + this.blockID);

    this.position_options = _.extend({}, SirTrevor.DEFAULTS.Block.position_options, this.position_options);

    this.$inputs.append(this.position_options.html);

    this.$('.st-position-location').bind('change', _.bind(this._handleChange, this));
  },

  _handleChange: function(e) {
    this.isDirty = true;
    var position = this.getCurrentSelectedPosition();
    this.position_options.position = position;
    this.repositionObject(position);

    SirTrevor.EventBus.trigger('block:content:positioned', this.blockID);
  },

  getCurrentSelectedPosition: function() {
    return this.$(".st-position-location").val();
  },

  showPositionInput: function() {
    this.$inputs.show();
    this.$inputs.find(".st-block__positionzone").show();
  },

  setPositionInput: function(value) {
    if (typeof value == "undefined") {
      var data = this.getData();
      value = data.position || "left";
    }

    this.$('.st-position-location').val(value);
  },

  repositionObject: function(position) {
    // debugger
    var obj = this.position_options.object;
    if (obj != null) {
      var $obj = $(obj);
      $obj.removeClass("yeti-position-left yeti-position-center yeti-position-right");
      if (position == "left")   { $obj.addClass("yeti-position-left"); }
      if (position == "center") { $obj.addClass("yeti-position-center"); }
      if (position == "right")  { $obj.addClass("yeti-position-right"); }

      if (position == "right")    {
        $(obj).after('<div style="clear:both"></div>');
      }
    }
  },

  setupPositionWidgets: function() {
    this.setPositionInput();
    var data = this.getData();
    this.repositionObject(data.position || this.position_options.position);
  },

  injectPositionData: function(data) {
    var val = this.$('.st-position-location').val();
    if (this.positionable && this.isDirty) {
      data.position = val;
    }
    return data;
  }


};