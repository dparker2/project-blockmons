AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var lastIndex = -1;
        var rings = ["inner-cursor-1", "inner-cursor-2", "inner-cursor-3"];

        this.el.addEventListener('click', function (evt) {
            lastIndex = (lastIndex + 1) % rings.length;

            var innerCursor = document.getElementById(rings[lastIndex]);
            if (innerCursor) innerCursor.setAttribute('visible', 'true');
            
            if (lastIndex === 2) {
                this.setAttribute("visible", "false")
                evt.detail.cursorEl.remove();
                document.getElementById("inner-cursor-text").setAttribute("visible", "true")
            } else {
                // Manually emit that the intersection cleared so sequential clicks can be made. Kinda hacky
                evt.detail.cursorEl.emit('raycaster-intersection-cleared', { clearedEls: [this] });
            }

        });
    }
});