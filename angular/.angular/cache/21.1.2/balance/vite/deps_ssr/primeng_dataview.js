import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  ObjectUtils,
  Tooltip,
  zindexutils
} from "./chunk-IHHV2IM2.js";
import {
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleRightIcon,
  AngleUpIcon,
  AutoFocus,
  BlankIcon,
  CheckIcon,
  ChevronDownIcon,
  Fluid,
  SearchIcon,
  SpinnerIcon,
  TimesIcon
} from "./chunk-USZKNKDR.js";
import {
  ConnectedOverlayScrollHandler,
  unblockBodyScroll
} from "./chunk-BQLUBI6P.js";
import {
  BaseEditableHolder,
  BaseModelHolder,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgControlStatus,
  NgModel
} from "./chunk-CWZVH2QB.js";
import {
  Ripple
} from "./chunk-RBRXKJT5.js";
import {
  BaseComponent,
  PARENT_INSTANCE
} from "./chunk-JVI4AJSN.js";
import {
  Bind,
  BindModule
} from "./chunk-SDOJQDJG.js";
import {
  BaseStyle
} from "./chunk-AR443PNM.js";
import {
  FilterService,
  Footer,
  Header,
  OverlayService,
  PrimeTemplate,
  SharedModule,
  TranslationKeys
} from "./chunk-6ID6GOZH.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  SlicePipe,
  isPlatformBrowser
} from "./chunk-TKCQAPSZ.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  input,
  numberAttribute,
  output,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-F4T7EXKF.js";
import {
  EventEmitter,
  InjectionToken,
  Injector,
  NgZone,
  computed,
  effect,
  forwardRef,
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵnamespaceSVG,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-DD45DLIS.js";
import "./chunk-O5J3CNTX.js";
import "./chunk-OISFYD5W.js";
import {
  D,
  I,
  J,
  Kt,
  Lt,
  M,
  Mt,
  P,
  Qt,
  Rt,
  Tt,
  W,
  Yt,
  b,
  bt,
  et,
  j,
  k,
  l,
  oe,
  p,
  qt,
  s,
  s3 as s2,
  te,
  ut,
  v,
  vt,
  w2 as w,
  y,
  z2 as z
} from "./chunk-TKANYPZW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-6DU2HRTW.js";

// node_modules/primeng/fesm2022/primeng-baseinput.mjs
var BaseInput = class _BaseInput extends BaseEditableHolder {
  pcFluid = inject(Fluid, {
    optional: true,
    host: true,
    skipSelf: true
  });
  /**
   * Spans 100% width of the container when enabled.
   * @defaultValue false
   * @group Props
   */
  fluid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "fluid"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * Specifies the input variant of the component.
   * @defaultValue 'outlined'
   * @group Props
   */
  variant = input(...ngDevMode ? [void 0, {
    debugName: "variant"
  }] : []);
  /**
   * Specifies the size of the component.
   * @defaultValue undefined
   * @group Props
   */
  size = input(...ngDevMode ? [void 0, {
    debugName: "size"
  }] : []);
  /**
   * Specifies the visible width of the input element in characters.
   * @defaultValue undefined
   * @group Props
   */
  inputSize = input(...ngDevMode ? [void 0, {
    debugName: "inputSize"
  }] : []);
  /**
   * Specifies the value must match the pattern.
   * @defaultValue undefined
   * @group Props
   */
  pattern = input(...ngDevMode ? [void 0, {
    debugName: "pattern"
  }] : []);
  /**
   * The value must be greater than or equal to the value.
   * @defaultValue undefined
   * @group Props
   */
  min = input(...ngDevMode ? [void 0, {
    debugName: "min"
  }] : []);
  /**
   * The value must be less than or equal to the value.
   * @defaultValue undefined
   * @group Props
   */
  max = input(...ngDevMode ? [void 0, {
    debugName: "max"
  }] : []);
  /**
   * Unless the step is set to the any literal, the value must be min + an integral multiple of the step.
   * @defaultValue undefined
   * @group Props
   */
  step = input(...ngDevMode ? [void 0, {
    debugName: "step"
  }] : []);
  /**
   * The number of characters (code points) must not be less than the value of the attribute, if non-empty.
   * @defaultValue undefined
   * @group Props
   */
  minlength = input(...ngDevMode ? [void 0, {
    debugName: "minlength"
  }] : []);
  /**
   * The number of characters (code points) must not exceed the value of the attribute.
   * @defaultValue undefined
   * @group Props
   */
  maxlength = input(...ngDevMode ? [void 0, {
    debugName: "maxlength"
  }] : []);
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : []);
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵBaseInput_BaseFactory;
    return function BaseInput_Factory(__ngFactoryType__) {
      return (ɵBaseInput_BaseFactory || (ɵBaseInput_BaseFactory = ɵɵgetInheritedFactory(_BaseInput)))(__ngFactoryType__ || _BaseInput);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _BaseInput,
    inputs: {
      fluid: [1, "fluid"],
      variant: [1, "variant"],
      size: [1, "size"],
      inputSize: [1, "inputSize"],
      pattern: [1, "pattern"],
      min: [1, "min"],
      max: [1, "max"],
      step: [1, "step"],
      minlength: [1, "minlength"],
      maxlength: [1, "maxlength"]
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseInput, [{
    type: Directive,
    args: [{
      standalone: true
    }]
  }], null, {
    fluid: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "fluid",
        required: false
      }]
    }],
    variant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "variant",
        required: false
      }]
    }],
    size: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "size",
        required: false
      }]
    }],
    inputSize: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "inputSize",
        required: false
      }]
    }],
    pattern: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pattern",
        required: false
      }]
    }],
    min: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "min",
        required: false
      }]
    }],
    max: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "max",
        required: false
      }]
    }],
    step: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "step",
        required: false
      }]
    }],
    minlength: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "minlength",
        required: false
      }]
    }],
    maxlength: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "maxlength",
        required: false
      }]
    }]
  });
})();

// node_modules/@primeuix/styles/dist/iconfield/index.mjs
var style = "\n    .p-iconfield {\n        position: relative;\n        display: block;\n    }\n\n    .p-inputicon {\n        position: absolute;\n        top: 50%;\n        margin-top: calc(-1 * (dt('icon.size') / 2));\n        color: dt('iconfield.icon.color');\n        line-height: 1;\n        z-index: 1;\n    }\n\n    .p-iconfield .p-inputicon:first-child {\n        inset-inline-start: dt('form.field.padding.x');\n    }\n\n    .p-iconfield .p-inputicon:last-child {\n        inset-inline-end: dt('form.field.padding.x');\n    }\n\n    .p-iconfield .p-inputtext:not(:first-child),\n    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {\n        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-iconfield .p-inputtext:not(:last-child) {\n        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {\n        font-size: dt('form.field.sm.font.size');\n        width: dt('form.field.sm.font.size');\n        height: dt('form.field.sm.font.size');\n        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));\n    }\n\n    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {\n        font-size: dt('form.field.lg.font.size');\n        width: dt('form.field.lg.font.size');\n        height: dt('form.field.lg.font.size');\n        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));\n    }\n";

// node_modules/primeng/fesm2022/primeng-iconfield.mjs
var _c0 = ["*"];
var classes = {
  root: ({
    instance
  }) => ["p-iconfield", {
    "p-iconfield-left": instance.iconPosition == "left",
    "p-iconfield-right": instance.iconPosition == "right"
  }]
};
var IconFieldStyle = class _IconFieldStyle extends BaseStyle {
  name = "iconfield";
  style = style;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵIconFieldStyle_BaseFactory;
    return function IconFieldStyle_Factory(__ngFactoryType__) {
      return (ɵIconFieldStyle_BaseFactory || (ɵIconFieldStyle_BaseFactory = ɵɵgetInheritedFactory(_IconFieldStyle)))(__ngFactoryType__ || _IconFieldStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _IconFieldStyle,
    factory: _IconFieldStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconFieldStyle, [{
    type: Injectable
  }], null, null);
})();
var IconFieldClasses;
(function(IconFieldClasses2) {
  IconFieldClasses2["root"] = "p-iconfield";
})(IconFieldClasses || (IconFieldClasses = {}));
var ICONFIELD_INSTANCE = new InjectionToken("ICONFIELD_INSTANCE");
var IconField = class _IconField extends BaseComponent {
  componentName = "IconField";
  hostName = "";
  _componentStyle = inject(IconFieldStyle);
  $pcIconField = inject(ICONFIELD_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Position of the icon.
   * @group Props
   */
  iconPosition = "left";
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵIconField_BaseFactory;
    return function IconField_Factory(__ngFactoryType__) {
      return (ɵIconField_BaseFactory || (ɵIconField_BaseFactory = ɵɵgetInheritedFactory(_IconField)))(__ngFactoryType__ || _IconField);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _IconField,
    selectors: [["p-iconfield"], ["p-iconField"], ["p-icon-field"]],
    hostVars: 2,
    hostBindings: function IconField_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      hostName: "hostName",
      iconPosition: "iconPosition",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([IconFieldStyle, {
      provide: ICONFIELD_INSTANCE,
      useExisting: _IconField
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _IconField
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function IconField_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconField, [{
    type: Component,
    args: [{
      selector: "p-iconfield, p-iconField, p-icon-field",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: ` <ng-content></ng-content>`,
      providers: [IconFieldStyle, {
        provide: ICONFIELD_INSTANCE,
        useExisting: IconField
      }, {
        provide: PARENT_INSTANCE,
        useExisting: IconField
      }],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class]": "cn(cx('root'), styleClass)"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    hostName: [{
      type: Input
    }],
    iconPosition: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }]
  });
})();
var IconFieldModule = class _IconFieldModule {
  static ɵfac = function IconFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IconFieldModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _IconFieldModule,
    imports: [IconField],
    exports: [IconField]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [IconField]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconFieldModule, [{
    type: NgModule,
    args: [{
      imports: [IconField],
      exports: [IconField]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-inputicon.mjs
var _c02 = ["*"];
var classes2 = {
  root: "p-inputicon"
};
var InputIconStyle = class _InputIconStyle extends BaseStyle {
  name = "inputicon";
  classes = classes2;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputIconStyle_BaseFactory;
    return function InputIconStyle_Factory(__ngFactoryType__) {
      return (ɵInputIconStyle_BaseFactory || (ɵInputIconStyle_BaseFactory = ɵɵgetInheritedFactory(_InputIconStyle)))(__ngFactoryType__ || _InputIconStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputIconStyle,
    factory: _InputIconStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIconStyle, [{
    type: Injectable
  }], null, null);
})();
var INPUTICON_INSTANCE = new InjectionToken("INPUTICON_INSTANCE");
var InputIcon = class _InputIcon extends BaseComponent {
  componentName = "InputIcon";
  hostName = "";
  /**
   * Style class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  _componentStyle = inject(InputIconStyle);
  $pcInputIcon = inject(INPUTICON_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputIcon_BaseFactory;
    return function InputIcon_Factory(__ngFactoryType__) {
      return (ɵInputIcon_BaseFactory || (ɵInputIcon_BaseFactory = ɵɵgetInheritedFactory(_InputIcon)))(__ngFactoryType__ || _InputIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _InputIcon,
    selectors: [["p-inputicon"], ["p-inputIcon"]],
    hostVars: 2,
    hostBindings: function InputIcon_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      hostName: "hostName",
      styleClass: "styleClass"
    },
    features: [ɵɵProvidersFeature([InputIconStyle, {
      provide: INPUTICON_INSTANCE,
      useExisting: _InputIcon
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _InputIcon
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c02,
    decls: 1,
    vars: 0,
    template: function InputIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [CommonModule, SharedModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIcon, [{
    type: Component,
    args: [{
      selector: "p-inputicon, p-inputIcon",
      standalone: true,
      imports: [CommonModule, SharedModule, BindModule],
      template: `<ng-content></ng-content>`,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [InputIconStyle, {
        provide: INPUTICON_INSTANCE,
        useExisting: InputIcon
      }, {
        provide: PARENT_INSTANCE,
        useExisting: InputIcon
      }],
      hostDirectives: [Bind],
      host: {
        "[class]": "cn(cx('root'), styleClass)"
      }
    }]
  }], null, {
    hostName: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }]
  });
})();
var InputIconModule = class _InputIconModule {
  static ɵfac = function InputIconModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputIconModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputIconModule,
    imports: [InputIcon, SharedModule],
    exports: [InputIcon, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [InputIcon, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIconModule, [{
    type: NgModule,
    args: [{
      imports: [InputIcon, SharedModule],
      exports: [InputIcon, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/inputtext/index.mjs
var style2 = "\n    .p-inputtext {\n        font-family: inherit;\n        font-feature-settings: inherit;\n        font-size: 1rem;\n        color: dt('inputtext.color');\n        background: dt('inputtext.background');\n        padding-block: dt('inputtext.padding.y');\n        padding-inline: dt('inputtext.padding.x');\n        border: 1px solid dt('inputtext.border.color');\n        transition:\n            background dt('inputtext.transition.duration'),\n            color dt('inputtext.transition.duration'),\n            border-color dt('inputtext.transition.duration'),\n            outline-color dt('inputtext.transition.duration'),\n            box-shadow dt('inputtext.transition.duration');\n        appearance: none;\n        border-radius: dt('inputtext.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('inputtext.shadow');\n    }\n\n    .p-inputtext:enabled:hover {\n        border-color: dt('inputtext.hover.border.color');\n    }\n\n    .p-inputtext:enabled:focus {\n        border-color: dt('inputtext.focus.border.color');\n        box-shadow: dt('inputtext.focus.ring.shadow');\n        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');\n        outline-offset: dt('inputtext.focus.ring.offset');\n    }\n\n    .p-inputtext.p-invalid {\n        border-color: dt('inputtext.invalid.border.color');\n    }\n\n    .p-inputtext.p-variant-filled {\n        background: dt('inputtext.filled.background');\n    }\n\n    .p-inputtext.p-variant-filled:enabled:hover {\n        background: dt('inputtext.filled.hover.background');\n    }\n\n    .p-inputtext.p-variant-filled:enabled:focus {\n        background: dt('inputtext.filled.focus.background');\n    }\n\n    .p-inputtext:disabled {\n        opacity: 1;\n        background: dt('inputtext.disabled.background');\n        color: dt('inputtext.disabled.color');\n    }\n\n    .p-inputtext::placeholder {\n        color: dt('inputtext.placeholder.color');\n    }\n\n    .p-inputtext.p-invalid::placeholder {\n        color: dt('inputtext.invalid.placeholder.color');\n    }\n\n    .p-inputtext-sm {\n        font-size: dt('inputtext.sm.font.size');\n        padding-block: dt('inputtext.sm.padding.y');\n        padding-inline: dt('inputtext.sm.padding.x');\n    }\n\n    .p-inputtext-lg {\n        font-size: dt('inputtext.lg.font.size');\n        padding-block: dt('inputtext.lg.padding.y');\n        padding-inline: dt('inputtext.lg.padding.x');\n    }\n\n    .p-inputtext-fluid {\n        width: 100%;\n    }\n";

// node_modules/primeng/fesm2022/primeng-inputtext.mjs
var style3 = (
  /*css*/
  `
    ${style2}

    /* For PrimeNG */
   .p-inputtext.ng-invalid.ng-dirty {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.ng-invalid.ng-dirty::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`
);
var classes3 = {
  root: ({
    instance
  }) => ["p-inputtext p-component", {
    "p-filled": instance.$filled(),
    "p-inputtext-sm": instance.pSize === "small",
    "p-inputtext-lg": instance.pSize === "large",
    "p-invalid": instance.invalid(),
    "p-variant-filled": instance.$variant() === "filled",
    "p-inputtext-fluid": instance.hasFluid
  }]
};
var InputTextStyle = class _InputTextStyle extends BaseStyle {
  name = "inputtext";
  style = style3;
  classes = classes3;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputTextStyle_BaseFactory;
    return function InputTextStyle_Factory(__ngFactoryType__) {
      return (ɵInputTextStyle_BaseFactory || (ɵInputTextStyle_BaseFactory = ɵɵgetInheritedFactory(_InputTextStyle)))(__ngFactoryType__ || _InputTextStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputTextStyle,
    factory: _InputTextStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextStyle, [{
    type: Injectable
  }], null, null);
})();
var InputTextClasses;
(function(InputTextClasses2) {
  InputTextClasses2["root"] = "p-inputtext";
})(InputTextClasses || (InputTextClasses = {}));
var INPUTTEXT_INSTANCE = new InjectionToken("INPUTTEXT_INSTANCE");
var InputText = class _InputText extends BaseModelHolder {
  componentName = "InputText";
  hostName = "";
  /**
   * Used to pass attributes to DOM elements inside the InputText component.
   * @defaultValue undefined
   * @deprecated use pInputTextPT instead.
   * @group Props
   */
  ptInputText = input(...ngDevMode ? [void 0, {
    debugName: "ptInputText"
  }] : []);
  /**
   * Used to pass attributes to DOM elements inside the InputText component.
   * @defaultValue undefined
   * @group Props
   */
  pInputTextPT = input(...ngDevMode ? [void 0, {
    debugName: "pInputTextPT"
  }] : []);
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pInputTextUnstyled = input(...ngDevMode ? [void 0, {
    debugName: "pInputTextUnstyled"
  }] : []);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcInputText = inject(INPUTTEXT_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  ngControl = inject(NgControl, {
    optional: true,
    self: true
  });
  pcFluid = inject(Fluid, {
    optional: true,
    host: true,
    skipSelf: true
  });
  /**
   * Defines the size of the component.
   * @group Props
   */
  pSize;
  /**
   * Specifies the input variant of the component.
   * @defaultValue undefined
   * @group Props
   */
  variant = input(...ngDevMode ? [void 0, {
    debugName: "variant"
  }] : []);
  /**
   * Spans 100% width of the container when enabled.
   * @defaultValue undefined
   * @group Props
   */
  fluid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "fluid"
  } : {}), {
    transform: booleanAttribute
  }));
  /**
   * When present, it specifies that the component should have invalid state style.
   * @defaultValue false
   * @group Props
   */
  invalid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "invalid"
  } : {}), {
    transform: booleanAttribute
  }));
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : []);
  _componentStyle = inject(InputTextStyle);
  constructor() {
    super();
    effect(() => {
      const pt = this.ptInputText() || this.pInputTextPT();
      pt && this.directivePT.set(pt);
    });
    effect(() => {
      this.pInputTextUnstyled() && this.directiveUnstyled.set(this.pInputTextUnstyled());
    });
  }
  onAfterViewInit() {
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    this.cd.detectChanges();
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("root"));
  }
  onDoCheck() {
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
  }
  onInput() {
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
  }
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  get dataP() {
    return this.cn({
      invalid: this.invalid(),
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      [this.pSize]: this.pSize
    });
  }
  static ɵfac = function InputText_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputText)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _InputText,
    selectors: [["", "pInputText", ""]],
    hostVars: 3,
    hostBindings: function InputText_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function InputText_input_HostBindingHandler() {
          return ctx.onInput();
        });
      }
      if (rf & 2) {
        ɵɵattribute("data-p", ctx.dataP);
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    inputs: {
      hostName: "hostName",
      ptInputText: [1, "ptInputText"],
      pInputTextPT: [1, "pInputTextPT"],
      pInputTextUnstyled: [1, "pInputTextUnstyled"],
      pSize: "pSize",
      variant: [1, "variant"],
      fluid: [1, "fluid"],
      invalid: [1, "invalid"]
    },
    features: [ɵɵProvidersFeature([InputTextStyle, {
      provide: INPUTTEXT_INSTANCE,
      useExisting: _InputText
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _InputText
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputText, [{
    type: Directive,
    args: [{
      selector: "[pInputText]",
      standalone: true,
      host: {
        "[class]": "cx('root')",
        "[attr.data-p]": "dataP"
      },
      providers: [InputTextStyle, {
        provide: INPUTTEXT_INSTANCE,
        useExisting: InputText
      }, {
        provide: PARENT_INSTANCE,
        useExisting: InputText
      }],
      hostDirectives: [Bind]
    }]
  }], () => [], {
    hostName: [{
      type: Input
    }],
    ptInputText: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "ptInputText",
        required: false
      }]
    }],
    pInputTextPT: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pInputTextPT",
        required: false
      }]
    }],
    pInputTextUnstyled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pInputTextUnstyled",
        required: false
      }]
    }],
    pSize: [{
      type: Input,
      args: ["pSize"]
    }],
    variant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "variant",
        required: false
      }]
    }],
    fluid: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "fluid",
        required: false
      }]
    }],
    invalid: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "invalid",
        required: false
      }]
    }],
    onInput: [{
      type: HostListener,
      args: ["input"]
    }]
  });
})();
var InputTextModule = class _InputTextModule {
  static ɵfac = function InputTextModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputTextModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputTextModule,
    imports: [InputText],
    exports: [InputText]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextModule, [{
    type: NgModule,
    args: [{
      imports: [InputText],
      exports: [InputText]
    }]
  }], null, null);
})();

// node_modules/@primeuix/motion/dist/index.mjs
var j2 = Object.defineProperty;
var T = Object.getOwnPropertySymbols;
var q = Object.prototype.hasOwnProperty;
var V = Object.prototype.propertyIsEnumerable;
var D2 = (t, n, e) => n in t ? j2(t, n, { enumerable: true, configurable: true, writable: true, value: e }) : t[n] = e;
var p2 = (t, n) => {
  for (var e in n || (n = {})) q.call(n, e) && D2(t, e, n[e]);
  if (T) for (var e of T(n)) V.call(n, e) && D2(t, e, n[e]);
  return t;
};
var N = (t, n, e) => new Promise((o, m) => {
  var i = (r) => {
    try {
      f(e.next(r));
    } catch (u) {
      m(u);
    }
  }, M2 = (r) => {
    try {
      f(e.throw(r));
    } catch (u) {
      m(u);
    }
  }, f = (r) => r.done ? o(r.value) : Promise.resolve(r.value).then(i, M2);
  f((e = e.apply(t, n)).next());
});
var E = "animation";
var v2 = "transition";
function H(t) {
  return t ? t.disabled || !!(t.safe && qt()) : false;
}
function k2(t, n) {
  return t ? p2(p2({}, t), Object.entries(n).reduce((e, [o, m]) => {
    var i;
    return e[o] = (i = t[o]) != null ? i : m, e;
  }, {})) : n;
}
function L(t) {
  let { name: n, enterClass: e, leaveClass: o } = t || {};
  return { enter: { from: (e == null ? void 0 : e.from) || `${n}-enter-from`, to: (e == null ? void 0 : e.to) || `${n}-enter-to`, active: (e == null ? void 0 : e.active) || `${n}-enter-active` }, leave: { from: (o == null ? void 0 : o.from) || `${n}-leave-from`, to: (o == null ? void 0 : o.to) || `${n}-leave-to`, active: (o == null ? void 0 : o.active) || `${n}-leave-active` } };
}
function W2(t) {
  return { enter: { onBefore: t == null ? void 0 : t.onBeforeEnter, onStart: t == null ? void 0 : t.onEnter, onAfter: t == null ? void 0 : t.onAfterEnter, onCancelled: t == null ? void 0 : t.onEnterCancelled }, leave: { onBefore: t == null ? void 0 : t.onBeforeLeave, onStart: t == null ? void 0 : t.onLeave, onAfter: t == null ? void 0 : t.onAfterLeave, onCancelled: t == null ? void 0 : t.onLeaveCancelled } };
}
function A(t, n) {
  let e = window.getComputedStyle(t), o = (l2) => {
    let c = e[`${l2}Delay`], h = e[`${l2}Duration`];
    return [c.split(", ").map(oe), h.split(", ").map(oe)];
  }, [m, i] = o(v2), [M2, f] = o(E), r = Math.max(...i.map((l2, c) => l2 + m[c])), u = Math.max(...f.map((l2, c) => l2 + M2[c])), a, s3 = 0, d = 0;
  return n === v2 ? r > 0 && (a = v2, s3 = r, d = i.length) : n === E ? u > 0 && (a = E, s3 = u, d = f.length) : (s3 = Math.max(r, u), a = s3 > 0 ? r > u ? v2 : E : void 0, d = a ? a === v2 ? i.length : f.length : 0), { type: a, timeout: s3, count: d };
}
function $(t, n) {
  return typeof t == "number" ? t : typeof t == "object" && t[n] != null ? t[n] : null;
}
function S(t, n = true, e = false) {
  if (!n && !e) return;
  let o = w(t);
  n && te(t, "--pui-motion-height", o.height + "px"), e && te(t, "--pui-motion-width", o.width + "px");
}
var U = { name: "p", safe: true, disabled: false, enter: true, leave: true, autoHeight: true, autoWidth: false };
function tt(t, n) {
  if (!t) throw new Error("Element is required.");
  let e = {}, o = false, m = {}, i = null, M2 = {}, f = (a) => {
    if (Object.assign(e, k2(a, U)), !e.enter && !e.leave) throw new Error("Enter or leave must be true.");
    M2 = W2(e), o = H(e), m = L(e), i = null;
  }, r = (a) => N(null, null, function* () {
    i == null || i();
    let { onBefore: s3, onStart: d, onAfter: l2, onCancelled: c } = M2[a] || {}, h = { element: t };
    if (o) {
      s3 == null || s3(h), d == null || d(h), l2 == null || l2(h);
      return;
    }
    let { from: g, active: y2, to: P2 } = m[a] || {};
    return S(t, e.autoHeight, e.autoWidth), s3 == null || s3(h), W(t, g), W(t, y2), t.offsetHeight, P(t, g), W(t, P2), d == null || d(h), new Promise((b2) => {
      let C = $(e.duration, a), x = () => {
        P(t, [P2, y2]), i = null;
      }, R = () => {
        x(), l2 == null || l2(h), b2();
      };
      i = () => {
        x(), c == null || c(h), b2();
      }, G(t, e.type, C, R);
    });
  });
  f(n);
  let u = { enter: () => e.enter ? r("enter") : Promise.resolve(), leave: () => e.leave ? r("leave") : Promise.resolve(), cancel: () => {
    i == null || i(), i = null;
  }, update: (a, s3) => {
    if (!a) throw new Error("Element is required.");
    t = a, u.cancel(), f(s3);
  } };
  return e.appear && u.enter(), u;
}
var z2 = 0;
function G(t, n, e, o) {
  let m = t._motionEndId = ++z2, i = () => {
    m === t._motionEndId && o();
  };
  if (e != null) return setTimeout(i, e);
  let { type: M2, timeout: f, count: r } = A(t, n);
  if (!M2) {
    o();
    return;
  }
  let u = M2 + "end", a = 0, s3 = () => {
    t.removeEventListener(u, d, true), i();
  }, d = (l2) => {
    l2.target === t && ++a >= r && s3();
  };
  t.addEventListener(u, d, { capture: true, once: true }), setTimeout(() => {
    a < r && s3();
  }, f + 1);
}

// node_modules/primeng/fesm2022/primeng-motion.mjs
var _c03 = ["*"];
function Motion_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
var originalStyles = /* @__PURE__ */ new WeakMap();
function applyHiddenStyles(element, strategy) {
  if (!element) return;
  if (!originalStyles.has(element)) {
    originalStyles.set(element, {
      display: element.style.display,
      visibility: element.style.visibility,
      maxHeight: element.style.maxHeight
    });
  }
  switch (strategy) {
    case "display":
      element.style.display = "none";
      break;
    case "visibility":
      element.style.visibility = "hidden";
      element.style.maxHeight = "0";
      break;
  }
}
function resetStyles(element, strategy) {
  if (!element) return;
  const original = originalStyles.get(element) ?? element.style;
  switch (strategy) {
    case "display":
      element.style.display = original?.display || "";
      break;
    case "visibility":
      element.style.visibility = original?.visibility || "";
      element.style.maxHeight = original?.maxHeight || "";
      break;
  }
  originalStyles.delete(element);
}
var style4 = (
  /*css*/
  `
    .p-motion {
        display: block;
    }
`
);
var classes4 = {
  root: "p-motion"
};
var MotionStyle = class _MotionStyle extends BaseStyle {
  name = "motion";
  style = style4;
  classes = classes4;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMotionStyle_BaseFactory;
    return function MotionStyle_Factory(__ngFactoryType__) {
      return (ɵMotionStyle_BaseFactory || (ɵMotionStyle_BaseFactory = ɵɵgetInheritedFactory(_MotionStyle)))(__ngFactoryType__ || _MotionStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _MotionStyle,
    factory: _MotionStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionStyle, [{
    type: Injectable
  }], null, null);
})();
var MotionClasses;
(function(MotionClasses2) {
  MotionClasses2["root"] = "p-motion";
})(MotionClasses || (MotionClasses = {}));
var MOTION_INSTANCE = new InjectionToken("MOTION_INSTANCE");
var Motion = class _Motion extends BaseComponent {
  $pcMotion = inject(MOTION_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    const options = this.options();
    const optionsAttrs = options?.root || {};
    this.bindDirectiveInstance.setAttrs(__spreadValues(__spreadValues({}, this.ptms(["host", "root"])), optionsAttrs));
  }
  _componentStyle = inject(MotionStyle);
  /******************** Inputs ********************/
  /**
   * Whether the element is visible or not.
   * @group Props
   */
  visible = input(false, ...ngDevMode ? [{
    debugName: "visible"
  }] : []);
  /**
   * Whether to mount the element on enter.
   * @group Props
   */
  mountOnEnter = input(true, ...ngDevMode ? [{
    debugName: "mountOnEnter"
  }] : []);
  /**
   * Whether to unmount the element on leave.
   * @group Props
   */
  unmountOnLeave = input(true, ...ngDevMode ? [{
    debugName: "unmountOnLeave"
  }] : []);
  /**
   * The name of the motion. It can be a predefined motion name or a custom one.
   * phases:
   *     [name]-enter
   *     [name]-enter-active
   *     [name]-enter-to
   *     [name]-leave
   *     [name]-leave-active
   *     [name]-leave-to
   * @group Props
   */
  name = input(void 0, ...ngDevMode ? [{
    debugName: "name"
  }] : []);
  /**
   * The type of the motion, valid values 'transition' and 'animation'.
   * @group Props
   */
  type = input(void 0, ...ngDevMode ? [{
    debugName: "type"
  }] : []);
  /**
   * Whether the motion is safe.
   * @group Props
   */
  safe = input(void 0, ...ngDevMode ? [{
    debugName: "safe"
  }] : []);
  /**
   * Whether the motion is disabled.
   * @group Props
   */
  disabled = input(false, ...ngDevMode ? [{
    debugName: "disabled"
  }] : []);
  /**
   * Whether the motion should appear.
   * @group Props
   */
  appear = input(false, ...ngDevMode ? [{
    debugName: "appear"
  }] : []);
  /**
   * Whether the motion should enter.
   * @group Props
   */
  enter = input(true, ...ngDevMode ? [{
    debugName: "enter"
  }] : []);
  /**
   * Whether the motion should leave.
   * @group Props
   */
  leave = input(true, ...ngDevMode ? [{
    debugName: "leave"
  }] : []);
  /**
   * The duration of the motion.
   * @group Props
   */
  duration = input(void 0, ...ngDevMode ? [{
    debugName: "duration"
  }] : []);
  /**
   * The hide strategy of the motion, valid values 'display' and 'visibility'.
   * @group Props
   */
  hideStrategy = input("display", ...ngDevMode ? [{
    debugName: "hideStrategy"
  }] : []);
  /**
   * The enter from class of the motion.
   * @group Props
   */
  enterFromClass = input(void 0, ...ngDevMode ? [{
    debugName: "enterFromClass"
  }] : []);
  /**
   * The enter to class of the motion.
   * @group Props
   */
  enterToClass = input(void 0, ...ngDevMode ? [{
    debugName: "enterToClass"
  }] : []);
  /**
   * The enter active class of the motion.
   * @group Props
   */
  enterActiveClass = input(void 0, ...ngDevMode ? [{
    debugName: "enterActiveClass"
  }] : []);
  /**
   * The leave from class of the motion.
   * @group Props
   */
  leaveFromClass = input(void 0, ...ngDevMode ? [{
    debugName: "leaveFromClass"
  }] : []);
  /**
   * The leave to class of the motion.
   * @group Props
   */
  leaveToClass = input(void 0, ...ngDevMode ? [{
    debugName: "leaveToClass"
  }] : []);
  /**
   * The leave active class of the motion.
   * @group Props
   */
  leaveActiveClass = input(void 0, ...ngDevMode ? [{
    debugName: "leaveActiveClass"
  }] : []);
  /******************** All Inputs ********************/
  /**
   * The motion options.
   * @group Props
   */
  options = input({}, ...ngDevMode ? [{
    debugName: "options"
  }] : []);
  /******************** Outputs ********************/
  /**
   * Callback fired before the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeEnter = output();
  /**
   * Callback fired when the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnter = output();
  /**
   * Callback fired after the enter transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterEnter = output();
  /**
   * Callback fired when the enter transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnterCancelled = output();
  /**
   * Callback fired before the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeLeave = output();
  /**
   * Callback fired when the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeave = output();
  /**
   * Callback fired after the leave transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterLeave = output();
  /**
   * Callback fired when the leave transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeaveCancelled = output();
  /******************** Computed ********************/
  motionOptions = computed(() => {
    const options = this.options();
    return {
      name: options.name ?? this.name(),
      type: options.type ?? this.type(),
      safe: options.safe ?? this.safe(),
      disabled: options.disabled ?? this.disabled(),
      appear: false,
      enter: options.enter ?? this.enter(),
      leave: options.leave ?? this.leave(),
      duration: options.duration ?? this.duration(),
      enterClass: {
        from: options.enterClass?.from ?? (!options.name ? this.enterFromClass() : void 0),
        to: options.enterClass?.to ?? (!options.name ? this.enterToClass() : void 0),
        active: options.enterClass?.active ?? (!options.name ? this.enterActiveClass() : void 0)
      },
      leaveClass: {
        from: options.leaveClass?.from ?? (!options.name ? this.leaveFromClass() : void 0),
        to: options.leaveClass?.to ?? (!options.name ? this.leaveToClass() : void 0),
        active: options.leaveClass?.active ?? (!options.name ? this.leaveActiveClass() : void 0)
      },
      onBeforeEnter: options.onBeforeEnter ?? this.handleBeforeEnter,
      onEnter: options.onEnter ?? this.handleEnter,
      onAfterEnter: options.onAfterEnter ?? this.handleAfterEnter,
      onEnterCancelled: options.onEnterCancelled ?? this.handleEnterCancelled,
      onBeforeLeave: options.onBeforeLeave ?? this.handleBeforeLeave,
      onLeave: options.onLeave ?? this.handleLeave,
      onAfterLeave: options.onAfterLeave ?? this.handleAfterLeave,
      onLeaveCancelled: options.onLeaveCancelled ?? this.handleLeaveCancelled
    };
  }, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  motion;
  isInitialMount = true;
  cancelled = false;
  destroyed = false;
  rendered = signal(false, ...ngDevMode ? [{
    debugName: "rendered"
  }] : []);
  handleBeforeEnter = (event) => !this.destroyed && this.onBeforeEnter.emit(event);
  handleEnter = (event) => !this.destroyed && this.onEnter.emit(event);
  handleAfterEnter = (event) => !this.destroyed && this.onAfterEnter.emit(event);
  handleEnterCancelled = (event) => !this.destroyed && this.onEnterCancelled.emit(event);
  handleBeforeLeave = (event) => !this.destroyed && this.onBeforeLeave.emit(event);
  handleLeave = (event) => !this.destroyed && this.onLeave.emit(event);
  handleAfterLeave = (event) => !this.destroyed && this.onAfterLeave.emit(event);
  handleLeaveCancelled = (event) => !this.destroyed && this.onLeaveCancelled.emit(event);
  constructor() {
    super();
    effect(() => {
      const hideStrategy = this.hideStrategy();
      if (this.isInitialMount) {
        applyHiddenStyles(this.$el, hideStrategy);
        this.rendered.set(this.visible() && this.mountOnEnter() || !this.mountOnEnter());
      } else if (this.visible() && !this.rendered()) {
        applyHiddenStyles(this.$el, hideStrategy);
        this.rendered.set(true);
      }
    });
    effect(() => {
      if (!this.motion) {
        this.motion = tt(this.$el, this.motionOptions());
      } else {
      }
    });
    afterRenderEffect(async () => {
      if (!this.$el) return;
      const shouldAppear = this.isInitialMount && this.visible() && this.appear();
      const hideStrategy = this.hideStrategy();
      if (this.visible()) {
        await Qt();
        resetStyles(this.$el, hideStrategy);
        if (shouldAppear || !this.isInitialMount) {
          this.motion?.enter();
        }
      } else if (!this.isInitialMount) {
        await Qt();
        this.motion?.leave()?.then(async () => {
          if (this.$el && !this.cancelled && !this.visible()) {
            applyHiddenStyles(this.$el, hideStrategy);
            if (this.unmountOnLeave()) {
              await Qt();
              if (!this.cancelled) {
                this.rendered.set(false);
              }
            }
          }
        });
      }
      this.isInitialMount = false;
    });
  }
  onDestroy() {
    this.destroyed = true;
    this.cancelled = true;
    this.motion?.cancel();
    this.motion = void 0;
    resetStyles(this.$el, this.hideStrategy());
    this.$el?.remove();
    this.isInitialMount = true;
  }
  static ɵfac = function Motion_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Motion)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Motion,
    selectors: [["p-motion"]],
    hostVars: 2,
    hostBindings: function Motion_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("root"));
      }
    },
    inputs: {
      visible: [1, "visible"],
      mountOnEnter: [1, "mountOnEnter"],
      unmountOnLeave: [1, "unmountOnLeave"],
      name: [1, "name"],
      type: [1, "type"],
      safe: [1, "safe"],
      disabled: [1, "disabled"],
      appear: [1, "appear"],
      enter: [1, "enter"],
      leave: [1, "leave"],
      duration: [1, "duration"],
      hideStrategy: [1, "hideStrategy"],
      enterFromClass: [1, "enterFromClass"],
      enterToClass: [1, "enterToClass"],
      enterActiveClass: [1, "enterActiveClass"],
      leaveFromClass: [1, "leaveFromClass"],
      leaveToClass: [1, "leaveToClass"],
      leaveActiveClass: [1, "leaveActiveClass"],
      options: [1, "options"]
    },
    outputs: {
      onBeforeEnter: "onBeforeEnter",
      onEnter: "onEnter",
      onAfterEnter: "onAfterEnter",
      onEnterCancelled: "onEnterCancelled",
      onBeforeLeave: "onBeforeLeave",
      onLeave: "onLeave",
      onAfterLeave: "onAfterLeave",
      onLeaveCancelled: "onLeaveCancelled"
    },
    features: [ɵɵProvidersFeature([MotionStyle, {
      provide: MOTION_INSTANCE,
      useExisting: _Motion
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Motion
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c03,
    decls: 1,
    vars: 1,
    template: function Motion_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵconditionalCreate(0, Motion_Conditional_0_Template, 1, 0);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.rendered() ? 0 : -1);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Motion, [{
    type: Component,
    args: [{
      selector: "p-motion",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: `
        @if (rendered()) {
            <ng-content />
        }
    `,
      providers: [MotionStyle, {
        provide: MOTION_INSTANCE,
        useExisting: Motion
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Motion
      }],
      host: {
        "[class]": "cx('root')"
      },
      hostDirectives: [Bind]
    }]
  }], () => [], {
    visible: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "visible",
        required: false
      }]
    }],
    mountOnEnter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "mountOnEnter",
        required: false
      }]
    }],
    unmountOnLeave: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "unmountOnLeave",
        required: false
      }]
    }],
    name: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "name",
        required: false
      }]
    }],
    type: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "type",
        required: false
      }]
    }],
    safe: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "safe",
        required: false
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    appear: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appear",
        required: false
      }]
    }],
    enter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "enter",
        required: false
      }]
    }],
    leave: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "leave",
        required: false
      }]
    }],
    duration: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "duration",
        required: false
      }]
    }],
    hideStrategy: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "hideStrategy",
        required: false
      }]
    }],
    enterFromClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "enterFromClass",
        required: false
      }]
    }],
    enterToClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "enterToClass",
        required: false
      }]
    }],
    enterActiveClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "enterActiveClass",
        required: false
      }]
    }],
    leaveFromClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "leaveFromClass",
        required: false
      }]
    }],
    leaveToClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "leaveToClass",
        required: false
      }]
    }],
    leaveActiveClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "leaveActiveClass",
        required: false
      }]
    }],
    options: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "options",
        required: false
      }]
    }],
    onBeforeEnter: [{
      type: Output,
      args: ["onBeforeEnter"]
    }],
    onEnter: [{
      type: Output,
      args: ["onEnter"]
    }],
    onAfterEnter: [{
      type: Output,
      args: ["onAfterEnter"]
    }],
    onEnterCancelled: [{
      type: Output,
      args: ["onEnterCancelled"]
    }],
    onBeforeLeave: [{
      type: Output,
      args: ["onBeforeLeave"]
    }],
    onLeave: [{
      type: Output,
      args: ["onLeave"]
    }],
    onAfterLeave: [{
      type: Output,
      args: ["onAfterLeave"]
    }],
    onLeaveCancelled: [{
      type: Output,
      args: ["onLeaveCancelled"]
    }]
  });
})();
var MOTION_DIRECTIVE_INSTANCE = new InjectionToken("MOTION_DIRECTIVE_INSTANCE");
var MotionDirective = class _MotionDirective extends BaseComponent {
  $pcMotionDirective = inject(MOTION_DIRECTIVE_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  /******************** Inputs ********************/
  /**
   * Whether the element is visible or not.
   * @group Props
   */
  visible = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "visible"
  } : {}), {
    alias: "pMotion"
  }));
  /**
   * The name of the motion. It can be a predefined motion name or a custom one.
   * phases:
   *     [name]-enter
   *     [name]-enter-active
   *     [name]-enter-to
   *     [name]-leave
   *     [name]-leave-active
   *     [name]-leave-to
   * @group Props
   */
  name = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "name"
  } : {}), {
    alias: "pMotionName"
  }));
  /**
   * The type of the motion, valid values 'transition' and 'animation'.
   * @group Props
   */
  type = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "type"
  } : {}), {
    alias: "pMotionType"
  }));
  /**
   * Whether the motion is safe.
   * @group Props
   */
  safe = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "safe"
  } : {}), {
    alias: "pMotionSafe"
  }));
  /**
   * Whether the motion is disabled.
   * @group Props
   */
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "disabled"
  } : {}), {
    alias: "pMotionDisabled"
  }));
  /**
   * Whether the motion should appear.
   * @group Props
   */
  appear = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "appear"
  } : {}), {
    alias: "pMotionAppear"
  }));
  /**
   * Whether the motion should enter.
   * @group Props
   */
  enter = input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "enter"
  } : {}), {
    alias: "pMotionEnter"
  }));
  /**
   * Whether the motion should leave.
   * @group Props
   */
  leave = input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "leave"
  } : {}), {
    alias: "pMotionLeave"
  }));
  /**
   * The duration of the motion.
   * @group Props
   */
  duration = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "duration"
  } : {}), {
    alias: "pMotionDuration"
  }));
  /**
   * The hide strategy of the motion, valid values 'display' and 'visibility'.
   * @group Props
   */
  hideStrategy = input("display", __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "hideStrategy"
  } : {}), {
    alias: "pMotionHideStrategy"
  }));
  /**
   * The enter from class of the motion.
   * @group Props
   */
  enterFromClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "enterFromClass"
  } : {}), {
    alias: "pMotionEnterFromClass"
  }));
  /**
   * The enter to class of the motion.
   * @group Props
   */
  enterToClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "enterToClass"
  } : {}), {
    alias: "pMotionEnterToClass"
  }));
  /**
   * The enter active class of the motion.
   * @group Props
   */
  enterActiveClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "enterActiveClass"
  } : {}), {
    alias: "pMotionEnterActiveClass"
  }));
  /**
   * The leave from class of the motion.
   * @group Props
   */
  leaveFromClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "leaveFromClass"
  } : {}), {
    alias: "pMotionLeaveFromClass"
  }));
  /**
   * The leave to class of the motion.
   * @group Props
   */
  leaveToClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "leaveToClass"
  } : {}), {
    alias: "pMotionLeaveToClass"
  }));
  /**
   * The leave active class of the motion.
   * @group Props
   */
  leaveActiveClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "leaveActiveClass"
  } : {}), {
    alias: "pMotionLeaveActiveClass"
  }));
  /******************** All Inputs ********************/
  /**
   * The motion options.
   * @group Props
   */
  options = input({}, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "options"
  } : {}), {
    alias: "pMotionOptions"
  }));
  /******************** Outputs ********************/
  /**
   * Callback fired before the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeEnter = output({
    alias: "pMotionOnBeforeEnter"
  });
  /**
   * Callback fired when the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnter = output({
    alias: "pMotionOnEnter"
  });
  /**
   * Callback fired after the enter transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterEnter = output({
    alias: "pMotionOnAfterEnter"
  });
  /**
   * Callback fired when the enter transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnterCancelled = output({
    alias: "pMotionOnEnterCancelled"
  });
  /**
   * Callback fired before the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeLeave = output({
    alias: "pMotionOnBeforeLeave"
  });
  /**
   * Callback fired when the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeave = output({
    alias: "pMotionOnLeave"
  });
  /**
   * Callback fired after the leave transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterLeave = output({
    alias: "pMotionOnAfterLeave"
  });
  /**
   * Callback fired when the leave transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeaveCancelled = output({
    alias: "pMotionOnLeaveCancelled"
  });
  /******************** Computed ********************/
  motionOptions = computed(() => {
    const options = this.options() ?? {};
    return {
      name: options.name ?? this.name(),
      type: options.type ?? this.type(),
      safe: options.safe ?? this.safe(),
      disabled: options.disabled ?? this.disabled(),
      appear: false,
      enter: options.enter ?? this.enter(),
      leave: options.leave ?? this.leave(),
      duration: options.duration ?? this.duration(),
      enterClass: {
        from: options.enterClass?.from ?? (!options.name ? this.enterFromClass() : void 0),
        to: options.enterClass?.to ?? (!options.name ? this.enterToClass() : void 0),
        active: options.enterClass?.active ?? (!options.name ? this.enterActiveClass() : void 0)
      },
      leaveClass: {
        from: options.leaveClass?.from ?? (!options.name ? this.leaveFromClass() : void 0),
        to: options.leaveClass?.to ?? (!options.name ? this.leaveToClass() : void 0),
        active: options.leaveClass?.active ?? (!options.name ? this.leaveActiveClass() : void 0)
      },
      onBeforeEnter: options.onBeforeEnter ?? this.handleBeforeEnter,
      onEnter: options.onEnter ?? this.handleEnter,
      onAfterEnter: options.onAfterEnter ?? this.handleAfterEnter,
      onEnterCancelled: options.onEnterCancelled ?? this.handleEnterCancelled,
      onBeforeLeave: options.onBeforeLeave ?? this.handleBeforeLeave,
      onLeave: options.onLeave ?? this.handleLeave,
      onAfterLeave: options.onAfterLeave ?? this.handleAfterLeave,
      onLeaveCancelled: options.onLeaveCancelled ?? this.handleLeaveCancelled
    };
  }, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  motion;
  isInitialMount = true;
  cancelled = false;
  destroyed = false;
  handleBeforeEnter = (event) => !this.destroyed && this.onBeforeEnter.emit(event);
  handleEnter = (event) => !this.destroyed && this.onEnter.emit(event);
  handleAfterEnter = (event) => !this.destroyed && this.onAfterEnter.emit(event);
  handleEnterCancelled = (event) => !this.destroyed && this.onEnterCancelled.emit(event);
  handleBeforeLeave = (event) => !this.destroyed && this.onBeforeLeave.emit(event);
  handleLeave = (event) => !this.destroyed && this.onLeave.emit(event);
  handleAfterLeave = (event) => !this.destroyed && this.onAfterLeave.emit(event);
  handleLeaveCancelled = (event) => !this.destroyed && this.onLeaveCancelled.emit(event);
  constructor() {
    super();
    effect(() => {
      if (!this.motion) {
        this.motion = tt(this.$el, this.motionOptions());
      } else {
      }
    });
    afterRenderEffect(() => {
      if (!this.$el) return;
      const shouldAppear = this.isInitialMount && this.visible() && this.appear();
      const hideStrategy = this.hideStrategy();
      if (this.visible()) {
        resetStyles(this.$el, hideStrategy);
        if (shouldAppear || !this.isInitialMount) {
          this.motion?.enter();
        }
      } else if (!this.isInitialMount) {
        this.motion?.leave()?.then(() => {
          if (this.$el && !this.cancelled && !this.visible()) {
            applyHiddenStyles(this.$el, hideStrategy);
          }
        });
      } else {
        applyHiddenStyles(this.$el, hideStrategy);
      }
      this.isInitialMount = false;
    });
  }
  onDestroy() {
    this.destroyed = true;
    this.cancelled = true;
    this.motion?.cancel();
    this.motion = void 0;
    resetStyles(this.$el, this.hideStrategy());
    this.isInitialMount = true;
  }
  static ɵfac = function MotionDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MotionDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MotionDirective,
    selectors: [["", "pMotion", ""]],
    inputs: {
      visible: [1, "pMotion", "visible"],
      name: [1, "pMotionName", "name"],
      type: [1, "pMotionType", "type"],
      safe: [1, "pMotionSafe", "safe"],
      disabled: [1, "pMotionDisabled", "disabled"],
      appear: [1, "pMotionAppear", "appear"],
      enter: [1, "pMotionEnter", "enter"],
      leave: [1, "pMotionLeave", "leave"],
      duration: [1, "pMotionDuration", "duration"],
      hideStrategy: [1, "pMotionHideStrategy", "hideStrategy"],
      enterFromClass: [1, "pMotionEnterFromClass", "enterFromClass"],
      enterToClass: [1, "pMotionEnterToClass", "enterToClass"],
      enterActiveClass: [1, "pMotionEnterActiveClass", "enterActiveClass"],
      leaveFromClass: [1, "pMotionLeaveFromClass", "leaveFromClass"],
      leaveToClass: [1, "pMotionLeaveToClass", "leaveToClass"],
      leaveActiveClass: [1, "pMotionLeaveActiveClass", "leaveActiveClass"],
      options: [1, "pMotionOptions", "options"]
    },
    outputs: {
      onBeforeEnter: "pMotionOnBeforeEnter",
      onEnter: "pMotionOnEnter",
      onAfterEnter: "pMotionOnAfterEnter",
      onEnterCancelled: "pMotionOnEnterCancelled",
      onBeforeLeave: "pMotionOnBeforeLeave",
      onLeave: "pMotionOnLeave",
      onAfterLeave: "pMotionOnAfterLeave",
      onLeaveCancelled: "pMotionOnLeaveCancelled"
    },
    features: [ɵɵProvidersFeature([MotionStyle, {
      provide: MOTION_DIRECTIVE_INSTANCE,
      useExisting: _MotionDirective
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _MotionDirective
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionDirective, [{
    type: Directive,
    args: [{
      selector: "[pMotion]",
      standalone: true,
      providers: [MotionStyle, {
        provide: MOTION_DIRECTIVE_INSTANCE,
        useExisting: MotionDirective
      }, {
        provide: PARENT_INSTANCE,
        useExisting: MotionDirective
      }]
    }]
  }], () => [], {
    visible: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotion",
        required: false
      }]
    }],
    name: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionName",
        required: false
      }]
    }],
    type: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionType",
        required: false
      }]
    }],
    safe: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionSafe",
        required: false
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionDisabled",
        required: false
      }]
    }],
    appear: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionAppear",
        required: false
      }]
    }],
    enter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionEnter",
        required: false
      }]
    }],
    leave: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionLeave",
        required: false
      }]
    }],
    duration: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionDuration",
        required: false
      }]
    }],
    hideStrategy: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionHideStrategy",
        required: false
      }]
    }],
    enterFromClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionEnterFromClass",
        required: false
      }]
    }],
    enterToClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionEnterToClass",
        required: false
      }]
    }],
    enterActiveClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionEnterActiveClass",
        required: false
      }]
    }],
    leaveFromClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionLeaveFromClass",
        required: false
      }]
    }],
    leaveToClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionLeaveToClass",
        required: false
      }]
    }],
    leaveActiveClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionLeaveActiveClass",
        required: false
      }]
    }],
    options: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pMotionOptions",
        required: false
      }]
    }],
    onBeforeEnter: [{
      type: Output,
      args: ["pMotionOnBeforeEnter"]
    }],
    onEnter: [{
      type: Output,
      args: ["pMotionOnEnter"]
    }],
    onAfterEnter: [{
      type: Output,
      args: ["pMotionOnAfterEnter"]
    }],
    onEnterCancelled: [{
      type: Output,
      args: ["pMotionOnEnterCancelled"]
    }],
    onBeforeLeave: [{
      type: Output,
      args: ["pMotionOnBeforeLeave"]
    }],
    onLeave: [{
      type: Output,
      args: ["pMotionOnLeave"]
    }],
    onAfterLeave: [{
      type: Output,
      args: ["pMotionOnAfterLeave"]
    }],
    onLeaveCancelled: [{
      type: Output,
      args: ["pMotionOnLeaveCancelled"]
    }]
  });
})();
var MotionModule = class _MotionModule {
  static ɵfac = function MotionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MotionModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MotionModule,
    imports: [Motion, MotionDirective],
    exports: [Motion, MotionDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Motion]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionModule, [{
    type: NgModule,
    args: [{
      imports: [Motion, MotionDirective],
      exports: [Motion, MotionDirective]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-overlay.mjs
var _c04 = ["content"];
var _c1 = ["overlay"];
var _c2 = ["*", "*"];
var _c3 = () => ({
  mode: null
});
var _c4 = (a0) => ({
  $implicit: a0
});
var _c5 = (a0) => ({
  mode: a0
});
function Overlay_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Overlay_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
    ɵɵtemplate(1, Overlay_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate || ctx_r0._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(3, _c4, ɵɵpureFunction0(2, _c3)));
  }
}
function Overlay_Conditional_1_div_0_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Overlay_Conditional_1_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 5, 0);
    ɵɵlistener("click", function Overlay_Conditional_1_div_0_Template_div_click_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayClick());
    });
    ɵɵelementStart(2, "p-motion", 6);
    ɵɵlistener("onBeforeEnter", function Overlay_Conditional_1_div_0_Template_p_motion_onBeforeEnter_2_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayBeforeEnter($event));
    })("onEnter", function Overlay_Conditional_1_div_0_Template_p_motion_onEnter_2_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayEnter($event));
    })("onAfterEnter", function Overlay_Conditional_1_div_0_Template_p_motion_onAfterEnter_2_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayAfterEnter($event));
    })("onBeforeLeave", function Overlay_Conditional_1_div_0_Template_p_motion_onBeforeLeave_2_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayBeforeLeave($event));
    })("onLeave", function Overlay_Conditional_1_div_0_Template_p_motion_onLeave_2_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayLeave($event));
    })("onAfterLeave", function Overlay_Conditional_1_div_0_Template_p_motion_onAfterLeave_2_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayAfterLeave($event));
    });
    ɵɵelementStart(3, "div", 5, 1);
    ɵɵlistener("click", function Overlay_Conditional_1_div_0_Template_div_click_3_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onOverlayContentClick($event));
    });
    ɵɵprojection(5, 1);
    ɵɵtemplate(6, Overlay_Conditional_1_div_0_ng_container_6_Template, 1, 0, "ng-container", 3);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵstyleMap(ctx_r0.sx("root"));
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("root"), ctx_r0.styleClass));
    ɵɵproperty("pBind", ctx_r0.ptm("root"));
    ɵɵadvance(2);
    ɵɵproperty("visible", ctx_r0.visible)("appear", true)("options", ctx_r0.computedMotionOptions());
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("content"), ctx_r0.contentStyleClass));
    ɵɵproperty("pBind", ctx_r0.ptm("content"));
    ɵɵadvance(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate || ctx_r0._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(15, _c4, ɵɵpureFunction1(13, _c5, ctx_r0.overlayMode)));
  }
}
function Overlay_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Overlay_Conditional_1_div_0_Template, 7, 17, "div", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r0.modalVisible);
  }
}
var inlineStyles = {
  root: () => ({
    position: "absolute",
    top: "0"
  })
};
var style5 = (
  /*css*/
  `
.p-overlay-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-content {
    transform-origin: inherit;
    will-change: transform;
}

/* Github Issue #18560 */
.p-component-overlay.p-component {
    position: relative;
}

.p-overlay-modal > .p-overlay-content {
    z-index: 1;
    width: 90%;
}

/* Position */
/* top */
.p-overlay-top {
    align-items: flex-start;
}
.p-overlay-top-start {
    align-items: flex-start;
    justify-content: flex-start;
}
.p-overlay-top-end {
    align-items: flex-start;
    justify-content: flex-end;
}

/* bottom */
.p-overlay-bottom {
    align-items: flex-end;
}
.p-overlay-bottom-start {
    align-items: flex-end;
    justify-content: flex-start;
}
.p-overlay-bottom-end {
    align-items: flex-end;
    justify-content: flex-end;
}

/* left */
.p-overlay-left {
    justify-content: flex-start;
}
.p-overlay-left-start {
    justify-content: flex-start;
    align-items: flex-start;
}
.p-overlay-left-end {
    justify-content: flex-start;
    align-items: flex-end;
}

/* right */
.p-overlay-right {
    justify-content: flex-end;
}
.p-overlay-right-start {
    justify-content: flex-end;
    align-items: flex-start;
}
.p-overlay-right-end {
    justify-content: flex-end;
    align-items: flex-end;
}

.p-overlay-content ~ .p-overlay-content {
    display: none;
}
`
);
var classes5 = {
  host: "p-overlay-host",
  root: ({
    instance
  }) => ["p-overlay p-component", {
    "p-overlay-modal p-overlay-mask p-overlay-mask-enter-active": instance.modal,
    "p-overlay-center": instance.modal && instance.overlayResponsiveDirection === "center",
    "p-overlay-top": instance.modal && instance.overlayResponsiveDirection === "top",
    "p-overlay-top-start": instance.modal && instance.overlayResponsiveDirection === "top-start",
    "p-overlay-top-end": instance.modal && instance.overlayResponsiveDirection === "top-end",
    "p-overlay-bottom": instance.modal && instance.overlayResponsiveDirection === "bottom",
    "p-overlay-bottom-start": instance.modal && instance.overlayResponsiveDirection === "bottom-start",
    "p-overlay-bottom-end": instance.modal && instance.overlayResponsiveDirection === "bottom-end",
    "p-overlay-left": instance.modal && instance.overlayResponsiveDirection === "left",
    "p-overlay-left-start": instance.modal && instance.overlayResponsiveDirection === "left-start",
    "p-overlay-left-end": instance.modal && instance.overlayResponsiveDirection === "left-end",
    "p-overlay-right": instance.modal && instance.overlayResponsiveDirection === "right",
    "p-overlay-right-start": instance.modal && instance.overlayResponsiveDirection === "right-start",
    "p-overlay-right-end": instance.modal && instance.overlayResponsiveDirection === "right-end"
  }],
  content: "p-overlay-content"
};
var OverlayStyle = class _OverlayStyle extends BaseStyle {
  name = "overlay";
  style = style5;
  classes = classes5;
  inlineStyles = inlineStyles;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵOverlayStyle_BaseFactory;
    return function OverlayStyle_Factory(__ngFactoryType__) {
      return (ɵOverlayStyle_BaseFactory || (ɵOverlayStyle_BaseFactory = ɵɵgetInheritedFactory(_OverlayStyle)))(__ngFactoryType__ || _OverlayStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _OverlayStyle,
    factory: _OverlayStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayStyle, [{
    type: Injectable
  }], null, null);
})();
var OVERLAY_INSTANCE = new InjectionToken("OVERLAY_INSTANCE");
var Overlay = class _Overlay extends BaseComponent {
  overlayService;
  zone;
  componentName = "Overlay";
  $pcOverlay = inject(OVERLAY_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  hostName = "";
  /**
   * The visible property is an input that determines the visibility of the component.
   * @defaultValue false
   * @group Props
   */
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    if (this._visible && !this.modalVisible) {
      this.modalVisible = true;
    }
  }
  /**
   * The mode property is an input that determines the overlay mode type or string.
   * @defaultValue null
   * @group Props
   */
  get mode() {
    return this._mode || this.overlayOptions?.mode;
  }
  set mode(value) {
    this._mode = value;
  }
  /**
   * The style property is an input that determines the style object for the component.
   * @defaultValue null
   * @group Props
   */
  get style() {
    return ObjectUtils.merge(this._style, this.modal ? this.overlayResponsiveOptions?.style : this.overlayOptions?.style);
  }
  set style(value) {
    this._style = value;
  }
  /**
   * The styleClass property is an input that determines the CSS class(es) for the component.
   * @defaultValue null
   * @group Props
   */
  get styleClass() {
    return ObjectUtils.merge(this._styleClass, this.modal ? this.overlayResponsiveOptions?.styleClass : this.overlayOptions?.styleClass);
  }
  set styleClass(value) {
    this._styleClass = value;
  }
  /**
   * The contentStyle property is an input that determines the style object for the content of the component.
   * @defaultValue null
   * @group Props
   */
  get contentStyle() {
    return ObjectUtils.merge(this._contentStyle, this.modal ? this.overlayResponsiveOptions?.contentStyle : this.overlayOptions?.contentStyle);
  }
  set contentStyle(value) {
    this._contentStyle = value;
  }
  /**
   * The contentStyleClass property is an input that determines the CSS class(es) for the content of the component.
   * @defaultValue null
   * @group Props
   */
  get contentStyleClass() {
    return ObjectUtils.merge(this._contentStyleClass, this.modal ? this.overlayResponsiveOptions?.contentStyleClass : this.overlayOptions?.contentStyleClass);
  }
  set contentStyleClass(value) {
    this._contentStyleClass = value;
  }
  /**
   * The target property is an input that specifies the target element or selector for the component.
   * @defaultValue null
   * @group Props
   */
  get target() {
    const value = this._target || this.overlayOptions?.target;
    return value === void 0 ? "@prev" : value;
  }
  set target(value) {
    this._target = value;
  }
  /**
   * The autoZIndex determines whether to automatically manage layering. Its default value is 'false'.
   * @defaultValue false
   * @group Props
   */
  get autoZIndex() {
    const value = this._autoZIndex || this.overlayOptions?.autoZIndex;
    return value === void 0 ? true : value;
  }
  set autoZIndex(value) {
    this._autoZIndex = value;
  }
  /**
   * The baseZIndex is base zIndex value to use in layering.
   * @defaultValue null
   * @group Props
   */
  get baseZIndex() {
    const value = this._baseZIndex || this.overlayOptions?.baseZIndex;
    return value === void 0 ? 0 : value;
  }
  set baseZIndex(value) {
    this._baseZIndex = value;
  }
  /**
   * Transition options of the show or hide animation.
   * @defaultValue .12s cubic-bezier(0, 0, 0.2, 1)
   * @group Props
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   */
  get showTransitionOptions() {
    const value = this._showTransitionOptions || this.overlayOptions?.showTransitionOptions;
    return value === void 0 ? ".12s cubic-bezier(0, 0, 0.2, 1)" : value;
  }
  set showTransitionOptions(value) {
    this._showTransitionOptions = value;
  }
  /**
   * The hideTransitionOptions property is an input that determines the CSS transition options for hiding the component.
   * @defaultValue .1s linear
   * @group Props
   * @deprecated since v21.0.0. Use `motionOptions` instead.
   */
  get hideTransitionOptions() {
    const value = this._hideTransitionOptions || this.overlayOptions?.hideTransitionOptions;
    return value === void 0 ? ".1s linear" : value;
  }
  set hideTransitionOptions(value) {
    this._hideTransitionOptions = value;
  }
  /**
   * The listener property is an input that specifies the listener object for the component.
   * @defaultValue null
   * @group Props
   */
  get listener() {
    return this._listener || this.overlayOptions?.listener;
  }
  set listener(value) {
    this._listener = value;
  }
  /**
   * It is the option used to determine in which mode it should appear according to the given media or breakpoint.
   * @defaultValue null
   * @group Props
   */
  get responsive() {
    return this._responsive || this.overlayOptions?.responsive;
  }
  set responsive(val) {
    this._responsive = val;
  }
  /**
   * The options property is an input that specifies the overlay options for the component.
   * @defaultValue null
   * @group Props
   */
  get options() {
    return this._options;
  }
  set options(val) {
    this._options = val;
  }
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
  /**
   * Specifies whether the overlay should be rendered inline within the current component's template.
   * @defaultValue false
   * @group Props
   */
  inline = input(false, ...ngDevMode ? [{
    debugName: "inline"
  }] : []);
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions() || this.overlayOptions?.motionOptions);
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  /**
   * This EventEmitter is used to notify changes in the visibility state of a component.
   * @param {Boolean} boolean - Value of visibility as boolean.
   * @group Emits
   */
  visibleChange = new EventEmitter();
  /**
   * Callback to invoke before the overlay is shown.
   * @param {OverlayOnBeforeShowEvent} event - Custom overlay before show event.
   * @group Emits
   */
  onBeforeShow = new EventEmitter();
  /**
   * Callback to invoke when the overlay is shown.
   * @param {OverlayOnShowEvent} event - Custom overlay show event.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke before the overlay is hidden.
   * @param {OverlayOnBeforeHideEvent} event - Custom overlay before hide event.
   * @group Emits
   */
  onBeforeHide = new EventEmitter();
  /**
   * Callback to invoke when the overlay is hidden
   * @param {OverlayOnHideEvent} event - Custom hide event.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when the animation is started.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   * @deprecated since v21.0.0. Use onOverlayBeforeEnter and onOverlayBeforeLeave instead.
   */
  onAnimationStart = new EventEmitter();
  /**
   * Callback to invoke when the animation is done.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   * @deprecated since v21.0.0. Use onOverlayAfterEnter and onOverlayAfterLeave instead.
   */
  onAnimationDone = new EventEmitter();
  /**
   * Callback to invoke before the overlay enters.
   * @param {MotionEvent} event - Event before enter.
   * @group Emits
   */
  onBeforeEnter = new EventEmitter();
  /**
   * Callback to invoke when the overlay enters.
   * @param {MotionEvent} event - Event on enter.
   * @group Emits
   */
  onEnter = new EventEmitter();
  /**
   * Callback to invoke after the overlay has entered.
   * @param {MotionEvent} event - Event after enter.
   * @group Emits
   */
  onAfterEnter = new EventEmitter();
  /**
   * Callback to invoke before the overlay leaves.
   * @param {MotionEvent} event - Event before leave.
   * @group Emits
   */
  onBeforeLeave = new EventEmitter();
  /**
   * Callback to invoke when the overlay leaves.
   * @param {MotionEvent} event - Event on leave.
   * @group Emits
   */
  onLeave = new EventEmitter();
  /**
   * Callback to invoke after the overlay has left.
   * @param {MotionEvent} event - Event after leave.
   * @group Emits
   */
  onAfterLeave = new EventEmitter();
  overlayViewChild;
  contentViewChild;
  /**
   * Content template of the component.
   * @param {OverlayContentTemplateContext} context - content context.
   * @see {@link OverlayContentTemplateContext}
   * @group Templates
   */
  contentTemplate;
  templates;
  hostAttrSelector = input(...ngDevMode ? [void 0, {
    debugName: "hostAttrSelector"
  }] : []);
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  _contentTemplate;
  _visible = false;
  _mode;
  _style;
  _styleClass;
  _contentStyle;
  _contentStyleClass;
  _target;
  _autoZIndex;
  _baseZIndex;
  _showTransitionOptions;
  _hideTransitionOptions;
  _listener;
  _responsive;
  _options;
  modalVisible = false;
  isOverlayClicked = false;
  isOverlayContentClicked = false;
  scrollHandler;
  documentClickListener;
  documentResizeListener;
  _componentStyle = inject(OverlayStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  documentKeyboardListener;
  window;
  transformOptions = {
    default: "scaleY(0.8)",
    center: "scale(0.7)",
    top: "translate3d(0px, -100%, 0px)",
    "top-start": "translate3d(0px, -100%, 0px)",
    "top-end": "translate3d(0px, -100%, 0px)",
    bottom: "translate3d(0px, 100%, 0px)",
    "bottom-start": "translate3d(0px, 100%, 0px)",
    "bottom-end": "translate3d(0px, 100%, 0px)",
    left: "translate3d(-100%, 0px, 0px)",
    "left-start": "translate3d(-100%, 0px, 0px)",
    "left-end": "translate3d(-100%, 0px, 0px)",
    right: "translate3d(100%, 0px, 0px)",
    "right-start": "translate3d(100%, 0px, 0px)",
    "right-end": "translate3d(100%, 0px, 0px)"
  };
  get modal() {
    if (isPlatformBrowser(this.platformId)) {
      return this.mode === "modal" || this.overlayResponsiveOptions && this.document.defaultView?.matchMedia(this.overlayResponsiveOptions.media?.replace("@media", "") || `(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches;
    }
  }
  get overlayMode() {
    return this.mode || (this.modal ? "modal" : "overlay");
  }
  get overlayOptions() {
    return __spreadValues(__spreadValues({}, this.config?.overlayOptions), this.options);
  }
  get overlayResponsiveOptions() {
    return __spreadValues(__spreadValues({}, this.overlayOptions?.responsive), this.responsive);
  }
  get overlayResponsiveDirection() {
    return this.overlayResponsiveOptions?.direction || "center";
  }
  get overlayEl() {
    return this.overlayViewChild?.nativeElement;
  }
  get contentEl() {
    return this.contentViewChild?.nativeElement;
  }
  get targetEl() {
    return j(this.target, this.el?.nativeElement);
  }
  constructor(overlayService, zone) {
    super();
    this.overlayService = overlayService;
    this.zone = zone;
  }
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        // TODO: new template types may be added.
        default:
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
  }
  show(overlay, isFocus = false) {
    this.onVisibleChange(true);
    this.handleEvents("onShow", {
      overlay: overlay || this.overlayEl,
      target: this.targetEl,
      mode: this.overlayMode
    });
    isFocus && bt(this.targetEl);
    this.modal && W(this.document?.body, "p-overflow-hidden");
  }
  hide(overlay, isFocus = false) {
    if (!this.visible) {
      return;
    } else {
      this.onVisibleChange(false);
      this.handleEvents("onHide", {
        overlay: overlay || this.overlayEl,
        target: this.targetEl,
        mode: this.overlayMode
      });
      isFocus && bt(this.targetEl);
      this.modal && P(this.document?.body, "p-overflow-hidden");
    }
  }
  onVisibleChange(visible) {
    this._visible = visible;
    this.visibleChange.emit(visible);
  }
  onOverlayClick() {
    this.isOverlayClicked = true;
  }
  onOverlayContentClick(event) {
    this.overlayService.add({
      originalEvent: event,
      target: this.targetEl
    });
    this.isOverlayContentClicked = true;
  }
  container = signal(void 0, ...ngDevMode ? [{
    debugName: "container"
  }] : []);
  onOverlayBeforeEnter(event) {
    this.handleEvents("onBeforeShow", {
      overlay: this.overlayEl,
      target: this.targetEl,
      mode: this.overlayMode
    });
    this.container.set(this.overlayEl || event.element);
    this.show(this.overlayEl, true);
    this.hostAttrSelector() && this.overlayEl && this.overlayEl.setAttribute(this.hostAttrSelector(), "");
    this.appendOverlay();
    this.alignOverlay();
    this.setZIndex();
    this.handleEvents("onBeforeEnter", event);
  }
  onOverlayEnter(event) {
    this.handleEvents("onEnter", event);
  }
  onOverlayAfterEnter(event) {
    this.bindListeners();
    this.handleEvents("onAfterEnter", event);
  }
  onOverlayBeforeLeave(event) {
    this.handleEvents("onBeforeHide", {
      overlay: this.overlayEl,
      target: this.targetEl,
      mode: this.overlayMode
    });
    this.handleEvents("onBeforeLeave", event);
  }
  onOverlayLeave(event) {
    this.handleEvents("onLeave", event);
  }
  onOverlayAfterLeave(event) {
    this.hide(this.overlayEl, true);
    this.container.set(null);
    this.unbindListeners();
    this.appendOverlay();
    zindexutils.clear(this.overlayEl);
    this.modalVisible = false;
    this.cd.markForCheck();
    this.handleEvents("onAfterLeave", event);
  }
  handleEvents(name, params) {
    this[name].emit(params);
    this.options && this.options[name] && this.options[name](params);
    this.config?.overlayOptions && (this.config?.overlayOptions)[name] && (this.config?.overlayOptions)[name](params);
  }
  setZIndex() {
    if (this.autoZIndex) {
      zindexutils.set(this.overlayMode, this.overlayEl, this.baseZIndex + this.config?.zIndex[this.overlayMode]);
    }
  }
  appendOverlay() {
    if (this.$appendTo() && this.$appendTo() !== "self") {
      if (this.$appendTo() === "body") {
        ut(this.document.body, this.overlayEl);
      } else {
        ut(this.$appendTo(), this.overlayEl);
      }
    }
  }
  alignOverlay() {
    if (!this.modal) {
      if (this.overlayEl && this.targetEl) {
        this.overlayEl.style.minWidth = v(this.targetEl) + "px";
        if (this.$appendTo() === "self") {
          I(this.overlayEl, this.targetEl);
        } else {
          D(this.overlayEl, this.targetEl);
        }
      }
    }
  }
  bindListeners() {
    this.bindScrollListener();
    this.bindDocumentClickListener();
    this.bindDocumentResizeListener();
    this.bindDocumentKeyboardListener();
  }
  unbindListeners() {
    this.unbindScrollListener();
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindDocumentKeyboardListener();
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.targetEl, (event) => {
        const valid = this.listener ? this.listener(event, {
          type: "scroll",
          mode: this.overlayMode,
          valid: true
        }) : true;
        valid && this.hide(event, true);
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen(this.document, "click", (event) => {
        const isTargetClicked = this.targetEl && (this.targetEl.isSameNode(event.target) || !this.isOverlayClicked && this.targetEl.contains(event.target));
        const isOutsideClicked = !isTargetClicked && !this.isOverlayContentClicked;
        const valid = this.listener ? this.listener(event, {
          type: "outside",
          mode: this.overlayMode,
          valid: event.which !== 3 && isOutsideClicked
        }) : isOutsideClicked;
        valid && this.hide(event);
        this.isOverlayClicked = this.isOverlayContentClicked = false;
      });
    }
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  bindDocumentResizeListener() {
    if (!this.documentResizeListener) {
      this.documentResizeListener = this.renderer.listen(this.document.defaultView, "resize", (event) => {
        const valid = this.listener ? this.listener(event, {
          type: "resize",
          mode: this.overlayMode,
          valid: !Yt()
        }) : !Yt();
        valid && this.hide(event, true);
      });
    }
  }
  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  bindDocumentKeyboardListener() {
    if (this.documentKeyboardListener) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.documentKeyboardListener = this.renderer.listen(this.document.defaultView, "keydown", (event) => {
        if (this.overlayOptions.hideOnEscape === false || event.code !== "Escape") {
          return;
        }
        const valid = this.listener ? this.listener(event, {
          type: "keydown",
          mode: this.overlayMode,
          valid: !Yt()
        }) : !Yt();
        if (valid) {
          this.zone.run(() => {
            this.hide(event, true);
          });
        }
      });
    });
  }
  unbindDocumentKeyboardListener() {
    if (this.documentKeyboardListener) {
      this.documentKeyboardListener();
      this.documentKeyboardListener = null;
    }
  }
  onDestroy() {
    this.hide(this.overlayEl, true);
    if (this.overlayEl && this.$appendTo() !== "self") {
      this.renderer.appendChild(this.el.nativeElement, this.overlayEl);
      zindexutils.clear(this.overlayEl);
    }
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    this.unbindListeners();
  }
  static ɵfac = function Overlay_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Overlay)(ɵɵdirectiveInject(OverlayService), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Overlay,
    selectors: [["p-overlay"]],
    contentQueries: function Overlay_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c04, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Overlay_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c1, 5)(_c04, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlayViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentViewChild = _t.first);
      }
    },
    inputs: {
      hostName: "hostName",
      visible: "visible",
      mode: "mode",
      style: "style",
      styleClass: "styleClass",
      contentStyle: "contentStyle",
      contentStyleClass: "contentStyleClass",
      target: "target",
      autoZIndex: "autoZIndex",
      baseZIndex: "baseZIndex",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      listener: "listener",
      responsive: "responsive",
      options: "options",
      appendTo: [1, "appendTo"],
      inline: [1, "inline"],
      motionOptions: [1, "motionOptions"],
      hostAttrSelector: [1, "hostAttrSelector"]
    },
    outputs: {
      visibleChange: "visibleChange",
      onBeforeShow: "onBeforeShow",
      onShow: "onShow",
      onBeforeHide: "onBeforeHide",
      onHide: "onHide",
      onAnimationStart: "onAnimationStart",
      onAnimationDone: "onAnimationDone",
      onBeforeEnter: "onBeforeEnter",
      onEnter: "onEnter",
      onAfterEnter: "onAfterEnter",
      onBeforeLeave: "onBeforeLeave",
      onLeave: "onLeave",
      onAfterLeave: "onAfterLeave"
    },
    features: [ɵɵProvidersFeature([OverlayStyle, {
      provide: OVERLAY_INSTANCE,
      useExisting: _Overlay
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Overlay
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c2,
    decls: 2,
    vars: 1,
    consts: [["overlay", ""], ["content", ""], [3, "class", "style", "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", "style", "pBind", "click", 4, "ngIf"], [3, "click", "pBind"], ["name", "p-anchored-overlay", 3, "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave", "visible", "appear", "options"]],
    template: function Overlay_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c2);
        ɵɵconditionalCreate(0, Overlay_Conditional_0_Template, 2, 5)(1, Overlay_Conditional_1_Template, 1, 1, "div", 2);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.inline() ? 0 : 1);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, SharedModule, Bind, MotionModule, Motion],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Overlay, [{
    type: Component,
    args: [{
      selector: "p-overlay",
      standalone: true,
      imports: [CommonModule, SharedModule, Bind, MotionModule],
      hostDirectives: [Bind],
      template: `
        @if (inline()) {
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: { mode: null } }"></ng-container>
        } @else {
            <div *ngIf="modalVisible" #overlay [class]="cn(cx('root'), styleClass)" [style]="sx('root')" [pBind]="ptm('root')" (click)="onOverlayClick()">
                <p-motion
                    [visible]="visible"
                    name="p-anchored-overlay"
                    [appear]="true"
                    [options]="computedMotionOptions()"
                    (onBeforeEnter)="onOverlayBeforeEnter($event)"
                    (onEnter)="onOverlayEnter($event)"
                    (onAfterEnter)="onOverlayAfterEnter($event)"
                    (onBeforeLeave)="onOverlayBeforeLeave($event)"
                    (onLeave)="onOverlayLeave($event)"
                    (onAfterLeave)="onOverlayAfterLeave($event)"
                >
                    <div #content [class]="cn(cx('content'), contentStyleClass)" [pBind]="ptm('content')" (click)="onOverlayContentClick($event)">
                        <ng-content></ng-content>
                        <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: { mode: overlayMode } }"></ng-container>
                    </div>
                </p-motion>
            </div>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [OverlayStyle, {
        provide: OVERLAY_INSTANCE,
        useExisting: Overlay
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Overlay
      }]
    }]
  }], () => [{
    type: OverlayService
  }, {
    type: NgZone
  }], {
    hostName: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    contentStyle: [{
      type: Input
    }],
    contentStyleClass: [{
      type: Input
    }],
    target: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input
    }],
    baseZIndex: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    listener: [{
      type: Input
    }],
    responsive: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    inline: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "inline",
        required: false
      }]
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    visibleChange: [{
      type: Output
    }],
    onBeforeShow: [{
      type: Output
    }],
    onShow: [{
      type: Output
    }],
    onBeforeHide: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onAnimationStart: [{
      type: Output
    }],
    onAnimationDone: [{
      type: Output
    }],
    onBeforeEnter: [{
      type: Output
    }],
    onEnter: [{
      type: Output
    }],
    onAfterEnter: [{
      type: Output
    }],
    onBeforeLeave: [{
      type: Output
    }],
    onLeave: [{
      type: Output
    }],
    onAfterLeave: [{
      type: Output
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    contentViewChild: [{
      type: ViewChild,
      args: ["content"]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    hostAttrSelector: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "hostAttrSelector",
        required: false
      }]
    }]
  });
})();
var OverlayModule = class _OverlayModule {
  static ɵfac = function OverlayModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _OverlayModule,
    imports: [Overlay, SharedModule],
    exports: [Overlay, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Overlay, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayModule, [{
    type: NgModule,
    args: [{
      imports: [Overlay, SharedModule],
      exports: [Overlay, SharedModule]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-scroller.mjs
var _c05 = ["content"];
var _c12 = ["item"];
var _c22 = ["loader"];
var _c32 = ["loadericon"];
var _c42 = ["element"];
var _c52 = ["*"];
var _c6 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c7 = (a0) => ({
  numCols: a0
});
var _c8 = (a0) => ({
  options: a0
});
var _c9 = () => ({
  styleClass: "p-virtualscroller-loading-icon"
});
var _c10 = (a0, a1) => ({
  rows: a0,
  columns: a1
});
function Scroller_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Scroller_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Scroller_ng_container_0_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate || ctx_r1._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c6, ctx_r1.loadedItems, ctx_r1.getContentOptions()));
  }
}
function Scroller_ng_container_0_ng_template_4_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Scroller_ng_container_0_ng_template_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Scroller_ng_container_0_ng_template_4_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const index_r4 = ctx.index;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.itemTemplate || ctx_r1._itemTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c6, item_r3, ctx_r1.getOptions(index_r4)));
  }
}
function Scroller_ng_container_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11, 3);
    ɵɵtemplate(2, Scroller_ng_container_0_ng_template_4_ng_container_2_Template, 2, 5, "ng-container", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleMap(ctx_r1.contentStyle);
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("content"), ctx_r1.contentStyleClass));
    ɵɵproperty("pBind", ctx_r1.ptm("content"));
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r1.loadedItems)("ngForTrackBy", ctx_r1._trackBy);
  }
}
function Scroller_ng_container_0_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 13);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("spacer"));
    ɵɵproperty("ngStyle", ctx_r1.spacerStyle)("pBind", ctx_r1.ptm("spacer"));
  }
}
function Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const index_r5 = ctx.index;
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.loaderTemplate || ctx_r1._loaderTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(4, _c8, ctx_r1.getLoaderOptions(index_r5, ctx_r1.both && ɵɵpureFunction1(2, _c7, ctx_r1.numItemsInViewport.cols))));
  }
}
function Scroller_ng_container_0_div_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Scroller_ng_container_0_div_7_ng_container_1_ng_container_1_Template, 2, 6, "ng-container", 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.loaderArr);
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.loaderIconTemplate || ctx_r1._loaderIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(3, _c8, ɵɵpureFunction0(2, _c9)));
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 15);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵclassMap(ctx_r1.cx("loadingIcon"));
    ɵɵproperty("spin", true)("pBind", ctx_r1.ptm("loadingIcon"));
  }
}
function Scroller_ng_container_0_div_7_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Scroller_ng_container_0_div_7_ng_template_2_ng_container_0_Template, 2, 5, "ng-container", 6)(1, Scroller_ng_container_0_div_7_ng_template_2_ng_template_1_Template, 1, 4, "ng-template", null, 5, ɵɵtemplateRefExtractor);
  }
  if (rf & 2) {
    const buildInLoaderIcon_r6 = ɵɵreference(2);
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r1.loaderIconTemplate || ctx_r1._loaderIconTemplate)("ngIfElse", buildInLoaderIcon_r6);
  }
}
function Scroller_ng_container_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, Scroller_ng_container_0_div_7_ng_container_1_Template, 2, 1, "ng-container", 6)(2, Scroller_ng_container_0_div_7_ng_template_2_Template, 3, 2, "ng-template", null, 4, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const buildInLoader_r7 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r1.cx("loader"));
    ɵɵproperty("pBind", ctx_r1.ptm("loader"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.loaderTemplate || ctx_r1._loaderTemplate)("ngIfElse", buildInLoader_r7);
  }
}
function Scroller_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 7, 1);
    ɵɵlistener("scroll", function Scroller_ng_container_0_Template_div_scroll_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onContainerScroll($event));
    });
    ɵɵtemplate(3, Scroller_ng_container_0_ng_container_3_Template, 2, 5, "ng-container", 6)(4, Scroller_ng_container_0_ng_template_4_Template, 3, 7, "ng-template", null, 2, ɵɵtemplateRefExtractor)(6, Scroller_ng_container_0_div_6_Template, 1, 4, "div", 8)(7, Scroller_ng_container_0_div_7_Template, 4, 5, "div", 9);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const buildInContent_r8 = ɵɵreference(5);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("root"), ctx_r1.styleClass));
    ɵɵproperty("ngStyle", ctx_r1._style)("pBind", ctx_r1.ptm("root"));
    ɵɵattribute("id", ctx_r1._id)("tabindex", ctx_r1.tabindex);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.contentTemplate || ctx_r1._contentTemplate)("ngIfElse", buildInContent_r8);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r1._showSpacer);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.loaderDisabled && ctx_r1._showLoader && ctx_r1.d_loading);
  }
}
function Scroller_ng_template_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Scroller_ng_template_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Scroller_ng_template_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.contentTemplate || ctx_r1._contentTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(5, _c6, ctx_r1.items, ɵɵpureFunction2(2, _c10, ctx_r1._items, ctx_r1.loadedColumns)));
  }
}
function Scroller_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
    ɵɵtemplate(1, Scroller_ng_template_1_ng_container_1_Template, 2, 8, "ng-container", 16);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.contentTemplate || ctx_r1._contentTemplate);
  }
}
var css = (
  /*css*/
  `
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: dt('virtualscroller.loader.mask.background');
    color: dt('virtualscroller.loader.mask.color');
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-loading-icon {
    font-size: dt('virtualscroller.loader.icon.size');
    width: dt('virtualscroller.loader.icon.size');
    height: dt('virtualscroller.loader.icon.size');
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}
`
);
var classes6 = {
  root: ({
    instance
  }) => ["p-virtualscroller", {
    "p-virtualscroller-inline": instance.inline,
    "p-virtualscroller-both p-both-scroll": instance.both,
    "p-virtualscroller-horizontal p-horizontal-scroll": instance.horizontal
  }],
  content: "p-virtualscroller-content",
  spacer: "p-virtualscroller-spacer",
  loader: ({
    instance
  }) => ["p-virtualscroller-loader", {
    "p-virtualscroller-loader-mask": !instance.loaderTemplate
  }],
  loadingIcon: "p-virtualscroller-loading-icon"
};
var ScrollerStyle = class _ScrollerStyle extends BaseStyle {
  name = "virtualscroller";
  css = css;
  classes = classes6;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵScrollerStyle_BaseFactory;
    return function ScrollerStyle_Factory(__ngFactoryType__) {
      return (ɵScrollerStyle_BaseFactory || (ɵScrollerStyle_BaseFactory = ɵɵgetInheritedFactory(_ScrollerStyle)))(__ngFactoryType__ || _ScrollerStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _ScrollerStyle,
    factory: _ScrollerStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerStyle, [{
    type: Injectable
  }], null, null);
})();
var ScrollerClasses;
(function(ScrollerClasses2) {
  ScrollerClasses2["root"] = "p-virtualscroller";
  ScrollerClasses2["content"] = "p-virtualscroller-content";
  ScrollerClasses2["spacer"] = "p-virtualscroller-spacer";
  ScrollerClasses2["loader"] = "p-virtualscroller-loader";
  ScrollerClasses2["loadingIcon"] = "p-virtualscroller-loading-icon";
})(ScrollerClasses || (ScrollerClasses = {}));
var SCROLLER_INSTANCE = new InjectionToken("SCROLLER_INSTANCE");
var Scroller = class _Scroller extends BaseComponent {
  zone;
  componentName = "VirtualScroller";
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcScroller = inject(SCROLLER_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  hostName = "";
  /**
   * Unique identifier of the element.
   * @group Props
   */
  get id() {
    return this._id;
  }
  set id(val) {
    this._id = val;
  }
  /**
   * Inline style of the component.
   * @group Props
   */
  get style() {
    return this._style;
  }
  set style(val) {
    this._style = val;
  }
  /**
   * Style class of the element.
   * @group Props
   */
  get styleClass() {
    return this._styleClass;
  }
  set styleClass(val) {
    this._styleClass = val;
  }
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(val) {
    this._tabindex = val;
  }
  /**
   * An array of objects to display.
   * @group Props
   */
  get items() {
    return this._items;
  }
  set items(val) {
    this._items = val;
  }
  /**
   * The height/width of item according to orientation.
   * @group Props
   */
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(val) {
    this._itemSize = val;
  }
  /**
   * Height of the scroll viewport.
   * @group Props
   */
  get scrollHeight() {
    return this._scrollHeight;
  }
  set scrollHeight(val) {
    this._scrollHeight = val;
  }
  /**
   * Width of the scroll viewport.
   * @group Props
   */
  get scrollWidth() {
    return this._scrollWidth;
  }
  set scrollWidth(val) {
    this._scrollWidth = val;
  }
  /**
   * The orientation of scrollbar.
   * @group Props
   */
  get orientation() {
    return this._orientation;
  }
  set orientation(val) {
    this._orientation = val;
  }
  /**
   * Used to specify how many items to load in each load method in lazy mode.
   * @group Props
   */
  get step() {
    return this._step;
  }
  set step(val) {
    this._step = val;
  }
  /**
   * Delay in scroll before new data is loaded.
   * @group Props
   */
  get delay() {
    return this._delay;
  }
  set delay(val) {
    this._delay = val;
  }
  /**
   * Delay after window's resize finishes.
   * @group Props
   */
  get resizeDelay() {
    return this._resizeDelay;
  }
  set resizeDelay(val) {
    this._resizeDelay = val;
  }
  /**
   * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
   * @group Props
   */
  get appendOnly() {
    return this._appendOnly;
  }
  set appendOnly(val) {
    this._appendOnly = val;
  }
  /**
   * Specifies whether the scroller should be displayed inline or not.
   * @group Props
   */
  get inline() {
    return this._inline;
  }
  set inline(val) {
    this._inline = val;
  }
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  get lazy() {
    return this._lazy;
  }
  set lazy(val) {
    this._lazy = val;
  }
  /**
   * If disabled, the scroller feature is eliminated and the content is displayed directly.
   * @group Props
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
  }
  /**
   * Used to implement a custom loader instead of using the loader feature in the scroller.
   * @group Props
   */
  get loaderDisabled() {
    return this._loaderDisabled;
  }
  set loaderDisabled(val) {
    this._loaderDisabled = val;
  }
  /**
   * Columns to display.
   * @group Props
   */
  get columns() {
    return this._columns;
  }
  set columns(val) {
    this._columns = val;
  }
  /**
   * Used to implement a custom spacer instead of using the spacer feature in the scroller.
   * @group Props
   */
  get showSpacer() {
    return this._showSpacer;
  }
  set showSpacer(val) {
    this._showSpacer = val;
  }
  /**
   * Defines whether to show loader.
   * @group Props
   */
  get showLoader() {
    return this._showLoader;
  }
  set showLoader(val) {
    this._showLoader = val;
  }
  /**
   * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
   * @group Props
   */
  get numToleratedItems() {
    return this._numToleratedItems;
  }
  set numToleratedItems(val) {
    this._numToleratedItems = val;
  }
  /**
   * Defines whether the data is loaded.
   * @group Props
   */
  get loading() {
    return this._loading;
  }
  set loading(val) {
    this._loading = val;
  }
  /**
   * Defines whether to dynamically change the height or width of scrollable container.
   * @group Props
   */
  get autoSize() {
    return this._autoSize;
  }
  set autoSize(val) {
    this._autoSize = val;
  }
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
   * @group Props
   */
  get trackBy() {
    return this._trackBy;
  }
  set trackBy(val) {
    this._trackBy = val;
  }
  /**
   * Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  get options() {
    return this._options;
  }
  set options(val) {
    this._options = val;
    if (val && typeof val === "object") {
      Object.entries(val).forEach(([k3, v3]) => this[`_${k3}`] !== v3 && (this[`_${k3}`] = v3));
      Object.entries(val).forEach(([k3, v3]) => this[`${k3}`] !== v3 && (this[`${k3}`] = v3));
    }
  }
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {ScrollerLazyLoadEvent} event - Custom lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  /**
   * Callback to invoke when scroll position changes.
   * @param {ScrollerScrollEvent} event - Custom scroll event.
   * @group Emits
   */
  onScroll = new EventEmitter();
  /**
   * Callback to invoke when scroll position and item's range in view changes.
   * @param {ScrollerScrollEvent} event - Custom scroll index change event.
   * @group Emits
   */
  onScrollIndexChange = new EventEmitter();
  elementViewChild;
  contentViewChild;
  height;
  _id;
  _style;
  _styleClass;
  _tabindex = 0;
  _items;
  _itemSize = 0;
  _scrollHeight;
  _scrollWidth;
  _orientation = "vertical";
  _step = 0;
  _delay = 0;
  _resizeDelay = 10;
  _appendOnly = false;
  _inline = false;
  _lazy = false;
  _disabled = false;
  _loaderDisabled = false;
  _columns;
  _showSpacer = true;
  _showLoader = false;
  _numToleratedItems;
  _loading;
  _autoSize = false;
  _trackBy;
  _options;
  d_loading = false;
  d_numToleratedItems;
  contentEl;
  /**
   * Content template of the component.
   * @param {ScrollerContentTemplateContext} context - content context.
   * @see {@link ScrollerContentTemplateContext}
   * @group Templates
   */
  contentTemplate;
  /**
   * Item template of the component.
   * @param {ScrollerItemTemplateContext} context - item context.
   * @see {@link ScrollerItemTemplateContext}
   * @group Templates
   */
  itemTemplate;
  /**
   * Loader template of the component.
   * @param {ScrollerLoaderTemplateContext} context - loader context.
   * @see {@link ScrollerLoaderTemplateContext}
   * @group Templates
   */
  loaderTemplate;
  /**
   * Loader icon template of the component.
   * @param {ScrollerLoaderIconTemplateContext} context - loader icon context.
   * @see {@link ScrollerLoaderIconTemplateContext}
   * @group Templates
   */
  loaderIconTemplate;
  templates;
  _contentTemplate;
  _itemTemplate;
  _loaderTemplate;
  _loaderIconTemplate;
  first = 0;
  last = 0;
  page = 0;
  isRangeChanged = false;
  numItemsInViewport = 0;
  lastScrollPos = 0;
  lazyLoadState = {};
  loaderArr = [];
  spacerStyle = {};
  contentStyle = {};
  scrollTimeout;
  resizeTimeout;
  initialized = false;
  windowResizeListener;
  defaultWidth;
  defaultHeight;
  defaultContentWidth;
  defaultContentHeight;
  _contentStyleClass;
  get contentStyleClass() {
    return this._contentStyleClass;
  }
  set contentStyleClass(val) {
    this._contentStyleClass = val;
  }
  get vertical() {
    return this._orientation === "vertical";
  }
  get horizontal() {
    return this._orientation === "horizontal";
  }
  get both() {
    return this._orientation === "both";
  }
  get loadedItems() {
    if (this._items && !this.d_loading) {
      if (this.both) {
        return this._items.slice(this._appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => {
          if (this._columns) {
            return item;
          } else if (Array.isArray(item)) {
            return item.slice(this._appendOnly ? 0 : this.first.cols, this.last.cols);
          } else {
            return item;
          }
        });
      } else if (this.horizontal && this._columns) return this._items;
      else return this._items.slice(this._appendOnly ? 0 : this.first, this.last);
    }
    return [];
  }
  get loadedRows() {
    return this.d_loading ? this._loaderDisabled ? this.loaderArr : [] : this.loadedItems;
  }
  get loadedColumns() {
    if (this._columns && (this.both || this.horizontal)) {
      return this.d_loading && this._loaderDisabled ? this.both ? this.loaderArr[0] : this.loaderArr : this._columns.slice(this.both ? this.first.cols : this.first, this.both ? this.last.cols : this.last);
    }
    return this._columns;
  }
  _componentStyle = inject(ScrollerStyle);
  constructor(zone) {
    super();
    this.zone = zone;
  }
  onInit() {
    this.setInitialState();
  }
  onChanges(simpleChanges) {
    let isLoadingChanged = false;
    if (this.scrollHeight == "100%") {
      this.height = "100%";
    }
    if (simpleChanges.loading) {
      const {
        previousValue,
        currentValue
      } = simpleChanges.loading;
      if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
        this.d_loading = currentValue;
        isLoadingChanged = true;
      }
    }
    if (simpleChanges.orientation) {
      this.lastScrollPos = this.both ? {
        top: 0,
        left: 0
      } : 0;
    }
    if (simpleChanges.numToleratedItems) {
      const {
        previousValue,
        currentValue
      } = simpleChanges.numToleratedItems;
      if (previousValue !== currentValue && currentValue !== this.d_numToleratedItems) {
        this.d_numToleratedItems = currentValue;
      }
    }
    if (simpleChanges.options) {
      const {
        previousValue,
        currentValue
      } = simpleChanges.options;
      if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
        this.d_loading = currentValue.loading;
        isLoadingChanged = true;
      }
      if (previousValue?.numToleratedItems !== currentValue?.numToleratedItems && currentValue?.numToleratedItems !== this.d_numToleratedItems) {
        this.d_numToleratedItems = currentValue.numToleratedItems;
      }
    }
    if (this.initialized) {
      const isChanged = !isLoadingChanged && (simpleChanges.items?.previousValue?.length !== simpleChanges.items?.currentValue?.length || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);
      if (isChanged) {
        this.init();
        this.calculateAutoSize();
      }
    }
  }
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        case "item":
          this._itemTemplate = item.template;
          break;
        case "loader":
          this._loaderTemplate = item.template;
          break;
        case "loadericon":
          this._loaderIconTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  onAfterViewInit() {
    Promise.resolve().then(() => {
      this.viewInit();
    });
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
    if (!this.initialized) {
      this.viewInit();
    }
  }
  onDestroy() {
    this.unbindResizeListener();
    this.contentEl = null;
    this.initialized = false;
  }
  viewInit() {
    if (isPlatformBrowser(this.platformId) && !this.initialized) {
      if (et(this.elementViewChild?.nativeElement)) {
        this.setInitialState();
        this.setContentEl(this.contentEl);
        this.init();
        this.defaultWidth = Rt(this.elementViewChild?.nativeElement);
        this.defaultHeight = Tt(this.elementViewChild?.nativeElement);
        this.defaultContentWidth = Rt(this.contentEl);
        this.defaultContentHeight = Tt(this.contentEl);
        this.initialized = true;
      }
    }
  }
  init() {
    if (!this._disabled) {
      this.bindResizeListener();
      setTimeout(() => {
        this.setSpacerSize();
        this.setSize();
        this.calculateOptions();
        this.cd.detectChanges();
      }, 1);
    }
  }
  setContentEl(el) {
    this.contentEl = el || this.contentViewChild?.nativeElement || z(this.elementViewChild?.nativeElement, ".p-virtualscroller-content");
  }
  setInitialState() {
    this.first = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    this.last = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    this.numItemsInViewport = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    this.lastScrollPos = this.both ? {
      top: 0,
      left: 0
    } : 0;
    if (this.d_loading === void 0 || this.d_loading === false) {
      this.d_loading = this._loading || false;
    }
    this.d_numToleratedItems = this._numToleratedItems;
    this.loaderArr = this.loaderArr.length > 0 ? this.loaderArr : [];
  }
  getElementRef() {
    return this.elementViewChild;
  }
  getPageByFirst(first) {
    return Math.floor(((first ?? this.first) + this.d_numToleratedItems * 4) / (this._step || 1));
  }
  isPageChanged(first) {
    return this._step ? this.page !== this.getPageByFirst(first ?? this.first) : true;
  }
  scrollTo(options) {
    this.elementViewChild?.nativeElement?.scrollTo(options);
  }
  scrollToIndex(index, behavior = "auto") {
    const valid = this.both ? index.every((i) => i > -1) : index > -1;
    if (valid) {
      const first = this.first;
      const {
        scrollTop = 0,
        scrollLeft = 0
      } = this.elementViewChild?.nativeElement;
      const {
        numToleratedItems
      } = this.calculateNumItems();
      const contentPos = this.getContentPosition();
      const itemSize = this.itemSize;
      const calculateFirst = (_index = 0, _numT) => _index <= _numT ? 0 : _index;
      const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
      const scrollTo = (left = 0, top = 0) => this.scrollTo({
        left,
        top,
        behavior
      });
      let newFirst = this.both ? {
        rows: 0,
        cols: 0
      } : 0;
      let isRangeChanged = false, isScrollChanged = false;
      if (this.both) {
        newFirst = {
          rows: calculateFirst(index[0], numToleratedItems[0]),
          cols: calculateFirst(index[1], numToleratedItems[1])
        };
        scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
        isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
        isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
      } else {
        newFirst = calculateFirst(index, numToleratedItems);
        this.horizontal ? scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), scrollTop) : scrollTo(scrollLeft, calculateCoord(newFirst, itemSize, contentPos.top));
        isScrollChanged = this.lastScrollPos !== (this.horizontal ? scrollLeft : scrollTop);
        isRangeChanged = newFirst !== first;
      }
      this.isRangeChanged = isRangeChanged;
      isScrollChanged && (this.first = newFirst);
    }
  }
  scrollInView(index, to, behavior = "auto") {
    if (to) {
      const {
        first,
        viewport
      } = this.getRenderedRange();
      const scrollTo = (left = 0, top = 0) => this.scrollTo({
        left,
        top,
        behavior
      });
      const isToStart = to === "to-start";
      const isToEnd = to === "to-end";
      if (isToStart) {
        if (this.both) {
          if (viewport.first.rows - first.rows > index[0]) {
            scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows - 1) * this._itemSize[0]);
          } else if (viewport.first.cols - first.cols > index[1]) {
            scrollTo((viewport.first.cols - 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
          }
        } else {
          if (viewport.first - first > index) {
            const pos = (viewport.first - 1) * this._itemSize;
            this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
          }
        }
      } else if (isToEnd) {
        if (this.both) {
          if (viewport.last.rows - first.rows <= index[0] + 1) {
            scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows + 1) * this._itemSize[0]);
          } else if (viewport.last.cols - first.cols <= index[1] + 1) {
            scrollTo((viewport.first.cols + 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
          }
        } else {
          if (viewport.last - first <= index + 1) {
            const pos = (viewport.first + 1) * this._itemSize;
            this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
          }
        }
      }
    } else {
      this.scrollToIndex(index, behavior);
    }
  }
  getRenderedRange() {
    const calculateFirstInViewport = (_pos, _size) => _size || _pos ? Math.floor(_pos / (_size || _pos)) : 0;
    let firstInViewport = this.first;
    let lastInViewport = 0;
    if (this.elementViewChild?.nativeElement) {
      const {
        scrollTop,
        scrollLeft
      } = this.elementViewChild.nativeElement;
      if (this.both) {
        firstInViewport = {
          rows: calculateFirstInViewport(scrollTop, this._itemSize[0]),
          cols: calculateFirstInViewport(scrollLeft, this._itemSize[1])
        };
        lastInViewport = {
          rows: firstInViewport.rows + this.numItemsInViewport.rows,
          cols: firstInViewport.cols + this.numItemsInViewport.cols
        };
      } else {
        const scrollPos = this.horizontal ? scrollLeft : scrollTop;
        firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize);
        lastInViewport = firstInViewport + this.numItemsInViewport;
      }
    }
    return {
      first: this.first,
      last: this.last,
      viewport: {
        first: firstInViewport,
        last: lastInViewport
      }
    };
  }
  calculateNumItems() {
    const contentPos = this.getContentPosition();
    const contentWidth = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetWidth - contentPos.left : 0) || 0;
    const contentHeight = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetHeight - contentPos.top : 0) || 0;
    const calculateNumItemsInViewport = (_contentSize, _itemSize) => _itemSize || _contentSize ? Math.ceil(_contentSize / (_itemSize || _contentSize)) : 0;
    const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
    const numItemsInViewport = this.both ? {
      rows: calculateNumItemsInViewport(contentHeight, this._itemSize[0]),
      cols: calculateNumItemsInViewport(contentWidth, this._itemSize[1])
    } : calculateNumItemsInViewport(this.horizontal ? contentWidth : contentHeight, this._itemSize);
    const numToleratedItems = this.d_numToleratedItems || (this.both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
    return {
      numItemsInViewport,
      numToleratedItems
    };
  }
  calculateOptions() {
    const {
      numItemsInViewport,
      numToleratedItems
    } = this.calculateNumItems();
    const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
    const first = this.first;
    const last = this.both ? {
      rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]),
      cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true)
    } : calculateLast(this.first, numItemsInViewport, numToleratedItems);
    this.last = last;
    this.numItemsInViewport = numItemsInViewport;
    this.d_numToleratedItems = numToleratedItems;
    if (this._showLoader) {
      this.loaderArr = this.both ? Array.from({
        length: numItemsInViewport.rows
      }).map(() => Array.from({
        length: numItemsInViewport.cols
      })) : Array.from({
        length: numItemsInViewport
      });
    }
    if (this._lazy) {
      Promise.resolve().then(() => {
        this.lazyLoadState = {
          first: this._step ? this.both ? {
            rows: 0,
            cols: first.cols
          } : 0 : first,
          last: Math.min(this._step ? this._step : this.last, this._items.length)
        };
        this.handleEvents("onLazyLoad", this.lazyLoadState);
      });
    }
  }
  calculateAutoSize() {
    if (this._autoSize && !this.d_loading) {
      Promise.resolve().then(() => {
        if (this.contentEl) {
          this.contentEl.style.minHeight = this.contentEl.style.minWidth = "auto";
          this.contentEl.style.position = "relative";
          this.elementViewChild.nativeElement.style.contain = "none";
          const [contentWidth, contentHeight] = [Rt(this.contentEl), Tt(this.contentEl)];
          contentWidth !== this.defaultContentWidth && (this.elementViewChild.nativeElement.style.width = "");
          contentHeight !== this.defaultContentHeight && (this.elementViewChild.nativeElement.style.height = "");
          const [width, height] = [Rt(this.elementViewChild.nativeElement), Tt(this.elementViewChild.nativeElement)];
          (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = width < this.defaultWidth ? width + "px" : this._scrollWidth || this.defaultWidth + "px");
          (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = height < this.defaultHeight ? height + "px" : this._scrollHeight || this.defaultHeight + "px");
          this.contentEl.style.minHeight = this.contentEl.style.minWidth = "";
          this.contentEl.style.position = "";
          this.elementViewChild.nativeElement.style.contain = "";
        }
      });
    }
  }
  getLast(last = 0, isCols = false) {
    return this._items ? Math.min(isCols ? (this._columns || this._items[0]).length : this._items.length, last) : 0;
  }
  getContentPosition() {
    if (this.contentEl) {
      const style12 = getComputedStyle(this.contentEl);
      const left = parseFloat(style12.paddingLeft) + Math.max(parseFloat(style12.left) || 0, 0);
      const right = parseFloat(style12.paddingRight) + Math.max(parseFloat(style12.right) || 0, 0);
      const top = parseFloat(style12.paddingTop) + Math.max(parseFloat(style12.top) || 0, 0);
      const bottom = parseFloat(style12.paddingBottom) + Math.max(parseFloat(style12.bottom) || 0, 0);
      return {
        left,
        right,
        top,
        bottom,
        x: left + right,
        y: top + bottom
      };
    }
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      x: 0,
      y: 0
    };
  }
  setSize() {
    if (this.elementViewChild?.nativeElement) {
      const nativeElement = this.elementViewChild.nativeElement;
      const parentElement = nativeElement.parentElement?.parentElement;
      const elementWidth = nativeElement.offsetWidth;
      const parentWidth = parentElement?.offsetWidth || 0;
      const width = this._scrollWidth || `${elementWidth || parentWidth}px`;
      const elementHeight = nativeElement.offsetHeight;
      const parentHeight = parentElement?.offsetHeight || 0;
      const height = this._scrollHeight || `${elementHeight || parentHeight}px`;
      const setProp = (_name, _value) => nativeElement.style[_name] = _value;
      if (this.both || this.horizontal) {
        setProp("height", height);
        setProp("width", width);
      } else {
        setProp("height", height);
      }
    }
  }
  setSpacerSize() {
    if (this._items) {
      const contentPos = this.getContentPosition();
      const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = __spreadValues(__spreadValues({}, this.spacerStyle), {
        [`${_name}`]: (_value || []).length * _size + _cpos + "px"
      });
      if (this.both) {
        setProp("height", this._items, this._itemSize[0], contentPos.y);
        setProp("width", this._columns || this._items[1], this._itemSize[1], contentPos.x);
      } else {
        this.horizontal ? setProp("width", this._columns || this._items, this._itemSize, contentPos.x) : setProp("height", this._items, this._itemSize, contentPos.y);
      }
    }
  }
  setContentPosition(pos) {
    if (this.contentEl && !this._appendOnly) {
      const first = pos ? pos.first : this.first;
      const calculateTranslateVal = (_first, _size) => _first * _size;
      const setTransform = (_x = 0, _y = 0) => this.contentStyle = __spreadValues(__spreadValues({}, this.contentStyle), {
        transform: `translate3d(${_x}px, ${_y}px, 0)`
      });
      if (this.both) {
        setTransform(calculateTranslateVal(first.cols, this._itemSize[1]), calculateTranslateVal(first.rows, this._itemSize[0]));
      } else {
        const translateVal = calculateTranslateVal(first, this._itemSize);
        this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
      }
    }
  }
  onScrollPositionChange(event) {
    const target = event.target;
    if (!target) {
      throw new Error("Event target is null");
    }
    const contentPos = this.getContentPosition();
    const calculateScrollPos = (_pos, _cpos) => _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
    const calculateCurrentIndex = (_pos, _size) => _size || _pos ? Math.floor(_pos / (_size || _pos)) : 0;
    const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
      return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
    };
    const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
      if (_currentIndex <= _numT) return 0;
      else return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
    };
    const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
      let lastValue = _first + _num + 2 * _numT;
      if (_currentIndex >= _numT) {
        lastValue += _numT + 1;
      }
      return this.getLast(lastValue, _isCols);
    };
    const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
    const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
    let newFirst = this.both ? {
      rows: 0,
      cols: 0
    } : 0;
    let newLast = this.last;
    let isRangeChanged = false;
    let newScrollPos = this.lastScrollPos;
    if (this.both) {
      const isScrollDown = this.lastScrollPos.top <= scrollTop;
      const isScrollRight = this.lastScrollPos.left <= scrollLeft;
      if (!this._appendOnly || this._appendOnly && (isScrollDown || isScrollRight)) {
        const currentIndex = {
          rows: calculateCurrentIndex(scrollTop, this._itemSize[0]),
          cols: calculateCurrentIndex(scrollLeft, this._itemSize[1])
        };
        const triggerIndex = {
          rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newFirst = {
          rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newLast = {
          rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
          cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
        };
        isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
        newScrollPos = {
          top: scrollTop,
          left: scrollLeft
        };
      }
    } else {
      const scrollPos = this.horizontal ? scrollLeft : scrollTop;
      const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
      if (!this._appendOnly || this._appendOnly && isScrollDownOrRight) {
        const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize);
        const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
        isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
        newScrollPos = scrollPos;
      }
    }
    return {
      first: newFirst,
      last: newLast,
      isRangeChanged,
      scrollPos: newScrollPos
    };
  }
  onScrollChange(event) {
    const {
      first,
      last,
      isRangeChanged,
      scrollPos
    } = this.onScrollPositionChange(event);
    if (isRangeChanged) {
      const newState = {
        first,
        last
      };
      this.setContentPosition(newState);
      this.first = first;
      this.last = last;
      this.lastScrollPos = scrollPos;
      this.handleEvents("onScrollIndexChange", newState);
      if (this._lazy && this.isPageChanged(first)) {
        const lazyLoadState = {
          first: this._step ? Math.min(this.getPageByFirst(first) * this._step, this._items.length - this._step) : first,
          last: Math.min(this._step ? (this.getPageByFirst(first) + 1) * this._step : last, this._items.length)
        };
        const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
        isLazyStateChanged && this.handleEvents("onLazyLoad", lazyLoadState);
        this.lazyLoadState = lazyLoadState;
      }
    }
  }
  onContainerScroll(event) {
    this.handleEvents("onScroll", {
      originalEvent: event
    });
    if (this._delay) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      if (!this.d_loading && this._showLoader) {
        const {
          isRangeChanged
        } = this.onScrollPositionChange(event);
        const changed = isRangeChanged || (this._step ? this.isPageChanged() : false);
        if (changed) {
          this.d_loading = true;
          this.cd.detectChanges();
        }
      }
      this.scrollTimeout = setTimeout(() => {
        this.onScrollChange(event);
        if (this.d_loading && this._showLoader && (!this._lazy || this._loading === void 0)) {
          this.d_loading = false;
          this.page = this.getPageByFirst();
        }
        this.cd.detectChanges();
      }, this._delay);
    } else {
      !this.d_loading && this.onScrollChange(event);
    }
  }
  bindResizeListener() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.windowResizeListener) {
        this.zone.runOutsideAngular(() => {
          const window2 = this.document.defaultView;
          const event = Yt() ? "orientationchange" : "resize";
          this.windowResizeListener = this.renderer.listen(window2, event, this.onWindowResize.bind(this));
        });
      }
    }
  }
  unbindResizeListener() {
    if (this.windowResizeListener) {
      this.windowResizeListener();
      this.windowResizeListener = null;
    }
  }
  onWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      if (et(this.elementViewChild?.nativeElement)) {
        const [width, height] = [Rt(this.elementViewChild?.nativeElement), Tt(this.elementViewChild?.nativeElement)];
        const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
        const reinit = this.both ? isDiffWidth || isDiffHeight : this.horizontal ? isDiffWidth : this.vertical ? isDiffHeight : false;
        reinit && this.zone.run(() => {
          this.d_numToleratedItems = this._numToleratedItems;
          this.defaultWidth = width;
          this.defaultHeight = height;
          this.defaultContentWidth = Rt(this.contentEl);
          this.defaultContentHeight = Tt(this.contentEl);
          this.init();
        });
      }
    }, this._resizeDelay);
  }
  handleEvents(name, params) {
    return this.options && this.options[name] ? this.options[name](params) : this[name].emit(params);
  }
  getContentOptions() {
    return {
      contentStyleClass: `p-virtualscroller-content ${this.d_loading ? "p-virtualscroller-loading" : ""}`,
      items: this.loadedItems,
      getItemOptions: (index) => this.getOptions(index),
      loading: this.d_loading,
      getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
      itemSize: this._itemSize,
      rows: this.loadedRows,
      columns: this.loadedColumns,
      spacerStyle: this.spacerStyle,
      contentStyle: this.contentStyle,
      vertical: this.vertical,
      horizontal: this.horizontal,
      both: this.both,
      scrollTo: this.scrollTo.bind(this),
      scrollToIndex: this.scrollToIndex.bind(this),
      orientation: this._orientation,
      scrollableElement: this.elementViewChild?.nativeElement
    };
  }
  getOptions(renderedIndex) {
    const count = (this._items || []).length;
    const index = this.both ? this.first.rows + renderedIndex : this.first + renderedIndex;
    return {
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0
    };
  }
  getLoaderOptions(index, extOptions) {
    const count = this.loaderArr.length;
    return __spreadValues({
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
      loading: this.d_loading
    }, extOptions);
  }
  static ɵfac = function Scroller_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Scroller)(ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Scroller,
    selectors: [["p-scroller"], ["p-virtualscroller"], ["p-virtual-scroller"], ["p-virtualScroller"]],
    contentQueries: function Scroller_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c05, 4)(dirIndex, _c12, 4)(dirIndex, _c22, 4)(dirIndex, _c32, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loaderTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loaderIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Scroller_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c42, 5)(_c05, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.elementViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentViewChild = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function Scroller_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("height", ctx.height);
      }
    },
    inputs: {
      hostName: "hostName",
      id: "id",
      style: "style",
      styleClass: "styleClass",
      tabindex: "tabindex",
      items: "items",
      itemSize: "itemSize",
      scrollHeight: "scrollHeight",
      scrollWidth: "scrollWidth",
      orientation: "orientation",
      step: "step",
      delay: "delay",
      resizeDelay: "resizeDelay",
      appendOnly: "appendOnly",
      inline: "inline",
      lazy: "lazy",
      disabled: "disabled",
      loaderDisabled: "loaderDisabled",
      columns: "columns",
      showSpacer: "showSpacer",
      showLoader: "showLoader",
      numToleratedItems: "numToleratedItems",
      loading: "loading",
      autoSize: "autoSize",
      trackBy: "trackBy",
      options: "options"
    },
    outputs: {
      onLazyLoad: "onLazyLoad",
      onScroll: "onScroll",
      onScrollIndexChange: "onScrollIndexChange"
    },
    features: [ɵɵProvidersFeature([ScrollerStyle, {
      provide: SCROLLER_INSTANCE,
      useExisting: _Scroller
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Scroller
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c52,
    decls: 3,
    vars: 2,
    consts: [["disabledContainer", ""], ["element", ""], ["buildInContent", ""], ["content", ""], ["buildInLoader", ""], ["buildInLoaderIcon", ""], [4, "ngIf", "ngIfElse"], [3, "scroll", "ngStyle", "pBind"], [3, "class", "ngStyle", "pBind", 4, "ngIf"], [3, "class", "pBind", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "pBind"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "ngStyle", "pBind"], [4, "ngFor", "ngForOf"], ["data-p-icon", "spinner", 3, "spin", "pBind"], [4, "ngIf"]],
    template: function Scroller_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, Scroller_ng_container_0_Template, 8, 10, "ng-container", 6)(1, Scroller_ng_template_1_Template, 2, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        const disabledContainer_r9 = ɵɵreference(2);
        ɵɵproperty("ngIf", !ctx._disabled)("ngIfElse", disabledContainer_r9);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, SpinnerIcon, SharedModule, Bind],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Scroller, [{
    type: Component,
    args: [{
      selector: "p-scroller, p-virtualscroller, p-virtual-scroller, p-virtualScroller",
      imports: [CommonModule, SpinnerIcon, SharedModule, Bind],
      standalone: true,
      template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div #element [attr.id]="_id" [attr.tabindex]="tabindex" [ngStyle]="_style" [class]="cn(cx('root'), styleClass)" (scroll)="onContainerScroll($event)" [pBind]="ptm('root')">
                <ng-container *ngIf="contentTemplate || _contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content [class]="cn(cx('content'), contentStyleClass)" [style]="contentStyle" [pBind]="ptm('content')">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy">
                            <ng-container *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" [class]="cx('spacer')" [ngStyle]="spacerStyle" [pBind]="ptm('spacer')"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" [class]="cx('loader')" [pBind]="ptm('loader')">
                    <ng-container *ngIf="loaderTemplate || _loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container
                                *ngTemplateOutlet="
                                    loaderTemplate || _loaderTemplate;
                                    context: {
                                        options: getLoaderOptions(index, both && { numCols: numItemsInViewport.cols })
                                    }
                                "
                            ></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate || _loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate || _loaderIconTemplate; context: { options: { styleClass: 'p-virtualscroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <svg data-p-icon="spinner" [class]="cx('loadingIcon')" [spin]="true" [pBind]="ptm('loadingIcon')" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate || _contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `,
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation.None,
      providers: [ScrollerStyle, {
        provide: SCROLLER_INSTANCE,
        useExisting: Scroller
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Scroller
      }],
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: NgZone
  }], {
    hostName: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    scrollWidth: [{
      type: Input
    }],
    orientation: [{
      type: Input
    }],
    step: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    resizeDelay: [{
      type: Input
    }],
    appendOnly: [{
      type: Input
    }],
    inline: [{
      type: Input
    }],
    lazy: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    loaderDisabled: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    showSpacer: [{
      type: Input
    }],
    showLoader: [{
      type: Input
    }],
    numToleratedItems: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    autoSize: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    onLazyLoad: [{
      type: Output
    }],
    onScroll: [{
      type: Output
    }],
    onScrollIndexChange: [{
      type: Output
    }],
    elementViewChild: [{
      type: ViewChild,
      args: ["element"]
    }],
    contentViewChild: [{
      type: ViewChild,
      args: ["content"]
    }],
    height: [{
      type: HostBinding,
      args: ["style.height"]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    loaderTemplate: [{
      type: ContentChild,
      args: ["loader", {
        descendants: false
      }]
    }],
    loaderIconTemplate: [{
      type: ContentChild,
      args: ["loadericon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var ScrollerModule = class _ScrollerModule {
  static ɵfac = function ScrollerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ScrollerModule,
    imports: [Scroller, SharedModule],
    exports: [Scroller, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Scroller, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerModule, [{
    type: NgModule,
    args: [{
      imports: [Scroller, SharedModule],
      exports: [Scroller, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/select/index.mjs
var style6 = "\n    .p-select {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n        background: dt('select.background');\n        border: 1px solid dt('select.border.color');\n        transition:\n            background dt('select.transition.duration'),\n            color dt('select.transition.duration'),\n            border-color dt('select.transition.duration'),\n            outline-color dt('select.transition.duration'),\n            box-shadow dt('select.transition.duration');\n        border-radius: dt('select.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('select.shadow');\n    }\n\n    .p-select:not(.p-disabled):hover {\n        border-color: dt('select.hover.border.color');\n    }\n\n    .p-select:not(.p-disabled).p-focus {\n        border-color: dt('select.focus.border.color');\n        box-shadow: dt('select.focus.ring.shadow');\n        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');\n        outline-offset: dt('select.focus.ring.offset');\n    }\n\n    .p-select.p-variant-filled {\n        background: dt('select.filled.background');\n    }\n\n    .p-select.p-variant-filled:not(.p-disabled):hover {\n        background: dt('select.filled.hover.background');\n    }\n\n    .p-select.p-variant-filled:not(.p-disabled).p-focus {\n        background: dt('select.filled.focus.background');\n    }\n\n    .p-select.p-invalid {\n        border-color: dt('select.invalid.border.color');\n    }\n\n    .p-select.p-disabled {\n        opacity: 1;\n        background: dt('select.disabled.background');\n    }\n\n    .p-select-clear-icon {\n        align-self: center;\n        color: dt('select.clear.icon.color');\n        inset-inline-end: dt('select.dropdown.width');\n    }\n\n    .p-select-dropdown {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        background: transparent;\n        color: dt('select.dropdown.color');\n        width: dt('select.dropdown.width');\n        border-start-end-radius: dt('select.border.radius');\n        border-end-end-radius: dt('select.border.radius');\n    }\n\n    .p-select-label {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        flex: 1 1 auto;\n        width: 1%;\n        padding: dt('select.padding.y') dt('select.padding.x');\n        text-overflow: ellipsis;\n        cursor: pointer;\n        color: dt('select.color');\n        background: transparent;\n        border: 0 none;\n        outline: 0 none;\n        font-size: 1rem;\n    }\n\n    .p-select-label.p-placeholder {\n        color: dt('select.placeholder.color');\n    }\n\n    .p-select.p-invalid .p-select-label.p-placeholder {\n        color: dt('select.invalid.placeholder.color');\n    }\n\n    .p-select.p-disabled .p-select-label {\n        color: dt('select.disabled.color');\n    }\n\n    .p-select-label-empty {\n        overflow: hidden;\n        opacity: 0;\n    }\n\n    input.p-select-label {\n        cursor: default;\n    }\n\n    .p-select-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: dt('select.overlay.background');\n        color: dt('select.overlay.color');\n        border: 1px solid dt('select.overlay.border.color');\n        border-radius: dt('select.overlay.border.radius');\n        box-shadow: dt('select.overlay.shadow');\n        min-width: 100%;\n        transform-origin: inherit;\n        will-change: transform;\n    }\n\n    .p-select-header {\n        padding: dt('select.list.header.padding');\n    }\n\n    .p-select-filter {\n        width: 100%;\n    }\n\n    .p-select-list-container {\n        overflow: auto;\n    }\n\n    .p-select-option-group {\n        cursor: auto;\n        margin: 0;\n        padding: dt('select.option.group.padding');\n        background: dt('select.option.group.background');\n        color: dt('select.option.group.color');\n        font-weight: dt('select.option.group.font.weight');\n    }\n\n    .p-select-list {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        padding: dt('select.list.padding');\n        gap: dt('select.list.gap');\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-select-option {\n        cursor: pointer;\n        font-weight: normal;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        padding: dt('select.option.padding');\n        border: 0 none;\n        color: dt('select.option.color');\n        background: transparent;\n        transition:\n            background dt('select.transition.duration'),\n            color dt('select.transition.duration'),\n            border-color dt('select.transition.duration'),\n            box-shadow dt('select.transition.duration'),\n            outline-color dt('select.transition.duration');\n        border-radius: dt('select.option.border.radius');\n    }\n\n    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {\n        background: dt('select.option.focus.background');\n        color: dt('select.option.focus.color');\n    }\n\n    .p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {\n        background: dt('select.option.focus.background');\n        color: dt('select.option.focus.color');\n    }\n\n    .p-select-option.p-select-option-selected {\n        background: dt('select.option.selected.background');\n        color: dt('select.option.selected.color');\n    }\n\n    .p-select-option.p-select-option-selected.p-focus {\n        background: dt('select.option.selected.focus.background');\n        color: dt('select.option.selected.focus.color');\n    }\n   \n    .p-select-option-blank-icon {\n        flex-shrink: 0;\n    }\n\n    .p-select-option-check-icon {\n        position: relative;\n        flex-shrink: 0;\n        margin-inline-start: dt('select.checkmark.gutter.start');\n        margin-inline-end: dt('select.checkmark.gutter.end');\n        color: dt('select.checkmark.color');\n    }\n\n    .p-select-empty-message {\n        padding: dt('select.empty.message.padding');\n    }\n\n    .p-select-fluid {\n        display: flex;\n        width: 100%;\n    }\n\n    .p-select-sm .p-select-label {\n        font-size: dt('select.sm.font.size');\n        padding-block: dt('select.sm.padding.y');\n        padding-inline: dt('select.sm.padding.x');\n    }\n\n    .p-select-sm .p-select-dropdown .p-icon {\n        font-size: dt('select.sm.font.size');\n        width: dt('select.sm.font.size');\n        height: dt('select.sm.font.size');\n    }\n\n    .p-select-lg .p-select-label {\n        font-size: dt('select.lg.font.size');\n        padding-block: dt('select.lg.padding.y');\n        padding-inline: dt('select.lg.padding.x');\n    }\n\n    .p-select-lg .p-select-dropdown .p-icon {\n        font-size: dt('select.lg.font.size');\n        width: dt('select.lg.font.size');\n        height: dt('select.lg.font.size');\n    }\n\n    .p-floatlabel-in .p-select-filter {\n        padding-block-start: dt('select.padding.y');\n        padding-block-end: dt('select.padding.y');\n    }\n";

// node_modules/primeng/fesm2022/primeng-select.mjs
var _c06 = (a0) => ({
  height: a0
});
var _c13 = (a0) => ({
  $implicit: a0
});
function SelectItem_ng_container_1__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 6);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("optionCheckIcon"));
    ɵɵproperty("pBind", ctx_r0.$pcSelect == null ? null : ctx_r0.$pcSelect.ptm("optionCheckIcon"));
  }
}
function SelectItem_ng_container_1__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("optionBlankIcon"));
    ɵɵproperty("pBind", ctx_r0.$pcSelect == null ? null : ctx_r0.$pcSelect.ptm("optionBlankIcon"));
  }
}
function SelectItem_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, SelectItem_ng_container_1__svg_svg_1_Template, 1, 3, "svg", 4)(2, SelectItem_ng_container_1__svg_svg_2_Template, 1, 3, "svg", 5);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.selected);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.selected);
  }
}
function SelectItem_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 8);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("pBind", ctx_r0.$pcSelect == null ? null : ctx_r0.$pcSelect.ptm("optionLabel"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.label ?? "empty");
  }
}
function SelectItem_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c23 = ["item"];
var _c33 = ["group"];
var _c43 = ["loader"];
var _c53 = ["selectedItem"];
var _c62 = ["header"];
var _c72 = ["filter"];
var _c82 = ["footer"];
var _c92 = ["emptyfilter"];
var _c102 = ["empty"];
var _c11 = ["dropdownicon"];
var _c122 = ["loadingicon"];
var _c132 = ["clearicon"];
var _c14 = ["filtericon"];
var _c15 = ["onicon"];
var _c16 = ["officon"];
var _c17 = ["cancelicon"];
var _c18 = ["focusInput"];
var _c19 = ["editableInput"];
var _c20 = ["items"];
var _c21 = ["scroller"];
var _c222 = ["overlay"];
var _c232 = ["firstHiddenFocusableEl"];
var _c24 = ["lastHiddenFocusableEl"];
var _c25 = (a0) => ({
  class: a0
});
var _c26 = (a0) => ({
  options: a0
});
var _c27 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
var _c28 = () => ({});
function Select_span_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.label() === "p-emptylabel" ? " " : ctx_r2.label());
  }
}
function Select_span_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 24);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.selectedItemTemplate || ctx_r2._selectedItemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c13, ctx_r2.selectedOption));
  }
}
function Select_span_0_ng_template_4_span_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.label() === "p-emptylabel" ? " " : ctx_r2.label());
  }
}
function Select_span_0_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_span_0_ng_template_4_span_0_Template, 2, 1, "span", 18);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r2.isSelectedOptionEmpty());
  }
}
function Select_span_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 22, 3);
    ɵɵlistener("focus", function Select_span_0_Template_span_focus_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onInputFocus($event));
    })("blur", function Select_span_0_Template_span_blur_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onInputBlur($event));
    })("keydown", function Select_span_0_Template_span_keydown_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onKeyDown($event));
    });
    ɵɵtemplate(2, Select_span_0_ng_container_2_Template, 2, 1, "ng-container", 20)(3, Select_span_0_ng_container_3_Template, 1, 4, "ng-container", 23)(4, Select_span_0_ng_template_4_Template, 1, 1, "ng-template", null, 4, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const defaultPlaceholder_r4 = ɵɵreference(5);
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap(ctx_r2.cx("label"));
    ɵɵproperty("pBind", ctx_r2.ptm("label"))("pTooltip", ctx_r2.tooltip)("pTooltipUnstyled", ctx_r2.unstyled())("tooltipPosition", ctx_r2.tooltipPosition)("positionStyle", ctx_r2.tooltipPositionStyle)("tooltipStyleClass", ctx_r2.tooltipStyleClass)("pAutoFocus", ctx_r2.autofocus);
    ɵɵattribute("aria-disabled", ctx_r2.$disabled())("id", ctx_r2.inputId)("aria-label", ctx_r2.ariaLabel || (ctx_r2.label() === "p-emptylabel" ? void 0 : ctx_r2.label()))("aria-labelledby", ctx_r2.ariaLabelledBy)("aria-haspopup", "listbox")("aria-expanded", ctx_r2.overlayVisible ?? false)("aria-controls", ctx_r2.overlayVisible ? ctx_r2.id + "_list" : null)("tabindex", !ctx_r2.$disabled() ? ctx_r2.tabindex : -1)("aria-activedescendant", ctx_r2.focused ? ctx_r2.focusedOptionId : void 0)("aria-required", ctx_r2.required())("required", ctx_r2.required() ? "" : void 0)("disabled", ctx_r2.$disabled() ? "" : void 0)("data-p", ctx_r2.labelDataP);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r2.selectedItemTemplate && !ctx_r2._selectedItemTemplate)("ngIfElse", defaultPlaceholder_r4);
    ɵɵadvance();
    ɵɵproperty("ngIf", (ctx_r2.selectedItemTemplate || ctx_r2._selectedItemTemplate) && !ctx_r2.isSelectedOptionEmpty());
  }
}
function Select_input_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 25, 5);
    ɵɵlistener("input", function Select_input_1_Template_input_input_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onEditableInput($event));
    })("keydown", function Select_input_1_Template_input_keydown_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onKeyDown($event));
    })("focus", function Select_input_1_Template_input_focus_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onInputFocus($event));
    })("blur", function Select_input_1_Template_input_blur_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onInputBlur($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap(ctx_r2.cx("label"));
    ɵɵproperty("pBind", ctx_r2.ptm("label"))("pAutoFocus", ctx_r2.autofocus);
    ɵɵattribute("id", ctx_r2.inputId)("aria-haspopup", "listbox")("placeholder", ctx_r2.modelValue() === void 0 || ctx_r2.modelValue() === null ? ctx_r2.placeholder() : void 0)("aria-label", ctx_r2.ariaLabel || (ctx_r2.label() === "p-emptylabel" ? void 0 : ctx_r2.label()))("aria-activedescendant", ctx_r2.focused ? ctx_r2.focusedOptionId : void 0)("name", ctx_r2.name())("minlength", ctx_r2.minlength())("min", ctx_r2.min())("max", ctx_r2.max())("pattern", ctx_r2.pattern())("size", ctx_r2.inputSize())("maxlength", ctx_r2.maxlength())("required", ctx_r2.required() ? "" : void 0)("readonly", ctx_r2.readonly ? "" : void 0)("disabled", ctx_r2.$disabled() ? "" : void 0)("data-p", ctx_r2.labelDataP);
  }
}
function Select_ng_container_2__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 28);
    ɵɵlistener("click", function Select_ng_container_2__svg_svg_1_Template_svg_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.clear($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r2.ptm("clearIcon"));
    ɵɵattribute("data-pc-section", "clearicon");
  }
}
function Select_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Select_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Select_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 29);
    ɵɵlistener("click", function Select_ng_container_2_span_2_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.clear($event));
    });
    ɵɵtemplate(1, Select_ng_container_2_span_2_1_Template, 1, 0, null, 30);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r2.ptm("clearIcon"));
    ɵɵattribute("data-pc-section", "clearicon");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.clearIconTemplate || ctx_r2._clearIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c25, ctx_r2.cx("clearIcon")));
  }
}
function Select_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_container_2__svg_svg_1_Template, 1, 4, "svg", 26)(2, Select_ng_container_2_span_2_Template, 2, 8, "span", 27);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.clearIconTemplate && !ctx_r2._clearIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.clearIconTemplate || ctx_r2._clearIconTemplate);
  }
}
function Select_ng_container_4_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_container_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_container_4_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 31);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.loadingIconTemplate || ctx_r2._loadingIconTemplate);
  }
}
function Select_ng_container_4_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 33);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("loadingIcon"), "pi-spin" + ctx_r2.loadingIcon));
    ɵɵproperty("pBind", ctx_r2.ptm("loadingIcon"));
  }
}
function Select_ng_container_4_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 33);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("loadingIcon"), "pi pi-spinner pi-spin"));
    ɵɵproperty("pBind", ctx_r2.ptm("loadingIcon"));
  }
}
function Select_ng_container_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_container_4_ng_container_2_span_1_Template, 1, 3, "span", 32)(2, Select_ng_container_4_ng_container_2_span_2_Template, 1, 3, "span", 32);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.loadingIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.loadingIcon);
  }
}
function Select_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_container_4_ng_container_1_Template, 2, 1, "ng-container", 18)(2, Select_ng_container_4_ng_container_2_Template, 3, 2, "ng-container", 18);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.loadingIconTemplate || ctx_r2._loadingIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.loadingIconTemplate && !ctx_r2._loadingIconTemplate);
  }
}
function Select_ng_template_5_ng_container_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 36);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("dropdownIcon"), ctx_r2.dropdownIcon));
    ɵɵproperty("pBind", ctx_r2.ptm("dropdownIcon"));
  }
}
function Select_ng_template_5_ng_container_0__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 37);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.cx("dropdownIcon"));
    ɵɵproperty("pBind", ctx_r2.ptm("dropdownIcon"));
  }
}
function Select_ng_template_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_template_5_ng_container_0_span_1_Template, 1, 3, "span", 34)(2, Select_ng_template_5_ng_container_0__svg_svg_2_Template, 1, 3, "svg", 35);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.dropdownIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.dropdownIcon);
  }
}
function Select_ng_template_5_span_1_1_ng_template_0_Template(rf, ctx) {
}
function Select_ng_template_5_span_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_5_span_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Select_ng_template_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 36);
    ɵɵtemplate(1, Select_ng_template_5_span_1_1_Template, 1, 0, null, 30);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("dropdownIcon"));
    ɵɵproperty("pBind", ctx_r2.ptm("dropdownIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.dropdownIconTemplate || ctx_r2._dropdownIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(5, _c25, ctx_r2.cx("dropdownIcon")));
  }
}
function Select_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_5_ng_container_0_Template, 3, 2, "ng-container", 18)(1, Select_ng_template_5_span_1_Template, 2, 7, "span", 34);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngIf", !ctx_r2.dropdownIconTemplate && !ctx_r2._dropdownIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.dropdownIconTemplate || ctx_r2._dropdownIconTemplate);
  }
}
function Select_ng_template_9_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_template_9_div_4_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_template_9_div_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_template_9_div_4_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 30);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.filterTemplate || ctx_r2._filterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c26, ctx_r2.filterOptions));
  }
}
function Select_ng_template_9_div_4_ng_template_2__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 45);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("pBind", ctx_r2.ptm("filterIcon"));
  }
}
function Select_ng_template_9_div_4_ng_template_2_span_5_1_ng_template_0_Template(rf, ctx) {
}
function Select_ng_template_9_div_4_ng_template_2_span_5_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_9_div_4_ng_template_2_span_5_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Select_ng_template_9_div_4_ng_template_2_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 36);
    ɵɵtemplate(1, Select_ng_template_9_div_4_ng_template_2_span_5_1_Template, 1, 0, null, 31);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("pBind", ctx_r2.ptm("filterIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.filterIconTemplate || ctx_r2._filterIconTemplate);
  }
}
function Select_ng_template_9_div_4_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-iconfield", 41)(1, "input", 42, 10);
    ɵɵlistener("input", function Select_ng_template_9_div_4_ng_template_2_Template_input_input_1_listener($event) {
      ɵɵrestoreView(_r10);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.onFilterInputChange($event));
    })("keydown", function Select_ng_template_9_div_4_ng_template_2_Template_input_keydown_1_listener($event) {
      ɵɵrestoreView(_r10);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.onFilterKeyDown($event));
    })("blur", function Select_ng_template_9_div_4_ng_template_2_Template_input_blur_1_listener($event) {
      ɵɵrestoreView(_r10);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.onFilterBlur($event));
    });
    ɵɵelementEnd();
    ɵɵelementStart(3, "p-inputicon", 41);
    ɵɵtemplate(4, Select_ng_template_9_div_4_ng_template_2__svg_svg_4_Template, 1, 1, "svg", 43)(5, Select_ng_template_9_div_4_ng_template_2_span_5_Template, 2, 2, "span", 44);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("pt", ctx_r2.ptm("pcFilterContainer"))("unstyled", ctx_r2.unstyled());
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.cx("pcFilter"));
    ɵɵproperty("pSize", ctx_r2.size())("value", ctx_r2._filterValue() || "")("variant", ctx_r2.$variant())("pt", ctx_r2.ptm("pcFilter"))("unstyled", ctx_r2.unstyled());
    ɵɵattribute("placeholder", ctx_r2.filterPlaceholder)("aria-owns", ctx_r2.id + "_list")("aria-label", ctx_r2.ariaFilterLabel)("aria-activedescendant", ctx_r2.focusedOptionId);
    ɵɵadvance(2);
    ɵɵproperty("pt", ctx_r2.ptm("pcFilterIconContainer"))("unstyled", ctx_r2.unstyled());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.filterIconTemplate && !ctx_r2._filterIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.filterIconTemplate || ctx_r2._filterIconTemplate);
  }
}
function Select_ng_template_9_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 29);
    ɵɵlistener("click", function Select_ng_template_9_div_4_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r9);
      return ɵɵresetView($event.stopPropagation());
    });
    ɵɵtemplate(1, Select_ng_template_9_div_4_ng_container_1_Template, 2, 4, "ng-container", 20)(2, Select_ng_template_9_div_4_ng_template_2_Template, 6, 17, "ng-template", null, 9, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const builtInFilterElement_r11 = ɵɵreference(3);
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("header"));
    ɵɵproperty("pBind", ctx_r2.ptm("header"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.filterTemplate || ctx_r2._filterTemplate)("ngIfElse", builtInFilterElement_r11);
  }
}
function Select_ng_template_9_p_scroller_6_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_template_9_p_scroller_6_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_9_p_scroller_6_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 30);
  }
  if (rf & 2) {
    const items_r13 = ctx.$implicit;
    const scrollerOptions_r14 = ctx.options;
    ɵɵnextContext(2);
    const buildInItems_r15 = ɵɵreference(9);
    ɵɵproperty("ngTemplateOutlet", buildInItems_r15)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c27, items_r13, scrollerOptions_r14));
  }
}
function Select_ng_template_9_p_scroller_6_ng_container_4_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_template_9_p_scroller_6_ng_container_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_9_p_scroller_6_ng_container_4_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 30);
  }
  if (rf & 2) {
    const scrollerOptions_r16 = ctx.options;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.loaderTemplate || ctx_r2._loaderTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c26, scrollerOptions_r16));
  }
}
function Select_ng_template_9_p_scroller_6_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_template_9_p_scroller_6_ng_container_4_ng_template_1_Template, 1, 4, "ng-template", null, 12, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
  }
}
function Select_ng_template_9_p_scroller_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-scroller", 46, 11);
    ɵɵlistener("onLazyLoad", function Select_ng_template_9_p_scroller_6_Template_p_scroller_onLazyLoad_0_listener($event) {
      ɵɵrestoreView(_r12);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onLazyLoad.emit($event));
    });
    ɵɵtemplate(2, Select_ng_template_9_p_scroller_6_ng_template_2_Template, 1, 5, "ng-template", null, 2, ɵɵtemplateRefExtractor)(4, Select_ng_template_9_p_scroller_6_ng_container_4_Template, 3, 0, "ng-container", 18);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵstyleMap(ɵɵpureFunction1(9, _c06, ctx_r2.scrollHeight));
    ɵɵproperty("items", ctx_r2.visibleOptions())("itemSize", ctx_r2.virtualScrollItemSize)("autoSize", true)("lazy", ctx_r2.lazy)("options", ctx_r2.virtualScrollOptions)("pt", ctx_r2.ptm("virtualScroller"));
    ɵɵadvance(4);
    ɵɵproperty("ngIf", ctx_r2.loaderTemplate || ctx_r2._loaderTemplate);
  }
}
function Select_ng_template_9_ng_container_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_template_9_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Select_ng_template_9_ng_container_7_ng_container_1_Template, 1, 0, "ng-container", 30);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const buildInItems_r15 = ɵɵreference(9);
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", buildInItems_r15)("ngTemplateOutletContext", ɵɵpureFunction2(3, _c27, ctx_r2.visibleOptions(), ɵɵpureFunction0(2, _c28)));
  }
}
function Select_ng_template_9_ng_template_8_ng_template_2_ng_container_0_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 36);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r17 = ɵɵnextContext(2).$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.cx("optionGroupLabel"));
    ɵɵproperty("pBind", ctx_r2.ptm("optionGroupLabel"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.getOptionGroupLabel(option_r17.optionGroup));
  }
}
function Select_ng_template_9_ng_template_8_ng_template_2_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_template_9_ng_template_8_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "li", 50);
    ɵɵtemplate(2, Select_ng_template_9_ng_template_8_ng_template_2_ng_container_0_span_2_Template, 2, 4, "span", 34)(3, Select_ng_template_9_ng_template_8_ng_template_2_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 30);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r17 = ɵɵnextContext();
    const option_r17 = ctx_r17.$implicit;
    const i_r19 = ctx_r17.index;
    const scrollerOptions_r20 = ɵɵnextContext().options;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.cx("optionGroup"));
    ɵɵproperty("ngStyle", ɵɵpureFunction1(8, _c06, scrollerOptions_r20.itemSize + "px"))("pBind", ctx_r2.ptm("optionGroup"));
    ɵɵattribute("id", ctx_r2.id + "_" + ctx_r2.getOptionIndex(i_r19, scrollerOptions_r20));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.groupTemplate && !ctx_r2._groupTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.groupTemplate || ctx_r2._groupTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(10, _c13, option_r17.optionGroup));
  }
}
function Select_ng_template_9_ng_template_8_ng_template_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "p-selectItem", 51);
    ɵɵlistener("onClick", function Select_ng_template_9_ng_template_8_ng_template_2_ng_container_1_Template_p_selectItem_onClick_1_listener($event) {
      ɵɵrestoreView(_r21);
      const option_r17 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.onOptionSelect($event, option_r17));
    })("onMouseEnter", function Select_ng_template_9_ng_template_8_ng_template_2_ng_container_1_Template_p_selectItem_onMouseEnter_1_listener($event) {
      ɵɵrestoreView(_r21);
      const i_r19 = ɵɵnextContext().index;
      const scrollerOptions_r20 = ɵɵnextContext().options;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onOptionMouseEnter($event, ctx_r2.getOptionIndex(i_r19, scrollerOptions_r20)));
    });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r17 = ɵɵnextContext();
    const option_r17 = ctx_r17.$implicit;
    const i_r19 = ctx_r17.index;
    const scrollerOptions_r20 = ɵɵnextContext().options;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("id", ctx_r2.id + "_" + ctx_r2.getOptionIndex(i_r19, scrollerOptions_r20))("option", option_r17)("checkmark", ctx_r2.checkmark)("selected", ctx_r2.isSelected(option_r17))("label", ctx_r2.getOptionLabel(option_r17))("disabled", ctx_r2.isOptionDisabled(option_r17))("template", ctx_r2.itemTemplate || ctx_r2._itemTemplate)("focused", ctx_r2.focusedOptionIndex() === ctx_r2.getOptionIndex(i_r19, scrollerOptions_r20))("ariaPosInset", ctx_r2.getAriaPosInset(ctx_r2.getOptionIndex(i_r19, scrollerOptions_r20)))("ariaSetSize", ctx_r2.ariaSetSize)("index", i_r19)("unstyled", ctx_r2.unstyled())("scrollerOptions", scrollerOptions_r20);
  }
}
function Select_ng_template_9_ng_template_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_9_ng_template_8_ng_template_2_ng_container_0_Template, 4, 12, "ng-container", 18)(1, Select_ng_template_9_ng_template_8_ng_template_2_ng_container_1_Template, 2, 13, "ng-container", 18);
  }
  if (rf & 2) {
    const option_r17 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r2.isOptionGroup(option_r17));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.isOptionGroup(option_r17));
  }
}
function Select_ng_template_9_ng_template_8_li_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵtextInterpolate1(" ", ctx_r2.emptyFilterMessageLabel, " ");
  }
}
function Select_ng_template_9_ng_template_8_li_3_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, null, 14);
  }
}
function Select_ng_template_9_ng_template_8_li_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_9_ng_template_8_li_3_Conditional_2_ng_container_0_Template, 2, 0, "ng-container", 31);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.emptyFilterTemplate || ctx_r2._emptyFilterTemplate || ctx_r2.emptyTemplate || ctx_r2._emptyTemplate);
  }
}
function Select_ng_template_9_ng_template_8_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 50);
    ɵɵconditionalCreate(1, Select_ng_template_9_ng_template_8_li_3_Conditional_1_Template, 1, 1)(2, Select_ng_template_9_ng_template_8_li_3_Conditional_2_Template, 1, 1, "ng-container");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r20 = ɵɵnextContext().options;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("emptyMessage"));
    ɵɵproperty("ngStyle", ɵɵpureFunction1(5, _c06, scrollerOptions_r20.itemSize + "px"))("pBind", ctx_r2.ptm("emptyMessage"));
    ɵɵadvance();
    ɵɵconditional(!ctx_r2.emptyFilterTemplate && !ctx_r2._emptyFilterTemplate && !ctx_r2.emptyTemplate ? 1 : 2);
  }
}
function Select_ng_template_9_ng_template_8_li_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵtextInterpolate1(" ", ctx_r2.emptyMessageLabel || ctx_r2.emptyFilterMessageLabel, " ");
  }
}
function Select_ng_template_9_ng_template_8_li_4_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, null, 15);
  }
}
function Select_ng_template_9_ng_template_8_li_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Select_ng_template_9_ng_template_8_li_4_Conditional_2_ng_container_0_Template, 2, 0, "ng-container", 31);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.emptyTemplate || ctx_r2._emptyTemplate);
  }
}
function Select_ng_template_9_ng_template_8_li_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 50);
    ɵɵconditionalCreate(1, Select_ng_template_9_ng_template_8_li_4_Conditional_1_Template, 1, 1)(2, Select_ng_template_9_ng_template_8_li_4_Conditional_2_Template, 1, 1, "ng-container");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r20 = ɵɵnextContext().options;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("emptyMessage"));
    ɵɵproperty("ngStyle", ɵɵpureFunction1(5, _c06, scrollerOptions_r20.itemSize + "px"))("pBind", ctx_r2.ptm("emptyMessage"));
    ɵɵadvance();
    ɵɵconditional(!ctx_r2.emptyTemplate && !ctx_r2._emptyTemplate ? 1 : 2);
  }
}
function Select_ng_template_9_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 47, 13);
    ɵɵtemplate(2, Select_ng_template_9_ng_template_8_ng_template_2_Template, 2, 2, "ng-template", 48)(3, Select_ng_template_9_ng_template_8_li_3_Template, 3, 7, "li", 49)(4, Select_ng_template_9_ng_template_8_li_4_Template, 3, 7, "li", 49);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const items_r22 = ctx.$implicit;
    const scrollerOptions_r20 = ctx.options;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵstyleMap(scrollerOptions_r20.contentStyle);
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("list"), scrollerOptions_r20.contentStyleClass));
    ɵɵproperty("pBind", ctx_r2.ptm("list"));
    ɵɵattribute("id", ctx_r2.id + "_list")("aria-label", ctx_r2.listLabel);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", items_r22);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.filterValue && ctx_r2.isEmpty());
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.filterValue && ctx_r2.isEmpty());
  }
}
function Select_ng_template_9_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Select_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 38)(1, "span", 39, 6);
    ɵɵlistener("focus", function Select_ng_template_9_Template_span_focus_1_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onFirstHiddenFocus($event));
    });
    ɵɵelementEnd();
    ɵɵtemplate(3, Select_ng_template_9_ng_container_3_Template, 1, 0, "ng-container", 31)(4, Select_ng_template_9_div_4_Template, 4, 5, "div", 27);
    ɵɵelementStart(5, "div", 36);
    ɵɵtemplate(6, Select_ng_template_9_p_scroller_6_Template, 5, 11, "p-scroller", 40)(7, Select_ng_template_9_ng_container_7_Template, 2, 6, "ng-container", 18)(8, Select_ng_template_9_ng_template_8_Template, 5, 10, "ng-template", null, 7, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵtemplate(10, Select_ng_template_9_ng_container_10_Template, 1, 0, "ng-container", 31);
    ɵɵelementStart(11, "span", 39, 8);
    ɵɵlistener("focus", function Select_ng_template_9_Template_span_focus_11_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onLastHiddenFocus($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("overlay"), ctx_r2.panelStyleClass));
    ɵɵproperty("ngStyle", ctx_r2.panelStyle)("pBind", ctx_r2.ptm("overlay"));
    ɵɵattribute("data-p", ctx_r2.overlayDataP);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r2.ptm("hiddenFirstFocusableEl"));
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.headerTemplate || ctx_r2._headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.filter);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.cx("listContainer"));
    ɵɵstyleProp("max-height", ctx_r2.virtualScroll ? "auto" : ctx_r2.scrollHeight || "auto");
    ɵɵproperty("pBind", ctx_r2.ptm("listContainer"));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.virtualScroll);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.virtualScroll);
    ɵɵadvance(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.footerTemplate || ctx_r2._footerTemplate);
    ɵɵadvance();
    ɵɵproperty("pBind", ctx_r2.ptm("hiddenLastFocusableEl"));
    ɵɵattribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
  }
}
var style7 = (
  /*css*/
  `
    ${style6}

    /* For PrimeNG */
    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.ng-invalid.ng-dirty {
        border-color: dt('select.invalid.border.color');
    }

    .p-dropdown.ng-invalid.ng-dirty .p-dropdown-label.p-placeholder,
    .p-select.ng-invalid.ng-dirty .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }
`
);
var classes7 = {
  root: ({
    instance
  }) => ["p-select p-component p-inputwrapper", {
    "p-disabled": instance.$disabled(),
    "p-variant-filled": instance.$variant() === "filled",
    "p-focus": instance.focused,
    "p-invalid": instance.invalid(),
    "p-inputwrapper-filled": instance.$filled(),
    "p-inputwrapper-focus": instance.focused || instance.overlayVisible,
    "p-select-open": instance.overlayVisible,
    "p-select-fluid": instance.hasFluid,
    "p-select-sm p-inputfield-sm": instance.size() === "small",
    "p-select-lg p-inputfield-lg": instance.size() === "large"
  }],
  label: ({
    instance
  }) => ["p-select-label", {
    "p-placeholder": instance.placeholder() && instance.label() === instance.placeholder(),
    "p-select-label-empty": !instance.editable && !instance.selectedItemTemplate && (instance.label() === void 0 || instance.label() === null || instance.label() === "p-emptylabel" || instance.label().length === 0)
  }],
  clearIcon: "p-select-clear-icon",
  dropdown: "p-select-dropdown",
  loadingIcon: "p-select-loading-icon",
  dropdownIcon: "p-select-dropdown-icon",
  overlay: "p-select-overlay p-component-overlay p-component",
  header: "p-select-header",
  pcFilter: "p-select-filter",
  listContainer: "p-select-list-container",
  list: "p-select-list",
  optionGroup: "p-select-option-group",
  optionGroupLabel: "p-select-option-group-label",
  option: ({
    instance
  }) => ["p-select-option", {
    "p-select-option-selected": instance.selected && !instance.checkmark,
    "p-disabled": instance.disabled,
    "p-focus": instance.focused
  }],
  optionLabel: "p-select-option-label",
  optionCheckIcon: "p-select-option-check-icon",
  optionBlankIcon: "p-select-option-blank-icon",
  emptyMessage: "p-select-empty-message"
};
var SelectStyle = class _SelectStyle extends BaseStyle {
  name = "select";
  style = style7;
  classes = classes7;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵSelectStyle_BaseFactory;
    return function SelectStyle_Factory(__ngFactoryType__) {
      return (ɵSelectStyle_BaseFactory || (ɵSelectStyle_BaseFactory = ɵɵgetInheritedFactory(_SelectStyle)))(__ngFactoryType__ || _SelectStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _SelectStyle,
    factory: _SelectStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectStyle, [{
    type: Injectable
  }], null, null);
})();
var SelectClasses;
(function(SelectClasses2) {
  SelectClasses2["root"] = "p-select";
  SelectClasses2["label"] = "p-select-label";
  SelectClasses2["clearIcon"] = "p-select-clear-icon";
  SelectClasses2["dropdown"] = "p-select-dropdown";
  SelectClasses2["loadingIcon"] = "p-select-loading-icon";
  SelectClasses2["dropdownIcon"] = "p-select-dropdown-icon";
  SelectClasses2["overlay"] = "p-select-overlay";
  SelectClasses2["header"] = "p-select-header";
  SelectClasses2["pcFilter"] = "p-select-filter";
  SelectClasses2["listContainer"] = "p-select-list-container";
  SelectClasses2["list"] = "p-select-list";
  SelectClasses2["optionGroup"] = "p-select-option-group";
  SelectClasses2["optionGroupLabel"] = "p-select-option-group-label";
  SelectClasses2["option"] = "p-select-option";
  SelectClasses2["optionLabel"] = "p-select-option-label";
  SelectClasses2["optionCheckIcon"] = "p-select-option-check-icon";
  SelectClasses2["optionBlankIcon"] = "p-select-option-blank-icon";
  SelectClasses2["emptyMessage"] = "p-select-empty-message";
})(SelectClasses || (SelectClasses = {}));
var SELECT_INSTANCE = new InjectionToken("SELECT_INSTANCE");
var SELECT_ITEM_INSTANCE = new InjectionToken("SELECT_ITEM_INSTANCE");
var SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Select),
  multi: true
};
var SelectItem = class _SelectItem extends BaseComponent {
  hostName = "select";
  $pcSelectItem = inject(SELECT_ITEM_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  $pcSelect = inject(SELECT_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  id;
  option;
  selected;
  focused;
  label;
  disabled;
  visible;
  itemSize;
  ariaPosInset;
  ariaSetSize;
  template;
  checkmark;
  index;
  scrollerOptions;
  onClick = new EventEmitter();
  onMouseEnter = new EventEmitter();
  _componentStyle = inject(SelectStyle);
  onOptionClick(event) {
    this.onClick.emit(event);
  }
  onOptionMouseEnter(event) {
    this.onMouseEnter.emit(event);
  }
  getPTOptions() {
    return this.$pcSelect?.getPTItemOptions?.(this.option, this.scrollerOptions, this.index ?? 0, "option") ?? this.$pcSelect?.ptm("option", {
      context: {
        option: this.option,
        selected: this.selected,
        focused: this.focused,
        disabled: this.disabled
      }
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵSelectItem_BaseFactory;
    return function SelectItem_Factory(__ngFactoryType__) {
      return (ɵSelectItem_BaseFactory || (ɵSelectItem_BaseFactory = ɵɵgetInheritedFactory(_SelectItem)))(__ngFactoryType__ || _SelectItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _SelectItem,
    selectors: [["p-selectItem"]],
    inputs: {
      id: "id",
      option: "option",
      selected: [2, "selected", "selected", booleanAttribute],
      focused: [2, "focused", "focused", booleanAttribute],
      label: "label",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      visible: [2, "visible", "visible", booleanAttribute],
      itemSize: [2, "itemSize", "itemSize", numberAttribute],
      ariaPosInset: "ariaPosInset",
      ariaSetSize: "ariaSetSize",
      template: "template",
      checkmark: [2, "checkmark", "checkmark", booleanAttribute],
      index: "index",
      scrollerOptions: "scrollerOptions"
    },
    outputs: {
      onClick: "onClick",
      onMouseEnter: "onMouseEnter"
    },
    features: [ɵɵProvidersFeature([SelectStyle, {
      provide: PARENT_INSTANCE,
      useExisting: _SelectItem
    }]), ɵɵInheritDefinitionFeature],
    decls: 4,
    vars: 21,
    consts: [["role", "option", "pRipple", "", 3, "click", "mouseenter", "id", "pBind", "ngStyle"], [4, "ngIf"], [3, "pBind", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["data-p-icon", "check", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "blank", 3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "check", 3, "pBind"], ["data-p-icon", "blank", 3, "pBind"], [3, "pBind"]],
    template: function SelectItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "li", 0);
        ɵɵlistener("click", function SelectItem_Template_li_click_0_listener($event) {
          return ctx.onOptionClick($event);
        })("mouseenter", function SelectItem_Template_li_mouseenter_0_listener($event) {
          return ctx.onOptionMouseEnter($event);
        });
        ɵɵtemplate(1, SelectItem_ng_container_1_Template, 3, 2, "ng-container", 1)(2, SelectItem_span_2_Template, 2, 2, "span", 2)(3, SelectItem_ng_container_3_Template, 1, 0, "ng-container", 3);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cx("option"));
        ɵɵproperty("id", ctx.id)("pBind", ctx.getPTOptions())("ngStyle", ɵɵpureFunction1(17, _c06, (ctx.scrollerOptions == null ? null : ctx.scrollerOptions.itemSize) + "px"));
        ɵɵattribute("aria-label", ctx.label)("aria-setsize", ctx.ariaSetSize)("aria-posinset", ctx.ariaPosInset)("aria-selected", ctx.selected)("data-p-focused", ctx.focused)("data-p-highlight", ctx.selected)("data-p-selected", ctx.selected)("data-p-disabled", ctx.disabled);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.checkmark);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.template);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.template)("ngTemplateOutletContext", ɵɵpureFunction1(19, _c13, ctx.option));
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, SharedModule, Ripple, CheckIcon, BlankIcon, BindModule, Bind],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectItem, [{
    type: Component,
    args: [{
      selector: "p-selectItem",
      standalone: true,
      imports: [CommonModule, SharedModule, Ripple, CheckIcon, BlankIcon, BindModule],
      template: `
        <li
            [id]="id"
            [pBind]="getPTOptions()"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
            role="option"
            pRipple
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-selected]="selected"
            [attr.data-p-disabled]="disabled"
            [ngStyle]="{ height: scrollerOptions?.itemSize + 'px' }"
            [class]="cx('option')"
        >
            <ng-container *ngIf="checkmark">
                <svg data-p-icon="check" *ngIf="selected" [class]="cx('optionCheckIcon')" [pBind]="$pcSelect?.ptm('optionCheckIcon')" />
                <svg data-p-icon="blank" *ngIf="!selected" [class]="cx('optionBlankIcon')" [pBind]="$pcSelect?.ptm('optionBlankIcon')" />
            </ng-container>
            <span *ngIf="!template" [pBind]="$pcSelect?.ptm('optionLabel')">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
      providers: [SelectStyle, {
        provide: PARENT_INSTANCE,
        useExisting: SelectItem
      }]
    }]
  }], null, {
    id: [{
      type: Input
    }],
    option: [{
      type: Input
    }],
    selected: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    focused: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    label: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    visible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    itemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    ariaPosInset: [{
      type: Input
    }],
    ariaSetSize: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    checkmark: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    index: [{
      type: Input
    }],
    scrollerOptions: [{
      type: Input
    }],
    onClick: [{
      type: Output
    }],
    onMouseEnter: [{
      type: Output
    }]
  });
})();
var Select = class _Select extends BaseInput {
  zone;
  filterService;
  componentName = "Select";
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  /**
   * Unique identifier of the component
   * @group Props
   */
  id;
  /**
   * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  scrollHeight = "200px";
  /**
   * When specified, displays an input field to filter the items on keyup.
   * @group Props
   */
  filter;
  /**
   * Inline style of the overlay panel element.
   * @group Props
   */
  panelStyle;
  /**
   * Style class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the overlay panel element.
   * @group Props
   */
  panelStyleClass;
  /**
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly;
  /**
   * When present, custom value instead of predefined options can be entered using the editable input field.
   * @group Props
   */
  editable;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Default text to display when no option is selected.
   * @group Props
   */
  set placeholder(val) {
    this._placeholder.set(val);
  }
  get placeholder() {
    return this._placeholder.asReadonly();
  }
  /**
   * Icon to display in loading state.
   * @group Props
   */
  loadingIcon;
  /**
   * Placeholder text to show when filter input is empty.
   * @group Props
   */
  filterPlaceholder;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Identifier of the accessible input element.
   * @group Props
   */
  inputId;
  /**
   * A property to uniquely identify a value in options.
   * @group Props
   */
  dataKey;
  /**
   * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
   * @group Props
   */
  filterBy;
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  filterFields;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Clears the filter value when hiding the select.
   * @group Props
   */
  resetFilterOnHide = false;
  /**
   * Whether the selected option will be shown with a check mark.
   * @group Props
   */
  checkmark = false;
  /**
   * Icon class of the select icon.
   * @group Props
   */
  dropdownIcon;
  /**
   * Whether the select is in loading state.
   * @group Props
   */
  loading = false;
  /**
   * Name of the label field of an option.
   * @group Props
   */
  optionLabel;
  /**
   * Name of the value field of an option.
   * @group Props
   */
  optionValue;
  /**
   * Name of the disabled field of an option.
   * @group Props
   */
  optionDisabled;
  /**
   * Name of the label field of an option group.
   * @group Props
   */
  optionGroupLabel = "label";
  /**
   * Name of the options field of an option group.
   * @group Props
   */
  optionGroupChildren = "items";
  /**
   * Whether to display options as grouped when nested options are provided.
   * @group Props
   */
  group;
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear;
  /**
   * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyFilterMessage = "";
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage = "";
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy = false;
  /**
   * Whether the data should be loaded on demand during scroll.
   * @group Props
   */
  virtualScroll;
  /**
   * Height of an item in the list for VirtualScrolling.
   * @group Props
   */
  virtualScrollItemSize;
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  virtualScrollOptions;
  /**
   * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
   * @group Props
   */
  overlayOptions;
  /**
   * Defines a string that labels the filter input.
   * @group Props
   */
  ariaFilterLabel;
  /**
   * Used to define a aria label attribute the current element.
   * @group Props
   */
  ariaLabel;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Defines how the items are filtered.
   * @group Props
   */
  filterMatchMode = "contains";
  /**
   * Advisory information to display in a tooltip on hover.
   * @group Props
   */
  tooltip = "";
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition = "right";
  /**
   * Type of CSS position.
   * @group Props
   */
  tooltipPositionStyle = "absolute";
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  focusOnHover = true;
  /**
   * Determines if the option will be selected on focus.
   * @group Props
   */
  selectOnFocus = false;
  /**
   * Whether to focus on the first visible or selected element when the overlay panel is shown.
   * @group Props
   */
  autoOptionFocus = false;
  /**
   * Applies focus to the filter element when the overlay is shown.
   * @group Props
   */
  autofocusFilter = true;
  /**
   * When specified, filter displays with this value.
   * @group Props
   */
  get filterValue() {
    return this._filterValue();
  }
  set filterValue(val) {
    setTimeout(() => {
      this._filterValue.set(val);
    });
  }
  /**
   * An array of objects to display as the available options.
   * @group Props
   */
  get options() {
    const options = this._options();
    return options;
  }
  set options(val) {
    if (!y(val, this._options())) {
      this._options.set(val);
    }
  }
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  /**
   * Callback to invoke when value of select changes.
   * @param {SelectChangeEvent} event - custom change event.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when data is filtered.
   * @param {SelectFilterEvent} event - custom filter event.
   * @group Emits
   */
  onFilter = new EventEmitter();
  /**
   * Callback to invoke when select gets focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when select loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke when component is clicked.
   * @param {MouseEvent} event - Mouse event.
   * @group Emits
   */
  onClick = new EventEmitter();
  /**
   * Callback to invoke when select overlay gets visible.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke when select overlay gets hidden.
   * @param {AnimationEvent} event - Animation event.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when select clears the value.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {SelectLazyLoadEvent} event - Lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  _componentStyle = inject(SelectStyle);
  filterViewChild;
  focusInputViewChild;
  editableInputViewChild;
  itemsViewChild;
  scroller;
  overlayViewChild;
  firstHiddenFocusableElementOnOverlay;
  lastHiddenFocusableElementOnOverlay;
  itemsWrapper;
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  /**
   * Custom item template.
   * @group Templates
   */
  itemTemplate;
  /**
   * Custom group template.
   * @group Templates
   */
  groupTemplate;
  /**
   * Custom loader template.
   * @group Templates
   */
  loaderTemplate;
  /**
   * Custom selected item template.
   * @group Templates
   */
  selectedItemTemplate;
  /**
   * Custom header template.
   * @group Templates
   */
  headerTemplate;
  /**
   * Custom filter template.
   * @group Templates
   */
  filterTemplate;
  /**
   * Custom footer template.
   * @group Templates
   */
  footerTemplate;
  /**
   * Custom empty filter template.
   * @group Templates
   */
  emptyFilterTemplate;
  /**
   * Custom empty template.
   * @group Templates
   */
  emptyTemplate;
  /**
   * Custom dropdown icon template.
   * @group Templates
   */
  dropdownIconTemplate;
  /**
   * Custom loading icon template.
   * @group Templates
   */
  loadingIconTemplate;
  /**
   * Custom clear icon template.
   * @group Templates
   */
  clearIconTemplate;
  /**
   * Custom filter icon template.
   * @group Templates
   */
  filterIconTemplate;
  /**
   * Custom on icon template.
   * @group Templates
   */
  onIconTemplate;
  /**
   * Custom off icon template.
   * @group Templates
   */
  offIconTemplate;
  /**
   * Custom cancel icon template.
   * @group Templates
   */
  cancelIconTemplate;
  templates;
  _itemTemplate;
  _selectedItemTemplate;
  _headerTemplate;
  _filterTemplate;
  _footerTemplate;
  _emptyFilterTemplate;
  _emptyTemplate;
  _groupTemplate;
  _loaderTemplate;
  _dropdownIconTemplate;
  _loadingIconTemplate;
  _clearIconTemplate;
  _filterIconTemplate;
  _cancelIconTemplate;
  _onIconTemplate;
  _offIconTemplate;
  filterOptions;
  _options = signal(null, ...ngDevMode ? [{
    debugName: "_options"
  }] : []);
  _placeholder = signal(void 0, ...ngDevMode ? [{
    debugName: "_placeholder"
  }] : []);
  value;
  hover;
  focused;
  overlayVisible;
  optionsChanged;
  panel;
  dimensionsUpdated;
  hoveredItem;
  selectedOptionUpdated;
  _filterValue = signal(null, ...ngDevMode ? [{
    debugName: "_filterValue"
  }] : []);
  searchValue;
  searchIndex;
  searchTimeout;
  previousSearchChar;
  currentSearchChar;
  preventModelTouched;
  focusedOptionIndex = signal(-1, ...ngDevMode ? [{
    debugName: "focusedOptionIndex"
  }] : []);
  labelId;
  listId;
  clicked = signal(false, ...ngDevMode ? [{
    debugName: "clicked"
  }] : []);
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  get emptyFilterMessageLabel() {
    return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
  }
  get isVisibleClearIcon() {
    return this.modelValue() != null && this.hasSelectedOption() && this.showClear && !this.$disabled();
  }
  get listLabel() {
    return this.config.getTranslation(TranslationKeys.ARIA)["listLabel"];
  }
  get focusedOptionId() {
    return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
  }
  visibleOptions = computed(() => {
    const options = this.getAllVisibleAndNonVisibleOptions();
    if (this._filterValue()) {
      const _filterBy = this.filterBy || this.optionLabel;
      const filteredOptions = !_filterBy && !this.filterFields && !this.optionValue ? this.options?.filter((option) => {
        if (option.label) {
          return option.label.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim()) !== -1;
        }
        return option.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim()) !== -1;
      }) : this.filterService.filter(options, this.searchFields(), this._filterValue().trim(), this.filterMatchMode, this.filterLocale);
      if (this.group) {
        const optionGroups = this.options || [];
        const filtered = [];
        optionGroups.forEach((group) => {
          const groupChildren = this.getOptionGroupChildren(group);
          const filteredItems = groupChildren.filter((item) => filteredOptions?.includes(item));
          if (filteredItems.length > 0) filtered.push(__spreadProps(__spreadValues({}, group), {
            [typeof this.optionGroupChildren === "string" ? this.optionGroupChildren : "items"]: [...filteredItems]
          }));
        });
        return this.flatOptions(filtered);
      }
      return filteredOptions;
    }
    return options;
  }, ...ngDevMode ? [{
    debugName: "visibleOptions"
  }] : []);
  label = computed(() => {
    const options = this.getAllVisibleAndNonVisibleOptions();
    const selectedOptionIndex = options.findIndex((option) => {
      const isEqual = this.isOptionValueEqualsModelValue(option);
      return isEqual;
    });
    if (selectedOptionIndex !== -1) {
      const selectedOption = options[selectedOptionIndex];
      return this.getOptionLabel(selectedOption);
    }
    return this.placeholder() || "p-emptylabel";
  }, ...ngDevMode ? [{
    debugName: "label"
  }] : []);
  selectedOption;
  constructor(zone, filterService) {
    super();
    this.zone = zone;
    this.filterService = filterService;
    effect(() => {
      const modelValue = this.modelValue();
      const visibleOptions = this.visibleOptions();
      if (visibleOptions && s(visibleOptions)) {
        const selectedOptionIndex = this.findSelectedOptionIndex();
        if (selectedOptionIndex !== -1 || modelValue === void 0 || typeof modelValue === "string" && modelValue.length === 0 || this.isModelValueNotSet() || this.editable) {
          this.selectedOption = visibleOptions[selectedOptionIndex];
        } else {
          const disabledSelectedIndex = visibleOptions.findIndex((option) => this.isSelected(option));
          if (disabledSelectedIndex !== -1) {
            this.selectedOption = visibleOptions[disabledSelectedIndex];
          }
        }
      }
      if (l(visibleOptions) && (modelValue === void 0 || this.isModelValueNotSet()) && s(this.selectedOption)) {
        this.selectedOption = null;
      }
      if (modelValue !== void 0 && this.editable) {
        this.updateEditableLabel();
      }
      this.cd.markForCheck();
    });
  }
  isModelValueNotSet() {
    return this.modelValue() === null && !this.isOptionValueEqualsModelValue(this.selectedOption);
  }
  getAllVisibleAndNonVisibleOptions() {
    return this.group ? this.flatOptions(this.options) : this.options || [];
  }
  onInit() {
    this.id = this.id || s2("pn_id_");
    this.autoUpdateModel();
    if (this.filterBy) {
      this.filterOptions = {
        filter: (value) => this.onFilterInputChange(value),
        reset: () => this.resetFilter()
      };
    }
  }
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this._itemTemplate = item.template;
          break;
        case "selectedItem":
          this._selectedItemTemplate = item.template;
          break;
        case "header":
          this._headerTemplate = item.template;
          break;
        case "filter":
          this._filterTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "emptyfilter":
          this._emptyFilterTemplate = item.template;
          break;
        case "empty":
          this._emptyTemplate = item.template;
          break;
        case "group":
          this._groupTemplate = item.template;
          break;
        case "loader":
          this._loaderTemplate = item.template;
          break;
        case "dropdownicon":
          this._dropdownIconTemplate = item.template;
          break;
        case "loadingicon":
          this._loadingIconTemplate = item.template;
          break;
        case "clearicon":
          this._clearIconTemplate = item.template;
          break;
        case "filtericon":
          this._filterIconTemplate = item.template;
          break;
        case "cancelicon":
          this._cancelIconTemplate = item.template;
          break;
        case "onicon":
          this._onIconTemplate = item.template;
          break;
        case "officon":
          this._offIconTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
    if (this.optionsChanged && this.overlayVisible) {
      this.optionsChanged = false;
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          if (this.overlayViewChild) {
            this.overlayViewChild.alignOverlay();
          }
        }, 1);
      });
    }
    if (this.selectedOptionUpdated && this.itemsWrapper) {
      let selectedItem = z(this.overlayViewChild?.overlayViewChild?.nativeElement, 'li[data-p-selected="true"]');
      if (selectedItem) {
        Kt(this.itemsWrapper, selectedItem);
      }
      this.selectedOptionUpdated = false;
    }
  }
  flatOptions(options) {
    return (options || []).reduce((result, option, index) => {
      result.push({
        optionGroup: option,
        group: true,
        index
      });
      const optionGroupChildren = this.getOptionGroupChildren(option);
      optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
      return result;
    }, []);
  }
  autoUpdateModel() {
    if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
      this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
      this.onOptionSelect(null, this.visibleOptions()[this.focusedOptionIndex()], false);
    }
  }
  onOptionSelect(event, option, isHide = true, preventChange = false) {
    if (this.isOptionDisabled(option)) {
      return;
    }
    if (!this.isSelected(option)) {
      const value = this.getOptionValue(option);
      this.updateModel(value, event);
      this.focusedOptionIndex.set(this.findSelectedOptionIndex());
      preventChange === false && this.onChange.emit({
        originalEvent: event,
        value
      });
    }
    if (isHide) {
      this.hide(true);
    }
  }
  onOptionMouseEnter(event, index) {
    if (this.focusOnHover) {
      this.changeFocusedOptionIndex(event, index);
    }
  }
  updateModel(value, event) {
    this.value = value;
    this.onModelChange(value);
    this.writeModelValue(value);
    this.selectedOptionUpdated = true;
  }
  allowModelChange() {
    return !!this.modelValue() && !this.placeholder() && (this.modelValue() === void 0 || this.modelValue() === null) && !this.editable && this.options && this.options.length;
  }
  isSelected(option) {
    return this.isOptionValueEqualsModelValue(option);
  }
  isOptionValueEqualsModelValue(option) {
    return option !== void 0 && option !== null && !this.isOptionGroup(option) && k(this.modelValue(), this.getOptionValue(option), this.equalityKey());
  }
  onAfterViewInit() {
    if (this.editable) {
      this.updateEditableLabel();
    }
    this.updatePlaceHolderForFloatingLabel();
  }
  updatePlaceHolderForFloatingLabel() {
    const parentElement = this.el.nativeElement.parentElement;
    const isInFloatingLabel = parentElement?.classList.contains("p-float-label");
    if (parentElement && isInFloatingLabel && !this.selectedOption) {
      const label = parentElement.querySelector("label");
      if (label) {
        this._placeholder.set(label.textContent);
      }
    }
  }
  updateEditableLabel() {
    if (this.editableInputViewChild) {
      this.editableInputViewChild.nativeElement.value = this.getOptionLabel(this.selectedOption) || this.modelValue() || "";
    }
  }
  clearEditableLabel() {
    if (this.editableInputViewChild) {
      this.editableInputViewChild.nativeElement.value = "";
    }
  }
  getOptionIndex(index, scrollerOptions) {
    return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)["index"];
  }
  getOptionLabel(option) {
    return this.optionLabel !== void 0 && this.optionLabel !== null ? p(option, this.optionLabel) : option && option.label !== void 0 ? option.label : option;
  }
  getOptionValue(option) {
    return this.optionValue && this.optionValue !== null ? p(option, this.optionValue) : !this.optionLabel && option && option.value !== void 0 ? option.value : option;
  }
  getPTItemOptions(option, itemOptions, index, key) {
    return this.ptm(key, {
      context: {
        option,
        index,
        selected: this.isSelected(option),
        focused: this.focusedOptionIndex() === this.getOptionIndex(index, itemOptions),
        disabled: this.isOptionDisabled(option)
      }
    });
  }
  isSelectedOptionEmpty() {
    return l(this.selectedOption);
  }
  isOptionDisabled(option) {
    return this.optionDisabled ? p(option, this.optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false;
  }
  getOptionGroupLabel(optionGroup) {
    return this.optionGroupLabel !== void 0 && this.optionGroupLabel !== null ? p(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label !== void 0 ? optionGroup.label : optionGroup;
  }
  getOptionGroupChildren(optionGroup) {
    return this.optionGroupChildren !== void 0 && this.optionGroupChildren !== null ? p(optionGroup, this.optionGroupChildren) : optionGroup.items;
  }
  getAriaPosInset(index) {
    return (this.optionGroupLabel ? index - this.visibleOptions().slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
  }
  get ariaSetSize() {
    return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
  }
  /**
   * Callback to invoke on filter reset.
   * @group Method
   */
  resetFilter() {
    this._filterValue.set(null);
    if (this.filterViewChild && this.filterViewChild.nativeElement) {
      this.filterViewChild.nativeElement.value = "";
    }
  }
  onContainerClick(event) {
    if (this.$disabled() || this.readonly || this.loading) {
      return;
    }
    if (event.target.tagName === "INPUT" || event.target.getAttribute("data-pc-section") === "clearicon" || event.target.closest('[data-pc-section="clearicon"]')) {
      return;
    } else if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
      this.overlayVisible ? this.hide(true) : this.show(true);
    }
    this.focusInputViewChild?.nativeElement.focus({
      preventScroll: true
    });
    this.onClick.emit(event);
    this.clicked.set(true);
    this.cd.detectChanges();
  }
  isEmpty() {
    return !this._options() || this.visibleOptions() && this.visibleOptions().length === 0;
  }
  onEditableInput(event) {
    const value = event.target.value;
    this.searchValue = "";
    const matched = this.searchOptions(event, value);
    !matched && this.focusedOptionIndex.set(-1);
    this.onModelChange(value);
    this.updateModel(value || null, event);
    setTimeout(() => {
      this.onChange.emit({
        originalEvent: event,
        value
      });
    }, 1);
    !this.overlayVisible && s(value) && this.show();
  }
  /**
   * Displays the panel.
   * @group Method
   */
  show(isFocus) {
    this.overlayVisible = true;
    this.focusedOptionIndex.set(this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.editable ? -1 : this.findSelectedOptionIndex());
    if (isFocus) {
      bt(this.focusInputViewChild?.nativeElement);
    }
    this.cd.markForCheck();
  }
  onOverlayBeforeEnter(event) {
    this.itemsWrapper = z(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '[data-pc-name="virtualscroller"]' : '[data-pc-section="listcontainer"]');
    this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
    if (this.options && this.options.length) {
      if (this.virtualScroll) {
        const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
        if (selectedIndex !== -1) {
          setTimeout(() => {
            this.scroller?.scrollToIndex(selectedIndex);
          }, 10);
        }
      } else {
        let selectedListItem = z(this.itemsWrapper, '[data-p-selected="true"]');
        if (selectedListItem) {
          selectedListItem.scrollIntoView({
            block: "nearest",
            inline: "nearest"
          });
        }
      }
    }
    if (this.filterViewChild && this.filterViewChild.nativeElement) {
      this.preventModelTouched = true;
      if (this.autofocusFilter && !this.editable) {
        this.filterViewChild.nativeElement.focus();
      }
    }
    this.onShow.emit(event);
  }
  onOverlayAfterLeave(event) {
    this.itemsWrapper = null;
    this.onModelTouched();
    this.onHide.emit(event);
  }
  /**
   * Hides the panel.
   * @group Method
   */
  hide(isFocus) {
    this.overlayVisible = false;
    this.focusedOptionIndex.set(-1);
    this.clicked.set(false);
    this.searchValue = "";
    if (this.overlayOptions?.mode === "modal") {
      unblockBodyScroll();
    }
    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }
    if (isFocus) {
      if (this.focusInputViewChild) {
        bt(this.focusInputViewChild?.nativeElement);
      }
      if (this.editable && this.editableInputViewChild) {
        bt(this.editableInputViewChild?.nativeElement);
      }
    }
    this.cd.markForCheck();
  }
  onInputFocus(event) {
    if (this.$disabled()) {
      return;
    }
    this.focused = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
    this.focusedOptionIndex.set(focusedOptionIndex);
    this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit(event);
    if (!this.preventModelTouched && !this.overlayVisible) {
      this.onModelTouched();
    }
    this.preventModelTouched = false;
  }
  onKeyDown(event, search = false) {
    if (this.$disabled() || this.readonly || this.loading) {
      return;
    }
    switch (event.code) {
      //down
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      //up
      case "ArrowUp":
        this.onArrowUpKey(event, this.editable);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.onArrowLeftKey(event, this.editable);
        break;
      case "Delete":
        this.onDeleteKey(event);
        break;
      case "Home":
        this.onHomeKey(event, this.editable);
        break;
      case "End":
        this.onEndKey(event, this.editable);
        break;
      case "PageDown":
        this.onPageDownKey(event);
        break;
      case "PageUp":
        this.onPageUpKey(event);
        break;
      //space
      case "Space":
        this.onSpaceKey(event, search);
        break;
      //enter
      case "Enter":
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      //escape and tab
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event);
        break;
      case "Backspace":
        this.onBackspaceKey(event, this.editable);
        break;
      case "ShiftLeft":
      case "ShiftRight":
        break;
      default:
        if (!event.metaKey && J(event.key)) {
          !this.overlayVisible && this.show();
          !this.editable && this.searchOptions(event, event.key);
        }
        break;
    }
    this.clicked.set(false);
  }
  onFilterKeyDown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event, true);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.onArrowLeftKey(event, true);
        break;
      case "Home":
        this.onHomeKey(event, true);
        break;
      case "End":
        this.onEndKey(event, true);
        break;
      case "Enter":
      case "NumpadEnter":
        this.onEnterKey(event, true);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event, true);
        break;
      default:
        break;
    }
  }
  onFilterBlur(event) {
    this.focusedOptionIndex.set(-1);
  }
  onArrowDownKey(event) {
    if (!this.overlayVisible) {
      this.show();
      this.editable && this.changeFocusedOptionIndex(event, this.findSelectedOptionIndex());
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.clicked() ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
    }
    event.preventDefault();
    event.stopPropagation();
  }
  changeFocusedOptionIndex(event, index) {
    if (this.focusedOptionIndex() !== index) {
      this.focusedOptionIndex.set(index);
      this.scrollInView();
      if (this.selectOnFocus) {
        const option = this.visibleOptions()[index];
        this.onOptionSelect(event, option, false);
      }
    }
  }
  get virtualScrollerDisabled() {
    return !this.virtualScroll;
  }
  scrollInView(index = -1) {
    const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
    if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
      const element = z(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
        }, 0);
      }
    }
  }
  hasSelectedOption() {
    return this.modelValue() !== void 0;
  }
  isValidSelectedOption(option) {
    return this.isValidOption(option) && this.isSelected(option);
  }
  equalityKey() {
    return this.optionValue ? void 0 : this.dataKey;
  }
  findFirstFocusedOptionIndex() {
    const selectedIndex = this.findSelectedOptionIndex();
    return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
  }
  findFirstOptionIndex() {
    return this.visibleOptions().findIndex((option) => this.isValidOption(option));
  }
  findSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  findNextOptionIndex(index) {
    const matchedOptionIndex = index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  }
  findPrevOptionIndex(index) {
    const matchedOptionIndex = index > 0 ? M(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findLastOptionIndex() {
    return M(this.visibleOptions(), (option) => this.isValidOption(option));
  }
  findLastFocusedOptionIndex() {
    const selectedIndex = this.findSelectedOptionIndex();
    return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
  }
  isValidOption(option) {
    return option !== void 0 && option !== null && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
  }
  isOptionGroup(option) {
    return this.optionGroupLabel !== void 0 && this.optionGroupLabel !== null && option.optionGroup !== void 0 && option.optionGroup !== null && option.group;
  }
  onArrowUpKey(event, pressedInInputText = false) {
    if (event.altKey && !pressedInInputText) {
      if (this.focusedOptionIndex() !== -1) {
        const option = this.visibleOptions()[this.focusedOptionIndex()];
        this.onOptionSelect(event, option);
      }
      this.overlayVisible && this.hide();
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.clicked() ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
    event.stopPropagation();
  }
  onArrowLeftKey(event, pressedInInputText = false) {
    pressedInInputText && this.focusedOptionIndex.set(-1);
  }
  onDeleteKey(event) {
    if (this.showClear) {
      this.clear(event);
      event.preventDefault();
    }
  }
  onHomeKey(event, pressedInInputText = false) {
    if (pressedInInputText && event.currentTarget && event.currentTarget.setSelectionRange) {
      const target = event.currentTarget;
      if (event.shiftKey) {
        target.setSelectionRange(0, target.value.length);
      } else {
        target.setSelectionRange(0, 0);
        this.focusedOptionIndex.set(-1);
      }
    } else {
      this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onEndKey(event, pressedInInputText = false) {
    if (pressedInInputText && event.currentTarget && event.currentTarget.setSelectionRange) {
      const target = event.currentTarget;
      if (event.shiftKey) {
        target.setSelectionRange(0, target.value.length);
      } else {
        const len = target.value.length;
        target.setSelectionRange(len, len);
        this.focusedOptionIndex.set(-1);
      }
    } else {
      this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onPageDownKey(event) {
    this.scrollInView(this.visibleOptions().length - 1);
    event.preventDefault();
  }
  onPageUpKey(event) {
    this.scrollInView(0);
    event.preventDefault();
  }
  onSpaceKey(event, pressedInInputText = false) {
    !this.editable && !pressedInInputText && this.onEnterKey(event);
  }
  onEnterKey(event, pressedInInput = false) {
    if (!this.overlayVisible) {
      this.focusedOptionIndex.set(-1);
      this.onArrowDownKey(event);
    } else {
      if (this.focusedOptionIndex() !== -1) {
        const option = this.visibleOptions()[this.focusedOptionIndex()];
        this.onOptionSelect(event, option);
      }
      !pressedInInput && this.hide();
    }
    event.preventDefault();
  }
  onEscapeKey(event) {
    if (this.overlayVisible) {
      this.hide(true);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  onTabKey(event, pressedInInputText = false) {
    if (!pressedInInputText) {
      if (this.overlayVisible && this.hasFocusableElements()) {
        bt(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay?.nativeElement : this.firstHiddenFocusableElementOnOverlay?.nativeElement);
        event.preventDefault();
      } else {
        if (this.focusedOptionIndex() !== -1 && this.overlayVisible) {
          const option = this.visibleOptions()[this.focusedOptionIndex()];
          this.onOptionSelect(event, option);
        }
        this.overlayVisible && this.hide(this.filter);
      }
    }
    event.stopPropagation();
  }
  onFirstHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? vt(this.overlayViewChild?.el?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    bt(focusableEl);
  }
  onLastHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? Lt(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    bt(focusableEl);
  }
  hasFocusableElements() {
    return b(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
  }
  onBackspaceKey(event, pressedInInputText = false) {
    if (pressedInInputText) {
      !this.overlayVisible && this.show();
    }
  }
  searchFields() {
    return this.filterBy?.split(",") || this.filterFields || [this.optionLabel];
  }
  searchOptions(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let optionIndex = -1;
    let matched = false;
    optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
    if (optionIndex !== -1) {
      matched = true;
    }
    if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
      optionIndex = this.findFirstFocusedOptionIndex();
    }
    if (optionIndex !== -1) {
      setTimeout(() => {
        this.changeFocusedOptionIndex(event, optionIndex);
      });
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchValue = "";
      this.searchTimeout = null;
    }, 500);
    return matched;
  }
  isOptionMatched(option) {
    return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue?.toLocaleLowerCase(this.filterLocale));
  }
  onFilterInputChange(event) {
    let value = event.target.value;
    this._filterValue.set(value);
    this.focusedOptionIndex.set(-1);
    this.onFilter.emit({
      originalEvent: event,
      filter: this._filterValue()
    });
    !this.virtualScrollerDisabled && this.scroller?.scrollToIndex(0);
    setTimeout(() => {
      this.overlayViewChild?.alignOverlay();
    });
    this.cd.markForCheck();
  }
  applyFocus() {
    if (this.editable) z(this.el.nativeElement, '[data-pc-section="label"]').focus();
    else bt(this.focusInputViewChild?.nativeElement);
  }
  /**
   * Applies focus.
   * @group Method
   */
  focus() {
    this.applyFocus();
  }
  /**
   * Clears the model.
   * @group Method
   */
  clear(event) {
    this.updateModel(null, event);
    this.clearEditableLabel();
    this.onModelTouched();
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
    this.onClear.emit(event);
    this.resetFilter();
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    if (this.filter) {
      this.resetFilter();
    }
    this.value = value;
    this.allowModelChange() && this.onModelChange(value);
    setModelValue(this.value);
    this.updateEditableLabel();
    this.cd.markForCheck();
  }
  get containerDataP() {
    return this.cn({
      invalid: this.invalid(),
      disabled: this.$disabled(),
      focus: this.focused,
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      [this.size()]: this.size()
    });
  }
  get labelDataP() {
    return this.cn({
      placeholder: this.label === this.placeholder,
      clearable: this.showClear,
      disabled: this.$disabled(),
      [this.size()]: this.size(),
      empty: !this.editable && !this.selectedItemTemplate && (!this.label?.() || this.label() === "p-emptylabel" || this.label()?.length === 0)
    });
  }
  get dropdownIconDataP() {
    return this.cn({
      [this.size()]: this.size()
    });
  }
  get overlayDataP() {
    return this.cn({
      ["overlay-" + this.$appendTo()]: "overlay-" + this.$appendTo()
    });
  }
  static ɵfac = function Select_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Select)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(FilterService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Select,
    selectors: [["p-select"]],
    contentQueries: function Select_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c23, 4)(dirIndex, _c33, 4)(dirIndex, _c43, 4)(dirIndex, _c53, 4)(dirIndex, _c62, 4)(dirIndex, _c72, 4)(dirIndex, _c82, 4)(dirIndex, _c92, 4)(dirIndex, _c102, 4)(dirIndex, _c11, 4)(dirIndex, _c122, 4)(dirIndex, _c132, 4)(dirIndex, _c14, 4)(dirIndex, _c15, 4)(dirIndex, _c16, 4)(dirIndex, _c17, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loaderTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selectedItemTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyFilterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptyTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdownIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loadingIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.onIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.offIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cancelIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Select_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c72, 5)(_c18, 5)(_c19, 5)(_c20, 5)(_c21, 5)(_c222, 5)(_c232, 5)(_c24, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.focusInputViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.editableInputViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scroller = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlayViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.firstHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.lastHiddenFocusableElementOnOverlay = _t.first);
      }
    },
    hostVars: 4,
    hostBindings: function Select_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function Select_click_HostBindingHandler($event) {
          return ctx.onContainerClick($event);
        });
      }
      if (rf & 2) {
        ɵɵattribute("id", ctx.id)("data-p", ctx.containerDataP);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      id: "id",
      scrollHeight: "scrollHeight",
      filter: [2, "filter", "filter", booleanAttribute],
      panelStyle: "panelStyle",
      styleClass: "styleClass",
      panelStyleClass: "panelStyleClass",
      readonly: [2, "readonly", "readonly", booleanAttribute],
      editable: [2, "editable", "editable", booleanAttribute],
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      placeholder: "placeholder",
      loadingIcon: "loadingIcon",
      filterPlaceholder: "filterPlaceholder",
      filterLocale: "filterLocale",
      inputId: "inputId",
      dataKey: "dataKey",
      filterBy: "filterBy",
      filterFields: "filterFields",
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      resetFilterOnHide: [2, "resetFilterOnHide", "resetFilterOnHide", booleanAttribute],
      checkmark: [2, "checkmark", "checkmark", booleanAttribute],
      dropdownIcon: "dropdownIcon",
      loading: [2, "loading", "loading", booleanAttribute],
      optionLabel: "optionLabel",
      optionValue: "optionValue",
      optionDisabled: "optionDisabled",
      optionGroupLabel: "optionGroupLabel",
      optionGroupChildren: "optionGroupChildren",
      group: [2, "group", "group", booleanAttribute],
      showClear: [2, "showClear", "showClear", booleanAttribute],
      emptyFilterMessage: "emptyFilterMessage",
      emptyMessage: "emptyMessage",
      lazy: [2, "lazy", "lazy", booleanAttribute],
      virtualScroll: [2, "virtualScroll", "virtualScroll", booleanAttribute],
      virtualScrollItemSize: [2, "virtualScrollItemSize", "virtualScrollItemSize", numberAttribute],
      virtualScrollOptions: "virtualScrollOptions",
      overlayOptions: "overlayOptions",
      ariaFilterLabel: "ariaFilterLabel",
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      filterMatchMode: "filterMatchMode",
      tooltip: "tooltip",
      tooltipPosition: "tooltipPosition",
      tooltipPositionStyle: "tooltipPositionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      focusOnHover: [2, "focusOnHover", "focusOnHover", booleanAttribute],
      selectOnFocus: [2, "selectOnFocus", "selectOnFocus", booleanAttribute],
      autoOptionFocus: [2, "autoOptionFocus", "autoOptionFocus", booleanAttribute],
      autofocusFilter: [2, "autofocusFilter", "autofocusFilter", booleanAttribute],
      filterValue: "filterValue",
      options: "options",
      appendTo: [1, "appendTo"],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      onChange: "onChange",
      onFilter: "onFilter",
      onFocus: "onFocus",
      onBlur: "onBlur",
      onClick: "onClick",
      onShow: "onShow",
      onHide: "onHide",
      onClear: "onClear",
      onLazyLoad: "onLazyLoad"
    },
    features: [ɵɵProvidersFeature([SELECT_VALUE_ACCESSOR, SelectStyle, {
      provide: SELECT_INSTANCE,
      useExisting: _Select
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Select
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 11,
    vars: 18,
    consts: [["elseBlock", ""], ["overlay", ""], ["content", ""], ["focusInput", ""], ["defaultPlaceholder", ""], ["editableInput", ""], ["firstHiddenFocusableEl", ""], ["buildInItems", ""], ["lastHiddenFocusableEl", ""], ["builtInFilterElement", ""], ["filter", ""], ["scroller", ""], ["loader", ""], ["items", ""], ["emptyFilter", ""], ["empty", ""], ["role", "combobox", 3, "class", "pBind", "pTooltip", "pTooltipUnstyled", "tooltipPosition", "positionStyle", "tooltipStyleClass", "pAutoFocus", "focus", "blur", "keydown", 4, "ngIf"], ["type", "text", 3, "class", "pBind", "pAutoFocus", "input", "keydown", "focus", "blur", 4, "ngIf"], [4, "ngIf"], ["role", "button", "aria-label", "dropdown trigger", "aria-haspopup", "listbox", 3, "pBind"], [4, "ngIf", "ngIfElse"], [3, "visibleChange", "onBeforeEnter", "onAfterLeave", "onHide", "hostAttrSelector", "visible", "options", "target", "appendTo", "unstyled", "pt", "motionOptions"], ["role", "combobox", 3, "focus", "blur", "keydown", "pBind", "pTooltip", "pTooltipUnstyled", "tooltipPosition", "positionStyle", "tooltipStyleClass", "pAutoFocus"], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "text", 3, "input", "keydown", "focus", "blur", "pBind", "pAutoFocus"], ["data-p-icon", "times", 3, "class", "pBind", "click", 4, "ngIf"], [3, "class", "pBind", "click", 4, "ngIf"], ["data-p-icon", "times", 3, "click", "pBind"], [3, "click", "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngTemplateOutlet"], ["aria-hidden", "true", 3, "class", "pBind", 4, "ngIf"], ["aria-hidden", "true", 3, "pBind"], [3, "class", "pBind", 4, "ngIf"], ["data-p-icon", "chevron-down", 3, "class", "pBind", 4, "ngIf"], [3, "pBind"], ["data-p-icon", "chevron-down", 3, "pBind"], [3, "ngStyle", "pBind"], ["role", "presentation", 1, "p-hidden-accessible", "p-hidden-focusable", 3, "focus", "pBind"], ["hostName", "select", 3, "items", "style", "itemSize", "autoSize", "lazy", "options", "pt", "onLazyLoad", 4, "ngIf"], [3, "pt", "unstyled"], ["pInputText", "", "type", "text", "role", "searchbox", "autocomplete", "off", 3, "input", "keydown", "blur", "pSize", "value", "variant", "pt", "unstyled"], ["data-p-icon", "search", 3, "pBind", 4, "ngIf"], [3, "pBind", 4, "ngIf"], ["data-p-icon", "search", 3, "pBind"], ["hostName", "select", 3, "onLazyLoad", "items", "itemSize", "autoSize", "lazy", "options", "pt"], ["role", "listbox", 3, "pBind"], ["ngFor", "", 3, "ngForOf"], ["role", "option", 3, "class", "ngStyle", "pBind", 4, "ngIf"], ["role", "option", 3, "ngStyle", "pBind"], [3, "onClick", "onMouseEnter", "id", "option", "checkmark", "selected", "label", "disabled", "template", "focused", "ariaPosInset", "ariaSetSize", "index", "unstyled", "scrollerOptions"]],
    template: function Select_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵtemplate(0, Select_span_0_Template, 6, 25, "span", 16)(1, Select_input_1_Template, 2, 20, "input", 17)(2, Select_ng_container_2_Template, 3, 2, "ng-container", 18);
        ɵɵelementStart(3, "div", 19);
        ɵɵtemplate(4, Select_ng_container_4_Template, 3, 2, "ng-container", 20)(5, Select_ng_template_5_Template, 2, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementStart(7, "p-overlay", 21, 1);
        ɵɵtwoWayListener("visibleChange", function Select_Template_p_overlay_visibleChange_7_listener($event) {
          ɵɵrestoreView(_r1);
          ɵɵtwoWayBindingSet(ctx.overlayVisible, $event) || (ctx.overlayVisible = $event);
          return ɵɵresetView($event);
        });
        ɵɵlistener("onBeforeEnter", function Select_Template_p_overlay_onBeforeEnter_7_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onOverlayBeforeEnter($event));
        })("onAfterLeave", function Select_Template_p_overlay_onAfterLeave_7_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onOverlayAfterLeave($event));
        })("onHide", function Select_Template_p_overlay_onHide_7_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.hide());
        });
        ɵɵtemplate(9, Select_ng_template_9_Template, 13, 23, "ng-template", null, 2, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        const elseBlock_r23 = ɵɵreference(6);
        ɵɵproperty("ngIf", !ctx.editable);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.editable);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isVisibleClearIcon);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("dropdown"));
        ɵɵproperty("pBind", ctx.ptm("dropdown"));
        ɵɵattribute("aria-expanded", ctx.overlayVisible ?? false)("data-pc-section", "trigger");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.loading)("ngIfElse", elseBlock_r23);
        ɵɵadvance(3);
        ɵɵproperty("hostAttrSelector", ctx.$attrSelector);
        ɵɵtwoWayProperty("visible", ctx.overlayVisible);
        ɵɵproperty("options", ctx.overlayOptions)("target", "@parent")("appendTo", ctx.$appendTo())("unstyled", ctx.unstyled())("pt", ctx.ptm("pcOverlay"))("motionOptions", ctx.motionOptions());
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, SelectItem, Overlay, Tooltip, AutoFocus, TimesIcon, ChevronDownIcon, SearchIcon, InputText, IconField, InputIcon, Scroller, SharedModule, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Select, [{
    type: Component,
    args: [{
      selector: "p-select",
      standalone: true,
      imports: [CommonModule, SelectItem, Overlay, Tooltip, AutoFocus, TimesIcon, ChevronDownIcon, SearchIcon, InputText, IconField, InputIcon, Scroller, SharedModule, BindModule],
      template: `
        <span
            #focusInput
            [class]="cx('label')"
            *ngIf="!editable"
            [pBind]="ptm('label')"
            [pTooltip]="tooltip"
            [pTooltipUnstyled]="unstyled()"
            [tooltipPosition]="tooltipPosition"
            [positionStyle]="tooltipPositionStyle"
            [tooltipStyleClass]="tooltipStyleClass"
            [attr.aria-disabled]="$disabled()"
            [attr.id]="inputId"
            role="combobox"
            [attr.aria-label]="ariaLabel || (label() === 'p-emptylabel' ? undefined : label())"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-haspopup]="'listbox'"
            [attr.aria-expanded]="overlayVisible ?? false"
            [attr.aria-controls]="overlayVisible ? id + '_list' : null"
            [attr.tabindex]="!$disabled() ? tabindex : -1"
            [pAutoFocus]="autofocus"
            [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onKeyDown($event)"
            [attr.aria-required]="required()"
            [attr.required]="required() ? '' : undefined"
            [attr.disabled]="$disabled() ? '' : undefined"
            [attr.data-p]="labelDataP"
        >
            <ng-container *ngIf="!selectedItemTemplate && !_selectedItemTemplate; else defaultPlaceholder">{{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}</ng-container>
            <ng-container *ngIf="(selectedItemTemplate || _selectedItemTemplate) && !isSelectedOptionEmpty()" [ngTemplateOutlet]="selectedItemTemplate || _selectedItemTemplate" [ngTemplateOutletContext]="{ $implicit: selectedOption }"></ng-container>
            <ng-template #defaultPlaceholder>
                <span *ngIf="isSelectedOptionEmpty()">{{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}</span>
            </ng-template>
        </span>
        <input
            *ngIf="editable"
            #editableInput
            type="text"
            [attr.id]="inputId"
            [class]="cx('label')"
            [pBind]="ptm('label')"
            [attr.aria-haspopup]="'listbox'"
            [attr.placeholder]="modelValue() === undefined || modelValue() === null ? placeholder() : undefined"
            [attr.aria-label]="ariaLabel || (label() === 'p-emptylabel' ? undefined : label())"
            (input)="onEditableInput($event)"
            (keydown)="onKeyDown($event)"
            [pAutoFocus]="autofocus"
            [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            [attr.name]="name()"
            [attr.minlength]="minlength()"
            [attr.min]="min()"
            [attr.max]="max()"
            [attr.pattern]="pattern()"
            [attr.size]="inputSize()"
            [attr.maxlength]="maxlength()"
            [attr.required]="required() ? '' : undefined"
            [attr.readonly]="readonly ? '' : undefined"
            [attr.disabled]="$disabled() ? '' : undefined"
            [attr.data-p]="labelDataP"
        />
        <ng-container *ngIf="isVisibleClearIcon">
            <svg data-p-icon="times" [class]="cx('clearIcon')" [pBind]="ptm('clearIcon')" (click)="clear($event)" *ngIf="!clearIconTemplate && !_clearIconTemplate" [attr.data-pc-section]="'clearicon'" />
            <span [class]="cx('clearIcon')" [pBind]="ptm('clearIcon')" (click)="clear($event)" *ngIf="clearIconTemplate || _clearIconTemplate" [attr.data-pc-section]="'clearicon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate; context: { class: cx('clearIcon') }"></ng-template>
            </span>
        </ng-container>

        <div [class]="cx('dropdown')" [pBind]="ptm('dropdown')" role="button" aria-label="dropdown trigger" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible ?? false" [attr.data-pc-section]="'trigger'">
            <ng-container *ngIf="loading; else elseBlock">
                <ng-container *ngIf="loadingIconTemplate || _loadingIconTemplate">
                    <ng-container *ngTemplateOutlet="loadingIconTemplate || _loadingIconTemplate"></ng-container>
                </ng-container>
                <ng-container *ngIf="!loadingIconTemplate && !_loadingIconTemplate">
                    <span *ngIf="loadingIcon" [class]="cn(cx('loadingIcon'), 'pi-spin' + loadingIcon)" [pBind]="ptm('loadingIcon')" aria-hidden="true"></span>
                    <span *ngIf="!loadingIcon" [class]="cn(cx('loadingIcon'), 'pi pi-spinner pi-spin')" [pBind]="ptm('loadingIcon')" aria-hidden="true"></span>
                </ng-container>
            </ng-container>

            <ng-template #elseBlock>
                <ng-container *ngIf="!dropdownIconTemplate && !_dropdownIconTemplate">
                    <span [class]="cn(cx('dropdownIcon'), dropdownIcon)" [pBind]="ptm('dropdownIcon')" *ngIf="dropdownIcon"></span>
                    <svg data-p-icon="chevron-down" *ngIf="!dropdownIcon" [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate || _dropdownIconTemplate" [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate || _dropdownIconTemplate; context: { class: cx('dropdownIcon') }"></ng-template>
                </span>
            </ng-template>
        </div>

        <p-overlay
            #overlay
            [hostAttrSelector]="$attrSelector"
            [(visible)]="overlayVisible"
            [options]="overlayOptions"
            [target]="'@parent'"
            [appendTo]="$appendTo()"
            [unstyled]="unstyled()"
            [pt]="ptm('pcOverlay')"
            [motionOptions]="motionOptions()"
            (onBeforeEnter)="onOverlayBeforeEnter($event)"
            (onAfterLeave)="onOverlayAfterLeave($event)"
            (onHide)="hide()"
        >
            <ng-template #content>
                <div [class]="cn(cx('overlay'), panelStyleClass)" [ngStyle]="panelStyle" [pBind]="ptm('overlay')" [attr.data-p]="overlayDataP">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('hiddenFirstFocusableEl')"
                    >
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                    <div [class]="cx('header')" *ngIf="filter" (click)="$event.stopPropagation()" [pBind]="ptm('header')">
                        <ng-container *ngIf="filterTemplate || _filterTemplate; else builtInFilterElement">
                            <ng-container *ngTemplateOutlet="filterTemplate || _filterTemplate; context: { options: filterOptions }"></ng-container>
                        </ng-container>
                        <ng-template #builtInFilterElement>
                            <p-iconfield [pt]="ptm('pcFilterContainer')" [unstyled]="unstyled()">
                                <input
                                    #filter
                                    pInputText
                                    [pSize]="size()"
                                    type="text"
                                    role="searchbox"
                                    autocomplete="off"
                                    [value]="_filterValue() || ''"
                                    [class]="cx('pcFilter')"
                                    [variant]="$variant()"
                                    [attr.placeholder]="filterPlaceholder"
                                    [attr.aria-owns]="id + '_list'"
                                    (input)="onFilterInputChange($event)"
                                    [attr.aria-label]="ariaFilterLabel"
                                    [attr.aria-activedescendant]="focusedOptionId"
                                    (keydown)="onFilterKeyDown($event)"
                                    (blur)="onFilterBlur($event)"
                                    [pt]="ptm('pcFilter')"
                                    [unstyled]="unstyled()"
                                />
                                <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                                    <svg data-p-icon="search" *ngIf="!filterIconTemplate && !_filterIconTemplate" [pBind]="ptm('filterIcon')" />
                                    <span *ngIf="filterIconTemplate || _filterIconTemplate" [pBind]="ptm('filterIcon')">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate || _filterIconTemplate"></ng-template>
                                    </span>
                                </p-inputicon>
                            </p-iconfield>
                        </ng-template>
                    </div>
                    <div [class]="cx('listContainer')" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'" [pBind]="ptm('listContainer')">
                        <p-scroller
                            *ngIf="virtualScroll"
                            hostName="select"
                            #scroller
                            [items]="visibleOptions()"
                            [style]="{ height: scrollHeight }"
                            [itemSize]="virtualScrollItemSize"
                            [autoSize]="true"
                            [lazy]="lazy"
                            (onLazyLoad)="onLazyLoad.emit($event)"
                            [options]="virtualScrollOptions"
                            [pt]="ptm('virtualScroller')"
                        >
                            <ng-template #content let-items let-scrollerOptions="options">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                            </ng-template>
                            <ng-container *ngIf="loaderTemplate || _loaderTemplate">
                                <ng-template #loader let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="loaderTemplate || _loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                </ng-template>
                            </ng-container>
                        </p-scroller>
                        <ng-container *ngIf="!virtualScroll">
                            <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                        </ng-container>

                        <ng-template #buildInItems let-items let-scrollerOptions="options">
                            <ul #items [attr.id]="id + '_list'" [attr.aria-label]="listLabel" [class]="cn(cx('list'), scrollerOptions.contentStyleClass)" [style]="scrollerOptions.contentStyle" role="listbox" [pBind]="ptm('list')">
                                <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                    <ng-container *ngIf="isOptionGroup(option)">
                                        <li [class]="cx('optionGroup')" [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option" [pBind]="ptm('optionGroup')">
                                            <span *ngIf="!groupTemplate && !_groupTemplate" [class]="cx('optionGroupLabel')" [pBind]="ptm('optionGroupLabel')">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                            <ng-container *ngTemplateOutlet="groupTemplate || _groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                        </li>
                                    </ng-container>
                                    <ng-container *ngIf="!isOptionGroup(option)">
                                        <p-selectItem
                                            [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                            [option]="option"
                                            [checkmark]="checkmark"
                                            [selected]="isSelected(option)"
                                            [label]="getOptionLabel(option)"
                                            [disabled]="isOptionDisabled(option)"
                                            [template]="itemTemplate || _itemTemplate"
                                            [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                            [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                            [ariaSetSize]="ariaSetSize"
                                            [index]="i"
                                            [unstyled]="unstyled()"
                                            [scrollerOptions]="scrollerOptions"
                                            (onClick)="onOptionSelect($event, option)"
                                            (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                        ></p-selectItem>
                                    </ng-container>
                                </ng-template>
                                <li *ngIf="filterValue && isEmpty()" [class]="cx('emptyMessage')" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option" [pBind]="ptm('emptyMessage')">
                                    @if (!emptyFilterTemplate && !_emptyFilterTemplate && !emptyTemplate) {
                                        {{ emptyFilterMessageLabel }}
                                    } @else {
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || _emptyFilterTemplate || emptyTemplate || _emptyTemplate"></ng-container>
                                    }
                                </li>
                                <li *ngIf="!filterValue && isEmpty()" [class]="cx('emptyMessage')" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option" [pBind]="ptm('emptyMessage')">
                                    @if (!emptyTemplate && !_emptyTemplate) {
                                        {{ emptyMessageLabel || emptyFilterMessageLabel }}
                                    } @else {
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate || _emptyTemplate"></ng-container>
                                    }
                                </li>
                            </ul>
                        </ng-template>
                    </div>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [pBind]="ptm('hiddenLastFocusableEl')"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
      host: {
        "[class]": "cn(cx('root'), styleClass)",
        "[attr.id]": "id",
        "[attr.data-p]": "containerDataP",
        "(click)": "onContainerClick($event)"
      },
      providers: [SELECT_VALUE_ACCESSOR, SelectStyle, {
        provide: SELECT_INSTANCE,
        useExisting: Select
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Select
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: NgZone
  }, {
    type: FilterService
  }], {
    id: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    filter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    panelStyle: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    panelStyleClass: [{
      type: Input
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    editable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    placeholder: [{
      type: Input
    }],
    loadingIcon: [{
      type: Input
    }],
    filterPlaceholder: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    dataKey: [{
      type: Input
    }],
    filterBy: [{
      type: Input
    }],
    filterFields: [{
      type: Input
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    resetFilterOnHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    checkmark: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dropdownIcon: [{
      type: Input
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    optionGroupLabel: [{
      type: Input
    }],
    optionGroupChildren: [{
      type: Input
    }],
    group: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    emptyFilterMessage: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    lazy: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualScroll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualScrollItemSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    overlayOptions: [{
      type: Input
    }],
    ariaFilterLabel: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    filterMatchMode: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    tooltipPosition: [{
      type: Input
    }],
    tooltipPositionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    focusOnHover: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectOnFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoOptionFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autofocusFilter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    filterValue: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    onChange: [{
      type: Output
    }],
    onFilter: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onClick: [{
      type: Output
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    onLazyLoad: [{
      type: Output
    }],
    filterViewChild: [{
      type: ViewChild,
      args: ["filter"]
    }],
    focusInputViewChild: [{
      type: ViewChild,
      args: ["focusInput"]
    }],
    editableInputViewChild: [{
      type: ViewChild,
      args: ["editableInput"]
    }],
    itemsViewChild: [{
      type: ViewChild,
      args: ["items"]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    firstHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["firstHiddenFocusableEl"]
    }],
    lastHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["lastHiddenFocusableEl"]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    groupTemplate: [{
      type: ContentChild,
      args: ["group", {
        descendants: false
      }]
    }],
    loaderTemplate: [{
      type: ContentChild,
      args: ["loader", {
        descendants: false
      }]
    }],
    selectedItemTemplate: [{
      type: ContentChild,
      args: ["selectedItem", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    filterTemplate: [{
      type: ContentChild,
      args: ["filter", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    emptyFilterTemplate: [{
      type: ContentChild,
      args: ["emptyfilter", {
        descendants: false
      }]
    }],
    emptyTemplate: [{
      type: ContentChild,
      args: ["empty", {
        descendants: false
      }]
    }],
    dropdownIconTemplate: [{
      type: ContentChild,
      args: ["dropdownicon", {
        descendants: false
      }]
    }],
    loadingIconTemplate: [{
      type: ContentChild,
      args: ["loadingicon", {
        descendants: false
      }]
    }],
    clearIconTemplate: [{
      type: ContentChild,
      args: ["clearicon", {
        descendants: false
      }]
    }],
    filterIconTemplate: [{
      type: ContentChild,
      args: ["filtericon", {
        descendants: false
      }]
    }],
    onIconTemplate: [{
      type: ContentChild,
      args: ["onicon", {
        descendants: false
      }]
    }],
    offIconTemplate: [{
      type: ContentChild,
      args: ["officon", {
        descendants: false
      }]
    }],
    cancelIconTemplate: [{
      type: ContentChild,
      args: ["cancelicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var SelectModule = class _SelectModule {
  static ɵfac = function SelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _SelectModule,
    imports: [Select, SharedModule],
    exports: [Select, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Select, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectModule, [{
    type: NgModule,
    args: [{
      imports: [Select, SharedModule],
      exports: [Select, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/inputnumber/index.mjs
var style8 = "\n    .p-inputnumber {\n        display: inline-flex;\n        position: relative;\n    }\n\n    .p-inputnumber-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex: 0 0 auto;\n        cursor: pointer;\n        background: dt('inputnumber.button.background');\n        color: dt('inputnumber.button.color');\n        width: dt('inputnumber.button.width');\n        transition:\n            background dt('inputnumber.transition.duration'),\n            color dt('inputnumber.transition.duration'),\n            border-color dt('inputnumber.transition.duration'),\n            outline-color dt('inputnumber.transition.duration');\n    }\n\n    .p-inputnumber-button:disabled {\n        cursor: auto;\n    }\n\n    .p-inputnumber-button:not(:disabled):hover {\n        background: dt('inputnumber.button.hover.background');\n        color: dt('inputnumber.button.hover.color');\n    }\n\n    .p-inputnumber-button:not(:disabled):active {\n        background: dt('inputnumber.button.active.background');\n        color: dt('inputnumber.button.active.color');\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-button {\n        position: relative;\n        flex: 1 1 auto;\n        border: 0 none;\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-button-group {\n        display: flex;\n        flex-direction: column;\n        position: absolute;\n        inset-block-start: 1px;\n        inset-inline-end: 1px;\n        height: calc(100% - 2px);\n        z-index: 1;\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-increment-button {\n        padding: 0;\n        border-start-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-decrement-button {\n        padding: 0;\n        border-end-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-input {\n        padding-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-button {\n        border: 1px solid dt('inputnumber.button.border.color');\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-button:hover {\n        border-color: dt('inputnumber.button.hover.border.color');\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-button:active {\n        border-color: dt('inputnumber.button.active.border.color');\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-increment-button {\n        order: 3;\n        border-start-end-radius: dt('inputnumber.button.border.radius');\n        border-end-end-radius: dt('inputnumber.button.border.radius');\n        border-inline-start: 0 none;\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-decrement-button {\n        order: 1;\n        border-start-start-radius: dt('inputnumber.button.border.radius');\n        border-end-start-radius: dt('inputnumber.button.border.radius');\n        border-inline-end: 0 none;\n    }\n\n    .p-floatlabel:has(.p-inputnumber-horizontal) label {\n        margin-inline-start: dt('inputnumber.button.width');\n    }\n\n    .p-inputnumber-vertical {\n        flex-direction: column;\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-button {\n        border: 1px solid dt('inputnumber.button.border.color');\n        padding: dt('inputnumber.button.vertical.padding');\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-button:hover {\n        border-color: dt('inputnumber.button.hover.border.color');\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-button:active {\n        border-color: dt('inputnumber.button.active.border.color');\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-increment-button {\n        order: 1;\n        border-start-start-radius: dt('inputnumber.button.border.radius');\n        border-start-end-radius: dt('inputnumber.button.border.radius');\n        width: 100%;\n        border-block-end: 0 none;\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n        text-align: center;\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-decrement-button {\n        order: 3;\n        border-end-start-radius: dt('inputnumber.button.border.radius');\n        border-end-end-radius: dt('inputnumber.button.border.radius');\n        width: 100%;\n        border-block-start: 0 none;\n    }\n\n    .p-inputnumber-input {\n        flex: 1 1 auto;\n    }\n\n    .p-inputnumber-fluid {\n        width: 100%;\n    }\n\n    .p-inputnumber-fluid .p-inputnumber-input {\n        width: 1%;\n    }\n\n    .p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {\n        width: 100%;\n    }\n\n    .p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {\n        font-size: dt('form.field.sm.font.size');\n        width: dt('form.field.sm.font.size');\n        height: dt('form.field.sm.font.size');\n    }\n\n    .p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {\n        font-size: dt('form.field.lg.font.size');\n        width: dt('form.field.lg.font.size');\n        height: dt('form.field.lg.font.size');\n    }\n\n    .p-inputnumber-clear-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -0.5rem;\n        cursor: pointer;\n        inset-inline-end: dt('form.field.padding.x');\n        color: dt('form.field.icon.color');\n    }\n\n    .p-inputnumber:has(.p-inputnumber-clear-icon) .p-inputnumber-input {\n        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-clear-icon {\n        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));\n    }\n\n    .p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input {\n        padding-inline-end: calc(dt('inputnumber.button.width') + (dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-clear-icon {\n        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));\n    }\n";

// node_modules/primeng/fesm2022/primeng-inputnumber.mjs
var _c07 = ["clearicon"];
var _c110 = ["incrementbuttonicon"];
var _c29 = ["decrementbuttonicon"];
var _c34 = ["input"];
function InputNumber_ng_container_2__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 7);
    ɵɵlistener("click", function InputNumber_ng_container_2__svg_svg_1_Template_svg_click_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.clear());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r2.ptm("clearIcon"));
  }
}
function InputNumber_ng_container_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function InputNumber_ng_container_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, InputNumber_ng_container_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_ng_container_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 8);
    ɵɵlistener("click", function InputNumber_ng_container_2_span_2_Template_span_click_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.clear());
    });
    ɵɵtemplate(1, InputNumber_ng_container_2_span_2_1_Template, 1, 0, null, 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r2.cx("clearIcon"));
    ɵɵproperty("pBind", ctx_r2.ptm("clearIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.clearIconTemplate || ctx_r2._clearIconTemplate);
  }
}
function InputNumber_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, InputNumber_ng_container_2__svg_svg_1_Template, 1, 3, "svg", 5)(2, InputNumber_ng_container_2_span_2_Template, 2, 4, "span", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.clearIconTemplate && !ctx_r2._clearIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.clearIconTemplate || ctx_r2._clearIconTemplate);
  }
}
function InputNumber_span_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 13);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("pBind", ctx_r2.ptm("incrementButtonIcon"))("ngClass", ctx_r2.incrementButtonIcon);
  }
}
function InputNumber_span_3_ng_container_3__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 15);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("pBind", ctx_r2.ptm("incrementButtonIcon"));
  }
}
function InputNumber_span_3_ng_container_3_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_span_3_ng_container_3_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, InputNumber_span_3_ng_container_3_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_span_3_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, InputNumber_span_3_ng_container_3__svg_svg_1_Template, 1, 1, "svg", 14)(2, InputNumber_span_3_ng_container_3_2_Template, 1, 0, null, 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.incrementButtonIconTemplate && !ctx_r2._incrementButtonIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.incrementButtonIconTemplate || ctx_r2._incrementButtonIconTemplate);
  }
}
function InputNumber_span_3_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 13);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("pBind", ctx_r2.ptm("decrementButtonIcon"))("ngClass", ctx_r2.decrementButtonIcon);
  }
}
function InputNumber_span_3_ng_container_6__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 17);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("pBind", ctx_r2.ptm("decrementButtonIcon"));
  }
}
function InputNumber_span_3_ng_container_6_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_span_3_ng_container_6_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, InputNumber_span_3_ng_container_6_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_span_3_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, InputNumber_span_3_ng_container_6__svg_svg_1_Template, 1, 1, "svg", 16)(2, InputNumber_span_3_ng_container_6_2_Template, 1, 0, null, 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.decrementButtonIconTemplate && !ctx_r2._decrementButtonIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.decrementButtonIconTemplate || ctx_r2._decrementButtonIconTemplate);
  }
}
function InputNumber_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 10)(1, "button", 11);
    ɵɵlistener("mousedown", function InputNumber_span_3_Template_button_mousedown_1_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonMouseDown($event));
    })("mouseup", function InputNumber_span_3_Template_button_mouseup_1_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonMouseUp());
    })("mouseleave", function InputNumber_span_3_Template_button_mouseleave_1_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonMouseLeave());
    })("keydown", function InputNumber_span_3_Template_button_keydown_1_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonKeyDown($event));
    })("keyup", function InputNumber_span_3_Template_button_keyup_1_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonKeyUp());
    });
    ɵɵtemplate(2, InputNumber_span_3_span_2_Template, 1, 2, "span", 12)(3, InputNumber_span_3_ng_container_3_Template, 3, 2, "ng-container", 2);
    ɵɵelementEnd();
    ɵɵelementStart(4, "button", 11);
    ɵɵlistener("mousedown", function InputNumber_span_3_Template_button_mousedown_4_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonMouseDown($event));
    })("mouseup", function InputNumber_span_3_Template_button_mouseup_4_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonMouseUp());
    })("mouseleave", function InputNumber_span_3_Template_button_mouseleave_4_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonMouseLeave());
    })("keydown", function InputNumber_span_3_Template_button_keydown_4_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonKeyDown($event));
    })("keyup", function InputNumber_span_3_Template_button_keyup_4_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonKeyUp());
    });
    ɵɵtemplate(5, InputNumber_span_3_span_5_Template, 1, 2, "span", 12)(6, InputNumber_span_3_ng_container_6_Template, 3, 2, "ng-container", 2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap(ctx_r2.cx("buttonGroup"));
    ɵɵproperty("pBind", ctx_r2.ptm("buttonGroup"));
    ɵɵattribute("data-p", ctx_r2.dataP);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("incrementButton"), ctx_r2.incrementButtonClass));
    ɵɵproperty("pBind", ctx_r2.ptm("incrementButton"));
    ɵɵattribute("disabled", ctx_r2.$disabled() ? "" : void 0)("aria-hidden", true)("data-p", ctx_r2.dataP);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.incrementButtonIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.incrementButtonIcon);
    ɵɵadvance();
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("decrementButton"), ctx_r2.decrementButtonClass));
    ɵɵproperty("pBind", ctx_r2.ptm("decrementButton"));
    ɵɵattribute("disabled", ctx_r2.$disabled() ? "" : void 0)("aria-hidden", true)("data-p", ctx_r2.dataP);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.decrementButtonIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.decrementButtonIcon);
  }
}
function InputNumber_button_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 13);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("pBind", ctx_r2.ptm("incrementButtonIcon"))("ngClass", ctx_r2.incrementButtonIcon);
  }
}
function InputNumber_button_4_ng_container_2__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 15);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("pBind", ctx_r2.ptm("incrementButtonIcon"));
  }
}
function InputNumber_button_4_ng_container_2_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_button_4_ng_container_2_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, InputNumber_button_4_ng_container_2_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_button_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, InputNumber_button_4_ng_container_2__svg_svg_1_Template, 1, 1, "svg", 14)(2, InputNumber_button_4_ng_container_2_2_Template, 1, 0, null, 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.incrementButtonIconTemplate && !ctx_r2._incrementButtonIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.incrementButtonIconTemplate || ctx_r2._incrementButtonIconTemplate);
  }
}
function InputNumber_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 11);
    ɵɵlistener("mousedown", function InputNumber_button_4_Template_button_mousedown_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonMouseDown($event));
    })("mouseup", function InputNumber_button_4_Template_button_mouseup_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonMouseUp());
    })("mouseleave", function InputNumber_button_4_Template_button_mouseleave_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonMouseLeave());
    })("keydown", function InputNumber_button_4_Template_button_keydown_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonKeyDown($event));
    })("keyup", function InputNumber_button_4_Template_button_keyup_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onUpButtonKeyUp());
    });
    ɵɵtemplate(1, InputNumber_button_4_span_1_Template, 1, 2, "span", 12)(2, InputNumber_button_4_ng_container_2_Template, 3, 2, "ng-container", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("incrementButton"), ctx_r2.incrementButtonClass));
    ɵɵproperty("pBind", ctx_r2.ptm("incrementButton"));
    ɵɵattribute("disabled", ctx_r2.$disabled() ? "" : void 0)("aria-hidden", true)("data-p", ctx_r2.dataP);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.incrementButtonIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.incrementButtonIcon);
  }
}
function InputNumber_button_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 13);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("pBind", ctx_r2.ptm("decrementButtonIcon"))("ngClass", ctx_r2.decrementButtonIcon);
  }
}
function InputNumber_button_5_ng_container_2__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 17);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("pBind", ctx_r2.ptm("decrementButtonIcon"));
  }
}
function InputNumber_button_5_ng_container_2_2_ng_template_0_Template(rf, ctx) {
}
function InputNumber_button_5_ng_container_2_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, InputNumber_button_5_ng_container_2_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function InputNumber_button_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, InputNumber_button_5_ng_container_2__svg_svg_1_Template, 1, 1, "svg", 16)(2, InputNumber_button_5_ng_container_2_2_Template, 1, 0, null, 9);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.decrementButtonIconTemplate && !ctx_r2._decrementButtonIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.decrementButtonIconTemplate || ctx_r2._decrementButtonIconTemplate);
  }
}
function InputNumber_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 11);
    ɵɵlistener("mousedown", function InputNumber_button_5_Template_button_mousedown_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonMouseDown($event));
    })("mouseup", function InputNumber_button_5_Template_button_mouseup_0_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonMouseUp());
    })("mouseleave", function InputNumber_button_5_Template_button_mouseleave_0_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonMouseLeave());
    })("keydown", function InputNumber_button_5_Template_button_keydown_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonKeyDown($event));
    })("keyup", function InputNumber_button_5_Template_button_keyup_0_listener() {
      ɵɵrestoreView(_r7);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onDownButtonKeyUp());
    });
    ɵɵtemplate(1, InputNumber_button_5_span_1_Template, 1, 2, "span", 12)(2, InputNumber_button_5_ng_container_2_Template, 3, 2, "ng-container", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap(ctx_r2.cn(ctx_r2.cx("decrementButton"), ctx_r2.decrementButtonClass));
    ɵɵproperty("pBind", ctx_r2.ptm("decrementButton"));
    ɵɵattribute("disabled", ctx_r2.$disabled() ? "" : void 0)("aria-hidden", true)("data-p", ctx_r2.dataP);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.decrementButtonIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.decrementButtonIcon);
  }
}
var style9 = (
  /*css*/
  `
    ${style8}

    /* For PrimeNG */
    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext {
        border-color: dt('inputtext.invalid.border.color');
    }

    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
    }

    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`
);
var classes8 = {
  root: ({
    instance
  }) => ["p-inputnumber p-component p-inputwrapper", {
    "p-inputwrapper-filled": instance.$filled() || instance.allowEmpty === false,
    "p-inputwrapper-focus": instance.focused,
    "p-inputnumber-stacked": instance.showButtons && instance.buttonLayout === "stacked",
    "p-inputnumber-horizontal": instance.showButtons && instance.buttonLayout === "horizontal",
    "p-inputnumber-vertical": instance.showButtons && instance.buttonLayout === "vertical",
    "p-inputnumber-fluid": instance.hasFluid,
    "p-invalid": instance.invalid()
  }],
  pcInputText: "p-inputnumber-input",
  buttonGroup: "p-inputnumber-button-group",
  incrementButton: ({
    instance
  }) => ["p-inputnumber-button p-inputnumber-increment-button", {
    "p-disabled": instance.showButtons && instance.max() != null && instance.maxlength()
  }],
  decrementButton: ({
    instance
  }) => ["p-inputnumber-button p-inputnumber-decrement-button", {
    "p-disabled": instance.showButtons && instance.min() != null && instance.minlength()
  }],
  clearIcon: "p-inputnumber-clear-icon"
};
var InputNumberStyle = class _InputNumberStyle extends BaseStyle {
  name = "inputnumber";
  style = style9;
  classes = classes8;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵInputNumberStyle_BaseFactory;
    return function InputNumberStyle_Factory(__ngFactoryType__) {
      return (ɵInputNumberStyle_BaseFactory || (ɵInputNumberStyle_BaseFactory = ɵɵgetInheritedFactory(_InputNumberStyle)))(__ngFactoryType__ || _InputNumberStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _InputNumberStyle,
    factory: _InputNumberStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumberStyle, [{
    type: Injectable
  }], null, null);
})();
var InputNumberClasses;
(function(InputNumberClasses2) {
  InputNumberClasses2["root"] = "p-inputnumber";
  InputNumberClasses2["pcInputText"] = "p-inputnumber-input";
  InputNumberClasses2["buttonGroup"] = "p-inputnumber-button-group";
  InputNumberClasses2["incrementButton"] = "p-inputnumber-increment-button";
  InputNumberClasses2["decrementButton"] = "p-inputnumber-decrement-button";
  InputNumberClasses2["clearIcon"] = "p-autocomplete-clear-icon";
})(InputNumberClasses || (InputNumberClasses = {}));
var INPUTNUMBER_INSTANCE = new InjectionToken("INPUTNUMBER_INSTANCE");
var INPUTNUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputNumber),
  multi: true
};
var InputNumber = class _InputNumber extends BaseInput {
  injector;
  componentName = "InputNumber";
  $pcInputNumber = inject(INPUTNUMBER_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  _componentStyle = inject(InputNumberStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Displays spinner buttons.
   * @group Props
   */
  showButtons = false;
  /**
   * Whether to format the value.
   * @group Props
   */
  format = true;
  /**
   * Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical".
   * @group Props
   */
  buttonLayout = "stacked";
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Advisory information to display on input.
   * @group Props
   */
  placeholder;
  /**
   * Specifies tab order of the element.
   * @group Props
   */
  tabindex;
  /**
   * Title text of the input text.
   * @group Props
   */
  title;
  /**
   * Specifies one or more IDs in the DOM that labels the input field.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Specifies one or more IDs in the DOM that describes the input field.
   * @group Props
   */
  ariaDescribedBy;
  /**
   * Used to define a string that labels the input element.
   * @group Props
   */
  ariaLabel;
  /**
   * Used to indicate that user input is required on an element before a form can be submitted.
   * @group Props
   */
  ariaRequired;
  /**
   * Used to define a string that autocomplete attribute the current element.
   * @group Props
   */
  autocomplete;
  /**
   * Style class of the increment button.
   * @group Props
   */
  incrementButtonClass;
  /**
   * Style class of the decrement button.
   * @group Props
   */
  decrementButtonClass;
  /**
   * Style class of the increment button.
   * @group Props
   */
  incrementButtonIcon;
  /**
   * Style class of the decrement button.
   * @group Props
   */
  decrementButtonIcon;
  /**
   * When present, it specifies that an input field is read-only.
   * @group Props
   */
  readonly;
  /**
   * Determines whether the input field is empty.
   * @group Props
   */
  allowEmpty = true;
  /**
   * Locale to be used in formatting.
   * @group Props
   */
  locale;
  /**
   * The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". See Locale Negotiation for details.
   * @group Props
   */
  localeMatcher;
  /**
   * Defines the behavior of the component, valid values are "decimal" and "currency".
   * @group Props
   */
  mode = "decimal";
  /**
   * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided.
   * @group Props
   */
  currency;
  /**
   * How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
   * @group Props
   */
  currencyDisplay;
  /**
   * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
   * @group Props
   */
  useGrouping = true;
  /**
   * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
   * @group Props
   */
  minFractionDigits;
  /**
   * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
   * @group Props
   */
  maxFractionDigits;
  /**
   * Text to display before the value.
   * @group Props
   */
  prefix;
  /**
   * Text to display after the value.
   * @group Props
   */
  suffix;
  /**
   * Inline style of the input field.
   * @group Props
   */
  inputStyle;
  /**
   * Style class of the input field.
   * @group Props
   */
  inputStyleClass;
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = false;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Callback to invoke on input.
   * @param {InputNumberInputEvent} event - Custom input event.
   * @group Emits
   */
  onInput = new EventEmitter();
  /**
   * Callback to invoke when the component receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the component loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke on input key press.
   * @param {KeyboardEvent} event - Keyboard event.
   * @group Emits
   */
  onKeyDown = new EventEmitter();
  /**
   * Callback to invoke when clear token is clicked.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Custom clear icon template.
   * @group Templates
   */
  clearIconTemplate;
  /**
   * Custom increment button icon template.
   * @group Templates
   */
  incrementButtonIconTemplate;
  /**
   * Custom decrement button icon template.
   * @group Templates
   */
  decrementButtonIconTemplate;
  templates;
  input;
  _clearIconTemplate;
  _incrementButtonIconTemplate;
  _decrementButtonIconTemplate;
  value;
  focused;
  initialized;
  groupChar = "";
  prefixChar = "";
  suffixChar = "";
  isSpecialChar;
  timer;
  lastValue;
  _numeral;
  numberFormat;
  _decimal;
  _decimalChar = "";
  _group;
  _minusSign;
  _currency;
  _prefix;
  _suffix;
  _index;
  ngControl = null;
  constructor(injector) {
    super();
    this.injector = injector;
  }
  onChanges(simpleChange) {
    const props = ["locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix"];
    if (props.some((p3) => !!simpleChange[p3])) {
      this.updateConstructParser();
    }
  }
  onInit() {
    this.ngControl = this.injector.get(NgControl, null, {
      optional: true
    });
    this.constructParser();
    this.initialized = true;
  }
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "clearicon":
          this._clearIconTemplate = item.template;
          break;
        case "incrementbuttonicon":
          this._incrementButtonIconTemplate = item.template;
          break;
        case "decrementbuttonicon":
          this._decrementButtonIconTemplate = item.template;
          break;
      }
    });
  }
  getOptions() {
    const validateFractionDigits = (value, min, max) => {
      if (value == null || isNaN(value) || !isFinite(value)) {
        return void 0;
      }
      return Math.max(min, Math.min(max, Math.floor(value)));
    };
    const minFractionDigits = validateFractionDigits(this.minFractionDigits, 0, 20);
    const maxFractionDigits = validateFractionDigits(this.maxFractionDigits, 0, 100);
    const validatedMinFractionDigits = minFractionDigits != null && maxFractionDigits != null && minFractionDigits > maxFractionDigits ? maxFractionDigits : minFractionDigits;
    return {
      localeMatcher: this.localeMatcher,
      style: this.mode,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: this.useGrouping,
      minimumFractionDigits: validatedMinFractionDigits,
      maximumFractionDigits: maxFractionDigits
    };
  }
  constructParser() {
    const options = this.getOptions();
    const cleanOptions = Object.fromEntries(Object.entries(options).filter(([_key, value]) => value !== void 0));
    this.numberFormat = new Intl.NumberFormat(this.locale, cleanOptions);
    const numerals = [...new Intl.NumberFormat(this.locale, {
      useGrouping: false
    }).format(9876543210)].reverse();
    const index = new Map(numerals.map((d, i) => [d, i]));
    this._numeral = new RegExp(`[${numerals.join("")}]`, "g");
    this._group = this.getGroupingExpression();
    this._minusSign = this.getMinusSignExpression();
    this._currency = this.getCurrencyExpression();
    this._decimal = this.getDecimalExpression();
    this._decimalChar = this.getDecimalChar();
    this._suffix = this.getSuffixExpression();
    this._prefix = this.getPrefixExpression();
    this._index = (d) => index.get(d);
  }
  updateConstructParser() {
    if (this.initialized) {
      this.constructParser();
    }
  }
  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  getDecimalExpression() {
    const decimalChar = this.getDecimalChar();
    return new RegExp(`[${decimalChar}]`, "g");
  }
  getDecimalChar() {
    const formatter = new Intl.NumberFormat(this.locale, __spreadProps(__spreadValues({}, this.getOptions()), {
      useGrouping: false
    }));
    return formatter.format(1.1).replace(this._currency, "").trim().replace(this._numeral, "");
  }
  getGroupingExpression() {
    const formatter = new Intl.NumberFormat(this.locale, {
      useGrouping: true
    });
    this.groupChar = formatter.format(1e6).trim().replace(this._numeral, "").charAt(0);
    return new RegExp(`[${this.groupChar}]`, "g");
  }
  getMinusSignExpression() {
    const formatter = new Intl.NumberFormat(this.locale, {
      useGrouping: false
    });
    return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, "")}]`, "g");
  }
  getCurrencyExpression() {
    if (this.currency) {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: "currency",
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return new RegExp(`[${formatter.format(1).replace(/\s/g, "").replace(this._numeral, "").replace(this._group, "")}]`, "g");
    }
    return new RegExp(`[]`, "g");
  }
  getPrefixExpression() {
    if (this.prefix) {
      this.prefixChar = this.prefix;
    } else {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: this.mode,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay
      });
      this.prefixChar = formatter.format(1).split("1")[0];
    }
    return new RegExp(`${this.escapeRegExp(this.prefixChar || "")}`, "g");
  }
  getSuffixExpression() {
    if (this.suffix) {
      this.suffixChar = this.suffix;
    } else {
      const formatter = new Intl.NumberFormat(this.locale, {
        style: this.mode,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      this.suffixChar = formatter.format(1).split("1")[1];
    }
    return new RegExp(`${this.escapeRegExp(this.suffixChar || "")}`, "g");
  }
  formatValue(value) {
    if (value != null) {
      if (value === "-") {
        return value;
      }
      if (this.format) {
        let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
        let formattedValue = formatter.format(value);
        if (this.prefix && value != this.prefix) {
          formattedValue = this.prefix + formattedValue;
        }
        if (this.suffix && value != this.suffix) {
          formattedValue = formattedValue + this.suffix;
        }
        return formattedValue;
      }
      return value.toString();
    }
    return "";
  }
  parseValue(text) {
    const suffixRegex = this._suffix ? new RegExp(this._suffix, "") : /(?:)/;
    const prefixRegex = this._prefix ? new RegExp(this._prefix, "") : /(?:)/;
    const currencyRegex = this._currency ? new RegExp(this._currency, "") : /(?:)/;
    let filteredText = text.replace(suffixRegex, "").replace(prefixRegex, "").trim().replace(/\s/g, "").replace(currencyRegex, "").replace(this._group, "").replace(this._minusSign, "-").replace(this._decimal, ".").replace(this._numeral, this._index);
    if (filteredText) {
      if (filteredText === "-")
        return filteredText;
      let parsedValue = +filteredText;
      return isNaN(parsedValue) ? null : parsedValue;
    }
    return null;
  }
  repeat(event, interval, dir) {
    if (this.readonly) {
      return;
    }
    let i = interval || 500;
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.repeat(event, 40, dir);
    }, i);
    this.spin(event, dir);
  }
  spin(event, dir) {
    let step = (this.step() ?? 1) * dir;
    let currentValue = this.parseValue(this.input?.nativeElement.value) || 0;
    let newValue = this.validateValue(currentValue + step);
    const max = this.maxlength();
    if (max && max < this.formatValue(newValue).length) {
      return;
    }
    this.updateInput(newValue, null, "spin", null);
    this.updateModel(event, newValue);
    this.handleOnInput(event, currentValue, newValue);
  }
  clear() {
    this.value = null;
    this.onModelChange(this.value);
    this.onClear.emit();
  }
  onUpButtonMouseDown(event) {
    if (event.button === 2) {
      this.clearTimer();
      return;
    }
    if (!this.$disabled()) {
      this.input?.nativeElement.focus();
      this.repeat(event, null, 1);
      event.preventDefault();
    }
  }
  onUpButtonMouseUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onUpButtonMouseLeave() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onUpButtonKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.repeat(event, null, 1);
    }
  }
  onUpButtonKeyUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonMouseDown(event) {
    if (event.button === 2) {
      this.clearTimer();
      return;
    }
    if (!this.$disabled()) {
      this.input?.nativeElement.focus();
      this.repeat(event, null, -1);
      event.preventDefault();
    }
  }
  onDownButtonMouseUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonMouseLeave() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonKeyUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.repeat(event, null, -1);
    }
  }
  onUserInput(event) {
    if (this.readonly) {
      return;
    }
    if (this.isSpecialChar) {
      event.target.value = this.lastValue;
    }
    this.isSpecialChar = false;
  }
  onInputKeyDown(event) {
    if (this.readonly) {
      return;
    }
    this.lastValue = event.target.value;
    if (event.shiftKey || event.altKey) {
      this.isSpecialChar = true;
      return;
    }
    let selectionStart = event.target.selectionStart;
    let selectionEnd = event.target.selectionEnd;
    let inputValue = event.target.value;
    let newValueStr = null;
    if (event.altKey) {
      event.preventDefault();
    }
    switch (event.key) {
      case "ArrowUp":
        this.spin(event, 1);
        event.preventDefault();
        break;
      case "ArrowDown":
        this.spin(event, -1);
        event.preventDefault();
        break;
      case "ArrowLeft":
        for (let index = selectionStart; index <= inputValue.length; index++) {
          const previousCharIndex = index === 0 ? 0 : index - 1;
          if (this.isNumeralChar(inputValue.charAt(previousCharIndex))) {
            this.input.nativeElement.setSelectionRange(index, index);
            break;
          }
        }
        break;
      case "ArrowRight":
        for (let index = selectionEnd; index >= 0; index--) {
          if (this.isNumeralChar(inputValue.charAt(index))) {
            this.input.nativeElement.setSelectionRange(index, index);
            break;
          }
        }
        break;
      case "Tab":
      case "Enter":
        newValueStr = this.validateValue(this.parseValue(this.input.nativeElement.value));
        this.input.nativeElement.value = this.formatValue(newValueStr);
        this.input.nativeElement.setAttribute("aria-valuenow", newValueStr);
        this.updateModel(event, newValueStr);
        break;
      case "Backspace": {
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          if (selectionStart == 1 && this.prefix || selectionStart == inputValue.length && this.suffix) {
            break;
          }
          const deleteChar = inputValue.charAt(selectionStart - 1);
          const {
            decimalCharIndex,
            decimalCharIndexWithoutPrefix
          } = this.getDecimalCharIndexes(inputValue);
          if (this.isNumeralChar(deleteChar)) {
            const decimalLength = this.getDecimalLength(inputValue);
            if (this._group.test(deleteChar)) {
              this._group.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
            } else if (this._decimal.test(deleteChar)) {
              this._decimal.lastIndex = 0;
              if (decimalLength) {
                this.input?.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
              const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
              newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
            } else if (decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart - 1) + "0" + inputValue.slice(selectionStart);
              newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
            } else {
              newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
            }
          } else if (this.mode === "currency" && this._currency && deleteChar.search(this._currency) != -1) {
            newValueStr = inputValue.slice(1);
          }
          this.updateValue(event, newValueStr, null, "delete-single");
        } else {
          newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, null, "delete-range");
        }
        break;
      }
      case "Delete":
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          if (selectionStart == 0 && this.prefix || selectionStart == inputValue.length - 1 && this.suffix) {
            break;
          }
          const deleteChar = inputValue.charAt(selectionStart);
          const {
            decimalCharIndex,
            decimalCharIndexWithoutPrefix
          } = this.getDecimalCharIndexes(inputValue);
          if (this.isNumeralChar(deleteChar)) {
            const decimalLength = this.getDecimalLength(inputValue);
            if (this._group.test(deleteChar)) {
              this._group.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
            } else if (this._decimal.test(deleteChar)) {
              this._decimal.lastIndex = 0;
              if (decimalLength) {
                this.input?.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
              const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? "" : "0";
              newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
            } else if (decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart) + "0" + inputValue.slice(selectionStart + 1);
              newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
            } else {
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
            }
          }
          this.updateValue(event, newValueStr, null, "delete-back-single");
        } else {
          newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, null, "delete-range");
        }
        break;
      case "Home":
        if (this.min()) {
          this.updateModel(event, this.min());
          event.preventDefault();
        }
        break;
      case "End":
        if (this.max()) {
          this.updateModel(event, this.max());
          event.preventDefault();
        }
        break;
      default:
        break;
    }
    this.onKeyDown.emit(event);
  }
  onInputKeyPress(event) {
    if (this.readonly) {
      return;
    }
    let code = event.which || event.keyCode;
    let char = String.fromCharCode(code);
    let isDecimalSign = this.isDecimalSign(char);
    const isMinusSign = this.isMinusSign(char);
    if (code != 13) {
      event.preventDefault();
    }
    if (!isDecimalSign && event.code === "NumpadDecimal") {
      isDecimalSign = true;
      char = this._decimalChar;
      code = char.charCodeAt(0);
    }
    const {
      value,
      selectionStart,
      selectionEnd
    } = this.input.nativeElement;
    const newValue = this.parseValue(value + char);
    const newValueStr = newValue != null ? newValue.toString() : "";
    const selectedValue = value.substring(selectionStart, selectionEnd);
    const selectedValueParsed = this.parseValue(selectedValue);
    const selectedValueStr = selectedValueParsed != null ? selectedValueParsed.toString() : "";
    if (selectionStart !== selectionEnd && selectedValueStr.length > 0) {
      this.insert(event, char, {
        isDecimalSign,
        isMinusSign
      });
      return;
    }
    const max = this.maxlength();
    if (max && newValueStr.length > max) {
      return;
    }
    if (48 <= code && code <= 57 || isMinusSign || isDecimalSign) {
      this.insert(event, char, {
        isDecimalSign,
        isMinusSign
      });
    }
  }
  onPaste(event) {
    if (!this.$disabled() && !this.readonly) {
      event.preventDefault();
      let data = (event.clipboardData || this.document.defaultView["clipboardData"]).getData("Text");
      if (this.inputId === "integeronly" && /[^\d-]/.test(data)) {
        return;
      }
      if (data) {
        if (this.maxlength()) {
          data = data.toString().substring(0, this.maxlength());
        }
        let filteredData = this.parseValue(data);
        if (filteredData != null) {
          this.insert(event, filteredData.toString());
        }
      }
    }
  }
  allowMinusSign() {
    const min = this.min();
    return min == null || min < 0;
  }
  isMinusSign(char) {
    if (this._minusSign.test(char) || char === "-") {
      this._minusSign.lastIndex = 0;
      return true;
    }
    return false;
  }
  isDecimalSign(char) {
    if (this._decimal.test(char)) {
      this._decimal.lastIndex = 0;
      return true;
    }
    return false;
  }
  isDecimalMode() {
    return this.mode === "decimal";
  }
  getDecimalCharIndexes(val) {
    let decimalCharIndex = val.search(this._decimal);
    this._decimal.lastIndex = 0;
    const filteredVal = val.replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "");
    const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
    this._decimal.lastIndex = 0;
    return {
      decimalCharIndex,
      decimalCharIndexWithoutPrefix
    };
  }
  getCharIndexes(val) {
    const decimalCharIndex = val.search(this._decimal);
    this._decimal.lastIndex = 0;
    const minusCharIndex = val.search(this._minusSign);
    this._minusSign.lastIndex = 0;
    const suffixCharIndex = val.search(this._suffix);
    this._suffix.lastIndex = 0;
    const currencyCharIndex = val.search(this._currency);
    this._currency.lastIndex = 0;
    return {
      decimalCharIndex,
      minusCharIndex,
      suffixCharIndex,
      currencyCharIndex
    };
  }
  insert(event, text, sign = {
    isDecimalSign: false,
    isMinusSign: false
  }) {
    const minusCharIndexOnText = text.search(this._minusSign);
    this._minusSign.lastIndex = 0;
    if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
      return;
    }
    let selectionStart = this.input?.nativeElement.selectionStart;
    let selectionEnd = this.input?.nativeElement.selectionEnd;
    let inputValue = this.input?.nativeElement.value.trim();
    const {
      decimalCharIndex,
      minusCharIndex,
      suffixCharIndex,
      currencyCharIndex
    } = this.getCharIndexes(inputValue);
    let newValueStr;
    if (sign.isMinusSign) {
      if (selectionStart === 0) {
        newValueStr = inputValue;
        if (minusCharIndex === -1 || selectionEnd !== 0) {
          newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
        }
        this.updateValue(event, newValueStr, text, "insert");
      }
    } else if (sign.isDecimalSign) {
      if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
        this.updateValue(event, inputValue, text, "insert");
      } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, "insert");
      } else if (decimalCharIndex === -1 && this.maxFractionDigits) {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, "insert");
      }
    } else {
      const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
      const operation = selectionStart !== selectionEnd ? "range-insert" : "insert";
      if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
        if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
          const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
          newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
          this.updateValue(event, newValueStr, text, operation);
        }
      } else {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, operation);
      }
    }
  }
  insertText(value, text, start, end) {
    let textSplit = text === "." ? text : text.split(".");
    if (textSplit.length === 2) {
      const decimalCharIndex = value.slice(start, end).search(this._decimal);
      this._decimal.lastIndex = 0;
      return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
    } else if (end - start === value.length) {
      return this.formatValue(text);
    } else if (start === 0) {
      return text + value.slice(end);
    } else if (end === value.length) {
      return value.slice(0, start) + text;
    } else {
      return value.slice(0, start) + text + value.slice(end);
    }
  }
  deleteRange(value, start, end) {
    let newValueStr;
    if (end - start === value.length) newValueStr = "";
    else if (start === 0) newValueStr = value.slice(end);
    else if (end === value.length) newValueStr = value.slice(0, start);
    else newValueStr = value.slice(0, start) + value.slice(end);
    return newValueStr;
  }
  initCursor() {
    let selectionStart = this.input?.nativeElement.selectionStart;
    let selectionEnd = this.input?.nativeElement.selectionEnd;
    let inputValue = this.input?.nativeElement.value;
    let valueLength = inputValue.length;
    let index = null;
    let prefixLength = (this.prefixChar || "").length;
    inputValue = inputValue.replace(this._prefix, "");
    if (selectionStart === selectionEnd || selectionStart !== 0 || selectionEnd < prefixLength) {
      selectionStart -= prefixLength;
    }
    let char = inputValue.charAt(selectionStart);
    if (this.isNumeralChar(char)) {
      return selectionStart + prefixLength;
    }
    let i = selectionStart - 1;
    while (i >= 0) {
      char = inputValue.charAt(i);
      if (this.isNumeralChar(char)) {
        index = i + prefixLength;
        break;
      } else {
        i--;
      }
    }
    if (index !== null) {
      this.input?.nativeElement.setSelectionRange(index + 1, index + 1);
    } else {
      i = selectionStart;
      while (i < valueLength) {
        char = inputValue.charAt(i);
        if (this.isNumeralChar(char)) {
          index = i + prefixLength;
          break;
        } else {
          i++;
        }
      }
      if (index !== null) {
        this.input?.nativeElement.setSelectionRange(index, index);
      }
    }
    return index || 0;
  }
  onInputClick() {
    const currentValue = this.input?.nativeElement.value;
    if (!this.readonly && currentValue !== Mt()) {
      this.initCursor();
    }
  }
  isNumeralChar(char) {
    if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
      this.resetRegex();
      return true;
    }
    return false;
  }
  resetRegex() {
    this._numeral.lastIndex = 0;
    this._decimal.lastIndex = 0;
    this._group.lastIndex = 0;
    this._minusSign.lastIndex = 0;
  }
  updateValue(event, valueStr, insertedValueStr, operation) {
    let currentValue = this.input?.nativeElement.value;
    let newValue = null;
    if (valueStr != null) {
      newValue = this.parseValue(valueStr);
      newValue = !newValue && !this.allowEmpty ? 0 : newValue;
      this.updateInput(newValue, insertedValueStr, operation, valueStr);
      this.handleOnInput(event, currentValue, newValue);
    }
  }
  handleOnInput(event, currentValue, newValue) {
    if (this.isValueChanged(currentValue, newValue)) {
      this.input.nativeElement.value = this.formatValue(newValue);
      this.input?.nativeElement.setAttribute("aria-valuenow", newValue);
      this.updateModel(event, newValue);
      this.onInput.emit({
        originalEvent: event,
        value: newValue,
        formattedValue: currentValue
      });
    }
  }
  isValueChanged(currentValue, newValue) {
    if (newValue === null && currentValue !== null) {
      return true;
    }
    if (newValue != null) {
      let parsedCurrentValue = typeof currentValue === "string" ? this.parseValue(currentValue) : currentValue;
      return newValue !== parsedCurrentValue;
    }
    return false;
  }
  validateValue(value) {
    if (value === "-" || value == null) {
      return null;
    }
    const min = this.min();
    const max = this.max();
    if (min != null && value < min) {
      return this.min();
    }
    if (max != null && value > max) {
      return max;
    }
    return value;
  }
  updateInput(value, insertedValueStr, operation, valueStr) {
    insertedValueStr = insertedValueStr || "";
    let inputValue = this.input?.nativeElement.value;
    let newValue = this.formatValue(value);
    let currentLength = inputValue.length;
    if (newValue !== valueStr) {
      newValue = this.concatValues(newValue, valueStr);
    }
    if (currentLength === 0) {
      this.input.nativeElement.value = newValue;
      this.input.nativeElement.setSelectionRange(0, 0);
      const index = this.initCursor();
      const selectionEnd = index + insertedValueStr.length;
      this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
    } else {
      let selectionStart = this.input.nativeElement.selectionStart;
      let selectionEnd = this.input.nativeElement.selectionEnd;
      const maxlength = this.maxlength();
      if (maxlength && newValue.length > maxlength) {
        newValue = newValue.slice(0, maxlength);
        selectionStart = Math.min(selectionStart, maxlength);
        selectionEnd = Math.min(selectionEnd, maxlength);
      }
      if (maxlength && maxlength < newValue.length) {
        return;
      }
      this.input.nativeElement.value = newValue;
      let newLength = newValue.length;
      if (operation === "range-insert") {
        const startValue = this.parseValue((inputValue || "").slice(0, selectionStart));
        const startValueStr = startValue !== null ? startValue.toString() : "";
        const startExpr = startValueStr.split("").join(`(${this.groupChar})?`);
        const sRegex = new RegExp(startExpr, "g");
        sRegex.test(newValue);
        const tExpr = insertedValueStr.split("").join(`(${this.groupChar})?`);
        const tRegex = new RegExp(tExpr, "g");
        tRegex.test(newValue.slice(sRegex.lastIndex));
        selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (newLength === currentLength) {
        if (operation === "insert" || operation === "delete-back-single") this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
        else if (operation === "delete-single") this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
        else if (operation === "delete-range" || operation === "spin") this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (operation === "delete-back-single") {
        let prevChar = inputValue.charAt(selectionEnd - 1);
        let nextChar = inputValue.charAt(selectionEnd);
        let diff = currentLength - newLength;
        let isGroupChar = this._group.test(nextChar);
        if (isGroupChar && diff === 1) {
          selectionEnd += 1;
        } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
          selectionEnd += -1 * diff + 1;
        }
        this._group.lastIndex = 0;
        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (inputValue === "-" && operation === "insert") {
        this.input.nativeElement.setSelectionRange(0, 0);
        const index = this.initCursor();
        const selectionEnd2 = index + insertedValueStr.length + 1;
        this.input.nativeElement.setSelectionRange(selectionEnd2, selectionEnd2);
      } else {
        selectionEnd = selectionEnd + (newLength - currentLength);
        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      }
    }
    this.input.nativeElement.setAttribute("aria-valuenow", value);
  }
  concatValues(val1, val2) {
    if (val1 && val2) {
      let decimalCharIndex = val2.search(this._decimal);
      this._decimal.lastIndex = 0;
      if (this.suffixChar) {
        return decimalCharIndex !== -1 ? val1.replace(this.suffixChar, "").split(this._decimal)[0] + val2.replace(this.suffixChar, "").slice(decimalCharIndex) + this.suffixChar : val1;
      } else {
        return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
      }
    }
    return val1;
  }
  getDecimalLength(value) {
    if (value) {
      const valueSplit = value.split(this._decimal);
      if (valueSplit.length === 2) {
        return valueSplit[1].replace(this._suffix, "").trim().replace(/\s/g, "").replace(this._currency, "").length;
      }
    }
    return 0;
  }
  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    const newValueNumber = this.validateValue(this.parseValue(this.input.nativeElement.value));
    const newValueString = newValueNumber?.toString();
    this.input.nativeElement.value = this.formatValue(newValueString);
    this.input.nativeElement.setAttribute("aria-valuenow", newValueString);
    this.updateModel(event, newValueNumber);
    this.onModelTouched();
    this.onBlur.emit(event);
  }
  formattedValue() {
    const val = !this.value && !this.allowEmpty ? 0 : this.value;
    return this.formatValue(val);
  }
  updateModel(event, value) {
    const isBlurUpdateOnMode = this.ngControl?.control?.updateOn === "blur";
    if (this.value !== value) {
      this.value = value;
      if (!(isBlurUpdateOnMode && this.focused)) {
        this.onModelChange(value);
      }
    } else if (isBlurUpdateOnMode) {
      this.onModelChange(value);
    }
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    this.value = value ? Number(value) : value;
    setModelValue(value);
    this.cd.markForCheck();
  }
  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  get dataP() {
    return this.cn({
      invalid: this.invalid(),
      disabled: this.$disabled(),
      focus: this.focused,
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      empty: !this.$filled(),
      [this.size()]: this.size(),
      [this.buttonLayout]: this.showButtons && this.buttonLayout
    });
  }
  static ɵfac = function InputNumber_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputNumber)(ɵɵdirectiveInject(Injector));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _InputNumber,
    selectors: [["p-inputNumber"], ["p-inputnumber"], ["p-input-number"]],
    contentQueries: function InputNumber_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c07, 4)(dirIndex, _c110, 4)(dirIndex, _c29, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clearIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.incrementButtonIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.decrementButtonIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function InputNumber_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c34, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.input = _t.first);
      }
    },
    hostVars: 3,
    hostBindings: function InputNumber_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-p", ctx.dataP);
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      showButtons: [2, "showButtons", "showButtons", booleanAttribute],
      format: [2, "format", "format", booleanAttribute],
      buttonLayout: "buttonLayout",
      inputId: "inputId",
      styleClass: "styleClass",
      placeholder: "placeholder",
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      title: "title",
      ariaLabelledBy: "ariaLabelledBy",
      ariaDescribedBy: "ariaDescribedBy",
      ariaLabel: "ariaLabel",
      ariaRequired: [2, "ariaRequired", "ariaRequired", booleanAttribute],
      autocomplete: "autocomplete",
      incrementButtonClass: "incrementButtonClass",
      decrementButtonClass: "decrementButtonClass",
      incrementButtonIcon: "incrementButtonIcon",
      decrementButtonIcon: "decrementButtonIcon",
      readonly: [2, "readonly", "readonly", booleanAttribute],
      allowEmpty: [2, "allowEmpty", "allowEmpty", booleanAttribute],
      locale: "locale",
      localeMatcher: "localeMatcher",
      mode: "mode",
      currency: "currency",
      currencyDisplay: "currencyDisplay",
      useGrouping: [2, "useGrouping", "useGrouping", booleanAttribute],
      minFractionDigits: [2, "minFractionDigits", "minFractionDigits", (value) => numberAttribute(value, void 0)],
      maxFractionDigits: [2, "maxFractionDigits", "maxFractionDigits", (value) => numberAttribute(value, void 0)],
      prefix: "prefix",
      suffix: "suffix",
      inputStyle: "inputStyle",
      inputStyleClass: "inputStyleClass",
      showClear: [2, "showClear", "showClear", booleanAttribute],
      autofocus: [2, "autofocus", "autofocus", booleanAttribute]
    },
    outputs: {
      onInput: "onInput",
      onFocus: "onFocus",
      onBlur: "onBlur",
      onKeyDown: "onKeyDown",
      onClear: "onClear"
    },
    features: [ɵɵProvidersFeature([INPUTNUMBER_VALUE_ACCESSOR, InputNumberStyle, {
      provide: INPUTNUMBER_INSTANCE,
      useExisting: _InputNumber
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _InputNumber
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 6,
    vars: 38,
    consts: [["input", ""], ["pInputText", "", "role", "spinbutton", "inputmode", "decimal", 3, "input", "keydown", "keypress", "paste", "click", "focus", "blur", "value", "ngStyle", "variant", "invalid", "pSize", "pt", "unstyled", "pAutoFocus", "fluid"], [4, "ngIf"], [3, "pBind", "class", 4, "ngIf"], ["type", "button", "tabindex", "-1", 3, "pBind", "class", "mousedown", "mouseup", "mouseleave", "keydown", "keyup", 4, "ngIf"], ["data-p-icon", "times", 3, "pBind", "class", "click", 4, "ngIf"], [3, "pBind", "class", "click", 4, "ngIf"], ["data-p-icon", "times", 3, "click", "pBind"], [3, "click", "pBind"], [4, "ngTemplateOutlet"], [3, "pBind"], ["type", "button", "tabindex", "-1", 3, "mousedown", "mouseup", "mouseleave", "keydown", "keyup", "pBind"], [3, "pBind", "ngClass", 4, "ngIf"], [3, "pBind", "ngClass"], ["data-p-icon", "angle-up", 3, "pBind", 4, "ngIf"], ["data-p-icon", "angle-up", 3, "pBind"], ["data-p-icon", "angle-down", 3, "pBind", 4, "ngIf"], ["data-p-icon", "angle-down", 3, "pBind"]],
    template: function InputNumber_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "input", 1, 0);
        ɵɵlistener("input", function InputNumber_Template_input_input_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onUserInput($event));
        })("keydown", function InputNumber_Template_input_keydown_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputKeyDown($event));
        })("keypress", function InputNumber_Template_input_keypress_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputKeyPress($event));
        })("paste", function InputNumber_Template_input_paste_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onPaste($event));
        })("click", function InputNumber_Template_input_click_0_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputClick());
        })("focus", function InputNumber_Template_input_focus_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputFocus($event));
        })("blur", function InputNumber_Template_input_blur_0_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputBlur($event));
        });
        ɵɵelementEnd();
        ɵɵtemplate(2, InputNumber_ng_container_2_Template, 3, 2, "ng-container", 2)(3, InputNumber_span_3_Template, 7, 20, "span", 3)(4, InputNumber_button_4_Template, 3, 8, "button", 4)(5, InputNumber_button_5_Template, 3, 8, "button", 4);
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("pcInputText"), ctx.inputStyleClass));
        ɵɵproperty("value", ctx.formattedValue())("ngStyle", ctx.inputStyle)("variant", ctx.$variant())("invalid", ctx.invalid())("pSize", ctx.size())("pt", ctx.ptm("pcInputText"))("unstyled", ctx.unstyled())("pAutoFocus", ctx.autofocus)("fluid", ctx.hasFluid);
        ɵɵattribute("id", ctx.inputId)("aria-valuemin", ctx.min())("aria-valuemax", ctx.max())("aria-valuenow", ctx.value)("placeholder", ctx.placeholder)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledBy)("aria-describedby", ctx.ariaDescribedBy)("title", ctx.title)("size", ctx.inputSize())("name", ctx.name())("autocomplete", ctx.autocomplete)("maxlength", ctx.maxlength())("minlength", ctx.minlength())("tabindex", ctx.tabindex)("aria-required", ctx.ariaRequired)("min", ctx.min())("max", ctx.max())("step", ctx.step() ?? 1)("required", ctx.required() ? "" : void 0)("readonly", ctx.readonly ? "" : void 0)("disabled", ctx.$disabled() ? "" : void 0)("data-p", ctx.dataP);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.buttonLayout != "vertical" && ctx.showClear && ctx.value);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showButtons && ctx.buttonLayout === "stacked");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showButtons && ctx.buttonLayout !== "stacked");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showButtons && ctx.buttonLayout !== "stacked");
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, InputText, AutoFocus, TimesIcon, AngleUpIcon, AngleDownIcon, SharedModule, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumber, [{
    type: Component,
    args: [{
      selector: "p-inputNumber, p-inputnumber, p-input-number",
      standalone: true,
      imports: [CommonModule, InputText, AutoFocus, TimesIcon, AngleUpIcon, AngleDownIcon, SharedModule, BindModule],
      template: `
        <input
            pInputText
            #input
            [attr.id]="inputId"
            role="spinbutton"
            [class]="cn(cx('pcInputText'), inputStyleClass)"
            [value]="formattedValue()"
            [ngStyle]="inputStyle"
            [variant]="$variant()"
            [invalid]="invalid()"
            [attr.aria-valuemin]="min()"
            [attr.aria-valuemax]="max()"
            [attr.aria-valuenow]="value"
            [attr.placeholder]="placeholder"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-describedby]="ariaDescribedBy"
            [attr.title]="title"
            [pSize]="size()"
            [attr.size]="inputSize()"
            [attr.name]="name()"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength()"
            [attr.minlength]="minlength()"
            [attr.tabindex]="tabindex"
            [attr.aria-required]="ariaRequired"
            [attr.min]="min()"
            [attr.max]="max()"
            [attr.step]="step() ?? 1"
            [attr.required]="required() ? '' : undefined"
            [attr.readonly]="readonly ? '' : undefined"
            [attr.disabled]="$disabled() ? '' : undefined"
            inputmode="decimal"
            (input)="onUserInput($event)"
            (keydown)="onInputKeyDown($event)"
            (keypress)="onInputKeyPress($event)"
            (paste)="onPaste($event)"
            (click)="onInputClick()"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            [pt]="ptm('pcInputText')"
            [unstyled]="unstyled()"
            [pAutoFocus]="autofocus"
            [fluid]="hasFluid"
            [attr.data-p]="dataP"
        />
        <ng-container *ngIf="buttonLayout != 'vertical' && showClear && value">
            <svg data-p-icon="times" *ngIf="!clearIconTemplate && !_clearIconTemplate" [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear()" />
            <span *ngIf="clearIconTemplate || _clearIconTemplate" [pBind]="ptm('clearIcon')" (click)="clear()" [class]="cx('clearIcon')">
                <ng-template *ngTemplateOutlet="clearIconTemplate || _clearIconTemplate"></ng-template>
            </span>
        </ng-container>
        <span [pBind]="ptm('buttonGroup')" [class]="cx('buttonGroup')" *ngIf="showButtons && buttonLayout === 'stacked'" [attr.data-p]="dataP">
            <button
                type="button"
                [pBind]="ptm('incrementButton')"
                [class]="cn(cx('incrementButton'), incrementButtonClass)"
                [attr.disabled]="$disabled() ? '' : undefined"
                tabindex="-1"
                (mousedown)="onUpButtonMouseDown($event)"
                (mouseup)="onUpButtonMouseUp()"
                (mouseleave)="onUpButtonMouseLeave()"
                (keydown)="onUpButtonKeyDown($event)"
                (keyup)="onUpButtonKeyUp()"
                [attr.aria-hidden]="true"
                [attr.data-p]="dataP"
            >
                <span *ngIf="incrementButtonIcon" [pBind]="ptm('incrementButtonIcon')" [ngClass]="incrementButtonIcon"></span>
                <ng-container *ngIf="!incrementButtonIcon">
                    <svg data-p-icon="angle-up" [pBind]="ptm('incrementButtonIcon')" *ngIf="!incrementButtonIconTemplate && !_incrementButtonIconTemplate" />
                    <ng-template *ngTemplateOutlet="incrementButtonIconTemplate || _incrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>

            <button
                type="button"
                [pBind]="ptm('decrementButton')"
                [class]="cn(cx('decrementButton'), decrementButtonClass)"
                [attr.disabled]="$disabled() ? '' : undefined"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onDownButtonMouseDown($event)"
                (mouseup)="onDownButtonMouseUp()"
                (mouseleave)="onDownButtonMouseLeave()"
                (keydown)="onDownButtonKeyDown($event)"
                (keyup)="onDownButtonKeyUp()"
                [attr.data-p]="dataP"
            >
                <span *ngIf="decrementButtonIcon" [pBind]="ptm('decrementButtonIcon')" [ngClass]="decrementButtonIcon"></span>
                <ng-container *ngIf="!decrementButtonIcon">
                    <svg data-p-icon="angle-down" [pBind]="ptm('decrementButtonIcon')" *ngIf="!decrementButtonIconTemplate && !_decrementButtonIconTemplate" />
                    <ng-template *ngTemplateOutlet="decrementButtonIconTemplate || _decrementButtonIconTemplate"></ng-template>
                </ng-container>
            </button>
        </span>
        <button
            *ngIf="showButtons && buttonLayout !== 'stacked'"
            type="button"
            [pBind]="ptm('incrementButton')"
            [class]="cn(cx('incrementButton'), incrementButtonClass)"
            [attr.disabled]="$disabled() ? '' : undefined"
            tabindex="-1"
            [attr.aria-hidden]="true"
            (mousedown)="onUpButtonMouseDown($event)"
            (mouseup)="onUpButtonMouseUp()"
            (mouseleave)="onUpButtonMouseLeave()"
            (keydown)="onUpButtonKeyDown($event)"
            (keyup)="onUpButtonKeyUp()"
            [attr.data-p]="dataP"
        >
            <span *ngIf="incrementButtonIcon" [pBind]="ptm('incrementButtonIcon')" [ngClass]="incrementButtonIcon"></span>
            <ng-container *ngIf="!incrementButtonIcon">
                <svg data-p-icon="angle-up" [pBind]="ptm('incrementButtonIcon')" *ngIf="!incrementButtonIconTemplate && !_incrementButtonIconTemplate" />
                <ng-template *ngTemplateOutlet="incrementButtonIconTemplate || _incrementButtonIconTemplate"></ng-template>
            </ng-container>
        </button>
        <button
            *ngIf="showButtons && buttonLayout !== 'stacked'"
            type="button"
            [pBind]="ptm('decrementButton')"
            [class]="cn(cx('decrementButton'), decrementButtonClass)"
            [attr.disabled]="$disabled() ? '' : undefined"
            tabindex="-1"
            [attr.aria-hidden]="true"
            (mousedown)="onDownButtonMouseDown($event)"
            (mouseup)="onDownButtonMouseUp()"
            (mouseleave)="onDownButtonMouseLeave()"
            (keydown)="onDownButtonKeyDown($event)"
            (keyup)="onDownButtonKeyUp()"
            [attr.data-p]="dataP"
        >
            <span *ngIf="decrementButtonIcon" [pBind]="ptm('decrementButtonIcon')" [ngClass]="decrementButtonIcon"></span>
            <ng-container *ngIf="!decrementButtonIcon">
                <svg data-p-icon="angle-down" [pBind]="ptm('decrementButtonIcon')" *ngIf="!decrementButtonIconTemplate && !_decrementButtonIconTemplate" />
                <ng-template *ngTemplateOutlet="decrementButtonIconTemplate || _decrementButtonIconTemplate"></ng-template>
            </ng-container>
        </button>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [INPUTNUMBER_VALUE_ACCESSOR, InputNumberStyle, {
        provide: INPUTNUMBER_INSTANCE,
        useExisting: InputNumber
      }, {
        provide: PARENT_INSTANCE,
        useExisting: InputNumber
      }],
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cn(cx('root'), styleClass)",
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: Injector
  }], {
    showButtons: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    format: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    buttonLayout: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    title: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    ariaDescribedBy: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaRequired: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autocomplete: [{
      type: Input
    }],
    incrementButtonClass: [{
      type: Input
    }],
    decrementButtonClass: [{
      type: Input
    }],
    incrementButtonIcon: [{
      type: Input
    }],
    decrementButtonIcon: [{
      type: Input
    }],
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    allowEmpty: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    locale: [{
      type: Input
    }],
    localeMatcher: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    currency: [{
      type: Input
    }],
    currencyDisplay: [{
      type: Input
    }],
    useGrouping: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    minFractionDigits: [{
      type: Input,
      args: [{
        transform: (value) => numberAttribute(value, void 0)
      }]
    }],
    maxFractionDigits: [{
      type: Input,
      args: [{
        transform: (value) => numberAttribute(value, void 0)
      }]
    }],
    prefix: [{
      type: Input
    }],
    suffix: [{
      type: Input
    }],
    inputStyle: [{
      type: Input
    }],
    inputStyleClass: [{
      type: Input
    }],
    showClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onInput: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onKeyDown: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    clearIconTemplate: [{
      type: ContentChild,
      args: ["clearicon", {
        descendants: false
      }]
    }],
    incrementButtonIconTemplate: [{
      type: ContentChild,
      args: ["incrementbuttonicon", {
        descendants: false
      }]
    }],
    decrementButtonIconTemplate: [{
      type: ContentChild,
      args: ["decrementbuttonicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    input: [{
      type: ViewChild,
      args: ["input"]
    }]
  });
})();
var InputNumberModule = class _InputNumberModule {
  static ɵfac = function InputNumberModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputNumberModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _InputNumberModule,
    imports: [InputNumber, SharedModule],
    exports: [InputNumber, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [InputNumber, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumberModule, [{
    type: NgModule,
    args: [{
      imports: [InputNumber, SharedModule],
      exports: [InputNumber, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/paginator/index.mjs
var style10 = "\n    .p-paginator {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n        background: dt('paginator.background');\n        color: dt('paginator.color');\n        padding: dt('paginator.padding');\n        border-radius: dt('paginator.border.radius');\n        gap: dt('paginator.gap');\n    }\n\n    .p-paginator-content {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n        gap: dt('paginator.gap');\n    }\n\n    .p-paginator-content-start {\n        margin-inline-end: auto;\n    }\n\n    .p-paginator-content-end {\n        margin-inline-start: auto;\n    }\n\n    .p-paginator-page,\n    .p-paginator-next,\n    .p-paginator-last,\n    .p-paginator-first,\n    .p-paginator-prev {\n        cursor: pointer;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        line-height: 1;\n        user-select: none;\n        overflow: hidden;\n        position: relative;\n        background: dt('paginator.nav.button.background');\n        border: 0 none;\n        color: dt('paginator.nav.button.color');\n        min-width: dt('paginator.nav.button.width');\n        height: dt('paginator.nav.button.height');\n        transition:\n            background dt('paginator.transition.duration'),\n            color dt('paginator.transition.duration'),\n            outline-color dt('paginator.transition.duration'),\n            box-shadow dt('paginator.transition.duration');\n        border-radius: dt('paginator.nav.button.border.radius');\n        padding: 0;\n        margin: 0;\n    }\n\n    .p-paginator-page:focus-visible,\n    .p-paginator-next:focus-visible,\n    .p-paginator-last:focus-visible,\n    .p-paginator-first:focus-visible,\n    .p-paginator-prev:focus-visible {\n        box-shadow: dt('paginator.nav.button.focus.ring.shadow');\n        outline: dt('paginator.nav.button.focus.ring.width') dt('paginator.nav.button.focus.ring.style') dt('paginator.nav.button.focus.ring.color');\n        outline-offset: dt('paginator.nav.button.focus.ring.offset');\n    }\n\n    .p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,\n    .p-paginator-first:not(.p-disabled):hover,\n    .p-paginator-prev:not(.p-disabled):hover,\n    .p-paginator-next:not(.p-disabled):hover,\n    .p-paginator-last:not(.p-disabled):hover {\n        background: dt('paginator.nav.button.hover.background');\n        color: dt('paginator.nav.button.hover.color');\n    }\n\n    .p-paginator-page.p-paginator-page-selected {\n        background: dt('paginator.nav.button.selected.background');\n        color: dt('paginator.nav.button.selected.color');\n    }\n\n    .p-paginator-current {\n        color: dt('paginator.current.page.report.color');\n    }\n\n    .p-paginator-pages {\n        display: flex;\n        align-items: center;\n        gap: dt('paginator.gap');\n    }\n\n    .p-paginator-jtp-input .p-inputtext {\n        max-width: dt('paginator.jump.to.page.input.max.width');\n    }\n\n    .p-paginator-first:dir(rtl),\n    .p-paginator-prev:dir(rtl),\n    .p-paginator-next:dir(rtl),\n    .p-paginator-last:dir(rtl) {\n        transform: rotate(180deg);\n    }\n";

// node_modules/primeng/fesm2022/primeng-paginator.mjs
var _c08 = ["dropdownicon"];
var _c111 = ["firstpagelinkicon"];
var _c210 = ["previouspagelinkicon"];
var _c35 = ["lastpagelinkicon"];
var _c44 = ["nextpagelinkicon"];
var _c54 = (a0) => ({
  $implicit: a0
});
var _c63 = (a0) => ({
  pageLink: a0
});
function Paginator_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Paginator_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, Paginator_div_0_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("contentStart"));
    ɵɵproperty("pBind", ctx_r0.ptm("contentStart"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.templateLeft)("ngTemplateOutletContext", ɵɵpureFunction1(5, _c54, ctx_r0.paginatorState));
  }
}
function Paginator_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 10);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("current"));
    ɵɵproperty("pBind", ctx_r0.ptm("current"));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.currentPageReport);
  }
}
function Paginator_button_2__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 14);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("firstIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("firstIcon"));
  }
}
function Paginator_button_2_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_button_2_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_button_2_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_button_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, Paginator_button_2_span_2_1_Template, 1, 0, null, 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("firstIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.firstPageLinkIconTemplate || ctx_r0._firstPageLinkIconTemplate);
  }
}
function Paginator_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 12);
    ɵɵlistener("click", function Paginator_button_2_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.changePageToFirst($event));
    });
    ɵɵtemplate(1, Paginator_button_2__svg_svg_1_Template, 1, 3, "svg", 13)(2, Paginator_button_2_span_2_Template, 2, 3, "span", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("first"));
    ɵɵproperty("pBind", ctx_r0.ptm("first"));
    ɵɵattribute("aria-label", ctx_r0.getAriaLabel("firstPageLabel"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.firstPageLinkIconTemplate && !ctx_r0._firstPageLinkIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.firstPageLinkIconTemplate || ctx_r0._firstPageLinkIconTemplate);
  }
}
function Paginator__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 16);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("prevIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("prevIcon"));
  }
}
function Paginator_span_5_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_span_5_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_span_5_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_span_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, Paginator_span_5_1_Template, 1, 0, null, 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("prevIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.previousPageLinkIconTemplate || ctx_r0._previousPageLinkIconTemplate);
  }
}
function Paginator_span_6_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 12);
    ɵɵlistener("click", function Paginator_span_6_button_1_Template_button_click_0_listener($event) {
      const pageLink_r4 = ɵɵrestoreView(_r3).$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onPageLinkClick($event, pageLink_r4 - 1));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const pageLink_r4 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("page", ɵɵpureFunction1(6, _c63, pageLink_r4)));
    ɵɵproperty("pBind", ctx_r0.ptm("page"));
    ɵɵattribute("aria-label", ctx_r0.getPageAriaLabel(pageLink_r4))("aria-current", pageLink_r4 - 1 == ctx_r0.getPage() ? "page" : void 0);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.getLocalization(pageLink_r4), " ");
  }
}
function Paginator_span_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 10);
    ɵɵtemplate(1, Paginator_span_6_button_1_Template, 2, 8, "button", 17);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("pages"));
    ɵɵproperty("pBind", ctx_r0.ptm("pages"));
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r0.pageLinks);
  }
}
function Paginator_p_select_7_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵtextInterpolate(ctx_r0.currentPageReport);
  }
}
function Paginator_p_select_7_ng_container_2_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Paginator_p_select_7_ng_container_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_p_select_7_ng_container_2_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.jumpToPageItemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c54, item_r6));
  }
}
function Paginator_p_select_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Paginator_p_select_7_ng_container_2_ng_template_1_Template, 1, 4, "ng-template", 21);
    ɵɵelementContainerEnd();
  }
}
function Paginator_p_select_7_3_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Paginator_p_select_7_3_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_p_select_7_3_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 15);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.dropdownIconTemplate || ctx_r0._dropdownIconTemplate);
  }
}
function Paginator_p_select_7_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_p_select_7_3_ng_template_0_Template, 1, 1, "ng-template", 22);
  }
}
function Paginator_p_select_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-select", 18);
    ɵɵlistener("onChange", function Paginator_p_select_7_Template_p_select_onChange_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onPageDropdownChange($event));
    });
    ɵɵtemplate(1, Paginator_p_select_7_ng_template_1_Template, 1, 1, "ng-template", 19)(2, Paginator_p_select_7_ng_container_2_Template, 2, 0, "ng-container", 20)(3, Paginator_p_select_7_3_Template, 1, 0, null, 20);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("options", ctx_r0.pageItems)("ngModel", ctx_r0.getPage())("disabled", ctx_r0.empty())("styleClass", ctx_r0.cx("pcJumpToPageDropdown"))("appendTo", ctx_r0.dropdownAppendTo || ctx_r0.$appendTo())("scrollHeight", ctx_r0.dropdownScrollHeight)("pt", ctx_r0.ptm("pcJumpToPageDropdown"))("unstyled", ctx_r0.unstyled());
    ɵɵattribute("aria-label", ctx_r0.getAriaLabel("jumpToPageDropdownLabel"));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r0.jumpToPageItemTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.dropdownIconTemplate || ctx_r0._dropdownIconTemplate);
  }
}
function Paginator__svg_svg_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 23);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("nextIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("nextIcon"));
  }
}
function Paginator_span_10_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_span_10_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_span_10_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_span_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, Paginator_span_10_1_Template, 1, 0, null, 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("nextIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.nextPageLinkIconTemplate || ctx_r0._nextPageLinkIconTemplate);
  }
}
function Paginator_button_11__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelement(0, "svg", 25);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("lastIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("lastIcon"));
  }
}
function Paginator_button_11_span_2_1_ng_template_0_Template(rf, ctx) {
}
function Paginator_button_11_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_button_11_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Paginator_button_11_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, Paginator_button_11_span_2_1_Template, 1, 0, null, 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cx("lastIcon"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.lastPageLinkIconTemplate || ctx_r0._lastPageLinkIconTemplate);
  }
}
function Paginator_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 2);
    ɵɵlistener("click", function Paginator_button_11_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.changePageToLast($event));
    });
    ɵɵtemplate(1, Paginator_button_11__svg_svg_1_Template, 1, 3, "svg", 24)(2, Paginator_button_11_span_2_Template, 2, 3, "span", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("last"));
    ɵɵproperty("pBind", ctx_r0.ptm("last"))("disabled", ctx_r0.isLastPage() || ctx_r0.empty());
    ɵɵattribute("aria-label", ctx_r0.getAriaLabel("lastPageLabel"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.lastPageLinkIconTemplate && !ctx_r0._lastPageLinkIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.lastPageLinkIconTemplate || ctx_r0._lastPageLinkIconTemplate);
  }
}
function Paginator_p_inputnumber_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-inputnumber", 26);
    ɵɵlistener("ngModelChange", function Paginator_p_inputnumber_12_Template_p_inputnumber_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r8);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.changePage($event - 1));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("pcJumpToPageInput"));
    ɵɵproperty("pt", ctx_r0.ptm("pcJumpToPageInput"))("ngModel", ctx_r0.currentPage())("disabled", ctx_r0.empty())("unstyled", ctx_r0.unstyled());
  }
}
function Paginator_p_select_13_ng_container_1_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Paginator_p_select_13_ng_container_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_p_select_13_ng_container_1_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.dropdownItemTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c54, item_r10));
  }
}
function Paginator_p_select_13_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Paginator_p_select_13_ng_container_1_ng_template_1_Template, 1, 4, "ng-template", 21);
    ɵɵelementContainerEnd();
  }
}
function Paginator_p_select_13_2_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Paginator_p_select_13_2_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_p_select_13_2_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 15);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.dropdownIconTemplate || ctx_r0._dropdownIconTemplate);
  }
}
function Paginator_p_select_13_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Paginator_p_select_13_2_ng_template_0_Template, 1, 1, "ng-template", 22);
  }
}
function Paginator_p_select_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-select", 27);
    ɵɵtwoWayListener("ngModelChange", function Paginator_p_select_13_Template_p_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r9);
      const ctx_r0 = ɵɵnextContext();
      ɵɵtwoWayBindingSet(ctx_r0.rows, $event) || (ctx_r0.rows = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("onChange", function Paginator_p_select_13_Template_p_select_onChange_0_listener($event) {
      ɵɵrestoreView(_r9);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onRppChange($event));
    });
    ɵɵtemplate(1, Paginator_p_select_13_ng_container_1_Template, 2, 0, "ng-container", 20)(2, Paginator_p_select_13_2_Template, 1, 0, null, 20);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("options", ctx_r0.rowsPerPageItems);
    ɵɵtwoWayProperty("ngModel", ctx_r0.rows);
    ɵɵproperty("styleClass", ctx_r0.cx("pcRowPerPageDropdown"))("disabled", ctx_r0.empty())("appendTo", ctx_r0.dropdownAppendTo || ctx_r0.$appendTo())("scrollHeight", ctx_r0.dropdownScrollHeight)("ariaLabel", ctx_r0.getAriaLabel("rowsPerPageLabel"))("pt", ctx_r0.ptm("pcRowPerPageDropdown"))("unstyled", ctx_r0.unstyled());
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.dropdownItemTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.dropdownIconTemplate || ctx_r0._dropdownIconTemplate);
  }
}
function Paginator_div_14_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Paginator_div_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, Paginator_div_14_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("contentEnd"));
    ɵɵproperty("pBind", ctx_r0.ptm("contentEnd"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.templateRight)("ngTemplateOutletContext", ɵɵpureFunction1(5, _c54, ctx_r0.paginatorState));
  }
}
var classes9 = {
  paginator: ({
    instance
  }) => ["p-paginator p-component"],
  content: "p-paginator-content",
  contentStart: "p-paginator-content-start",
  contentEnd: "p-paginator-content-end",
  first: ({
    instance
  }) => ["p-paginator-first", {
    "p-disabled": instance.isFirstPage() || instance.empty()
  }],
  firstIcon: "p-paginator-first-icon",
  prev: ({
    instance
  }) => ["p-paginator-prev", {
    "p-disabled": instance.isFirstPage() || instance.empty()
  }],
  prevIcon: "p-paginator-prev-icon",
  next: ({
    instance
  }) => ["p-paginator-next", {
    "p-disabled": instance.isLastPage() || instance.empty()
  }],
  nextIcon: "p-paginator-next-icon",
  last: ({
    instance
  }) => ["p-paginator-last", {
    "p-disabled": instance.isLastPage() || instance.empty()
  }],
  lastIcon: "p-paginator-last-icon",
  pages: "p-paginator-pages",
  page: ({
    instance,
    pageLink
  }) => ["p-paginator-page", {
    "p-paginator-page-selected": pageLink - 1 == instance.getPage()
  }],
  current: "p-paginator-current",
  pcRowPerPageDropdown: "p-paginator-rpp-dropdown",
  pcJumpToPageDropdown: "p-paginator-jtp-dropdown",
  pcJumpToPageInput: "p-paginator-jtp-input"
};
var PaginatorStyle = class _PaginatorStyle extends BaseStyle {
  name = "paginator";
  style = style10;
  classes = classes9;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPaginatorStyle_BaseFactory;
    return function PaginatorStyle_Factory(__ngFactoryType__) {
      return (ɵPaginatorStyle_BaseFactory || (ɵPaginatorStyle_BaseFactory = ɵɵgetInheritedFactory(_PaginatorStyle)))(__ngFactoryType__ || _PaginatorStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _PaginatorStyle,
    factory: _PaginatorStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginatorStyle, [{
    type: Injectable
  }], null, null);
})();
var PaginatorClasses;
(function(PaginatorClasses2) {
  PaginatorClasses2["paginator"] = "p-paginator";
  PaginatorClasses2["contentStart"] = "p-paginator-content-start";
  PaginatorClasses2["contentEnd"] = "p-paginator-content-end";
  PaginatorClasses2["first"] = "p-paginator-first";
  PaginatorClasses2["firstIcon"] = "p-paginator-first-icon";
  PaginatorClasses2["prev"] = "p-paginator-prev";
  PaginatorClasses2["prevIcon"] = "p-paginator-prev-icon";
  PaginatorClasses2["next"] = "p-paginator-next";
  PaginatorClasses2["nextIcon"] = "p-paginator-next-icon";
  PaginatorClasses2["last"] = "p-paginator-last";
  PaginatorClasses2["lastIcon"] = "p-paginator-last-icon";
  PaginatorClasses2["pages"] = "p-paginator-pages";
  PaginatorClasses2["page"] = "p-paginator-page";
  PaginatorClasses2["current"] = "p-paginator-current";
  PaginatorClasses2["pcRowPerPageDropdown"] = "p-paginator-rpp-dropdown";
  PaginatorClasses2["pcJumpToPageDropdown"] = "p-paginator-jtp-dropdown";
  PaginatorClasses2["pcJumpToPageInput"] = "p-paginator-jtp-input";
})(PaginatorClasses || (PaginatorClasses = {}));
var PAGINATOR_INSTANCE = new InjectionToken("PAGINATOR_INSTANCE");
var Paginator = class _Paginator extends BaseComponent {
  componentName = "Paginator";
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcPaginator = inject(PAGINATOR_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Number of page links to display.
   * @group Props
   */
  pageLinkSize = 5;
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Whether to show it even there is only one page.
   * @group Props
   */
  alwaysShow = true;
  /**
   * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @deprecated since v20.0.0. Use `appendTo` instead.
   * @group Props
   */
  dropdownAppendTo;
  /**
   * Template instance to inject into the left side of the paginator.
   * @param {PaginatorTemplateContext} context - Paginator template context.
   * @see {@link PaginatorTemplateContext}
   * @group Props
   */
  templateLeft;
  /**
   * Template instance to inject into the right side of the paginator.
   * @param {PaginatorTemplateContext} context - Paginator template context.
   * @see {@link PaginatorTemplateContext}
   * @group Props
   */
  templateRight;
  /**
   * Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  dropdownScrollHeight = "200px";
  /**
   * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
   * @group Props
   */
  currentPageReportTemplate = "{currentPage} of {totalPages}";
  /**
   * Whether to display current page report.
   * @group Props
   */
  showCurrentPageReport;
  /**
   * When enabled, icons are displayed on paginator to go first and last page.
   * @group Props
   */
  showFirstLastIcon = true;
  /**
   * Number of total records.
   * @group Props
   */
  totalRecords = 0;
  /**
   * Data count to display per page.
   * @group Props
   */
  rows = 0;
  /**
   * Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}]
   * @group Props
   */
  rowsPerPageOptions;
  /**
   * Whether to display a dropdown to navigate to any page.
   * @group Props
   */
  showJumpToPageDropdown;
  /**
   * Whether to display a input to navigate to any page.
   * @group Props
   */
  showJumpToPageInput;
  /**
   * Template instance to inject into the jump to page dropdown item inside in the paginator.
   * @param {PaginatorDropdownItemTemplateContext} context - dropdown item context.
   * @see {@link PaginatorDropdownItemTemplateContext}
   * @group Props
   */
  jumpToPageItemTemplate;
  /**
   * Whether to show page links.
   * @group Props
   */
  showPageLinks = true;
  /**
   * Locale to be used in formatting.
   * @group Props
   */
  locale;
  /**
   * Template instance to inject into the rows per page dropdown item inside in the paginator.
   * @param {PaginatorDropdownItemTemplateContext} context - dropdown item context.
   * @see {@link PaginatorDropdownItemTemplateContext}
   * @group Props
   */
  dropdownItemTemplate;
  /**
   * Zero-relative number of the first row to be displayed.
   * @group Props
   */
  get first() {
    return this._first;
  }
  set first(val) {
    this._first = val;
  }
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
  /**
   * Callback to invoke when page changes, the event object contains information about the new state.
   * @param {PaginatorState} event - Paginator state.
   * @group Emits
   */
  onPageChange = new EventEmitter();
  /**
   * Template for the dropdown icon.
   * @group Templates
   */
  dropdownIconTemplate;
  /**
   * Template for the first page link icon.
   * @group Templates
   */
  firstPageLinkIconTemplate;
  /**
   * Template for the previous page link icon.
   * @group Templates
   */
  previousPageLinkIconTemplate;
  /**
   * Template for the last page link icon.
   * @group Templates
   */
  lastPageLinkIconTemplate;
  /**
   * Template for the next page link icon.
   * @group Templates
   */
  nextPageLinkIconTemplate;
  templates;
  _dropdownIconTemplate;
  _firstPageLinkIconTemplate;
  _previousPageLinkIconTemplate;
  _lastPageLinkIconTemplate;
  _nextPageLinkIconTemplate;
  pageLinks;
  pageItems;
  rowsPerPageItems;
  paginatorState;
  _first = 0;
  _page = 0;
  _componentStyle = inject(PaginatorStyle);
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  get display() {
    return this.alwaysShow || this.pageLinks && this.pageLinks.length > 1 ? null : "none";
  }
  constructor() {
    super();
  }
  onInit() {
    this.updatePaginatorState();
  }
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "dropdownicon":
          this._dropdownIconTemplate = item.template;
          break;
        case "firstpagelinkicon":
          this._firstPageLinkIconTemplate = item.template;
          break;
        case "previouspagelinkicon":
          this._previousPageLinkIconTemplate = item.template;
          break;
        case "lastpagelinkicon":
          this._lastPageLinkIconTemplate = item.template;
          break;
        case "nextpagelinkicon":
          this._nextPageLinkIconTemplate = item.template;
          break;
      }
    });
  }
  getAriaLabel(labelType) {
    return this.config.translation.aria ? this.config.translation.aria[labelType] : void 0;
  }
  getPageAriaLabel(value) {
    return this.config.translation.aria ? this.config.translation.aria.pageLabel?.replace(/{page}/g, `${value}`) : void 0;
  }
  getLocalization(digit) {
    const numerals = [...new Intl.NumberFormat(this.locale, {
      useGrouping: false
    }).format(9876543210)].reverse();
    const index = new Map(numerals.map((d, i) => [i, d]));
    if (digit > 9) {
      const numbers = String(digit).split("");
      return numbers.map((number) => index.get(Number(number))).join("");
    } else {
      return index.get(digit);
    }
  }
  onChanges(simpleChange) {
    if (simpleChange.totalRecords) {
      this.updatePageLinks();
      this.updatePaginatorState();
      this.updateFirst();
      this.updateRowsPerPageOptions();
    }
    if (simpleChange.first) {
      this._first = simpleChange.first.currentValue;
      this.updatePageLinks();
      this.updatePaginatorState();
    }
    if (simpleChange.rows) {
      this.updatePageLinks();
      this.updatePaginatorState();
    }
    if (simpleChange.rowsPerPageOptions) {
      this.updateRowsPerPageOptions();
    }
    if (simpleChange.pageLinkSize) {
      this.updatePageLinks();
    }
  }
  updateRowsPerPageOptions() {
    if (this.rowsPerPageOptions) {
      this.rowsPerPageItems = [];
      let showAllItem = null;
      for (let opt of this.rowsPerPageOptions) {
        if (typeof opt == "object" && opt["showAll"]) {
          showAllItem = {
            label: opt["showAll"],
            value: this.totalRecords
          };
        } else {
          this.rowsPerPageItems.push({
            label: String(this.getLocalization(opt)),
            value: opt
          });
        }
      }
      if (showAllItem) {
        this.rowsPerPageItems.push(showAllItem);
      }
    }
  }
  isFirstPage() {
    return this.getPage() === 0;
  }
  isLastPage() {
    return this.getPage() === this.getPageCount() - 1;
  }
  getPageCount() {
    return Math.ceil(this.totalRecords / this.rows);
  }
  calculatePageLinkBoundaries() {
    let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
    let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2)), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
    var delta = this.pageLinkSize - (end - start + 1);
    start = Math.max(0, start - delta);
    return [start, end];
  }
  updatePageLinks() {
    this.pageLinks = [];
    let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
    for (let i = start; i <= end; i++) {
      this.pageLinks.push(i + 1);
    }
    if (this.showJumpToPageDropdown) {
      this.pageItems = [];
      for (let i = 0; i < this.getPageCount(); i++) {
        this.pageItems.push({
          label: String(i + 1),
          value: i
        });
      }
    }
  }
  changePage(p3) {
    var pc = this.getPageCount();
    if (p3 >= 0 && p3 < pc) {
      this._first = this.rows * p3;
      var state = {
        page: p3,
        first: this.first,
        rows: this.rows,
        pageCount: pc
      };
      this.updatePageLinks();
      this.onPageChange.emit(state);
      this.updatePaginatorState();
    }
  }
  updateFirst() {
    const page = this.getPage();
    if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
      Promise.resolve(null).then(() => this.changePage(page - 1));
    }
  }
  getPage() {
    return Math.floor(this.first / this.rows);
  }
  changePageToFirst(event) {
    if (!this.isFirstPage()) {
      this.changePage(0);
    }
    event.preventDefault();
  }
  changePageToPrev(event) {
    this.changePage(this.getPage() - 1);
    event.preventDefault();
  }
  changePageToNext(event) {
    this.changePage(this.getPage() + 1);
    event.preventDefault();
  }
  changePageToLast(event) {
    if (!this.isLastPage()) {
      this.changePage(this.getPageCount() - 1);
    }
    event.preventDefault();
  }
  onPageLinkClick(event, page) {
    this.changePage(page);
    event.preventDefault();
  }
  onRppChange(event) {
    this.changePage(this.getPage());
  }
  onPageDropdownChange(event) {
    this.changePage(event.value);
  }
  updatePaginatorState() {
    this.paginatorState = {
      page: this.getPage(),
      pageCount: this.getPageCount(),
      rows: this.rows,
      first: this.first,
      totalRecords: this.totalRecords
    };
  }
  empty() {
    return this.getPageCount() === 0;
  }
  currentPage() {
    return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
  }
  get currentPageReport() {
    return this.currentPageReportTemplate.replace("{currentPage}", String(this.currentPage())).replace("{totalPages}", String(this.getPageCount())).replace("{first}", String(this.totalRecords > 0 ? this._first + 1 : 0)).replace("{last}", String(Math.min(this._first + this.rows, this.totalRecords))).replace("{rows}", String(this.rows)).replace("{totalRecords}", String(this.totalRecords));
  }
  static ɵfac = function Paginator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Paginator)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Paginator,
    selectors: [["p-paginator"]],
    contentQueries: function Paginator_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c08, 4)(dirIndex, _c111, 4)(dirIndex, _c210, 4)(dirIndex, _c35, 4)(dirIndex, _c44, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.dropdownIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.firstPageLinkIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.previousPageLinkIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.lastPageLinkIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nextPageLinkIconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 4,
    hostBindings: function Paginator_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("paginator"), ctx.styleClass));
        ɵɵstyleProp("display", ctx.display);
      }
    },
    inputs: {
      pageLinkSize: [2, "pageLinkSize", "pageLinkSize", numberAttribute],
      styleClass: "styleClass",
      alwaysShow: [2, "alwaysShow", "alwaysShow", booleanAttribute],
      dropdownAppendTo: "dropdownAppendTo",
      templateLeft: "templateLeft",
      templateRight: "templateRight",
      dropdownScrollHeight: "dropdownScrollHeight",
      currentPageReportTemplate: "currentPageReportTemplate",
      showCurrentPageReport: [2, "showCurrentPageReport", "showCurrentPageReport", booleanAttribute],
      showFirstLastIcon: [2, "showFirstLastIcon", "showFirstLastIcon", booleanAttribute],
      totalRecords: [2, "totalRecords", "totalRecords", numberAttribute],
      rows: [2, "rows", "rows", numberAttribute],
      rowsPerPageOptions: "rowsPerPageOptions",
      showJumpToPageDropdown: [2, "showJumpToPageDropdown", "showJumpToPageDropdown", booleanAttribute],
      showJumpToPageInput: [2, "showJumpToPageInput", "showJumpToPageInput", booleanAttribute],
      jumpToPageItemTemplate: "jumpToPageItemTemplate",
      showPageLinks: [2, "showPageLinks", "showPageLinks", booleanAttribute],
      locale: "locale",
      dropdownItemTemplate: "dropdownItemTemplate",
      first: "first",
      appendTo: [1, "appendTo"]
    },
    outputs: {
      onPageChange: "onPageChange"
    },
    features: [ɵɵProvidersFeature([PaginatorStyle, {
      provide: PAGINATOR_INSTANCE,
      useExisting: _Paginator
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Paginator
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    decls: 15,
    vars: 23,
    consts: [[3, "pBind", "class", 4, "ngIf"], ["type", "button", "pRipple", "", 3, "pBind", "class", "click", 4, "ngIf"], ["type", "button", "pRipple", "", 3, "click", "pBind", "disabled"], ["data-p-icon", "angle-left", 3, "pBind", "class", 4, "ngIf"], [3, "class", 4, "ngIf"], [3, "options", "ngModel", "disabled", "styleClass", "appendTo", "scrollHeight", "pt", "unstyled", "onChange", 4, "ngIf"], ["data-p-icon", "angle-right", 3, "pBind", "class", 4, "ngIf"], ["type", "button", "pRipple", "", 3, "pBind", "disabled", "class", "click", 4, "ngIf"], [3, "pt", "ngModel", "class", "disabled", "unstyled", "ngModelChange", 4, "ngIf"], [3, "options", "ngModel", "styleClass", "disabled", "appendTo", "scrollHeight", "ariaLabel", "pt", "unstyled", "ngModelChange", "onChange", 4, "ngIf"], [3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", "pRipple", "", 3, "click", "pBind"], ["data-p-icon", "angle-double-left", 3, "pBind", "class", 4, "ngIf"], ["data-p-icon", "angle-double-left", 3, "pBind"], [4, "ngTemplateOutlet"], ["data-p-icon", "angle-left", 3, "pBind"], ["type", "button", "pRipple", "", 3, "pBind", "class", "click", 4, "ngFor", "ngForOf"], [3, "onChange", "options", "ngModel", "disabled", "styleClass", "appendTo", "scrollHeight", "pt", "unstyled"], ["pTemplate", "selectedItem"], [4, "ngIf"], ["pTemplate", "item"], ["pTemplate", "dropdownicon"], ["data-p-icon", "angle-right", 3, "pBind"], ["data-p-icon", "angle-double-right", 3, "pBind", "class", 4, "ngIf"], ["data-p-icon", "angle-double-right", 3, "pBind"], [3, "ngModelChange", "pt", "ngModel", "disabled", "unstyled"], [3, "ngModelChange", "onChange", "options", "ngModel", "styleClass", "disabled", "appendTo", "scrollHeight", "ariaLabel", "pt", "unstyled"]],
    template: function Paginator_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, Paginator_div_0_Template, 2, 7, "div", 0)(1, Paginator_span_1_Template, 2, 4, "span", 0)(2, Paginator_button_2_Template, 3, 6, "button", 1);
        ɵɵelementStart(3, "button", 2);
        ɵɵlistener("click", function Paginator_Template_button_click_3_listener($event) {
          return ctx.changePageToPrev($event);
        });
        ɵɵtemplate(4, Paginator__svg_svg_4_Template, 1, 3, "svg", 3)(5, Paginator_span_5_Template, 2, 3, "span", 4);
        ɵɵelementEnd();
        ɵɵtemplate(6, Paginator_span_6_Template, 2, 4, "span", 0)(7, Paginator_p_select_7_Template, 4, 11, "p-select", 5);
        ɵɵelementStart(8, "button", 2);
        ɵɵlistener("click", function Paginator_Template_button_click_8_listener($event) {
          return ctx.changePageToNext($event);
        });
        ɵɵtemplate(9, Paginator__svg_svg_9_Template, 1, 3, "svg", 6)(10, Paginator_span_10_Template, 2, 3, "span", 4);
        ɵɵelementEnd();
        ɵɵtemplate(11, Paginator_button_11_Template, 3, 7, "button", 7)(12, Paginator_p_inputnumber_12_Template, 1, 6, "p-inputnumber", 8)(13, Paginator_p_select_13_Template, 3, 11, "p-select", 9)(14, Paginator_div_14_Template, 2, 7, "div", 0);
      }
      if (rf & 2) {
        ɵɵproperty("ngIf", ctx.templateLeft);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showCurrentPageReport);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showFirstLastIcon);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("prev"));
        ɵɵproperty("pBind", ctx.ptm("prev"))("disabled", ctx.isFirstPage() || ctx.empty());
        ɵɵattribute("aria-label", ctx.getAriaLabel("prevPageLabel"));
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.previousPageLinkIconTemplate && !ctx._previousPageLinkIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.previousPageLinkIconTemplate || ctx._previousPageLinkIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showPageLinks);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showJumpToPageDropdown);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("next"));
        ɵɵproperty("pBind", ctx.ptm("next"))("disabled", ctx.isLastPage() || ctx.empty());
        ɵɵattribute("aria-label", ctx.getAriaLabel("nextPageLabel"));
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.nextPageLinkIconTemplate && !ctx._nextPageLinkIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.nextPageLinkIconTemplate || ctx._nextPageLinkIconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showFirstLastIcon);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showJumpToPageInput);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.rowsPerPageOptions);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.templateRight);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, Select, InputNumber, FormsModule, NgControlStatus, NgModel, Ripple, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, SharedModule, PrimeTemplate, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Paginator, [{
    type: Component,
    args: [{
      selector: "p-paginator",
      standalone: true,
      imports: [CommonModule, Select, InputNumber, FormsModule, Ripple, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, SharedModule, Bind],
      template: `
        <div [pBind]="ptm('contentStart')" [class]="cx('contentStart')" *ngIf="templateLeft">
            <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
        </div>
        <span [pBind]="ptm('current')" [class]="cx('current')" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
        <button [pBind]="ptm('first')" *ngIf="showFirstLastIcon" type="button" (click)="changePageToFirst($event)" pRipple [class]="cx('first')" [attr.aria-label]="getAriaLabel('firstPageLabel')">
            <svg [pBind]="ptm('firstIcon')" data-p-icon="angle-double-left" *ngIf="!firstPageLinkIconTemplate && !_firstPageLinkIconTemplate" [class]="cx('firstIcon')" />
            <span [class]="cx('firstIcon')" *ngIf="firstPageLinkIconTemplate || _firstPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate || _firstPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <button [pBind]="ptm('prev')" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple [class]="cx('prev')" [attr.aria-label]="getAriaLabel('prevPageLabel')">
            <svg [pBind]="ptm('prevIcon')" data-p-icon="angle-left" *ngIf="!previousPageLinkIconTemplate && !_previousPageLinkIconTemplate" [class]="cx('prevIcon')" />
            <span [class]="cx('prevIcon')" *ngIf="previousPageLinkIconTemplate || _previousPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate || _previousPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <span [pBind]="ptm('pages')" [class]="cx('pages')" *ngIf="showPageLinks">
            <button
                [pBind]="ptm('page')"
                type="button"
                *ngFor="let pageLink of pageLinks"
                [class]="cx('page', { pageLink })"
                [attr.aria-label]="getPageAriaLabel(pageLink)"
                [attr.aria-current]="pageLink - 1 == getPage() ? 'page' : undefined"
                (click)="onPageLinkClick($event, pageLink - 1)"
                pRipple
            >
                {{ getLocalization(pageLink) }}
            </button>
        </span>
        <p-select
            [options]="pageItems"
            [ngModel]="getPage()"
            *ngIf="showJumpToPageDropdown"
            [disabled]="empty()"
            [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
            [styleClass]="cx('pcJumpToPageDropdown')"
            (onChange)="onPageDropdownChange($event)"
            [appendTo]="dropdownAppendTo || $appendTo()"
            [scrollHeight]="dropdownScrollHeight"
            [pt]="ptm('pcJumpToPageDropdown')"
            [unstyled]="unstyled()"
        >
            <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
            <ng-container *ngIf="jumpToPageItemTemplate">
                <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="jumpToPageItemTemplate; context: { $implicit: item }"></ng-container>
                </ng-template>
            </ng-container>
            <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate || _dropdownIconTemplate">
                <ng-container *ngTemplateOutlet="dropdownIconTemplate || _dropdownIconTemplate"></ng-container>
            </ng-template>
        </p-select>
        <button [pBind]="ptm('next')" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple [class]="cx('next')" [attr.aria-label]="getAriaLabel('nextPageLabel')">
            <svg [pBind]="ptm('nextIcon')" data-p-icon="angle-right" *ngIf="!nextPageLinkIconTemplate && !_nextPageLinkIconTemplate" [class]="cx('nextIcon')" />
            <span [class]="cx('nextIcon')" *ngIf="nextPageLinkIconTemplate || _nextPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate || _nextPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <button [pBind]="ptm('last')" *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple [class]="cx('last')" [attr.aria-label]="getAriaLabel('lastPageLabel')">
            <svg [pBind]="ptm('lastIcon')" data-p-icon="angle-double-right" *ngIf="!lastPageLinkIconTemplate && !_lastPageLinkIconTemplate" [class]="cx('lastIcon')" />
            <span [class]="cx('lastIcon')" *ngIf="lastPageLinkIconTemplate || _lastPageLinkIconTemplate">
                <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate || _lastPageLinkIconTemplate"></ng-template>
            </span>
        </button>
        <p-inputnumber [pt]="ptm('pcJumpToPageInput')" *ngIf="showJumpToPageInput" [ngModel]="currentPage()" [class]="cx('pcJumpToPageInput')" [disabled]="empty()" (ngModelChange)="changePage($event - 1)" [unstyled]="unstyled()"></p-inputnumber>
        <p-select
            [options]="rowsPerPageItems"
            [(ngModel)]="rows"
            *ngIf="rowsPerPageOptions"
            [styleClass]="cx('pcRowPerPageDropdown')"
            [disabled]="empty()"
            (onChange)="onRppChange($event)"
            [appendTo]="dropdownAppendTo || $appendTo()"
            [scrollHeight]="dropdownScrollHeight"
            [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
            [pt]="ptm('pcRowPerPageDropdown')"
            [unstyled]="unstyled()"
        >
            <ng-container *ngIf="dropdownItemTemplate">
                <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"></ng-container>
                </ng-template>
            </ng-container>
            <ng-template pTemplate="dropdownicon" *ngIf="dropdownIconTemplate || _dropdownIconTemplate">
                <ng-container *ngTemplateOutlet="dropdownIconTemplate || _dropdownIconTemplate"></ng-container>
            </ng-template>
        </p-select>
        <div [pBind]="ptm('contentEnd')" [class]="cx('contentEnd')" *ngIf="templateRight">
            <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [PaginatorStyle, {
        provide: PAGINATOR_INSTANCE,
        useExisting: Paginator
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Paginator
      }],
      host: {
        "[class]": "cn(cx('paginator'), styleClass)"
      },
      hostDirectives: [Bind]
    }]
  }], () => [], {
    pageLinkSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    styleClass: [{
      type: Input
    }],
    alwaysShow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dropdownAppendTo: [{
      type: Input
    }],
    templateLeft: [{
      type: Input
    }],
    templateRight: [{
      type: Input
    }],
    dropdownScrollHeight: [{
      type: Input
    }],
    currentPageReportTemplate: [{
      type: Input
    }],
    showCurrentPageReport: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showFirstLastIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    totalRecords: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    rows: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    rowsPerPageOptions: [{
      type: Input
    }],
    showJumpToPageDropdown: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showJumpToPageInput: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    jumpToPageItemTemplate: [{
      type: Input
    }],
    showPageLinks: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    locale: [{
      type: Input
    }],
    dropdownItemTemplate: [{
      type: Input
    }],
    first: [{
      type: Input
    }],
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    onPageChange: [{
      type: Output
    }],
    dropdownIconTemplate: [{
      type: ContentChild,
      args: ["dropdownicon", {
        descendants: false
      }]
    }],
    firstPageLinkIconTemplate: [{
      type: ContentChild,
      args: ["firstpagelinkicon", {
        descendants: false
      }]
    }],
    previousPageLinkIconTemplate: [{
      type: ContentChild,
      args: ["previouspagelinkicon", {
        descendants: false
      }]
    }],
    lastPageLinkIconTemplate: [{
      type: ContentChild,
      args: ["lastpagelinkicon", {
        descendants: false
      }]
    }],
    nextPageLinkIconTemplate: [{
      type: ContentChild,
      args: ["nextpagelinkicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    display: [{
      type: HostBinding,
      args: ["style.display"]
    }]
  });
})();
var PaginatorModule = class _PaginatorModule {
  static ɵfac = function PaginatorModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaginatorModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _PaginatorModule,
    imports: [Paginator, SharedModule],
    exports: [Paginator, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Paginator, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginatorModule, [{
    type: NgModule,
    args: [{
      imports: [Paginator, SharedModule],
      exports: [Paginator, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/dataview/index.mjs
var style11 = "\n    .p-dataview {\n        position: relative;\n        display: block;\n        border-color: dt('dataview.border.color');\n        border-width: dt('dataview.border.width');\n        border-style: solid;\n        border-radius: dt('dataview.border.radius');\n        padding: dt('dataview.padding');\n    }\n\n    .p-dataview-header {\n        background: dt('dataview.header.background');\n        color: dt('dataview.header.color');\n        border-color: dt('dataview.header.border.color');\n        border-width: dt('dataview.header.border.width');\n        border-style: solid;\n        padding: dt('dataview.header.padding');\n        border-radius: dt('dataview.header.border.radius');\n    }\n\n    .p-dataview-content {\n        background: dt('dataview.content.background');\n        border-color: dt('dataview.content.border.color');\n        border-width: dt('dataview.content.border.width');\n        border-style: solid;\n        color: dt('dataview.content.color');\n        padding: dt('dataview.content.padding');\n        border-radius: dt('dataview.content.border.radius');\n    }\n\n    .p-dataview-footer {\n        background: dt('dataview.footer.background');\n        color: dt('dataview.footer.color');\n        border-color: dt('dataview.footer.border.color');\n        border-width: dt('dataview.footer.border.width');\n        border-style: solid;\n        padding: dt('dataview.footer.padding');\n        border-radius: dt('dataview.footer.border.radius');\n    }\n\n    .p-dataview-paginator-top {\n        border-width: dt('dataview.paginator.top.border.width');\n        border-color: dt('dataview.paginator.top.border.color');\n        border-style: solid;\n    }\n\n    .p-dataview-paginator-bottom {\n        border-width: dt('dataview.paginator.bottom.border.width');\n        border-color: dt('dataview.paginator.bottom.border.color');\n        border-style: solid;\n    }\n\n    .p-dataview-loading-overlay {\n        position: absolute;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 2;\n    }\n";

// node_modules/primeng/fesm2022/primeng-dataview.mjs
var _c09 = ["list"];
var _c112 = ["grid"];
var _c211 = ["header"];
var _c36 = ["emptymessage"];
var _c45 = ["footer"];
var _c55 = ["paginatorleft"];
var _c64 = ["paginatorright"];
var _c73 = ["paginatordropdownitem"];
var _c83 = ["loadingicon"];
var _c93 = ["listicon"];
var _c103 = ["gridicon"];
var _c113 = [[["p-header"]], [["p-footer"]]];
var _c123 = ["p-header", "p-footer"];
var _c133 = () => ({
  position: "top"
});
var _c142 = (a0) => ({
  $implicit: a0
});
var _c152 = () => ({
  position: "bottom"
});
function DataView_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("loadingIcon"), "pi-spin" + ctx_r0.loadingIcon));
  }
}
function DataView_Conditional_0_Conditional_3_2_ng_template_0_Template(rf, ctx) {
}
function DataView_Conditional_0_Conditional_3_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataView_Conditional_0_Conditional_3_2_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function DataView_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵnamespaceSVG();
    ɵɵelement(1, "svg", 5);
    ɵɵtemplate(2, DataView_Conditional_0_Conditional_3_2_Template, 1, 0, null, 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.cx("loadingIcon"));
    ɵɵproperty("pBind", ctx_r0.ptm("loadingIcon"))("spin", true);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.loadingicon);
  }
}
function DataView_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3)(1, "div", 3);
    ɵɵconditionalCreate(2, DataView_Conditional_0_Conditional_2_Template, 1, 2, "i", 4)(3, DataView_Conditional_0_Conditional_3_Template, 3, 5, "ng-container");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("loading"));
    ɵɵproperty("pBind", ctx_r0.ptm("loading"));
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.cx("loadingOverlay"));
    ɵɵproperty("pBind", ctx_r0.ptm("loadingOverlay"));
    ɵɵadvance();
    ɵɵconditional(ctx_r0.loadingIcon ? 2 : 3);
  }
}
function DataView_Conditional_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3);
    ɵɵprojection(1);
    ɵɵtemplate(2, DataView_Conditional_1_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("header"));
    ɵɵproperty("pBind", ctx_r0.ptm("header"));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate);
  }
}
function DataView_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-paginator", 7);
    ɵɵlistener("onPageChange", function DataView_Conditional_2_Template_p_paginator_onPageChange_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.paginate($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("rows", ctx_r0.rows)("first", ctx_r0.first)("totalRecords", ctx_r0.totalRecords)("pageLinkSize", ctx_r0.pageLinks)("alwaysShow", ctx_r0.alwaysShowPaginator)("rowsPerPageOptions", ctx_r0.rowsPerPageOptions)("appendTo", ctx_r0.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r0.paginatorDropdownScrollHeight)("templateLeft", ctx_r0.paginatorleft)("templateRight", ctx_r0.paginatorright)("currentPageReportTemplate", ctx_r0.currentPageReportTemplate)("showFirstLastIcon", ctx_r0.showFirstLastIcon)("dropdownItemTemplate", ctx_r0.paginatordropdownitem)("showCurrentPageReport", ctx_r0.showCurrentPageReport)("showJumpToPageDropdown", ctx_r0.showJumpToPageDropdown)("showPageLinks", ctx_r0.showPageLinks)("styleClass", ctx_r0.cn(ctx_r0.cx("pcPaginator", ɵɵpureFunction0(19, _c133)), ctx_r0.paginatorStyleClass))("pt", ctx_r0.ptm("pcPaginator"))("unstyled", ctx_r0.unstyled());
  }
}
function DataView_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataView_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 8);
    ɵɵpipe(1, "slice");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.listTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c142, ctx_r0.paginator ? ɵɵpipeBind3(1, 2, ctx_r0.filteredValue || ctx_r0.value, ctx_r0.lazy ? 0 : ctx_r0.first, (ctx_r0.lazy ? 0 : ctx_r0.first) + ctx_r0.rows) : ctx_r0.filteredValue || ctx_r0.value));
  }
}
function DataView_Conditional_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataView_Conditional_5_ng_container_0_Template, 1, 0, "ng-container", 8);
    ɵɵpipe(1, "slice");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.gridTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c142, ctx_r0.paginator ? ɵɵpipeBind3(1, 2, ctx_r0.filteredValue || ctx_r0.value, ctx_r0.lazy ? 0 : ctx_r0.first, (ctx_r0.lazy ? 0 : ctx_r0.first) + ctx_r0.rows) : ctx_r0.filteredValue || ctx_r0.value));
  }
}
function DataView_Conditional_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.emptyMessageLabel, " ");
  }
}
function DataView_Conditional_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, null, 0);
  }
}
function DataView_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3);
    ɵɵtemplate(1, DataView_Conditional_6_ng_container_1_Template, 2, 1, "ng-container", 9)(2, DataView_Conditional_6_ng_container_2_Template, 2, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("emptyMessage"));
    ɵɵproperty("pBind", ctx_r0.ptm("emptyMessage"));
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r0.emptymessageTemplate)("ngIfElse", ctx_r0.empty);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.emptymessageTemplate);
  }
}
function DataView_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-paginator", 7);
    ɵɵlistener("onPageChange", function DataView_Conditional_7_Template_p_paginator_onPageChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.paginate($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("rows", ctx_r0.rows)("first", ctx_r0.first)("totalRecords", ctx_r0.totalRecords)("pageLinkSize", ctx_r0.pageLinks)("alwaysShow", ctx_r0.alwaysShowPaginator)("rowsPerPageOptions", ctx_r0.rowsPerPageOptions)("appendTo", ctx_r0.paginatorDropdownAppendTo)("dropdownScrollHeight", ctx_r0.paginatorDropdownScrollHeight)("templateLeft", ctx_r0.paginatorleft)("templateRight", ctx_r0.paginatorright)("currentPageReportTemplate", ctx_r0.currentPageReportTemplate)("showFirstLastIcon", ctx_r0.showFirstLastIcon)("dropdownItemTemplate", ctx_r0.paginatordropdownitem)("showCurrentPageReport", ctx_r0.showCurrentPageReport)("showJumpToPageDropdown", ctx_r0.showJumpToPageDropdown)("showPageLinks", ctx_r0.showPageLinks)("styleClass", ctx_r0.cn(ctx_r0.cx("pcPaginator", ɵɵpureFunction0(19, _c152)), ctx_r0.paginatorStyleClass))("pt", ctx_r0.ptm("pcPaginator"))("unstyled", ctx_r0.unstyled());
  }
}
function DataView_Conditional_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataView_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3);
    ɵɵprojection(1, 1);
    ɵɵtemplate(2, DataView_Conditional_8_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.cx("footer"));
    ɵɵproperty("pBind", ctx_r0.ptm("footer"));
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.footerTemplate);
  }
}
var classes10 = {
  root: ({
    instance
  }) => ["p-dataview p-component", {
    "p-dataview-list": instance.layout === "list",
    "p-dataview-grid": instance.layout === "grid"
  }],
  header: "p-dataview-header",
  loading: "p-dataview-loading",
  loadingOverlay: "p-dataview-loading-overlay p-overlay-mask",
  loadingIcon: "p-dataview-loading-icon",
  pcPaginator: ({
    position
  }) => "p-dataview-paginator-" + position,
  content: "p-dataview-content",
  emptyMessage: "p-dataview-empty-message",
  footer: "p-dataview-footer"
};
var DataViewStyle = class _DataViewStyle extends BaseStyle {
  name = "dataview";
  style = style11;
  classes = classes10;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDataViewStyle_BaseFactory;
    return function DataViewStyle_Factory(__ngFactoryType__) {
      return (ɵDataViewStyle_BaseFactory || (ɵDataViewStyle_BaseFactory = ɵɵgetInheritedFactory(_DataViewStyle)))(__ngFactoryType__ || _DataViewStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DataViewStyle,
    factory: _DataViewStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataViewStyle, [{
    type: Injectable
  }], null, null);
})();
var DataViewClasses;
(function(DataViewClasses2) {
  DataViewClasses2["root"] = "p-dataview";
  DataViewClasses2["header"] = "p-dataview-header";
  DataViewClasses2["loading"] = "p-dataview-loading";
  DataViewClasses2["loadingOverlay"] = "p-dataview-loading-overlay";
  DataViewClasses2["loadingIcon"] = "p-dataview-loading-icon";
  DataViewClasses2["pcPaginator"] = "p-dataview-paginator-[position]";
  DataViewClasses2["content"] = "p-dataview-content";
  DataViewClasses2["emptyMessage"] = "p-dataview-empty-message";
  DataViewClasses2["footer"] = "p-dataview-footer";
})(DataViewClasses || (DataViewClasses = {}));
var DATAVIEW_INSTANCE = new InjectionToken("DATAVIEW_INSTANCE");
var DataView = class _DataView extends BaseComponent {
  componentName = "DataView";
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcDataView = inject(DATAVIEW_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * When specified as true, enables the pagination.
   * @group Props
   */
  paginator;
  /**
   * Number of rows to display per page.
   * @group Props
   */
  rows;
  /**
   * Number of total records, defaults to length of value when not defined.
   * @group Props
   */
  totalRecords;
  /**
   * Number of page links to display in paginator.
   * @group Props
   */
  pageLinks = 5;
  /**
   * Array of integer/object values to display inside rows per page dropdown of paginator
   * @group Props
   */
  rowsPerPageOptions;
  /**
   * Position of the paginator.
   * @group Props
   */
  paginatorPosition = "bottom";
  /**
   * Custom style class for paginator
   * @group Props
   */
  paginatorStyleClass;
  /**
   * Whether to show it even there is only one page.
   * @group Props
   */
  alwaysShowPaginator = true;
  /**
   * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @group Props
   */
  paginatorDropdownAppendTo;
  /**
   * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  paginatorDropdownScrollHeight = "200px";
  /**
   * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
   * @group Props
   */
  currentPageReportTemplate = "{currentPage} of {totalPages}";
  /**
   * Whether to display current page report.
   * @group Props
   */
  showCurrentPageReport;
  /**
   * Whether to display a dropdown to navigate to any page.
   * @group Props
   */
  showJumpToPageDropdown;
  /**
   * When enabled, icons are displayed on paginator to go first and last page.
   * @group Props
   */
  showFirstLastIcon = true;
  /**
   * Whether to show page links.
   * @group Props
   */
  showPageLinks = true;
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy;
  /**
   * Whether to call lazy loading on initialization.
   * @group Props
   */
  lazyLoadOnInit = true;
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage = "";
  /**
   * Style class of the component.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the grid.
   * @group Props
   */
  gridStyleClass = "";
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
   * @group Props
   */
  trackBy = (index, item) => item;
  /**
   * Comma separated list of fields in the object graph to search against.
   * @group Props
   */
  filterBy;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Displays a loader to indicate data load is in progress.
   * @group Props
   */
  loading;
  /**
   * The icon to show while indicating data load is in progress.
   * @group Props
   */
  loadingIcon;
  /**
   * Index of the first row to be displayed.
   * @group Props
   */
  first = 0;
  /**
   * Property name of data to use in sorting by default.
   * @group Props
   */
  sortField;
  /**
   * Order to sort the data by default.
   * @group Props
   */
  sortOrder;
  /**
   * An array of objects to display.
   * @group Props
   */
  value;
  /**
   * Defines the layout mode.
   * @group Props
   */
  layout = "list";
  /**
   * Callback to invoke when paging, sorting or filtering happens in lazy mode.
   * @param {DataViewLazyLoadEvent} event - Custom lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  /**
   * Callback to invoke when pagination occurs.
   * @param {DataViewPageEvent} event - Custom page event.
   * @group Emits
   */
  onPage = new EventEmitter();
  /**
   * Callback to invoke when sorting occurs.
   * @param {DataViewSortEvent} event - Custom sort event.
   * @group Emits
   */
  onSort = new EventEmitter();
  /**
   * Callback to invoke when changing layout.
   * @param {DataViewLayoutChangeEvent} event - Custom layout change event.
   * @group Emits
   */
  onChangeLayout = new EventEmitter();
  /**
   * Template for the list layout.
   * @param {DataViewListTemplateContext} context - list template context.
   * @group Templates
   */
  listTemplate;
  /**
   * Template for grid layout.
   * @param {DataViewGridTemplateContext} context - grid template context.
   * @group Templates
   */
  gridTemplate;
  /**
   * Template for the header section.
   * @group Templates
   */
  headerTemplate;
  /**
   * Template for the empty message section.
   * @group Templates
   */
  emptymessageTemplate;
  /**
   * Template for the footer section.
   * @group Templates
   */
  footerTemplate;
  /**
   * Template for the left side of paginator.
   * @param {DataViewPaginatorLeftTemplateContext} context - paginator left template context.
   * @group Templates
   */
  paginatorleft;
  /**
   * Template for the right side of paginator.
   * @param {DataViewPaginatorRightTemplateContext} context - paginator right template context.
   * @group Templates
   */
  paginatorright;
  /**
   * Template for items in paginator dropdown.
   * @param {DataViewPaginatorDropdownItemTemplateContext} context - paginator dropdown item template context.
   * @group Templates
   */
  paginatordropdownitem;
  /**
   * Template for loading icon.
   * @group Templates
   */
  loadingicon;
  /**
   * Template for list icon.
   * @group Templates
   */
  listicon;
  /**
   * Template for grid icon.
   * @group Templates
   */
  gridicon;
  header;
  footer;
  _value;
  filteredValue;
  filterValue;
  initialized;
  _layout = "list";
  translationSubscription;
  _componentStyle = inject(DataViewStyle);
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  filterService = inject(FilterService);
  onInit() {
    if (this.lazy && this.lazyLoadOnInit) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    this.translationSubscription = this.config.translationObserver.subscribe(() => {
      this.cd.markForCheck();
    });
    this.initialized = true;
  }
  onAfterViewInit() {
  }
  onChanges(simpleChanges) {
    if (simpleChanges.layout && !simpleChanges.layout.firstChange) {
      this.onChangeLayout.emit({
        layout: simpleChanges.layout.currentValue
      });
    }
    if (simpleChanges.value) {
      this._value = simpleChanges.value.currentValue;
      this.updateTotalRecords();
      if (!this.lazy && this.hasFilter()) {
        this.filter(this.filterValue);
      }
    }
    if (simpleChanges.sortField || simpleChanges.sortOrder) {
      if (!this.lazy || this.initialized) {
        this.sort();
      }
    }
  }
  updateTotalRecords() {
    this.totalRecords = this.lazy ? this.totalRecords : this._value ? this._value.length : 0;
  }
  paginate(event) {
    this.first = event.first;
    this.rows = event.rows;
    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    }
    this.onPage.emit({
      first: this.first,
      rows: this.rows
    });
  }
  sort() {
    this.first = 0;
    if (this.lazy) {
      this.onLazyLoad.emit(this.createLazyLoadMetadata());
    } else if (this.value) {
      this.value.sort((data1, data2) => {
        let value1 = p(data1, this.sortField);
        let value2 = p(data2, this.sortField);
        let result;
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === "string" && typeof value2 === "string") result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return this.sortOrder * result;
      });
      if (this.hasFilter()) {
        this.filter(this.filterValue);
      }
    }
    this.onSort.emit({
      sortField: this.sortField,
      sortOrder: this.sortOrder
    });
  }
  isEmpty() {
    let data = this.filteredValue || this.value;
    return data == null || data.length == 0;
  }
  createLazyLoadMetadata() {
    return {
      first: this.first,
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder
    };
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  filter(filter, filterMatchMode = "contains") {
    this.filterValue = filter;
    if (this.value && this.value.length) {
      let searchFields = this.filterBy.split(",");
      this.filteredValue = this.filterService.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);
      if (this.filteredValue.length === this.value.length) {
        this.filteredValue = null;
      }
      if (this.paginator) {
        this.first = 0;
        this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
      }
      this.cd.markForCheck();
    }
  }
  hasFilter() {
    return this.filterValue && this.filterValue.trim().length > 0;
  }
  onDestroy() {
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDataView_BaseFactory;
    return function DataView_Factory(__ngFactoryType__) {
      return (ɵDataView_BaseFactory || (ɵDataView_BaseFactory = ɵɵgetInheritedFactory(_DataView)))(__ngFactoryType__ || _DataView);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _DataView,
    selectors: [["p-dataView"], ["p-dataview"], ["p-data-view"]],
    contentQueries: function DataView_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _c09, 5)(dirIndex, _c112, 5)(dirIndex, _c211, 5)(dirIndex, _c36, 5)(dirIndex, _c45, 5)(dirIndex, _c55, 5)(dirIndex, _c64, 5)(dirIndex, _c73, 5)(dirIndex, _c83, 5)(dirIndex, _c93, 5)(dirIndex, _c103, 5)(dirIndex, Header, 5)(dirIndex, Footer, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.gridTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emptymessageTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.paginatorleft = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.paginatorright = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.paginatordropdownitem = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.loadingicon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listicon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.gridicon = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footer = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function DataView_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      paginator: [2, "paginator", "paginator", booleanAttribute],
      rows: [2, "rows", "rows", numberAttribute],
      totalRecords: [2, "totalRecords", "totalRecords", numberAttribute],
      pageLinks: [2, "pageLinks", "pageLinks", numberAttribute],
      rowsPerPageOptions: "rowsPerPageOptions",
      paginatorPosition: "paginatorPosition",
      paginatorStyleClass: "paginatorStyleClass",
      alwaysShowPaginator: [2, "alwaysShowPaginator", "alwaysShowPaginator", booleanAttribute],
      paginatorDropdownAppendTo: "paginatorDropdownAppendTo",
      paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight",
      currentPageReportTemplate: "currentPageReportTemplate",
      showCurrentPageReport: [2, "showCurrentPageReport", "showCurrentPageReport", booleanAttribute],
      showJumpToPageDropdown: [2, "showJumpToPageDropdown", "showJumpToPageDropdown", booleanAttribute],
      showFirstLastIcon: [2, "showFirstLastIcon", "showFirstLastIcon", booleanAttribute],
      showPageLinks: [2, "showPageLinks", "showPageLinks", booleanAttribute],
      lazy: [2, "lazy", "lazy", booleanAttribute],
      lazyLoadOnInit: [2, "lazyLoadOnInit", "lazyLoadOnInit", booleanAttribute],
      emptyMessage: "emptyMessage",
      styleClass: "styleClass",
      gridStyleClass: "gridStyleClass",
      trackBy: "trackBy",
      filterBy: "filterBy",
      filterLocale: "filterLocale",
      loading: [2, "loading", "loading", booleanAttribute],
      loadingIcon: "loadingIcon",
      first: [2, "first", "first", numberAttribute],
      sortField: "sortField",
      sortOrder: [2, "sortOrder", "sortOrder", numberAttribute],
      value: "value",
      layout: "layout"
    },
    outputs: {
      onLazyLoad: "onLazyLoad",
      onPage: "onPage",
      onSort: "onSort",
      onChangeLayout: "onChangeLayout"
    },
    features: [ɵɵProvidersFeature([DataViewStyle, {
      provide: DATAVIEW_INSTANCE,
      useExisting: _DataView
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _DataView
    }]), ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c123,
    decls: 9,
    vars: 11,
    consts: [["empty", ""], [3, "pBind", "class"], [3, "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "appendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "styleClass", "pt", "unstyled"], [3, "pBind"], [3, "class"], ["data-p-icon", "spinner", 3, "pBind", "spin"], [4, "ngTemplateOutlet"], [3, "onPageChange", "rows", "first", "totalRecords", "pageLinkSize", "alwaysShow", "rowsPerPageOptions", "appendTo", "dropdownScrollHeight", "templateLeft", "templateRight", "currentPageReportTemplate", "showFirstLastIcon", "dropdownItemTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showPageLinks", "styleClass", "pt", "unstyled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngIf", "ngIfElse"]],
    template: function DataView_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c113);
        ɵɵconditionalCreate(0, DataView_Conditional_0_Template, 4, 7, "div", 1);
        ɵɵconditionalCreate(1, DataView_Conditional_1_Template, 3, 4, "div", 1);
        ɵɵconditionalCreate(2, DataView_Conditional_2_Template, 1, 20, "p-paginator", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵconditionalCreate(4, DataView_Conditional_4_Template, 2, 8, "ng-container");
        ɵɵconditionalCreate(5, DataView_Conditional_5_Template, 2, 8, "ng-container");
        ɵɵconditionalCreate(6, DataView_Conditional_6_Template, 3, 6, "div", 1);
        ɵɵelementEnd();
        ɵɵconditionalCreate(7, DataView_Conditional_7_Template, 1, 20, "p-paginator", 2);
        ɵɵconditionalCreate(8, DataView_Conditional_8_Template, 3, 4, "div", 1);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.loading ? 0 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.header || ctx.headerTemplate ? 1 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.paginator && (ctx.paginatorPosition === "top" || ctx.paginatorPosition == "both") ? 2 : -1);
        ɵɵadvance();
        ɵɵclassMap(ctx.cx("content"));
        ɵɵproperty("pBind", ctx.ptm("content"));
        ɵɵadvance();
        ɵɵconditional(ctx.layout === "list" ? 4 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.layout === "grid" ? 5 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.isEmpty() && !ctx.loading ? 6 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.paginator && (ctx.paginatorPosition === "bottom" || ctx.paginatorPosition == "both") ? 7 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.footer || ctx.footerTemplate ? 8 : -1);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, PaginatorModule, Paginator, SpinnerIcon, SharedModule, Bind, SlicePipe],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataView, [{
    type: Component,
    args: [{
      selector: "p-dataView, p-dataview, p-data-view",
      standalone: true,
      imports: [CommonModule, PaginatorModule, SpinnerIcon, SharedModule, Bind],
      template: `
        @if (loading) {
            <div [pBind]="ptm('loading')" [class]="cx('loading')">
                <div [pBind]="ptm('loadingOverlay')" [class]="cx('loadingOverlay')">
                    @if (loadingIcon) {
                        <i [class]="cn(cx('loadingIcon'), 'pi-spin' + loadingIcon)"></i>
                    } @else {
                        <ng-container>
                            <svg [pBind]="ptm('loadingIcon')" data-p-icon="spinner" [spin]="true" [class]="cx('loadingIcon')" />
                            <ng-template *ngTemplateOutlet="loadingicon"></ng-template>
                        </ng-container>
                    }
                </div>
            </div>
        }
        @if (header || headerTemplate) {
            <div [pBind]="ptm('header')" [class]="cx('header')">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
        }
        @if (paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')) {
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                [appendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [templateLeft]="paginatorleft"
                [templateRight]="paginatorright"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatordropdownitem"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
                [styleClass]="cn(cx('pcPaginator', { position: 'top' }), paginatorStyleClass)"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            ></p-paginator>
        }
        <div [pBind]="ptm('content')" [class]="cx('content')">
            @if (layout === 'list') {
                <ng-container
                    *ngTemplateOutlet="
                        listTemplate;
                        context: {
                            $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value
                        }
                    "
                ></ng-container>
            }
            @if (layout === 'grid') {
                <ng-container
                    *ngTemplateOutlet="
                        gridTemplate;
                        context: {
                            $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value
                        }
                    "
                ></ng-container>
            }
            @if (isEmpty() && !loading) {
                <div [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')">
                    <ng-container *ngIf="!emptymessageTemplate; else empty">
                        {{ emptyMessageLabel }}
                    </ng-container>
                    <ng-container #empty *ngTemplateOutlet="emptymessageTemplate"></ng-container>
                </div>
            }
        </div>
        @if (paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')) {
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                [appendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [templateLeft]="paginatorleft"
                [templateRight]="paginatorright"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatordropdownitem"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showPageLinks]="showPageLinks"
                [styleClass]="cn(cx('pcPaginator', { position: 'bottom' }), paginatorStyleClass)"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            ></p-paginator>
        }
        @if (footer || footerTemplate) {
            <div [pBind]="ptm('footer')" [class]="cx('footer')">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [DataViewStyle, {
        provide: DATAVIEW_INSTANCE,
        useExisting: DataView
      }, {
        provide: PARENT_INSTANCE,
        useExisting: DataView
      }],
      host: {
        "[class]": "cn(cx('root'), styleClass)"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    paginator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    rows: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    totalRecords: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageLinks: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    rowsPerPageOptions: [{
      type: Input
    }],
    paginatorPosition: [{
      type: Input
    }],
    paginatorStyleClass: [{
      type: Input
    }],
    alwaysShowPaginator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    paginatorDropdownAppendTo: [{
      type: Input
    }],
    paginatorDropdownScrollHeight: [{
      type: Input
    }],
    currentPageReportTemplate: [{
      type: Input
    }],
    showCurrentPageReport: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showJumpToPageDropdown: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showFirstLastIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showPageLinks: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    lazy: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    lazyLoadOnInit: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    emptyMessage: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    gridStyleClass: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    filterBy: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    loadingIcon: [{
      type: Input
    }],
    first: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    sortField: [{
      type: Input
    }],
    sortOrder: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    layout: [{
      type: Input
    }],
    onLazyLoad: [{
      type: Output
    }],
    onPage: [{
      type: Output
    }],
    onSort: [{
      type: Output
    }],
    onChangeLayout: [{
      type: Output
    }],
    listTemplate: [{
      type: ContentChild,
      args: ["list"]
    }],
    gridTemplate: [{
      type: ContentChild,
      args: ["grid"]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header"]
    }],
    emptymessageTemplate: [{
      type: ContentChild,
      args: ["emptymessage"]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer"]
    }],
    paginatorleft: [{
      type: ContentChild,
      args: ["paginatorleft"]
    }],
    paginatorright: [{
      type: ContentChild,
      args: ["paginatorright"]
    }],
    paginatordropdownitem: [{
      type: ContentChild,
      args: ["paginatordropdownitem"]
    }],
    loadingicon: [{
      type: ContentChild,
      args: ["loadingicon"]
    }],
    listicon: [{
      type: ContentChild,
      args: ["listicon"]
    }],
    gridicon: [{
      type: ContentChild,
      args: ["gridicon"]
    }],
    header: [{
      type: ContentChild,
      args: [Header]
    }],
    footer: [{
      type: ContentChild,
      args: [Footer]
    }]
  });
})();
var DataViewModule = class _DataViewModule {
  static ɵfac = function DataViewModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DataViewModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DataViewModule,
    imports: [DataView, SharedModule],
    exports: [DataView, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [DataView, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataViewModule, [{
    type: NgModule,
    args: [{
      imports: [DataView, SharedModule],
      exports: [DataView, SharedModule]
    }]
  }], null, null);
})();
export {
  DataView,
  DataViewClasses,
  DataViewModule,
  DataViewStyle
};
//# sourceMappingURL=primeng_dataview.js.map
