(function() {
    function Sprite(url,pos,size) {
        this.url = url;
        this.pos = pos;
		this.size = size;
    };

    Sprite.prototype = {
        render: function(ctx) {
            var frame;

            var x = this.pos[0];
            var y = this.pos[1];


            ctx.drawImage(this.url, x, y,this.size[0], this.size[1])
        }
    };

    window.Sprite = Sprite;
})();