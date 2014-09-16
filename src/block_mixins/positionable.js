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
    var position = this.$(".st-position-location").val();
    this.resize_options.position = position;
    this.repositionObject(position);

    SirTrevor.EventBus.trigger('block:content:positioned', this.blockID);
  },

  showPositionInput: function() {
    this.$inputs.show();
    this.$inputs.find(".st-block__positionzone").show();
  },

  setPositionInput: function(value) {
    if (typeof value == "undefined") {
      var data = this.getData();
      value = data.position;
    }

    this.$('.st-position-location').val(value);
  },

  repositionObject: function(position) {
    var obj = this.position_options.object;
    if (obj != null) {
      if (position == "left")     { $(obj).css({margin: "0", display: "inherit", float: "none"}); }
      if (position == "center")   { $(obj).css({margin: "0 auto", display: "block"}); }

      if (position == "right")    {
        $(obj).css({float: "right"});
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