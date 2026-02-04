import{b as ne,c as re,i as _,j as x}from"./chunk-XCY2XRND.js";import{Da as te,h as J,ha as X,j as K,l as W,ta as Y,ua as Z,va as ee,wa as D}from"./chunk-ORLIZKIJ.js";import{Ab as j,Bb as E,G as M,Ha as A,Hb as z,Ia as U,J as F,K as N,La as $,M as q,Ma as P,Na as l,O as f,Qb as G,W as B,Y as T,bb as s,cb as y,da as h,db as b,fa as Q,ga as I,i as R,ia as k,ib as w,jb as S,kb as v,ob as g,pb as V,qb as C,rb as H,sa as c,tb as d,ub as p,yb as L,zb as u}from"./chunk-TEZC5QSI.js";function $e(t,r){let e=r?.injector??f(B),o=new R(1),n=Q(()=>{let a;try{a=t()}catch(i){I(()=>o.error(i));return}I(()=>o.next(a))},{injector:e,manualCleanup:!0});return e.get(T).onDestroy(()=>{n.destroy(),o.complete()}),o.asObservable()}function Pe(t,r){let o=!r?.manualCleanup?r?.injector?.get(T)??f(T):null,n=se(r?.equal),a;r?.requireSync?a=h({kind:0},{equal:n}):a=h({kind:1,value:r?.initialValue},{equal:n});let i,O=t.subscribe({next:m=>a.set({kind:1,value:m}),error:m=>{a.set({kind:2,error:m}),i?.()},complete:()=>{i?.()}});if(r?.requireSync&&a().kind===0)throw new M(601,!1);return i=o?.onDestroy(O.unsubscribe.bind(O)),G(()=>{let m=a();switch(m.kind){case 1:return m.value;case 2:throw m.error;case 0:throw new M(601,!1)}},{equal:r?.equal})}function se(t=Object.is){return(r,e)=>r.kind===1&&e.kind===1&&t(r.value,e.value)}var ie=`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`;var ce=["header"],le=["title"],de=["subtitle"],pe=["content"],ue=["footer"],me=["*",[["p-header"]],[["p-footer"]]],fe=["*","p-header","p-footer"];function ye(t,r){t&1&&v(0)}function be(t,r){if(t&1&&(y(0,"div",1),C(1,1),l(2,ye,1,0,"ng-container",2),b()),t&2){let e=g();u(e.cx("header")),s("pBind",e.ptm("header")),c(2),s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)}}function ge(t,r){if(t&1&&(w(0),j(1),S()),t&2){let e=g(2);c(),E(e.header)}}function ve(t,r){t&1&&v(0)}function he(t,r){if(t&1&&(y(0,"div",1),l(1,ge,2,1,"ng-container",3)(2,ve,1,0,"ng-container",2),b()),t&2){let e=g();u(e.cx("title")),s("pBind",e.ptm("title")),c(),s("ngIf",e.header&&!e._titleTemplate&&!e.titleTemplate),c(),s("ngTemplateOutlet",e.titleTemplate||e._titleTemplate)}}function _e(t,r){if(t&1&&(w(0),j(1),S()),t&2){let e=g(2);c(),E(e.subheader)}}function Te(t,r){t&1&&v(0)}function Ce(t,r){if(t&1&&(y(0,"div",1),l(1,_e,2,1,"ng-container",3)(2,Te,1,0,"ng-container",2),b()),t&2){let e=g();u(e.cx("subtitle")),s("pBind",e.ptm("subtitle")),c(),s("ngIf",e.subheader&&!e._subtitleTemplate&&!e.subtitleTemplate),c(),s("ngTemplateOutlet",e.subtitleTemplate||e._subtitleTemplate)}}function De(t,r){t&1&&v(0)}function xe(t,r){t&1&&v(0)}function Me(t,r){if(t&1&&(y(0,"div",1),C(1,2),l(2,xe,1,0,"ng-container",2),b()),t&2){let e=g();u(e.cx("footer")),s("pBind",e.ptm("footer")),c(2),s("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}var Ie=`
    ${ie}

    .p-card {
        display: block;
    }
`,ke={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},oe=(()=>{class t extends te{name="card";style=Ie;classes=ke;static \u0275fac=(()=>{let e;return function(n){return(e||(e=k(t)))(n||t)}})();static \u0275prov=F({token:t,factory:t.\u0275fac})}return t})();var ae=new q("CARD_INSTANCE"),we=(()=>{class t extends re{componentName="Card";$pcCard=f(ae,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=f(_,{self:!0});_componentStyle=f(oe);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}header;subheader;set style(e){X(this._style(),e)||(this._style.set(e),this.el?.nativeElement&&e&&Object.keys(e).forEach(o=>{this.el.nativeElement.style[o]=e[o]}))}get style(){return this._style()}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=h(null);getBlockableElement(){return this.el.nativeElement}templates;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"header":this._headerTemplate=e.template;break;case"title":this._titleTemplate=e.template;break;case"subtitle":this._subtitleTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=k(t)))(n||t)}})();static \u0275cmp=A({type:t,selectors:[["p-card"]],contentQueries:function(o,n,a){if(o&1&&H(a,Y,5)(a,Z,5)(a,ce,4)(a,le,4)(a,de,4)(a,pe,4)(a,ue,4)(a,ee,4),o&2){let i;d(i=p())&&(n.headerFacet=i.first),d(i=p())&&(n.footerFacet=i.first),d(i=p())&&(n.headerTemplate=i.first),d(i=p())&&(n.titleTemplate=i.first),d(i=p())&&(n.subtitleTemplate=i.first),d(i=p())&&(n.contentTemplate=i.first),d(i=p())&&(n.footerTemplate=i.first),d(i=p())&&(n.templates=i)}},hostVars:4,hostBindings:function(o,n){o&2&&(L(n._style()),u(n.cn(n.cx("root"),n.styleClass)))},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[z([oe,{provide:ae,useExisting:t},{provide:ne,useExisting:t}]),$([_]),P],ngContentSelectors:fe,decls:8,vars:11,consts:[[3,"pBind","class",4,"ngIf"],[3,"pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"]],template:function(o,n){o&1&&(V(me),l(0,be,3,4,"div",0),y(1,"div",1),l(2,he,3,5,"div",0)(3,Ce,3,5,"div",0),y(4,"div",1),C(5),l(6,De,1,0,"ng-container",2),b(),l(7,Me,3,4,"div",0),b()),o&2&&(s("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),c(),u(n.cx("body")),s("pBind",n.ptm("body")),c(),s("ngIf",n.header||n.titleTemplate||n._titleTemplate),c(),s("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),c(),u(n.cx("content")),s("pBind",n.ptm("content")),c(2),s("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),c(),s("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[W,J,K,D,x,_],encapsulation:2,changeDetection:0})}return t})(),pt=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=U({type:t});static \u0275inj=N({imports:[we,D,x,D,x]})}return t})();export{$e as a,Pe as b,we as c,pt as d};
//# sourceMappingURL=chunk-F37M7ID2.js.map
