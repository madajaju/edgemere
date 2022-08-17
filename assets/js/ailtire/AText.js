import { Text } from '../troika-three-text.esm.js';

export default class AText {
    static view3D(node, type) {
        /* Troika text */
        let retval = new Text();
        retval.text = node.text;
        retval.fontSize = node.size || 30;
        retval.color = node.color || 0xFFFFFF;
        retval.anchorX = 'center';
        retval.anchorY = 'middle';
        retval.textAlign = 'center';
        return retval;
    }
}

