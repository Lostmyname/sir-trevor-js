/*
  Text Block
*/
SirTrevor.Blocks.Text = SirTrevor.Block.extend({

  type: "text",

  positionable: true,

  title: function() { return i18n.t('blocks:text:title'); },

  editorHTML: '<div class="st-required st-text-block" contenteditable="true"></div>',

  icon_name: 'text',

  loadData: function(data){
    this.getTextBlock().html(SirTrevor.toHTML(data.text, this.type));
  },

  toData: function() {
    var data = this.getData();
    data.text = this.getTextBlock().text();
    if (this.positionable)  { data = this.injectPositionData(data); }
    this.setData(data);
  },

  beforeBlockRender: function() {
    this.$inputs = this.$el;
  },

  onBlockRender: function() {
    if (SirTrevor.getInstance().blocks.length == 1 && this.$editor.text() == "") {
      this.$editor.text("...and at the end Pedro will draw a picture of it!");
      this.$editor.focus();
    }

    this.setupPositionWidgets();
    this.showPositionInput();
    this.position_options.object = this.getTextBlock();
    this.repositionObject(this.$('.st-position-location').val());
  }
});