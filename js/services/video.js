import urlParser from 'js-video-url-parser';
import queryString from 'query-string';

export const isEmbed = (url) => {
    return getEmbedUrl(url) !== null;
};

export const getEmbedUrl = (url, options = {
    rel: 0,
    autoplay: 1,
    modestbranding: 1,
    showinfo: 0
}) => {
    // Returns an iframe of the video with the specified URL.
    const video = urlParser.parse(url);

    if (! video) return null;

    if (video.provider === 'youtube') {
        options = Object.assign({}, options, video.params);

        if (video.mediaType === 'playlist') {
            options.list = video.list;
            return `//www.youtube.com/embed?${queryString.stringify(options)}`;
        }

        if (video.mediaType === 'video') {
            return `//www.youtube.com/embed/${video.id}?${queryString.stringify(options)}`;
        }

    } else if (video.provider === 'vimeo') {
        return `//player.vimeo.com/video/${video.id}`;
    }

    return null;
};

export const getThumbnail = (url, cb) => {
    // Obtains the video's thumbnail and passed it back to a callback function.
    const video = urlParser.parse(url);

    if (video.provider === 'youtube') {
        cb('//img.youtube.com/vi/' + video.id + '/maxresdefault.jpg');
    } else if (video.provider === 'vimeo') {
        // Requires jQuery
        $.get('http://vimeo.com/api/v2/video/' + video.id + '.json', function(data) {
            cb(data[0].thumbnail_large);
        });
    }
};