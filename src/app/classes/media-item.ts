export type MediaTypes = 'img' | 'video' | 'unknown';

export class MediaItem {
    creativeKey = '';
    creativeLabel = '';
    src = '';
    duration = 10;
    loaded = false;
    error = false;

    get extension() {
        return this.creativeKey.split('.').pop()?.toLowerCase() as string;;
    }

    get type(): MediaTypes {
        const extensionTypeMap: {
            [key: string]: MediaTypes
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
            return 'unknown';
        }
    }
}
