/*
  Heading Block
*/
SirTrevor.Blocks.Heading = SirTrevor.Block.extend({

  type: 'heading',

  title: function(){ return i18n.t('blocks:heading:title'); },

  editorHTML: '<div class="st-required st-text-block st-text-block--heading" contenteditable="true"><h1></h1></div>',

  icon_name: 'heading',

  loadData: function(data){
    this.getTextBlock().html(SirTrevor.toHTML(data.text, this.type));
  }
});