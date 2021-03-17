export class MediaItem {
    creativeKey = '';
    creativeLabel = '';
    src = '';
    get type(): string | boolean {
        const extensionTypeMap: {
            [key: string]: string
        } = {
            jpg: 'img',
            png: 'img',
            svg: 'img',
            gif: 'img',
            mp4: 'mp4',
            ogg: 'ogg',
        };
        const extension = this.creativeKey.split('.').pop()?.toLowerCase() as string;
        if (extension && extensionTypeMap[extension]) {
            return extensionTypeMap[extension];
        } else {
            return false;
        }
    }
}
