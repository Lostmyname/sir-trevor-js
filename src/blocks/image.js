/*
  Simple Image Block
*/

SirTrevor.Blocks.Image = (function() {

  var template = _.template([
    '<div class="image-size">',
      '<select>',
        '<option name="small">Small</option>',
        '<option name="medium">Medium</option>',
        '<option name="large">Large</option>',
      '</select>',
    '</div>'
  ].join("\n"));


  return SirTrevor.Block.extend({

    type: "image",
    title: function() { return i18n.t('blocks:image:title'); },

    droppable: true,
    uploadable: true,

    editorHTML: function() {
      return this.buildDropdowns();
    },

    icon_name: 'image',

    loadData: function(data){
      var img = $('<img>', { src: data.file.url });
      this.$editor.append(img);

      this.findInputs();
      this.sizeSelect.val(data.size);
      this.positionSelect.val(data.position);
      this.updateImage();
    },

    onBlockRender: function(){
      /* Setup the upload button */
      this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
      this.$inputs.find('input').on('change', _.bind(function(ev){
        this.onDrop(ev.currentTarget);
      }, this));

      this.$(".image-options").show();
      this.bindSelectListeners();
    },

    onUploadSuccess : function(data) {
      this.setData(data);
      this.ready();
    },

    onUploadError : function(jqXHR, status, errorThrown){
      this.addMessage(i18n.t('blocks:image:upload_error'));
      this.ready();
    },

    onDrop: function(transferData){
      var file = transferData.files[0],
          urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

      // Handle one upload at a time
      if (/image/.test(file.type)) {
        this.loading();
        // Show this image on here
        this.$inputs.hide();
        this.$editor.append($('<img>', { src: urlAPI.createObjectURL(file) })).show();

        this.uploader(file, this.onUploadSuccess, this.onUploadError);
      }
    },

    toData: function() {
      this.findInputs();
      var imageData = this.getData();
      var imageSize = this.sizeSelect.val();
      var imagePos  = this.positionSelect.val();
      imageData["size"]     = imageSize;
      imageData["position"] = imagePos;
      this.setData(imageData);
    },

    buildDropdowns: function() {
      return [
        '<div class="image-options">',
          this.buildSizeDropdown(),
          this.buildPositionDropdown(),
        '</div>'
      ].join("\n");
    },

    buildSizeDropdown: function() {
      return [
        '<span>Size:</span>',
        '<select class="image-size">',
          '<option value="small">Small</option>',
          '<option value="medium">Medium</option>',
          '<option value="large">Large</option>',
        '</select>',
      ].join("\n")
    },

    buildPositionDropdown: function() {
      return [
        '<span>Position:</span>',
        '<select class="image-position" style="margin-bottom: 12px;">',
          '<option value="left">Left</option>',
          '<option value="center">Centre</option>',
          '<option value="right">Right</option>',
        '</select>',
      ].join("\n")
    },

    bindSelectListeners: function() {
      this.findInputs();
      var self = this;

      this.sizeSelect.on("change", function() {
        self.updateImage();
      });

      this.positionSelect.on("change", function() {
        self.updateImage();
      });
    },

    updateImage: function(options) {
      this.findInputs();
      var self = this;

      var css = {float: "none", margin: "0", display: "inherit"};

      var width = this.sizeSelect.val();
      if (width == "small")  { css.width = "50%"; }
      if (width == "medium") { css.width = "75%"; }
      if (width == "large")  { css.width = "100%"; }

      var position = this.positionSelect.val();
      if (position == "center") {
        css.margin = "0 auto";
        css.display = "block";
      } else if (position == "right") {
        css.float = "right";
        this.$el.find("img").after('<div style="clear:both" class="clear-both-image"></div>');
      }

      this.$el.find("img").css(css);
    },

    findInputs: function() {
      this.sizeSelect      = this.$el.find("select.image-size");
      this.positionSelect  = this.$el.find("select.image-position");
    }
  });

})();