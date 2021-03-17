export class MediaItem {
    creativeKey = '';
    creativeLabel = '';
    src = '';
    duration = 10;

    get extension() {
        return this.creativeKey.split('.').pop()?.toLowerCase() as string;;
    }

    get type(): string | boolean {
        const extensionTypeMap: {
            [key: string]: string
        } = {
            jpg: 'img',
            png: 'img',
            svg: 'img',
            gif: 'img',
            mp4: 'video',
            ogg: 'video',
        };
        const extension = this.extension;
        if (extension && extensionTypeMap[extension]) {
            return extensionTypeMap[extension];
        } else {
            return false;
        }
    }
}
