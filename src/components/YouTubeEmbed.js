import React from 'react';

const YoutubeEmbed = ({ embedId }) => (
    <div
        className="video-responsive"
        style={{
            overflow: 'hidden',
            'padding-bottom': '56.25%',
            width: '100%',
        }}
    >
        <iframe
            style={{
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                position: 'absolute',
            }}
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

export default YoutubeEmbed;
