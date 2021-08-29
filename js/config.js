export let config = {
    drag_type: {
        type: 'free',
        freeDrag: {
            drag_place: 'self',
            panel_side: 'top',
            drag_style: 'flat',
            drag_scale: '1.05',
            drag_shadow_color: '#737373',
            drag_shadow_blur: '5',
            drag_shadow_distance: '5',
            allowedDistrict:false
        },
        slideDrag: {
            direction: 'left',
            otherDirPos: '50',
            closePercent: 50,
            percentBasis: 'self',
            clickToOpen: false,
            resizeToDefaultOnHide: false
        }
    },
    drag_cursor: false,
    revert: false,
    transitionDuration: '.2',
    draggableAllowedNumber: 0,
    panel: {
        hover_cursor: 'auto',
        panel_color: '#656565',
        panel_height: '15',
        panel_radius: '10',
        panel_hide:false
    }

}

