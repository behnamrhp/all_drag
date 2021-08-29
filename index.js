import {config} from "./js/config.js";
import free from './js/views/freeDrag.js';
import slide from './js/views/slideDrag.js';
import freeDrag from "./js/views/freeDrag.js";
import slideDrag from "./js/views/slideDrag.js";

class all_drag {
    _elem;
    _config;
    _dragDoneCount = 0;
    startSlideDragEvent;


    constructor() {

    }

    /**
     *
     * @return control custom config and get elem and choose drag type
     */
    create(elem, customConf) {
        elem = document.querySelector(`#${elem}`)
        //get config
        let usedConfig = {};
        if (customConf) usedConfig = customConf;
        else usedConfig = config;

        usedConfig = this._setConfig(usedConfig);

        this._config = usedConfig;
        this._elem = elem;

        //check drag type and start function
        if (usedConfig.drag_type.type === 'free') {
            this.controlFreeDrag()
        }
        if (usedConfig.drag_type.type === 'slide') {
            this.controlSlideDrag()
        }


        //get drag type


    }

    /**
     *
     * @return control free drag functionality
     */
    controlFreeDrag() {
        //set free drag configs
        this._config = this._setFreeDragConfigs(this._config);

        //set free drag view config
        freeDrag._config = this._config;

        //set element in view
        freeDrag._elem = this._elem;

        //set init element styles
        freeDrag.initElemStyle();

        //check and add panel
        let targetEl;
        if (this._config.drag_type.freeDrag.drag_place === 'panel') {
            //generate panel
            this._elem = freeDrag.generatePanel();
            targetEl = this._elem.parentElement;
        }else{
            targetEl = this._elem
        }

        //init if set allowed district
        if (this._config.drag_type.freeDrag.allowedDistrict) freeDrag.setInitDistrictArea(targetEl);


        //set hover cursor
        freeDrag.addHoverHandler(freeDrag.setDraggingCursor(this._config.panel.hover_cursor));


        //start function
        freeDrag.addDragStartHandler(this.controlFreeDragStartHandler.bind(freeDrag))

        //dragging function
        freeDrag.addDragMoveHandler(this.controlFreeDragMoveHandler.bind(freeDrag));


        //ending function
        freeDrag.addDragStopHandler(this.controlFreeDragStopHandler.bind(freeDrag))
    }

    /**
     *
     * @return control slide drag functionality
     */
    controlSlideDrag() {
        //set free drag configs
        this._config = this._setSlideDragOptions(this._config);

        //set free drag view config
        slideDrag._config = this._config;

        //set element in view
        slideDrag._elem = this._elem;

        //init elem style
        slideDrag.initElemStyle();

        //set elem position
        slideDrag.initElementPosition(this._elem);

        //add panel
        slideDrag.generatePanel();

        //set panel hover cursor
        slideDrag.addHoverHandler(slideDrag.setDraggingCursor(this._config.panel.hover_cursor));

        //set start slider size
        slideDrag._first_elem_width = slideDrag._elem.parentElement.getBoundingClientRect().width;
        slideDrag._first_elem_height = slideDrag._elem.parentElement.getBoundingClientRect().height;

        //set function for click to open slide
        slideDrag.addClickToToggle()

        //start slide drag
        slideDrag.addStartSlideDragEvent(this.controlStartSlideDragHandler)

        //move slide drag
        slideDrag.addMoveSlideDragEvent(this.controlMoveSlidDragHandler)

        //stop slide drag
        slideDrag.addStopSlideDragEvent(this.controlStopSlideDragHandler)
    }

    /**
     *
     * @param usedConfig {Object} user main custom config for plugin
     * @return {*}
     * @private
     */
    _setConfig(usedConfig) {
        //check exist drag type object
        if (!usedConfig.drag_type) usedConfig.drag_type = config.drag_type;

        //check exist custom drag type
        if (usedConfig.drag_type && !usedConfig.drag_type.type) usedConfig.drag_type.type = config.drag_type.type;

        //check exist dragging cursor icon
        if (!usedConfig.drag_cursor) usedConfig.drag_cursor = config.drag_cursor;

        //check revert
        if (!usedConfig.revert) usedConfig.revert = config.revert;

        //check draggable number
        if (!usedConfig.draggableAllowedNumber) usedConfig.draggableAllowedNumber = config.draggableAllowedNumber;

        //check panel exist
        if (!usedConfig.panel) usedConfig.panel = config.panel;

        //check panel color
        if (!usedConfig.panel.panel_color) usedConfig.panel.panel_color = config.panel.panel_color;

        //check panel height

        if (!usedConfig.panel.panel_height) usedConfig.panel.panel_height = config.panel.panel_height;

        //check panel height
        if (!usedConfig.panel.panel_radius) usedConfig.panel.panel_radius = config.panel.panel_radius;

        //check panel hide boolean
        if (!usedConfig.panel.panel_hide) usedConfig.panel.panel_hide = config.panel.panel_hide;

        //check hover cursor
        if (!usedConfig.panel.hover_cursor) usedConfig.panel.hover_cursor = config.panel.hover_cursor;


        return usedConfig;

    }

    /**
     *
     * @param usedConfig {Object} user config for free drag has input
     * @return  set default or user config for free drag
     * @private
     */
    _setFreeDragConfigs(usedConfig) {
        //check there is no free drag config
        if (!usedConfig.drag_type.freeDrag) usedConfig.drag_type.freeDrag = config.drag_type.freeDrag;


        //check drag place
        if (!usedConfig.drag_type.freeDrag.drag_place) usedConfig.drag_type.freeDrag.drag_place = config.drag_type.freeDrag.drag_place;

        //check panel side
        if (!usedConfig.drag_type.freeDrag.panel_side) usedConfig.drag_type.freeDrag.panel_side = config.drag_type.freeDrag.panel_side;


        //check drag style
        if (!usedConfig.drag_type.freeDrag.drag_style) usedConfig.drag_type.freeDrag.drag_style = config.drag_type.freeDrag.drag_style;

        //check drag style scale
        if (!usedConfig.drag_type.freeDrag.drag_scale) usedConfig.drag_type.freeDrag.drag_scale = config.drag_type.freeDrag.drag_scale;

        //check drag style shadow color
        if (!usedConfig.drag_type.freeDrag.drag_shadow_color) usedConfig.drag_type.freeDrag.drag_shadow_color = config.drag_type.freeDrag.drag_shadow_color;

        //check drag style shadow blur
        if (!usedConfig.drag_type.freeDrag.drag_shadow_blur) usedConfig.drag_type.freeDrag.drag_shadow_blur = config.drag_type.freeDrag.drag_shadow_blur;

        //check drag style shadow distance
        if (!usedConfig.drag_type.freeDrag.drag_shadow_distance) usedConfig.drag_type.freeDrag.drag_shadow_distance = config.drag_type.freeDrag.drag_shadow_distance;

        //check drag style shadow distance
        if (!usedConfig.drag_type.freeDrag.allowedDistrict) usedConfig.drag_type.freeDrag.allowedDistrict = config.drag_type.freeDrag.allowedDistrict;

        return usedConfig
    }

    _setSlideDragOptions(usedConf) {
        //check there is no slide drag config
        if (!usedConf.drag_type.slideDrag) usedConf.drag_type.slideDrag = config.drag_type.slideDrag;


        //check direction drag style
        if (!usedConf.drag_type.slideDrag.direction) usedConf.drag_type.slideDrag.direction = config.drag_type.slideDrag.direction;

        //check close percent elem div
        if (!usedConf.drag_type.slideDrag.closePercent) usedConf.drag_type.slideDrag.closePercent = config.drag_type.slideDrag.closePercent;

        //check default openPercent elem div
        if (!usedConf.drag_type.slideDrag.openPercent) usedConf.drag_type.slideDrag.openPercent = config.drag_type.slideDrag.openPercent;

        //check default clickToOpen elem div
        if (!usedConf.drag_type.slideDrag.clickToOpen) usedConf.drag_type.slideDrag.clickToOpen = config.drag_type.slideDrag.clickToOpen;

        //check transitionDuration elem(panel/hide)
        if (!usedConf.drag_type.slideDrag.transitionDuration) usedConf.drag_type.slideDrag.transitionDuration = config.drag_type.slideDrag.transitionDuration;

        //check resize to default when hide
        if (!usedConf.drag_type.slideDrag.resizeToDefaultOnHide) usedConf.drag_type.slideDrag.resizeToDefaultOnHide = config.drag_type.slideDrag.resizeToDefaultOnHide;

        //check percent basis for close on stop handler
        if (!usedConf.drag_type.slideDrag.percentBasis) usedConf.drag_type.slideDrag.percentBasis = config.drag_type.slideDrag.percentBasis;

        //check percent basis for close on stop handler
        if (!usedConf.drag_type.slideDrag.otherDirPos) usedConf.drag_type.slideDrag.otherDirPos = config.drag_type.slideDrag.otherDirPos;

        return usedConf
    }


    /**
     *
     * @param e {Object} object of mouse down click events
     */
    controlFreeDragStartHandler(e) {
        e.preventDefault();

        const  clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;
        const  clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;


            //set start position
        [freeDrag._startPose.top, freeDrag._startPose.left] = [this._elem.getBoundingClientRect().top, this._elem.getBoundingClientRect().left];
        [freeDrag._Pose.top, freeDrag._Pose.left] = [clientY, clientX];
        //set click press active
        freeDrag._checkClickPressed = true;


        //added start slide drag event
        const event = new CustomEvent('allFreeDragStart', e);

        freeDrag._elem.dispatchEvent(event);
    }

    /**
     *
     * @param e {Object} object of mouse move click events
     */
    controlFreeDragMoveHandler(e) {

        if (!freeDrag._checkClickPressed) return;
        if (this._config.draggableAllowedNumber === 0 || this._dragDoneCount < this._config.draggableAllowedNumber) {

            if (this._config.drag_cursor) {
                freeDrag.setDraggingCursor(this._config.drag_cursor);
            }

            const  clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;
            const  clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;

            //set mouse new pose
            const topMouseMove = freeDrag._Pose.top - clientY;
            const leftMouseMove = freeDrag._Pose.left - clientX;

            //set start position again
            [freeDrag._Pose.top, freeDrag._Pose.left] = [clientY, clientX];

            //set new element pose
            let targetElem;
            if (this._config.drag_type.freeDrag.drag_place !== 'panel') targetElem = this._elem
            else targetElem = this._elem.parentElement


            //set animate of dragging element
            if (this._config.drag_type.freeDrag.drag_style === 'elevate') freeDrag.freeDragAnimation(targetElem);

            //check has container limit to move
            let checkLimitContainerXAllowed = true
            let checkLimitContainerYAllowed = true

            if (this._config.drag_type.freeDrag.allowedDistrict) checkLimitContainerXAllowed = freeDrag.containerLimitX(targetElem, clientX);

            if (this._config.drag_type.freeDrag.allowedDistrict) checkLimitContainerYAllowed = freeDrag.containerLimitY(targetElem, clientY);

            if (checkLimitContainerXAllowed) targetElem.style.left = (targetElem.offsetLeft - leftMouseMove) + "px";

            if (checkLimitContainerYAllowed) targetElem.style.top = (targetElem.offsetTop - topMouseMove) + "px"


            //added move slide drag event
            const event = new CustomEvent('allFreeDragMove', e);

            freeDrag._elem.dispatchEvent(event);
        }

    }


    /**
     * @return stop moving _elem in free drag type
     */
    controlFreeDragStopHandler(e) {
        if (!freeDrag._checkClickPressed) return;

        freeDrag._checkClickPressed = false;

        //set new element pose
        let targetElem;
        if (this._config.drag_type.freeDrag.drag_place !== 'panel') targetElem = this._elem
        else targetElem = this._elem.parentElement

        //set animate of dragging element deActive
        if (this._config.drag_type.freeDrag.drag_style === 'elevate') freeDrag.freeDragAnimation(targetElem, 'end');

        if (this._config.revert) freeDrag.revert(targetElem);
        //hover cursor activate
        freeDrag.addHoverHandler(freeDrag.setDraggingCursor(this._config.panel.hover_cursor));


        //added stop slide drag event
        const event = new CustomEvent('allFreeDragStop', e);

        freeDrag._elem.dispatchEvent(event);

        //increase drag done count
        this._dragDoneCount++;
    }


    /**
     * @return set check to start variable to true
     */
    controlStartSlideDragHandler(e) {
        slideDrag._check_allowed_slide_move = true;
        [slideDrag._startPose.left, slideDrag._startPose.top] = [slideDrag._elem.getBoundingClientRect().left, slideDrag._elem.getBoundingClientRect().top]


        //added start drag event
        const event = new CustomEvent('allSlideDragStart', e);

        slideDrag._elem.dispatchEvent(event);
    }


    /**
     * @return main functionality of slide drag
     */
    controlMoveSlidDragHandler(e) {
        if (!slideDrag._check_allowed_slide_move) return;

        //draggable Allowed number
        if (this._config.draggableAllowedNumber === 0 || this._dragDoneCount < this._config.draggableAllowedNumber) {

            //drag cursor
            if (this._config.drag_cursor) {
                slideDrag.setDraggingCursor(this._config.drag_cursor, true);
            }

            //drag functionality
            slideDrag.setPositionOnDrag.call(this, e)


            //added move slide drag event
            const event = new CustomEvent('allSlideDragMove', e);

            slideDrag._elem.dispatchEvent(event);
        }
    }

    /**
     * @return set check slide drag variable to false
     */
    controlStopSlideDragHandler(e) {
        if (!slideDrag._check_allowed_slide_move) return;


        slideDrag._check_allowed_slide_move = false;


        //hover cursor activate
        slideDrag.addHoverHandler(slideDrag.setDraggingCursor(this._config.panel.hover_cursor, false));

        slideDrag._check_slide_open = true;


        //revert
        if (this._config.revert) {
            slideDrag._addAnimation(this._elem.parentElement)
            slideDrag.initElementPosition(this._elem.parentElement)
            slideDrag._check_slide_open = false;
        }

        //close percentage
        if (this._config.drag_type.slideDrag.closePercent) {
            const checkToClose = slideDrag.closePercentage([e.clientX, e.clientY]);

            if (checkToClose) {
                slideDrag._addAnimation(this._elem.parentElement)
                slideDrag.initElementPosition(this._elem.parentElement)
                slideDrag._check_slide_open = false;
            }
        }


        //added stop slide drag event
        const event = new CustomEvent('allSlideDragStop', e);

        slideDrag._elem.dispatchEvent(event);

        this._dragDoneCount++

    }

}

export const ALL_DRAG = new all_drag();
