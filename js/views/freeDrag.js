import parent from './parentDrag.js';

class freeDrag extends parent {

    constructor() {
        super();
    }

    addDragStartHandler(handler) {
        ['mousedown','touchstart'].forEach(evt=>{
            this._elem.addEventListener(evt, handler)
        })
    }

    addDragMoveHandler(handler) {
        ['mousemove','touchmove'].forEach(evt=>{
            document.addEventListener(evt, handler)
        })

    }

    addDragStopHandler(handler){
        ['mouseup','touchend'].forEach(evt=>{
            document.addEventListener(evt, handler)
        })
    }

    freeDragAnimation(targetElem,style = 'start'){

        targetElem.style.transform = `${style === 'start' ? `scale(${this._config.drag_type.freeDrag.drag_scale})` :'scale(1)'}`;
        targetElem.style.boxShadow = `${style === 'start' ? ` 0px ${this._config.drag_type.freeDrag.drag_shadow_distance}px ${this._config.drag_type.freeDrag.drag_shadow_blur}px ${this._config.drag_type.freeDrag.drag_shadow_color}` : ''}`;

    }

    setInitDistrictArea(targetEl){
        let container = this._config.drag_type.freeDrag.allowedDistrict;

        if (!document.querySelector(`#${container}`) ){
            console.error('couldn\'t find any container please choose correct container id')
            return false;
        }
        container  = document.querySelector(`#${container}`);
        container.style.position = 'unset';

        targetEl.style.left = container.offsetLeft + 'px';
        targetEl.style.top = container.offsetTop + 'px';
    }

    containerLimitX(targetElem, XPose ){

        let container = this._config.drag_type.freeDrag.allowedDistrict;

        if (!document.querySelector(`#${container}`) ){
            console.error('couldn\'t find any container please choose correct container id')
            return false;
        }

        container  = document.querySelector(`#${container}`);

        
        const targetElOffsetX  = targetElem.getBoundingClientRect().left + targetElem.getBoundingClientRect().width;
        const containerOffsetX = container.getBoundingClientRect().width + container.getBoundingClientRect().left;
        return containerOffsetX  >= targetElOffsetX;
    }

    containerLimitLeftX(targetElem ){

        let container = this._config.drag_type.freeDrag.allowedDistrict;

        if (!document.querySelector(`#${container}`) ){
            console.error('couldn\'t find any container please choose correct container id')
            return false;
        }

        container  = document.querySelector(`#${container}`);

        return container.getBoundingClientRect().left < targetElem.getBoundingClientRect().left;
    }

    containerLimitY(targetElement,YPose){
        let container = this._config.drag_type.freeDrag.allowedDistrict;

        if (!document.querySelector(`#${container}`) ){
            console.error('couldn\'t find any container please choose correct container id')
            return false;
        }

        container  = document.querySelector(`#${container}`);

        if (container.getBoundingClientRect().top > +targetElement.getBoundingClientRect().top ) return false;

        return container.getBoundingClientRect().top + container.getBoundingClientRect().height >= +targetElement.getBoundingClientRect().top + targetElement.getBoundingClientRect().height;


    }

    containerLimitYTop(targetElement){
        let container = this._config.drag_type.freeDrag.allowedDistrict;

        if (!document.querySelector(`#${container}`) ){
            console.error('couldn\'t find any container please choose correct container id')
            return false;
        }

        container  = document.querySelector(`#${container}`);

        return container.getBoundingClientRect().top < targetElement.getBoundingClientRect().top ;
    }

}

export default new freeDrag();