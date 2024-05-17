/*
 * Copyright 2023 Intel Corporation.
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by
 * the express license under which they were provided to you (License). Unless the License provides otherwise,
 * you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents
 * without  Intel's prior written permission. This software and the related documents are provided as is, with no
 * express or implied warranties, other than those that are expressly stated in the License.
 *
 */

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

