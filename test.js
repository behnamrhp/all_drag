import { ALL_DRAG } from ".";

ALL_DRAG.create('child',{
    drag_cursor : 'grabbing',
    drag_type : {
        type: 'free',
        freeDrag : {
            allowedDistrict: 'parent',
            drag_place: 'self',
        }
    }
})