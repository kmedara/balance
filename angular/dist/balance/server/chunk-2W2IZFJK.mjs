import './polyfills.server.mjs';
import{a as fe,b as we}from"./chunk-NK7YMQCX.mjs";import{a as ve}from"./chunk-LGESB62A.mjs";import{a as ge}from"./chunk-MYMHFNVO.mjs";import"./chunk-63OY3SHZ.mjs";import"./chunk-MSMDXR2F.mjs";import"./chunk-MJRBX3EV.mjs";import{a as he,c as _e,d as be,f as k}from"./chunk-FISGGPSF.mjs";import{b as de,c as pe,d as x,g as ce,h as me,o as ue}from"./chunk-B4SXRSLL.mjs";import{L as $,b as z,d as oe,ea as ae,fa as se,ma as le,p as V}from"./chunk-V3BHSU5V.mjs";import{g as te,j as ne,l as ie,n as re}from"./chunk-X4V7OQD6.mjs";import{Ab as O,Bb as D,Cb as J,G as N,Ga as M,Ib as X,J as F,Ka as Q,L as _,La as R,Ma as p,Ob as Y,Q as b,R as v,S as P,Tb as y,Vb as C,X as T,Xa as w,Ya as S,Za as L,cb as o,db as c,eb as m,ec as f,fa as I,fb as j,fc as ee,jb as Z,kb as q,lb as g,mb as A,ob as B,pb as s,qb as H,ra as d,rb as G,sb as U,tb as W,ub as h,vb as u,zb as K}from"./chunk-OBUNMCM3.mjs";import{a as E}from"./chunk-G5JFDYF7.mjs";var ye=`
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border-style: solid;
        border-color: dt('drawer.border.color');
        box-shadow: dt('drawer.shadow');
    }

    .p-drawer-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: dt('drawer.content.padding');
    }

    .p-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('drawer.header.padding');
    }

    .p-drawer-footer {
        padding: dt('drawer.footer.padding');
    }

    .p-drawer-title {
        font-weight: dt('drawer.title.font.weight');
        font-size: dt('drawer.title.font.size');
    }

    .p-drawer-full .p-drawer {
        transition: none;
        transform: none;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100%;
        top: 0px !important;
        left: 0px !important;
        border-width: 1px;
    }

    .p-drawer-left .p-drawer-enter-active {
        animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-left .p-drawer-leave-active {
        animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-right .p-drawer-enter-active {
        animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-right .p-drawer-leave-active {
        animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-top .p-drawer-enter-active {
        animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-top .p-drawer-leave-active {
        animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-bottom .p-drawer-enter-active {
        animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-bottom .p-drawer-leave-active {
        animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .p-drawer-full .p-drawer-enter-active {
        animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .p-drawer-full .p-drawer-leave-active {
        animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
    }
    
    .p-drawer-left .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-end-width: 1px;
    }

    .p-drawer-right .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-start-width: 1px;
    }

    .p-drawer-top .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-end-width: 1px;
    }

    .p-drawer-bottom .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-start-width: 1px;
    }

    .p-drawer-left .p-drawer-content,
    .p-drawer-right .p-drawer-content,
    .p-drawer-top .p-drawer-content,
    .p-drawer-bottom .p-drawer-content {
        width: 100%;
        height: 100%;
    }

    .p-drawer-open {
        display: flex;
    }

    .p-drawer-mask:dir(rtl) {
        flex-direction: row-reverse;
    }

    @keyframes p-animate-drawer-enter-left {
        from {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-left {
        to {
            transform: translate3d(-100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-right {
        from {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-right {
        to {
            transform: translate3d(100%, 0px, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-top {
        from {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-top {
        to {
            transform: translate3d(0px, -100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-bottom {
        from {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-leave-bottom {
        to {
            transform: translate3d(0px, 100%, 0px);
        }
    }

    @keyframes p-animate-drawer-enter-full {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-drawer-leave-full {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;var Me=["header"],De=["footer"],Ee=["content"],Ie=["closeicon"],Se=["headless"],Le=["container"],Ae=["closeButton"],Be=["*"];function Oe(t,a){t&1&&g(0)}function ze(t,a){if(t&1&&p(0,Oe,1,0,"ng-container",4),t&2){let e=s(2);o("ngTemplateOutlet",e.headlessTemplate||e._headlessTemplate)}}function Ve(t,a){t&1&&g(0)}function $e(t,a){if(t&1&&(c(0,"div",9),D(1),m()),t&2){let e=s(3);O(e.cx("title")),o("pBind",e.ptm("title")),d(),J(e.header)}}function Ne(t,a){t&1&&(P(),j(0,"svg",12)),t&2&&w("data-pc-section","closeicon")}function Fe(t,a){}function Pe(t,a){t&1&&p(0,Fe,0,0,"ng-template")}function Qe(t,a){if(t&1&&p(0,Ne,1,1,"svg",11)(1,Pe,1,0,null,4),t&2){let e=s(4);o("ngIf",!e.closeIconTemplate&&!e._closeIconTemplate),d(),o("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function Re(t,a){if(t&1){let e=A();c(0,"p-button",10),B("onClick",function(i){b(e);let r=s(3);return v(r.close(i))})("keydown.enter",function(i){b(e);let r=s(3);return v(r.close(i))}),p(1,Qe,2,2,"ng-template",null,1,Y),m()}if(t&2){let e=s(3);o("pt",e.ptm("pcCloseButton"))("ngClass",e.cx("pcCloseButton"))("buttonProps",e.closeButtonProps)("ariaLabel",e.ariaCloseLabel)("unstyled",e.unstyled()),w("data-pc-group-section","iconcontainer")}}function je(t,a){t&1&&g(0)}function Ze(t,a){t&1&&g(0)}function qe(t,a){if(t&1&&(Z(0),c(1,"div",5),p(2,Ze,1,0,"ng-container",4),m(),q()),t&2){let e=s(3);d(),o("pBind",e.ptm("footer"))("ngClass",e.cx("footer")),w("data-pc-section","footer"),d(),o("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}function He(t,a){if(t&1&&(c(0,"div",5),p(1,Ve,1,0,"ng-container",4)(2,$e,2,4,"div",6)(3,Re,3,6,"p-button",7),m(),c(4,"div",5),G(5),p(6,je,1,0,"ng-container",4),m(),p(7,qe,3,4,"ng-container",8)),t&2){let e=s(2);o("pBind",e.ptm("header"))("ngClass",e.cx("header")),w("data-pc-section","header"),d(),o("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),d(),o("ngIf",e.header),d(),o("ngIf",e.showCloseIcon&&e.closable),d(),o("pBind",e.ptm("content"))("ngClass",e.cx("content")),w("data-pc-section","content"),d(2),o("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),d(),o("ngIf",e.footerTemplate||e._footerTemplate)}}function Ge(t,a){if(t&1){let e=A();c(0,"div",3,0),B("pMotionOnBeforeEnter",function(i){b(e);let r=s();return v(r.onBeforeEnter(i))})("pMotionOnAfterLeave",function(i){b(e);let r=s();return v(r.onAfterLeave(i))})("keydown",function(i){b(e);let r=s();return v(r.onKeyDown(i))}),S(2,ze,1,1,"ng-container")(3,He,8,11),m()}if(t&2){let e=s();K(e.style),O(e.cn(e.cx("root"),e.styleClass)),o("pBind",e.ptm("root"))("pMotion",e.visible)("pMotionAppear",!0)("pMotionEnterActiveClass",e.$enterAnimation())("pMotionLeaveActiveClass",e.$leaveAnimation())("pMotionOptions",e.computedMotionOptions()),w("data-p",e.dataP)("data-p-open",e.visible),d(2),L(e.headlessTemplate||e._headlessTemplate?2:3)}}var Ue=`
${ye}

/** For PrimeNG **/
.p-drawer {
    position: fixed;
}

.p-drawer-left {
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    border-inline-end-width: 1px;
}

.p-drawer-right {
    top: 0;
    right: 0;
    width: 20rem;
    height: 100%;
    border-inline-start-width: 1px;
}

.p-drawer-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-end-width: 1px;
}

.p-drawer-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-block-start-width: 1px;
}

.p-drawer-full {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: none;
    transition: none;
}

/* Animations */
.p-drawer-enter-left {
    animation: p-animate-drawer-enter-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-left {
    animation: p-animate-drawer-leave-left 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-right {
    animation: p-animate-drawer-enter-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-right {
    animation: p-animate-drawer-leave-right 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-top {
    animation: p-animate-drawer-enter-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-top {
    animation: p-animate-drawer-leave-top 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-bottom {
    animation: p-animate-drawer-enter-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-bottom {
    animation: p-animate-drawer-leave-bottom 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-enter-full {
    animation: p-animate-drawer-enter-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

.p-drawer-leave-full {
    animation: p-animate-drawer-leave-full 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
`,We={mask:({instance:t})=>["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter-active":t.modal},{"p-drawer-full":t.fullScreen()}],root:({instance:t})=>["p-drawer p-component",{"p-drawer-full":t.fullScreen(),"p-drawer-open":t.visible},`p-drawer-${t.position()}`],header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},Ce=(()=>{class t extends le{name="drawer";style=Ue;classes=We;static \u0275fac=(()=>{let e;return function(i){return(e||(e=I(t)))(i||t)}})();static \u0275prov=N({token:t,factory:t.\u0275fac})}return t})();var xe=new F("DRAWER_INSTANCE"),ke=(()=>{class t extends pe{componentName="Drawer";$pcDrawer=_(xe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=_(x,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}appendTo=C(void 0);motionOptions=C(void 0);computedMotionOptions=y(()=>E(E({},this.ptm("motion")),this.motionOptions()));blockScroll=!1;style;styleClass;ariaCloseLabel;autoZIndex=!0;baseZIndex=0;modal=!0;closeButtonProps={severity:"secondary",text:!0,rounded:!0};dismissible=!0;showCloseIcon=!0;closeOnEscape=!0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";get visible(){return this._visible??!1}set visible(e){this._visible=e,this._visible&&!this.modalVisible&&(this.modalVisible=!0)}position=C("left");fullScreen=C(!1);$enterAnimation=y(()=>this.fullScreen()?"p-drawer-enter-full":`p-drawer-enter-${this.position()}`);$leaveAnimation=y(()=>this.fullScreen()?"p-drawer-leave-full":`p-drawer-leave-${this.position()}`);header;maskStyle;closable=!0;onShow=new T;onHide=new T;visibleChange=new T;containerViewChild;closeButtonViewChild;initialized;_visible;_position="left";_fullScreen=!1;modalVisible=!1;container;mask;maskClickListener;documentEscapeListener;animationEndListener;_componentStyle=_(Ce);onAfterViewInit(){this.initialized=!0}headerTemplate;footerTemplate;contentTemplate;closeIconTemplate;headlessTemplate;$appendTo=y(()=>this.appendTo()||this.config.overlayAppendTo());_headerTemplate;_footerTemplate;_contentTemplate;_closeIconTemplate;_headlessTemplate;templates;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break;case"headless":this._headlessTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}onKeyDown(e){e.code==="Escape"&&this.hide(!1)}show(){this.container?.setAttribute(this.$attrSelector,""),this.autoZIndex&&k.set("modal",this.container,this.baseZIndex||this.config.zIndex.modal),this.modal&&this.enableModality(),this.onShow.emit({}),this.visibleChange.emit(!0)}hide(e=!0){e&&this.onHide.emit({}),this.modal&&this.disableModality()}close(e){this.hide(),this.visibleChange.emit(!1),e.preventDefault()}enableModality(){let e=this.document.querySelectorAll('[data-p-open="true"]'),n=e.length,i=n==1?String(parseInt(this.container.style.zIndex)-1):String(parseInt(e[n-1].style.zIndex)-1);if(!this.mask){if(this.mask=this.renderer.createElement("div"),this.mask){let r=`z-index: ${i};${this.getMaskStyle()}`;$(this.mask,"style",r),$(this.mask,"data-p",this.dataP),z(this.mask,this.cx("mask"))}this.dismissible&&(this.maskClickListener=this.renderer.listen(this.mask,"click",r=>{this.dismissible&&this.close(r)})),this.renderer.appendChild(this.document.body,this.mask),this.blockScroll&&ce()}}getMaskStyle(){return this.maskStyle?Object.entries(this.maskStyle).map(([e,n])=>`${e}: ${n}`).join("; "):""}disableModality(){this.mask&&(!this.$unstyled()&&oe(this.mask,"p-overlay-mask-enter-active"),!this.$unstyled()&&z(this.mask,"p-overlay-mask-leave-active"),this.animationEndListener=this.renderer.listen(this.mask,"animationend",this.destroyModal.bind(this)))}destroyModal(){this.unbindMaskClickListener(),this.mask&&this.renderer.removeChild(this.document.body,this.mask),this.blockScroll&&me(),this.unbindAnimationEndListener(),this.mask=null}onBeforeEnter(e){this.container=e.element,this.appendContainer(),this.show(),this.closeOnEscape&&this.bindDocumentEscapeListener()}onAfterLeave(){this.hide(!1),k.clear(this.container),this.unbindGlobalListeners(),this.modalVisible=!1,this.container=null}appendContainer(){this.$appendTo()&&this.$appendTo()!=="self"&&(this.$appendTo()==="body"?V(this.document.body,this.container):V(this.$appendTo(),this.container))}bindDocumentEscapeListener(){let e=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentEscapeListener=this.renderer.listen(e,"keydown",n=>{n.which==27&&parseInt(this.container?.style.zIndex)===k.get(this.container)&&this.close(n)})}unbindDocumentEscapeListener(){this.documentEscapeListener&&(this.documentEscapeListener(),this.documentEscapeListener=null)}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}unbindGlobalListeners(){this.unbindMaskClickListener(),this.unbindDocumentEscapeListener()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}onDestroy(){this.initialized=!1,this.visible&&this.modal&&this.destroyModal(),this.$appendTo()&&this.container&&this.renderer.appendChild(this.el.nativeElement,this.container),this.container&&this.autoZIndex&&k.clear(this.container),this.container=null,this.unbindGlobalListeners(),this.unbindAnimationEndListener()}get dataP(){return this.cn({"full-screen":this.position()==="full",[this.position()]:this.position(),open:this.visible,modal:this.modal})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=I(t)))(i||t)}})();static \u0275cmp=M({type:t,selectors:[["p-drawer"]],contentQueries:function(n,i,r){if(n&1&&U(r,Me,4)(r,De,4)(r,Ee,4)(r,Ie,4)(r,Se,4)(r,ae,4),n&2){let l;h(l=u())&&(i.headerTemplate=l.first),h(l=u())&&(i.footerTemplate=l.first),h(l=u())&&(i.contentTemplate=l.first),h(l=u())&&(i.closeIconTemplate=l.first),h(l=u())&&(i.headlessTemplate=l.first),h(l=u())&&(i.templates=l)}},viewQuery:function(n,i){if(n&1&&W(Le,5)(Ae,5),n&2){let r;h(r=u())&&(i.containerViewChild=r.first),h(r=u())&&(i.closeButtonViewChild=r.first)}},inputs:{appendTo:[1,"appendTo"],motionOptions:[1,"motionOptions"],blockScroll:[2,"blockScroll","blockScroll",f],style:"style",styleClass:"styleClass",ariaCloseLabel:"ariaCloseLabel",autoZIndex:[2,"autoZIndex","autoZIndex",f],baseZIndex:[2,"baseZIndex","baseZIndex",ee],modal:[2,"modal","modal",f],closeButtonProps:"closeButtonProps",dismissible:[2,"dismissible","dismissible",f],showCloseIcon:[2,"showCloseIcon","showCloseIcon",f],closeOnEscape:[2,"closeOnEscape","closeOnEscape",f],transitionOptions:"transitionOptions",visible:"visible",position:[1,"position"],fullScreen:[1,"fullScreen"],header:"header",maskStyle:"maskStyle",closable:[2,"closable","closable",f]},outputs:{onShow:"onShow",onHide:"onHide",visibleChange:"visibleChange"},features:[X([Ce,{provide:xe,useExisting:t},{provide:de,useExisting:t}]),Q([x]),R],ngContentSelectors:Be,decls:1,vars:1,consts:[["container",""],["icon",""],["role","complementary","pFocusTrap","",3,"pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions","class","style"],["role","complementary","pFocusTrap","",3,"pMotionOnBeforeEnter","pMotionOnAfterLeave","keydown","pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions"],[4,"ngTemplateOutlet"],[3,"pBind","ngClass"],[3,"pBind","class",4,"ngIf"],[3,"pt","ngClass","buttonProps","ariaLabel","unstyled","onClick","keydown.enter",4,"ngIf"],[4,"ngIf"],[3,"pBind"],[3,"onClick","keydown.enter","pt","ngClass","buttonProps","ariaLabel","unstyled"],["data-p-icon","times",4,"ngIf"],["data-p-icon","times"]],template:function(n,i){n&1&&(H(),S(0,Ge,4,13,"div",2)),n&2&&L(i.modalVisible?0:-1)},dependencies:[re,te,ne,ie,ue,he,se,x,we,fe,be,_e],encapsulation:2,changeDetection:0})}return t})();var zt=(()=>{class t{_service=_(ve);add=()=>{this._service.open(ge,{header:"header"})};static \u0275fac=function(n){return new(n||t)};static \u0275cmp=M({type:t,selectors:[["app-user-actions"]],decls:2,vars:1,consts:[[1,"w-30rem",3,"visible"]],template:function(n,i){n&1&&(c(0,"p-drawer",0),D(1,` Hello World
`),m()),n&2&&o("visible",!1)},dependencies:[ke],encapsulation:2})}return t})();export{zt as UserActions};
//# sourceMappingURL=chunk-2W2IZFJK.mjs.map
