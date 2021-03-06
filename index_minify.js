let e = {
    drag_type: {
        type: "free",
        freeDrag: {
            drag_place: "self",
            panel_side: "top",
            drag_style: "flat",
            drag_scale: "1.05",
            drag_shadow_color: "#737373",
            drag_shadow_blur: "5",
            drag_shadow_distance: "5",
            allowedDistrict: !1
        },
        slideDrag: {
            direction: "left",
            otherDirPos: "50",
            closePercent: 50,
            percentBasis: "self",
            clickToOpen: !1,
            resizeToDefaultOnHide: !1
        }
    },
    drag_cursor: !1,
    revert: !1,
    transitionDuration: ".2",
    draggableAllowedNumber: 0,
    panel: {hover_cursor: "auto", panel_color: "#656565", panel_height: "15", panel_radius: "10", panel_hide: !1}
};

class t {
    _config;
    _elem;
    _checkClickPressed = !1;
    _startPose = {};
    _Pose = {};
    _dragDoneCount = 0;

    setDraggingCursor(e, t = !1) {
        this._elem.style.cursor = e.includes("png") || e.includes("png") || e.includes("image") ? `url(${e}),pointer` : `${e}`, document.body.style.cursor = t ? e.includes("png") || e.includes("png") || e.includes("image") ? `url(${e}),pointer` : `${e}` : "default"
    }

    _addAnimation(e) {
        e.style.transition = `all ${this._config.transitionDuration}s`, setTimeout((() => {
            e.style.transition = "unset"
        }), 1e3 * this._config.transitionDuration + 200)
    }

    revert(e) {
        this._addAnimation(e), e.style.top = this._startPose.top + "px", e.style.left = this._startPose.left + "px"
    }

    initElemStyle() {
        "free" === this._config.drag_type.type ? this._elem.classList.add("all_drag_free_drag") : this._elem.classList.add("all_drag_slide_drag")
    }

    addHoverHandler(e) {
        this._elem.addEventListener("mouseenter", e)
    }

    generatePanel() {
        try {
            if (!this._checkElementHasClosingTag(this._elem.tagName)) throw new Error("please choose element that has closing tag for panel");
            return this._elem.insertAdjacentHTML("afterbegin", '<div class="all_drag_panel"><span class="all_drag_panel-icon"></span>&nbsp;</div>'), this._elem.querySelector(".all_drag_panel").style.height = this._config.panel.panel_height + "px", this._elem.querySelector(".all_drag_panel").style.background = this._config.panel.panel_color, "free" === this._config.drag_type.type && this._setFreePanelPositionAndRadius(), "slide" === this._config.drag_type.type && this._setSlidePanelPositionAndRadius(), this._elem = this._elem.querySelector(".all_drag_panel"), this._config.panel.panel_hide && (this._elem.style.background = "transparent"), this._elem
        } catch (e) {
            console.error(e)
        }
    }

    _checkElementHasClosingTag(e) {
        try {
            return document.createElement(e).outerHTML.includes("/")
        } catch (e) {
            return !1
        }
    }

    _setFreePanelPositionAndRadius() {
        const e = this._config.panel.panel_radius;
        "top" === this._config.drag_type.freeDrag.panel_side && (this._elem.querySelector(".all_drag_panel").style.top = "0", this._elem.querySelector(".all_drag_panel").style.left = "0", this._elem.querySelector(".all_drag_panel").style.borderRadius = `${e}px ${e}px 0 0`), "bottom" === this._config.drag_type.freeDrag.panel_side && (this._elem.querySelector(".all_drag_panel").style.bottom = "0", this._elem.querySelector(".all_drag_panel").style.left = "0", this._elem.querySelector(".all_drag_panel").style.borderRadius = ` 0 0 ${e}px ${e}px `), "right" === this._config.drag_type.freeDrag.panel_side && (this._elem.querySelector(".all_drag_panel").style.right = "0", this._elem.querySelector(".all_drag_panel").style.top = "0", this._elem.querySelector(".all_drag_panel").style.width = this._config.panel.panel_height + "px", this._elem.querySelector(".all_drag_panel").style.height = "100%", this._elem.querySelector(".all_drag_panel").style.borderRadius = ` 0 ${e}px ${e}px 0 `), "left" === this._config.drag_type.freeDrag.panel_side && (this._elem.querySelector(".all_drag_panel").style.left = "0", this._elem.querySelector(".all_drag_panel").style.top = "0", this._elem.querySelector(".all_drag_panel").style.width = this._config.panel.panel_height + "px", this._elem.querySelector(".all_drag_panel").style.height = "100%", this._elem.querySelector(".all_drag_panel").style.borderRadius = ` ${e}px 0 0 ${e}px`)
    }

    _setSlidePanelPositionAndRadius() {
        const e = this._config.panel.panel_radius, t = this._config.panel;
        "bottom" === this._config.drag_type.slideDrag.direction && (this._elem.querySelector(".all_drag_panel").style.top = "0", this._elem.querySelector(".all_drag_panel").style.left = "0", this._elem.querySelector(".all_drag_panel").style.borderRadius = `${e}px ${e}px 0 0`), "top" === this._config.drag_type.slideDrag.direction && (this._elem.querySelector(".all_drag_panel").style.bottom = "0", this._elem.querySelector(".all_drag_panel").style.left = "0", this._elem.querySelector(".all_drag_panel").style.borderRadius = ` 0 0 ${e}px ${e}px `), "right" === this._config.drag_type.slideDrag.direction && (this._elem.querySelector(".all_drag_panel").style.left = "0", this._elem.querySelector(".all_drag_panel").style.width = t.panel_height + "px", this._elem.querySelector(".all_drag_panel").style.height = "100%", this._elem.querySelector(".all_drag_panel").style.borderRadius = `${e}px 0 0 ${e}px`), "left" === this._config.drag_type.slideDrag.direction && (this._elem.querySelector(".all_drag_panel").style.right = "0", this._elem.querySelector(".all_drag_panel").style.width = t.panel_height + "px", this._elem.querySelector(".all_drag_panel").style.height = "100%", this._elem.querySelector(".all_drag_panel").style.borderRadius = `0 ${e}px   ${e}px 0`)
    }
}

var r = new class extends t {
    constructor() {
        super()
    }

    addDragStartHandler(e) {
        ["mousedown", "touchstart"].forEach((t => {
            this._elem.addEventListener(t, e)
        }))
    }

    addDragMoveHandler(e) {
        ["mousemove", "touchmove"].forEach((t => {
            document.addEventListener(t, e)
        }))
    }

    addDragStopHandler(e) {
        ["mouseup", "touchend"].forEach((t => {
            document.addEventListener(t, e)
        }))
    }

    freeDragAnimation(e, t = "start") {
        e.style.transform = "" + ("start" === t ? `scale(${this._config.drag_type.freeDrag.drag_scale})` : "scale(1)"), e.style.boxShadow = "" + ("start" === t ? ` 0px ${this._config.drag_type.freeDrag.drag_shadow_distance}px ${this._config.drag_type.freeDrag.drag_shadow_blur}px ${this._config.drag_type.freeDrag.drag_shadow_color}` : "")
    }

    setInitDistrictArea(e) {
        let t = this._config.drag_type.freeDrag.allowedDistrict;
        if (!document.querySelector(`#${t}`)) return console.error("couldn't find any container please choose correct container id"), !1;
        t = document.querySelector(`#${t}`), t.style.position = "unset", e.style.left = t.offsetLeft + "px", e.style.top = t.offsetTop + "px"
    }

    containerLimitX(e, t) {
        let r = this._config.drag_type.freeDrag.allowedDistrict;
        return document.querySelector(`#${r}`) ? (r = document.querySelector(`#${r}`), !(r.getBoundingClientRect().left > +t) && r.getBoundingClientRect().width + r.getBoundingClientRect().left >= +t) : (console.error("couldn't find any container please choose correct container id"), !1)
    }

    containerLimitY(e, t) {
        let r = this._config.drag_type.freeDrag.allowedDistrict;
        return document.querySelector(`#${r}`) ? (r = document.querySelector(`#${r}`), !(r.getBoundingClientRect().top > +t) && r.getBoundingClientRect().top + r.getBoundingClientRect().height >= +t) : (console.error("couldn't find any container please choose correct container id"), !1)
    }
};
var l = new class extends t {
    _check_slide_open = !1;
    _check_allowed_slide_move = !1;
    _first_elem_width;
    _first_elem_height;

    constructor() {
        super()
    }

    initElementPosition(e) {
        const t = this._config.drag_type.slideDrag.direction;
        "left" === t && (e.style.left = `-${e.getBoundingClientRect().width - this._config.panel.panel_height}px`, e.style.top = `${this._config.drag_type.slideDrag.otherDirPos}%`, e.style.right = "unset"), "right" === t && (e.style.right = `-${e.getBoundingClientRect().width - this._config.panel.panel_height}px`, e.style.top = `${this._config.drag_type.slideDrag.otherDirPos}%`, e.style.left = "unset"), "top" === t && (e.style.top = `-${e.getBoundingClientRect().height - this._config.panel.panel_height}px`, e.style.left = `${this._config.drag_type.slideDrag.otherDirPos}%`, e.style.bottom = "unset"), "bottom" === t && (e.style.bottom = `-${e.getBoundingClientRect().height - this._config.panel.panel_height}px`, e.style.left = `${this._config.drag_type.slideDrag.otherDirPos}%`, e.style.top = "unset"), this._check_slide_open = !1
    }

    addClickToToggle() {
        let e = this._config.drag_type.slideDrag.clickToOpen;
        e = document.getElementById(e), e && e.addEventListener("click", this._toggleSlideHandler.bind(this))
    }

    _toggleSlideHandler() {
        const e = this._elem.parentElement;
        this._addAnimation(e), this._toggleSlide(this._config.drag_type.slideDrag.direction)
    }

    _toggleSlide(e) {
        this._check_slide_open ? this._check_slide_open && this.initElementPosition(this._elem.parentElement) : (this._config.drag_type.slideDrag.resizeToDefaultOnHide && (this._elem.parentElement.style.width = this._first_elem_width + "px", this._elem.parentElement.style.height = this._first_elem_height + "px"), this._elem.parentElement.style[e] = "0px", this._check_slide_open = !0)
    }

    addStartSlideDragEvent(e) {
        ["mousedown", "touchstart"].forEach((t => {
            this._elem.addEventListener(t, e)
        }))
    }

    addMoveSlideDragEvent(e) {
        ["mousemove", "touchmove"].forEach((t => {
            document.addEventListener(t, e.bind(this))
        }))
    }

    addStopSlideDragEvent(e) {
        ["mouseup", "touchend"].forEach((t => {
            document.addEventListener(t, e.bind(this))
        }))
    }

    setPositionOnDrag(e) {
        const t = this._config.drag_type.slideDrag.direction,
            r = "top" === t || "bottom" === t ? "clientHeight" : "clientWidth",
            l = "top" === t || "bottom" === t ? "clientY" : "clientX",
            a = ("top" === t || "bottom" === t ? this._first_elem_height : this._first_elem_width, "top" === t || "bottom" === t ? "height" : "width"),
            i = "right" === t || "bottom" === t;
        e = e[l] ? e[l] : e.changedTouches[0][l];
        const n = i ? -e : +e, s = (i ? document.documentElement[r] : 0) + n;
        this._elem.parentElement.style[t] = "0px", this._elem.parentElement.style[a] = s + "px"
    }

    closePercentage(e) {
        let t = !1;
        return t = this._calcAndCheckClosePercentageByElem(e), t
    }

    _calcAndCheckClosePercentageByElem(e) {
        const t = this._config.drag_type.slideDrag.direction, r = "top" === t || "bottom" === t ? "y" : "x",
            l = "bottom" === t || "right" === t,
            a = "self" === this._config.drag_type.slideDrag.percentBasis ? this._first_elem_width : document.documentElement.clientWidth,
            i = "self" === this._config.drag_type.slideDrag.percentBasis ? this._first_elem_height : document.documentElement.clientHeight,
            n = a * +this._config.drag_type.slideDrag.closePercent / 100,
            s = i * +this._config.drag_type.slideDrag.closePercent / 100;
        return "x" !== r || l ? "x" === r && l ? document.documentElement.clientWidth - e[0] < n : "y" !== r || l ? "y" === r && l ? document.documentElement.clientHeight - e[1] < s : void 0 : e[1] < s : e[0] < n
    }
};

class all_drag {
    _elem;
    _config;
    _dragDoneCount = 0;
    startSlideDragEvent;

    constructor() {
    }

    create(t, r) {
        t = document.querySelector(`#${t}`);
        let l = {};
        l = r || e, l = this._setConfig(l), this._config = l, this._elem = t, "free" === l.drag_type.type && this.controlFreeDrag(), "slide" === l.drag_type.type && this.controlSlideDrag()
    }

    controlFreeDrag() {
        let e;
        this._config = this._setFreeDragConfigs(this._config), r._config = this._config, r._elem = this._elem, r.initElemStyle(), "panel" === this._config.drag_type.freeDrag.drag_place ? (this._elem = r.generatePanel(), e = this._elem.parentElement) : e = this._elem, this._config.drag_type.freeDrag.allowedDistrict && r.setInitDistrictArea(e), r.addHoverHandler(r.setDraggingCursor(this._config.panel.hover_cursor)), r.addDragStartHandler(this.controlFreeDragStartHandler.bind(r)), r.addDragMoveHandler(this.controlFreeDragMoveHandler.bind(r)), r.addDragStopHandler(this.controlFreeDragStopHandler.bind(r))
    }

    controlSlideDrag() {
        this._config = this._setSlideDragOptions(this._config), l._config = this._config, l._elem = this._elem, l.initElemStyle(), l.initElementPosition(this._elem), l.generatePanel(), l.addHoverHandler(l.setDraggingCursor(this._config.panel.hover_cursor)), l._first_elem_width = l._elem.parentElement.getBoundingClientRect().width, l._first_elem_height = l._elem.parentElement.getBoundingClientRect().height, l.addClickToToggle(), l.addStartSlideDragEvent(this.controlStartSlideDragHandler), l.addMoveSlideDragEvent(this.controlMoveSlidDragHandler), l.addStopSlideDragEvent(this.controlStopSlideDragHandler)
    }

    _setConfig(t) {
        return t.drag_type || (t.drag_type = e.drag_type), t.drag_type && !t.drag_type.type && (t.drag_type.type = e.drag_type.type), t.drag_cursor || (t.drag_cursor = e.drag_cursor), t.revert || (t.revert = e.revert), t.draggableAllowedNumber || (t.draggableAllowedNumber = e.draggableAllowedNumber), t.panel || (t.panel = e.panel), t.panel.panel_color || (t.panel.panel_color = e.panel.panel_color), t.panel.panel_height || (t.panel.panel_height = e.panel.panel_height), t.panel.panel_radius || (t.panel.panel_radius = e.panel.panel_radius), t.panel.panel_hide || (t.panel.panel_hide = e.panel.panel_hide), t.panel.hover_cursor || (t.panel.hover_cursor = e.panel.hover_cursor), t
    }

    _setFreeDragConfigs(t) {
        return t.drag_type.freeDrag || (t.drag_type.freeDrag = e.drag_type.freeDrag), t.drag_type.freeDrag.drag_place || (t.drag_type.freeDrag.drag_place = e.drag_type.freeDrag.drag_place), t.drag_type.freeDrag.panel_side || (t.drag_type.freeDrag.panel_side = e.drag_type.freeDrag.panel_side), t.drag_type.freeDrag.drag_style || (t.drag_type.freeDrag.drag_style = e.drag_type.freeDrag.drag_style), t.drag_type.freeDrag.drag_scale || (t.drag_type.freeDrag.drag_scale = e.drag_type.freeDrag.drag_scale), t.drag_type.freeDrag.drag_shadow_color || (t.drag_type.freeDrag.drag_shadow_color = e.drag_type.freeDrag.drag_shadow_color), t.drag_type.freeDrag.drag_shadow_blur || (t.drag_type.freeDrag.drag_shadow_blur = e.drag_type.freeDrag.drag_shadow_blur), t.drag_type.freeDrag.drag_shadow_distance || (t.drag_type.freeDrag.drag_shadow_distance = e.drag_type.freeDrag.drag_shadow_distance), t.drag_type.freeDrag.allowedDistrict || (t.drag_type.freeDrag.allowedDistrict = e.drag_type.freeDrag.allowedDistrict), t
    }

    _setSlideDragOptions(t) {
        return t.drag_type.slideDrag || (t.drag_type.slideDrag = e.drag_type.slideDrag), t.drag_type.slideDrag.direction || (t.drag_type.slideDrag.direction = e.drag_type.slideDrag.direction), t.drag_type.slideDrag.closePercent || (t.drag_type.slideDrag.closePercent = e.drag_type.slideDrag.closePercent), t.drag_type.slideDrag.openPercent || (t.drag_type.slideDrag.openPercent = e.drag_type.slideDrag.openPercent), t.drag_type.slideDrag.clickToOpen || (t.drag_type.slideDrag.clickToOpen = e.drag_type.slideDrag.clickToOpen), t.drag_type.slideDrag.transitionDuration || (t.drag_type.slideDrag.transitionDuration = e.drag_type.slideDrag.transitionDuration), t.drag_type.slideDrag.resizeToDefaultOnHide || (t.drag_type.slideDrag.resizeToDefaultOnHide = e.drag_type.slideDrag.resizeToDefaultOnHide), t.drag_type.slideDrag.percentBasis || (t.drag_type.slideDrag.percentBasis = e.drag_type.slideDrag.percentBasis), t.drag_type.slideDrag.otherDirPos || (t.drag_type.slideDrag.otherDirPos = e.drag_type.slideDrag.otherDirPos), t
    }

    controlFreeDragStartHandler(e) {
        e.preventDefault();
        const t = e.clientY ? e.clientY : e.changedTouches[0].clientY,
            l = e.clientX ? e.clientX : e.changedTouches[0].clientX;
        [r._startPose.top, r._startPose.left] = [this._elem.getBoundingClientRect().top, this._elem.getBoundingClientRect().left], [r._Pose.top, r._Pose.left] = [t, l], r._checkClickPressed = !0;
        const a = new CustomEvent("allFreeDragStart", e);
        r._elem.dispatchEvent(a)
    }

    controlFreeDragMoveHandler(e) {
        if (r._checkClickPressed && (0 === this._config.draggableAllowedNumber || this._dragDoneCount < this._config.draggableAllowedNumber)) {
            this._config.drag_cursor && r.setDraggingCursor(this._config.drag_cursor);
            const t = e.clientY ? e.clientY : e.changedTouches[0].clientY,
                l = e.clientX ? e.clientX : e.changedTouches[0].clientX, a = r._Pose.top - t, i = r._Pose.left - l;
            let n;
            [r._Pose.top, r._Pose.left] = [t, l], n = "panel" !== this._config.drag_type.freeDrag.drag_place ? this._elem : this._elem.parentElement, "elevate" === this._config.drag_type.freeDrag.drag_style && r.freeDragAnimation(n);
            let s = !0, o = !0;
            this._config.drag_type.freeDrag.allowedDistrict && (s = r.containerLimitX(n, l)), this._config.drag_type.freeDrag.allowedDistrict && (o = r.containerLimitY(n, t)), s && (n.style.left = n.offsetLeft - i + "px"), o && (n.style.top = n.offsetTop - a + "px");
            const d = new CustomEvent("allFreeDragMove", e);
            r._elem.dispatchEvent(d)
        }
    }

    controlFreeDragStopHandler(e) {
        if (!r._checkClickPressed) return;
        let t;
        r._checkClickPressed = !1, t = "panel" !== this._config.drag_type.freeDrag.drag_place ? this._elem : this._elem.parentElement, "elevate" === this._config.drag_type.freeDrag.drag_style && r.freeDragAnimation(t, "end"), this._config.revert && r.revert(t), r.addHoverHandler(r.setDraggingCursor(this._config.panel.hover_cursor));
        const l = new CustomEvent("allFreeDragStop", e);
        r._elem.dispatchEvent(l), this._dragDoneCount++
    }

    controlStartSlideDragHandler(e) {
        l._check_allowed_slide_move = !0, [l._startPose.left, l._startPose.top] = [l._elem.getBoundingClientRect().left, l._elem.getBoundingClientRect().top];
        const t = new CustomEvent("allSlideDragStart", e);
        l._elem.dispatchEvent(t)
    }

    controlMoveSlidDragHandler(e) {
        if (l._check_allowed_slide_move && (0 === this._config.draggableAllowedNumber || this._dragDoneCount < this._config.draggableAllowedNumber)) {
            this._config.drag_cursor && l.setDraggingCursor(this._config.drag_cursor, !0), l.setPositionOnDrag.call(this, e);
            const t = new CustomEvent("allSlideDragMove", e);
            l._elem.dispatchEvent(t)
        }
    }

    controlStopSlideDragHandler(e) {
        if (!l._check_allowed_slide_move) return;
        if (l._check_allowed_slide_move = !1, l.addHoverHandler(l.setDraggingCursor(this._config.panel.hover_cursor, !1)), l._check_slide_open = !0, this._config.revert && (l._addAnimation(this._elem.parentElement), l.initElementPosition(this._elem.parentElement), l._check_slide_open = !1), this._config.drag_type.slideDrag.closePercent) {
            l.closePercentage([e.clientX, e.clientY]) && (l._addAnimation(this._elem.parentElement), l.initElementPosition(this._elem.parentElement), l._check_slide_open = !1)
        }
        const t = new CustomEvent("allSlideDragStop", e);
        l._elem.dispatchEvent(t), this._dragDoneCount++
    }
};var ALL_DRAG = new all_drag();
//# sourceMappingURL=index.5c07d309.js.map
