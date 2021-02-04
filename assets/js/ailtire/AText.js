
export default class AText {
    static view3D(node, type) {
        const ctx = document.createElement('canvas').getContext('2d');
        let texts = node.text.split('\n');

        document.body.appendChild(ctx.canvas);
        let size = node.size || 30;
        let width = node.width || 100;
        const font = `${size-2}px bold sans-serif`;
        const color = node.color || "#ffffff";
        ctx.font = font;
        // Iterate over all of the texts an find out the longest
        let textWidth =0;
        for(let i in texts) {
            let text = texts[i];
            let textsize = ctx.measureText(text);
            let twidth = textsize.width;
            if(twidth > textWidth) {
                textWidth = twidth;
            }
        }
        width -= 5;
        const height = (size* texts.length) + 4;

        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.font = font;
        ctx.translate(0, height);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const scaleFactor = Math.min(1, width / (textWidth + 10));
        ctx.translate(width / 2, 0);
        ctx.scale(scaleFactor, 1);
        ctx.fillStyle = color;
        let y = - height - 2;
        for(let i in texts) {
           ctx.fillText(texts[i], 0, y);
           y += size;
        }
        const texture = new THREE.CanvasTexture(ctx.canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity:1});
        const plane = new THREE.PlaneGeometry(width,height);
        let retval = new THREE.Mesh(plane, material);
        return retval;
    }
}

