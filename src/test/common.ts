/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import { join } from 'path';

function rndName() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
}

export function createRandomFile(contents = '', ext=''): Promise<vscode.Uri> {
    return new Promise((resolve, reject) => {
        const tmpFile = join(os.tmpdir(), rndName() + (ext ? '.'+ext : ''));
        fs.writeFile(tmpFile, contents, (error) => {
            if (error) {
                return reject(error);
            }

            resolve(vscode.Uri.file(tmpFile));
        });
    });
}

export function pathEquals(path1: string, path2: string) {
    if (process.platform !== 'linux') {
        path1 = path1.toLowerCase();
        path2 = path2.toLowerCase();
    }

    return path1 === path2;
}

export function deleteFile(file: vscode.Uri) {
    return new Promise((resolve, reject) => {
        fs.unlink(file.fsPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

export function closeAllEditors() {
    return vscode.commands.executeCommand('workbench.action.closeAllEditors');
}

// export function sleep(ms:number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }