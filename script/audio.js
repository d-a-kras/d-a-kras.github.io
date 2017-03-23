/**
 * Created by dogan on 25.11.2014.
 */
(function() {
    function SoundSource(url, autoplay) {
        this.url = url;
        this.autoplay = typeof autoplay === 'boolean' ? autoplay : true;

    };

    Sprite.prototype = {
         // Создаём новый элемент Audio

        init: function() {
            var audio = new Audio();
            audio.src = 'url';
            audio.autoplay = autoplay; // Автоматически запускаем
        },

        render: function(ctx) {
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            }
            else {
                frame = 0;
            }


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }

            ctx.drawImage(this.url,
                x, y,
                this.size[0], this.size[1],
                0, 0,
                this.size[0], this.size[1]);
        }
    };

    window.Sprite = Sprite;
})();