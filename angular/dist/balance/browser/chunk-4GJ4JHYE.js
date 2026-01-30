import{a as oe,b as ae,c as le,d as ce,e as w,f as se,h as de,i as pe,j as ue,k as me}from"./chunk-4W46ZO3O.js";import{a as Z,c as ee,d as te,j as ne,k as ie,l as re}from"./chunk-KFJKI34D.js";import{$ as S,Bb as M,Ia as C,Ja as B,K as I,La as A,M as q,Ma as p,N as O,R as b,Sa as U,Ta as L,Ua as V,Va as P,W as Q,Wa as c,X as N,Xa as s,Ya as d,Za as z,bb as E,cb as R,da as T,db as h,eb as $,ga as k,gb as H,hb as u,ib as G,jb as D,kb as m,lb as f,mb as g,ob as J,pb as v,qb as _,rb as j,sa as o,sb as K,tb as W,ub as X,vb as Y,xb as x}from"./chunk-2T34ZMMM.js";function fe(e,i){let l=!i?.manualCleanup?i?.injector?.get(S)??b(S):null,n=be(i?.equal),a;i?.requireSync?a=T({kind:0},{equal:n}):a=T({kind:1,value:i?.initialValue},{equal:n});let r,F=e.subscribe({next:y=>a.set({kind:1,value:y}),error:y=>{a.set({kind:2,error:y}),r?.()},complete:()=>{r?.()}});if(i?.requireSync&&a().kind===0)throw new I(601,!1);return r=l?.onDestroy(F.unsubscribe.bind(F)),M(()=>{let y=a();switch(y.kind){case 1:return y.value;case 2:throw y.error;case 0:throw new I(601,!1)}},{equal:i?.equal})}function be(e=Object.is){return(i,t)=>i.kind===1&&t.kind===1&&e(i.value,t.value)}var ge=`
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
`;var Te=["header"],xe=["title"],Ce=["subtitle"],De=["content"],Me=["footer"],we=["*",[["p-header"]],[["p-footer"]]],Ie=["*","p-header","p-footer"];function Se(e,i){e&1&&h(0)}function ke(e,i){if(e&1&&(s(0,"div"),D(1,1),p(2,Se,1,0,"ng-container",1),d()),e&2){let t=u();v(t.cx("header")),o(2),c("ngTemplateOutlet",t.headerTemplate||t._headerTemplate)}}function Ee(e,i){if(e&1&&(E(0),_(1),R()),e&2){let t=u(2);o(),j(t.header)}}function Re(e,i){e&1&&h(0)}function je(e,i){if(e&1&&(s(0,"div"),p(1,Ee,2,1,"ng-container",2)(2,Re,1,0,"ng-container",1),d()),e&2){let t=u();v(t.cx("title")),o(),c("ngIf",t.header&&!t._titleTemplate&&!t.titleTemplate),o(),c("ngTemplateOutlet",t.titleTemplate||t._titleTemplate)}}function Fe(e,i){if(e&1&&(E(0),_(1),R()),e&2){let t=u(2);o(),j(t.subheader)}}function qe(e,i){e&1&&h(0)}function Oe(e,i){if(e&1&&(s(0,"div"),p(1,Fe,2,1,"ng-container",2)(2,qe,1,0,"ng-container",1),d()),e&2){let t=u();v(t.cx("subtitle")),o(),c("ngIf",t.subheader&&!t._subtitleTemplate&&!t.subtitleTemplate),o(),c("ngTemplateOutlet",t.subtitleTemplate||t._subtitleTemplate)}}function Qe(e,i){e&1&&h(0)}function Ne(e,i){e&1&&h(0)}function Be(e,i){if(e&1&&(s(0,"div"),D(1,2),p(2,Ne,1,0,"ng-container",1),d()),e&2){let t=u();v(t.cx("footer")),o(2),c("ngTemplateOutlet",t.footerTemplate||t._footerTemplate)}}var Ae=`
    ${ge}

    .p-card {
        display: block;
    }
`,Ue={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},ve=(()=>{class e extends se{name="card";theme=Ae;classes=Ue;static \u0275fac=(()=>{let t;return function(n){return(t||(t=k(e)))(n||e)}})();static \u0275prov=q({token:e,factory:e.\u0275fac})}return e})();var Le=(()=>{class e extends de{header;subheader;set style(t){oe(this._style(),t)||this._style.set(t)}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=T(null);_componentStyle=b(ve);getBlockableElement(){return this.el.nativeElement.children[0]}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this._headerTemplate=t.template;break;case"title":this._titleTemplate=t.template;break;case"subtitle":this._subtitleTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;case"footer":this._footerTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=k(e)))(n||e)}})();static \u0275cmp=C({type:e,selectors:[["p-card"]],contentQueries:function(l,n,a){if(l&1&&(m(a,ae,5),m(a,le,5),m(a,Te,4),m(a,xe,4),m(a,Ce,4),m(a,De,4),m(a,Me,4),m(a,ce,4)),l&2){let r;f(r=g())&&(n.headerFacet=r.first),f(r=g())&&(n.footerFacet=r.first),f(r=g())&&(n.headerTemplate=r.first),f(r=g())&&(n.titleTemplate=r.first),f(r=g())&&(n.subtitleTemplate=r.first),f(r=g())&&(n.contentTemplate=r.first),f(r=g())&&(n.footerTemplate=r.first),f(r=g())&&(n.templates=r)}},hostVars:5,hostBindings:function(l,n){l&2&&(U("data-pc-name","card"),J(n._style()),v(n.cn(n.cx("root"),n.styleClass)))},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[Y([ve]),A],ngContentSelectors:Ie,decls:8,vars:9,consts:[[3,"class",4,"ngIf"],[4,"ngTemplateOutlet"],[4,"ngIf"]],template:function(l,n){l&1&&(G(we),p(0,ke,3,3,"div",0),s(1,"div"),p(2,je,3,4,"div",0)(3,Oe,3,4,"div",0),s(4,"div"),D(5),p(6,Qe,1,0,"ng-container",1),d(),p(7,Be,3,3,"div",0),d()),l&2&&(c("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),o(),v(n.cx("body")),o(),c("ngIf",n.header||n.titleTemplate||n._titleTemplate),o(),c("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),o(),v(n.cx("content")),o(2),c("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),o(),c("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[te,Z,ee,w],encapsulation:2,changeDetection:0})}return e})(),_e=(()=>{class e{static \u0275fac=function(l){return new(l||e)};static \u0275mod=B({type:e});static \u0275inj=O({imports:[Le,w,w]})}return e})();function Ve(e,i){if(e&1&&(s(0,"span",9)(1,"a",10),_(2),d()()),e&2){let t=i.$implicit;o(),c("routerLink",X(t.route)),o(),K(" ",t.name," ")}}function Pe(e,i){if(e&1&&(s(0,"div",7),z(1,"i",8),V(2,Ve,3,3,"span",9,L),d()),e&2){let t=u();o(2),P(t.navigation())}}function ze(e,i){if(e&1&&_(0),e&2){let t=u();W(" ",t.navigation()[0].name,"",t.navigation()[0].route," ")}}function $e(e,i){e&1&&_(0," Footer ")}function He(e,i){e&1&&_(0," Footer ")}var ye=class e{route=b(ne);data=fe(this.route.data);navigation=M(()=>this.data().routes);onActivate(i){console.log("Activated component:",i)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=C({type:e,selectors:[["app-default"]],decls:15,vars:0,consts:[["start",""],["end",""],["id","wrapper",1,"flex","flex-col","h-full"],["id","header"],["id","content",1,"flex-1","bg-red-400","p-4"],[3,"activate"],["id","footer"],[1,"flex","items-center","gap-2"],[1,"pi","pi-home",2,"font-size","3rem"],[1,"nav-item"],[3,"routerLink"]],template:function(t,l){if(t&1){let n=$();s(0,"div",2)(1,"header",3)(2,"p-toolbar"),p(3,Pe,4,0,"ng-template",null,0,x)(5,ze,1,2,"ng-template",null,1,x),d()(),s(7,"main",4)(8,"router-outlet",5),H("activate",function(r){return Q(n),N(l.onActivate(r))}),d()(),s(9,"footer",6)(10,"p-toolbar"),p(11,$e,1,0,"ng-template",null,0,x)(13,He,1,0,"ng-template",null,1,x),d()()()}},dependencies:[ue,pe,me,_e,ie,re],styles:[".active[_ngcontent-%COMP%]{color:red!important;text-decoration:underline!important}"]})};export{ye as Default};
