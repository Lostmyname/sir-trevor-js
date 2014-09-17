/*
  Simple Image Block
*/

SirTrevor.Blocks.Image = SirTrevor.Block.extend({

  type: "image",
  title: function() { return i18n.t('blocks:image:title'); },

  droppable: true,
  uploadable: true,
  resizable: true,
  positionable: true,

  resize_options: {
    object: null
  },

  position_options: {
    object: null
  },

  icon_name: 'image',

  loadData: function(data){
    // Create our image tag
    var img = $('<img>', { src: data.file.url }).attr("data-object-type", "image");

    if (this.resizable)     { this.resize_options.object = img; this.showResizableInput(); }
    if (this.positionable)  { this.position_options.object = img; this.showPositionInput(); }

    this.$editor.html(img);
  },

  onBlockRender: function(){
    /* Setup the upload button */
    this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
    this.$inputs.find('input').on('change', _.bind(function(ev){
      this.onDrop(ev.currentTarget);
    }, this));

    if (this.resizable)     { this.setupResizeWidgets(); }
    if (this.positionable)  { this.setupPositionWidgets(); }

    if (this.$(".st-block__editor img").length) {
      this.$(".st-block__dropzone").hide();
      this.$(".st-block__upload-container").hide();
    }
  },

  onUploadSuccess : function(data) {
    this.setData(data);
    this.ready();
  },

  onUploadError : function(jqXHR, status, errorThrown){
    this.addMessage(i18n.t('blocks:image:upload_error'));
    this.ready();
  },

  toData: function() {
    var data = this.getData();
    if (this.resizable)     { data = this.injectSizeData(data); }
    if (this.positionable)  { data = this.injectPositionData(data); }
    this.setData(data);
  },

  onDrop: function(transferData){
    var file = transferData.files[0],
        urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

    // Handle one upload at a time
    if (/image/.test(file.type)) {
      this.loading();
      // Show this image on here
      this.$inputs.hide();

      this.$editor.html($('<img>', { src: urlAPI.createObjectURL(file) }).attr("data-object-type", "image")).show();

       if (this.resizable) {
        this.showResizableInput();
        this.setResizableInput("large");
        this.resize_options.object = this.$el.find(".st-block__editor img");
      }

      if (this.positionable) {
        this.showPositionInput();
        this.setPositionInput("center");
        this.position_options.object = this.$el.find(".st-block__editor img");
      }

      this.resizeObject(this.getCurrentSelectedSize());
      this.repositionObject(this.getCurrentSelectedPosition());

      this.$(".st-block__dropzone").hide();
      this.$(".st-block__upload-container").hide();

      this.uploader(file, this.onUploadSuccess, this.onUploadError);
    }
  }
});