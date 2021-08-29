import parent from './parentDrag.js';

class slideDrag extends parent {
    _check_slide_open = false;
    _check_allowed_slide_move = false;
    _first_elem_width;
    _first_elem_height;

    constructor() {
        super();
    }

    initElementPosition(targetElem) {
        //get config direction
        const direction = this._config.drag_type.slideDrag.direction;

        //set styles
        if (direction === 'left'){
            targetElem.style.left = `-${targetElem.getBoundingClientRect().width - this._config.panel.panel_height}px`;
            targetElem.style.top = `${this._config.drag_type.slideDrag.otherDirPos}%`;
            targetElem.style.right = `unset`;
        }
        if (direction === 'right'){
            targetElem.style.right = `-${targetElem.getBoundingClientRect().width - this._config.panel.panel_height}px`;
            targetElem.style.top = `${this._config.drag_type.slideDrag.otherDirPos}%`;
            targetElem.style.left = `unset`;
        }
        if (direction === 'top'){
            targetElem.style.top = `-${targetElem.getBoundingClientRect().height - this._config.panel.panel_height}px`;
            targetElem.style.left = `${this._config.drag_type.slideDrag.otherDirPos}%`;
            targetElem.style.bottom = `unset`;
        }
        if (direction === 'bottom'){
            targetElem.style.bottom = `-${targetElem.getBoundingClientRect().height - this._config.panel.panel_height}px`;
            targetElem.style.left = `${this._config.drag_type.slideDrag.otherDirPos}%`;
            targetElem.style.top = `unset`;
        }
        this._check_slide_open = false;

    }




    addClickToToggle() {
        let elemClick = this._config.drag_type.slideDrag.clickToOpen
        elemClick = document.getElementById(elemClick);

        if (!elemClick) return;
        elemClick.addEventListener('click', this._toggleSlideHandler.bind(this))
    }

    _toggleSlideHandler() {
        const slider = this._elem.parentElement;
        //add animation
        this._addAnimation(slider);

        //slide
        this._toggleSlide(this._config.drag_type.slideDrag.direction);

    }

    _toggleSlide(direction) {
        if (!this._check_slide_open) {
            //resize to default when hide
            if (this._config.drag_type.slideDrag.resizeToDefaultOnHide) {
                this._elem.parentElement.style.width = this._first_elem_width + 'px';
                this._elem.parentElement.style.height = this._first_elem_height + 'px';
            }

            this._elem.parentElement.style[direction] = `${0}px`;
            this._check_slide_open = true;
        } else if (this._check_slide_open) this.initElementPosition(this._elem.parentElement);

    }



    addStartSlideDragEvent(handler) {
        ['mousedown','touchstart'].forEach(evt=>{
            this._elem.addEventListener(evt, handler)
        })

    }

    addMoveSlideDragEvent(handler) {
        ['mousemove','touchmove'].forEach(evt=>{
            document.addEventListener(evt, handler.bind(this))
        })

    }

    addStopSlideDragEvent(handler) {
        ['mouseup','touchend'].forEach(evt=>{
            document.addEventListener(evt, handler.bind(this))
        })
    }

    setPositionOnDrag(e) {
        const direction = this._config.drag_type.slideDrag.direction;
        const clientBrowserDir = (direction === 'top' || direction === 'bottom') ? 'clientHeight' : 'clientWidth';
        const eventDir = (direction === 'top' || direction === 'bottom') ? 'clientY' : 'clientX';
        const elemFirstDirSize = (direction === 'top' || direction === 'bottom') ? this._first_elem_height : this._first_elem_width;
        //choose width or height
        const curElemDir = (direction === 'top' || direction === 'bottom') ? 'height' : 'width'

        //check reverse  sizing to calc browser size
        const reverseDir = (direction === 'right' || direction === 'bottom');
        //set direction (rtl/ltr)
        e = e[eventDir]? e[eventDir] : e.changedTouches[0][eventDir];
        const setEventMove = reverseDir ? -e : +e

        //set final distance
        const finalDist = (reverseDir ? document.documentElement[clientBrowserDir] : 0) + setEventMove;

        //functionality
        this._elem.parentElement.style[direction] = `${0}px`;
        this._elem.parentElement.style[curElemDir] = finalDist + 'px';
    }

    closePercentage(currPose) {
        let checkToClose = false;
        checkToClose = this._calcAndCheckClosePercentageByElem(currPose);
        return checkToClose;
    }

    /**
     *
     * @param currPose {Array} consist current position relative to left and top (by sort)
     * @return {boolean} set true cause close slider
     * @private
     */
    _calcAndCheckClosePercentageByElem(currPose) {
        const direction = this._config.drag_type.slideDrag.direction;
        const axis = (direction === 'top' || direction === 'bottom') ? 'y' : 'x';
        const reverseDir = direction === 'bottom' || direction === 'right';
        const widthBasis = this._config.drag_type.slideDrag.percentBasis === 'self' ? this._first_elem_width : document.documentElement.clientWidth;
        const heightBasis = this._config.drag_type.slideDrag.percentBasis === 'self' ? this._first_elem_height : document.documentElement.clientHeight;

        const elemWidthPercent = (widthBasis * +this._config.drag_type.slideDrag.closePercent) / 100;
        const elemHeightPercent = (heightBasis * +this._config.drag_type.slideDrag.closePercent) / 100;

        //x axis
        if (axis === 'x' && !reverseDir) return currPose[0] < elemWidthPercent;
        if (axis === 'x' && reverseDir) return (document.documentElement.clientWidth - currPose[0]) < elemWidthPercent;

        //y axis
        if (axis === 'y' && !reverseDir) return currPose[1] < elemHeightPercent;
        if (axis === 'y' && reverseDir) return (document.documentElement.clientHeight - currPose[1]) < elemHeightPercent;

    }


}

export default new slideDrag();