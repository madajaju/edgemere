import { Text } from '../troika-three-text.esm.js';

export default class AText {
    static view3D(node, type) {
        /* Troika text */
        let retval = new Text();
        retval.text = node.text;
        retval.fontSize = node.size || 30;
        retval.color = node.color || 0xFFFFFF;
        retval.anchorX = node.anchorX || 'center';
        retval.anchorY = node.anchorY || 'middle';
        retval.textAlign = node.textAlign || 'center';
        retval.maxWidth = node.maxWidth || 1000;
        retval.whiteSpace = 'normal';
        retval.overflowWrap = 'normal';
        retval.sync();
        return retval;
    }
}

