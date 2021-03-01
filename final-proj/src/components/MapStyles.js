const MapStyles = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                weight: '0.20',
            },
            {
                lightness: '28',
            },
            {
                saturation: '23',
            },
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#494949',
            },
            {
                lightness: 13,
            },
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#144b53',
            },
            {
                lightness: 14,
            },
            {
                weight: 1.4,
            },
        ],
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
            {
                color: '#08304b',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#0c4152',
            },
            {
                lightness: 5,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#0b434f',
            },
            {
                lightness: 25,
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'labels.text.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000',
            },
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#0b3d51',
            },
            {
                lightness: 16,
            },
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
            {
                color: '#146474',
            },
        ],
    },
    {
        featureType: 'transit.line',
        elementType: 'geometry.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'transit.station.airport',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'transit.station.bus',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.bus',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'transit.station.bus',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            {
                color: '#021019',
            },
        ],
    },
];

export default MapStyles;
