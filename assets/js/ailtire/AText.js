export default class AText {
    /* static view3D(node, type) {
        let size = node.size || 30;
        let color = node.color || '#ffffff';
        let myGroup = new THREE.Group();
        let myText = new THREE.TextSprite({
            alignment: 'center',
            color: color,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontStyle: 'normal',
            fontSize: size,
            text: node.text
        });
        myText.position.set(0,0,10);
        myGroup.add(myText);
        return myGroup;
    }

     */
    static view3D(node, type) {
        const ctx = document.createElement('canvas').getContext('2d');
        let texts = node.text.split('\n');

        document.body.appendChild(ctx.canvas);
        let size = node.size || 30;
        let width = node.width || 100;
        const font = `${size}px bold sans-serif`;
        const color = node.color || "#ffffff";
        ctx.font = font;
        // Iterate over all of the texts an find out the longest
        let textWidth = 0;
        let textHeight = 0;
        for (let i in texts) {
            let text = texts[i];
            let textsize = ctx.measureText(text);
            textHeight += textsize.fontBoundingBoxAscent+textsize.fontBoundingBoxDescent;
            let twidth = textsize.width;
            if (twidth > textWidth) {
                textWidth = twidth;
            }
        }
        // width -= 5;
        const height = ((size*0.95) * texts.length);

        // textWidth streches the canvas.
        ctx.canvas.width = textWidth;
        //ctx.canvas.width = width;
        ctx.canvas.height = textHeight;
        ctx.font = font;
        ctx.translate(0, textHeight);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        // const scaleFactor = Math.min(1, width / (textWidth + 10));
        // ctx.translate(width / 2, 0);
        // ctx.scale(scaleFactor, 1);
        ctx.fillStyle = color;
        let y = -textHeight;
        for (let i in texts) {
            ctx.fillText(texts[i], textWidth/2, y);
            y += (size*0.95);
        }
        const texture = new THREE.Texture(ctx.canvas);
        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1
        });
        const plane = new THREE.PlaneGeometry(textWidth, textHeight);
        let retval = new THREE.Mesh(plane, material);
        return retval;
    }
}

